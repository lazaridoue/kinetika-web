import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { NAV } from "@/lib/site-config";

const locales = ["es", "en"] as const;
const pages = [...NAV.map((item) => item.href), "/not-found"].flatMap((href) =>
  locales.map((locale) => `/${locale}${href === "/" ? "" : href}`),
);

for (const route of pages) {
  test(`a11y: ${route}`, async ({ page }) => {
    await page.goto(route);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      const details = accessibilityScanResults.violations
        .map(
          (violation) =>
            `id: ${violation.id}\nimpact: ${violation.impact}\nhelp: ${violation.help}\nselector: ${violation.nodes
              .map((node) => node.target.join(", "))
              .join(" | ")}`,
        )
        .join("\n---\n");

      throw new Error(`Accessibility violations on ${route}:\n${details}`);
    }

    expect(accessibilityScanResults.violations).toHaveLength(0);
  });
}
