import { test, expect } from "@playwright/test";

test("skip link moves focus to main content on /es", async ({ page }) => {
  await page.goto("/es");

  const skipLink = page.locator("a.skip-link");
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("header and footer interactive elements have visible focus states", async ({
  page,
}) => {
  await page.goto("/es");

  const interactive = page.locator(
    "a[href], button, [role='button'], [tabindex]:not([tabindex='-1'])",
  );
  const visibleIndexes = await interactive.evaluateAll((nodes) =>
    nodes
      .map((node, index) => ({ index, node }))
      .filter(({ node }) => {
        const style = window.getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") {
          return false;
        }

        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map(({ index }) => index),
  );

  for (const index of visibleIndexes) {
    const element = interactive.nth(index);
    await element.focus();
    await expect(element).toBeFocused();
    const outline = await element.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return style.outlineStyle !== "none" || style.boxShadow !== "none";
    });
    expect(outline).toBeTruthy();
  }
});

test("closed dropdown panels are not rendered until opened", async ({
  page,
}) => {
  await page.goto("/es");

  await expect(page.locator("#nav-panel-servicios")).toHaveCount(0);
  await expect(
    page.locator("a[href*='community-service-leadership-development']"),
  ).toHaveCount(0);
});

test("mobile nav button toggles aria-expanded and can be reached with keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es");

  const mobileButton = page.getByRole("button", { name: /menú|menu/i });
  await expect(mobileButton).toBeVisible();

  await mobileButton.focus();
  await page.keyboard.press("Enter");

  const mobileNav = page.locator("#mobile-nav");
  await expect(mobileNav).toBeVisible();
  await expect(mobileButton).toHaveAttribute("aria-expanded", "true");

  const firstNavLink = mobileNav.locator("a").first();
  await expect(firstNavLink).toBeVisible();
  await firstNavLink.focus();
  await expect(firstNavLink).toBeFocused();
});

test("dropdown button opens with Enter, Escape closes and returns focus, and links are tab-reachable", async ({
  page,
}) => {
  await page.goto("/es");

  const servicesButton = page.getByRole("button", { name: "Servicios" });
  await expect(servicesButton).toBeVisible();

  await expect(page.locator("#nav-panel-servicios")).toHaveCount(0);

  await servicesButton.focus();
  await page.keyboard.press("Enter");

  const panel = page.locator("#nav-panel-servicios");
  await expect(panel).toBeVisible();

  const firstLink = panel.getByRole("link").first();
  await expect(firstLink).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
  await expect(servicesButton).toBeFocused();

  await servicesButton.press("Enter");
  await expect(panel).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(firstLink).toBeFocused();
});

test("language toggle is keyboard-operable and switches locale", async ({
  page,
}) => {
  await page.goto("/es");

  const toggle = page.getByRole("button", { name: "EN" });
  await expect(toggle).toBeVisible();

  await toggle.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/en(\/|$)/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
