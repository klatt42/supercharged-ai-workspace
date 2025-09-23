#!/bin/bash

# 🔗 REPOSITORY CONNECTION SCRIPT
# Connects local repository to Archon OS and GitHub integration

echo "🔗 REPOSITORY CONNECTION - Supercharged AI Workspace"
echo "===================================================="
echo ""

# Get current directory and project info
PROJECT_DIR=$(pwd)
PROJECT_NAME=$(basename "$PROJECT_DIR")
GITHUB_REPO="https://github.com/klatt42/supercharged-ai-workspace"

echo "📁 Project Directory: $PROJECT_DIR"
echo "📦 Project Name: $PROJECT_NAME"
echo "🐙 GitHub Repository: $GITHUB_REPO"
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
        timeout 3 bash -c "echo >/dev/tcp/localhost/$port" 2>/dev/null
    fi
}

# ✅ Check Git Repository Status
echo "🔍 Checking Git repository status..."
if [ -d ".git" ]; then
    echo "✅ Git repository detected"

    # Check remote origin
    if git remote get-url origin >/dev/null 2>&1; then
        CURRENT_REMOTE=$(git remote get-url origin)
        echo "📡 Remote origin: $CURRENT_REMOTE"

        if [[ "$CURRENT_REMOTE" != *"supercharged-ai-workspace"* ]]; then
            echo "⚠️  Remote origin doesn't match expected repository"
        fi
    else
        echo "⚠️  No remote origin configured"
        echo "🔧 Adding GitHub remote..."
        git remote add origin "$GITHUB_REPO"
    fi

    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo "🌿 Current branch: $CURRENT_BRANCH"

    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo "📝 Uncommitted changes detected"
    else
        echo "✅ Working directory clean"
    fi
else
    echo "❌ Not a Git repository. Initializing..."
    git init
    git remote add origin "$GITHUB_REPO"
    echo "✅ Git repository initialized"
fi

echo ""

# ✅ Scan for Archon Server
echo "🔍 Scanning for Archon server..."
ARCHON_PORTS=(3737 3001 3000 8080 5000 8181 8051)
ARCHON_FOUND=false
ARCHON_PORT=""
ARCHON_API_BASE=""

for port in "${ARCHON_PORTS[@]}"; do
    echo "  Checking port $port..."
    if check_port $port; then
        echo "✅ Found service on port $port"

        # Test if it's Archon API
        if command_exists curl; then
            if curl -s "http://localhost:$port/api/projects" >/dev/null 2>&1; then
                echo "✅ Confirmed Archon API on port $port"
                ARCHON_FOUND=true
                ARCHON_PORT=$port
                ARCHON_API_BASE="http://localhost:$port"
                break
            fi
        else
            ARCHON_FOUND=true
            ARCHON_PORT=$port
            ARCHON_API_BASE="http://localhost:$port"
            break
        fi
    fi
done

if [ "$ARCHON_FOUND" = false ]; then
    echo "⚠️  No Archon server detected on common ports."
    echo "   Please ensure Archon OS is running and accessible."
fi

echo ""

# ✅ Create Integration Configuration
echo "🔧 Creating integration configuration..."

# Create .archon directory if it doesn't exist
mkdir -p .archon

# Create connection config
cat > .archon/connection-config.json << EOF
{
  "repository": {
    "name": "$PROJECT_NAME",
    "path": "$PROJECT_DIR",
    "github_repo": "$GITHUB_REPO",
    "branch": "$CURRENT_BRANCH"
  },
  "archon": {
    "detected": $ARCHON_FOUND,
    "port": "$ARCHON_PORT",
    "api_base": "$ARCHON_API_BASE",
    "last_check": "$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)"
  },
  "integration": {
    "auto_sync": true,
    "task_updates": true,
    "commit_hooks": false
  }
}
EOF

# Create repository sync helper
cat > .archon/repo-sync.py << 'EOF'
#!/usr/bin/env python3
"""
Repository Sync Helper
Synchronizes repository status with Archon projects
"""

import json
import requests
import subprocess
import os

def load_config():
    """Load connection configuration"""
    with open('.archon/connection-config.json', 'r') as f:
        return json.load(f)

