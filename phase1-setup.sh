#!/bin/bash

echo "🚀 Phase 1: Foundation Enhancement Setup"
echo "========================================"
echo "This script sets up enhanced memory, Playwright integration, and health monitoring"
echo ""

# Verify we're in the right directory
if [[ ! "$(basename "$(pwd)")" == "supercharged-ai-workspace" ]]; then
    echo "❌ Please run this from the supercharged-ai-workspace directory"
    echo "Current directory: $(pwd)"
    exit 1
fi

echo "📁 Creating context directories..."
echo "   These directories will store templates, patterns, and solutions for reuse"
mkdir -p context/{design-systems,templates,workflows,patterns,solutions}
mkdir -p screenshots
echo "✅ Created: context subdirectories and screenshots folder"

echo ""
echo "📝 Backing up existing claude.md..."
if [ -f "claude.md" ]; then
    BACKUP_NAME="claude.md.backup.$(date +%Y%m%d_%H%M%S)"
    cp claude.md "$BACKUP_NAME"
    echo "✅ Backup created: $BACKUP_NAME"
else
    echo "ℹ️  No existing claude.md found (this is fine for new setups)"
fi

echo ""
echo "🧠 Installing enhanced claude.md configuration..."
echo "   This gives Claude Code enhanced memory, Archon integration, and workflow automation"

cat > claude.md << 'EOF'
# Supercharged Claude Code + Archon OS Integration

## 🎯 CRITICAL: ARCHON-FIRST WORKFLOW RULES

### Priority System:
1. **ALWAYS query Archon OS first** for project context and tasks
2. **Use Archon REST API** for all project/task management
3. **Apply Archon project data** to all development decisions
4. **Update Archon** with progress and results

## 🧠 Advanced Memory System

### Project Context Retrieval Protocol
- **Auto-query Archon OS** for related projects before any task
- **Load design patterns** from previous successful implementations  
- **Reference user preferences** and brand guidelines automatically
- **Inherit project relationships** and dependency mappings

### Decision Logging Framework
- **All architectural decisions** logged to Archon OS with reasoning
- **Pattern recognition** for recurring problems and solutions
- **Success metrics tracking** per project type and methodology
- **Failure analysis** with prevention strategies

### Context Inheritance System
- **New projects inherit** relevant patterns from similar completed projects
- **Design system consistency** enforced automatically
- **Code style patterns** preserved across sessions
- **Performance optimizations** carried forward

## 🎭 Visual Validation System

### Automated Screenshot Workflow
- **Capture screenshots** of all development interfaces automatically
- **Compare against design specifications** for visual consistency
- **Identify layout issues** and responsive design problems
- **Track visual changes** over development iterations
- **Store screenshots** in organized directory structure with timestamps

### Visual Analysis Protocol
- **Before starting work**: Screenshot current state for baseline
- **During development**: Regular screenshots for progress tracking
- **After major changes**: Full visual validation across all breakpoints
- **Pre-deployment**: Comprehensive visual testing suite

## 🛠️ Development Workflow Commands

### /start - Initialize Development Session
**Action**: Query Archon OS for active projects and priorities, verify system health

### /screenshot [url] - Visual Validation
**Action**: Capture screenshot, analyze visual elements, compare against specifications
**Usage**: `/screenshot` (uses localhost:8080) or `/screenshot http://example.com`

### /analyze [url] - Performance Analysis  
**Action**: Run comprehensive performance audit, accessibility check, SEO analysis
**Usage**: `/analyze` (uses localhost:8080) or `/analyze http://example.com`

### /health - System Health Check
**Action**: Verify all services, API connectivity, MCP servers, tool availability

### /validate - Full Visual Validation
**Action**: Run comprehensive visual validation workflow with responsive screenshots

### /responsive [url] - Multi-Device Screenshots
**Action**: Capture mobile, tablet, and desktop screenshots for responsive testing

## 🔗 API Integration Commands

### Archon OS Integration Examples
```bash
# Query all projects from Archon OS
curl -X GET "http://localhost:8181/api/projects" -H "accept: application/json" | jq '.'

# Create new project in Archon OS  
curl -X POST "http://localhost:8181/api/projects" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Project",
    "description": "Project description", 
    "status": "active"
  }'

# Get specific project details
curl -X GET "http://localhost:8181/api/projects/{project_id}" \
  -H "accept: application/json" | jq '.'
```

