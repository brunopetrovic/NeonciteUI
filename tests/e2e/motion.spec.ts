import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoSeriousA11yViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).exclude("pre").analyze();
  const serious = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
  expect(
    serious.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
}

test("Motion Lab switches recipes, exposes source formats, and preserves keyboard semantics", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/docs/motion");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1, name: "Motion Lab" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Full motion preview");

  // Verify the default recipe.
  await expect(page.getByTestId("motion-recipe-title")).toHaveText("Pressed surface");

  // Tune physics via keyboard.
  const stiffness = page.getByLabel("Stiffness");
  await expect(stiffness).toHaveValue("320");
  await stiffness.focus();
  await stiffness.press("ArrowRight");
  await expect(stiffness).toHaveValue("330");

  // Switch to the State morph recipe.
  await page.getByTestId("motion-recipe-state-morph").click();
  await expect(page.getByTestId("motion-recipe-title")).toHaveText("State morph");

  // Trigger the async deploy flow and verify status morphs.
  const deployButton = page.getByRole("button", { name: "Deploy build" });
  await expect(deployButton).toBeVisible();
  await deployButton.click();
  await expect(page.getByText("Deploying")).toBeVisible({ timeout: 2_000 });
  await expect(page.getByText("Deployed")).toBeVisible({ timeout: 4_000 });

  // Switch to the Focus relay recipe.
  await page.getByTestId("motion-recipe-focus-relay").click();
  await expect(page.getByTestId("motion-recipe-title")).toHaveText("Focus relay");

  // Exercise keyboard semantics on the tab strip.
  const eventsTab = page.getByRole("tab", { name: "Events" });
  await eventsTab.click();
  await expect(page.locator("#motion-focus-panel")).toContainText("Events");

  // Switch source format to AI prompt and verify content.
  // The active recipe is "Focus relay" at this point, so its prompt is shown.
  await page.getByRole("tab", { name: "AI prompt" }).click();
  await expect(page.locator("pre")).toContainText("Create an accessible tab strip");

  // Accessibility check (excluding code blocks which are decorative).
  await expectNoSeriousA11yViolations(page);

  if (testInfo.project.name === "chromium-desktop") {
    await expect(page).toHaveScreenshot("motion-lab-desktop.png", { fullPage: true });
  }
});

test("Motion Lab reports reduced motion when the user requests it", async ({ page }) => {
  test.setTimeout(60_000);
  // Navigate first, then emulate reduced motion and reload so framer-motion's
  // useReducedMotion hook reads the media query on mount.
  await page.goto("/docs/motion");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: "Motion Lab" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Reduced motion active", {
    timeout: 10_000,
  });
  await expect(page.getByText(/Reduced motion:/).first()).toBeVisible();
});
