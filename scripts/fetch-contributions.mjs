import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import "dotenv/config";

const GITHUB_USER = "erwanmarega";
const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/contributions.json");

const QUERY = `query($login:String!){ user(login:$login){ contributionsCollection{ contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount contributionLevel } } } } } }`;

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS = 400;

export function toSnapshot(user, calendar) {
  if (!calendar || !Array.isArray(calendar.weeks)) throw new Error("malformed calendar: no weeks");
  const days = calendar.weeks
    .flatMap((week) => week?.contributionDays ?? [])
    .map((day) => {
      const count = day?.contributionCount;
      if (
        !day ||
        !ISO_DATE.test(day.date) ||
        !Object.hasOwn(LEVELS, day.contributionLevel) ||
        !Number.isInteger(count) ||
        count < 0
      ) {
        throw new Error("malformed calendar: bad day");
      }
      return {
        date: day.date,
        count,
        level: LEVELS[day.contributionLevel],
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) throw new Error("malformed calendar: no days");
  if (days.length > MAX_DAYS) throw new Error("malformed calendar: too many days");
  const total = calendar.totalContributions;
  if (!Number.isInteger(total) || total < 0) throw new Error("malformed calendar: bad total");
  return { user, total, days };
}

async function main() {
  const token = process.env.GH_CONTRIBUTIONS_TOKEN;
  if (!token) {
    console.log("GH_CONTRIBUTIONS_TOKEN not set, keeping the committed snapshot");
    return;
  }
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-contributions-fetch",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USER } }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json.errors?.length) throw new Error("GraphQL error");
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    const snapshot = toSnapshot(GITHUB_USER, calendar);
    writeFileSync(OUTPUT, JSON.stringify(snapshot) + "\n");
    console.log(`Contributions snapshot updated (${snapshot.total} contributions)`);
  } catch (error) {
    console.warn(`Contributions fetch failed (${error.message}), keeping the committed snapshot`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
