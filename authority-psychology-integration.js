/**
 * 🧠 AUTHORITY REVERSAL PSYCHOLOGY INTEGRATION SYSTEM
 * Alex Analytics - Regional Psychology Adaptation & Implementation
 * 
 * Implements proven Authority Reversal Framework™ patterns across all 52 new pages
 * with region-specific psychology adaptation for maximum conversion effectiveness.
 */

// Regional Psychology Configuration
const AUTHORITY_PSYCHOLOGY_CONFIG = {
    maryland: {
        region: 'maryland',
        primaryHook: 'mechanic_child_surgery',
        hookMessage: 'Would you let your mechanic perform your child\'s surgery?',
        psychology: 'parental_protection',
        empowermentTrigger: 'child_safety_decision_authority',
        targetDemographic: 'suburban_families_with_children',
        provenImprovement: null, // New framework
        targetConversion: 45,
        counties: ['montgomery', 'annapolis', 'frederick', 'washington'],
        phones: ['410-555-0199', '240-555-0199'],
        authorityExplanation: 'Of course not. You choose your pediatric surgeon because your child\'s life depends on expert medical care. So why let your insurance company choose your water damage restoration expert when your Maryland family\'s safety and your children\'s health depend on proper water damage remediation?',
        empowermentMessage: 'You choose your child\'s surgeon. Choose your restoration expert. Exercise YOUR parental authority to protect your family - not your insurance company\'s convenience.'
    },
    
    dc: {
        region: 'dc',
        primaryHook: 'funeral_director_doctor',
        hookMessage: 'Would you let your funeral director pick your doctor?',
        psychology: 'professional_authority',
        empowermentTrigger: 'executive_decision_control',
        targetDemographic: 'dc_professionals_executives',
        provenImprovement: null, // New framework
        targetConversion: 40,
        neighborhoods: ['georgetown', 'capitol-hill', 'dupont-circle', 'adams-morgan', 'foggy-bottom'],
        phones: ['202-796-7422'],
        authorityExplanation: 'Of course not. You choose your doctor because your health depends on expert medical care. So why let your insurance company choose your water damage restoration expert when your DC property investment and business continuity depend on proper water damage remediation?',
        empowermentMessage: 'You choose your doctor. Choose your restoration expert. Exercise YOUR executive authority to protect your investment - not your insurance company\'s convenience.'
    },
    
    virginia: {
        region: 'virginia', 
        primaryHook: 'plumber_heart_attack',
        hookMessage: 'Would you let your plumber handle your heart attack?',
        psychology: 'medical_authority',
        empowermentTrigger: 'health_emergency_quality_control',
        targetDemographic: 'northern_va_families',
        provenImprovement: 53, // PROVEN 53% improvement
        targetConversion: 55,
        counties: ['fairfax', 'arlington', 'loudoun', 'prince-william'],
        phones: ['703-844-4204'],
        authorityExplanation: 'Of course not. You choose your cardiac surgeon because your life depends on expert medical care. So why let your insurance company choose your water damage restoration expert when your Northern Virginia family\'s safety and your children\'s health depend on proper water damage remediation?',
        empowermentMessage: 'You choose your cardiac surgeon. Choose your restoration expert. Exercise YOUR parental authority to protect your family - not your insurance company\'s convenience.'
    }
};

// Service-Specific Psychology Enhancement
const SERVICE_PSYCHOLOGY_ENHANCEMENT = {
    'water-damage': {
        urgencyMultiplier: 1.0,
        healthRisk: 'mold_respiratory_danger',
        authorityContext: 'emergency_water_medical_expertise',
        childSafetyTrigger: 'water_damage_child_health_risk'
    },
    'fire-damage': {
        urgencyMultiplier: 1.2,
        healthRisk: 'smoke_toxic_exposure',
        authorityContext: 'fire_restoration_specialist_expertise',
        childSafetyTrigger: 'fire_damage_family_safety_risk'
    },
    'fire-restoration': {
        urgencyMultiplier: 1.2,
        healthRisk: 'smoke_toxic_exposure', 
        authorityContext: 'fire_restoration_specialist_expertise',
        childSafetyTrigger: 'fire_damage_family_safety_risk'
    },
    'mold-remediation': {
        urgencyMultiplier: 0.9,
        healthRisk: 'mold_respiratory_severe_danger',
        authorityContext: 'mold_health_specialist_expertise',
        childSafetyTrigger: 'mold_child_respiratory_emergency'
    },
    'mold-removal': {
        urgencyMultiplier: 0.9,
        healthRisk: 'mold_respiratory_severe_danger',
        authorityContext: 'mold_health_specialist_expertise', 
        childSafetyTrigger: 'mold_child_respiratory_emergency'
    },
    'storm-damage': {
        urgencyMultiplier: 1.1,
        healthRisk: 'structural_safety_compromise',
        authorityContext: 'storm_emergency_specialist_expertise',
        childSafetyTrigger: 'storm_damage_family_shelter_safety'
    }
};

