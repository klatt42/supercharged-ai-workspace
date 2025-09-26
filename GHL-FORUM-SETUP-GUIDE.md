# GoHighLevel Forum Integration Setup Guide
**Independent Restoration Forum - GHL MCP Server Configuration**

## 🎯 Overview
This guide configures the comprehensive GHL integration system for the Independent Restoration Forum, implementing emergency/urgent/standard notification workflows with Authority Reversal Framework integration.

---

## 📋 GHL Configuration Steps

### **Step 1: Webhook Setup**

1. **Create GHL Webhook:**
   - Login to GoHighLevel
   - Navigate to Settings → Integrations → Webhooks
   - Create new webhook: "Forum Question Submission"
   - Copy webhook URL (format: `https://hooks.gohighlevel.com/YOUR_WEBHOOK_ID`)

2. **Configure Webhook Fields:**
   ```json
   {
     "event_type": "contact_created",
     "payload_fields": [
       "firstName", "lastName", "email", "phone", "tags",
       "source", "customFields", "assignedTo"
     ],
     "custom_fields": [
       "question_title", "question_details", "category",
       "urgency_level", "location", "submitted_date",
       "form_source", "ip_address"
     ]
   }
   ```

### **Step 2: Custom Fields Creation**

**Create these custom fields in GHL:**
- `question_title` (Text)
- `question_details` (Long Text)
- `category` (Dropdown: water-damage, fire-damage, mold-remediation, insurance-claims, contractor-selection, regional-specific)
- `urgency_level` (Dropdown: emergency, urgent, standard)
- `location` (Text)
- `submitted_date` (DateTime)
- `form_source` (Text)
- `ip_address` (Text)

### **Step 3: Tag Configuration**

**Create these tags in GHL:**
- `forum-user`
- `forum-water-damage`, `forum-fire-damage`, `forum-mold-remediation`
- `forum-insurance-claims`, `forum-contractor-selection`, `forum-regional-specific`
- `urgency-emergency`, `urgency-urgent`, `urgency-standard`
- `emergency-notified`, `urgent-notified`, `standard-response`
- `priority-response`, `24hr-response`, `weekly-review`

### **Step 4: Pipeline Setup**

1. **Create Pipeline:** "Forum Inquiries Pipeline"
2. **Pipeline Stages:**
   - `new-submission` (Initial stage)
   - `emergency-response` (Emergency questions)
   - `urgent-response` (Urgent questions)
   - `standard-response` (Standard questions)
   - `expert-responded` (Response sent)
   - `follow-up-scheduled` (Assessment booked)
   - `converted-client` (Became customer)

---

## 🚨 Notification Workflows

### **Emergency Workflow Configuration**

**Trigger:** Contact created with tag `urgency-emergency`

**Actions to create in GHL:**

1. **Immediate SMS (0 minutes delay)**
   - **Recipient:** +17038444204
   - **Message:**
     ```
     🚨 EMERGENCY FORUM QUESTION: {{contact.customFields.question_title}} from {{contact.customFields.location}}.
     Requires immediate response.
     Contact: {{contact.phone}} {{contact.email}}
     ```

2. **Immediate Email (0 minutes delay)**
   - **Recipient:** info@bizinsiderpro.com
   - **Subject:** "EMERGENCY FORUM QUESTION - Immediate Response Required"
   - **Template:** Use `emergency_forum_email` from workflow JSON

3. **Create Task (0 minutes delay)**
   - **Title:** "EMERGENCY: Respond to forum question within 2 hours"
   - **Assignee:** Restoration Expert User
   - **Due Date:** +2 hours from submission
   - **Priority:** Urgent

4. **Create Opportunity (0 minutes delay)**
   - **Pipeline:** Forum Inquiries Pipeline
   - **Stage:** emergency-response
   - **Value:** $7,500
   - **Name:** "EMERGENCY Forum: {{contact.customFields.question_title}}"

### **Urgent Workflow Configuration**

**Trigger:** Contact created with tag `urgency-urgent`

**Actions:**

1. **SMS (15 minutes delay)**
   - **Recipient:** +17038444204
   - **Message:**
     ```
     ⏰ URGENT FORUM QUESTION: {{contact.customFields.question_title}} from {{contact.customFields.location}}.
     Response needed within 24 hours.
     Contact: {{contact.phone}} {{contact.email}}
     ```

2. **Email (0 minutes delay)**
   - **Recipient:** info@bizinsiderpro.com
   - **Subject:** "URGENT FORUM QUESTION - 24 Hour Response Window"
   - **Template:** Use `urgent_forum_email` from workflow JSON

3. **Create Task (0 minutes delay)**
   - **Due Date:** +24 hours from submission
   - **Priority:** Normal

4. **Create Opportunity**
   - **Value:** $5,000
   - **Stage:** urgent-response

### **Standard Workflow Configuration**

**Trigger:** Contact created with tag `urgency-standard`

**Actions:**

1. **Add to Daily Digest**
   - **Email:** info@bizinsiderpro.com
   - **Digest Type:** Daily Forum Questions Summary

2. **Create Task**
   - **Title:** "Review and respond to standard forum questions"
   - **Due Date:** +1 business day
   - **Priority:** Low

3. **Create Opportunity**
   - **Value:** $3,000
   - **Stage:** standard-response

---

## 📧 Email Template Setup

### **Emergency Email Template**

