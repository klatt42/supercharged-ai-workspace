#!/usr/bin/env python3
"""
Flask Webhook Server for GHL Integration
Receives GoHighLevel webhooks and processes them for expert response automation
"""

from flask import Flask, request, jsonify
import json
import logging
from datetime import datetime
import os
import sys

# Add webhook processor to path
sys.path.append(os.path.dirname(__file__))
from webhook_processor import GHLWebhookProcessor

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('ghl-webhook.log'),
        logging.StreamHandler()
    ]
)

app = Flask(__name__)
processor = GHLWebhookProcessor()

@app.route('/webhook/forum-submission', methods=['POST'])
def handle_forum_submission():
    """Handle forum submission webhooks from GHL"""
    try:
        webhook_data = request.get_json()

        # Log incoming webhook
        logging.info(f"Forum submission webhook received: {webhook_data.get('contact', {}).get('name', 'Unknown')}")

        # Process with expert response system
        result = processor.process_webhook(webhook_data)

        # Log processing result
        logging.info(f"Processed forum submission: {result['status']} - {result.get('workflow_type', 'unknown')}")

        return jsonify({
            "status": "success",
            "processing_result": result,
            "timestamp": datetime.now().isoformat()
        }), 200

    except Exception as e:
        logging.error(f"Error processing forum submission: {str(e)}")
        return jsonify({
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/webhook/emergency-contact', methods=['POST'])
def handle_emergency_contact():
    """Handle emergency contact webhooks with immediate response"""
    try:
        webhook_data = request.get_json()

        # Log emergency submission
        logging.critical(f"EMERGENCY submission received: {webhook_data.get('contact', {}).get('name', 'Unknown')}")

        # Force emergency workflow
        webhook_data['force_emergency'] = True

        # Process with highest priority
        result = processor.process_webhook(webhook_data)

        # Additional emergency logging
        if result.get('workflow_type') == 'emergency_response':
            logging.critical(f"Emergency response activated: {result}")

        return jsonify({
            "status": "emergency_processed",
            "processing_result": result,
            "response_time": "immediate",
            "timestamp": datetime.now().isoformat()
        }), 200

    except Exception as e:
        logging.critical(f"CRITICAL ERROR in emergency processing: {str(e)}")
        return jsonify({
            "status": "emergency_error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/webhook/consultation-request', methods=['POST'])
def handle_consultation_request():
    """Handle consultation request webhooks"""
    try:
        webhook_data = request.get_json()

        # Log consultation request
        logging.info(f"Consultation request received: {webhook_data.get('contact', {}).get('name', 'Unknown')}")

        # Process with consultation workflow
        result = processor.process_webhook(webhook_data)

        return jsonify({
            "status": "consultation_scheduled",
            "processing_result": result,
            "timestamp": datetime.now().isoformat()
        }), 200

    except Exception as e:
        logging.error(f"Error processing consultation request: {str(e)}")
        return jsonify({
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/webhook/test', methods=['POST', 'GET'])
def test_webhook():
    """Test endpoint for webhook validation"""
    if request.method == 'POST':
        webhook_data = request.get_json()
        logging.info(f"Test webhook received: {webhook_data}")

        # Generate test response
        test_result = {
            "webhook_received": True,
            "data_keys": list(webhook_data.keys()) if webhook_data else [],
            "processor_status": "active",
            "expert_system": "operational",
            "timestamp": datetime.now().isoformat()
        }

        return jsonify(test_result), 200
    else:
        return jsonify({
            "status": "GHL Webhook Server Active",
            "endpoints": [
                "/webhook/forum-submission",
                "/webhook/emergency-contact",
                "/webhook/consultation-request",
                "/webhook/test"
            ],
            "expert_system": "operational",
            "timestamp": datetime.now().isoformat()
        }), 200

@app.route('/webhook/status', methods=['GET'])
def webhook_status():
    """Status endpoint for monitoring"""
    try:
        # Test processor functionality
        test_data = {
            "contact": {"name": "System Test", "email": "test@test.com"},
            "message": "System status check",
            "referrer": "https://test.com/virginia-test.html"
        }

        test_result = processor.process_webhook(test_data)

        return jsonify({
            "server_status": "operational",
            "processor_status": "functional" if test_result.get("status") == "processed" else "error",
            "expert_system": "active",
            "workflows_configured": len(processor.workflows),
            "regional_routing": list(processor.regional_routing.keys()),
            "last_check": datetime.now().isoformat()
        }), 200

    except Exception as e:
        return jsonify({
            "server_status": "operational",
            "processor_status": "error",
            "error": str(e),
            "last_check": datetime.now().isoformat()
        }), 500

@app.route('/webhook/logs', methods=['GET'])
def view_logs():
    """View recent webhook processing logs"""
    try:
        # Read last 50 lines of log file
        log_lines = []
        if os.path.exists('ghl-webhook.log'):
            with open('ghl-webhook.log', 'r') as f:
                log_lines = f.readlines()[-50:]

        return jsonify({
            "recent_logs": [line.strip() for line in log_lines],
            "log_count": len(log_lines),
            "timestamp": datetime.now().isoformat()
        }), 200

    except Exception as e:
        return jsonify({
            "error": f"Unable to read logs: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    print("🚀 Starting GHL Webhook Server for Expert Response Automation")
    print("=" * 60)
    print("📋 Available Endpoints:")
    print("   • POST /webhook/forum-submission      - Forum submissions")
    print("   • POST /webhook/emergency-contact     - Emergency responses")
    print("   • POST /webhook/consultation-request  - Consultation scheduling")
    print("   • GET  /webhook/status               - System status")
    print("   • GET  /webhook/logs                 - View processing logs")
    print("   • POST/GET /webhook/test             - Test endpoint")
    print("=" * 60)

    # Run server
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )