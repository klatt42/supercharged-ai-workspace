#!/usr/bin/env python3
"""
Virginia Specialized Pages Forum Integration Automation
Adds Community Knowledge Hub sections to all Virginia service pages
"""

import os
import re
from typing import Dict, List

class VirginiaForumIntegrator:
    def __init__(self, workspace_path: str):
        self.workspace_path = workspace_path
        self.virginia_pages = {
            "water_damage": [
                "virginia-water-damage.html",  # Already completed
                "arlington-county-water-damage.html",
                "fairfax-county-water-damage.html",
                "loudoun-county-water-damage.html",
                "prince-william-county-water-damage.html",
                "northern-va-water-damage.html"
            ],
            "fire_damage": [
                "virginia-fire-damage.html",
                "arlington-county-fire-damage.html",
                "fairfax-county-fire-damage.html",
                "loudoun-county-fire-damage.html",
                "prince-william-county-fire-damage.html",
                "northern-va-fire-damage.html"
            ],
            "mold_remediation": [
                "virginia-mold-remediation.html",
                "arlington-county-mold-remediation.html",
                "fairfax-county-mold-remediation.html",
                "loudoun-county-mold-remediation.html",
                "prince-william-county-mold-remediation.html",
                "northern-va-mold-remediation.html"
            ],
            "storm_damage": [
                "virginia-storm-damage.html",
                "arlington-county-storm-damage.html",
                "fairfax-county-storm-damage.html",
                "loudoun-county-storm-damage.html",
                "prince-william-county-storm-damage.html",
                "northern-va-storm-damage.html"
            ],
            "faq_pages": [
                "northern-va-water-damage-faq.html"
            ]
        }

    def get_service_template(self, service_type: str, page_name: str) -> str:
        """Get the appropriate forum template based on service type"""

        # Determine specific service context
        county = self.extract_county(page_name)
        service_display = service_type.replace('_', ' ').title()

        if service_type == "water_damage":
            icon = "💧"
            color = "#dc2626"
            secondary_color = "#991b1b"
            bg_gradient = "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
            border_color = "#fecaca"
            insights = [
                "<li><strong>24-hour rule:</strong> Mold growth begins within 24-48 hours of water exposure</li>",
                "<li><strong>Hidden damage:</strong> 60% of water damage occurs behind walls and under flooring</li>",
                "<li><strong>Insurance timing:</strong> Document everything immediately - don't wait for adjuster</li>",
                "<li><strong>Contractor choice:</strong> Virginia homeowners have legal right to choose their restoration company</li>"
            ]
            story = f'"Independent Restoration found water damage my insurance adjuster completely missed. Professional moisture mapping revealed damage extending into three additional rooms. Full coverage approved after their documentation."'
            story_attribution = f"- {county} Homeowner"
            framework = '"Would you let your insurance company choose your heart surgeon? Professional water damage restoration requires expert evaluation - not insurance convenience."'

        elif service_type == "fire_damage":
            icon = "🔥"
            color = "#ea580c"
            secondary_color = "#c2410c"
            bg_gradient = "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)"
            border_color = "#fdba74"
            insights = [
                "<li><strong>Hidden smoke damage:</strong> 80% of fire damage is invisible smoke and soot penetration</li>",
                "<li><strong>HVAC contamination:</strong> Complete ductwork cleaning prevents ongoing odor issues</li>",
                "<li><strong>Structural integrity:</strong> Professional assessment of fire-weakened materials</li>",
                "<li><strong>Insurance maximization:</strong> Comprehensive documentation reveals damage adjusters miss</li>"
            ]
            story = f'"Fire damage restoration required specialized smoke removal techniques. Independent Restoration\'s comprehensive approach eliminated all odors and restored our home completely. Insurance approved full coverage after their detailed documentation."'
            story_attribution = f"- {county} Fire Recovery"
            framework = '"Would you let a general contractor perform heart surgery? Fire damage restoration requires specialized expertise - not insurance company convenience."'

        elif service_type == "mold_remediation":
            icon = "🦠"
            color = "#059669"
            secondary_color = "#047857"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)"
            border_color = "#86efac"
            insights = [
                "<li><strong>Health priority:</strong> Children's developing respiratory systems most vulnerable to mold exposure</li>",
                "<li><strong>Virginia climate:</strong> Humidity levels accelerate mold growth and spore production</li>",
                "<li><strong>Air quality testing:</strong> Professional spore counts determine family safety protocols</li>",
                "<li><strong>Containment authority:</strong> Proper isolation prevents mold spread during remediation</li>"
            ]
            story = f'"My family was experiencing respiratory symptoms from hidden mold. Independent Restoration\'s air quality testing and professional containment protected our children\'s health. Complete remediation restored safe indoor air."'
            story_attribution = f"- {county} Parent"
            framework = '"Children\'s health cannot wait for insurance approval. Professional mold remediation follows medical protocols - not insurance convenience scheduling."'

        elif service_type == "storm_damage":
            icon = "⛈️"
            color = "#475569"
            secondary_color = "#334155"
            bg_gradient = "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)"
            border_color = "#94a3b8"
            insights = [
                "<li><strong>Emergency response:</strong> Professional storm damage assessment within hours</li>",
                "<li><strong>Structural priority:</strong> Virginia buildings require specialized evaluation after severe weather</li>",
                "<li><strong>Insurance advocacy:</strong> Comprehensive storm damage documentation for full coverage</li>",
                "<li><strong>Weather expertise:</strong> Understanding Virginia's unique storm patterns and damage types</li>"
            ]
            story = f'"Storm damage was more extensive than visible from outside. Independent Restoration\'s thorough assessment identified roof and structural issues my insurance adjuster missed. Professional response secured full coverage."'
            story_attribution = f"- {county} Storm Recovery"
            framework = '"Storm damage emergencies follow 911 protocols - immediate professional response, not insurance scheduling delays."'

        else:  # FAQ pages
            icon = "❓"
            color = "#a16207"
            secondary_color = "#92400e"
            bg_gradient = "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)"
            border_color = "#fde047"
            insights = [
                "<li><strong>Expert knowledge:</strong> Professional restoration insights and homeowner guidance</li>",
                "<li><strong>Authority framework:</strong> Understanding your rights as a Virginia homeowner</li>",
                "<li><strong>Emergency protocols:</strong> What to do immediately after damage occurs</li>",
                "<li><strong>Insurance navigation:</strong> Maximizing coverage through proper documentation</li>"
            ]
            story = f'"The FAQ section helped me understand my rights as a Virginia homeowner. When damage occurred, I knew exactly what steps to take and which restoration company to call for professional service."'
            story_attribution = f"- {county} Homeowner"
            framework = '"Knowledge is power - understanding your restoration options protects your family and property investment."'

        template = f'''
    <!-- Community Knowledge Hub - {service_display} Virginia -->
    <section class="community-knowledge-hub" style="background: {bg_gradient}; padding: 40px 20px; margin: 40px 0; border-radius: 15px; border: 2px solid {border_color};">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="hub-header" style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: clamp(24px, 5vw, 32px); color: {color}; margin-bottom: 15px; font-weight: 800;">
            {icon} Virginia {service_display} Community Knowledge Hub
          </h2>
          <p style="font-size: clamp(16px, 3vw, 18px); color: {secondary_color}; font-weight: 600;">
            Real homeowner experiences • Expert guidance • Authority Reversal Framework™
          </p>
        </div>

        <div class="knowledge-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px;">
          <div class="expert-insight" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">🔬 Expert {service_display} Insights</h3>
            <ul style="color: #374151; line-height: 1.7;">
              {"".join(insights)}
            </ul>
          </div>

          <div class="homeowner-stories" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">📝 Virginia Homeowner Experiences</h3>
            <div class="story-highlight" style="border-left: 4px solid {color}; padding-left: 15px; margin: 15px 0; font-style: italic; color: #4b5563;">
              {story}
              <div style="font-weight: 600; margin-top: 8px; color: {color};">{story_attribution}</div>
            </div>
            <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 10px 0;">
              <strong>Authority Reversal Framework:</strong> {framework}
            </div>
          </div>
        </div>

        <div class="forum-links" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
          <a href="/restoration-forum.html" style="background: {color}; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            🏠 Main Restoration Forum
          </a>
          <a href="/virginia-forum-content.html" style="background: {secondary_color}; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            🏔️ Virginia Community Archives
          </a>
          <a href="/northern-va-water-damage-faq.html" style="background: #991b1b; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            ❓ FAQ Resources
          </a>
        </div>

        <div class="emergency-contact" style="background: {color}; color: white; padding: 25px; border-radius: 12px; text-align: center;">
          <h3 style="margin-bottom: 15px; font-size: 22px;">🚨 Virginia {service_display} Emergency</h3>
          <p style="font-size: 18px; margin-bottom: 20px;">Professional response within 2 hours • Insurance advocacy • Homeowner rights protection</p>
          <div style="font-size: 28px; font-weight: 900; letter-spacing: 1px;">
            📞 <span style="color: #fef3c7;">703-844-4204</span>
          </div>
          <p style="font-size: 14px; margin-top: 15px; opacity: 0.9;">Available 24/7 • Virginia licensed • IICRC certified restoration specialists</p>
        </div>
      </div>
    </section>'''

        return template

    def extract_county(self, page_name: str) -> str:
        """Extract county name from page filename"""
        if "arlington" in page_name:
            return "Arlington County"
        elif "fairfax" in page_name:
            return "Fairfax County"
        elif "loudoun" in page_name:
            return "Loudoun County"
        elif "prince-william" in page_name:
            return "Prince William County"
        else:
            return "Northern Virginia"

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

            # Find insertion point - before closing main tag or before nav-home
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

    def integrate_all_virginia_pages(self) -> Dict[str, int]:
        """Integrate forum sections into all Virginia pages"""
        results = {"success": 0, "failed": 0, "skipped": 0}

        print("🚀 Starting Virginia Forum Integration")
        print("=" * 60)

        for service_type, pages in self.virginia_pages.items():
            print(f"\n🔧 Processing {service_type.replace('_', ' ').title()} Pages:")

            for page in pages:
                file_path = os.path.join(self.workspace_path, page)

                if not os.path.exists(file_path):
                    print(f"⚠️  File not found: {page}")
                    results["skipped"] += 1
                    continue

                if page == "virginia-water-damage.html":
                    print(f"✅ Already completed: {page}")
                    results["success"] += 1
                    continue

                if self.add_forum_integration(file_path, service_type):
                    results["success"] += 1
                else:
                    results["failed"] += 1

        return results

def main():
    workspace_path = "/home/klatt42/Developer/projects/personal/supercharged-ai-workspace"
    integrator = VirginiaForumIntegrator(workspace_path)

    results = integrator.integrate_all_virginia_pages()

    print("\n" + "=" * 60)
    print("📊 Virginia Forum Integration Complete")
    print(f"✅ Success: {results['success']} pages")
    print(f"❌ Failed: {results['failed']} pages")
    print(f"⚠️  Skipped: {results['skipped']} pages")
    print(f"📈 Total Virginia Pages: {results['success'] + results['failed']}")

if __name__ == "__main__":
    main()