1. **Create Template:** "Emergency Forum Email"
2. **Subject:** "EMERGENCY FORUM QUESTION - Immediate Response Required"
3. **HTML Content:** Use HTML from `ghl-forum-workflows.json`
4. **Variables to map:**
   - `{{question_title}}` → `{{contact.customFields.question_title}}`
   - `{{location}}` → `{{contact.customFields.location}}`
   - `{{category}}` → `{{contact.customFields.category}}`
   - `{{user_name}}` → `{{contact.firstName}} {{contact.lastName}}`
   - `{{email}}` → `{{contact.email}}`
   - `{{phone}}` → `{{contact.phone}}`
   - `{{question_details}}` → `{{contact.customFields.question_details}}`
   - `{{submitted_date}}` → `{{contact.customFields.submitted_date}}`

### **Urgent Email Template**

Same process as emergency, but use urgent email HTML from workflow JSON.

---

## 🔗 Website Integration

### **Environment Variables to Set**

```bash
# Add to Netlify environment variables or .env file
GHL_WEBHOOK_URL=https://hooks.gohighlevel.com/YOUR_WEBHOOK_ID
GHL_API_KEY=your_ghl_api_key_here
EMERGENCY_PHONE=+17038444204
EMERGENCY_EMAIL=info@bizinsiderpro.com
```

### **Netlify Form Configuration**

The form is already configured with:
- `data-netlify="true"` for Netlify handling
- `data-netlify-recaptcha="true"` for spam protection
- Hidden fields for GHL integration
- Form name: `forum-question`

### **JavaScript Files Integration**

Files created:
- `js/ghl-forum-integration.js` - Main GHL integration logic
- `ghl-forum-workflows.json` - Complete workflow configuration
- `restoration-forum.html` - Updated with GHL integration

---

## 🧪 Testing Procedures

### **Test Emergency Workflow**

1. Submit form with:
   - Category: "Water Damage Emergency"
   - Urgency: "Emergency - Immediate Response Needed"
   - Include emergency keywords in question

2. **Expected Results:**
   - SMS received within 2 minutes
   - Email received immediately
   - GHL contact created with proper tags
   - Task created with 2-hour deadline
   - Opportunity created with $7,500 value

### **Test Urgent Workflow**

1. Submit form with:
   - Category: Any service category
   - Urgency: "Urgent - Within 24 Hours"

2. **Expected Results:**
   - SMS received after 15 minutes
   - Email received immediately
   - Task created with 24-hour deadline
   - Opportunity created with $5,000 value

### **Test Standard Workflow**

1. Submit form with:
   - Urgency: "Standard - General Question"

2. **Expected Results:**
   - Added to daily digest
   - Task created for next business day
   - Opportunity created with $3,000 value

---

## 📊 Analytics Integration

### **GHL Reporting Setup**

Create reports for:
- **Forum Submission Volume** (by urgency level)
- **Response Time Performance** (emergency vs urgent vs standard)
- **Conversion Rates** (forum inquiry → phone call → assessment → sale)
- **Regional Distribution** (VA/MD/DC breakdown)
- **Category Analysis** (most common question types)

### **Conversion Tracking**

Monitor these conversion paths:
1. **Emergency Form → Phone Call** (should be 80%+ for emergencies)
2. **Form Submission → Assessment Scheduled** (target 40%+)
3. **Assessment → Sale** (target 60%+)
4. **Forum Engagement → Website Navigation** (track internal clicks)

---

## 🔧 Troubleshooting

### **Common Issues:**

1. **Webhook Not Firing**
   - Verify webhook URL is correct
   - Check GHL webhook logs
   - Ensure form fields match GHL custom fields

2. **SMS Not Sending**
   - Verify phone number format (+1 prefix required)
   - Check GHL SMS credits
   - Confirm SMS permissions in GHL

3. **Tags Not Applying**
   - Verify tag names match exactly (case-sensitive)
   - Check workflow trigger conditions
   - Ensure contact creation completed successfully

4. **Tasks Not Creating**
   - Verify user assignment exists in GHL
   - Check calendar/task permissions
   - Confirm due date calculation logic

### **Monitoring Commands**

```bash
# Check form submissions (Netlify)
curl -H "Authorization: Bearer YOUR_NETLIFY_TOKEN" \
     https://api.netlify.com/api/v1/forms/YOUR_FORM_ID/submissions

# Test webhook endpoint
curl -X POST https://hooks.gohighlevel.com/YOUR_WEBHOOK_ID \
     -H "Content-Type: application/json" \
     -d '{"test": "webhook_connectivity"}'
```

---

## 🚀 Go-Live Checklist

- [ ] GHL webhook URL configured and tested
- [ ] All custom fields created in GHL
- [ ] All tags created and categorized
- [ ] Forum Inquiries Pipeline set up with proper stages
- [ ] Emergency workflow tested (SMS + Email + Task + Opportunity)
- [ ] Urgent workflow tested (SMS + Email + Task + Opportunity)
- [ ] Standard workflow tested (Digest + Task + Opportunity)
- [ ] Email templates created and formatted
- [ ] Environment variables set in Netlify
- [ ] Form submission testing completed
- [ ] Phone number formatting verified
- [ ] Emergency contact display tested
- [ ] Fallback to Netlify Forms confirmed working
- [ ] Analytics tracking implemented
- [ ] Staff training on emergency response procedures

---

**📞 Emergency Contact for Setup Issues:** (703) 844-4204
**📧 Technical Support:** info@bizinsiderpro.com

*This integration provides comprehensive forum management with Authority Reversal Framework integration, ensuring no emergency restoration inquiry is missed while building a valuable educational resource for AI platform citations.*