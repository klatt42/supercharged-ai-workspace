// 📞 REGIONAL PHONE NUMBER PERFORMANCE ANALYTICS
// Alex Analytics: Authority Psychology Phone Conversion Intelligence

// Regional Phone Configuration
const regionalPhoneConfig = {
    maryland: {
        phone: '301-900-5171',
        region: 'Maryland',
        psychology: 'parental_protection',
        hook: 'mechanic_child_surgery',
        targetAudience: 'suburban_families',
        conversionTarget: 40,
        empowermentTrigger: 'child_safety_decision_authority'
    },
    dc: {
        phone: '202-796-7422', 
        region: 'Washington DC',
        psychology: 'professional_authority',
        hook: 'barista_merger_negotiation',
        targetAudience: 'executives_professionals',
        conversionTarget: 35,
        empowermentTrigger: 'executive_decision_control'
    },
    virginia: {
        phone: '703-844-4204',
        region: 'Northern Virginia',
        psychology: 'medical_authority',
        hook: 'plumber_heart_attack',
        targetAudience: 'medical_professionals_families',
        conversionTarget: 53, // Proven baseline
        empowermentTrigger: 'health_emergency_quality_control'
    }
};

// Phone Performance Analytics Engine
class RegionalPhoneAnalytics {
    constructor() {
        this.phoneMetrics = {
            maryland: { calls: 0, conversions: 0, authorityRecognition: 0, avgCallTime: 0 },
            dc: { calls: 0, conversions: 0, authorityRecognition: 0, avgCallTime: 0 },
            virginia: { calls: 0, conversions: 0, authorityRecognition: 0, avgCallTime: 0 }
        };
        this.isTracking = false;
        this.callTimings = {};
    }

    startPhonePerformanceTracking() {
        this.isTracking = true;
        console.log('📞 PHONE ANALYTICS: Starting regional phone performance tracking');
        
        // Initialize phone tracking for each region
        Object.keys(regionalPhoneConfig).forEach(region => {
            this.setupPhoneTracking(region);
        });

        // Start performance analysis cycle
        this.analysisInterval = setInterval(() => {
            this.analyzePhonePerformance();
            this.generatePhoneOptimizationTasks();
        }, 60000); // Every minute
    }

    setupPhoneTracking(region) {
        const config = regionalPhoneConfig[region];
        const phoneLinks = document.querySelectorAll(`a[href^="tel:${config.phone}"]`);

        phoneLinks.forEach(phoneLink => {
            phoneLink.addEventListener('click', (event) => {
                this.trackPhoneClick(region, event);
            });
        });

        // Track emergency phone routing
        const emergencyLinks = document.querySelectorAll(`a[href="/emergency-${region.substring(0,2)}"]`);
        emergencyLinks.forEach(emergencyLink => {
            emergencyLink.addEventListener('click', (event) => {
                this.trackEmergencyPhoneClick(region, event);
            });
        });
    }

    trackPhoneClick(region, event) {
        const config = regionalPhoneConfig[region];
        const clickTimestamp = Date.now();
        
        this.phoneMetrics[region].calls++;
        
        // Track authority psychology correlation
        const authorityRecognized = this.detectAuthorityRecognition(region);
        if (authorityRecognized) {
            this.phoneMetrics[region].authorityRecognition++;
        }

        gtag('event', 'regional_phone_click', {
            'region': region,
            'phone_number': config.phone,
            'psychology_type': config.psychology,
            'authority_recognition': authorityRecognized,
            'empowerment_trigger': config.empowermentTrigger,
            'target_audience': config.targetAudience,
            'click_timestamp': clickTimestamp
        });

        // Start call timing
        this.startCallTiming(region, clickTimestamp);
        
        // Track against conversion targets
        this.trackPhoneConversionRate(region);
    }

    trackEmergencyPhoneClick(region, event) {
        const config = regionalPhoneConfig[region];
        
        gtag('event', 'emergency_phone_click', {
            'region': region,
            'phone_number': config.phone,
            'emergency_routing': true,
            'psychology_type': config.psychology,
            'urgency_level': 'emergency',
            'authority_empowerment': 'emergency_choice_control'
        });

        this.phoneMetrics[region].calls++;
        this.phoneMetrics[region].conversions++; // Emergency calls count as high-intent conversions
    }

    detectAuthorityRecognition(region) {
        // Check if user engaged with authority psychology content before phone click
        const authorityElements = [
            `#authority-hook-${region.charAt(0)}`,
            '.authority-empowerment-message',
            '.customer-choice-control'
        ];

        return authorityElements.some(selector => {
            const element = document.querySelector(selector);
            return element && this.hasUserEngaged(element);
        });
    }

