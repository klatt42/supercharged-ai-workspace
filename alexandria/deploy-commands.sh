#!/bin/bash

# 🚀 ALEXANDRIA LANDING PAGE DEPLOYMENT SCRIPT
# Run AFTER approval from stakeholders
# Virginia Validator - BMAD Optimized Landing Page

echo "🚀 ALEXANDRIA LANDING PAGE DEPLOYMENT"
echo "===================================="
echo "Task: Alexandria Emergency Restoration Landing Page"
echo "Assignee: Victoria Validator"
echo "Status: Ready for deployment after approval"
echo ""

# Deployment commands (run after approval)
echo "📋 DEPLOYMENT COMMANDS (run after approval):"
echo ""

echo "# 1. Navigate to main project directory"
echo "cd ~/Developer/projects/personal/supercharged-ai-workspace"
echo ""

echo "# 2. Copy Alexandria files to main project"
echo "cp -r ~/landing-pages/alexandria/ ./alexandria/"
echo ""

echo "# 3. Add Alexandria landing page to git"
echo "git add alexandria/"
echo ""

echo "# 4. Commit with BMAD optimization message"
echo 'git commit -m "Deploy Alexandria Emergency Restoration Landing Page - BMAD Optimized

✅ WCAG 2.1 Level AA compliance
✅ Mobile-first responsive design (375px)
✅ Authority psychology framework (partner-safe)
✅ Alexandria neighborhood targeting (Old Town, Del Ray, Rosemont, Potomac Yard)
✅ Emergency contact optimization (703-844-4204)
✅ Performance optimized with critical CSS

🎯 Victoria Validator task complete - ready for production

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"'
echo ""

echo "# 5. Push to GitHub for Netlify deployment"
echo "git push origin main"
echo ""

echo "# 6. Mark task complete in Archon"
echo 'python3 -c "
import requests
task_id = \"25efdd7d-c709-476f-a1e0-d052e990c73f\"
response = requests.put(f\"http://localhost:3737/api/tasks/{task_id}\", json={\"status\": \"done\"})
print(\"✅ Alexandria task marked complete!\" if response.status_code == 200 else \"❌ Failed to update task\")
"'
echo ""

echo "📍 DEPLOYMENT VERIFICATION:"
echo "  1. Check Netlify build status"
echo "  2. Verify Alexandria page at: https://[your-domain]/alexandria/"
echo "  3. Test mobile responsiveness on live site"
echo "  4. Validate emergency contact links"
echo "  5. Confirm local targeting displays correctly"

echo ""
echo "🎯 Alexandria deployment ready - awaiting approval!"

# Make this script executable when copied
chmod +x deploy-commands.sh