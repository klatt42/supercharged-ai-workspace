/**
 * 📊 COMPREHENSIVE CONVERSION TRACKING SYSTEM
 * Alex Analytics - Cross-Page Authority Reversal Performance Measurement
 * 
 * Implements conversion tracking across all 52 new pages with Authority Reversal
 * psychology context, regional adaptation, and real-time performance monitoring.
 */

// Comprehensive Page Configuration for All 52 New Pages
const COMPREHENSIVE_PAGE_CONFIG = {
    maryland: {
        region: 'maryland',
        phone: ['410-555-0199', '240-555-0199'],
        psychology: 'parental_protection',
        locations: {
            'montgomery-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'affluent_families_with_children',
                priorityPhone: '410-555-0199'
            },
            'annapolis': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'], 
                demographic: 'military_government_families',
                priorityPhone: '410-555-0199'
            },
            'frederick-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'suburban_families',
                priorityPhone: '240-555-0199'
            },
            'washington-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'rural_suburban_families', 
                priorityPhone: '240-555-0199'
            }
        }
    },
    
    dc: {
        region: 'dc',
        phone: ['202-796-7422'],
        psychology: 'professional_authority',
        locations: {
            'georgetown': {
                services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage'],
                demographic: 'affluent_professionals',
                priorityPhone: '202-796-7422'
            },
            'capitol-hill': {
                services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage'],
                demographic: 'government_professionals',
                priorityPhone: '202-796-7422'
            },
            'dupont-circle': {
                services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage'],
                demographic: 'urban_professionals',
                priorityPhone: '202-796-7422'
            },
            'adams-morgan': {
                services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage'],
                demographic: 'young_professionals',
                priorityPhone: '202-796-7422'
            },
            'foggy-bottom': {
                services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage'],
                demographic: 'academic_professionals',
                priorityPhone: '202-796-7422'
            }
        }
    },
    
    virginia: {
        region: 'virginia',
        phone: ['703-844-4204'],
        psychology: 'medical_authority',
        locations: {
            'fairfax-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'military_tech_families',
                priorityPhone: '703-844-4204'
            },
            'arlington-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'government_contractor_families',
                priorityPhone: '703-844-4204'
            },
            'loudoun-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'tech_executive_families',
                priorityPhone: '703-844-4204'
            },
            'prince-william-county': {
                services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage'],
                demographic: 'suburban_commuter_families',
                priorityPhone: '703-844-4204'
            }
        }
    }
};

// Conversion Event Configuration
const CONVERSION_EVENTS = {
    primary: {
        phone_click: {
            value: 100,
            priority: 'high',
            conversionType: 'lead_generation'
        },
        form_submission: {
            value: 120,
            priority: 'high', 
            conversionType: 'lead_capture'
        }
    },
    engagement: {
        authority_hook_view: {
            value: 10,
            priority: 'medium',
            conversionType: 'psychology_engagement'
        },
        empowerment_message_view: {
            value: 15,
            priority: 'medium',
            conversionType: 'authority_acceptance'
        },
        scroll_depth_75: {
            value: 5,
            priority: 'low',
            conversionType: 'content_engagement'
        }
    },
    micro: {
        page_load: {
            value: 1,
            priority: 'low',
            conversionType: 'traffic'
        },
        time_on_page_30s: {
            value: 3,
            priority: 'low',
            conversionType: 'engagement'
        },
        cross_page_navigation: {
            value: 8,
            priority: 'medium',
            conversionType: 'site_engagement'
        }
    }
};

/**
 * Comprehensive Conversion Tracker
 * Tracks all conversion events across all 52 pages with Authority Reversal context
 */
