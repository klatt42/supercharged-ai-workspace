/**
 * NOVA Specialist Pages - Comprehensive Conversion Tracking System
 * Authority Reversal Framework & Emergency Services Tracking
 * Implements GA4, GTM, Facebook Pixel, and specialized emergency call tracking
 */

// Configuration object for all tracking implementations
const NovaTrackingConfig = {
    // Production tracking IDs - UPDATE THESE BEFORE DEPLOYMENT
    ga4MeasurementId: 'G-NOVA_TRACKING_ID',  // Your GA4 Measurement ID
    gtmContainerId: 'GTM-NOVA123',           // Your GTM Container ID
    facebookPixelId: 'NOVA_FB_PIXEL_ID',     // Your Facebook Pixel ID

    // Emergency phone tracking configuration
    emergencyPhone: '703-844-4204',

    // Authority Reversal Framework tracking configuration
    authorityFramework: {
        hookPoint: 'plumber_heart_attack',
        mortalityTrigger: true,
        frameworkVersion: '2.0'
    },

    // Page-specific configurations
    pageConfigs: {
        'alexandria': {
            region: 'alexandria',
            serviceType: 'general_emergency',
            demographics: 'historic_district',
            authorityHook: 'plumber_surgeon_alexandria'
        },
        'arlington-water-damage': {
            region: 'arlington',
            serviceType: 'water_damage',
            demographics: 'urban_metro',
            authorityHook: 'plumber_heart_attack_arlington'
        },
        'fairfax-mold-remediation': {
            region: 'fairfax',
            serviceType: 'mold_remediation',
            demographics: 'suburban_families',
            authorityHook: 'plumber_heart_attack_fairfax_mold'
        },
        'tysons-fire-damage': {
            region: 'tysons',
            serviceType: 'fire_damage',
            demographics: 'commercial_business',
            authorityHook: 'plumber_heart_attack_tysons_fire'
        },
        'reston-emergency-services': {
            region: 'reston',
            serviceType: 'tech_emergency',
            demographics: 'tech_corridor_professionals',
            authorityHook: 'plumber_heart_attack_reston_tech'
        },
        'vienna-water-damage': {
            region: 'vienna',
            serviceType: 'luxury_water_damage',
            demographics: 'premium_homeowners',
            authorityHook: 'plumber_heart_attack_vienna_luxury'
        },
        'mclean-restoration': {
            region: 'mclean',
            serviceType: 'ultra_premium_restoration',
            demographics: 'ultra_high_net_worth',
            authorityHook: 'plumber_heart_attack_mclean_estate'
        }
    }
};

// Core tracking initialization
class NovaConversionTracking {
    constructor() {
        this.config = NovaTrackingConfig;
        this.currentPage = this.detectCurrentPage();
        this.pageConfig = this.config.pageConfigs[this.currentPage] || {};
        this.trackingInitialized = false;

        // Initialize all tracking systems
        this.initializeTracking();
    }

