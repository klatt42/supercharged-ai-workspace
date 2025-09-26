#!/usr/bin/env python3
"""
Create tasks in Archon for major accomplishments
"""

import requests
import json

# Archon configuration
ARCHON_BASE_URL = "http://localhost:3737"
PROJECT_ID = "26175bcd-62db-4f31-8e15-d129a86ed7b7"

def create_task(title, description, assignee="Claude Code", status="done"):
    """Create a new task in Archon"""
    try:
        response = requests.post(
            f"{ARCHON_BASE_URL}/api/projects/{PROJECT_ID}/tasks",
            json={
                "title": title,
                "description": description,
                "status": status,
                "assignee": assignee
            }
        )
        if response.status_code in [200, 201]:
            print(f"✅ Task created: {title}")
            return True
        else:
            print(f"❌ Failed to create task '{title}': {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error creating task '{title}': {e}")
        return False

# Major accomplishments to add
accomplishments = [
    {
        "title": "Forum System Implementation",
        "description": "Created comprehensive forum system with 4 forum pages (restoration-forum.html, virginia-forum-content.html, maryland-forum-content.html, dc-forum-content.html) with Authority Reversal Framework integration",
        "assignee": "Claude Code"
    },
    {
        "title": "Tri-State Home Page Transformation",
        "description": "Transformed index.html from NOVA-centric to flagship tri-state representation with comprehensive strategic navigation hub, equal regional representation, impactful hero section, and complete site architecture showcase",
        "assignee": "Claude Code"
    },
    {
        "title": "All County Restoration Pages Forum Integration",
        "description": "Successfully completed forum integration on all 15 county restoration pages (VA: Arlington, Fairfax, Loudoun, Prince William + MD: Montgomery, Anne Arundel, Prince George's, Charles, Carroll, Frederick, Howard, Calvert, St. Mary's, Washington) with Authority Reversal Framework testimonials",
        "assignee": "Claude Code"
    },
    {
        "title": "Maryland County Standardization",
        "description": "Fixed all Maryland county footer styling inconsistencies - standardized all 10 Maryland counties with consistent green footer background (#16a34a), yellow headers (#ffed4e), and unified layout structure",
        "assignee": "Claude Code"
    },
    {
        "title": "Forum Content Creation - Maryland Expansion",
        "description": "Added Carroll County and Calvert County conversations to Maryland forum with comprehensive insurance dispute and emergency response discussions featuring family safety priority and Authority Reversal Framework psychology",
        "assignee": "Claude Code"
    },
    {
        "title": "Regional Navigation Consistency",
        "description": "Updated tri-state navigation across all pages to show comprehensive county coverage and fixed DC neighborhoods to include all 7 areas with pages (Capitol Hill, Georgetown, Dupont Circle, Adams Morgan, Foggy Bottom, Logan Circle, Shaw U Street)",
        "assignee": "Claude Code"
    },
    {
        "title": "Authority Reversal Framework Site-wide Integration",
        "description": "Implemented Authority Reversal Framework psychology across forums, county pages, and home page with funeral director/heart surgeon analogy and customer-focused messaging replacing internal terminology",
        "assignee": "Claude Code"
    },
    {
        "title": "Footer and Navigation Fixes",
        "description": "Fixed Virginia page footer Emergency Services links, added consistent footer to DC restoration page, fixed Strategic Navigation Hub alignment inconsistencies, and corrected phone number errors across all regions",
        "assignee": "Claude Code"
    }
]

if __name__ == "__main__":
    print("🚀 Creating Archon Tasks for Major Accomplishments")
    print("=" * 60)

    created_count = 0
    for task in accomplishments:
        if create_task(**task):
            created_count += 1

    print(f"\n📊 Summary: {created_count}/{len(accomplishments)} tasks created successfully")
    print("🎯 All major accomplishments have been documented in Archon!")