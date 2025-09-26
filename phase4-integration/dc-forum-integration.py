#!/usr/bin/env python3
"""
Washington DC Specialized Pages Forum Integration Automation
Adds Community Knowledge Hub sections to all DC service pages with historic district expertise
"""

import os
import re
from typing import Dict, List

class DCForumIntegrator:
    def __init__(self, workspace_path: str):
        self.workspace_path = workspace_path
        self.dc_pages = {
            "water_damage": [
                "dc-water-damage.html",
                "adams-morgan-water-damage.html",
                "capitol-hill-water-damage.html",
                "dupont-circle-water-damage.html",
                "foggy-bottom-water-damage.html",
                "georgetown-water-damage.html"
            ],
            "fire_damage": [
                "dc-fire-damage.html",
                "adams-morgan-fire-restoration.html",
                "capitol-hill-fire-restoration.html",
                "dupont-circle-fire-restoration.html",
                "foggy-bottom-fire-restoration.html",
                "georgetown-fire-restoration.html"
            ],
            "mold_remediation": [
                "dc-mold-remediation.html",
                "adams-morgan-mold-removal.html",
                "capitol-hill-mold-removal.html",
                "dupont-circle-mold-removal.html",
                "foggy-bottom-mold-removal.html",
                "georgetown-mold-removal.html"
            ],
            "storm_damage": [
                "dc-storm-damage.html",
                "adams-morgan-storm-damage.html",
                "capitol-hill-storm-damage.html",
                "dupont-circle-storm-damage.html",
                "foggy-bottom-storm-damage.html",
                "georgetown-storm-damage.html"
            ],
            "neighborhood_services": [
                "adams-morgan-services.html",
                "capitol-hill-restoration.html",
                "georgetown-restoration.html",
                "logan-circle-services.html",
                "shaw-u-street-services.html"
            ],
            "emergency_services": [
                "dupont-circle-emergency.html",
                "foggy-bottom-emergency.html"
            ],
            "faq_pages": [
                "dc-water-damage-faq.html"
            ],
            "blog_posts": [
                "dc-water-damage-blog-post-1.html",
                "dc-water-damage-blog-post-2.html",
                "dc-water-damage-blog-post-3.html"
            ]
        }

    def get_service_template(self, service_type: str, page_name: str) -> str:
        """Get the appropriate forum template based on service type with DC historic district focus"""

        # Determine specific service context
        neighborhood = self.extract_neighborhood(page_name)
        service_display = service_type.replace('_', ' ').title()

        if service_type == "water_damage":
            icon = "💧"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Historic preservation:</strong> Specialized techniques for federal district properties</li>",
                "<li><strong>DC regulations:</strong> Compliance with local historic preservation requirements</li>",
                "<li><strong>Federal area:</strong> Understanding unique insurance considerations for DC properties</li>",
                "<li><strong>Contractor authority:</strong> DC residents choose their restoration professionals</li>"
            ]
            story = f'"Historic {neighborhood} townhouse required specialized restoration techniques. Independent Restoration\'s federal district expertise and preservation compliance saved our historic property value while ensuring complete water damage remediation."'
            story_attribution = f"- {neighborhood} Homeowner"
            framework = '"Historic district water damage requires specialized expertise - not generic insurance contractor approaches. Professional preservation techniques protect property value."'

        elif service_type == "fire_damage":
            icon = "🔥"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Historic compliance:</strong> Fire restoration in federal district buildings requires specialized permits</li>",
                "<li><strong>Preservation standards:</strong> Material compatibility with historic architecture requirements</li>",
                "<li><strong>Federal regulations:</strong> DC historic preservation office coordination for fire repairs</li>",
                "<li><strong>Insurance advocacy:</strong> Historic property fire damage documentation for full coverage</li>"
            ]
            story = f'"Fire damage in our historic {neighborhood} property required federal preservation compliance. Independent Restoration\'s specialized expertise in historic district regulations secured complete restoration with full insurance coverage."'
            story_attribution = f"- {neighborhood} Historic Property Owner"
            framework = '"Historic district fire restoration requires specialized federal compliance - not generic contractor approaches. Professional expertise protects historic value."'

        elif service_type == "mold_remediation":
            icon = "🦠"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Historic ventilation:</strong> Specialized mold remediation for older federal district buildings</li>",
                "<li><strong>Preservation materials:</strong> Mold treatment compatible with historic building materials</li>",
                "<li><strong>Federal standards:</strong> DC historic preservation requirements for mold remediation</li>",
                "<li><strong>Air quality authority:</strong> Professional testing for federal district property safety</li>"
            ]
            story = f'"Mold issues in our {neighborhood} historic property required specialized remediation techniques. Independent Restoration\'s federal district expertise and preservation-compliant methods restored safe air quality while protecting historic integrity."'
            story_attribution = f"- {neighborhood} Resident"
            framework = '"Historic district mold remediation requires specialized preservation techniques - professional expertise protects both health and historic property value."'

        elif service_type == "storm_damage":
            icon = "⛈️"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Emergency response:</strong> Professional storm damage assessment within hours</li>",
                "<li><strong>Historic compliance:</strong> Federal district buildings require specialized evaluation</li>",
                "<li><strong>Preservation requirements:</strong> DC historic preservation office coordination for storm repairs</li>",
                "<li><strong>Insurance advocacy:</strong> Comprehensive storm damage documentation for full coverage</li>"
            ]
            story = f'"Storm damage to our {neighborhood} historic property was more complex than visible damage. Independent Restoration\'s federal district expertise and preservation compliance secured complete restoration with full insurance coverage."'
            story_attribution = f"- {neighborhood} Property Owner"
            framework = '"Storm damage emergencies follow 911 protocols - immediate professional response, not insurance scheduling delays. Historic compliance expertise protects property value."'

        elif service_type == "neighborhood_services":
            icon = "🏛️"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Neighborhood expertise:</strong> Specialized knowledge of {neighborhood} historic district requirements</li>",
                "<li><strong>Federal compliance:</strong> Understanding DC historic preservation regulations</li>",
                "<li><strong>Community authority:</strong> Local restoration expertise for federal district properties</li>",
                "<li><strong>Property protection:</strong> Preserving historic value through professional restoration</li>"
            ]
            story = f'"Our {neighborhood} restoration project required specialized federal district expertise. Independent Restoration\'s knowledge of local regulations and historic preservation requirements delivered exceptional results."'
            story_attribution = f"- {neighborhood} Community Member"
            framework = '"Federal district restoration requires specialized community expertise - not generic contractor approaches. Professional knowledge protects historic neighborhood character."'

        elif service_type == "emergency_services":
            icon = "🚨"
            color = "#dc2626"
            secondary_color = "#991b1b"
            bg_gradient = "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
            border_color = "#fecaca"
            insights = [
                "<li><strong>Emergency response:</strong> 24/7 availability for federal district restoration emergencies</li>",
                "<li><strong>Historic priority:</strong> Immediate protection of historic district properties</li>",
                "<li><strong>Professional expertise:</strong> IICRC certified technicians with DC preservation knowledge</li>",
                "<li><strong>Insurance advocacy:</strong> Emergency documentation protects historic property coverage</li>"
            ]
            story = f'"During our emergency in {neighborhood}, Independent Restoration responded immediately with federal district expertise. Their professional team protected our historic property while handling all insurance requirements."'
            story_attribution = f"- {neighborhood} Emergency Response"
            framework = '"Historic district emergencies require immediate professional response - property preservation cannot wait for insurance company approval or scheduling convenience."'

        elif service_type in ["faq_pages", "blog_posts"]:
            icon = "💬" if service_type == "blog_posts" else "❓"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Federal district knowledge:</strong> Understanding DC restoration requirements and regulations</li>",
                "<li><strong>Historic preservation:</strong> Protecting property value through compliant restoration</li>",
                "<li><strong>DC homeowner rights:</strong> Legal protection and contractor choice authority</li>",
                "<li><strong>Emergency preparedness:</strong> What federal district residents need to know</li>"
            ]
            story = f'"This information helped me understand federal district restoration requirements. When our emergency occurred, I knew exactly how to protect our historic property while securing proper restoration coverage."'
            story_attribution = f"- {neighborhood} Resident"
            framework = '"Knowledge protects historic properties - understanding your restoration authority ensures preservation compliance and insurance coverage protection."'

        else:
            # Default DC template
            icon = "🏛️"
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            insights = [
                "<li><strong>Federal district expertise:</strong> Professional restoration for Washington DC properties</li>",
                "<li><strong>Historic compliance:</strong> DC preservation requirements and regulations</li>",
                "<li><strong>Professional authority:</strong> IICRC standards with federal district specialization</li>",
                "<li><strong>Insurance advocacy:</strong> Complete documentation maximizes historic property coverage</li>"
            ]
            story = f'"Independent Restoration\'s federal district expertise and historic preservation knowledge delivered exceptional results for our {neighborhood} property restoration."'
            story_attribution = f"- {neighborhood} Resident"
            framework = '"Federal district restoration requires specialized expertise - professional knowledge protects historic property value and ensures compliance."'

        template = f'''
    <!-- Community Knowledge Hub - {service_display} Washington DC -->
    <section class="community-knowledge-hub" style="background: {bg_gradient}; padding: 40px 20px; margin: 40px 0; border-radius: 15px; border: 2px solid {border_color};">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="hub-header" style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: clamp(24px, 5vw, 32px); color: {color}; margin-bottom: 15px; font-weight: 800;">
            {icon} Washington DC {service_display} Community Knowledge Hub
          </h2>
          <p style="font-size: clamp(16px, 3vw, 18px); color: {secondary_color}; font-weight: 600;">
            Historic district expertise • Federal area compliance • DC restoration authority
          </p>
        </div>

        <div class="knowledge-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px;">
          <div class="expert-insight" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">🏛️ DC Historic District Expertise</h3>
            <ul style="color: #374151; line-height: 1.7;">
              {"".join(insights)}
            </ul>
          </div>

          <div class="homeowner-stories" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">🏛️ DC Resident Experiences</h3>
            <div class="story-highlight" style="border-left: 4px solid {color}; padding-left: 15px; margin: 15px 0; font-style: italic; color: #4b5563;">
              {story}
              <div style="font-weight: 600; margin-top: 8px; color: {color};">{story_attribution}</div>
            </div>
            <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 10px 0;">
              <strong>Federal Area Authority:</strong> {framework}
            </div>
          </div>
        </div>

        <div class="forum-links" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
          <a href="/restoration-forum.html" style="background: {color}; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            🏠 Main Restoration Forum
          </a>
          <a href="/dc-forum-content.html" style="background: {secondary_color}; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            🏛️ DC Community Archives
          </a>
          <a href="/dc-water-damage-faq.html" style="background: #1e3a8a; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            ❓ FAQ Resources
          </a>
        </div>

        <div class="emergency-contact" style="background: {color}; color: white; padding: 25px; border-radius: 12px; text-align: center;">
          <h3 style="margin-bottom: 15px; font-size: 22px;">🚨 Washington DC {service_display} Emergency</h3>
          <p style="font-size: 18px; margin-bottom: 20px;">Historic district expertise • Federal area compliance • Professional restoration</p>
          <div style="font-size: 28px; font-weight: 900; letter-spacing: 1px;">
            📞 <span style="color: #fef3c7;">202-796-7422</span>
          </div>
          <p style="font-size: 14px; margin-top: 15px; opacity: 0.9;">24/7 Federal District Response • DC licensed • Historic preservation specialists</p>
        </div>
      </div>
    </section>'''

        return template

    def extract_neighborhood(self, page_name: str) -> str:
        """Extract neighborhood name from page filename"""
        if "adams-morgan" in page_name:
            return "Adams Morgan"
        elif "capitol-hill" in page_name:
            return "Capitol Hill"
        elif "dupont-circle" in page_name:
            return "Dupont Circle"
        elif "foggy-bottom" in page_name:
            return "Foggy Bottom"
        elif "georgetown" in page_name:
            return "Georgetown"
        elif "logan-circle" in page_name:
            return "Logan Circle"
        elif "shaw-u-street" in page_name:
            return "Shaw U Street"
        else:
            return "Washington DC"

    def add_forum_integration(self, file_path: str, service_type: str) -> bool:
        """Add forum integration to a specific page"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if already integrated
            if "Community Knowledge Hub" in content:
                print(f"✅ Forum already integrated: {os.path.basename(file_path)}")
                return True

            # Get the appropriate template
            page_name = os.path.basename(file_path)
            template = self.get_service_template(service_type, page_name)

            # Find insertion point - before closing main tag, nav-home, or body
            patterns = [
                r'(<div class="nav-home">.*?</div>\s*</main>)',
                r'(</main>)',
                r'(</body>)'
            ]

            inserted = False
            for pattern in patterns:
                if re.search(pattern, content, re.DOTALL):
                    content = re.sub(pattern, template + r'\n\n    \1', content, count=1)
                    inserted = True
                    break

            if not inserted:
                # Fallback: add before closing body tag
                content = content.replace('</body>', template + '\n</body>')

            # Write updated content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Forum integration added: {os.path.basename(file_path)}")
            return True

        except Exception as e:
            print(f"❌ Error processing {file_path}: {str(e)}")
            return False

    def integrate_all_dc_pages(self) -> Dict[str, int]:
        """Integrate forum sections into all DC pages"""
        results = {"success": 0, "failed": 0, "skipped": 0}

        print("🚀 Starting Washington DC Forum Integration")
        print("=" * 60)

        for service_type, pages in self.dc_pages.items():
            print(f"\n🔧 Processing {service_type.replace('_', ' ').title()} Pages:")

            for page in pages:
                file_path = os.path.join(self.workspace_path, page)

                if not os.path.exists(file_path):
                    print(f"⚠️  File not found: {page}")
                    results["skipped"] += 1
                    continue

                if self.add_forum_integration(file_path, service_type):
                    results["success"] += 1
                else:
                    results["failed"] += 1

        return results

def main():
    workspace_path = "/home/klatt42/Developer/projects/personal/supercharged-ai-workspace"
    integrator = DCForumIntegrator(workspace_path)

    results = integrator.integrate_all_dc_pages()

    print("\n" + "=" * 60)
    print("📊 Washington DC Forum Integration Complete")
    print(f"✅ Success: {results['success']} pages")
    print(f"❌ Failed: {results['failed']} pages")
    print(f"⚠️  Skipped: {results['skipped']} pages")
    print(f"📈 Total DC Pages: {results['success'] + results['failed']}")

if __name__ == "__main__":
    main()