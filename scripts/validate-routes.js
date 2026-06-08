const fs = require('fs');
const path = require('path');
const axios = require('axios');

const NAV_MENU_PATH = path.join(__dirname, '../../live-nav-menu-txt');
const BASE_URL = 'http://localhost:3002';
const API_BASE_URL = 'http://127.0.0.1:8090';

function extractUrlsFromHtml(html) {
  const urlRegex = /href="([^"]+)"/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.startsWith('/') && !url.startsWith('/#') && url !== '/') {
      urls.push(url);
    }
  }
  
  return [...new Set(urls)];
}

async function validateRoute(url) {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      timeout: 10000,
      validateStatus: (status) => status < 500,
    });
    
    return {
      url,
      status: response.status,
      ok: response.status === 200,
      error: response.status !== 200 ? `HTTP ${response.status}` : null,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

async function validateApiEndpoint(endpoint) {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      timeout: 5000,
      validateStatus: (status) => status < 500,
    });
    
    return {
      endpoint,
      status: response.status,
      ok: response.status === 200,
      responseTime: response.headers['x-response-time'],
      error: response.status !== 200 ? `HTTP ${response.status}` : null,
    };
  } catch (error) {
    return {
      endpoint,
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

async function main() {
  console.log('🔍 Starting route validation...\n');
  
  if (!fs.existsSync(NAV_MENU_PATH)) {
    console.error(`❌ Navigation menu file not found: ${NAV_MENU_PATH}`);
    process.exit(1);
  }
  
  const html = fs.readFileSync(NAV_MENU_PATH, 'utf8');
  const urls = extractUrlsFromHtml(html);
  
  console.log(`📊 Found ${urls.length} unique URLs to validate:\n`);
  urls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  
  console.log('\n🚀 Validating routes...\n');
  
  const results = [];
  for (const url of urls) {
    process.stdout.write(`  Validating ${url}... `);
    const result = await validateRoute(url);
    results.push(result);
    
    if (result.ok) {
      console.log('✅ OK');
    } else {
      console.log(`❌ FAILED: ${result.error}`);
    }
  }
  
  const successful = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  
  console.log('\n📈 Validation Summary:');
  console.log(`  ✅ Successful: ${successful}/${urls.length}`);
  console.log(`  ❌ Failed: ${failed}/${urls.length}`);
  
  if (failed > 0) {
    console.log('\n🔴 Failed URLs:');
    results
      .filter(r => !r.ok)
      .forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.url} - ${result.error}`);
      });
  }
  
  console.log('\n🔧 API Endpoint Validation...\n');
  
  const apiEndpoints = [
    '/api/pages',
    '/api/filter-data',
    '/api/form',
    '/api/verify-location',
    '/api/calculator',
    '/api/search-form',
  ];
  
  const apiResults = [];
  for (const endpoint of apiEndpoints) {
    process.stdout.write(`  Validating ${endpoint}... `);
    const result = await validateApiEndpoint(endpoint);
    apiResults.push(result);
    
    if (result.ok) {
      console.log('✅ OK');
    } else {
      console.log(`❌ FAILED: ${result.error}`);
    }
  }
  
  const apiSuccessful = apiResults.filter(r => r.ok).length;
  const apiFailed = apiResults.filter(r => !r.ok).length;
  
  console.log('\n📈 API Validation Summary:');
  console.log(`  ✅ Successful: ${apiSuccessful}/${apiEndpoints.length}`);
  console.log(`  ❌ Failed: ${apiFailed}/${apiEndpoints.length}`);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalUrls: urls.length,
    successfulRoutes: successful,
    failedRoutes: failed,
    successfulApis: apiSuccessful,
    failedApis: apiFailed,
    failedUrls: results.filter(r => !r.ok).map(r => ({ url: r.url, error: r.error })),
    failedApis: apiResults.filter(r => !r.ok).map(r => ({ endpoint: r.endpoint, error: r.error })),
  };
  
  const reportPath = path.join(__dirname, '../../route-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Report saved to: ${reportPath}`);
  
  if (failed > 0 || apiFailed > 0) {
    console.log('\n⚠️  Some routes failed validation. Please check the report.');
    process.exit(1);
  } else {
    console.log('\n🎉 All routes validated successfully!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('❌ Validation failed:', error.message);
  process.exit(1);
});