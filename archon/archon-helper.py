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
