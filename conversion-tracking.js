/**
 * 🎯 REVOLUTIONARY HOOK POINT CONVERSION TRACKING
 * Funeral Director Analogy Performance Monitoring
 * 
 * This script tracks the psychological effectiveness of the
 * revolutionary "funeral director picks your doctor" Hook Point
 */

// Initialize tracking when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeHookPointTracking();
    setupConversionTracking();
    monitorPsychologicalTriggers();
});

/**
 * Initialize Hook Point A/B Testing and Tracking
 */
function initializeHookPointTracking() {
    const variants = [
        { 
            id: 'funeral-director-analogy', 
            weight: 85, 
            name: 'Funeral Director Hook Point',
            description: 'Revolutionary death psychology analogy'
        },
        { 
            id: 'life-death-choice', 
            weight: 10, 
            name: 'Life/Death Choice',
            description: 'Personal responsibility for survival'  
        },
        { 
            id: 'insurance-betrayal', 
            weight: 5, 
            name: 'Insurance Betrayal',
            description: 'Conflict of interest psychology'
        }
    ];
    
    // Select variant based on weighted distribution
    const selectedVariant = selectWeightedVariant(variants);
    
    // Track variant assignment
    trackEvent('variant_assigned', {
        variant_type: selectedVariant.id,
        variant_name: selectedVariant.name,
        experiment: 'funeral_director_hook_point',
        psychological_approach: selectedVariant.description
    });
    
    // Store variant for conversion attribution
    sessionStorage.setItem('hookPointVariant', selectedVariant.id);
    sessionStorage.setItem('hookPointName', selectedVariant.name);
    
    // Initialize variant-specific tracking
    initializeVariantTracking(selectedVariant);
    
    console.log('🎯 Hook Point Variant Selected:', selectedVariant.name);
}

/**
 * Weighted variant selection algorithm
 */
function selectWeightedVariant(variants) {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const variant of variants) {
        cumulative += variant.weight;
        if (random <= cumulative) {
            return variant;
        }
    }
    
    return variants[0]; // Fallback to funeral director analogy
}

/**
 * Set up comprehensive conversion tracking
 */
function setupConversionTracking() {
    // Form submission tracking
    const form = document.getElementById('ultimate-survival-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            trackFormSubmission(e);
        });
        
        // Track form field interactions
        setupFormFieldTracking(form);
    }
    
    // Phone call tracking
    setupPhoneCallTracking();
    
    // Variant button tracking
    setupVariantButtonTracking();
    
    // Scroll depth tracking for psychological engagement
    setupScrollDepthTracking();
}

/**
 * Track form submission with detailed psychology data
 */
function trackFormSubmission(event) {
    const variant = sessionStorage.getItem('hookPointVariant') || 'unknown';
    const variantName = sessionStorage.getItem('hookPointName') || 'Unknown';
    
    const formData = {
        variant_type: variant,
        variant_name: variantName,
        damage_type: document.getElementById('damage-emergency')?.value || '',
        insurance_situation: document.getElementById('insurance-involvement')?.value || '',
        form_completion_time: getFormCompletionTime(),
        psychological_trigger: 'funeral_director_analogy',
        conversion_type: 'emergency_restoration_request'
    };
    
    // Google Analytics 4 tracking
    trackEvent('form_submission', {
        event_category: 'conversion',
        event_label: 'home_survival_form',
        ...formData
    });
    
    // Facebook Pixel conversion
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: 'storm_damage_restoration',
            content_name: 'Emergency Restoration Request',
            hook_point_variant: variant,
            psychological_approach: variantName
        });
    }
    
    // Custom conversion tracking
    trackEvent('revolutionary_conversion', {
        conversion_source: 'funeral_director_psychology',
        marketing_innovation: 'death_psychology_business_application',
        ...formData
    });
    
    console.log('💀 Revolutionary conversion tracked:', formData);
}

/**
 * Track phone call conversions with psychological context
 */
function setupPhoneCallTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const variant = sessionStorage.getItem('hookPointVariant') || 'unknown';
            const phoneNumber = link.href.replace('tel:', '');
            
            trackEvent('phone_call_initiated', {
                event_category: 'conversion',
                event_label: 'emergency_restoration_call',
                phone_number: phoneNumber,
                hook_point_variant: variant,
                psychological_urgency: 'life_death_framing',
                call_trigger: 'home_survival_emergency'
            });
            
            // Track the revolutionary psychology impact
            trackEvent('death_psychology_call_conversion', {
                analogy_effectiveness: 'funeral_director_impact',
                urgency_level: 'maximum',
                decision_trigger: 'mortality_salience'
            });
            
            console.log('☎️ Death psychology call conversion:', phoneNumber);
        });
    });
}

/**
 * Track variant button selections for psychological analysis
 */