/**
 * Authority Psychology Integration Class
 * Dynamically applies region-specific Authority Reversal psychology
 */
class AuthorityPsychologyIntegrator {
    constructor(region, location, service) {
        this.region = region;
        this.location = location;
        this.service = service;
        this.config = AUTHORITY_PSYCHOLOGY_CONFIG[region];
        this.serviceEnhancement = SERVICE_PSYCHOLOGY_ENHANCEMENT[service];
        this.isInitialized = false;
    }

    /**
     * Initialize Authority Psychology Integration for current page
     */
    initializeAuthorityPsychology() {
        if (!this.config) {
            console.error(`Authority Psychology: No config found for region: ${this.region}`);
            return;
        }

        console.log(`🧠 Initializing Authority Psychology: ${this.region} - ${this.service}`);

        // Apply region-specific psychology messaging
        this.applyAuthorityHookMessaging();
        
        // Setup conversion tracking with psychology context
        this.setupPsychologyConversionTracking();
        
        // Apply service-specific enhancements
        this.applyServicePsychologyEnhancements();
        
        // Setup emergency response psychology
        this.setupEmergencyResponsePsychology();
        
        // Initialize A/B testing for psychology effectiveness
        this.initializePsychologyABTesting();

        this.isInitialized = true;
        
        // Track psychology initialization
        this.trackPsychologyInitialization();
    }

    /**
     * Apply Authority Hook Messaging based on region
     */
    applyAuthorityHookMessaging() {
        const hookElement = document.querySelector('#authority-hook-' + this.region.charAt(0));
        const empowermentElement = document.querySelector('#authority-empowerment-message');

        if (hookElement) {
            // Update authority question
            const questionElement = hookElement.querySelector('.authority-question');
            if (questionElement) {
                questionElement.textContent = this.config.hookMessage;
            }

            // Update authority explanation  
            const explanationElement = hookElement.querySelector('.authority-explanation');
            if (explanationElement) {
                explanationElement.textContent = this.config.authorityExplanation;
            }

            // Track hook application
            gtag('event', 'authority_hook_applied', {
                'region': this.region,
                'hook_type': this.config.primaryHook,
                'psychology_type': this.config.psychology,
                'location': this.location,
                'service': this.service
            });
        }

        if (empowermentElement) {
            empowermentElement.textContent = this.config.empowermentMessage;
            
            gtag('event', 'empowerment_message_applied', {
                'region': this.region,
                'empowerment_trigger': this.config.empowermentTrigger,
                'location': this.location
            });
        }
    }

