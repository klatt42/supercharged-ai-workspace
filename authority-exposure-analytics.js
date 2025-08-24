/**
 * 📈 AUTHORITY REVERSAL EXPOSURE ANALYTICS SYSTEM
 * Alex Analytics - Advanced Psychology Engagement & Effectiveness Measurement
 * 
 * Comprehensive analytics system tracking Authority Reversal Framework™ exposure,
 * engagement patterns, and conversion attribution across all 52 pages.
 */

// Authority Exposure Tracking Configuration
const AUTHORITY_EXPOSURE_CONFIG = {
    engagementThresholds: {
        minimal: { timeOnHook: 2000, scrollDepth: 25 },     // 2 seconds, 25% scroll
        moderate: { timeOnHook: 5000, scrollDepth: 50 },    // 5 seconds, 50% scroll  
        deep: { timeOnHook: 10000, scrollDepth: 75 },       // 10 seconds, 75% scroll
        committed: { timeOnHook: 15000, scrollDepth: 90 }   // 15 seconds, 90% scroll
    },
    
    psychologyElements: {
        authorityHook: {
            selectors: ['#authority-hook-m', '#authority-hook-d', '#authority-hook-v', '.authority-hook'],
            trackingName: 'authority_hook',
            conversionWeight: 0.4
        },
        empowermentMessage: {
            selectors: ['#authority-empowerment-message', '.empowerment-message'],
            trackingName: 'empowerment_message',
            conversionWeight: 0.3
        },
        phoneNumber: {
            selectors: ['a[href^="tel:"]', '.phone-large', '.phone-header'],
            trackingName: 'phone_interaction',
            conversionWeight: 0.8
        },
        authorityExplanation: {
            selectors: ['.authority-explanation', '.authority-question'],
            trackingName: 'authority_explanation',
            conversionWeight: 0.25
        }
    },

    regionalPsychologyScoring: {
        virginia: {
            baseline: 53,           // Proven 53% improvement
            psychologyType: 'medical_authority',
            hookPower: 0.9,         // Proven effectiveness
            targetAudience: 'northern_va_families'
        },
        maryland: {
            baseline: 0,            // New framework
            psychologyType: 'parental_protection',
            hookPower: 0.7,         // Estimated effectiveness
            targetAudience: 'maryland_suburban_families'
        },
        dc: {
            baseline: 0,            // New framework
            psychologyType: 'professional_authority',
            hookPower: 0.6,         // Estimated effectiveness
            targetAudience: 'dc_professionals'
        }
    }
};

/**
 * Authority Exposure Analytics Tracker
 * Advanced measurement of psychology framework effectiveness
 */
class AuthorityExposureAnalytics {
    constructor(region) {
        this.region = region;
        this.sessionId = this.generateSessionId();
        this.exposureData = {
            sessionStart: Date.now(),
            totalExposureScore: 0,
            psychologyEngagements: [],
            conversionPath: [],
            engagementLevel: 'none',
            authorityRecognitionIndicators: [],
            timeSpentOnPsychologyElements: 0,
            scrollEngagementPattern: [],
            mouseHoverPsychologyElements: 0,
            clicksOnAuthorityElements: 0,
            phoneClickAfterPsychologyExposure: false
        };
        this.elementObservers = new Map();
        this.engagementTimers = new Map();
        this.isTracking = false;
    }

    /**
     * Initialize comprehensive authority exposure tracking
     */
    initialize() {
        console.log(`📈 Initializing Authority Exposure Analytics: ${this.region}`);
        
        this.setupPsychologyElementTracking();
        this.setupAdvancedEngagementTracking();
        this.setupConversionAttributionTracking();
        this.setupRealTimeAnalytics();
        this.startExposureSession();
        
        this.isTracking = true;
    }

