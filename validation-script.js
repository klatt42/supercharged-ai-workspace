/**
 * Schema Markup and Phone Number Validation Script
 * Victoria Validator - Cross-Page Navigation & SEO Integration
 * Validates consistency across all Authority Reversal Framework pages
 */

const fs = require('fs');
const path = require('path');

// Expected phone numbers by region
const EXPECTED_PHONES = {
    maryland: ['410-555-0199', '240-555-0199'],
    dc: ['202-796-7422'],
    virginia: ['703-844-4204'],
    nova: ['703-844-4204']
};

// Expected Authority Reversal psychology hooks
const EXPECTED_AUTHORITY_HOOKS = [
    'Would you let your funeral director pick your doctor?',
    'Would you let your plumber handle your heart attack?'
];

/**
 * Validate Schema markup in HTML content
 * @param {string} htmlContent - HTML content to validate
 * @param {string} filename - File being validated
 * @returns {Object} Validation results
 */
function validateSchemaMarkup(htmlContent, filename) {
    const results = {
        hasSchema: false,
        schemaType: null,
        hasOrganizationInfo: false,
        hasServiceArea: false,
        hasTelephone: false,
        hasOfferCatalog: false,
        errors: []
    };
    
    // Check for JSON-LD schema
    const schemaMatch = htmlContent.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    
    if (schemaMatch) {
        results.hasSchema = true;
        
        try {
            const schemaData = JSON.parse(schemaMatch[1]);
            
            // Check schema type
            if (schemaData['@type']) {
                results.schemaType = schemaData['@type'];
            }
            
            // Check for required fields
            if (schemaData.name || schemaData['@name']) {
                results.hasOrganizationInfo = true;
            }
            
            if (schemaData.serviceArea) {
                results.hasServiceArea = true;
            }
            
            if (schemaData.telephone) {
                results.hasTelephone = true;
            }
            
            if (schemaData.hasOfferCatalog) {
                results.hasOfferCatalog = true;
            }
            
        } catch (error) {
            results.errors.push(`Invalid JSON-LD schema: ${error.message}`);
        }
    } else {
        results.errors.push('No JSON-LD schema found');
    }
    
    return results;
}

/**
 * Validate phone numbers in HTML content
 * @param {string} htmlContent - HTML content to validate
 * @param {string} filename - File being validated
 * @returns {Object} Validation results
 */
function validatePhoneNumbers(htmlContent, filename) {
    const results = {
        phoneNumbers: [],
        correctPhones: [],
        incorrectPhones: [],
        missingPhones: false
    };
    
    // Extract phone numbers from various formats
    const phonePatterns = [
        /(\d{3}[-\s]?\d{3}[-\s]?\d{4})/g,
        /tel:(\d{3}[-\s]?\d{3}[-\s]?\d{4})/g,
        /(\(\d{3}\)\s?\d{3}[-\s]?\d{4})/g
    ];
    
    phonePatterns.forEach(pattern => {
        let matches;
        while ((matches = pattern.exec(htmlContent)) !== null) {
            const phone = matches[1].replace(/[-\s\(\)]/g, '');
            if (phone.length === 10) {
                const formattedPhone = `${phone.slice(0,3)}-${phone.slice(3,6)}-${phone.slice(6)}`;
                if (!results.phoneNumbers.includes(formattedPhone)) {
                    results.phoneNumbers.push(formattedPhone);
                }
            }
        }
    });
    
    // Determine expected phone based on filename
    let expectedPhones = [];
    
    if (filename.includes('maryland') || filename.includes('montgomery') || 
        filename.includes('annapolis') || filename.includes('frederick') || 
        filename.includes('washington-county')) {
        expectedPhones = EXPECTED_PHONES.maryland;
    } else if (filename.includes('dc') || filename.includes('georgetown') || 
               filename.includes('capitol') || filename.includes('dupont') || 
               filename.includes('adams') || filename.includes('foggy')) {
        expectedPhones = EXPECTED_PHONES.dc;
    } else if (filename.includes('virginia') || filename.includes('fairfax') || 
               filename.includes('arlington') || filename.includes('loudoun') || 
               filename.includes('prince-william')) {
        expectedPhones = EXPECTED_PHONES.virginia;
    }
    
    // Validate phone numbers
    results.phoneNumbers.forEach(phone => {
        if (expectedPhones.includes(phone)) {
            results.correctPhones.push(phone);
        } else {
            results.incorrectPhones.push(phone);
        }
    });
    
    results.missingPhones = results.phoneNumbers.length === 0;
    
    return results;
}

