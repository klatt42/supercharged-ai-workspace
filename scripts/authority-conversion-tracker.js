// 📊 AUTHORITY REVERSAL CONVERSION EFFECTIVENESS TRACKER
// Alex Analytics: Real-Time Psychology Performance Measurement System

// Authority Reversal Conversion Tracking Configuration
const authorityConversionConfig = {
    virginia: {
        phone: '703-844-4204',
        psychology: 'medical_authority',
        hook: 'plumber_heart_attack',
        provenBaseline: 53,
        targetConversion: 55,
        empowermentTrigger: 'health_emergency_quality_control',
        trackingEvents: ['hook_viewed_proven', 'authority_recognized_proven', 'medical_premium_accepted']
    },
    maryland: {
        phone: '301-900-5171', 
        psychology: 'parental_protection',
        hook: 'mechanic_child_surgery',
        baselineTarget: 35,
        targetConversion: 45,
        empowermentTrigger: 'child_safety_decision_authority',
        trackingEvents: ['hook_viewed', 'authority_recognized', 'parental_protection_activated']
    },
    dc: {
        phone: '202-796-7422',
        psychology: 'professional_authority', 
        hook: 'barista_merger_negotiation',
        baselineTarget: 30,
        targetConversion: 40,
        empowermentTrigger: 'executive_decision_control',
        trackingEvents: ['hook_viewed', 'authority_recognized', 'professional_authority_accepted']
    }
};

// Real-Time Authority Conversion Tracker
class AuthorityConversionTracker {
    constructor(region) {
        this.region = region;
        this.config = authorityConversionConfig[region];
        this.conversionData = {
            sessions: 0,
            hookViews: 0,
            authorityRecognitions: 0,
            phoneClicks: 0,
            formSubmissions: 0,
            conversionRate: 0,
            authorityEffectiveness: 0
        };
        this.isTracking = false;
    }

    startRealTimeTracking() {
        this.isTracking = true;
        console.log(`📊 AUTHORITY TRACKER: Starting ${this.region} conversion tracking`);
        
        // Initialize session tracking
        this.trackSession();
        
        // Set up real-time event listeners
        this.setupAuthorityEventTracking();
        this.setupConversionEventTracking();
        this.setupPerformanceMonitoring();
        
        // Start continuous analysis
        this.analysisInterval = setInterval(() => {
            this.analyzeConversionEffectiveness();
            this.generateOptimizationInsights();
        }, 30000); // Every 30 seconds
    }

    trackSession() {
        this.conversionData.sessions++;
        
        gtag('event', 'authority_session_start', {
            'region': this.region,
            'psychology_type': this.config.psychology,
            'hook_point': this.config.hook,
            'proven_baseline': this.config.provenBaseline || 'new_target',
            'target_conversion': this.config.targetConversion,
            'session_id': this.generateSessionId()
        });
    }