    /**
     * Setup Psychology Element Tracking
     */
    setupPsychologyElementTracking() {
        Object.entries(AUTHORITY_EXPOSURE_CONFIG.psychologyElements).forEach(([elementType, config]) => {
            config.selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                
                elements.forEach(element => {
                    this.trackPsychologyElement(element, elementType, config);
                });
            });
        });
    }

    /**
     * Track individual psychology element
     */
    trackPsychologyElement(element, elementType, config) {
        // Intersection Observer for visibility tracking
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.onPsychologyElementVisible(elementType, element, config);
                } else {
                    this.onPsychologyElementHidden(elementType, element);
                }
            });
        }, { 
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-10px'
        });

        observer.observe(element);
        this.elementObservers.set(element, observer);

        // Mouse interaction tracking
        element.addEventListener('mouseenter', () => {
            this.onPsychologyElementHover(elementType, 'enter');
        });

        element.addEventListener('mouseleave', () => {
            this.onPsychologyElementHover(elementType, 'leave');
        });

        // Click tracking
        element.addEventListener('click', () => {
            this.onPsychologyElementClick(elementType, config);
        });

        // Touch tracking for mobile
        element.addEventListener('touchstart', () => {
            this.onPsychologyElementTouch(elementType);
        });
    }

    /**
     * Handle psychology element becoming visible
     */
    onPsychologyElementVisible(elementType, element, config) {
        const engagementStart = Date.now();
        this.engagementTimers.set(element, engagementStart);

        const engagement = {
            elementType: elementType,
            startTime: engagementStart,
            visible: true,
            conversionWeight: config.conversionWeight
        };

        this.exposureData.psychologyEngagements.push(engagement);

        // Track exposure in real-time
        gtag('event', 'authority_element_exposure', {
            'region': this.region,
            'element_type': elementType,
            'tracking_name': config.trackingName,
            'exposure_start': engagementStart,
            'session_id': this.sessionId,
            'conversion_weight': config.conversionWeight
        });

        console.log(`👁️ Psychology exposure: ${elementType}`);
    }

    /**
     * Handle psychology element becoming hidden
     */
    onPsychologyElementHidden(elementType, element) {
        const startTime = this.engagementTimers.get(element);
        if (startTime) {
            const engagementDuration = Date.now() - startTime;
            this.exposureData.timeSpentOnPsychologyElements += engagementDuration;
            
            // Find and update the engagement record
            const engagement = this.exposureData.psychologyEngagements.find(e => 
                e.elementType === elementType && e.startTime === startTime
            );
            
            if (engagement) {
                engagement.endTime = Date.now();
                engagement.duration = engagementDuration;
                engagement.visible = false;
            }

            this.updateEngagementLevel(engagementDuration);
            this.calculateExposureScore();

            gtag('event', 'authority_element_engagement_complete', {
                'region': this.region,
                'element_type': elementType,
                'engagement_duration': engagementDuration,
                'session_id': this.sessionId,
                'total_psychology_time': this.exposureData.timeSpentOnPsychologyElements
            });

            this.engagementTimers.delete(element);
        }
    }

    /**
     * Handle mouse hover on psychology elements
     */
    onPsychologyElementHover(elementType, action) {
        if (action === 'enter') {
            this.exposureData.mouseHoverPsychologyElements++;
            
            gtag('event', 'authority_element_hover', {
                'region': this.region,
                'element_type': elementType,
                'action': action,
                'session_id': this.sessionId,
                'total_hovers': this.exposureData.mouseHoverPsychologyElements
            });
        }
    }

    /**
     * Handle clicks on psychology elements
     */
    onPsychologyElementClick(elementType, config) {
        this.exposureData.clicksOnAuthorityElements++;
        
        const clickEvent = {
            elementType: elementType,
            timestamp: Date.now(),
            conversionWeight: config.conversionWeight,
            sessionPosition: this.exposureData.conversionPath.length
        };

        this.exposureData.conversionPath.push(clickEvent);
        this.exposureData.authorityRecognitionIndicators.push({
            type: 'element_click',
            elementType: elementType,
            timestamp: Date.now()
        });

        gtag('event', 'authority_element_click', {
            'region': this.region,
            'element_type': elementType,
            'conversion_weight': config.conversionWeight,
            'session_id': this.sessionId,
            'click_sequence': this.exposureData.clicksOnAuthorityElements,
            'authority_recognition_score': this.calculateAuthorityRecognitionScore()
        });

        // Check if this is a phone click after psychology exposure
        if (elementType === 'phoneNumber' && this.exposureData.psychologyEngagements.length > 0) {
            this.exposureData.phoneClickAfterPsychologyExposure = true;
            this.trackConversionAttribution();
        }
    }

    /**
     * Handle touch events on mobile
     */
    onPsychologyElementTouch(elementType) {
        gtag('event', 'authority_element_touch', {
            'region': this.region,
            'element_type': elementType,
            'session_id': this.sessionId,
            'device_type': 'mobile'
        });
    }

    /**
     * Setup Advanced Engagement Tracking
     */
    setupAdvancedEngagementTracking() {
        // Advanced scroll tracking with psychology focus
        this.setupPsychologyFocusedScrollTracking();
        
        // Reading pattern analysis
        this.setupReadingPatternAnalysis();
        
        // Attention span tracking
        this.setupAttentionSpanTracking();
        
        // Exit intent tracking
        this.setupExitIntentTracking();
    }

    /**
     * Setup psychology-focused scroll tracking
     */
    setupPsychologyFocusedScrollTracking() {
        let lastScrollTime = Date.now();
        let scrollDirection = 'down';
        let psychologyZoneTime = 0;

        window.addEventListener('scroll', () => {
            const currentTime = Date.now();
            const scrollY = window.scrollY;
            const documentHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollY / documentHeight) * 100;

            // Track scroll direction
            const newDirection = scrollY > (this.lastScrollY || 0) ? 'down' : 'up';
            if (newDirection !== scrollDirection) {
                scrollDirection = newDirection;
            }
            this.lastScrollY = scrollY;

            // Check if scrolling in psychology zones
            const psychologyElements = document.querySelectorAll(
                '#authority-hook-m, #authority-hook-d, #authority-hook-v, .authority-hook, .empowerment-message'
            );
            
            psychologyElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    psychologyZoneTime += currentTime - lastScrollTime;
                }
            });

            // Record scroll engagement pattern
            this.exposureData.scrollEngagementPattern.push({
                timestamp: currentTime,
                scrollPercent: scrollPercent,
                direction: scrollDirection,
                psychologyZoneTime: psychologyZoneTime
            });

            lastScrollTime = currentTime;

            // Track significant scroll milestones
            if (scrollPercent >= 25 && !this.scrollMilestones?.milestone25) {
                this.trackScrollMilestone(25);
            } else if (scrollPercent >= 50 && !this.scrollMilestones?.milestone50) {
                this.trackScrollMilestone(50);
            } else if (scrollPercent >= 75 && !this.scrollMilestones?.milestone75) {
                this.trackScrollMilestone(75);
            }
        });
    }

    /**
     * Track scroll milestones
     */
    trackScrollMilestone(milestone) {
        if (!this.scrollMilestones) this.scrollMilestones = {};
        this.scrollMilestones[`milestone${milestone}`] = true;

        gtag('event', 'authority_scroll_milestone', {
            'region': this.region,
            'milestone': milestone,
            'session_id': this.sessionId,
            'psychology_zone_time': this.exposureData.scrollEngagementPattern
                .reduce((sum, entry) => sum + (entry.psychologyZoneTime || 0), 0),
            'total_psychology_engagements': this.exposureData.psychologyEngagements.length
        });
    }

    /**
     * Setup reading pattern analysis
     */
    setupReadingPatternAnalysis() {
        // Track time spent reading vs scrolling
        let readingStartTime = null;
        let isReading = false;

        // Detect reading behavior (no scroll for >2 seconds)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (isReading) {
                isReading = false;
                if (readingStartTime) {
                    const readingDuration = Date.now() - readingStartTime;
                    this.trackReadingSession(readingDuration);
                }
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isReading = true;
                readingStartTime = Date.now();
            }, 2000);
        });
    }

    /**
     * Track reading session
     */
    trackReadingSession(duration) {
        gtag('event', 'authority_reading_session', {
            'region': this.region,
            'reading_duration': duration,
            'session_id': this.sessionId,
            'reading_quality': duration > 5000 ? 'deep' : duration > 2000 ? 'moderate' : 'brief'
        });
    }

    /**
     * Setup attention span tracking
     */
    setupAttentionSpanTracking() {
        // Track window focus/blur for attention measurement
        let focusStartTime = Date.now();
        
        window.addEventListener('focus', () => {
            focusStartTime = Date.now();
        });

        window.addEventListener('blur', () => {
            const attentionDuration = Date.now() - focusStartTime;
            this.trackAttentionSession(attentionDuration);
        });

        // Track mouse movement patterns for engagement
        let mouseIdleTimeout;
        let lastMouseMove = Date.now();

        document.addEventListener('mousemove', () => {
            lastMouseMove = Date.now();
            clearTimeout(mouseIdleTimeout);
            
            mouseIdleTimeout = setTimeout(() => {
                this.trackMouseIdlePeriod(Date.now() - lastMouseMove);
            }, 10000); // 10 seconds of mouse idle
        });
    }

    /**
     * Track attention session
     */
    trackAttentionSession(duration) {
        gtag('event', 'authority_attention_session', {
            'region': this.region,
            'attention_duration': duration,
            'session_id': this.sessionId,
            'attention_quality': duration > 30000 ? 'high' : duration > 10000 ? 'moderate' : 'low'
        });
    }

    /**
     * Track mouse idle periods
     */
    trackMouseIdlePeriod(idleDuration) {
        gtag('event', 'authority_mouse_idle', {
            'region': this.region,
            'idle_duration': idleDuration,
            'session_id': this.sessionId
        });
    }

    /**
     * Setup exit intent tracking
     */
    setupExitIntentTracking() {
        let exitIntentTriggered = false;

        document.addEventListener('mouseleave', (event) => {
            if (event.clientY <= 0 && !exitIntentTriggered) {
                exitIntentTriggered = true;
                this.trackExitIntent();
            }
        });
    }

    /**
     * Track exit intent
     */
    trackExitIntent() {
        const exposureScore = this.calculateExposureScore();
        
        gtag('event', 'authority_exit_intent', {
            'region': this.region,
            'session_id': this.sessionId,
            'exposure_score': exposureScore,
            'psychology_engagements': this.exposureData.psychologyEngagements.length,
            'authority_recognition_score': this.calculateAuthorityRecognitionScore(),
            'conversion_likelihood': this.calculateConversionLikelihood()
        });
    }

    /**
     * Setup Conversion Attribution Tracking
     */
    setupConversionAttributionTracking() {
        // Enhanced phone click tracking
        document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
            phoneLink.addEventListener('click', () => {
                this.trackPhoneConversionWithAttribution(phoneLink.href);
            });
        });

        // Form submission tracking
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                this.trackFormConversionWithAttribution(form);
            });
        });
    }

    /**
     * Track phone conversion with psychology attribution
     */
    trackPhoneConversionWithAttribution(phoneHref) {
        this.exposureData.phoneClickAfterPsychologyExposure = true;
        const exposureScore = this.calculateExposureScore();
        const authorityScore = this.calculateAuthorityRecognitionScore();

        gtag('event', 'authority_phone_conversion_attributed', {
            'region': this.region,
            'phone_number': phoneHref.replace('tel:', ''),
            'session_id': this.sessionId,
            'exposure_score': exposureScore,
            'authority_recognition_score': authorityScore,
            'psychology_influence_level': this.exposureData.engagementLevel,
            'time_to_conversion': Date.now() - this.exposureData.sessionStart,
            'psychology_engagements_count': this.exposureData.psychologyEngagements.length,
            'conversion_path_length': this.exposureData.conversionPath.length,
            'total_psychology_time': this.exposureData.timeSpentOnPsychologyElements
        });

        this.trackConversionAttribution();
    }

    /**
     * Track form conversion with psychology attribution
     */
    trackFormConversionWithAttribution(form) {
        const exposureScore = this.calculateExposureScore();
        const authorityScore = this.calculateAuthorityRecognitionScore();

        gtag('event', 'authority_form_conversion_attributed', {
            'region': this.region,
            'form_id': form.id || 'anonymous',
            'session_id': this.sessionId,
            'exposure_score': exposureScore,
            'authority_recognition_score': authorityScore,
            'psychology_influence_level': this.exposureData.engagementLevel
        });
    }

    /**
     * Track conversion attribution analysis
     */
    trackConversionAttribution() {
        const attribution = this.analyzeConversionAttribution();
        
        gtag('event', 'authority_conversion_attribution', {
            'region': this.region,
            'session_id': this.sessionId,
            'primary_attribution': attribution.primaryAttribution,
            'secondary_attribution': attribution.secondaryAttribution,
            'psychology_contribution_score': attribution.psychologyContribution,
            'conversion_confidence': attribution.confidence
        });
    }

    /**
     * Analyze conversion attribution
     */
    analyzeConversionAttribution() {
        const totalExposureTime = this.exposureData.timeSpentOnPsychologyElements;
        const engagementCount = this.exposureData.psychologyEngagements.length;
        const clickCount = this.exposureData.clicksOnAuthorityElements;

        let primaryAttribution = 'unknown';
        let psychologyContribution = 0;

        if (totalExposureTime > 10000 && engagementCount >= 2) {
            primaryAttribution = 'authority_psychology';
            psychologyContribution = 0.8;
        } else if (totalExposureTime > 5000 || engagementCount >= 1) {
            primaryAttribution = 'partial_psychology';
            psychologyContribution = 0.5;
        } else if (clickCount > 0) {
            primaryAttribution = 'element_interaction';
            psychologyContribution = 0.3;
        } else {
            primaryAttribution = 'direct_navigation';
            psychologyContribution = 0.1;
        }

        return {
            primaryAttribution,
            secondaryAttribution: this.getSecondaryAttribution(),
            psychologyContribution,
            confidence: this.calculateAttributionConfidence()
        };
    }

    /**
     * Get secondary attribution factors
     */
    getSecondaryAttribution() {
        const factors = [];

        if (this.exposureData.scrollEngagementPattern.length > 10) {
            factors.push('scroll_engagement');
        }
        if (this.exposureData.mouseHoverPsychologyElements > 2) {
            factors.push('element_exploration');
        }
        if (this.exposureData.timeSpentOnPsychologyElements > 15000) {
            factors.push('deep_psychology_engagement');
        }

        return factors.join(',') || 'none';
    }

    /**
     * Calculate attribution confidence
     */
    calculateAttributionConfidence() {
        let confidence = 0.5; // Base confidence

        // Increase confidence based on engagement quality
        if (this.exposureData.timeSpentOnPsychologyElements > 10000) confidence += 0.2;
        if (this.exposureData.psychologyEngagements.length >= 3) confidence += 0.2;
        if (this.exposureData.clicksOnAuthorityElements >= 2) confidence += 0.1;

        return Math.min(confidence, 1.0);
    }

    /**
     * Update engagement level based on behavior
     */
    updateEngagementLevel(engagementDuration) {
        const thresholds = AUTHORITY_EXPOSURE_CONFIG.engagementThresholds;
        
        if (engagementDuration >= thresholds.committed.timeOnHook) {
            this.exposureData.engagementLevel = 'committed';
        } else if (engagementDuration >= thresholds.deep.timeOnHook) {
            this.exposureData.engagementLevel = 'deep';
        } else if (engagementDuration >= thresholds.moderate.timeOnHook) {
            this.exposureData.engagementLevel = 'moderate';
        } else if (engagementDuration >= thresholds.minimal.timeOnHook) {
            this.exposureData.engagementLevel = 'minimal';
        }
    }

    /**
     * Calculate overall exposure score
     */
    calculateExposureScore() {
        let score = 0;
        
        // Time-based scoring
        const timeScore = Math.min(this.exposureData.timeSpentOnPsychologyElements / 15000, 1) * 40;
        
        // Engagement-based scoring
        const engagementScore = Math.min(this.exposureData.psychologyEngagements.length / 5, 1) * 30;
        
        // Interaction-based scoring
        const interactionScore = Math.min(this.exposureData.clicksOnAuthorityElements / 3, 1) * 20;
        
        // Recognition indicators scoring
        const recognitionScore = Math.min(this.exposureData.authorityRecognitionIndicators.length / 2, 1) * 10;
        
        score = timeScore + engagementScore + interactionScore + recognitionScore;
        
        this.exposureData.totalExposureScore = score;
        return score;
    }

    /**
     * Calculate Authority Recognition Score
     */
    calculateAuthorityRecognitionScore() {
        let recognitionScore = 0;

        // Strong indicators
        if (this.exposureData.phoneClickAfterPsychologyExposure) recognitionScore += 40;
        if (this.exposureData.timeSpentOnPsychologyElements > 10000) recognitionScore += 30;
        
        // Moderate indicators
        if (this.exposureData.clicksOnAuthorityElements >= 2) recognitionScore += 20;
        if (this.exposureData.psychologyEngagements.length >= 3) recognitionScore += 10;

        return Math.min(recognitionScore, 100);
    }

    /**
     * Calculate conversion likelihood
     */
    calculateConversionLikelihood() {
        const exposureScore = this.calculateExposureScore();
        const recognitionScore = this.calculateAuthorityRecognitionScore();
        const regionalModifier = AUTHORITY_EXPOSURE_CONFIG.regionalPsychologyScoring[this.region]?.hookPower || 0.5;

        const likelihood = ((exposureScore * 0.4) + (recognitionScore * 0.6)) * regionalModifier / 100;
        
        return Math.min(likelihood, 1.0);
    }

    /**
     * Setup real-time analytics
     */
    setupRealTimeAnalytics() {
        // Send periodic analytics updates
        setInterval(() => {
            this.sendRealTimeUpdate();
        }, 30000); // Every 30 seconds
    }

    /**
     * Send real-time analytics update
     */
    sendRealTimeUpdate() {
        const exposureScore = this.calculateExposureScore();
        const recognitionScore = this.calculateAuthorityRecognitionScore();
        const conversionLikelihood = this.calculateConversionLikelihood();

        gtag('event', 'authority_exposure_realtime_update', {
            'region': this.region,
            'session_id': this.sessionId,
            'session_duration': Date.now() - this.exposureData.sessionStart,
            'exposure_score': exposureScore,
            'recognition_score': recognitionScore,
            'conversion_likelihood': conversionLikelihood,
            'engagement_level': this.exposureData.engagementLevel,
            'psychology_engagements': this.exposureData.psychologyEngagements.length,
            'authority_clicks': this.exposureData.clicksOnAuthorityElements
        });
    }

    /**
     * Start exposure session
     */
    startExposureSession() {
        gtag('event', 'authority_exposure_session_start', {
            'region': this.region,
            'session_id': this.sessionId,
            'psychology_type': AUTHORITY_EXPOSURE_CONFIG.regionalPsychologyScoring[this.region]?.psychologyType,
            'baseline_performance': AUTHORITY_EXPOSURE_CONFIG.regionalPsychologyScoring[this.region]?.baseline,
            'hook_power': AUTHORITY_EXPOSURE_CONFIG.regionalPsychologyScoring[this.region]?.hookPower
        });
    }

    /**
     * Generate session ID
     */
    generateSessionId() {
        return `exposure_${this.region}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get comprehensive analytics summary
     */
    getAnalyticsSummary() {
        return {
            sessionId: this.sessionId,
            region: this.region,
            exposureData: this.exposureData,
            scores: {
                exposure: this.calculateExposureScore(),
                recognition: this.calculateAuthorityRecognitionScore(),
                conversionLikelihood: this.calculateConversionLikelihood()
            },
            attribution: this.analyzeConversionAttribution(),
            isTracking: this.isTracking
        };
    }
}

// Global initialization function
function initializeAuthorityExposureAnalytics(region) {
    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
        window.authorityExposureAnalytics = new AuthorityExposureAnalytics(region);
        window.authorityExposureAnalytics.initialize();
        return window.authorityExposureAnalytics;
    } else {
        console.warn('📈 Authority Exposure Analytics requires browser environment and Google Analytics');
        return null;
    }
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // Auto-detect region from URL
        const pathname = window.location.pathname;
        let region = null;
        
        if (pathname.includes('maryland') || pathname.includes('montgomery') || 
            pathname.includes('annapolis') || pathname.includes('frederick') ||
            pathname.includes('washington-county')) {
            region = 'maryland';
        } else if (pathname.includes('dc') || pathname.includes('georgetown') ||
                   pathname.includes('capitol') || pathname.includes('dupont') ||
                   pathname.includes('adams') || pathname.includes('foggy')) {
            region = 'dc';
        } else if (pathname.includes('virginia') || pathname.includes('fairfax') ||
                   pathname.includes('arlington') || pathname.includes('loudoun') ||
                   pathname.includes('prince-william')) {
            region = 'virginia';
        }
        
        if (region) {
            // Small delay to ensure other scripts are loaded
            setTimeout(() => {
                initializeAuthorityExposureAnalytics(region);
            }, 1500);
        }
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AuthorityExposureAnalytics,
        AUTHORITY_EXPOSURE_CONFIG,
        initializeAuthorityExposureAnalytics
    };
}