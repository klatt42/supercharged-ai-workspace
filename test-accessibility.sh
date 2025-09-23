#!/bin/bash

# 🧪 ACCESSIBILITY COMPLIANCE TESTING SCRIPT
# Independent Restoration Expansion - Victoria Validator
# WCAG 2.1 Level AA Validation

echo "🧪 ACCESSIBILITY COMPLIANCE TESTING"
echo "====================================="
echo "Testing: Independent Restoration Landing Page"
echo "Standard: WCAG 2.1 Level AA"
echo "Focus: Heading Structure & Focus Management"
echo ""

# Set working directory
cd ~/Developer/projects/personal/supercharged-ai-workspace

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# ✅ Test 1: Heading Structure Validation
echo "🔍 TEST 1: HEADING STRUCTURE ANALYSIS"
echo "-------------------------------------"

echo "📋 Current heading hierarchy:"
grep -n "<h[1-6]" index.html | head -20 | while read line; do
    level=$(echo "$line" | grep -o "h[1-6]" | tr -d 'h')
    title=$(echo "$line" | sed 's/.*<h[1-6][^>]*>//; s/<\/h[1-6]>.*//' | cut -c1-50)
    line_num=$(echo "$line" | cut -d: -f1)
    echo "  Line $line_num: H$level - $title"
done

echo ""
echo "🔍 Checking for H1 elements:"
h1_count=$(grep -c "<h1" index.html)
echo "  H1 count: $h1_count"

if [ "$h1_count" -eq 1 ]; then
    echo "  ✅ PASS: Exactly one H1 found"
    h1_line=$(grep -n "<h1" index.html | head -1 | cut -d: -f1)
    echo "  📍 H1 location: Line $h1_line"
elif [ "$h1_count" -eq 0 ]; then
    echo "  ❌ FAIL: No H1 found"
else
    echo "  ⚠️  WARNING: Multiple H1 elements found ($h1_count)"
fi

echo ""
echo "🔍 Checking heading order:"
# Extract heading levels in order
grep "<h[1-6]" index.html | sed 's/.*<h\([1-6]\).*/\1/' > /tmp/heading_order.txt

# Check for proper hierarchy (simplified check)
first_heading=$(head -1 /tmp/heading_order.txt)
if [ "$first_heading" = "1" ]; then
    echo "  ✅ PASS: Document starts with H1"
else
    echo "  ❌ FAIL: Document does not start with H1 (starts with H$first_heading)"
fi

# ✅ Test 2: Skip Navigation Validation
echo ""
echo "🔍 TEST 2: SKIP NAVIGATION ANALYSIS"
echo "-----------------------------------"

skip_links=$(grep -c "skip-link" index.html)
echo "  Skip links found: $skip_links"

if [ "$skip_links" -gt 0 ]; then
    echo "  ✅ PASS: Skip navigation implemented"
    echo "  📋 Skip link targets:"
    grep -o 'href="#[^"]*"' index.html | grep -E "(main|content|navigation)" | head -5 | while read target; do
        echo "    $target"
    done
else
    echo "  ❌ FAIL: No skip navigation found"
fi

# ✅ Test 3: Heading ID Validation
echo ""
echo "🔍 TEST 3: HEADING ID ANALYSIS"
echo "------------------------------"

headings_with_ids=$(grep "<h[1-6]" index.html | grep -c "id=")
total_headings=$(grep -c "<h[1-6]" index.html)

echo "  Total headings: $total_headings"
echo "  Headings with IDs: $headings_with_ids"

if [ "$headings_with_ids" -eq "$total_headings" ]; then
    echo "  ✅ PASS: All headings have IDs"
elif [ "$headings_with_ids" -gt 0 ]; then
    echo "  ⚠️  PARTIAL: Some headings missing IDs ($headings_with_ids/$total_headings)"
else
    echo "  ❌ FAIL: No headings have IDs"
fi

# ✅ Test 4: Focus Management CSS Validation
echo ""
echo "🔍 TEST 4: FOCUS MANAGEMENT STYLES"
echo "----------------------------------"

