#!/usr/bin/env python3
"""
Archon Task Status Updater
Update task status for Independent Restoration Expansion project
"""

import requests
import json

# Archon configuration
ARCHON_BASE_URL = "http://localhost:3737"
PROJECT_ID = "26175bcd-62db-4f31-8e15-d129a86ed7b7"

def get_project_tasks():
    """Get all tasks for the project"""
    try:
        response = requests.get(f"{ARCHON_BASE_URL}/api/projects/{PROJECT_ID}/tasks")
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Failed to get tasks: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Error getting tasks: {e}")
        return []

def update_task_status(task_id, status):
    """Update task status (todo/doing/review/done)"""
    try:
        response = requests.put(
            f"{ARCHON_BASE_URL}/api/tasks/{task_id}",
            json={"status": status}
        )
        if response.status_code in [200, 204]:
            print(f"✅ Task {task_id} status updated to '{status}'")
            return True
        else:
            print(f"❌ Failed to update task: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error updating task: {e}")
        return False

def list_tasks():
    """List all tasks with their IDs and current status"""
    tasks = get_project_tasks()
    if not tasks:
        print("📝 No tasks found. You may need to create tasks first.")
        return

    print("📋 Current tasks:")
    for task in tasks:
        print(f"   ID: {task.get('id', 'N/A')}")
        print(f"   Title: {task.get('title', 'N/A')}")
        print(f"   Status: {task.get('status', 'N/A')}")
        print(f"   Assignee: {task.get('assignee', 'N/A')}")
        print("   ---")

if __name__ == "__main__":
    print("🔍 Independent Restoration Expansion - Task Status Manager")
    print("=" * 60)

    # List current tasks
    list_tasks()

    print("\n💡 Usage examples:")
    print("# Start working on a task:")
    print("python3 update-task-status.py [TASK_ID] doing")
    print("\n# Mark for review:")
    print("python3 update-task-status.py [TASK_ID] review")
    print("\n# Complete task:")
    print("python3 update-task-status.py [TASK_ID] done")

    # If command line arguments provided, update task
    import sys
    if len(sys.argv) == 3:
        task_id = sys.argv[1]
        new_status = sys.argv[2]
        update_task_status(task_id, new_status)