    hasUserEngaged(element) {
        // Check if element was in viewport (indicating user saw authority message)
        const rect = element.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        return isVisible || element.hasAttribute('data-viewed');
    }

    startCallTiming(region, startTime) {
        this.callTimings[region] = { startTime: startTime };
        
        // Simulate call duration tracking (in real implementation, this would integrate with call system)
        setTimeout(() => {
            this.endCallTiming(region);
        }, Math.random() * 300000 + 60000); // Random call duration 1-5 minutes
    }

    endCallTiming(region) {
        if (this.callTimings[region]) {
            const duration = Date.now() - this.callTimings[region].startTime;
            this.phoneMetrics[region].avgCallTime = 
                (this.phoneMetrics[region].avgCallTime + duration) / 2;
            
            gtag('event', 'phone_call_duration', {
                'region': region,
                'call_duration': duration,
                'psychology_type': regionalPhoneConfig[region].psychology,
                'avg_call_time': this.phoneMetrics[region].avgCallTime
            });

            delete this.callTimings[region];
        }
    }

    trackPhoneConversionRate(region) {
        const metrics = this.phoneMetrics[region];
        const config = regionalPhoneConfig[region];
        
        if (metrics.calls > 0) {
            const conversionRate = (metrics.conversions / metrics.calls) * 100;
            const authorityCorrelation = (metrics.authorityRecognition / metrics.calls) * 100;
            
            gtag('event', 'regional_phone_performance', {
                'region': region,
                'phone_conversion_rate': conversionRate.toFixed(2),
                'authority_correlation': authorityCorrelation.toFixed(2),
                'target_conversion': config.conversionTarget,
                'performance_vs_target': conversionRate >= config.conversionTarget ? 'above_target' : 'below_target',
                'psychology_effectiveness': authorityCorrelation.toFixed(2)
            });
        }
    }

    analyzePhonePerformance() {
        const performanceAnalysis = {};
        
        Object.keys(regionalPhoneConfig).forEach(region => {
            const metrics = this.phoneMetrics[region];
            const config = regionalPhoneConfig[region];
            
            performanceAnalysis[region] = {
                callVolume: metrics.calls,
                conversionRate: metrics.calls > 0 ? (metrics.conversions / metrics.calls) * 100 : 0,
                authorityCorrelation: metrics.calls > 0 ? (metrics.authorityRecognition / metrics.calls) * 100 : 0,
                avgCallTime: metrics.avgCallTime,
                targetPerformance: config.conversionTarget,
                psychologyEffectiveness: this.calculatePsychologyEffectiveness(region)
            };
        });

        gtag('event', 'cross_region_phone_analysis', {
            'maryland_calls': performanceAnalysis.maryland.callVolume,
            'dc_calls': performanceAnalysis.dc.callVolume,
            'virginia_calls': performanceAnalysis.virginia.callVolume,
            'best_performing_region': this.identifyBestPerformingRegion(performanceAnalysis),
            'overall_authority_effectiveness': this.calculateOverallAuthorityEffectiveness(performanceAnalysis)
        });

        return performanceAnalysis;
    }

    calculatePsychologyEffectiveness(region) {
        const metrics = this.phoneMetrics[region];
        
        if (metrics.calls === 0) return 0;
        
        // Psychology effectiveness = Authority recognition rate + Call conversion correlation
        const authorityRate = (metrics.authorityRecognition / metrics.calls) * 100;
        const conversionRate = (metrics.conversions / metrics.calls) * 100;
        
        return (authorityRate * 0.7 + conversionRate * 0.3); // Weighted effectiveness score
    }

    identifyBestPerformingRegion(analysis) {
        let bestRegion = null;
        let highestScore = 0;
        
        Object.keys(analysis).forEach(region => {
            const score = analysis[region].psychologyEffectiveness;
            if (score > highestScore) {
                highestScore = score;
                bestRegion = region;
            }
        });
        
        return bestRegion;
    }

    calculateOverallAuthorityEffectiveness(analysis) {
        const totalCalls = Object.values(analysis).reduce((sum, data) => sum + data.callVolume, 0);
        const weightedEffectiveness = Object.values(analysis).reduce((sum, data) => 
            sum + (data.psychologyEffectiveness * data.callVolume), 0
        );
        
        return totalCalls > 0 ? (weightedEffectiveness / totalCalls) : 0;
    }

