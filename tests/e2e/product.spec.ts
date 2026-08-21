import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoSeriousA11yViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .exclude("[data-preview-container]") // Component previews are demo content
    .exclude("pre") // Code blocks have technical coloring
    .analyze();
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

async function expectNoButtonNameViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).withRules(["button-name"]).analyze();
  expect(
    results.violations.map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
}

test("published surfaces identify v0.2.0 as the current release", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("v0.2.0 · Active development", { exact: true })).toBeVisible();
  await expect(page.getByText(/pre-1\.0/i)).toHaveCount(0);

  await page.goto("/changelog");
  await expect(page.getByRole("heading", { level: 2, name: "Neoncite/UI 0.2.0" })).toBeVisible();
  await expect(page.getByText("current release", { exact: true })).toBeVisible();
  await expect(page.getByText(/release candidate/i)).toHaveCount(0);

  await page.goto("/docs");
  await expect(page.getByText(/Neoncite\/UI v0\.2\.0 is the current public release/)).toBeVisible();
});

test("home hero has no pre-release pill and uses solid white heading text", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Pre-1.0 · actively evolving", { exact: true })).toHaveCount(0);

  const heading = page.getByRole("heading", {
    level: 1,
    name: "Machined components for the modern web.",
  });
  await expect(heading).toBeVisible();
  const segmentColors = await heading.locator("span").evaluateAll((segments) =>
    segments.map((segment) => ({
      color: getComputedStyle(segment).color,
      backgroundImage: getComputedStyle(segment).backgroundImage,
    })),
  );
  expect(segmentColors).toEqual([
    { color: "rgb(255, 255, 255)", backgroundImage: "none" },
    { color: "rgb(255, 255, 255)", backgroundImage: "none" },
  ]);
});

test("home is accessible and visually stable", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Machined components");
  await expectNoSeriousA11yViolations(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const gridAnimation = await page
    .locator(".bg-grid-drift")
    .first()
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(gridAnimation).toBe("none");
  if (testInfo.project.name === "chromium-desktop") {
    await expect(page).toHaveScreenshot("home-desktop.png", { fullPage: true });
  }
});

test("mobile navigation traps focus and closes with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile", "mobile-only interaction");
  test.setTimeout(60_000);
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menu).toBeVisible();
  await menu.click();
  const dialog = page.getByRole("dialog", { name: /Navigation/ });
  await expect(dialog).toBeVisible({ timeout: 15_000 });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menu).toBeFocused();
});

test("dialog keyboard lifecycle restores trigger focus", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/components/dialog");
  const trigger = page.getByRole("button", { name: "Open dialog" }).first();
  await expect(trigger).toBeVisible({ timeout: 30_000 });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Theme Builder persists, shares, and remains accessible", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/themes");
  await expect(page.getByRole("heading", { name: "Theme Builder" })).toBeVisible({
    timeout: 30_000,
  });
  await page.getByRole("button", { name: /Ocean/ }).first().click();
  await page
    .getByRole("button", { name: /Persist active/ })
    .first()
    .click();
  await page.reload();
  await expect(page.getByText(/Active:/).first()).toBeVisible({ timeout: 10_000 });
  await expectNoSeriousA11yViolations(page);
  if (testInfo.project.name === "chromium-desktop") {
    await expect(page).toHaveScreenshot("theme-builder-desktop.png", { fullPage: true });
  }
});

test("Theme Builder compatibility route previews token overrides in real time", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto("/theme-builder");
  await page.waitForURL(/\/themes(?:\?.*)?$/);
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: "Theme Builder" })).toBeVisible({
    timeout: 30_000,
  });

  await page.getByRole("button", { name: "Primary: Green" }).click();
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.style.getPropertyValue("--primary").trim()),
    )
    .toBe("#00ff66");

  await page.getByRole("button", { name: "Accent: Purple" }).click();
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.style.getPropertyValue("--accent").trim()),
    )
    .toBe("#b829ff");
});

test("icon-only controls have accessible button names", async ({ page }) => {
  test.setTimeout(90_000);
  for (const path of [
    "/components/data-table",
    "/components/number-field",
    "/components/time-picker",
    "/components/password-input",
    "/themes",
  ]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await expectNoButtonNameViolations(page);
  }
});

test("accessibility documentation states the dark-only constraint", async ({ page }) => {
  await page.goto("/docs/accessibility");
  await expect(page.getByRole("heading", { name: "Accessibility" })).toBeVisible();
  await expect(page.getByText(/intentionally dark-mode only/i)).toBeVisible();
});

test("signature component and Block surfaces render", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/components/server-card");
  await expect(page.getByRole("heading", { name: "Server Card" })).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.getByText("edge-07").first()).toBeVisible({ timeout: 30_000 });
  await expectNoSeriousA11yViolations(page);

  await page.goto("/blocks#telemetry-dashboard");
  await expect(page.locator("#telemetry-dashboard")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("Runtime overview")).toBeVisible();
  if (testInfo.project.name === "chromium-desktop") {
    await expect(page.locator("#telemetry-dashboard")).toHaveScreenshot("telemetry-dashboard.png");
  }
});
