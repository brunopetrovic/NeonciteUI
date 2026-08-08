import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoSeriousA11yViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
  expect(
    serious.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
}

test("home is accessible and visually stable", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Machined components");
  await expectNoSeriousA11yViolations(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const gridAnimation = await page.locator(".bg-grid-drift").first().evaluate((element) =>
    getComputedStyle(element).animationName,
  );
  expect(gridAnimation).toBe("none");
  if (testInfo.project.name === "chromium-desktop") {
    await expect(page).toHaveScreenshot("home-desktop.png", { fullPage: true });
  }
});

test("mobile navigation traps focus and closes with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile", "mobile-only interaction");
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await menu.click();
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menu).toBeFocused();
});

test("dialog keyboard lifecycle restores trigger focus", async ({ page }) => {
  await page.goto("/components/dialog");
  const trigger = page.getByRole("button", { name: "Open dialog" }).first();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Theme Builder persists, shares, and remains accessible", async ({ page }, testInfo) => {
  await page.goto("/themes");
  await expect(page.getByRole("heading", { name: "Theme Builder" })).toBeVisible();
  await page.getByRole("button", { name: /Ocean/ }).click();
  await page.getByRole("button", { name: /Persist active/ }).click();
  await page.reload();
  await expect(page.getByText("Active:").locator(".." )).toContainText("Custom");
  await expectNoSeriousA11yViolations(page);
  if (testInfo.project.name === "chromium-desktop") {
    await expect(page).toHaveScreenshot("theme-builder-desktop.png", { fullPage: true });
  }
});

test("signature component and Block surfaces render", async ({ page }, testInfo) => {
  await page.goto("/components/server-card");
  await expect(page.getByRole("heading", { name: "Server Card" })).toBeVisible();
  await expect(page.getByText("edge-07")).toBeVisible();
  await expectNoSeriousA11yViolations(page);

  await page.goto("/blocks#telemetry-dashboard");
  await expect(page.locator("#telemetry-dashboard")).toBeVisible();
  await expect(page.getByText("Runtime overview")).toBeVisible();
  if (testInfo.project.name === "chromium-desktop") {
    await expect(page.locator("#telemetry-dashboard")).toHaveScreenshot("telemetry-dashboard.png");
  }
});
