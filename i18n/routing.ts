import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export function isLocale(value: string): value is "es" | "en" {
  return routing.locales.includes(value as "es" | "en");
}
