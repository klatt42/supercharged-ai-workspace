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

