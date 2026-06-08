const { test, expect } = require("@playwright/test");

const navigationUrls = [
  '/about-us',
  '/leadership',
  '/our-clients',
  '/why-rtl',
  '/our-project',
  '/energy-generation/utility',
  '/energy-generation/floating-solar',
  '/energy-generation/commercial-and-industrial-roof-top',
  '/energy-generation/asset-management',
  '/waaree-energies',
  '/waaree-rtl',
  '/waaree-tech',
  '/waaree-ces-green-hydrogen',
  '/waaree-solar-americas',
  '/blogs',
  '/media',
  '/careers',
  '/investors',
  '/investors/composition-of-board-committees',
  '/grievance',
  '/download-center',
];

test.describe('Navigation Validation', () => {
  for (const url of navigationUrls) {
    test(`should load ${url} without errors`, async ({ page }) => {
      console.log(`Testing: ${url}`);
      
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      
      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);
      
      await expect(page).toHaveTitle(/.+/);
      
      const pageErrors = [];
      page.on('pageerror', (error) => {
        pageErrors.push(error.message);
      });
      
      await page.waitForLoadState('networkidle');
      
      if (pageErrors.length > 0) {
        console.error(`Errors on ${url}:`, pageErrors);
      }
      
      expect(pageErrors).toHaveLength(0);
    });
  }
  
  test('should have working header navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    await expect(page.locator('header')).toBeVisible();
    
    const headerLinks = await page.locator('header a[href^="/"]').all();
    expect(headerLinks.length).toBeGreaterThan(0);
    
    for (const link of headerLinks.slice(0, 3)) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('/#') && href !== '/') {
        const response = await page.goto(href, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });
        expect(response.status()).toBeLessThan(400);
        await page.goBack();
      }
    }
  });
  
  test('should have working footer navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    await expect(page.locator('footer')).toBeVisible();
    
    const footerLinks = await page.locator('footer a[href^="/"]').all();
    expect(footerLinks.length).toBeGreaterThan(0);
    
    for (const link of footerLinks.slice(0, 3)) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('/#') && href !== '/') {
        const response = await page.goto(href, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });
        expect(response.status()).toBeLessThan(400);
        await page.goBack();
      }
    }
  });
});