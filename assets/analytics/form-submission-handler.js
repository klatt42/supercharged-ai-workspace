/**
 * Alex Analytics: Enhanced Form Submission Handler
 * Integrates with Authority Reversal Framework™ conversion optimization
 * Handles emergency responses across MD/DC/VA restoration empire
 */

// Form destination endpoints by region
const FORM_ENDPOINTS = {
    maryland: {
        emergency: 'https://formspree.io/f/md-emergency-water',
        general: 'https://formspree.io/f/md-general-water',
        backup_email: 'emergency-md@restoration-authority.com'
    },
    dc: {
        emergency: 'https://formspree.io/f/dc-emergency-water',
        general: 'https://formspree.io/f/dc-general-water',
        backup_email: 'emergency-dc@restoration-authority.com'
    },
    virginia: {
        emergency: 'https://formspree.io/f/va-emergency-water',
        general: 'https://formspree.io/f/va-general-water',
        backup_email: 'emergency-va@restoration-authority.com'
    }
};

// Authority Reversal messaging for form responses
const AUTHORITY_RESPONSES = {
    success: {
        title: "✅ YOUR Authority Choice Confirmed",
        message: "You've chosen YOUR water damage expert, not an insurance company's cost-minimizer. We'll call within 5 minutes to coordinate your emergency response.",
        cta: "Emergency Response: {phone}"
    },
    error: {
        title: "⚠️ Form Issue - Call YOUR Expert Directly",
        message: "Technical issue with the form, but you still have authority to choose your expert. Call directly to exercise your restoration authority.",
        cta: "Call YOUR Chosen Expert: {phone}"
    }
};

/**
 * Enhanced form processor with Authority Reversal optimization
 */
class AuthorityReversalFormHandler {
    constructor() {
        this.region = this.detectRegion();
        this.setupFormInterception();
        this.setupAuthorityTracking();
    }
    
    detectRegion() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('maryland') || path.includes('montgomery') || path.includes('annapolis') || path.includes('frederick') || path.includes('washington-county')) {
            return 'maryland';
        } else if (path.includes('dc') || path.includes('georgetown') || path.includes('capitol-hill') || path.includes('dupont') || path.includes('adams-morgan') || path.includes('foggy-bottom')) {
            return 'dc';
        } else if (path.includes('virginia') || path.includes('fairfax') || path.includes('arlington') || path.includes('loudoun') || path.includes('prince-william')) {
            return 'virginia';
        }
        return 'virginia'; // Default
    }
    
    setupFormInterception() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const submissionData = this.processFormData(formData);
                
                // Show loading state with Authority Reversal messaging
                this.showLoadingState(form);
                
                try {
                    await this.submitForm(submissionData);
                    this.showSuccessMessage(submissionData);
                } catch (error) {
                    this.showErrorMessage(error);
                }
            });
        });
    }
    
    processFormData(formData) {
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Add Authority Reversal context
        data.authority_framework = 'plumber_medical_emergency';
        data.region = this.region;
        data.page_url = window.location.href;
        data.timestamp = new Date().toISOString();
        data.authority_score = this.calculateAuthorityScore(data);
        
        return data;
    }
    
    calculateAuthorityScore(data) {
        let score = 0;
        
        // Insurance choice scoring
        if (data.insurance && data.insurance.includes('independent')) score += 50;
        if (data.insurance && data.insurance.includes('OWN')) score += 30;
        if (data.insurance && data.insurance.includes('later')) score += 20;
        
        // Emergency type urgency scoring
        if (data.situation && data.situation.includes('burst-pipe')) score += 20;
        if (data.situation && data.situation.includes('flood')) score += 20;
        if (data.situation && data.situation.includes('sewage')) score += 25;
        
        return Math.min(100, score);
    }
    
    async submitForm(data) {
        const endpoint = data.situation?.includes('emergency') || data.situation?.includes('burst') || data.situation?.includes('flood') ?
                        FORM_ENDPOINTS[this.region].emergency :
                        FORM_ENDPOINTS[this.region].general;
        
        // Primary submission
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`Form submission failed: ${response.status}`);
        }
        
        // Backup email notification for high-value conversions
        if (data.authority_score > 70) {
            this.sendBackupNotification(data);
        }
        
        return response.json();
    }
    
    async sendBackupNotification(data) {
        try {
            await fetch('/backup-notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'high_authority_lead',
                    region: this.region,
                    data: data,
                    priority: 'emergency'
                })
            });
        } catch (error) {
            console.log('Backup notification failed:', error);
        }
    }
    
    showLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '⏳ Connecting YOUR Expert...';
            submitBtn.disabled = true;
        }
    }
    
    showSuccessMessage(data) {
        const phone = FORM_ENDPOINTS[this.region]?.phone || '703-844-4204';
        
        // Create success overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9); z-index: 10000; display: flex;
            align-items: center; justify-content: center; color: white;
            font-family: Inter, sans-serif;
        `;
        
        overlay.innerHTML = `
            <div style="background: linear-gradient(135deg, #2e7d32, #1b5e20); padding: 40px; border-radius: 20px; text-align: center; max-width: 500px; border: 3px solid #ffd700;">
                <h2 style="color: #ffd700; margin-bottom: 20px; font-size: 28px;">
                    ${AUTHORITY_RESPONSES.success.title}
                </h2>
                <p style="margin-bottom: 25px; font-size: 18px; line-height: 1.6;">
                    ${AUTHORITY_RESPONSES.success.message}
                </p>
                <a href="tel:${phone}" style="background: #ffd700; color: #333; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 20px;">
                    ${AUTHORITY_RESPONSES.success.cta.replace('{phone}', phone)}
                </a>
                <p style="margin-top: 20px; font-size: 14px; opacity: 0.9;">
                    Authority Score: ${data.authority_score}/100 | Region: ${this.region.toUpperCase()}
                </p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            overlay.remove();
        }, 10000);
    }
    
    showErrorMessage(error) {
        const phone = FORM_ENDPOINTS[this.region]?.phone || '703-844-4204';
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9); z-index: 10000; display: flex;
            align-items: center; justify-content: center; color: white;
            font-family: Inter, sans-serif;
        `;
        
        overlay.innerHTML = `
            <div style="background: linear-gradient(135deg, #d32f2f, #b71c1c); padding: 40px; border-radius: 20px; text-align: center; max-width: 500px; border: 3px solid #ffd700;">
                <h2 style="color: #ffd700; margin-bottom: 20px; font-size: 28px;">
                    ${AUTHORITY_RESPONSES.error.title}
                </h2>
                <p style="margin-bottom: 25px; font-size: 18px; line-height: 1.6;">
                    ${AUTHORITY_RESPONSES.error.message}
                </p>
                <a href="tel:${phone}" style="background: #ffd700; color: #333; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 20px;">
                    ${AUTHORITY_RESPONSES.error.cta.replace('{phone}', phone)}
                </a>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            overlay.remove();
        }, 8000);
    }
    
    setupAuthorityTracking() {
        // Track form field interactions for Authority Reversal insights
        const insuranceSelect = document.getElementById('insurance-status');
        if (insuranceSelect) {
            insuranceSelect.addEventListener('change', (e) => {
                const choice = e.target.value;
                
                gtag('event', 'authority_choice_made', {
                    'insurance_choice': choice,
                    'authority_level': choice.includes('independent') ? 'high' : 
                                     choice.includes('later') ? 'medium' : 'low',
                    'region': this.region,
                    'framework': 'authority_reversal'
                });
            });
        }
    }
}

// Initialize form handler when DOM is ready
if (typeof window !== 'undefined') {
    new AuthorityReversalFormHandler();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AuthorityReversalFormHandler,
        FORM_ENDPOINTS,
        AUTHORITY_RESPONSES
    };
}