/**
 * Validate Authority Reversal messaging
 * @param {string} htmlContent - HTML content to validate
 * @param {string} filename - File being validated
 * @returns {Object} Validation results
 */
function validateAuthorityReversal(htmlContent, filename) {
    const results = {
        hasAuthorityHook: false,
        hookFound: null,
        hasEmpowermentMessage: false,
        consistentFramework: false
    };
    
    // Check for authority reversal hooks
    EXPECTED_AUTHORITY_HOOKS.forEach(hook => {
        if (htmlContent.includes(hook)) {
            results.hasAuthorityHook = true;
            results.hookFound = hook;
        }
    });
    
    // Check for empowerment message patterns
    const empowermentPatterns = [
        'Exercise YOUR authority',
        'Choose YOUR',
        'not your insurance company',
        'empowerment-message'
    ];
    
    empowermentPatterns.forEach(pattern => {
        if (htmlContent.includes(pattern)) {
            results.hasEmpowermentMessage = true;
        }
    });
    
    // Check framework consistency
    if (filename.includes('dc') || filename.includes('georgetown') || 
        filename.includes('capitol') || filename.includes('dupont') || 
        filename.includes('adams') || filename.includes('foggy')) {
        results.consistentFramework = htmlContent.includes('funeral director');
    } else {
        results.consistentFramework = htmlContent.includes('plumber');
    }
    
    return results;
}

/**
 * Validate mobile responsiveness indicators
 * @param {string} htmlContent - HTML content to validate
 * @param {string} filename - File being validated
 * @returns {Object} Validation results
 */
function validateMobileResponsiveness(htmlContent, filename) {
    const results = {
        hasViewportMeta: false,
        hasResponsiveCSS: false,
        hasMediaQueries: false,
        hasMobileOptimization: false
    };
    
    // Check for viewport meta tag
    results.hasViewportMeta = htmlContent.includes('viewport');
    
    // Check for responsive CSS patterns
    const responsivePatterns = [
        '@media',
        'max-width',
        'min-width',
        'grid-template-columns',
        'flex'
    ];
    
    responsivePatterns.forEach(pattern => {
        if (htmlContent.includes(pattern)) {
            results.hasResponsiveCSS = true;
        }
    });
    
    // Check for media queries
    results.hasMediaQueries = htmlContent.includes('@media');
    
    // Overall mobile optimization check
    results.hasMobileOptimization = results.hasViewportMeta && 
                                   results.hasResponsiveCSS && 
                                   results.hasMediaQueries;
    
    return results;
}

/**
 * Validate a single HTML file
 * @param {string} filepath - Path to HTML file
 * @returns {Object} Complete validation results
 */
function validateHTMLFile(filepath) {
    const filename = path.basename(filepath);
    const htmlContent = fs.readFileSync(filepath, 'utf8');
    
    return {
        filename,
        schema: validateSchemaMarkup(htmlContent, filename),
        phones: validatePhoneNumbers(htmlContent, filename),
        authority: validateAuthorityReversal(htmlContent, filename),
        mobile: validateMobileResponsiveness(htmlContent, filename)
    };
}

/**
 * Generate validation report
 * @param {Array} validationResults - Results from all files
 * @returns {string} HTML report
 */