    setupAuthorityEventTracking() {
        // Track authority psychology hook engagement
        const hookElement = document.querySelector(`#authority-hook-${this.region.charAt(0)}`);
        if (hookElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackAuthorityHookView();
                    }
                });
            });
            observer.observe(hookElement);
        }

        // Track scroll depth for authority engagement measurement
        this.setupScrollDepthTracking();
        
        // Track time on authority psychology sections
        this.setupTimeEngagementTracking();
    }

    setupConversionEventTracking() {
        // Track phone number clicks (primary conversion)
        document.querySelectorAll(`a[href^="tel:${this.config.phone}"]`).forEach(phoneLink => {
            phoneLink.addEventListener('click', () => {
                this.trackPhoneConversion();
            });
        });

        // Track form submissions (secondary conversion)
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                this.trackFormConversion();
            });
        });

        // Track authority empowerment button clicks
        document.querySelectorAll('.authority-empowerment-button').forEach(button => {
            button.addEventListener('click', () => {
                this.trackAuthorityEmpowermentClick();
            });
        });
    }

    trackAuthorityHookView() {
        this.conversionData.hookViews++;
        
        gtag('event', 'authority_hook_engagement', {
            'region': this.region,
            'psychology_type': this.config.psychology,
            'hook_point': this.config.hook,
            'engagement_type': 'hook_viewed',
            'empowerment_trigger': this.config.empowermentTrigger,
            'view_timestamp': Date.now()
        });

        // Start authority recognition timing
        this.authorityViewStartTime = Date.now();
    }

    trackPhoneConversion() {
        this.conversionData.phoneClicks++;
        this.conversionData.authorityRecognitions++;
        
        const conversionTime = Date.now() - this.authorityViewStartTime;
        
        gtag('event', 'authority_phone_conversion', {
            'region': this.region,
            'psychology_type': this.config.psychology,
            'phone_number': this.config.phone,
            'authority_recognition': 'confirmed',
            'empowerment_response': 'phone_action',
            'conversion_time': conversionTime,
            'target_baseline': this.config.provenBaseline || this.config.baselineTarget
        });

        // Calculate real-time conversion rate
        this.calculateConversionRate();
        
        // Track against regional targets
        this.trackAgainstTargets();
    }

    trackFormConversion() {
        this.conversionData.formSubmissions++;
        this.conversionData.authorityRecognitions++;
        
        gtag('event', 'authority_form_conversion', {
            'region': this.region,
            'psychology_type': this.config.psychology,
            'authority_recognition': 'confirmed',
            'empowerment_response': 'form_submission',
            'conversion_type': 'secondary'
        });

        this.calculateConversionRate();
    }

    calculateConversionRate() {
        if (this.conversionData.sessions > 0) {
            this.conversionData.conversionRate = 
                ((this.conversionData.phoneClicks + this.conversionData.formSubmissions) / 
                 this.conversionData.sessions) * 100;
        }

        // Authority effectiveness calculation
        if (this.conversionData.hookViews > 0) {
            this.conversionData.authorityEffectiveness = 
                (this.conversionData.authorityRecognitions / this.conversionData.hookViews) * 100;
        }
    }

    trackAgainstTargets() {
        const currentRate = this.conversionData.conversionRate;
        const target = this.config.targetConversion;
        const baseline = this.config.provenBaseline || this.config.baselineTarget;

        gtag('event', 'authority_target_performance', {
            'region': this.region,
            'current_conversion': currentRate.toFixed(2),
            'target_conversion': target,
            'baseline_conversion': baseline,
            'performance_vs_target': currentRate >= target ? 'above_target' : 'below_target',
            'performance_vs_baseline': currentRate >= baseline ? 'above_baseline' : 'below_baseline',
            'optimization_needed': currentRate < baseline
        });
    }

    analyzeConversionEffectiveness() {
        const effectiveness = {
            conversionRate: this.conversionData.conversionRate,
            authorityEffectiveness: this.conversionData.authorityEffectiveness,
            hookEngagementRate: (this.conversionData.hookViews / this.conversionData.sessions) * 100,
            authorityRecognitionRate: (this.conversionData.authorityRecognitions / this.conversionData.hookViews) * 100
        };

        gtag('event', 'authority_effectiveness_analysis', {
            'region': this.region,
            'conversion_rate': effectiveness.conversionRate.toFixed(2),
            'authority_effectiveness': effectiveness.authorityEffectiveness.toFixed(2),
            'hook_engagement_rate': effectiveness.hookEngagementRate.toFixed(2),
            'authority_recognition_rate': effectiveness.authorityRecognitionRate.toFixed(2),
            'psychology_type': this.config.psychology
        });

        return effectiveness;
    }

    generateOptimizationInsights() {
        const insights = [];
        const currentRate = this.conversionData.conversionRate;
        const target = this.config.targetConversion;

        // Performance gap analysis
        if (currentRate < target) {
            const gap = target - currentRate;
            insights.push({
                type: 'performance_gap',
                priority: gap > 10 ? 'CRITICAL' : 'HIGH',
                insight: `${this.region} conversion ${gap.toFixed(1)}% below target`,
                recommendation: 'Enhance authority psychology messaging',
                assignee: 'Dr. Sarah Hook'
            });
        }

        // Authority effectiveness insights
        if (this.conversionData.authorityEffectiveness < 70) {
            insights.push({
                type: 'authority_effectiveness',
                priority: 'HIGH',
                insight: `${this.region} authority recognition below optimal`,
                recommendation: 'Strengthen authority boundary messaging',
                assignee: 'Mary Enhanced'
            });
        }

        // Cross-region learning opportunities
        if (this.region === 'virginia' && currentRate > this.config.provenBaseline) {
            insights.push({
                type: 'cross_region_learning',
                priority: 'MEDIUM',
                insight: `${this.region} outperforming baseline - apply to other regions`,
                recommendation: 'Cross-pollinate successful patterns to Maryland/DC',
                assignee: 'Alice Intelligence'
            });
        }

        return insights;
    }

    setupScrollDepthTracking() {
        let maxScrollDepth = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                // Track authority section scroll depth
                if (scrollPercent > 25 && maxScrollDepth <= 25) {
                    this.trackAuthorityEngagementDepth('25_percent');
                } else if (scrollPercent > 50 && maxScrollDepth <= 50) {
                    this.trackAuthorityEngagementDepth('50_percent');
                } else if (scrollPercent > 75 && maxScrollDepth <= 75) {
                    this.trackAuthorityEngagementDepth('75_percent');
                }
            }
        });
    }

    trackAuthorityEngagementDepth(depth) {
        gtag('event', 'authority_engagement_depth', {
            'region': this.region,
            'scroll_depth': depth,
            'psychology_type': this.config.psychology,
            'engagement_level': depth === '75_percent' ? 'high' : 'moderate'
        });
    }

    generateSessionId() {
        return `${this.region}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    getConversionSummary() {
        return {
            region: this.region,
            psychology: this.config.psychology,
            conversionData: this.conversionData,
            target: this.config.targetConversion,
            baseline: this.config.provenBaseline || this.config.baselineTarget,
            effectiveness: this.analyzeConversionEffectiveness()
        };
    }
}

// Cross-Region Conversion Analysis
class CrossRegionConversionAnalyzer {
    constructor() {
        this.regionalTrackers = {};
        this.crossRegionData = {};
    }

    initialize() {
        // Initialize trackers for each region
        ['virginia', 'maryland', 'dc'].forEach(region => {
            this.regionalTrackers[region] = new AuthorityConversionTracker(region);
            this.regionalTrackers[region].startRealTimeTracking();
        });

        // Cross-region analysis interval
        setInterval(() => {
            this.performCrossRegionAnalysis();
        }, 60000); // Every minute
    }

    performCrossRegionAnalysis() {
        const crossRegionSummary = {};
        
        Object.keys(this.regionalTrackers).forEach(region => {
            crossRegionSummary[region] = this.regionalTrackers[region].getConversionSummary();
        });

        // Identify best performing psychology
        const bestPerforming = this.identifyBestPerformingPsychology(crossRegionSummary);
        
        // Generate cross-region optimization opportunities
        const optimizationOpportunities = this.generateCrossRegionOptimization(crossRegionSummary);

        gtag('event', 'cross_region_conversion_analysis', {
            'virginia_conversion': crossRegionSummary.virginia.conversionData.conversionRate.toFixed(2),
            'maryland_conversion': crossRegionSummary.maryland.conversionData.conversionRate.toFixed(2),
            'dc_conversion': crossRegionSummary.dc.conversionData.conversionRate.toFixed(2),
            'best_performing': bestPerforming.region,
            'optimization_opportunities': optimizationOpportunities.length
        });

        return {
            summary: crossRegionSummary,
            bestPerforming: bestPerforming,
            optimizationOpportunities: optimizationOpportunities
        };
    }

    identifyBestPerformingPsychology(summary) {
        let bestRegion = null;
        let highestConversion = 0;

        Object.keys(summary).forEach(region => {
            const rate = summary[region].conversionData.conversionRate;
            if (rate > highestConversion) {
                highestConversion = rate;
                bestRegion = region;
            }
        });

        return {
            region: bestRegion,
            psychology: summary[bestRegion].psychology,
            conversionRate: highestConversion
        };
    }

    generateCrossRegionOptimization(summary) {
        const opportunities = [];

        // Apply best performing patterns to underperforming regions
        const best = this.identifyBestPerformingPsychology(summary);
        
        Object.keys(summary).forEach(region => {
            const regionData = summary[region];
            
            if (regionData.conversionData.conversionRate < regionData.target) {
                opportunities.push({
                    type: 'cross_region_learning',
                    region: region,
                    recommendation: `Apply ${best.region} ${best.psychology} patterns to enhance ${region} performance`,
                    currentRate: regionData.conversionData.conversionRate,
                    targetRate: regionData.target,
                    bestPracticeSource: best.region
                });
            }
        });

        return opportunities;
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AuthorityConversionTracker,
        CrossRegionConversionAnalyzer,
        authorityConversionConfig
    };
}