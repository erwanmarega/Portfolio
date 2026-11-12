import { computed } from "vue";
import { useRoute } from "vue-router";
import fr from "../data/locales/fr.js";
import en from "../data/locales/en.js";

export const LOCALES = ["fr", "en"];
export const messages = { fr, en };

export function localeFromRoute(route) {
  return route.params.locale === "en" ? "en" : "fr";
}

export function buildLocaleRoute(locale, name, extra = {}) {
  return { name, params: { locale: locale === "en" ? "en" : "" }, ...extra };
}

export function useLocale() {
  const route = useRoute();
  const locale = computed(() => localeFromRoute(route));
  const t = computed(() => messages[locale.value]);

  const localeRoute = (name, extra = {}) => buildLocaleRoute(locale.value, name, extra);

  const otherLocale = computed(() => (locale.value === "en" ? "fr" : "en"));
  const switchRoute = computed(() =>
    buildLocaleRoute(otherLocale.value, route.name, { hash: route.hash }),
  );

  return { locale, t, localeRoute, otherLocale, switchRoute };
}
