// 🧪 ALEX ANALYTICS: Authority Reversal Framework™ A/B Testing System
// Cross-Region Psychology Optimization & Conversion Testing

// A/B Testing Configuration for Authority Reversal Messaging
const authorityABTestConfig = {
    maryland: {
        testName: 'mechanic_child_surgery_variants',
        variants: {
            control: {
                hookMessage: "Would you let your mechanic perform surgery on your child?",
                empowermentMessage: "You choose your child's surgeon. Choose your restoration expert.",
                conversionTarget: '35-45%'
            },
            variant_a: {
                hookMessage: "Would you trust your car mechanic to operate on your child?", 
                empowermentMessage: "Parents choose their child's medical team. Choose your water damage team.",
                conversionTarget: '40-50%'
            },
            variant_b: {
                hookMessage: "Your mechanic fixes cars. Your surgeon saves lives. Who handles your child's emergency?",
                empowermentMessage: "Medical emergencies require medical experts. Water emergencies require water experts.",
                conversionTarget: '38-48%'
            }
        }
    },
    dc: {
        testName: 'barista_merger_variants',
        variants: {
            control: {
                hookMessage: "Would you let your barista negotiate your business merger?",
                empowermentMessage: "You choose your merger advisor. Choose your restoration expert.",
                conversionTarget: '30-40%'
            },
            variant_a: {
                hookMessage: "Coffee expertise ≠ Business expertise. Who handles your company's future?",
                empowermentMessage: "Executive decisions require executive expertise. Choose wisely.",
                conversionTarget: '35-45%'
            },
            variant_b: {
                hookMessage: "Your barista makes great coffee. Your business advisor secures your future.",
                empowermentMessage: "Business emergencies demand business expertise. Not insurance company decisions.",
                conversionTarget: '32-42%'
            }
        }
    },
    virginia: {
        testName: 'plumber_heart_attack_variants',
        variants: {
            control: {
                hookMessage: "Would you let your plumber diagnose your heart attack?",
                empowermentMessage: "You choose your doctor. Choose your restoration expert.",
                conversionTarget: '45-55%',
                provenBaseline: '53%'
            },
            variant_a: {
                hookMessage: "Pipes and hearts both carry vital fluids. Who do you trust with each?",
                empowermentMessage: "Medical decisions are yours. Restoration decisions should be too.",
                conversionTarget: '50-60%'
            },
            variant_b: {
                hookMessage: "Your plumber fixes pipes. Your cardiologist saves lives. Choose expertise for each.",
                empowermentMessage: "Emergency expertise matters. Your insurance company's contractor choice doesn't.",
                conversionTarget: '48-58%'
            }
        }
    }
};

// A/B Test Assignment and Tracking
function assignAuthorityABTest(region) {
    const config = authorityABTestConfig[region];
    const variants = Object.keys(config.variants);
    
    // Get or assign variant (persistent per session)
    let assignedVariant = sessionStorage.getItem(`authority_ab_${region}`);
    if (!assignedVariant) {
        assignedVariant = variants[Math.floor(Math.random() * variants.length)];
        sessionStorage.setItem(`authority_ab_${region}`, assignedVariant);
    }
    
    // Track A/B test assignment
    gtag('event', 'authority_ab_test_assigned', {
        'region': region,
        'test_name': config.testName,
        'variant': assignedVariant,
        'framework': 'authority_reversal',
        'baseline_target': config.variants[assignedVariant].conversionTarget
    });
    
    return {
        variant: assignedVariant,
        config: config.variants[assignedVariant],
        testName: config.testName
    };
}

// A/B Test Content Injection
function injectAuthorityABTestContent(region, testAssignment) {
    // Update hook message
    const hookElement = document.querySelector('#authority-hook-message');
    if (hookElement) {
        hookElement.textContent = testAssignment.config.hookMessage;
        
        // Track content injection
        gtag('event', 'authority_ab_content_injected', {
            'region': region,
            'variant': testAssignment.variant,
            'hook_message': testAssignment.config.hookMessage.substring(0, 50) + '...'
        });
    }
    
    // Update empowerment message
    const empowermentElement = document.querySelector('#authority-empowerment-message');
    if (empowermentElement) {
        empowermentElement.textContent = testAssignment.config.empowermentMessage;
    }
}

