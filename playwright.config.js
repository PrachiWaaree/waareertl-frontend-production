const { defineConfig, devices } = require("@playwright/test");

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3002";

module.exports = defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 2 : 4,
    reporter: process.env.CI ? "github" : "html",
    use: {
        baseURL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    webServer: {
        command: "pnpm start",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
        {
            name: "mobile-chrome",
            use: { ...devices["Pixel 5"] },
        },
        {
            name: "mobile-safari",
            use: { ...devices["iPhone 12"] },
        },
    ],
});