    /**
     * Setup Psychology-Enhanced Conversion Tracking
     */
    setupPsychologyConversionTracking() {
        // Track phone clicks with psychology context
        this.config.phones.forEach(phone => {
            document.querySelectorAll(`a[href^="tel:${phone}"]`).forEach(phoneLink => {
                phoneLink.addEventListener('click', () => {
                    this.trackPsychologyConversion('phone_click', phone);
                });
            });
        });

        // Track authority hook engagement
        const hookElement = document.querySelector('#authority-hook-' + this.region.charAt(0));
        if (hookElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackPsychologyEngagement('hook_viewed');
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
                    if (entry.isIntersecting) {
                        this.trackPsychologyEngagement('empowerment_viewed');
                    }
                });
            }, { threshold: 0.7 });
            
            observer.observe(empowermentElement);
        }
    }

    /**
     * Apply Service-Specific Psychology Enhancements
     */
    applyServicePsychologyEnhancements() {
        if (!this.serviceEnhancement) return;

        // Enhance urgency messaging based on service type
        const urgencyElements = document.querySelectorAll('.urgency-message, .emergency-message');
        urgencyElements.forEach(element => {
            if (this.serviceEnhancement.urgencyMultiplier > 1.0) {
                element.classList.add('high-urgency');
                element.style.fontWeight = 'bold';
                element.style.color = '#dc2626';
            }
        });

        // Add service-specific child safety messaging
        const safetyElements = document.querySelectorAll('.child-safety-message, .family-safety-message');
        safetyElements.forEach(element => {
            element.setAttribute('data-safety-trigger', this.serviceEnhancement.childSafetyTrigger);
        });

        // Track service enhancement application
        gtag('event', 'service_psychology_enhanced', {
            'region': this.region,
            'service': this.service,
            'urgency_multiplier': this.serviceEnhancement.urgencyMultiplier,
            'health_risk': this.serviceEnhancement.healthRisk,
            'child_safety_trigger': this.serviceEnhancement.childSafetyTrigger
        });
    }

    /**
     * Setup Emergency Response Psychology
     */
    setupEmergencyResponsePsychology() {
        // Detect emergency indicators (24/7, emergency, immediate)
        const emergencyTriggers = document.querySelectorAll('[data-emergency], .emergency, .24-7, .immediate');
        
        emergencyTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                this.activateEmergencyResponsePsychology();
            });
        });

        // Setup time-based emergency psychology (evenings/weekends)
        this.setupTimeBasedEmergencyPsychology();
    }

    /**
     * Activate Emergency Response Psychology
     */
    activateEmergencyResponsePsychology() {
        gtag('event', 'emergency_psychology_activated', {
            'region': this.region,
            'psychology_type': this.config.psychology,
            'empowerment_trigger': this.config.empowermentTrigger,
            'service': this.service,
            'activation_context': 'emergency_response'
        });

        // Show emergency-enhanced authority messaging
        const emergencyModal = this.createEmergencyAuthorityModal();
        document.body.appendChild(emergencyModal);
        emergencyModal.style.display = 'block';
    }

    /**
     * Create Emergency Authority Modal
     */
    createEmergencyAuthorityModal() {
        const modal = document.createElement('div');
        modal.className = 'emergency-authority-modal';
        modal.innerHTML = `
            <div class="emergency-authority-content">
                <h3>🚨 Emergency Authority Decision Required</h3>
                <p><strong>${this.config.hookMessage}</strong></p>
                <p>This is YOUR emergency. YOUR family's safety depends on YOUR choice of expert - not your insurance company's convenience.</p>
                <div class="emergency-actions">
                    <a href="tel:${this.config.phones[0]}" class="emergency-call-button">
                        Call ${this.config.phones[0]} NOW - YOUR Choice
                    </a>
                    <button class="emergency-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                        I'll Choose Later
                    </button>
                </div>
            </div>
        `;

        // Add emergency modal styles
        const style = document.createElement('style');
        style.textContent = `
            .emergency-authority-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }
            .emergency-authority-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                margin: 20px;
                text-align: center;
                border: 3px solid #dc2626;
            }
            .emergency-call-button {
                display: block;
                background: #dc2626;
                color: white;
                padding: 1rem 2rem;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            .emergency-close {
                background: #6b7280;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);

        return modal;
    }

    /**
     * Setup Time-Based Emergency Psychology
     */
    setupTimeBasedEmergencyPsychology() {
        const currentHour = new Date().getHours();
        const isEvening = currentHour >= 18 || currentHour <= 6;
        const isWeekend = [0, 6].includes(new Date().getDay());

        if (isEvening || isWeekend) {
            // Enhance emergency messaging for off-hours
            const emergencyElements = document.querySelectorAll('.emergency-message, .24-7-message');
            emergencyElements.forEach(element => {
                element.classList.add('off-hours-emergency');
                element.style.backgroundColor = '#fef2f2';
                element.style.border = '2px solid #dc2626';
            });

            gtag('event', 'off_hours_emergency_psychology', {
                'region': this.region,
                'time_context': isEvening ? 'evening' : 'standard',
                'day_context': isWeekend ? 'weekend' : 'weekday',
                'psychology_enhancement': 'activated'
            });
        }
    }

    /**
     * Initialize Psychology A/B Testing
     */
    initializePsychologyABTesting() {
        // Only A/B test new regions (Maryland/DC) - Virginia is proven
        if (this.region === 'virginia') return;

        const abTestId = this.generateABTestId();
        const variant = Math.random() < 0.5 ? 'control' : 'enhanced';

        if (variant === 'enhanced') {
            this.applyEnhancedPsychologyVariant();
        }

        gtag('event', 'psychology_ab_test_initialized', {
            'region': this.region,
            'ab_test_id': abTestId,
            'variant': variant,
            'psychology_type': this.config.psychology
        });
    }

    /**
     * Apply Enhanced Psychology Variant for A/B Testing
     */
    applyEnhancedPsychologyVariant() {
        // Add additional psychology reinforcement
        const hookElement = document.querySelector('#authority-hook-' + this.region.charAt(0));
        if (hookElement) {
            const enhancedMessage = document.createElement('div');
            enhancedMessage.className = 'psychology-enhancement';
            enhancedMessage.innerHTML = `
                <p><strong>Your ${this.region === 'maryland' ? 'children' : 'business'} deserve the expert YOU choose.</strong></p>
                <p>Insurance companies profit when you accept their cheapest option. YOU profit when you choose quality.</p>
            `;
            enhancedMessage.style.cssText = 'background: #fef3c7; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #f59e0b;';
            hookElement.appendChild(enhancedMessage);
        }
    }

    /**
     * Track Psychology Conversion
     */
    trackPsychologyConversion(type, phone = null) {
        gtag('event', 'psychology_conversion', {
            'region': this.region,
            'location': this.location,
            'service': this.service,
            'psychology_type': this.config.psychology,
            'hook_type': this.config.primaryHook,
            'conversion_type': type,
            'phone_number': phone,
            'proven_improvement': this.config.provenImprovement,
            'target_conversion': this.config.targetConversion,
            'empowerment_trigger': this.config.empowermentTrigger
        });
    }

    /**
     * Track Psychology Engagement
     */
    trackPsychologyEngagement(engagementType) {
        gtag('event', 'psychology_engagement', {
            'region': this.region,
            'location': this.location, 
            'service': this.service,
            'psychology_type': this.config.psychology,
            'engagement_type': engagementType,
            'hook_type': this.config.primaryHook
        });
    }

    /**
     * Track Psychology Initialization
     */
    trackPsychologyInitialization() {
        gtag('event', 'psychology_integration_initialized', {
            'region': this.region,
            'location': this.location,
            'service': this.service,
            'psychology_type': this.config.psychology,
            'hook_type': this.config.primaryHook,
            'proven_baseline': this.config.provenImprovement,
            'target_conversion': this.config.targetConversion,
            'phones': this.config.phones.join(',')
        });
    }

    /**
     * Generate A/B Test ID
     */
    generateABTestId() {
        return `${this.region}_${this.service}_${Date.now().toString(36)}`;
    }

    /**
     * Get Psychology Summary for Reporting
     */
    getPsychologySummary() {
        return {
            region: this.region,
            location: this.location,
            service: this.service,
            config: this.config,
            serviceEnhancement: this.serviceEnhancement,
            isInitialized: this.isInitialized
        };
    }
}

/**
 * Auto-Initialize Psychology Integration
 */
function initializeAuthorityReversalPsychology(region, location = null, service = null) {
    // Auto-detect location and service from URL if not provided
    if (!location || !service) {
        const pathname = window.location.pathname;
        const pathParts = pathname.replace('.html', '').replace('/', '').split('-');
        
        if (!location && pathParts.length >= 2) {
            location = pathParts.slice(0, -2).join('-');
        }
        
        if (!service && pathParts.length >= 2) {
            service = pathParts.slice(-2).join('-');
        }
    }

    const psychologyIntegrator = new AuthorityPsychologyIntegrator(region, location, service);
    psychologyIntegrator.initializeAuthorityPsychology();
    
    return psychologyIntegrator;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AuthorityPsychologyIntegrator,
        AUTHORITY_PSYCHOLOGY_CONFIG,
        SERVICE_PSYCHOLOGY_ENHANCEMENT,
        initializeAuthorityReversalPsychology
    };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    // Wait for DOM and other scripts to load
    document.addEventListener('DOMContentLoaded', function() {
        // Auto-detect region from pathname or domain
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
            window.authorityPsychologyIntegrator = initializeAuthorityReversalPsychology(region);
        }
    });
}