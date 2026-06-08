const { test, expect } = require("@playwright/test");

test("homepage renders without server error", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response).not.toBeNull();
    expect(response.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/.+/);
});

test("investor page resolves", async ({ page }) => {
    const response = await page.goto("/investor", {
        waitUntil: "domcontentloaded",
    });
    expect(response).not.toBeNull();
    expect(response.status()).toBeLessThan(400);
});
