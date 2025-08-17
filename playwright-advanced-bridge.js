#!/usr/bin/env node
const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

class PlaywrightBridge {
  constructor() {
    this.browser = null;
    this.page = null;
    this.screenshotDir = './screenshots';
    this.ensureScreenshotDir();
  }

  ensureScreenshotDir() {
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
  }

  async launch(browserType = 'chromium', headless = false) {
    const browsers = { chromium, firefox, webkit };
    this.browser = await browsers[browserType].launch({ 
      headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    return this.page;
  }

  async screenshot(url, options = {}) {
    try {
      if (!this.page) await this.launch();
      console.log(`📸 Navigating to: ${url}`);
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `screenshot-${timestamp}.png`;
      const filepath = path.join(this.screenshotDir, filename);
      
      await this.page.screenshot({ 
        path: filepath, 
        fullPage: options.fullPage || true,
        ...options 
      });
      
      console.log(`✅ Screenshot saved: ${filepath}`);
      return filepath;
    } catch (error) {
      console.error(`❌ Screenshot failed: ${error.message}`);
      throw error;
    }
  }

  async analyze(url) {
    try {
      if (!this.page) await this.launch();
      console.log(`🔍 Analyzing: ${url}`);
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      const analysis = await this.page.evaluate(() => ({
        title: document.title,
        url: location.href,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        elements: {
          images: document.querySelectorAll('img').length,
          links: document.querySelectorAll('a').length,
          forms: document.querySelectorAll('form').length,
          buttons: document.querySelectorAll('button').length,
          headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length
        },
        accessibility: {
          missingAltText: document.querySelectorAll('img:not([alt])').length,
          emptyLinks: document.querySelectorAll('a:empty').length,
          noHeadings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length === 0,
          missingLabels: document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]):not([title])').length
        },
        seo: {
          hasTitle: !!document.title,
          hasMetaDescription: !!document.querySelector('meta[name="description"]'),
          hasH1: document.querySelectorAll('h1').length > 0,
          h1Count: document.querySelectorAll('h1').length
        }
      }));
      
      console.log(`✅ Analysis complete for: ${analysis.title}`);
      return analysis;
    } catch (error) {
      console.error(`❌ Analysis failed: ${error.message}`);
      throw error;
    }
  }

  async responsiveScreenshots(url) {
    try {
      if (!this.page) await this.launch();
      
      const viewports = [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1920, height: 1080 }
      ];
      
      const screenshots = [];
      
      for (const viewport of viewports) {
        console.log(`📱 Capturing ${viewport.name} screenshot (${viewport.width}x${viewport.height})`);
        
        await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
        await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `screenshot-${viewport.name}-${timestamp}.png`;
        const filepath = path.join(this.screenshotDir, filename);
        
        await this.page.screenshot({ path: filepath, fullPage: true });
        screenshots.push({
          viewport: viewport.name,
          filepath: filepath,
          dimensions: `${viewport.width}x${viewport.height}`
        });
        
        console.log(`✅ ${viewport.name} screenshot saved: ${filepath}`);
      }
      
      return screenshots;
    } catch (error) {
      console.error(`❌ Responsive screenshots failed: ${error.message}`);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

async function main() {
  const bridge = new PlaywrightBridge();
  const command = process.argv[2];
  const url = process.argv[3] || 'http://localhost:8080';
  
  try {
    switch (command) {
      case 'screenshot':
        await bridge.screenshot(url);
        break;
      case 'analyze':
        const analysis = await bridge.analyze(url);
        console.log('\n📊 Analysis Results:');
        console.log(JSON.stringify(analysis, null, 2));
        break;
      case 'responsive':
        const screenshots = await bridge.responsiveScreenshots(url);
        console.log('\n📱 Responsive screenshots captured:', screenshots);
        break;
      default:
        console.log('Usage: node playwright-advanced-bridge.js <screenshot|analyze|responsive> [url]');
        console.log('Default URL: http://localhost:8080');
        console.log('\nCommands:');
        console.log('  screenshot [url]  - Capture a single screenshot');
        console.log('  analyze [url]     - Analyze page performance and accessibility');
        console.log('  responsive [url]  - Capture mobile, tablet, and desktop screenshots');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await bridge.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = PlaywrightBridge;
