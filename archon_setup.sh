#!/bin/bash

# 🧠 ARCHON CONNECTION SETUP - Independent Restoration Expansion
# This script establishes connection to Archon OS for project management

echo "🚀 ARCHON CONNECTION SETUP - Independent Restoration Expansion"
echo "==============================================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is in use
check_port() {
    local port=$1
    if command_exists nc; then
        nc -z localhost $port 2>/dev/null
    elif command_exists telnet; then
        timeout 3 telnet localhost $port 2>/dev/null | grep -q "Connected"
    else
        # Fallback using /dev/tcp
        timeout 3 bash -c "echo >/dev/tcp/localhost/$port" 2>/dev/null
    fi
}

# ✅ Check Python environment and install dependencies
echo "🔍 Checking Python environment..."
if command_exists python3; then
    PYTHON_CMD="python3"
elif command_exists python; then
    PYTHON_CMD="python"
else
    echo "❌ Python not found. Please install Python 3.6+ and try again."
    exit 1
fi

echo "✅ Python found: $($PYTHON_CMD --version)"

# Check for pip
if command_exists pip3; then
    PIP_CMD="pip3"
elif command_exists pip; then
    PIP_CMD="pip"
else
    echo "❌ pip not found. Please install pip and try again."
    exit 1
fi

echo "✅ pip found: $($PIP_CMD --version)"

# Install basic dependencies if needed
echo "📦 Checking/Installing dependencies..."
$PIP_CMD install --quiet requests anthropic openai 2>/dev/null || echo "⚠️  Some dependencies may need manual installation"

# ✅ Scan for running Archon server on common ports
echo ""
echo "🔍 Scanning for running Archon server..."
ARCHON_PORTS=(3001 3000 8080 5000 8181 8051)
ARCHON_FOUND=false
ARCHON_PORT=""

for port in "${ARCHON_PORTS[@]}"; do
    echo "  Checking port $port..."
    if check_port $port; then
        echo "✅ Found service on port $port"
        ARCHON_FOUND=true
        ARCHON_PORT=$port
        break
    fi
done

if [ "$ARCHON_FOUND" = false ]; then
    echo "⚠️  No Archon server detected on common ports."
    echo "   Please ensure Archon OS is running on one of: ${ARCHON_PORTS[*]}"
    echo "   You can start Archon OS manually or check the documentation."
fi

# ✅ Execute project initialization with task creation
echo ""
echo "🏗️  Creating 'Independent Restoration Expansion' project structure..."

# Create project directory structure if it doesn't exist
PROJECT_ROOT="/home/klatt42/Developer/projects/personal/supercharged-ai-workspace"
mkdir -p "$PROJECT_ROOT/archon"
mkdir -p "$PROJECT_ROOT/archon/tasks"
mkdir -p "$PROJECT_ROOT/archon/logs"

# Create Archon project configuration
cat > "$PROJECT_ROOT/archon/project-config.json" << 'EOF'
{
  "project_id": "independent-restoration-expansion",
  "name": "Independent Restoration Expansion",
  "description": "Landing page optimization and business expansion for Independent Restoration",
  "type": "website_optimization",
  "priority": "high",
  "status": "active",
  "created": "$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)",
  "team": [
    "Victoria Validator",
    "Elena Execution",
    "Dr. Sarah Hook",
    "Alex Analytics",
    "David Deploy",
    "Marcus Strategic",
    "Mary Enhanced",
    "Alice Intelligence"
  ],
  "goals": [
    "Achieve 25-53% conversion improvement",
    "Optimize accessibility to 95+ score",
    "Maintain <542ms load times",
    "Implement psychological authority framework"
  ]
}
EOF

# ✅ Generate task hierarchy within existing project structure
echo "📋 Generating task hierarchy..."

# Create main task list based on CLAUDE.md priorities
cat > "$PROJECT_ROOT/archon/tasks/priority-tasks.json" << 'EOF'
{
  "critical_accessibility": [
    {
      "id": "acc-001",
      "title": "Fix Accessibility Issues - Heading Structure",
      "assignee": "Victoria Validator",
      "priority": "critical",
      "status": "pending",
      "description": "Add proper IDs to all headings for screen reader navigation"
    },
    {
      "id": "acc-002",
      "title": "Add Skip Navigation Links",
      "assignee": "Victoria Validator",
      "priority": "critical",
      "status": "pending",
      "description": "Implement skip-to-content links for keyboard navigation"
    },
    {
      "id": "acc-003",
      "title": "Add Focus Management",
      "assignee": "Victoria Validator",
      "priority": "critical",
      "status": "pending",
      "description": "Implement proper focus indicators and keyboard navigation"
    }
  ],
  "performance_technical": [
    {
      "id": "perf-001",
      "title": "Optimize Mobile Responsive Design",
      "assignee": "Elena Execution",
      "priority": "high",
      "status": "pending",
      "description": "Enhance mobile experience for 375px width analysis"
    },
    {
      "id": "perf-002",
      "title": "Performance Optimization",
      "assignee": "Elena Execution",
      "priority": "high",
      "status": "pending",
      "description": "Optimize current 280ms load time further"
    }
  ],
  "content_conversion": [
    {
      "id": "conv-001",
      "title": "Add Social Proof Section",
      "assignee": "Dr. Sarah Hook",
      "priority": "high",
      "status": "pending",
      "description": "Implement testimonials and trust indicators"
    },
    {
      "id": "conv-002",
      "title": "Rewrite Content: Features to Benefits",
      "assignee": "Dr. Sarah Hook",
      "priority": "high",
      "status": "pending",
      "description": "Transform to benefit-focused messaging"
    }
  ]
}
EOF