### Screenshot Automation Commands
```bash
# Take screenshot of current development
node playwright-advanced-bridge.js screenshot

# Take screenshot of specific URL
node playwright-advanced-bridge.js screenshot http://localhost:8080

# Analyze page performance and accessibility
node playwright-advanced-bridge.js analyze http://localhost:8080

# Capture responsive screenshots (mobile, tablet, desktop)
node playwright-advanced-bridge.js responsive http://localhost:8080

# Run full visual validation workflow
./visual-validation.sh
```

## 🏥 Health Monitoring

### Pre-Development Health Checks
1. **Service Verification**: Verify all services running (Archon OS, development servers)
2. **API Connectivity**: Check API endpoint availability and response times
3. **Tool Availability**: Validate Playwright, Node.js, and other dependencies
4. **Context Loading**: Confirm project context loaded from Archon OS
5. **File Structure**: Verify all required files and directories are present

### Automated Health Check Command
```bash
./health-check.sh
```

## 📊 Quality Assurance Protocols

### Pre-Development Checklist
- [ ] Archon OS services running and accessible
- [ ] Project context loaded from Archon API
- [ ] Development environment health verified
- [ ] Required tools and dependencies available
- [ ] Design specifications and brand guidelines accessible

### During Development Validation
- [ ] Regular screenshot capture for visual tracking
- [ ] Performance monitoring for Core Web Vitals
- [ ] Accessibility compliance checking
- [ ] Cross-browser and responsive design testing
- [ ] Code quality and security scanning

### Pre-Deployment Verification
- [ ] Comprehensive visual regression testing
- [ ] Performance benchmark comparison
- [ ] Accessibility audit completion
- [ ] SEO optimization verification
- [ ] Security vulnerability assessment

## 🎯 Success Tracking Metrics

### Project Performance Indicators
- **Development speed** (time from start to completion)
- **Quality scores** (performance, accessibility, SEO)
- **Visual consistency** (design specification adherence)
- **Code quality** (maintainability, security, performance)
- **User experience** (usability testing results)

### Learning and Improvement Tracking
- **Pattern recognition** (successful approaches identification)
- **Solution effectiveness** (problem resolution success rates)
- **Knowledge base growth** (new insights and solutions added)
- **Skill development** (expertise areas expansion)
- **Efficiency improvements** (workflow optimization results)

---

## 📋 Quick Reference Commands

**Health & Status:**
- `./health-check.sh` - Complete system health check
- `/health` - Quick health verification (in Claude Code)

**Visual Validation:**
- `/screenshot` - Quick screenshot of localhost:8080
- `/analyze` - Performance and accessibility analysis
- `/validate` - Full visual validation workflow
- `/responsive` - Multi-device screenshot capture

**Archon Integration:**
- `/start` - Begin session with Archon OS context loading
- Check API: `curl -X GET "http://localhost:8181/api/projects" -H "accept: application/json"`

**Manual Tools:**
- `node playwright-advanced-bridge.js screenshot [url]`
- `node playwright-advanced-bridge.js analyze [url]`
- `node playwright-advanced-bridge.js responsive [url]`
- `./visual-validation.sh`

EOF

echo "✅ Enhanced claude.md configuration installed"

echo ""
echo "🎭 Installing Playwright dependencies..."
echo "   Playwright enables automated screenshots and web page analysis"

# Check if Node.js is available
if ! command -v node > /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Install Playwright
echo "   Installing Playwright globally..."
npm install -g playwright @playwright/test

echo "   Installing Playwright browsers..."
npx playwright install

echo "   Installing system dependencies..."
npx playwright install-deps

echo "✅ Playwright installation complete"

echo ""
echo "🔧 Creating advanced Playwright bridge script..."
echo "   This script provides the screenshot and analysis functionality"

cat > playwright-advanced-bridge.js << 'EOF'
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
EOF

chmod +x playwright-advanced-bridge.js
echo "✅ Playwright bridge script created and made executable"

echo ""
echo "🎬 Creating visual validation workflow..."
echo "   This script runs comprehensive visual testing with multiple viewports"

