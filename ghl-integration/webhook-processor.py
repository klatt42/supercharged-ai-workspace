#!/usr/bin/env python3
"""
GHL Webhook Processor for Expert Response Automation
Processes GoHighLevel form submissions and triggers appropriate expert responses
"""

import json
import requests
import re
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import sys
import os

# Add forum-experts to path for response generation
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
forum_experts_dir = os.path.join(parent_dir, 'forum-experts')
sys.path.insert(0, forum_experts_dir)

try:
    from response_generator import ExpertResponseGenerator
except ImportError:
    print("Warning: Could not import ExpertResponseGenerator. Creating mock class.")
    class ExpertResponseGenerator:
        def __init__(self, *args, **kwargs):
            pass
        def generate_emergency_response(self, *args, **kwargs):
            return "<div>Mock emergency response</div>"
        def generate_health_focused_response(self, *args, **kwargs):
            return "<div>Mock health response</div>"
        def generate_educational_response(self, *args, **kwargs):
            return "<div>Mock educational response</div>"

class GHLWebhookProcessor:
    def __init__(self, config_file: str = "notification-workflows.json"):
        """Initialize with GHL workflow configuration"""
        with open(config_file, 'r') as f:
            self.config = json.load(f)

        self.workflows = self.config['ghl_workflow_config']['workflows']
        self.regional_routing = self.config['ghl_workflow_config']['regional_routing']
        self.response_templates = self.config['response_templates']

        # Initialize expert response generator
        expert_profiles_path = os.path.join(forum_experts_dir, 'expert-profiles.json')
        self.expert_generator = ExpertResponseGenerator(expert_profiles_path)

    def process_webhook(self, webhook_data: Dict) -> Dict:
        """Main webhook processing function"""
        try:
            # Extract key information
            submission_data = self.extract_submission_data(webhook_data)

            # Determine urgency and workflow
            workflow_type = self.determine_workflow(submission_data)

            # Assign expert and generate response
            expert_assignment = self.assign_expert(workflow_type, submission_data['region'])

            # Generate automated response
            response_content = self.generate_response(workflow_type, expert_assignment, submission_data)

            # Send notifications
            notification_results = self.send_notifications(workflow_type, submission_data, response_content)

            # Log for tracking
            processing_result = {
                "timestamp": datetime.now().isoformat(),
                "workflow_type": workflow_type,
                "expert_assigned": expert_assignment,
                "region": submission_data['region'],
                "urgency_level": self.workflows[workflow_type]['escalation_level'],
                "notifications_sent": notification_results,
                "response_generated": bool(response_content),
                "status": "processed"
            }

            return processing_result

        except Exception as e:
            return {
                "timestamp": datetime.now().isoformat(),
                "status": "error",
                "error_message": str(e),
                "webhook_data": webhook_data
            }

    def extract_submission_data(self, webhook_data: Dict) -> Dict:
        """Extract and normalize submission data from GHL webhook"""

        # Common GHL webhook field mappings
        submission = {
            "name": webhook_data.get("contact", {}).get("name", "Unknown"),
            "email": webhook_data.get("contact", {}).get("email", ""),
            "phone": webhook_data.get("contact", {}).get("phone", ""),
            "message": webhook_data.get("message", ""),
            "form_name": webhook_data.get("form_name", ""),
            "timestamp": webhook_data.get("timestamp", datetime.now().isoformat()),
            "source": webhook_data.get("source", "forum"),
            "region": self.detect_region(webhook_data)
        }

        # Extract additional custom fields
        custom_fields = webhook_data.get("custom_fields", {})
        submission.update(custom_fields)

        return submission

    def detect_region(self, webhook_data: Dict) -> str:
        """Detect region from webhook data"""
        # Check URL, referrer, or explicit region field
        referrer = webhook_data.get("referrer", "").lower()
        location = webhook_data.get("location", "").lower()

        if any(term in referrer or term in location for term in ["virginia", "va", "fairfax", "arlington", "loudoun"]):
            return "virginia"
        elif any(term in referrer or term in location for term in ["maryland", "md", "montgomery", "anne-arundel", "prince-george"]):
            return "maryland"
        elif any(term in referrer or term in location for term in ["dc", "washington", "capitol-hill", "georgetown"]):
            return "dc"

        # Default to Virginia if unable to detect
        return "virginia"

    def determine_workflow(self, submission_data: Dict) -> str:
        """Determine which workflow to trigger based on submission content"""
        message_text = (submission_data.get("message", "") + " " +
                       submission_data.get("form_name", "")).lower()

        # Check for emergency keywords first (highest priority)
        for keyword in self.workflows["emergency_response"]["trigger_keywords"]:
            if keyword.lower() in message_text:
                return "emergency_response"

        # Check for health concerns (high priority)
        for keyword in self.workflows["health_concerns"]["trigger_keywords"]:
            if keyword.lower() in message_text:
                return "health_concerns"

        # Check for insurance disputes (urgent)
        for keyword in self.workflows["insurance_dispute"]["trigger_keywords"]:
            if keyword.lower() in message_text:
                return "insurance_dispute"

        # Check for technical assessments
        for keyword in self.workflows["technical_assessment"]["trigger_keywords"]:
            if keyword.lower() in message_text:
                return "technical_assessment"

        # Default to standard inquiry
        return "standard_inquiry"

    def assign_expert(self, workflow_type: str, region: str) -> str:
        """Assign appropriate expert based on workflow and region"""
        workflow = self.workflows[workflow_type]
        expert_type = workflow["expert_assignment"]

        # Verify expert is available in region
        regional_experts = self.regional_routing[region]["expert_pool"]

        if expert_type in regional_experts:
            return expert_type
        else:
            # Fallback to primary expert if specialized expert not available
            return "primary_expert"

    def generate_response(self, workflow_type: str, expert_type: str, submission_data: Dict) -> str:
        """Generate expert response based on workflow type"""
        region = submission_data["region"]

        if workflow_type == "emergency_response":
            return self.expert_generator.generate_emergency_response(
                region=region,
                expert_type=expert_type,
                scenario="emergency_submission"
            )
        elif workflow_type == "health_concerns":
            return self.expert_generator.generate_health_focused_response(
                health_concern="family_safety",
                expert_type=expert_type,
                region=region
            )
        elif workflow_type in ["insurance_dispute", "technical_assessment", "standard_inquiry"]:
            return self.expert_generator.generate_educational_response(
                topic="homeowner_rights",
                expert_type=expert_type,
                region=region
            )

        return ""

    def send_notifications(self, workflow_type: str, submission_data: Dict, response_content: str) -> Dict:
        """Send notifications based on workflow configuration"""
        workflow = self.workflows[workflow_type]
        channels = workflow["notification_channels"]
        region = submission_data["region"]

        notification_results = {}

        # SMS notifications for critical/urgent
        if "sms" in channels and submission_data.get("phone"):
            sms_result = self.send_sms_notification(workflow_type, submission_data)
            notification_results["sms"] = sms_result

        # Email notifications
        if "email" in channels and submission_data.get("email"):
            email_result = self.send_email_notification(workflow_type, submission_data, response_content)
            notification_results["email"] = email_result

        # Phone call triggers for critical situations
        if "phone" in channels and workflow["escalation_level"] == "critical":
            phone_result = self.trigger_phone_call(submission_data, region)
            notification_results["phone"] = phone_result

        # Forum response posting
        if "forum_response" in channels:
            forum_result = self.post_forum_response(response_content, submission_data)
            notification_results["forum"] = forum_result

        return notification_results

    def send_sms_notification(self, workflow_type: str, submission_data: Dict) -> Dict:
        """Send SMS notification via GHL"""
        sms_template = self.response_templates.get("immediate_sms", "")
        phone_number = submission_data.get("phone", "")

        sms_message = sms_template.format(phone_number=phone_number)

        # In production, this would use GHL SMS API
        # For now, return simulation result
        return {
            "status": "sent",
            "method": "ghl_sms",
            "phone": phone_number,
            "message": sms_message,
            "timestamp": datetime.now().isoformat()
        }

    def send_email_notification(self, workflow_type: str, submission_data: Dict, response_content: str) -> Dict:
        """Send email notification via GHL"""
        email_template = self.response_templates.get("emergency_email", "")
        email = submission_data.get("email", "")

        # In production, this would use GHL email API
        return {
            "status": "sent",
            "method": "ghl_email",
            "email": email,
            "subject": f"Emergency Restoration Response - {submission_data['name']}",
            "timestamp": datetime.now().isoformat()
        }

    def trigger_phone_call(self, submission_data: Dict, region: str) -> Dict:
        """Trigger emergency phone call"""
        regional_phone = self.regional_routing[region]["phone"]

        # In production, this would trigger actual phone call workflow
        return {
            "status": "triggered",
            "method": "emergency_call",
            "target_phone": submission_data.get("phone", ""),
            "response_team": regional_phone,
            "urgency": "critical",
            "timestamp": datetime.now().isoformat()
        }

    def post_forum_response(self, response_content: str, submission_data: Dict) -> Dict:
        """Post expert response to appropriate forum"""
        region = submission_data["region"]

        # Determine forum page based on region
        forum_mapping = {
            "virginia": "virginia-forum-content.html",
            "maryland": "maryland-forum-content.html",
            "dc": "dc-forum-content.html"
        }

        forum_page = forum_mapping.get(region, "restoration-forum.html")

        return {
            "status": "posted",
            "method": "forum_integration",
            "forum_page": forum_page,
            "response_length": len(response_content),
            "timestamp": datetime.now().isoformat()
        }