function setupVariantButtonTracking() {
    const variantButtons = document.querySelectorAll('.variant-cta-ultimate');
    
    variantButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const variantElement = e.target.closest('.hook-variant-ultimate');
            const variantType = variantElement?.getAttribute('data-variant') || 'unknown';
            
            trackEvent('psychological_variant_selected', {
                event_category: 'engagement',
                variant_chosen: variantType,
                button_text: e.target.textContent.trim(),
                psychological_appeal: getPsychologicalAppeal(variantType),
                selection_timing: getPageEngagementTime()
            });
            
            console.log('🧠 Psychological variant selected:', variantType);
        });
    });
}

/**
 * Monitor funeral director analogy psychological triggers
 */
function monitorPsychologicalTriggers() {
    // Track funeral director mention visibility
    observeFuneralDirectorMentions();
    
    // Monitor death psychology keyword engagement
    trackDeathPsychologyKeywords();
    
    // Measure hook point attention capture
    measureHookPointEffectiveness();
}

/**
 * Track when funeral director mentions come into view
 */
function observeFuneralDirectorMentions() {
    let funeralDirectorViews = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent.toLowerCase();
                if (text.includes('funeral director')) {
                    funeralDirectorViews++;
                    
                    trackEvent('funeral_director_mention_viewed', {
                        event_category: 'psychological_engagement',
                        mention_number: funeralDirectorViews,
                        element_type: entry.target.tagName.toLowerCase(),
                        visibility_percentage: Math.round(entry.intersectionRatio * 100),
                        psychological_trigger: 'mortality_salience_activation'
                    });
                    
                    console.log('💀 Funeral director mention viewed:', funeralDirectorViews);
                }
            }
        });
    }, { threshold: [0.1, 0.5, 0.9] });
    
    // Observe all elements containing funeral director text
    document.querySelectorAll('*').forEach(el => {
        if (el.textContent.toLowerCase().includes('funeral director')) {
            observer.observe(el);
        }
    });
}

/**
 * Track death psychology keyword engagement
 */
function trackDeathPsychologyKeywords() {
    const deathKeywords = ['death', 'mortality', 'survival', 'life', 'funeral', 'grave', 'cemetery'];
    const keywordCounts = {};
    
    deathKeywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = document.body.innerHTML.match(regex) || [];
        keywordCounts[keyword] = matches.length;
    });
    
    trackEvent('death_psychology_content_analysis', {
        event_category: 'content_psychology',
        keyword_density: keywordCounts,
        total_death_triggers: Object.values(keywordCounts).reduce((a, b) => a + b, 0),
        psychological_saturation: 'maximum'
    });
}

/**
 * Measure Hook Point effectiveness through engagement metrics
 */
function measureHookPointEffectiveness() {
    let hookPointEngagementStart = Date.now();
    
    // Track time spent on hook point section
    const hookPointSection = document.querySelector('.funeral-director-hook');
    if (hookPointSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // User is viewing the hook point
                    const engagementTime = Date.now() - hookPointEngagementStart;
                    
                    trackEvent('hook_point_engagement', {
                        event_category: 'psychological_effectiveness',
                        engagement_duration: engagementTime,
                        attention_capture: 'successful',
                        pattern_interrupt: 'activated',
                        cognitive_dissonance: 'triggered'
                    });
                }
            });
        });
        
        observer.observe(hookPointSection);
    }
}

/**
 * Utility Functions
 */

function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Custom analytics endpoint
    if (window.customAnalytics) {
        window.customAnalytics.track(eventName, properties);
    }
    
    // Console logging for development
    console.log('📊 Event tracked:', eventName, properties);
}

function getPsychologicalAppeal(variantType) {
    const appeals = {
        'funeral-director-analogy': 'Death psychology + Pattern interrupt',
        'life-death-choice': 'Personal responsibility + Control',
        'insurance-betrayal': 'Betrayal + Injustice'
    };
    return appeals[variantType] || 'Unknown psychological appeal';
}

function getFormCompletionTime() {
    const startTime = sessionStorage.getItem('formStartTime');
    if (startTime) {
        return Date.now() - parseInt(startTime);
    }
    return 0;
}

function getPageEngagementTime() {
    const pageLoadTime = sessionStorage.getItem('pageLoadTime') || Date.now();
    return Date.now() - parseInt(pageLoadTime);
}

function setupFormFieldTracking(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        field.addEventListener('focus', function() {
            if (!sessionStorage.getItem('formStartTime')) {
                sessionStorage.setItem('formStartTime', Date.now().toString());
            }
        });
    });
}

function setupScrollDepthTracking() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            
            trackEvent('scroll_depth', {
                event_category: 'engagement',
                scroll_percentage: scrollPercent,
                psychological_content_consumed: scrollPercent,
                hook_point_effectiveness: 'maintaining_attention'
            });
        }
    });
}

// Store page load time for engagement calculations
sessionStorage.setItem('pageLoadTime', Date.now().toString());

// Export for testing and external access
window.HookPointTracking = {
    trackEvent,
    initializeHookPointTracking,
    setupConversionTracking,
    monitorPsychologicalTriggers
};

console.log('🎯 Revolutionary Hook Point tracking initialized - Ready to measure funeral director analogy impact!');