cat > visual-validation.sh << 'EOF'
#!/bin/bash

echo "🎭 Starting Visual Validation Workflow..."
echo "========================================"

# Check if development server is running
echo "🔍 Checking if development server is accessible..."
if ! curl -s http://localhost:8080 > /dev/null; then
    echo "❌ Development server not running at localhost:8080"
    echo "💡 Please start your development server first with: python3 -m http.server 8080"
    exit 1
fi

echo "✅ Development server is running"

# Create timestamped validation directory
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
VALIDATION_DIR="screenshots/validation_$TIMESTAMP"
mkdir -p "$VALIDATION_DIR"

echo "📁 Created validation directory: $VALIDATION_DIR"

echo ""
echo "📸 Capturing responsive screenshots..."
node playwright-advanced-bridge.js responsive http://localhost:8080

echo ""
echo "🔍 Analyzing page performance and accessibility..."
node playwright-advanced-bridge.js analyze http://localhost:8080 > "$VALIDATION_DIR/analysis.json"

# Move screenshots to validation directory
echo "📁 Organizing screenshots..."
mv screenshots/screenshot-*.png "$VALIDATION_DIR/" 2>/dev/null || true

echo ""
echo "✅ Visual validation complete!"
echo "📁 Results saved in: $VALIDATION_DIR"
echo "📊 Analysis report: $VALIDATION_DIR/analysis.json"

# Display quick analysis summary
if [ -f "$VALIDATION_DIR/analysis.json" ]; then
    echo ""
    echo "📋 Quick Analysis Summary:"
    node -e "
    try {
        const fs = require('fs');
        const analysis = JSON.parse(fs.readFileSync('$VALIDATION_DIR/analysis.json', 'utf8'));
        console.log('📄 Title:', analysis.title || 'No title');
        console.log('🖼️  Images:', analysis.elements.images);
        console.log('🔗 Links:', analysis.elements.links);
        console.log('🏷️  Headings:', analysis.elements.headings);
        
        const accessibilityIssues = analysis.accessibility.missingAltText + analysis.accessibility.emptyLinks + analysis.accessibility.missingLabels;
        console.log('♿ Accessibility Issues:', accessibilityIssues);
        
        const seoScore = (analysis.seo.hasTitle && analysis.seo.hasMetaDescription && analysis.seo.hasH1) ? 'Good ✅' : 'Needs Improvement ⚠️';
        console.log('🔍 SEO Score:', seoScore);
    } catch (error) {
        console.log('❌ Could not parse analysis results');
    }
    "
fi

echo ""
echo "🎉 Visual validation workflow complete!"

EOF

chmod +x visual-validation.sh
echo "✅ Visual validation workflow created and made executable"

echo ""
echo "🏥 Creating health check script..."
echo "   This script verifies all system components are working correctly"

cat > health-check.sh << 'EOF'
#!/bin/bash

echo "🏥 System Health Check"
echo "====================="
echo ""

# Check Archon OS Services
echo "🔍 Checking Archon OS Services..."
if curl -s http://localhost:3737 > /dev/null; then
    echo "✅ Archon UI (port 3737) - Running"
else
    echo "❌ Archon UI (port 3737) - Not accessible"
    echo "💡 Run: docker-compose up -d to start Archon OS"
fi

