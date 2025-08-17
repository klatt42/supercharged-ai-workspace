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

