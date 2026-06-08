#!/usr/bin/env node

/**
 * Bundle Analysis Script for Next.js Application
 * This script analyzes the production bundle to identify optimization opportunities
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Check if chalk is available, otherwise use basic colors
const hasChalk = (() => {
  try {
    require.resolve('chalk');
    return true;
  } catch {
    return false;
  }
})();

// Simple color functions if chalk is not available
const colors = {
  red: (text) => hasChalk ? chalk.red(text) : `\x1b[31m${text}\x1b[0m`,
  green: (text) => hasChalk ? chalk.green(text) : `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => hasChalk ? chalk.yellow(text) : `\x1b[33m${text}\x1b[0m`,
  blue: (text) => hasChalk ? chalk.blue(text) : `\x1b[34m${text}\x1b[0m`,
  magenta: (text) => hasChalk ? chalk.magenta(text) : `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => hasChalk ? chalk.cyan(text) : `\x1b[36m${text}\x1b[0m`,
  bold: (text) => hasChalk ? chalk.bold(text) : `\x1b[1m${text}\x1b[0m`,
};

class BundleAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.nextDir = path.join(this.projectRoot, '.next');
    this.analysisDir = path.join(this.projectRoot, 'bundle-analysis');
    this.reportFile = path.join(this.analysisDir, 'bundle-report.json');
    
    // Ensure analysis directory exists
    if (!fs.existsSync(this.analysisDir)) {
      fs.mkdirSync(this.analysisDir, { recursive: true });
    }
  }
  
  log(message, type = 'info') {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = `[${timestamp}]`;
    
    switch (type) {
      case 'success':
        console.log(`${prefix} ${colors.green('✓')} ${message}`);
        break;
      case 'warning':
        console.log(`${prefix} ${colors.yellow('⚠')} ${message}`);
        break;
      case 'error':
        console.log(`${prefix} ${colors.red('✗')} ${message}`);
        break;
      default:
        console.log(`${prefix} ${colors.blue('ℹ')} ${message}`);
    }
  }
  
  async buildApplication() {
    this.log('Building application for production analysis...');
    
    try {
      execSync('npm run build', { stdio: 'inherit', cwd: this.projectRoot });
      this.log('Build completed successfully', 'success');
      return true;
    } catch (error) {
      this.log('Build failed', 'error');
      return false;
    }
  }
  
  analyzeBundleStats() {
    this.log('Analyzing bundle statistics...');
    
    const statsFile = path.join(this.nextDir, 'analyze', 'client.json');
    
    if (!fs.existsSync(statsFile)) {
      this.log('Bundle stats file not found. Running analysis build...', 'warning');
      
      try {
        execSync('npm run build -- --analyze', { 
          stdio: 'inherit', 
          cwd: this.projectRoot 
        });
      } catch (error) {
        this.log('Analysis build failed', 'error');
        return null;
      }
    }
    
    if (!fs.existsSync(statsFile)) {
      this.log('Could not generate bundle stats', 'error');
      return null;
    }
    
    try {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      return stats;
    } catch (error) {
      this.log(`Error parsing stats file: ${error.message}`, 'error');
      return null;
    }
  }
  
  analyzeFileSizes() {
    this.log('Analyzing file sizes...');
    
    const clientDir = path.join(this.nextDir, 'static', 'chunks');
    const files = [];
    
    if (fs.existsSync(clientDir)) {
      this.collectFiles(clientDir, files);
    }
    
    // Sort by size
    files.sort((a, b) => b.size - a.size);
    
    return files.slice(0, 20); // Top 20 largest files
  }
  
  collectFiles(dir, files) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.collectFiles(fullPath, files);
      } else {
        const relativePath = path.relative(this.nextDir, fullPath);
        files.push({
          path: relativePath,
          size: stat.size,
          sizeMB: (stat.size / (1024 * 1024)).toFixed(2)
        });
      }
    }
  }
  
  analyzeDependencies() {
    this.log('Analyzing dependencies...');
    
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      this.log('package.json not found', 'error');
      return null;
    }
    
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const dependencies = packageJson.dependencies || {};
      const devDependencies = packageJson.devDependencies || {};
      
      // Get sizes of dependencies (this is a simplified approach)
      const depSizes = [];
      
      for (const [name, version] of Object.entries(dependencies)) {
        depSizes.push({
          name,
          version,
          type: 'dependency'
        });
      }
      
      for (const [name, version] of Object.entries(devDependencies)) {
        depSizes.push({
          name,
          version,
          type: 'devDependency'
        });
      }
      
      return depSizes;
    } catch (error) {
      this.log(`Error analyzing dependencies: ${error.message}`, 'error');
      return null;
    }
  }
  
  generateRecommendations(analysis) {
    this.log('Generating optimization recommendations...');
    
    const recommendations = [];
    
    // Check for large bundles
    if (analysis.largeFiles && analysis.largeFiles.length > 0) {
      const largeFiles = analysis.largeFiles.filter(file => file.sizeMB > 0.5);
      
      if (largeFiles.length > 0) {
        recommendations.push({
          type: 'large_files',
          severity: 'high',
          message: `Found ${largeFiles.length} files larger than 0.5MB`,
          details: largeFiles.map(file => `${file.path}: ${file.sizeMB}MB`),
          suggestion: 'Consider code splitting, lazy loading, or optimizing these files'
        });
      }
    }
    
    // Check for duplicate dependencies
    if (analysis.dependencies) {
      const depCount = analysis.dependencies.length;
      
      if (depCount > 50) {
        recommendations.push({
          type: 'many_dependencies',
          severity: 'medium',
          message: `Application has ${depCount} dependencies`,
          suggestion: 'Review dependencies and remove unused ones. Consider bundle splitting.'
        });
      }
    }
    
    // Check for missing optimizations
    recommendations.push({
      type: 'general_optimizations',
      severity: 'low',
      message: 'General performance optimizations',
      suggestions: [
        'Enable Next.js Image Optimization for all images',
        'Implement lazy loading for below-the-fold components',
        'Use dynamic imports for heavy components',
        'Optimize CSS with PurgeCSS or similar tools',
        'Implement service worker for caching',
        'Use CDN for static assets'
      ]
    });
    
    return recommendations;
  }
  
  generateReport(analysis) {
    this.log('Generating analysis report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      analysis: {
        largeFiles: analysis.largeFiles,
        dependencies: analysis.dependencies,
        recommendations: analysis.recommendations
      },
      summary: {
        totalLargeFiles: analysis.largeFiles ? analysis.largeFiles.length : 0,
        totalDependencies: analysis.dependencies ? analysis.dependencies.length : 0,
        totalRecommendations: analysis.recommendations ? analysis.recommendations.length : 0
      }
    };
    
    // Save report to file
    fs.writeFileSync(this.reportFile, JSON.stringify(report, null, 2));
    this.log(`Report saved to: ${this.reportFile}`, 'success');
    
    return report;
  }
  
  printSummary(report) {
    console.log('\n' + colors.bold('=' * 60));
    console.log(colors.bold('BUNDLE ANALYSIS SUMMARY'));
    console.log(colors.bold('=' * 60));
    
    console.log(`\n${colors.bold('Timestamp:')} ${report.timestamp}`);
    
    if (report.summary) {
      console.log(`\n${colors.bold('Statistics:')}`);
      console.log(`  • Large files (>0.5MB): ${colors.yellow(report.summary.totalLargeFiles)}`);
      console.log(`  • Dependencies: ${colors.blue(report.summary.totalDependencies)}`);
      console.log(`  • Recommendations: ${colors.green(report.summary.totalRecommendations)}`);
    }
    
    if (report.analysis && report.analysis.recommendations) {
      console.log(`\n${colors.bold('Top Recommendations:')}`);
      
      const highPriority = report.analysis.recommendations.filter(r => r.severity === 'high');
      const mediumPriority = report.analysis.recommendations.filter(r => r.severity === 'medium');
      
      if (highPriority.length > 0) {
        console.log(`\n${colors.red('High Priority:')}`);
        highPriority.forEach((rec, index) => {
          console.log(`  ${index + 1}. ${rec.message}`);
          if (rec.suggestion) console.log(`     → ${rec.suggestion}`);
        });
      }
      
      if (mediumPriority.length > 0) {
        console.log(`\n${colors.yellow('Medium Priority:')}`);
        mediumPriority.forEach((rec, index) => {
          console.log(`  ${index + 1}. ${rec.message}`);
          if (rec.suggestion) console.log(`     → ${rec.suggestion}`);
        });
      }
    }
    
    console.log('\n' + colors.bold('=' * 60));
    console.log(`Full report available at: ${this.reportFile}`);
    console.log(colors.bold('=' * 60));
  }
  
  async run() {
    console.log(colors.bold('\nNext.js Bundle Analyzer'));
    console.log(colors.bold('=' * 60));
    
    // Step 1: Build the application
    const buildSuccess = await this.buildApplication();
    if (!buildSuccess) {
      this.log('Cannot proceed with analysis due to build failure', 'error');
      process.exit(1);
    }
    
    // Step 2: Analyze bundle stats
    const stats = this.analyzeBundleStats();
    
    // Step 3: Analyze file sizes
    const largeFiles = this.analyzeFileSizes();
    
    // Step 4: Analyze dependencies
    const dependencies = this.analyzeDependencies();
    
    // Step 5: Generate recommendations
    const analysis = {
      largeFiles,
      dependencies,
      stats
    };
    
    const recommendations = this.generateRecommendations(analysis);
    analysis.recommendations = recommendations;
    
    // Step 6: Generate and save report
    const report = this.generateReport(analysis);
    
    // Step 7: Print summary
    this.printSummary(report);
    
    this.log('Analysis completed successfully', 'success');
  }
}

// Run the analyzer
const analyzer = new BundleAnalyzer();

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Bundle Analysis Script for Next.js

Usage:
  node scripts/analyze-bundle.js [options]

Options:
  --help, -h     Show this help message
  --build-only   Only build the application without analysis
  --analyze-only Only analyze existing build without rebuilding

Examples:
  node scripts/analyze-bundle.js          # Full analysis
  node scripts/analyze-bundle.js --build-only  # Build only
  `);
  process.exit(0);
}

if (args.includes('--build-only')) {
  analyzer.buildApplication().then(success => {
    process.exit(success ? 0 : 1);
  });
} else if (args.includes('--analyze-only')) {
  // Skip build and just analyze
  analyzer.analyzeBundleStats();
  const largeFiles = analyzer.analyzeFileSizes();
  const dependencies = analyzer.analyzeDependencies();
  
  const analysis = { largeFiles, dependencies };
  const recommendations = analyzer.generateRecommendations(analysis);
  analysis.recommendations = recommendations;
  
  const report = analyzer.generateReport(analysis);
  analyzer.printSummary(report);
} else {
  analyzer.run().catch(error => {
    console.error(colors.red(`Analysis failed: ${error.message}`));
    process.exit(1);
  });
}