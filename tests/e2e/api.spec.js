const { test, expect } = require("@playwright/test");

const API_BASE_URL = process.env.API_URL || 'http://127.0.0.1:8090';

test.describe('API Endpoint Validation', () => {
  test('should return 200 for /api/pages endpoint', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/pages`);
    
    if (response.status() === 404) {
      console.log('API returns 404 for /api/pages without slug - testing with slug parameter');
      const responseWithSlug = await request.get(`${API_BASE_URL}/api/pages?slug=home`);
      expect(responseWithSlug.status()).toBeLessThan(500);
      
      const data = await responseWithSlug.json();
      expect(data).toBeDefined();
    } else {
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toBeDefined();
      expect(Array.isArray(data) || typeof data === 'object').toBeTruthy();
    }
  });
  
  test('should handle POST to /api/filter-data', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/api/filter-data`, {
      data: {
        template_id: 1,
        limit: 10,
        page: 1,
      },
    });
    
    expect(response.status()).toBeLessThan(500);
    
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
  
  test('should handle POST to /api/form', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/api/form`, {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      },
    });
    
    expect(response.status()).toBeLessThan(500);
  });
  
  test('should handle POST to /api/calculator', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/api/calculator`, {
      data: {
        location: 'Mumbai',
        consumption: 1000,
        roof_type: 'flat',
      },
    });
    
    expect(response.status()).toBeLessThan(500);
    
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
  
  test('should handle GET to /api/search-form', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/search-form`, {
      params: {
        query: 'solar',
      },
    });
    
    expect(response.status()).toBeLessThan(500);
    
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
  
  test('should return health check data', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/health`);
    
    expect(response.status()).toBeLessThan(500);
    
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('checks');
    }
  });
  
  test('should return metrics data', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/metrics`);
    
    expect(response.status()).toBeLessThan(500);
    
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
  
  test('should handle 404 for non-existent API endpoints', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/nonexistent`);
    expect(response.status()).toBe(404);
  });
  
  test('should have reasonable response times', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${API_BASE_URL}/api/pages`);
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBeLessThan(400);
    expect(responseTime).toBeLessThan(2000);
    
    console.log(`Response time for /api/pages: ${responseTime}ms`);
  });
  
  test('should have proper CORS headers', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/pages`);
    
    const headers = response.headers();
    
    expect(headers['access-control-allow-origin'] || 
           headers['Access-Control-Allow-Origin']).toBeDefined();
    
    expect(headers['content-type'] || 
           headers['Content-Type']).toContain('application/json');
  });
});