    // Detect current page based on URL path
    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('alexandria')) return 'alexandria';
        if (path.includes('arlington')) return 'arlington-water-damage';
        if (path.includes('fairfax')) return 'fairfax-mold-remediation';
        if (path.includes('tysons')) return 'tysons-fire-damage';
        if (path.includes('reston')) return 'reston-emergency-services';
        if (path.includes('vienna')) return 'vienna-water-damage';
        if (path.includes('mclean')) return 'mclean-restoration';
        return 'unknown';
    }

    // Initialize all tracking systems
    async initializeTracking() {
        try {
            // Initialize Google Analytics 4
            await this.initializeGA4();

            // Initialize Google Tag Manager
            await this.initializeGTM();

            // Initialize Facebook Pixel
            await this.initializeFacebookPixel();

            // Initialize emergency call tracking
            this.initializeEmergencyCallTracking();

            // Initialize Authority Reversal Framework tracking
            this.initializeAuthorityReversalTracking();

            // Initialize specialist network tracking
            this.initializeSpecialistNetworkTracking();

            // Initialize Core Web Vitals tracking
            this.initializeCoreWebVitalsTracking();

            // Initialize privacy compliance
            this.initializePrivacyCompliance();

            // Track initial page load
            this.trackPageLoad();

            this.trackingInitialized = true;
            console.log('🎯 NOVA Conversion Tracking System Initialized');

        } catch (error) {
            console.error('Error initializing tracking:', error);
        }
    }

    // Google Analytics 4 Implementation
    async initializeGA4() {
        // Load GA4 script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4MeasurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());

        // Configure GA4 with enhanced ecommerce
        gtag('config', this.config.ga4MeasurementId, {
            enhanced_ecommerce: true,
            custom_map: {
                'custom_parameter_1': 'region',
                'custom_parameter_2': 'service_type',
                'custom_parameter_3': 'authority_framework',
                'custom_parameter_4': 'demographic_segment'
            }
        });

        // Set up enhanced ecommerce for conversion tracking
        gtag('config', this.config.ga4MeasurementId, {
            conversion_linker: true,
            allow_enhanced_conversions: true
        });
    }

    // Google Tag Manager Implementation
    async initializeGTM() {
        // GTM Script in Head
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', this.config.gtmContainerId);

        // GTM NoScript fallback will be added to body via DOM
        const noscript = document.createElement('noscript');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.config.gtmContainerId}`;
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        noscript.appendChild(iframe);
        document.body.insertBefore(noscript, document.body.firstChild);

        // Push initial page data to GTM
        window.dataLayer.push({
            'event': 'page_view_enhanced',
            'page_type': 'nova_specialist_landing',
            'region': this.pageConfig.region,
            'service_type': this.pageConfig.serviceType,
            'authority_framework': 'active',
            'demographic_segment': this.pageConfig.demographics
        });
    }

    // Facebook Pixel Implementation
    async initializeFacebookPixel() {
        // Facebook Pixel Code
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', this.config.facebookPixelId);

        // Track PageView with custom parameters
        fbq('track', 'PageView', {
            content_category: 'emergency_services',
            content_name: this.pageConfig.region + '_' + this.pageConfig.serviceType,
            custom_data: {
                region: this.pageConfig.region,
                service_type: this.pageConfig.serviceType,
                authority_framework: 'active',
                phone_number: this.config.emergencyPhone
            }
        });

        // Set up custom audiences for retargeting
        fbq('track', 'CustomizeProduct', {
            content_name: `authority_reversal_${this.pageConfig.region}`,
            content_category: 'emergency_services',
            value: 1,
            currency: 'USD'
        });
    }

    // Emergency Call Tracking Implementation
    initializeEmergencyCallTracking() {
        const phoneLinks = document.querySelectorAll(`a[href="tel:${this.config.emergencyPhone}"]`);

        phoneLinks.forEach((link, index) => {
            const callLocation = this.determineCallLocation(link);

            link.addEventListener('click', (event) => {
                this.trackEmergencyCall(callLocation, link);
            });

            // Track phone number visibility (viewport tracking)
            this.setupPhoneNumberVisibilityTracking(link, callLocation);
        });

        // Track time spent on page before calling
        this.trackTimeBeforeCall();
    }

    // Determine call button location for attribution
    determineCallLocation(link) {
        const linkText = link.textContent.toLowerCase();
        const linkClasses = link.className.toLowerCase();
        const parentClasses = link.parentElement?.className.toLowerCase() || '';

        if (linkText.includes('emergency') && (parentClasses.includes('hero') || parentClasses.includes('emergency-hero'))) {
            return 'hero_emergency';
        }
        if (parentClasses.includes('banner') || linkClasses.includes('banner')) {
            return 'top_banner';
        }
        if (parentClasses.includes('nav') || linkClasses.includes('nav')) {
            return 'navigation_header';
        }
        if (linkText.includes('call now') || linkClasses.includes('primary-cta')) {
            return 'main_cta';
        }
        if (parentClasses.includes('footer')) {
            return 'footer';
        }
        if (linkClasses.includes('triage') || parentClasses.includes('triage')) {
            return 'emergency_triage';
        }
        return 'other';
    }

    // Track emergency call with comprehensive attribution
    trackEmergencyCall(callLocation, linkElement) {
        const callData = {
            event: 'emergency_call_clicked',
            call_location: callLocation,
            region: this.pageConfig.region,
            service_type: this.pageConfig.serviceType,
            authority_hook_exposure: this.getAuthorityHookExposure(),
            page_time_before_call: this.getTimeOnPage(),
            scroll_depth_before_call: this.getCurrentScrollDepth(),
            phone_number: this.config.emergencyPhone,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        };

        // Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'emergency_call', {
                event_category: 'conversion',
                event_label: `${this.pageConfig.region}_${callLocation}`,
                value: 1,
                custom_parameter_1: this.pageConfig.region,
                custom_parameter_2: this.pageConfig.serviceType,
                custom_parameter_3: 'authority_reversal_active',
                custom_parameter_4: callLocation
            });
        }

        // Google Tag Manager tracking
        if (window.dataLayer) {
            window.dataLayer.push(callData);
        }

        // Facebook Pixel Lead tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: `emergency_call_${this.pageConfig.region}`,
                content_category: 'emergency_services',
                value: 1,
                currency: 'USD',
                custom_data: {
                    call_location: callLocation,
                    region: this.pageConfig.region,
                    authority_framework: 'engaged'
                }
            });
        }

        console.log('📞 Emergency Call Tracked:', callData);
    }

    // Authority Reversal Framework Tracking
    initializeAuthorityReversalTracking() {
        // Track "plumber heart attack" hook visibility
        this.trackAuthorityHookVisibility();

        // Track time spent reading authority challenge sections
        this.trackAuthorityContentEngagement();

        // Track scroll depth to authority content
        this.trackScrollToAuthorityContent();

        // Track medical emergency parallel interaction
        this.trackMedicalEmergencyParallelEngagement();
    }

    // Track Authority Hook Point visibility and engagement
    trackAuthorityHookVisibility() {
        const authorityElements = document.querySelectorAll('.authority-challenge, .authority-hook, #authority-hook');

        authorityElements.forEach(element => {
            this.setupIntersectionTracking(element, 'authority_hook_visible', {
                hook_type: 'plumber_heart_attack',
                region: this.pageConfig.region,
                framework_version: this.config.authorityFramework.frameworkVersion
            });
        });
    }

    // Track engagement with Authority Reversal content
    trackAuthorityContentEngagement() {
        const authorityElements = document.querySelectorAll('.authority-challenge, .medical-emergency-parallel, .authority-section');

        authorityElements.forEach(element => {
            let startTime = null;
            let isVisible = false;

            this.setupIntersectionTracking(element, 'authority_content_viewed', {
                content_type: 'authority_reversal_framework',
                region: this.pageConfig.region
            }, (entry) => {
                if (entry.isIntersecting && !isVisible) {
                    startTime = Date.now();
                    isVisible = true;
                } else if (!entry.isIntersecting && isVisible) {
                    const timeSpent = Date.now() - startTime;
                    if (timeSpent > 3000) { // Only track if viewed for more than 3 seconds
                        this.trackAuthorityEngagementTime(timeSpent, element);
                    }
                    isVisible = false;
                }
            });
        });
    }

    // Track time spent engaging with Authority Reversal content
    trackAuthorityEngagementTime(timeSpent, element) {
        const engagementData = {
            event: 'authority_framework_engagement',
            engagement_time_ms: timeSpent,
            engagement_time_seconds: Math.round(timeSpent / 1000),
            region: this.pageConfig.region,
            authority_hook: this.pageConfig.authorityHook,
            element_type: element.className
        };

        // Track in GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'authority_engagement', {
                event_category: 'engagement',
                event_label: this.pageConfig.region,
                value: Math.round(timeSpent / 1000),
                custom_parameter_1: this.pageConfig.region,
                custom_parameter_2: 'authority_reversal',
                custom_parameter_3: timeSpent.toString()
            });
        }

        // Track in GTM
        if (window.dataLayer) {
            window.dataLayer.push(engagementData);
        }

        console.log('🧠 Authority Framework Engagement:', engagementData);
    }

    // Track medical emergency parallel interaction
    trackMedicalEmergencyParallelEngagement() {
        const parallelElements = document.querySelectorAll('.medical-emergency-parallel, .medical-side, .restoration-side');

        parallelElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.trackEvent('medical_parallel_hover', {
                    element_type: element.className,
                    region: this.pageConfig.region,
                    interaction_type: 'hover'
                });
            });

            element.addEventListener('click', () => {
                this.trackEvent('medical_parallel_click', {
                    element_type: element.className,
                    region: this.pageConfig.region,
                    interaction_type: 'click'
                });
            });
        });
    }

    // Specialist Network Cross-referral Tracking
    initializeSpecialistNetworkTracking() {
        const specialistLinks = document.querySelectorAll('.specialist-card, .specialist-grid a');

        specialistLinks.forEach(link => {
            const targetRegion = this.extractTargetRegion(link);

            link.addEventListener('click', (event) => {
                this.trackSpecialistReferral(targetRegion, link);
            });
        });

        // Track Virginia Hub navigation
        this.trackVirginiaHubNavigation();
    }

    // Extract target region from specialist link
    extractTargetRegion(link) {
        const href = link.getAttribute('href') || '';
        const text = link.textContent.toLowerCase();

        if (href.includes('alexandria') || text.includes('alexandria')) return 'alexandria';
        if (href.includes('arlington') || text.includes('arlington')) return 'arlington';
        if (href.includes('fairfax') || text.includes('fairfax')) return 'fairfax';
        if (href.includes('tysons') || text.includes('tysons')) return 'tysons';
        if (href.includes('reston') || text.includes('reston')) return 'reston';
        if (href.includes('vienna') || text.includes('vienna')) return 'vienna';
        if (href.includes('mclean') || text.includes('mclean')) return 'mclean';
        if (href.includes('virginia-restoration') || text.includes('virginia hub')) return 'virginia_hub';
        return 'unknown';
    }

    // Track specialist cross-referral
    trackSpecialistReferral(targetRegion, linkElement) {
        const referralData = {
            event: 'specialist_cross_referral',
            source_region: this.pageConfig.region,
            target_region: targetRegion,
            referral_type: targetRegion === 'virginia_hub' ? 'hub_navigation' : 'specialist_referral',
            link_text: linkElement.textContent.trim(),
            link_position: this.getLinkPosition(linkElement)
        };

        // Track in all platforms
        this.trackEvent('specialist_referral', referralData);

        console.log('🔄 Specialist Cross-referral:', referralData);
    }

    // Core Web Vitals and Performance Tracking
    initializeCoreWebVitalsTracking() {
        // Track Largest Contentful Paint (LCP)
        this.trackLCP();

        // Track First Input Delay (FID)
        this.trackFID();

        // Track Cumulative Layout Shift (CLS)
        this.trackCLS();

        // Track Time to Interactive for emergency buttons
        this.trackTimeToInteractive();

        // Track mobile vs desktop performance
        this.trackDeviceTypePerformance();
    }

    // Track Largest Contentful Paint
    trackLCP() {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        const lcpTime = Math.round(entry.startTime);

                        this.trackEvent('core_web_vitals_lcp', {
                            metric: 'LCP',
                            value: lcpTime,
                            region: this.pageConfig.region,
                            device_type: this.getDeviceType(),
                            performance_tier: this.getPerformanceTier(lcpTime, 'lcp')
                        });

                        // Only track the final LCP
                        observer.disconnect();
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP tracking not supported:', e);
            }
        }
    }

    // Track First Input Delay
    trackFID() {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        const fidTime = Math.round(entry.processingStart - entry.startTime);

                        this.trackEvent('core_web_vitals_fid', {
                            metric: 'FID',
                            value: fidTime,
                            region: this.pageConfig.region,
                            device_type: this.getDeviceType(),
                            performance_tier: this.getPerformanceTier(fidTime, 'fid')
                        });
                    }
                });
                observer.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID tracking not supported:', e);
            }
        }
    }

    // Track Cumulative Layout Shift
    trackCLS() {
        if ('PerformanceObserver' in window) {
            try {
                let clsValue = 0;
                const observer = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                });
                observer.observe({ entryTypes: ['layout-shift'] });

                // Track CLS on page unload
                window.addEventListener('beforeunload', () => {
                    if (clsValue > 0) {
                        this.trackEvent('core_web_vitals_cls', {
                            metric: 'CLS',
                            value: Math.round(clsValue * 1000),
                            region: this.pageConfig.region,
                            device_type: this.getDeviceType(),
                            performance_tier: this.getPerformanceTier(clsValue * 1000, 'cls')
                        });
                    }
                });
            } catch (e) {
                console.warn('CLS tracking not supported:', e);
            }
        }
    }

    // Track Time to Interactive for emergency buttons
    trackTimeToInteractive() {
        const emergencyButtons = document.querySelectorAll('a[href^="tel:"], .emergency-call, .emergency-call-mobile');
        const startTime = performance.now();

        const checkInteractive = () => {
            if (emergencyButtons.length > 0 && emergencyButtons[0].offsetParent !== null) {
                const tti = Math.round(performance.now() - startTime);

                this.trackEvent('time_to_interactive', {
                    metric: 'TTI_emergency_buttons',
                    value: tti,
                    region: this.pageConfig.region,
                    button_count: emergencyButtons.length,
                    device_type: this.getDeviceType()
                });
                return;
            }

            // Check again in 100ms if buttons aren't ready
            if (performance.now() - startTime < 10000) { // Max 10 seconds
                setTimeout(checkInteractive, 100);
            }
        };

        // Start checking after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkInteractive);
        } else {
            checkInteractive();
        }
    }

    // Privacy Compliance Implementation (GDPR/CCPA)
    initializePrivacyCompliance() {
        // Check if user has consented to tracking
        if (!this.hasTrackingConsent()) {
            this.showConsentBanner();
        }

        // Implement data retention policies
        this.implementDataRetention();

        // Set up opt-out mechanisms
        this.setupOptOut();
    }

    // Check if user has given tracking consent
    hasTrackingConsent() {
        return localStorage.getItem('nova_tracking_consent') === 'true' ||
               sessionStorage.getItem('nova_tracking_consent') === 'true';
    }

    // Show privacy consent banner
    showConsentBanner() {
        if (document.querySelector('.nova-consent-banner')) return; // Already shown

        const banner = document.createElement('div');
        banner.className = 'nova-consent-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            text-align: center;
            z-index: 10000;
            font-size: 14px;
            border-top: 3px solid #ffd700;
        `;

        banner.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 15px;">
                <span>We use cookies and tracking to improve our emergency services and measure our Authority Reversal Framework effectiveness. Your privacy is protected.</span>
                <button onclick="novaTracking.acceptTracking()" style="background: #ffd700; color: black; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer;">Accept</button>
                <button onclick="novaTracking.declineTracking()" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Decline</button>
            </div>
        `;

        document.body.appendChild(banner);
    }

    // Accept tracking consent
    acceptTracking() {
        localStorage.setItem('nova_tracking_consent', 'true');
        this.removeConsentBanner();

        // Re-initialize tracking with consent
        if (!this.trackingInitialized) {
            this.initializeTracking();
        }

        this.trackEvent('privacy_consent_given', {
            consent_type: 'accept',
            region: this.pageConfig.region
        });
    }

    // Decline tracking consent
    declineTracking() {
        localStorage.setItem('nova_tracking_consent', 'false');
        this.removeConsentBanner();

        // Disable all non-essential tracking
        this.disableTracking();

        console.log('🔒 Tracking declined by user');
    }

    // Remove consent banner
    removeConsentBanner() {
        const banner = document.querySelector('.nova-consent-banner');
        if (banner) {
            banner.remove();
        }
    }

    // Utility Functions
    setupIntersectionTracking(element, eventName, eventData, customCallback = null) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (customCallback) {
                            customCallback(entry);
                        } else {
                            this.trackEvent(eventName, {
                                ...eventData,
                                intersection_ratio: Math.round(entry.intersectionRatio * 100),
                                element_position: this.getElementPosition(entry.target)
                            });
                        }
                    }
                });
            }, { threshold: [0.1, 0.5, 0.9] });

            observer.observe(element);
        }
    }

    // Setup phone number visibility tracking
    setupPhoneNumberVisibilityTracking(phoneElement, callLocation) {
        this.setupIntersectionTracking(phoneElement, 'phone_number_visible', {
            call_location: callLocation,
            phone_number: this.config.emergencyPhone,
            region: this.pageConfig.region
        });
    }

    // Track generic events across all platforms
    trackEvent(eventName, eventData = {}) {
        const fullEventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            ...eventData
        };

        // Google Analytics 4
        if (typeof gtag !== 'undefined' && this.hasTrackingConsent()) {
            gtag('event', eventName, {
                event_category: fullEventData.event_category || 'engagement',
                event_label: fullEventData.event_label || this.pageConfig.region,
                value: fullEventData.value || 1,
                ...eventData
            });
        }

        // Google Tag Manager
        if (window.dataLayer && this.hasTrackingConsent()) {
            window.dataLayer.push(fullEventData);
        }

        // Facebook Pixel (if applicable)
        if (typeof fbq !== 'undefined' && this.hasTrackingConsent() && this.isFacebookTrackingEvent(eventName)) {
            this.trackFacebookEvent(eventName, eventData);
        }
    }

    // Determine if event should be tracked on Facebook
    isFacebookTrackingEvent(eventName) {
        const facebookEvents = [
            'emergency_call_clicked',
            'specialist_cross_referral',
            'authority_framework_engagement',
            'phone_number_visible'
        ];
        return facebookEvents.includes(eventName);
    }

    // Track Facebook-specific events
    trackFacebookEvent(eventName, eventData) {
        const facebookEventMap = {
            'emergency_call_clicked': 'Lead',
            'specialist_cross_referral': 'ViewContent',
            'authority_framework_engagement': 'CustomizeProduct',
            'phone_number_visible': 'ViewContent'
        };

        const fbEventName = facebookEventMap[eventName] || 'CustomEvent';

        fbq('track', fbEventName, {
            content_name: `${eventName}_${this.pageConfig.region}`,
            content_category: 'emergency_services',
            value: eventData.value || 1,
            currency: 'USD',
            custom_data: eventData
        });
    }

    // Get Authority Hook exposure status
    getAuthorityHookExposure() {
        const authorityElement = document.querySelector('.authority-challenge, #authority-hook');
        if (!authorityElement) return 'not_present';

        const rect = authorityElement.getBoundingClientRect();
        const inViewport = rect.top >= 0 && rect.top <= window.innerHeight;
        return inViewport ? 'visible' : 'present_not_visible';
    }

    // Get current time on page
    getTimeOnPage() {
        return Math.round((Date.now() - (window.novaPageLoadTime || Date.now())) / 1000);
    }

    // Get current scroll depth percentage
    getCurrentScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.round((scrollTop / docHeight) * 100);
    }

    // Get device type
    getDeviceType() {
        if (window.innerWidth <= 768) return 'mobile';
        if (window.innerWidth <= 1024) return 'tablet';
        return 'desktop';
    }

    // Get performance tier based on metric
    getPerformanceTier(value, metric) {
        const thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 100, poor: 250 } // multiplied by 1000
        };

        const threshold = thresholds[metric];
        if (!threshold) return 'unknown';

        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs_improvement';
        return 'poor';
    }

    // Get element position information
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            viewport_percentage: Math.round((rect.top / window.innerHeight) * 100)
        };
    }

    // Get link position in page
    getLinkPosition(link) {
        const allLinks = document.querySelectorAll('a');
        return Array.from(allLinks).indexOf(link) + 1;
    }

    // Track initial page load with comprehensive data
    trackPageLoad() {
        const loadData = {
            event: 'nova_specialist_page_load',
            page_type: 'nova_specialist_landing',
            region: this.pageConfig.region,
            service_type: this.pageConfig.serviceType,
            authority_framework: 'active',
            authority_hook: this.pageConfig.authorityHook,
            demographic_segment: this.pageConfig.demographics,
            load_time: Math.round(performance.now()),
            device_type: this.getDeviceType(),
            referrer: document.referrer || 'direct',
            user_agent: navigator.userAgent,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            phone_number: this.config.emergencyPhone,
            timestamp: new Date().toISOString()
        };

        this.trackEvent('page_load_complete', loadData);

        console.log('📊 NOVA Page Load Tracked:', loadData);
    }

    // Track Virginia Hub navigation specifically
    trackVirginiaHubNavigation() {
        const hubLinks = document.querySelectorAll('a[href*="virginia-restoration"], a[href*="virginia.html"]');

        hubLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('virginia_hub_navigation', {
                    source_region: this.pageConfig.region,
                    source_service: this.pageConfig.serviceType,
                    navigation_type: 'hub_access',
                    link_text: link.textContent.trim()
                });
            });
        });
    }

    // Track time before call (setup timer)
    trackTimeBeforeCall() {
        window.novaPageLoadTime = Date.now();
    }

    // Geographic and Demographic specific tracking
    trackGeographicAndDemographicData() {
        const demographicData = {
            region: this.pageConfig.region,
            demographic_segment: this.pageConfig.demographics,
            service_focus: this.getServiceFocus(),
            premium_tier: this.getPremiumTier()
        };

        this.trackEvent('demographic_page_view', demographicData);
    }

    // Get service focus based on region
    getServiceFocus() {
        const focusMap = {
            'alexandria': 'historic_preservation',
            'arlington': 'urban_high_density',
            'fairfax': 'suburban_families',
            'tysons': 'commercial_business',
            'reston': 'tech_professional',
            'vienna': 'luxury_premium',
            'mclean': 'ultra_premium_estate'
        };
        return focusMap[this.pageConfig.region] || 'general';
    }

    // Get premium tier
    getPremiumTier() {
        if (this.pageConfig.region === 'mclean') return 'ultra_premium';
        if (this.pageConfig.region === 'vienna') return 'premium';
        return 'standard';
    }

    // Disable all tracking (for privacy compliance)
    disableTracking() {
        // Disable GA4
        if (window.gtag) {
            gtag('config', this.config.ga4MeasurementId, {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
            });
        }

        // Disable Facebook Pixel
        if (window.fbq) {
            fbq('consent', 'revoke');
        }

        console.log('🔒 All tracking disabled per user request');
    }

    // Data retention implementation
    implementDataRetention() {
        // Clean up old localStorage data (older than 30 days)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('nova_')) {
                const item = localStorage.getItem(key);
                try {
                    const data = JSON.parse(item);
                    if (data.timestamp && data.timestamp < thirtyDaysAgo) {
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    // If not JSON, check if it's old by other means or remove
                }
            }
        });
    }

    // Setup opt-out mechanism
    setupOptOut() {
        // Create global opt-out function
        window.novaOptOut = () => {
            localStorage.setItem('nova_tracking_opt_out', 'true');
            this.disableTracking();
            alert('You have been opted out of NOVA tracking. Refresh the page for changes to take effect.');
        };

        // Check for opt-out status
        if (localStorage.getItem('nova_tracking_opt_out') === 'true') {
            this.disableTracking();
        }
    }
}

// Initialize tracking when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.novaTracking = new NovaConversionTracking();
});

// Expose global functions for consent management
window.novaTrackingAccept = function() {
    if (window.novaTracking) {
        window.novaTracking.acceptTracking();
    }
};

window.novaTrackingDecline = function() {
    if (window.novaTracking) {
        window.novaTracking.declineTracking();
    }
};

console.log('🎯 NOVA Comprehensive Tracking System Loaded - Authority Reversal Framework Active');