    generatePhoneOptimizationTasks() {
        const analysis = this.analyzePhonePerformance();
        const optimizationTasks = [];
        
        Object.keys(analysis).forEach(region => {
            const data = analysis[region];
            const config = regionalPhoneConfig[region];
            
            // Low call volume optimization
            if (data.callVolume < 5) { // Threshold for optimization
                optimizationTasks.push({
                    type: 'phone_volume_optimization',
                    region: region,
                    priority: 'MEDIUM',
                    task: `Increase ${region} phone visibility and call-to-action prominence`,
                    assignee: 'Elena Execution',
                    currentVolume: data.callVolume,
                    psychology: config.psychology
                });
            }
            
            // Low authority correlation optimization
            if (data.authorityCorrelation < 70) {
                optimizationTasks.push({
                    type: 'authority_psychology_optimization',
                    region: region,
                    priority: 'HIGH',
                    task: `Enhance ${region} authority psychology messaging before phone CTA`,
                    assignee: 'Dr. Sarah Hook',
                    currentCorrelation: data.authorityCorrelation,
                    psychology: config.psychology
                });
            }
            
            // Below target performance optimization
            if (data.conversionRate < config.conversionTarget) {
                const gap = config.conversionTarget - data.conversionRate;
                optimizationTasks.push({
                    type: 'conversion_rate_optimization',
                    region: region,
                    priority: gap > 20 ? 'CRITICAL' : 'HIGH',
                    task: `Optimize ${region} phone conversion (${gap.toFixed(1)}% below target)`,
                    assignee: 'Mary Enhanced',
                    conversionGap: gap,
                    psychology: config.psychology
                });
            }
        });
        
        return optimizationTasks;
    }

    getPhonePerformanceSummary() {
        return {
            metrics: this.phoneMetrics,
            analysis: this.analyzePhonePerformance(),
            optimizationTasks: this.generatePhoneOptimizationTasks(),
            bestPerforming: this.identifyBestPerformingRegion(this.analyzePhonePerformance())
        };
    }
}

// Cross-Region Phone Performance Comparison
class CrossRegionPhoneComparison {
    constructor(phoneAnalytics) {
        this.phoneAnalytics = phoneAnalytics;
        this.comparisonData = {};
    }

    performCrossRegionComparison() {
        const analysis = this.phoneAnalytics.analyzePhonePerformance();
        
        // Identify patterns across regions
        const patterns = {
            highestVolumeRegion: this.findHighestVolumeRegion(analysis),
            highestConversionRegion: this.findHighestConversionRegion(analysis),
            bestAuthorityCorrelation: this.findBestAuthorityCorrelation(analysis),
            crossRegionLearning: this.identifyCrossRegionLearningOpportunities(analysis)
        };
        
        gtag('event', 'cross_region_phone_comparison', {
            'highest_volume': patterns.highestVolumeRegion.region,
            'highest_conversion': patterns.highestConversionRegion.region,
            'best_authority_correlation': patterns.bestAuthorityCorrelation.region,
            'learning_opportunities': patterns.crossRegionLearning.length
        });
        
        return patterns;
    }

    findHighestVolumeRegion(analysis) {
        let highest = { region: null, volume: 0 };
        Object.keys(analysis).forEach(region => {
            if (analysis[region].callVolume > highest.volume) {
                highest = { region: region, volume: analysis[region].callVolume };
            }
        });
        return highest;
    }

    findHighestConversionRegion(analysis) {
        let highest = { region: null, rate: 0 };
        Object.keys(analysis).forEach(region => {
            if (analysis[region].conversionRate > highest.rate) {
                highest = { region: region, rate: analysis[region].conversionRate };
            }
        });
        return highest;
    }

    findBestAuthorityCorrelation(analysis) {
        let best = { region: null, correlation: 0 };
        Object.keys(analysis).forEach(region => {
            if (analysis[region].authorityCorrelation > best.correlation) {
                best = { region: region, correlation: analysis[region].authorityCorrelation };
            }
        });
        return best;
    }

    identifyCrossRegionLearningOpportunities(analysis) {
        const opportunities = [];
        
        // Find best performing elements to apply to other regions
        const bestConversion = this.findHighestConversionRegion(analysis);
        const bestAuthority = this.findBestAuthorityCorrelation(analysis);
        
        Object.keys(analysis).forEach(region => {
            if (region !== bestConversion.region && 
                analysis[region].conversionRate < bestConversion.rate * 0.8) {
                opportunities.push({
                    type: 'conversion_learning',
                    fromRegion: bestConversion.region,
                    toRegion: region,
                    opportunity: `Apply ${bestConversion.region} phone conversion strategies to ${region}`
                });
            }
            
            if (region !== bestAuthority.region &&
                analysis[region].authorityCorrelation < bestAuthority.correlation * 0.8) {
                opportunities.push({
                    type: 'authority_learning',
                    fromRegion: bestAuthority.region,
                    toRegion: region,
                    opportunity: `Apply ${bestAuthority.region} authority psychology to ${region} phone messaging`
                });
            }
        });
        
        return opportunities;
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RegionalPhoneAnalytics,
        CrossRegionPhoneComparison,
        regionalPhoneConfig
    };
}