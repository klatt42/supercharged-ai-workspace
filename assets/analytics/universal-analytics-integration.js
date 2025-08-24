/**
 * Alex Analytics: Universal Analytics Integration Script
 * Deploys Authority Reversal Framework™ tracking across entire restoration empire
 * Covers all 87+ pages with consistent conversion measurement
 */

// Script injection for all pages
const UNIVERSAL_TRACKING_SCRIPT = `
<!-- Alex Analytics: Authority Reversal Framework™ Universal Tracking -->
<script src="/analytics-conversion-tracking.js"></script>
<script src="/form-submission-handler.js"></script>

<!-- Enhanced Authority Reversal Analytics -->
<script>
// Page-specific Authority Reversal configuration
window.authorityReversalConfig = {
    page_type: document.location.pathname.includes('blog') ? 'educational' : 
               document.location.pathname.includes('restoration') ? 'regional_hub' :
               document.location.pathname.includes('-water-damage') ? 'service_emergency' :
               document.location.pathname.includes('-fire-damage') ? 'service_fire' :
               document.location.pathname.includes('-mold-') ? 'service_mold' :
               'landing',
    
    authority_hooks: {
        visible: document.querySelectorAll('[class*="hook"], [class*="authority"]').length,
        plumber_mentions: (document.body.textContent.match(/plumber/gi) || []).length,
        medical_mentions: (document.body.textContent.match(/medical|heart attack|doctor|diagnose/gi) || []).length
    },
    
    conversion_elements: {
        phone_links: document.querySelectorAll('a[href^="tel:"]').length,
        forms: document.querySelectorAll('form').length,
        cta_buttons: document.querySelectorAll('[class*="cta"], [class*="emergency"]').length
    }
};

// Track page-specific Authority Reversal effectiveness
gtag('event', 'authority_page_analysis', {
    'page_type': window.authorityReversalConfig.page_type,
    'authority_hooks_count': window.authorityReversalConfig.authority_hooks.visible,
    'plumber_mentions': window.authorityReversalConfig.authority_hooks.plumber_mentions,
    'medical_mentions': window.authorityReversalConfig.authority_hooks.medical_mentions,
    'conversion_elements': window.authorityReversalConfig.conversion_elements.phone_links + window.authorityReversalConfig.conversion_elements.forms,
    'framework': 'authority_reversal',
    'expected_lift': '53_percent_baseline'
});
</script>
`;

/**
 * Inject analytics into all HTML files
 */
function injectAnalyticsIntoFiles() {
    const fs = require('fs');
    const path = require('path');
    const glob = require('glob');
    
    // Find all HTML files
    const htmlFiles = glob.sync('**/*.html', {
        ignore: ['node_modules/**', 'dist/**', '.git/**']
    });
    
    console.log(`📊 Injecting analytics into ${htmlFiles.length} HTML files...`);
    
    htmlFiles.forEach(filePath => {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Skip if already has analytics integration
            if (content.includes('analytics-conversion-tracking.js')) {
                console.log(`✅ ${filePath} - Already has analytics`);
                return;
            }
            
            // Find insertion point (before closing </body> or before existing scripts)
            let insertionPoint = content.lastIndexOf('</body>');
            if (insertionPoint === -1) {
                insertionPoint = content.lastIndexOf('</html>');
            }
            
            if (insertionPoint !== -1) {
                // Insert analytics before closing tag
                const beforeClosing = content.substring(0, insertionPoint);
                const afterClosing = content.substring(insertionPoint);
                
                content = beforeClosing + UNIVERSAL_TRACKING_SCRIPT + '\n    ' + afterClosing;
                
                fs.writeFileSync(filePath, content);
                console.log(`✅ ${filePath} - Analytics injected`);
            } else {
                console.log(`⚠️  ${filePath} - No valid insertion point found`);
            }
            
        } catch (error) {
            console.log(`❌ ${filePath} - Error:`, error.message);
        }
    });
    
    console.log('📈 Universal analytics injection complete!');
}

/**
 * Create regional analytics dashboard configuration
 */
function generateAnalyticsDashboard() {
    const dashboardConfig = {
        title: "Authority Reversal Framework™ Performance Dashboard",
        regions: ["maryland", "dc", "virginia"],
        metrics: {
            conversion_rate: {
                baseline: 4,
                target: 6,
                authority_boost: 53
            },
            hook_effectiveness: {
                plumber_heart_attack: 53,
                plumber_fitness: 25,
                plumber_surgeon: 40
            },
            regional_performance: {
                maryland: { phone: "410-555-0199", expected_volume: "medium" },
                dc: { phone: "202-796-7422", expected_volume: "high" },
                virginia: { phone: "703-844-4204", expected_volume: "high" }
            }
        },
        goals: [
            { name: "Emergency Call", value: 8000, currency: "USD" },
            { name: "Form Submission", value: 5000, currency: "USD" },
            { name: "Authority Engagement", value: 500, currency: "USD" }
        ]
    };
    
    return JSON.stringify(dashboardConfig, null, 2);
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        injectAnalyticsIntoFiles,
        generateAnalyticsDashboard,
        UNIVERSAL_TRACKING_SCRIPT
    };
}

// Browser usage
if (typeof window !== 'undefined') {
    console.log('📊 Universal Analytics Integration Ready');
    console.log('🎯 Authority Reversal Framework™ tracking prepared for 87+ pages');
}