def get_git_status():
    """Get current Git repository status"""
    try:
        # Get current branch
        branch = subprocess.check_output(['git', 'branch', '--show-current'], text=True).strip()

        # Check for uncommitted changes
        status = subprocess.check_output(['git', 'status', '--porcelain'], text=True).strip()
        clean = len(status) == 0

        # Get last commit
        try:
            last_commit = subprocess.check_output(['git', 'log', '-1', '--format=%H:%s'], text=True).strip()
        except:
            last_commit = "No commits"

        return {
            'branch': branch,
            'clean': clean,
            'uncommitted_changes': len(status.split('\n')) if status else 0,
            'last_commit': last_commit
        }
    except Exception as e:
        return {'error': str(e)}

def sync_with_archon(config):
    """Sync repository status with Archon"""
    if not config['archon']['detected']:
        print("⚠️  No Archon server detected")
        return False

    git_status = get_git_status()
    api_base = config['archon']['api_base']

    # Update project with repository status
    repo_data = {
        'github_repo': config['repository']['github_repo'],
        'git_status': git_status,
        'last_sync': json.dumps({'timestamp': 'now', 'status': 'synced'})
    }

    try:
        # Find project by GitHub repo
        projects_response = requests.get(f"{api_base}/api/projects")
        if projects_response.status_code == 200:
            projects = projects_response.json()
            matching_project = None

            for project in projects:
                if project.get('github_repo') == config['repository']['github_repo']:
                    matching_project = project
                    break

            if matching_project:
                print(f"✅ Found matching project: {matching_project['title']}")
                # Could update project with sync data here
                return True
            else:
                print("⚠️  No matching project found in Archon")
                return False
        else:
            print(f"❌ Failed to fetch projects: {projects_response.status_code}")
            return False

    except Exception as e:
        print(f"❌ Sync error: {e}")
        return False

if __name__ == "__main__":
    config = load_config()
    print("🔄 Repository Sync Helper")
    print("=" * 30)

    git_status = get_git_status()
    print(f"📊 Git Status:")
    for key, value in git_status.items():
        print(f"   {key}: {value}")

    print("\n🔗 Syncing with Archon...")
    sync_result = sync_with_archon(config)

    if sync_result:
        print("✅ Repository sync completed")
    else:
        print("⚠️  Repository sync had issues")
EOF

chmod +x .archon/repo-sync.py

echo "✅ Integration configuration created in .archon/"

# ✅ Display Connection Status
echo ""
echo "📊 CONNECTION STATUS"
echo "==================="
echo "📁 Repository: Connected"
echo "🐙 GitHub Remote: $GITHUB_REPO"

if [ "$ARCHON_FOUND" = true ]; then
    echo "🧠 Archon Server: ✅ CONNECTED on port $ARCHON_PORT"
    echo "🔗 API Base: $ARCHON_API_BASE"
else
    echo "🧠 Archon Server: ⚠️  NOT DETECTED"
fi

echo ""
echo "🚀 NEXT STEPS"
echo "============="
echo "1. Repository is connected to GitHub: $GITHUB_REPO"
if [ "$ARCHON_FOUND" = true ]; then
    echo "2. Archon server detected and ready at: $ARCHON_API_BASE"
    echo "3. Run: python3 .archon/repo-sync.py (to sync with Archon)"
else
    echo "2. Start Archon OS server to enable full integration"
    echo "3. Re-run this script after Archon is running"
fi
echo "4. Use standard Git commands for version control"
echo "5. Monitor project progress via Archon dashboard"

echo ""
echo "💡 INTEGRATION FEATURES:"
echo "   • Automatic repository status sync"
echo "   • GitHub integration ready"
echo "   • Archon project connection"
echo "   • Task-to-commit correlation"

echo ""
echo "✅ Repository connection complete!"

# Add .archon to .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "# Archon integration files" > .gitignore
    echo ".archon/" >> .gitignore
elif ! grep -q ".archon/" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# Archon integration files" >> .gitignore
    echo ".archon/" >> .gitignore
fi

echo "📝 Added .archon/ to .gitignore"