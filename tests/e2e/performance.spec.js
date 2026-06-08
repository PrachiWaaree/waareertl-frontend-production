const { test, expect } = require("@playwright/test");

const criticalUrls = [
  '/',
  '/about-us',
  '/our-project',
  '/investors',
  '/blogs',
];

test.describe('Performance Validation', () => {
  for (const url of criticalUrls) {
    test(`should load ${url} within 3 seconds`, async ({ page }) => {
      const startTime = Date.now();
      
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      const loadTime = Date.now() - startTime;
      
      expect(response.status()).toBeLessThan(400);
      expect(loadTime).toBeLessThan(5000);
      
      console.log(`Load time for ${url}: ${loadTime}ms`);
      
      const metrics = await page.evaluate(() => ({
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        load: performance.timing.loadEventEnd - performance.timing.navigationStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      }));
      
      console.log(`Performance metrics for ${url}:`, metrics);
      
      expect(metrics.domContentLoaded).toBeLessThan(3000);
      expect(metrics.firstContentfulPaint).toBeLessThan(3000);
    });
  }
  
  test('should have optimized images', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const images = await page.locator('img').all();
    
    let optimizedCount = 0;
    let totalChecked = 0;
    
    for (const img of images.slice(0, 5)) {
      const src = await img.getAttribute('src');
      const loading = await img.getAttribute('loading');
      const decoding = await img.getAttribute('decoding');
      
      if (src && !src.includes('data:')) {
        totalChecked++;
        
        if (loading === 'lazy') optimizedCount++;
        if (decoding === 'async') optimizedCount++;
        
        const response = await page.request.head(src);
        const contentType = response.headers()['content-type'];
        
        if (['image/webp', 'image/avif', 'image/jpeg', 'image/png'].includes(contentType)) {
          optimizedCount++;
        }
      }
    }
    
    expect(optimizedCount).toBeGreaterThan(0);
    console.log(`Image optimization score: ${optimizedCount} optimizations found`);
  });
  
  test('should have optimized scripts', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const scripts = await page.locator('script[src]').all();
    
    let optimizedScripts = 0;
    let totalScripts = 0;
    
    for (const script of scripts.slice(0, 3)) {
      totalScripts++;
      const src = await script.getAttribute('src');
      const async = await script.getAttribute('async');
      const defer = await script.getAttribute('defer');
      
      if (async || defer) {
        optimizedScripts++;
      }
    }
    
    expect(optimizedScripts).toBeGreaterThan(0);
    console.log(`Script optimization: ${optimizedScripts}/${totalScripts} scripts optimized`);
  });
  
  test('should have proper cache headers', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const resources = [
      '/_next/static/css/',
      '/_next/static/chunks/',
      '/_next/static/media/',
    ];
    
    for (const resource of resources) {
      const response = await page.request.head(resource);
      const cacheControl = response.headers()['cache-control'];
      
      expect(cacheControl).toContain('max-age');
      expect(cacheControl).toContain('public');
    }
  });
  
  test('should handle concurrent requests', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const urls = ['/', '/about-us', '/our-project'];
    const promises = urls.map(url => 
      page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 })
    );
    
    const results = await Promise.allSettled(promises);
    
    for (const result of results) {
      if (result.status === 'fulfilled') {
        expect(result.value.status()).toBeLessThan(400);
      } else {
        console.error('Request failed:', result.reason);
        expect(result.status).toBe('fulfilled');
      }
    }
    
    await context.close();
  });
  
  test('should have acceptable memory usage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const metrics = await page.evaluate(() => {
      if (window.performance && window.performance.memory) {
        return {
          usedJSHeapSize: window.performance.memory.usedJSHeapSize,
          totalJSHeapSize: window.performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
        };
      }
      return null;
    });
    
    if (metrics) {
      const memoryUsagePercentage = (metrics.usedJSHeapSize / metrics.totalJSHeapSize) * 100;
      
      console.log('Memory usage:', {
        used: Math.round(metrics.usedJSHeapSize / 1024 / 1024) + 'MB',
        total: Math.round(metrics.totalJSHeapSize / 1024 / 1024) + 'MB',
        percentage: Math.round(memoryUsagePercentage) + '%',
      });
      
      expect(memoryUsagePercentage).toBeLessThan(80);
    }
  });
});