focus_styles=$(grep -c ":focus" index.html)
echo "  Focus styles found: $focus_styles"

if [ "$focus_styles" -gt 0 ]; then
    echo "  ✅ PASS: Focus management styles present"
else
    echo "  ❌ FAIL: No focus styles found"
fi

# Check for outline styles
outline_styles=$(grep -c "outline:" index.html)
echo "  Outline styles: $outline_styles"

# ✅ Test 5: ARIA and Semantic HTML
echo ""
echo "🔍 TEST 5: SEMANTIC HTML & ARIA"
echo "-------------------------------"

main_elements=$(grep -c "<main" index.html)
section_elements=$(grep -c "<section" index.html)
aria_labels=$(grep -c "aria-label" index.html)

echo "  <main> elements: $main_elements"
echo "  <section> elements: $section_elements"
echo "  ARIA labels: $aria_labels"

if [ "$main_elements" -ge 1 ]; then
    echo "  ✅ PASS: Main landmark present"
else
    echo "  ❌ FAIL: No main landmark found"
fi

# ✅ Test 6: External Accessibility Testing (if available)
echo ""
echo "🔍 TEST 6: EXTERNAL VALIDATION TOOLS"
echo "------------------------------------"

if command_exists axe; then
    echo "  🔧 Running axe-core accessibility scan..."
    axe index.html --rules=heading-order,page-has-heading-one,focus-order-semantics 2>/dev/null || echo "  ⚠️  Axe scan failed or rules not found"
else
    echo "  ⚠️  axe-cli not installed"
    echo "  💡 Install with: npm install -g @axe-core/cli"
fi

if command_exists lighthouse; then
    echo "  🔧 Lighthouse accessibility check available"
else
    echo "  ⚠️  Lighthouse not available"
fi

# ✅ Test 7: Manual Testing Checklist
echo ""
echo "🔍 TEST 7: MANUAL TESTING CHECKLIST"
echo "-----------------------------------"
echo "  📋 Required manual tests:"
echo "    □ Tab navigation through all focusable elements"
echo "    □ Screen reader heading navigation (H key)"
echo "    □ Skip link functionality (Tab + Enter)"
echo "    □ Focus visibility in high contrast mode"
echo "    □ Keyboard access to all interactive elements"
echo "    □ Emergency form accessibility"
echo "    □ Phone link accessibility"

# ✅ Test Results Summary
echo ""
echo "📊 ACCESSIBILITY TEST SUMMARY"
echo "============================="

# Calculate basic score
score=0
total_tests=5

[ "$h1_count" -eq 1 ] && score=$((score + 1))
[ "$skip_links" -gt 0 ] && score=$((score + 1))
[ "$headings_with_ids" -gt 0 ] && score=$((score + 1))
[ "$focus_styles" -gt 0 ] && score=$((score + 1))
[ "$main_elements" -ge 1 ] && score=$((score + 1))

percentage=$((score * 100 / total_tests))

echo "  Automated tests passed: $score/$total_tests ($percentage%)"

if [ "$percentage" -ge 80 ]; then
    echo "  🎯 RESULT: GOOD - Ready for manual testing"
elif [ "$percentage" -ge 60 ]; then
    echo "  ⚠️  RESULT: NEEDS WORK - Address failing tests"
else
    echo "  ❌ RESULT: POOR - Major accessibility issues"
fi

echo ""
echo "🚀 NEXT STEPS:"
echo "  1. Address any failing automated tests"
echo "  2. Perform manual keyboard navigation testing"
echo "  3. Test with screen reader software"
echo "  4. Validate with external tools (axe, Lighthouse)"
echo "  5. Update Archon task status when complete"

echo ""
echo "🔗 ARCHON TASK UPDATE COMMAND:"
echo "python3 -c \"import requests; requests.put('http://localhost:3737/api/tasks/6055fc7d-9b40-4eb8-862a-88c897efee33', json={'status': 'review'})\""

# Cleanup
rm -f /tmp/heading_order.txt

echo ""
echo "✅ Accessibility testing complete!"