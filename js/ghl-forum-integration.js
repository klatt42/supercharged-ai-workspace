/**
 * GoHighLevel Forum Integration System
 * Independent Restoration Forum - GHL MCP Server Integration
 * Handles form submissions, contact creation, and notification workflows
 */

class GHLForumIntegration {
    constructor() {
        this.ghlApiBase = 'https://rest.gohighlevel.com/v1';
        this.webhookUrl = process.env.GHL_WEBHOOK_URL || 'https://hooks.gohighlevel.com/YOUR_WEBHOOK_ID';
        this.emergencyPhone = '(703) 844-4204';
        this.emergencyEmail = 'info@bizinsiderpro.com';

        this.initializeFormHandlers();
        this.setupUrgencyDetection();
    }

    /**
     * Initialize form submission handlers
     */
    initializeFormHandlers() {
        // Netlify form submission handling
        if (typeof window !== 'undefined') {
            const forumForm = document.querySelector('form[name="forum-question"]');
            if (forumForm) {
                forumForm.addEventListener('submit', this.handleFormSubmission.bind(this));
            }
        }
    }

    /**
     * Handle form submission with GHL integration
     */
    async handleFormSubmission(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        // Verify consent checkbox
        const consentAccepted = formData.get('disclaimer-accepted');
        if (!consentAccepted) {
            this.showConsentError(form);
            return;
        }

        // Extract form data
        const submissionData = {
            userName: formData.get('userName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            category: formData.get('category'),
            urgency: formData.get('urgency'),
            questionTitle: formData.get('questionTitle'),
            questionDetails: formData.get('questionDetails'),
            submittedAt: new Date().toISOString(),
            source: 'Forum Question Submission',
            ipAddress: this.getClientIP(),
            userAgent: navigator.userAgent,
            consentAccepted: true,
            termsAcceptedAt: new Date().toISOString()
        };

        try {
            // Show loading state
            this.showFormLoading(form);

            // Create GHL contact
            await this.createGHLContact(submissionData);

            // Submit to Netlify for backup
            await this.submitToNetlify(form, formData);

            // Handle urgency-based workflows
            await this.triggerUrgencyWorkflow(submissionData);

            // Show success message
            this.showFormSuccess(form, submissionData);

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, error);
        }
    }