// A/B Test Conversion Tracking
function trackAuthorityABTestConversion(region, testAssignment, conversionType) {
    gtag('event', 'authority_ab_test_conversion', {
        'region': region,
        'test_name': testAssignment.testName,
        'variant': testAssignment.variant,
        'conversion_type': conversionType,
        'target_range': testAssignment.config.conversionTarget,
        'proven_baseline': testAssignment.config.provenBaseline || 'new_test',
        'framework': 'authority_reversal'
    });
    
    // Cross-region pattern recognition
    trackCrossRegionPatterns({
        [region]: 1 // Conversion event for pattern analysis
    });
}

// A/B Test Performance Analytics
function trackAuthorityABTestPerformance(region, testAssignment, engagementMetrics) {
    gtag('event', 'authority_ab_test_performance', {
        'region': region,
        'variant': testAssignment.variant,
        'hook_engagement_time': engagementMetrics.hookEngagementTime,
        'scroll_depth': engagementMetrics.scrollDepth,
        'page_time': engagementMetrics.timeOnPage,
        'authority_recognition_speed': engagementMetrics.authorityRecognitionTime,
        'empowerment_response': engagementMetrics.empowermentResponseType
    });
}

// Initialize A/B Testing for Regional Page
function initializeAuthorityABTesting(region) {
    // Assign A/B test variant
    const testAssignment = assignAuthorityABTest(region);
    
    // Inject A/B test content
    injectAuthorityABTestContent(region, testAssignment);
    
    // Track engagement metrics
    let engagementMetrics = {
        hookEngagementTime: 0,
        scrollDepth: 0,
        timeOnPage: Date.now(),
        authorityRecognitionTime: null,
        empowermentResponseType: null
    };
    
    // Hook engagement timing
    const hookElement = document.querySelector('#authority-hook-message');
    if (hookElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !engagementMetrics.hookEngagementTime) {
                    engagementMetrics.hookEngagementTime = Date.now() - engagementMetrics.timeOnPage;
                }
            });
        });
        observer.observe(hookElement);
    }
    
    // Scroll depth tracking
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        engagementMetrics.scrollDepth = Math.max(engagementMetrics.scrollDepth, scrollPercent);
    });
    
    // Conversion tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            engagementMetrics.authorityRecognitionTime = Date.now() - engagementMetrics.timeOnPage;
            engagementMetrics.empowermentResponseType = 'phone_conversion';
            
            trackAuthorityABTestConversion(region, testAssignment, 'phone_click');
            trackAuthorityABTestPerformance(region, testAssignment, engagementMetrics);
        });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            engagementMetrics.authorityRecognitionTime = Date.now() - engagementMetrics.timeOnPage;
            engagementMetrics.empowermentResponseType = 'form_conversion';
            
            trackAuthorityABTestConversion(region, testAssignment, 'form_submit');
            trackAuthorityABTestPerformance(region, testAssignment, engagementMetrics);
        });
    });
    
    return testAssignment;
}

// Cross-Region A/B Test Analytics Dashboard
function generateABTestAnalytics() {
    return {
        maryland: {
            testActive: 'mechanic_child_surgery_variants',
            variants: 3,
            conversionTracking: 'parental_protection_psychology'
        },
        dc: {
            testActive: 'barista_merger_variants', 
            variants: 3,
            conversionTracking: 'professional_authority_psychology'
        },
        virginia: {
            testActive: 'plumber_heart_attack_variants',
            variants: 3,
            conversionTracking: 'medical_authority_psychology',
            provenBaseline: '53_percent'
        }
    };
}

// Export for regional integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        authorityABTestConfig,
        assignAuthorityABTest,
        injectAuthorityABTestContent,
        trackAuthorityABTestConversion,
        trackAuthorityABTestPerformance,
        initializeAuthorityABTesting,
        generateABTestAnalytics
    };
}