class ComprehensiveConversionTracker {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.sessionId = this.generateSessionId();
        this.conversionData = {
            sessionStart: Date.now(),
            totalValue: 0,
            events: [],
            authorityPsychologyEngagement: false,
            regionSpecificPerformance: {}
        };
        this.isTracking = false;
    }

    /**
     * Initialize comprehensive conversion tracking
     */
    initialize() {
        console.log(`📊 Initializing Comprehensive Conversion Tracking: ${this.currentPage.region}-${this.currentPage.location}-${this.currentPage.service}`);
        
        this.setupUniversalEventTracking();
        this.setupPhoneClickTracking();
        this.setupFormSubmissionTracking();
        this.setupAuthorityPsychologyTracking();
        this.setupCrossPageNavigationTracking();
        this.setupPerformanceMetrics();
        this.setupRealTimeAnalytics();
        
        this.isTracking = true;
        this.trackEvent('page_load', 'micro');
        
        // Start session tracking
        this.startSessionTracking();
    }

    /**
     * Detect current page details from URL
     */
    detectCurrentPage() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop() || 'index.html';
        const pathParts = filename.replace('.html', '').split('-');
        
        let region = null;
        let location = null;
        let service = null;

        // Detect region
        if (filename.includes('maryland') || filename.includes('montgomery') || 
            filename.includes('annapolis') || filename.includes('frederick') ||
            filename.includes('washington-county')) {
            region = 'maryland';
        } else if (filename.includes('dc') || filename.includes('georgetown') ||
                   filename.includes('capitol') || filename.includes('dupont') ||
                   filename.includes('adams') || filename.includes('foggy')) {
            region = 'dc';
        } else if (filename.includes('virginia') || filename.includes('fairfax') ||
                   filename.includes('arlington') || filename.includes('loudoun') ||
                   filename.includes('prince-william')) {
            region = 'virginia';
        }

        // Detect location and service from filename
        if (pathParts.length >= 2) {
            location = pathParts.slice(0, -2).join('-');
            service = pathParts.slice(-2).join('-');
        }

        return {
            filename,
            region,
            location, 
            service,
            fullPath: pathname,
            config: region ? COMPREHENSIVE_PAGE_CONFIG[region] : null
        };
    }

    /**
     * Setup Universal Event Tracking
     */
    setupUniversalEventTracking() {
        // Page visibility tracking
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.trackEvent('page_exit', 'micro');
                this.sendConversionSummary();
            }
        });

        // Time on page tracking
        setTimeout(() => {
            this.trackEvent('time_on_page_30s', 'micro');
        }, 30000);

        setTimeout(() => {
            this.trackEvent('time_on_page_60s', 'engagement', { value: 5 });
        }, 60000);

        // Scroll depth tracking
        this.setupScrollDepthTracking();
    }

    /**
     * Setup Phone Click Tracking
     */
    setupPhoneClickTracking() {
        if (!this.currentPage.config) return;

        this.currentPage.config.phone.forEach(phone => {
            document.querySelectorAll(`a[href^="tel:${phone}"]`).forEach(phoneLink => {
                phoneLink.addEventListener('click', (event) => {
                    this.trackPhoneClick(phone, event);
                });
            });
        });
    }

    /**
     * Track Phone Click with Psychology Context
     */
    trackPhoneClick(phone, event) {
        const conversionValue = CONVERSION_EVENTS.primary.phone_click.value;
        
        this.trackEvent('phone_click', 'primary', {
            phone: phone,
            value: conversionValue,
            authorityPsychologyInfluenced: this.conversionData.authorityPsychologyEngagement
        });

        // Enhanced tracking for Authority Reversal influence
        gtag('event', 'phone_conversion_with_psychology', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'phone_number': phone,
            'psychology_influenced': this.conversionData.authorityPsychologyEngagement,
            'psychology_type': this.currentPage.config?.psychology,
            'session_id': this.sessionId,
            'conversion_value': conversionValue,
            'time_to_conversion': Date.now() - this.conversionData.sessionStart
        });

        // Track against regional targets
        this.trackAgainstRegionalTargets('phone_conversion', conversionValue);
    }

    /**
     * Setup Form Submission Tracking
     */
    setupFormSubmissionTracking() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (event) => {
                this.trackFormSubmission(form, event);
            });
        });
    }

    /**
     * Track Form Submission
     */
    trackFormSubmission(form, event) {
        const conversionValue = CONVERSION_EVENTS.primary.form_submission.value;
        
        this.trackEvent('form_submission', 'primary', {
            formId: form.id || 'anonymous',
            value: conversionValue,
            authorityPsychologyInfluenced: this.conversionData.authorityPsychologyEngagement
        });

        gtag('event', 'form_conversion_with_psychology', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'form_id': form.id || 'anonymous',
            'psychology_influenced': this.conversionData.authorityPsychologyEngagement,
            'psychology_type': this.currentPage.config?.psychology,
            'session_id': this.sessionId,
            'conversion_value': conversionValue
        });

        this.trackAgainstRegionalTargets('form_conversion', conversionValue);
    }

    /**
     * Setup Authority Psychology Engagement Tracking
     */
    setupAuthorityPsychologyTracking() {
        // Track authority hook viewing
        const hookElement = document.querySelector(`#authority-hook-${this.currentPage.region?.charAt(0)}`);
        if (hookElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        this.trackAuthorityHookEngagement();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(hookElement);
        }

        // Track empowerment message engagement
        const empowermentElement = document.querySelector('#authority-empowerment-message');
        if (empowermentElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                        this.trackEmpowermentMessageEngagement();
                    }
                });
            }, { threshold: 0.7 });
            
            observer.observe(empowermentElement);
        }
    }

    /**
     * Track Authority Hook Engagement
     */
    trackAuthorityHookEngagement() {
        this.conversionData.authorityPsychologyEngagement = true;
        
        this.trackEvent('authority_hook_view', 'engagement', {
            psychology_type: this.currentPage.config?.psychology,
            value: CONVERSION_EVENTS.engagement.authority_hook_view.value
        });

        gtag('event', 'authority_psychology_engagement', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'psychology_type': this.currentPage.config?.psychology,
            'engagement_type': 'authority_hook_viewed',
            'session_id': this.sessionId,
            'time_to_engagement': Date.now() - this.conversionData.sessionStart
        });
    }

    /**
     * Track Empowerment Message Engagement  
     */
    trackEmpowermentMessageEngagement() {
        this.trackEvent('empowerment_message_view', 'engagement', {
            psychology_type: this.currentPage.config?.psychology,
            value: CONVERSION_EVENTS.engagement.empowerment_message_view.value
        });

        gtag('event', 'empowerment_psychology_engagement', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'psychology_type': this.currentPage.config?.psychology,
            'session_id': this.sessionId
        });
    }

    /**
     * Setup Cross-Page Navigation Tracking
     */
    setupCrossPageNavigationTracking() {
        // Track clicks on cross-page navigation links
        document.querySelectorAll('.cross-page-navigation a, .breadcrumb a, .service-link, .location-link').forEach(link => {
            link.addEventListener('click', () => {
                this.trackCrossPageNavigation(link.href);
            });
        });
    }

    /**
     * Track Cross-Page Navigation
     */
    trackCrossPageNavigation(targetUrl) {
        this.trackEvent('cross_page_navigation', 'micro', {
            target_url: targetUrl,
            value: CONVERSION_EVENTS.micro.cross_page_navigation.value
        });

        gtag('event', 'cross_page_navigation', {
            'source_region': this.currentPage.region,
            'source_location': this.currentPage.location,
            'source_service': this.currentPage.service,
            'target_url': targetUrl,
            'session_id': this.sessionId
        });
    }

    /**
     * Setup Scroll Depth Tracking
     */
    setupScrollDepthTracking() {
        let maxScrollDepth = 0;
        const scrollThresholds = [25, 50, 75, 90];
        const triggeredThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;

                scrollThresholds.forEach(threshold => {
                    if (scrollPercent >= threshold && !triggeredThresholds.has(threshold)) {
                        triggeredThresholds.add(threshold);
                        this.trackScrollDepth(threshold);
                    }
                });
            }
        });
    }

    /**
     * Track Scroll Depth
     */
    trackScrollDepth(depth) {
        const eventType = depth >= 75 ? 'engagement' : 'micro';
        const value = depth >= 75 ? CONVERSION_EVENTS.engagement.scroll_depth_75.value : 2;

        this.trackEvent(`scroll_depth_${depth}`, eventType, {
            scroll_depth: depth,
            value: value
        });

        if (depth >= 75) {
            gtag('event', 'deep_content_engagement', {
                'region': this.currentPage.region,
                'location': this.currentPage.location,
                'service': this.currentPage.service,
                'scroll_depth': depth,
                'session_id': this.sessionId
            });
        }
    }

    /**
     * Setup Performance Metrics
     */
    setupPerformanceMetrics() {
        // Track page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

            gtag('event', 'page_performance', {
                'region': this.currentPage.region,
                'location': this.currentPage.location,
                'service': this.currentPage.service,
                'load_time': loadTime,
                'dom_content_loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                'session_id': this.sessionId
            });
        });
    }

    /**
     * Setup Real-Time Analytics
     */
    setupRealTimeAnalytics() {
        // Send periodic analytics updates
        setInterval(() => {
            this.sendPerformanceUpdate();
        }, 60000); // Every minute
    }

    /**
     * Start Session Tracking
     */
    startSessionTracking() {
        gtag('event', 'comprehensive_session_start', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'psychology_type': this.currentPage.config?.psychology,
            'session_id': this.sessionId,
            'page_filename': this.currentPage.filename,
            'user_agent': navigator.userAgent.substring(0, 100)
        });
    }

    /**
     * Track Event
     */
    trackEvent(eventName, category, additionalData = {}) {
        const event = {
            name: eventName,
            category: category,
            timestamp: Date.now(),
            page: this.currentPage,
            value: additionalData.value || CONVERSION_EVENTS[category]?.[eventName]?.value || 1,
            ...additionalData
        };

        this.conversionData.events.push(event);
        this.conversionData.totalValue += event.value;

        console.log(`📊 Conversion Event: ${eventName} (${category}) - Value: ${event.value}`);
    }

    /**
     * Track Against Regional Targets
     */
    trackAgainstRegionalTargets(conversionType, value) {
        if (!this.currentPage.config) return;

        const regionData = COMPREHENSIVE_PAGE_CONFIG[this.currentPage.region];
        
        gtag('event', 'regional_target_performance', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'conversion_type': conversionType,
            'conversion_value': value,
            'psychology_type': regionData.psychology,
            'session_total_value': this.conversionData.totalValue,
            'authority_influenced': this.conversionData.authorityPsychologyEngagement
        });
    }

    /**
     * Send Performance Update
     */
    sendPerformanceUpdate() {
        gtag('event', 'session_performance_update', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'session_id': this.sessionId,
            'session_duration': Date.now() - this.conversionData.sessionStart,
            'total_conversion_value': this.conversionData.totalValue,
            'total_events': this.conversionData.events.length,
            'authority_psychology_engaged': this.conversionData.authorityPsychologyEngagement
        });
    }

    /**
     * Send Conversion Summary
     */
    sendConversionSummary() {
        gtag('event', 'comprehensive_session_complete', {
            'region': this.currentPage.region,
            'location': this.currentPage.location,
            'service': this.currentPage.service,
            'session_id': this.sessionId,
            'session_duration': Date.now() - this.conversionData.sessionStart,
            'total_conversion_value': this.conversionData.totalValue,
            'total_events': this.conversionData.events.length,
            'authority_psychology_engaged': this.conversionData.authorityPsychologyEngagement,
            'primary_conversions': this.conversionData.events.filter(e => e.category === 'primary').length,
            'engagement_conversions': this.conversionData.events.filter(e => e.category === 'engagement').length,
            'psychology_type': this.currentPage.config?.psychology
        });
    }

    /**
     * Generate Session ID
     */
    generateSessionId() {
        return `${this.currentPage.region || 'unknown'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get Current Tracking Status
     */
    getTrackingStatus() {
        return {
            isTracking: this.isTracking,
            currentPage: this.currentPage,
            sessionId: this.sessionId,
            conversionData: this.conversionData,
            totalValue: this.conversionData.totalValue,
            eventCount: this.conversionData.events.length,
            authorityPsychologyEngagement: this.conversionData.authorityPsychologyEngagement
        };
    }
}

// Global initialization function
function initializeComprehensiveConversionTracking() {
    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
        window.comprehensiveTracker = new ComprehensiveConversionTracker();
        window.comprehensiveTracker.initialize();
        return window.comprehensiveTracker;
    } else {
        console.warn('📊 Comprehensive Conversion Tracking requires browser environment and Google Analytics');
        return null;
    }
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // Small delay to ensure other scripts are loaded
        setTimeout(() => {
            initializeComprehensiveConversionTracking();
        }, 1000);
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ComprehensiveConversionTracker,
        COMPREHENSIVE_PAGE_CONFIG,
        CONVERSION_EVENTS,
        initializeComprehensiveConversionTracking
    };
}