function generateValidationReport(validationResults) {
    let report = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authority Reversal Framework - Validation Report</title>
    <style>
        body { font-family: 'Inter', sans-serif; margin: 20px; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        .summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .file-result { background: white; margin: 15px 0; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .file-name { font-weight: bold; font-size: 1.1em; color: #1f2937; margin-bottom: 10px; }
        .validation-section { margin: 10px 0; }
        .validation-section h4 { margin: 5px 0; color: #374151; }
        .success { color: #059669; }
        .error { color: #dc2626; }
        .warning { color: #d97706; }
        .metric { display: inline-block; margin: 5px 10px 5px 0; padding: 5px 10px; border-radius: 4px; font-size: 0.9em; }
        .metric.good { background: #d1fae5; color: #065f46; }
        .metric.bad { background: #fee2e2; color: #991b1b; }
        .metric.warning { background: #fef3c7; color: #92400e; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Authority Reversal Framework - Validation Report</h1>
        <p><strong>Victoria Validator</strong> - Cross-Page Navigation & SEO Integration</p>
        <p>Generated: ${new Date().toLocaleString()}</p>
        
        <div class="summary">
            <h2>📊 Summary Statistics</h2>
            <p>Total files validated: <strong>${validationResults.length}</strong></p>
    `;
    
    // Calculate summary stats
    let schemaCount = 0;
    let phoneErrors = 0;
    let authorityErrors = 0;
    let mobileOptimized = 0;
    
    validationResults.forEach(result => {
        if (result.schema.hasSchema) schemaCount++;
        if (result.phones.incorrectPhones.length > 0 || result.phones.missingPhones) phoneErrors++;
        if (!result.authority.hasAuthorityHook) authorityErrors++;
        if (result.mobile.hasMobileOptimization) mobileOptimized++;
    });
    
    report += `
            <div class="metric good">Schema Markup: ${schemaCount}/${validationResults.length}</div>
            <div class="metric ${phoneErrors === 0 ? 'good' : 'bad'}">Phone Validation: ${validationResults.length - phoneErrors}/${validationResults.length}</div>
            <div class="metric ${authorityErrors === 0 ? 'good' : 'bad'}">Authority Hooks: ${validationResults.length - authorityErrors}/${validationResults.length}</div>
            <div class="metric ${mobileOptimized === validationResults.length ? 'good' : 'warning'}">Mobile Optimized: ${mobileOptimized}/${validationResults.length}</div>
        </div>
        
        <h2>📋 Individual File Results</h2>
    `;
    
    validationResults.forEach(result => {
        report += `
        <div class="file-result">
            <div class="file-name">${result.filename}</div>
            
            <div class="validation-section">
                <h4>🏷️ Schema Markup</h4>
                <span class="${result.schema.hasSchema ? 'success' : 'error'}">
                    ${result.schema.hasSchema ? '✅' : '❌'} Schema Present: ${result.schema.schemaType || 'None'}
                </span>
                ${result.schema.errors.length > 0 ? `<br><span class="error">Errors: ${result.schema.errors.join(', ')}</span>` : ''}
            </div>
            
            <div class="validation-section">
                <h4>📞 Phone Numbers</h4>
                <span class="${result.phones.missingPhones ? 'error' : 'success'}">
                    Found: ${result.phones.phoneNumbers.join(', ') || 'None'}
                </span>
                ${result.phones.incorrectPhones.length > 0 ? `<br><span class="error">❌ Incorrect: ${result.phones.incorrectPhones.join(', ')}</span>` : ''}
                ${result.phones.correctPhones.length > 0 ? `<br><span class="success">✅ Correct: ${result.phones.correctPhones.join(', ')}</span>` : ''}
            </div>
            
            <div class="validation-section">
                <h4>🎯 Authority Reversal</h4>
                <span class="${result.authority.hasAuthorityHook ? 'success' : 'error'}">
                    ${result.authority.hasAuthorityHook ? '✅' : '❌'} Hook: ${result.authority.hookFound || 'Missing'}
                </span>
                <br><span class="${result.authority.hasEmpowermentMessage ? 'success' : 'warning'}">
                    ${result.authority.hasEmpowermentMessage ? '✅' : '⚠️'} Empowerment Message
                </span>
                <br><span class="${result.authority.consistentFramework ? 'success' : 'warning'}">
                    ${result.authority.consistentFramework ? '✅' : '⚠️'} Framework Consistency
                </span>
            </div>
            
            <div class="validation-section">
                <h4>📱 Mobile Responsiveness</h4>
                <span class="${result.mobile.hasViewportMeta ? 'success' : 'error'}">
                    ${result.mobile.hasViewportMeta ? '✅' : '❌'} Viewport Meta
                </span>
                <span class="${result.mobile.hasMediaQueries ? 'success' : 'warning'}">
                    ${result.mobile.hasMediaQueries ? '✅' : '⚠️'} Media Queries
                </span>
                <span class="${result.mobile.hasMobileOptimization ? 'success' : 'warning'}">
                    ${result.mobile.hasMobileOptimization ? '✅' : '⚠️'} Mobile Optimized
                </span>
            </div>
        </div>
        `;
    });
    
    report += `
    </div>
</body>
</html>
    `;
    
    return report;
}

// Main execution function
function validateAllPages() {
    const htmlFiles = fs.readdirSync(__dirname)
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.includes('dashboard') && !file.includes('interface') && !file.includes('test'))
        .map(file => path.join(__dirname, file));
    
    const results = htmlFiles.map(validateHTMLFile);
    const report = generateValidationReport(results);
    
    fs.writeFileSync(path.join(__dirname, 'validation-report.html'), report);
    
    console.log('✅ Validation completed!');
    console.log(`📊 Validated ${results.length} files`);
    console.log('📋 Report generated: validation-report.html');
    
    return results;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateHTMLFile,
        validateAllPages,
        generateValidationReport
    };
}

// Always run validation when script is executed
console.log('🔍 Starting Victoria Validator - Cross-Page Navigation & SEO Integration...');
validateAllPages();