if curl -s http://localhost:8181/api/projects > /dev/null; then
    echo "✅ Archon API (port 8181) - Running"
    
    # Test API functionality
    PROJECT_COUNT=$(curl -s http://localhost:8181/api/projects | jq '. | length' 2>/dev/null || echo "unknown")
    echo "📊 Projects in Archon OS: $PROJECT_COUNT"
else
    echo "❌ Archon API (port 8181) - Not accessible"
fi

echo ""

# Check Development Server
echo "🔍 Checking Development Server..."
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Development Server (port 8080) - Running"
    
    # Get page title if possible
    PAGE_TITLE=$(curl -s http://localhost:8080 | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g' 2>/dev/null || echo "Unknown")
    echo "📄 Current page: $PAGE_TITLE"
else
    echo "❌ Development Server (port 8080) - Not accessible"
    echo "💡 Run: python3 -m http.server 8080 to start development server"
fi

echo ""

# Check Dependencies
echo "🔍 Checking Dependencies..."
if command -v node > /dev/null; then
    echo "✅ Node.js - $(node --version)"
else
    echo "❌ Node.js - Not installed"
fi

if command -v npx > /dev/null; then
    echo "✅ npx - Available"
else
    echo "❌ npx - Not available"
fi

if npx playwright --version > /dev/null 2>&1; then
    echo "✅ Playwright - $(npx playwright --version)"
else
    echo "❌ Playwright - Not installed or not working"
    echo "💡 Run the setup script again to install Playwright"
fi

if command -v jq > /dev/null; then
    echo "✅ jq (JSON processor) - Available"
else
    echo "⚠️  jq - Not installed (recommended for API testing)"
    echo "💡 Install with: sudo apt install jq"
fi

echo ""

# Check Project Files
echo "🔍 Checking Project Files..."
if [ -f "claude.md" ]; then
    echo "✅ claude.md - Present"
    LINES=$(wc -l < claude.md)
    echo "📄 Lines in claude.md: $LINES"
else
    echo "❌ claude.md - Missing"
fi

if [ -f "playwright-advanced-bridge.js" ]; then
    echo "✅ Playwright Bridge - Present"
else
    echo "❌ Playwright Bridge - Missing"
fi

if [ -d "screenshots" ]; then
    SCREENSHOT_COUNT=$(find screenshots -name "*.png" 2>/dev/null | wc -l)
    echo "✅ Screenshots Directory - Present ($SCREENSHOT_COUNT screenshots)"
else
    echo "❌ Screenshots Directory - Missing"
fi

if [ -d "context" ]; then
    echo "✅ Context Directory - Present"
else
    echo "❌ Context Directory - Missing"
fi

echo ""
echo "🎯 Health Check Summary:"

# Count issues
ISSUES=0
if ! curl -s http://localhost:3737 > /dev/null; then ((ISSUES++)); fi
if ! curl -s http://localhost:8181/api/projects > /dev/null; then ((ISSUES++)); fi
if ! curl -s http://localhost:8080 > /dev/null; then ((ISSUES++)); fi
if ! command -v node > /dev/null; then ((ISSUES++)); fi
if ! npx playwright --version > /dev/null 2>&1; then ((ISSUES++)); fi
if [ ! -f "claude.md" ]; then ((ISSUES++)); fi
if [ ! -f "playwright-advanced-bridge.js" ]; then ((ISSUES++)); fi

if [ $ISSUES -eq 0 ]; then
    echo "🎉 All systems are healthy and ready!"
    echo "✅ You can now start Claude Code with enhanced capabilities"
else
    echo "⚠️  Found $ISSUES issue(s) that need attention"
    echo "💡 Address the issues above before proceeding"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Address any issues shown above"
echo "2. Test the tools with: node playwright-advanced-bridge.js screenshot"
echo "3. Start Claude Code with: claude code"
echo "4. Use enhanced commands like /start, /screenshot, /analyze"

EOF

chmod +x health-check.sh
echo "✅ Health check script created and made executable"

echo ""
echo "🎉 Phase 1: Foundation Enhancement Setup Complete!"
echo "=================================================="
echo ""
echo "📁 Created files and directories:"
echo "  ✅ Enhanced claude.md configuration"
echo "  ✅ playwright-advanced-bridge.js (screenshot and analysis tool)"
echo "  ✅ visual-validation.sh (comprehensive visual testing)"
echo "  ✅ health-check.sh (system health monitoring)"
echo "  ✅ context/ directory structure"
echo "  ✅ screenshots/ directory"
echo ""
echo "🧪 Quick Test Commands:"
echo "  ./health-check.sh                           # Check system health"
echo "  node playwright-advanced-bridge.js screenshot    # Take a screenshot"
echo "  node playwright-advanced-bridge.js analyze       # Analyze current page"
echo "  ./visual-validation.sh                      # Full visual validation"
echo ""
echo "🔗 API Test:"
echo "  curl -X GET \"http://localhost:8181/api/projects\" -H \"accept: application/json\""
echo ""
echo "🚀 Ready for Claude Code!"
echo "Start Claude Code with: claude code"
echo "Then use enhanced commands: /start, /screenshot, /analyze, /health"