def main():
    """Test the webhook processor with sample data"""
    processor = GHLWebhookProcessor()

    # Test emergency submission
    emergency_webhook = {
        "contact": {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@email.com",
            "phone": "301-555-0123"
        },
        "message": "EMERGENCY! Basement flooding from burst pipe. Water everywhere and my kids are getting sick from the smell. Need immediate help!",
        "form_name": "Emergency Contact Form",
        "referrer": "https://independentrestoration.com/maryland-restoration.html",
        "timestamp": datetime.now().isoformat()
    }

    print("🚨 Processing Emergency Webhook:")
    print("=" * 50)
    result = processor.process_webhook(emergency_webhook)
    print(json.dumps(result, indent=2))

    # Test standard inquiry
    standard_webhook = {
        "contact": {
            "name": "Mike Williams",
            "email": "mike.w@email.com",
            "phone": "703-555-0456"
        },
        "message": "I have some water damage in my basement and my insurance company wants me to use their contractor. Can I choose my own restoration company?",
        "form_name": "Contact Form",
        "referrer": "https://independentrestoration.com/virginia-restoration.html",
        "timestamp": datetime.now().isoformat()
    }

    print("\\n📋 Processing Standard Inquiry:")
    print("=" * 50)
    result = processor.process_webhook(standard_webhook)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()