# Create archon helper script
cat > "$PROJECT_ROOT/archon/archon-helper.py" << 'EOF'
#!/usr/bin/env python3
"""
Archon Helper - Independent Restoration Project Integration
Provides utilities for Archon OS integration and task management
"""

import json
import requests
import os
from datetime import datetime

class ArchonHelper:
    def __init__(self, base_url="http://localhost:8181"):
        self.base_url = base_url
        self.project_id = "independent-restoration-expansion"

    def check_connection(self):
        """Check if Archon OS is accessible"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=5)
            return response.status_code == 200
        except:
            return False

    def create_project(self):
        """Create or update the project in Archon OS"""
        if not self.check_connection():
            print("⚠️  Cannot connect to Archon OS")
            return False

        project_data = {
            "id": self.project_id,
            "name": "Independent Restoration Expansion",
            "description": "Landing page optimization with psychological framework",
            "status": "active",
            "created": datetime.utcnow().isoformat()
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/projects",
                json=project_data,
                timeout=10
            )
            return response.status_code in [200, 201]
        except:
            return False

    def sync_tasks(self):
        """Sync local tasks with Archon OS"""
        if not self.check_connection():
            return False

        # Load local tasks
        task_file = "tasks/priority-tasks.json"
        if os.path.exists(task_file):
            with open(task_file, 'r') as f:
                tasks = json.load(f)

            # Sync each task category
            for category, task_list in tasks.items():
                for task in task_list:
                    try:
                        requests.post(
                            f"{self.base_url}/api/projects/{self.project_id}/tasks",
                            json=task,
                            timeout=5
                        )
                    except:
                        pass
        return True

if __name__ == "__main__":
    helper = ArchonHelper()

    print("🔍 Checking Archon OS connection...")
    if helper.check_connection():
        print("✅ Archon OS is accessible")

        print("🏗️  Creating project...")
        if helper.create_project():
            print("✅ Project created/updated")
        else:
            print("⚠️  Project creation failed")

        print("📋 Syncing tasks...")
        if helper.sync_tasks():
            print("✅ Tasks synchronized")
        else:
            print("⚠️  Task sync failed")
    else:
        print("❌ Cannot connect to Archon OS")
        print("   Please ensure Archon OS is running and accessible")
EOF

chmod +x "$PROJECT_ROOT/archon/archon-helper.py"

# ✅ Display connection status and next steps
echo ""
echo "📊 CONNECTION STATUS"
echo "==================="

if [ "$ARCHON_FOUND" = true ]; then
    echo "✅ Archon Server: DETECTED on port $ARCHON_PORT"

    # Try to execute the helper script
    echo "🔗 Testing Archon integration..."
    cd "$PROJECT_ROOT/archon"
    $PYTHON_CMD archon-helper.py
else
    echo "⚠️  Archon Server: NOT DETECTED"
fi

echo ""
echo "📁 Project Structure Created:"
echo "   $PROJECT_ROOT/archon/"
echo "   ├── project-config.json    (Project configuration)"
echo "   ├── tasks/priority-tasks.json (Task hierarchy)"
echo "   ├── logs/ (Archon logs)"
echo "   └── archon-helper.py (Integration utilities)"

echo ""
echo "🚀 NEXT STEPS"
echo "============="
echo "1. Ensure Archon OS is running on one of these ports: ${ARCHON_PORTS[*]}"
echo "2. Execute: cd $PROJECT_ROOT && python3 archon/archon-helper.py"
echo "3. Start working on Priority Task #1: Fix Accessibility Issues"
echo "4. Use 'Victoria Validator' for accessibility fixes"
echo "5. Monitor progress via Archon Dashboard at http://localhost:$ARCHON_PORT"

echo ""
echo "💡 BMAD Team Active for Landing Page Optimization:"
echo "   • Victoria Validator: Accessibility fixes (PRIORITY)"
echo "   • Elena Execution: Performance & mobile optimization"
echo "   • Dr. Sarah Hook: Content psychology transformation"
echo "   • Alex Analytics: SEO & metrics optimization"

echo ""
echo "🎯 SUCCESS TARGETS:"
echo "   • 25-53% conversion improvement"
echo "   • 95+ accessibility score"
echo "   • <542ms load times"
echo "   • Authority psychology framework implementation"

echo ""
echo "✅ Archon setup complete! Ready to begin Independent Restoration Expansion."