    /**
     * Create contact in GoHighLevel via webhook
     */
    async createGHLContact(data) {
        const ghlContactData = {
            firstName: data.userName.split(' ')[0] || 'Forum',
            lastName: data.userName.split(' ').slice(1).join(' ') || 'User',
            email: data.email,
            phone: data.phone,
            tags: this.generateContactTags(data),
            source: 'Forum Question Submission',
            customFields: {
                question_title: data.questionTitle,
                question_details: data.questionDetails,
                category: data.category,
                urgency_level: data.urgency,
                location: data.location,
                submitted_date: data.submittedAt,
                ip_address: data.ipAddress,
                user_agent: data.userAgent,
                consent_accepted: data.consentAccepted,
                terms_accepted_at: data.termsAcceptedAt,
                privacy_policy_version: '2024-09-25',
                terms_of_use_version: '2024-09-25'
            },
            assignedTo: 'restoration-expert-user-id',
            opportunityData: this.createOpportunityData(data)
        };

        // Send to GHL webhook
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ghlContactData)
        });

        if (!response.ok) {
            throw new Error(`GHL webhook failed: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Generate appropriate tags for GHL contact
     */
    generateContactTags(data) {
        const tags = [
            'forum-user',
            `forum-${data.category}`,
            `urgency-${data.urgency}`,
            `source-forum-submission`
        ];

        // Add location-based tags
        if (data.location) {
            const locationTag = data.location.toLowerCase()
                .replace(/[^a-z\s]/g, '')
                .replace(/\s+/g, '-');
            tags.push(`location-${locationTag}`);
        }

        // Add date-based tags
        const currentDate = new Date();
        tags.push(`submitted-${currentDate.getFullYear()}`);
        tags.push(`submitted-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`);

        return tags;
    }

    /**
     * Create opportunity data for high-value submissions
     */
    createOpportunityData(data) {
        const monetaryValues = {
            'water-damage': 5000,
            'fire-damage': 8000,
            'mold-remediation': 3000,
            'insurance-claims': 6000,
            'contractor-selection': 4000,
            'regional-specific': 3500
        };

        return {
            name: `Forum Inquiry: ${data.questionTitle}`,
            monetaryValue: monetaryValues[data.category] || 3000,
            pipelineId: 'forum-inquiries-pipeline',
            status: data.urgency === 'emergency' ? 'hot-lead' : 'warm-lead',
            source: 'Forum Question',
            notes: `Forum submission from ${data.location}. Category: ${data.category}. Urgency: ${data.urgency}.`
        };
    }

    /**
     * Trigger urgency-based notification workflows
     */
    async triggerUrgencyWorkflow(data) {
        switch (data.urgency) {
            case 'emergency':
                await this.handleEmergencyWorkflow(data);
                break;
            case 'urgent':
                await this.handleUrgentWorkflow(data);
                break;
            case 'standard':
                await this.handleStandardWorkflow(data);
                break;
        }
    }

    /**
     * Emergency workflow - immediate notifications
     */
    async handleEmergencyWorkflow(data) {
        // Immediate SMS notification
        await this.sendSMSNotification({
            to: this.emergencyPhone,
            message: `🚨 EMERGENCY FORUM QUESTION: ${data.questionTitle} from ${data.location}. Requires immediate response. Contact: ${data.phone || data.email}`
        });

        // Immediate email notification
        await this.sendEmailNotification({
            to: this.emergencyEmail,
            subject: 'EMERGENCY FORUM QUESTION - Immediate Response Required',
            body: this.formatEmergencyEmail(data),
            priority: 'high'
        });

        // Create calendar task for 2-hour response
        await this.createCalendarTask({
            title: 'EMERGENCY: Respond to forum question within 2 hours',
            description: `${data.questionTitle} - ${data.location}`,
            dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
            priority: 'urgent'
        });
    }

    /**
     * Urgent workflow - 24-hour response window
     */
    async handleUrgentWorkflow(data) {
        // SMS within 15 minutes
        setTimeout(async () => {
            await this.sendSMSNotification({
                to: this.emergencyPhone,
                message: `⏰ URGENT FORUM QUESTION: ${data.questionTitle} from ${data.location}. Response needed within 24 hours. Contact: ${data.phone || data.email}`
            });
        }, 15 * 60 * 1000); // 15 minutes

        // Email notification
        await this.sendEmailNotification({
            to: this.emergencyEmail,
            subject: 'URGENT FORUM QUESTION - 24 Hour Response Window',
            body: this.formatUrgentEmail(data),
            priority: 'normal'
        });

        // Create calendar task for 24-hour response
        await this.createCalendarTask({
            title: 'URGENT: Respond to forum question within 24 hours',
            description: `${data.questionTitle} - ${data.location}`,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            priority: 'normal'
        });
    }

    /**
     * Standard workflow - weekly digest
     */
    async handleStandardWorkflow(data) {
        // Add to daily digest queue
        await this.addToDailyDigest(data);

        // Create weekly calendar task
        await this.createCalendarTask({
            title: 'Review and respond to standard forum questions',
            description: 'Weekly forum question review',
            dueDate: this.getNextWeekday(), // Next business day
            priority: 'low'
        });
    }

    /**
     * Setup real-time urgency detection
     */
    setupUrgencyDetection() {
        if (typeof window !== 'undefined') {
            const urgencySelect = document.getElementById('urgency-level');
            const questionDetails = document.getElementById('question-details');

            if (urgencySelect && questionDetails) {
                urgencySelect.addEventListener('change', this.handleUrgencyChange.bind(this));
                questionDetails.addEventListener('input', this.analyzeQuestionUrgency.bind(this));
            }
        }
    }

    /**
     * Handle urgency selection changes
     */
    handleUrgencyChange(event) {
        const urgencyLevel = event.target.value;
        const formGroups = document.querySelectorAll('.form-group');

        // Remove existing urgency classes
        formGroups.forEach(group => {
            group.classList.remove('urgency-emergency', 'urgency-urgent');
        });

        // Apply urgency styling
        if (urgencyLevel === 'emergency') {
            event.target.closest('.form-group').classList.add('urgency-emergency');
            this.showEmergencyMessage();
        } else if (urgencyLevel === 'urgent') {
            event.target.closest('.form-group').classList.add('urgency-urgent');
            this.showUrgentMessage();
        }
    }

    /**
     * Analyze question text for urgency keywords
     */
    analyzeQuestionUrgency(event) {
        const text = event.target.value.toLowerCase();
        const emergencyKeywords = [
            'flooding', 'flood', 'water everywhere', 'emergency',
            'urgent', 'immediate', 'asap', 'right now', 'today',
            'fire', 'smoke damage', 'can\'t stay', 'unsafe',
            'mold everywhere', 'health issues', 'breathing problems'
        ];

        const hasEmergencyKeywords = emergencyKeywords.some(keyword =>
            text.includes(keyword)
        );

        if (hasEmergencyKeywords) {
            this.suggestUrgencyLevel('emergency');
        }
    }

    /**
     * Show emergency contact message
     */
    showEmergencyMessage() {
        const existingMessage = document.querySelector('.emergency-contact-message');
        if (existingMessage) existingMessage.remove();

        const message = document.createElement('div');
        message.className = 'emergency-contact-message';
        message.style.cssText = `
            background: #fee2e2;
            border: 2px solid #dc2626;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            color: #dc2626;
            font-weight: bold;
        `;
        message.innerHTML = `
            🚨 <strong>EMERGENCY SITUATION DETECTED</strong><br>
            For immediate emergency response, call <a href="tel:703-844-4204" style="color: #dc2626;">(703) 844-4204</a> now.<br>
            This form will also trigger immediate notifications to our emergency response team.
        `;

        const urgencyGroup = document.getElementById('urgency-level').closest('.form-group');
        urgencyGroup.parentNode.insertBefore(message, urgencyGroup.nextSibling);
    }

    /**
     * Suggest urgency level based on content analysis
     */
    suggestUrgencyLevel(level) {
        const urgencySelect = document.getElementById('urgency-level');
        if (urgencySelect.value === '') {
            urgencySelect.value = level;
            urgencySelect.dispatchEvent(new Event('change'));

            const suggestion = document.createElement('div');
            suggestion.style.cssText = `
                background: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 4px;
                padding: 8px;
                margin: 5px 0;
                font-size: 12px;
                color: #92400e;
            `;
            suggestion.textContent = `💡 Based on your description, this appears to be an ${level} situation.`;

            urgencySelect.parentNode.appendChild(suggestion);
            setTimeout(() => suggestion.remove(), 10000);
        }
    }

    /**
     * Format emergency email template
     */
    formatEmergencyEmail(data) {
        return `
EMERGENCY FORUM QUESTION - IMMEDIATE RESPONSE REQUIRED

Question: ${data.questionTitle}
Location: ${data.location}
Category: ${data.category}
Submitted: ${new Date(data.submittedAt).toLocaleString()}

Contact Information:
Name: ${data.userName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Question Details:
${data.questionDetails}

REQUIRED ACTION: Response needed within 2 hours
This is marked as an EMERGENCY restoration inquiry.

Direct Contact: ${data.phone ? `Call ${data.phone}` : `Email ${data.email}`}
        `;
    }

    /**
     * Submit form to Netlify as backup
     */
    async submitToNetlify(form, formData) {
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (!response.ok) {
            throw new Error('Netlify submission failed');
        }
    }

    /**
     * Show form loading state
     */
    showFormLoading(form) {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Question...';
        submitBtn.style.opacity = '0.7';
    }

    /**
     * Show form success message
     */
    showFormSuccess(form, data) {
        form.style.display = 'none';

        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background: #d4edda;
            border: 2px solid #10b981;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            color: #047857;
        `;

        const responseTime = data.urgency === 'emergency' ? 'within 2 hours' :
                           data.urgency === 'urgent' ? 'within 24 hours' :
                           'within 2-3 business days';

        successMessage.innerHTML = `
            <h3 style="color: #047857; margin: 0 0 15px 0;">✅ Question Submitted Successfully!</h3>
            <p style="margin: 0 0 15px 0;"><strong>Expected Response Time:</strong> ${responseTime}</p>
            <p style="margin: 0 0 20px 0;">Our restoration expert will review your question and provide detailed guidance with Authority Reversal Framework integration.</p>
            ${data.urgency === 'emergency' ?
                `<p style="background: #fee2e2; padding: 10px; border-radius: 4px; color: #dc2626; margin: 15px 0;"><strong>Emergency Contact:</strong> For immediate assistance, call <a href="tel:703-844-4204" style="color: #dc2626;">(703) 844-4204</a></p>` : ''}
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">You'll receive email notification when your question is answered.</p>
        `;

        form.parentNode.appendChild(successMessage);
    }

    /**
     * Show consent error message
     */
    showConsentError(form) {
        const existingError = document.querySelector('.consent-error-message');
        if (existingError) existingError.remove();

        const consentError = document.createElement('div');
        consentError.className = 'consent-error-message';
        consentError.style.cssText = `
            background: #fee2e2;
            border: 2px solid #dc2626;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            color: #dc2626;
            font-weight: bold;
        `;
        consentError.innerHTML = `
            ⚠️ <strong>Consent Required:</strong> You must agree to the Terms of Use and Privacy Policy to submit your question.
            <br><br>
            <a href="terms-of-use.html" target="_blank" style="color: #dc2626; text-decoration: underline;">Review Terms of Use</a> |
            <a href="privacy-policy.html" target="_blank" style="color: #dc2626; text-decoration: underline;">Review Privacy Policy</a>
        `;

        const consentCheckbox = form.querySelector('input[name="disclaimer-accepted"]');
        const consentSection = consentCheckbox.closest('.terms-acceptance');
        consentSection.parentNode.insertBefore(consentError, consentSection);

        // Highlight the consent checkbox
        consentCheckbox.focus();
        consentSection.style.border = '2px solid #dc2626';
        consentSection.style.backgroundColor = '#fee2e2';

        setTimeout(() => consentError.remove(), 15000);
    }

    /**
     * Show form error message
     */
    showFormError(form, error) {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Question for Expert Review';
        submitBtn.style.opacity = '1';

        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            background: #fee2e2;
            border: 2px solid #dc2626;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            color: #dc2626;
        `;
        errorMessage.innerHTML = `
            <strong>Submission Error:</strong> Please try again or call <a href="tel:703-844-4204" style="color: #dc2626;">(703) 844-4204</a> directly for immediate assistance.
        `;

        form.parentNode.insertBefore(errorMessage, form);
        setTimeout(() => errorMessage.remove(), 10000);
    }

    /**
     * Get client IP address (approximate)
     */
    getClientIP() {
        // In production, this would be handled server-side
        return 'client-ip-masked';
    }

    /**
     * Get next weekday date
     */
    getNextWeekday() {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        // If weekend, move to Monday
        if (date.getDay() === 0) date.setDate(date.getDate() + 1); // Sunday -> Monday
        if (date.getDay() === 6) date.setDate(date.getDate() + 2); // Saturday -> Monday

        return date;
    }

    /**
     * Placeholder notification methods (would integrate with actual services)
     */
    async sendSMSNotification(config) {
        console.log('SMS Notification:', config);
        // In production: integrate with Twilio, GHL SMS, etc.
    }

    async sendEmailNotification(config) {
        console.log('Email Notification:', config);
        // In production: integrate with GHL email automation
    }

    async createCalendarTask(config) {
        console.log('Calendar Task:', config);
        // In production: integrate with GHL calendar/tasks
    }

    async addToDailyDigest(data) {
        console.log('Added to daily digest:', data.questionTitle);
        // In production: add to digest queue
    }
}

// Initialize GHL integration when DOM is loaded
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ghlForumIntegration = new GHLForumIntegration();
    });
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GHLForumIntegration;
}