import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { routes } from "@/router.js";
import { reveal } from "@/directives/reveal.js";
import fr from "@/data/locales/fr.js";
import en from "@/data/locales/en.js";
import snapshot from "@/data/contributions.json";
import ContributionGraph from "@/components/ContributionGraph.vue";

const SNAPSHOT_PATH = resolve(process.cwd(), "src/data/contributions.json");

const day = (date, contributionCount = 0, contributionLevel = "NONE") => ({
  date,
  contributionCount,
  contributionLevel,
});

describe("toSnapshot", () => {
  it("maps every GitHub level to 0..4", async () => {
    const { toSnapshot } = await import("../scripts/fetch-contributions.mjs");
    const levels = [
      "NONE",
      "FIRST_QUARTILE",
      "SECOND_QUARTILE",
      "THIRD_QUARTILE",
      "FOURTH_QUARTILE",
    ];
    const calendar = {
      totalContributions: 10,
      weeks: [{ contributionDays: levels.map((l, i) => day(`2025-01-0${i + 1}`, i, l)) }],
    };
    expect(toSnapshot("me", calendar).days.map((d) => d.level)).toEqual([0, 1, 2, 3, 4]);
  });

  it("flattens weeks, sorts days by date and keeps the total and user", async () => {
    const { toSnapshot } = await import("../scripts/fetch-contributions.mjs");
    const calendar = {
      totalContributions: 6,
      weeks: [
        { contributionDays: [day("2025-01-03", 3, "SECOND_QUARTILE"), day("2025-01-04")] },
        { contributionDays: [day("2025-01-01", 1, "FIRST_QUARTILE"), day("2025-01-02", 2)] },
      ],
    };
    const result = toSnapshot("me", calendar);
    expect(result.user).toBe("me");
    expect(result.total).toBe(6);
    expect(result.days.map((d) => d.date)).toEqual([
      "2025-01-01",
      "2025-01-02",
      "2025-01-03",
      "2025-01-04",
    ]);
    expect(result.days[0]).toEqual({ date: "2025-01-01", count: 1, level: 1 });
  });

  it("throws when weeks are missing", async () => {
    const { toSnapshot } = await import("../scripts/fetch-contributions.mjs");
    expect(() => toSnapshot("me", {})).toThrow();
    expect(() => toSnapshot("me", null)).toThrow();
    expect(() => toSnapshot("me", { weeks: "nope" })).toThrow();
  });

  it("throws when there are no days", async () => {
    const { toSnapshot } = await import("../scripts/fetch-contributions.mjs");
    expect(() => toSnapshot("me", { totalContributions: 0, weeks: [] })).toThrow();
    expect(() =>
      toSnapshot("me", { totalContributions: 0, weeks: [{ contributionDays: [] }] }),
    ).toThrow();
  });

  it("throws on an unknown level or a day without a date", async () => {
    const { toSnapshot } = await import("../scripts/fetch-contributions.mjs");
    const bad = (d) => ({ totalContributions: 1, weeks: [{ contributionDays: [d] }] });
    expect(() => toSnapshot("me", bad(day("2025-01-01", 1, "FIFTH_QUARTILE")))).toThrow();
    expect(() =>
      toSnapshot("me", bad({ contributionCount: 1, contributionLevel: "NONE" })),
    ).toThrow();
  });
});

describe("fetch-contributions module", () => {
  it("has no side effect when imported (snapshot file untouched)", async () => {
    const before = readFileSync(SNAPSHOT_PATH, "utf8");
    const mod = await import("../scripts/fetch-contributions.mjs");
    expect(typeof mod.toSnapshot).toBe("function");
    expect(readFileSync(SNAPSHOT_PATH, "utf8")).toBe(before);
  });
});

describe("contributions snapshot", () => {
  it("has a user and a non-empty days list", () => {
    expect(typeof snapshot.user).toBe("string");
    expect(snapshot.user.length).toBeGreaterThan(0);
    expect(snapshot.days.length).toBeGreaterThan(0);
  });

  it("has strictly ascending ISO dates", () => {
    for (const d of snapshot.days) expect(d.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    for (let i = 1; i < snapshot.days.length; i++) {
      expect(snapshot.days[i].date > snapshot.days[i - 1].date).toBe(true);
    }
  });

  it("has levels in 0..4 and non-negative integer counts", () => {
    for (const d of snapshot.days) {
      expect([0, 1, 2, 3, 4]).toContain(d.level);
      expect(Number.isInteger(d.count)).toBe(true);
      expect(d.count).toBeGreaterThanOrEqual(0);
    }
  });

  // Asserts equality with the sum of counts: GitHub's totalContributions is the sum of the
  // daily counts of the same calendar, so a mismatch means a corrupted or hand-edited file.
  it("has a total equal to the sum of the daily counts", () => {
    const sum = snapshot.days.reduce((acc, d) => acc + d.count, 0);
    expect(Number.isInteger(snapshot.total)).toBe(true);
    expect(snapshot.total).toBe(sum);
  });
});

async function mountAt(path) {
  const router = createRouter({ history: createMemoryHistory(), routes });
  router.push(path);
  await router.isReady();
  return mount(ContributionGraph, { global: { plugins: [router], directives: { reveal } } });
}

describe.each([
  ["fr", "/", fr, "fr-FR"],
  ["en", "/en", en, "en-US"],
])("ContributionGraph (%s)", (_name, path, messages, intl) => {
  const text = messages.projects.contributions;
  const number = new Intl.NumberFormat(intl);
  const date = (iso) =>
    new Intl.DateTimeFormat(intl, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  const totalText = text.total.replace("{count}", number.format(snapshot.total));

  it("renders the localized heading", async () => {
    const wrapper = await mountAt(path);
    expect(wrapper.find("h3").text()).toBe(text.title);
    wrapper.unmount();
  });

  it("renders one titled cell per day", async () => {
    const wrapper = await mountAt(path);
    expect(wrapper.findAll(".cell[title]").length).toBe(snapshot.days.length);
    wrapper.unmount();
  });

  it("exposes the formatted total in the aria-label and the caption", async () => {
    const wrapper = await mountAt(path);
    expect(wrapper.find('[role="img"]').attributes("aria-label")).toBe(totalText);
    expect(wrapper.find("p").text()).toContain(totalText);
    wrapper.unmount();
  });

  it("words the title of empty and multi-contribution days", async () => {
    const wrapper = await mountAt(path);
    const titles = wrapper.findAll(".cell[title]").map((c) => c.attributes("title"));
    const zeroIndex = snapshot.days.findIndex((d) => d.count === 0);
    const manyIndex = snapshot.days.findIndex((d) => d.count > 1);
    expect(zeroIndex).toBeGreaterThanOrEqual(0);
    expect(manyIndex).toBeGreaterThanOrEqual(0);
    const zero = snapshot.days[zeroIndex];
    const many = snapshot.days[manyIndex];
    expect(titles[zeroIndex]).toBe(text.dayNone.replace("{date}", date(zero.date)));
    expect(titles[manyIndex]).toBe(
      text.dayMany.replace("{count}", number.format(many.count)).replace("{date}", date(many.date)),
    );
    wrapper.unmount();
  });

  it("links to the GitHub profile in a new tab with noopener", async () => {
    const wrapper = await mountAt(path);
    const link = wrapper.find("a");
    expect(link.attributes("href")).toBe(`https://github.com/${snapshot.user}`);
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toContain("noopener");
    expect(link.text()).toContain(text.profile);
    wrapper.unmount();
  });
});
