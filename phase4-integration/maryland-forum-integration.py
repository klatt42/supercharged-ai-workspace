#!/usr/bin/env python3
"""
Maryland Specialized Pages Forum Integration Automation
Adds Community Knowledge Hub sections to all Maryland service pages with family safety priority
"""

import os
import re
from typing import Dict, List

class MarylandForumIntegrator:
    def __init__(self, workspace_path: str):
        self.workspace_path = workspace_path
        self.maryland_pages = {
            "water_damage": [
                "maryland-water-damage.html",
                "anne-arundel-county-water-damage.html",
                "calvert-county-water-damage.html",
                "carroll-county-water-damage.html",
                "charles-county-water-damage.html",
                "frederick-county-water-damage.html",
                "howard-county-water-damage.html",
                "montgomery-county-water-damage.html",
                "prince-georges-county-water-damage.html",
                "st-marys-county-water-damage.html",
                "washington-county-water-damage.html",
                "annapolis-water-damage.html"
            ],
            "fire_damage": [
                "maryland-fire-damage.html",
                "anne-arundel-county-fire-damage.html",
                "calvert-county-fire-damage.html",
                "carroll-county-fire-damage.html",
                "charles-county-fire-damage.html",
                "frederick-county-fire-damage.html",
                "howard-county-fire-damage.html",
                "montgomery-county-fire-damage.html",
                "prince-georges-county-fire-damage.html",
                "st-marys-county-fire-damage.html",
                "washington-county-fire-damage.html",
                "annapolis-fire-damage.html"
            ],
            "mold_remediation": [
                "maryland-mold-remediation.html",
                "anne-arundel-county-mold-remediation.html",
                "calvert-county-mold-remediation.html",
                "carroll-county-mold-remediation.html",
                "charles-county-mold-remediation.html",
                "frederick-county-mold-remediation.html",
                "howard-county-mold-remediation.html",
                "montgomery-county-mold-remediation.html",
                "prince-georges-county-mold-remediation.html",
                "st-marys-county-mold-remediation.html",
                "washington-county-mold-remediation.html",
                "annapolis-mold-remediation.html"
            ],
            "storm_damage": [
                "maryland-storm-damage.html",
                "anne-arundel-county-storm-damage.html",
                "calvert-county-storm-damage.html",
                "carroll-county-storm-damage.html",
                "charles-county-storm-damage.html",
                "frederick-county-storm-damage.html",
                "howard-county-storm-damage.html",
                "montgomery-county-storm-damage.html",
                "prince-georges-county-storm-damage.html",
                "st-marys-county-storm-damage.html",
                "washington-county-storm-damage.html",
                "annapolis-storm-damage.html"
            ],
            "emergency_services": [
                "prince-georges-county-emergency-services.html"
            ],
            "faq_pages": [
                "maryland-water-damage-faq.html"
            ],
            "blog_posts": [
                "maryland-water-damage-blog-post-1.html",
                "maryland-water-damage-blog-post-2.html",
                "maryland-water-damage-blog-post-3.html"
            ]
        }

    def get_service_template(self, service_type: str, page_name: str) -> str:
        """Get the appropriate forum template based on service type with Maryland family safety focus"""

        # Determine specific service context
        county = self.extract_county(page_name)
        service_display = service_type.replace('_', ' ').title()

        if service_type == "water_damage":
            icon = "💧"
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            insights = [
                "<li><strong>Children's health:</strong> Cannot wait for insurance approval - immediate action required</li>",
                "<li><strong>Maryland humidity:</strong> Accelerated mold growth in Mid-Atlantic climate</li>",
                "<li><strong>Air quality testing:</strong> Professional assessment for family safety</li>",
                "<li><strong>Legal rights:</strong> Maryland homeowners choose their restoration contractor</li>"
            ]
            story = f'"My 5-year-old was developing respiratory symptoms from hidden water damage. Independent Restoration\'s emergency response and air quality testing identified dangerous contamination levels. Family safety came first."'
            story_attribution = f"- {county} Mother"
            framework = '"Just like 911 services, water damage emergencies affecting children\'s health require immediate expert response - not insurance scheduling convenience."'

        elif service_type == "fire_damage":
            icon = "🔥"
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            insights = [
                "<li><strong>Family evacuation:</strong> Professional assessment determines when it\'s safe for children to return home</li>",
                "<li><strong>Air quality priority:</strong> Smoke particle testing protects developing respiratory systems</li>",
                "<li><strong>Hidden contamination:</strong> Maryland climate accelerates smoke damage in HVAC systems</li>",
                "<li><strong>Insurance advocacy:</strong> Professional documentation secures family relocation coverage</li>"
            ]
            story = f'"After the kitchen fire, my children couldn\'t return home until Independent Restoration confirmed air quality safety. Their professional smoke remediation and HVAC cleaning protected our family\'s health completely."'
            story_attribution = f"- {county} Parent"
            framework = '"Family safety cannot wait for insurance convenience. Professional fire restoration follows medical protocols - children\'s health comes first."'

        elif service_type == "mold_remediation":
            icon = "🦠"
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            insights = [
                "<li><strong>Children\'s vulnerability:</strong> Developing respiratory systems at highest risk from mold exposure</li>",
                "<li><strong>Maryland humidity:</strong> Mid-Atlantic climate accelerates mold growth and spore production</li>",
                "<li><strong>Air quality testing:</strong> Professional spore counts determine family safety protocols</li>",
                "<li><strong>Containment authority:</strong> Proper isolation prevents mold spread during remediation</li>"
            ]
            story = f'"My children were experiencing respiratory symptoms from hidden mold. Independent Restoration\'s emergency containment and air quality testing protected our family immediately. Complete remediation restored safe indoor air."'
            story_attribution = f"- {county} Family"
            framework = '"Children\'s health cannot wait for insurance approval. Professional mold remediation follows medical protocols - not insurance convenience scheduling."'

        elif service_type == "storm_damage":
            icon = "⛈️"
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            insights = [
                "<li><strong>Family safety first:</strong> Professional structural assessment before children can safely return</li>",
                "<li><strong>Maryland weather:</strong> Regional storm patterns require specialized damage evaluation</li>",
                "<li><strong>Emergency boarding:</strong> Professional protection prevents additional family displacement</li>",
                "<li><strong>Insurance advocacy:</strong> Complete storm documentation maximizes family relocation coverage</li>"
            ]
            story = f'"The storm damage was more extensive than visible. Independent Restoration\'s emergency response and structural evaluation kept my family safe while securing complete insurance coverage for repairs."'
            story_attribution = f"- {county} Parent"
            framework = '"Storm emergencies affecting family safety follow 911 protocols - immediate professional response protects children, not insurance scheduling delays."'

        elif service_type == "emergency_services":
            icon = "🚨"
            color = "#dc2626"
            secondary_color = "#991b1b"
            bg_gradient = "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
            border_color = "#fecaca"
            insights = [
                "<li><strong>Family emergency priority:</strong> Children\'s safety requires immediate professional response</li>",
                "<li><strong>24/7 availability:</strong> Emergency situations don\'t wait for business hours</li>",
                "<li><strong>Professional expertise:</strong> IICRC certified technicians handle family emergencies</li>",
                "<li><strong>Insurance advocacy:</strong> Emergency documentation protects family coverage rights</li>"
            ]
            story = f'"During our family emergency, Independent Restoration responded within hours. Their professional team prioritized my children\'s safety while handling all insurance documentation. Family came first."'
            story_attribution = f"- {county} Emergency Response"
            framework = '"Family emergencies require immediate professional response - children\'s safety cannot wait for insurance company approval or scheduling convenience."'

        elif service_type in ["faq_pages", "blog_posts"]:
            icon = "💬" if service_type == "blog_posts" else "❓"
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            insights = [
                "<li><strong>Family knowledge:</strong> Understanding restoration options protects children and property</li>",
                "<li><strong>Maryland homeowner rights:</strong> Legal protection and contractor choice authority</li>",
                "<li><strong>Emergency preparedness:</strong> What Maryland families need to know before disaster strikes</li>",
                "<li><strong>Insurance navigation:</strong> Maximizing coverage while prioritizing family safety</li>"
            ]
            story = f'"This information helped me understand my rights as a Maryland parent and homeowner. When our emergency occurred, I knew exactly how to protect my family while securing proper restoration coverage."'
            story_attribution = f"- {county} Parent"
            framework = '"Knowledge protects families - understanding your restoration authority ensures children\'s safety comes first, not insurance company convenience."'

        else:
            # Default Maryland template
            icon = "🏠"
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            insights = [
                "<li><strong>Family safety priority:</strong> Professional restoration protects Maryland families</li>",
                "<li><strong>Homeowner rights:</strong> Maryland law protects contractor choice authority</li>",
                "<li><strong>Professional expertise:</strong> IICRC standards ensure family-safe restoration</li>",
                "<li><strong>Insurance advocacy:</strong> Complete documentation maximizes family coverage</li>"
            ]
            story = f'"Independent Restoration prioritized my family\'s safety throughout the entire restoration process. Professional service and complete insurance advocacy gave us peace of mind."'
            story_attribution = f"- {county} Family"
            framework = '"Family safety requires professional restoration expertise - not insurance company convenience or cost-cutting measures."'

        template = f'''
    <!-- Community Knowledge Hub - {service_display} Maryland -->
    <section class="community-knowledge-hub" style="background: {bg_gradient}; padding: 40px 20px; margin: 40px 0; border-radius: 15px; border: 2px solid {border_color};">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="hub-header" style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: clamp(24px, 5vw, 32px); color: {color}; margin-bottom: 15px; font-weight: 800;">
            {icon} Maryland {service_display} Community Knowledge Hub
          </h2>
          <p style="font-size: clamp(16px, 3vw, 18px); color: {secondary_color}; font-weight: 600;">
            Family safety priority • Maryland homeowner rights • Expert community guidance
          </p>
        </div>

        <div class="knowledge-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px;">
          <div class="expert-insight" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">🏥 Family Health Priority</h3>
            <ul style="color: #374151; line-height: 1.7;">
              {"".join(insights)}
            </ul>
          </div>

          <div class="homeowner-stories" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">👨‍👩‍👧‍👦 Maryland Family Experiences</h3>
            <div class="story-highlight" style="border-left: 4px solid {color}; padding-left: 15px; margin: 15px 0; font-style: italic; color: #4b5563;">
              {story}
              <div style="font-weight: 600; margin-top: 8px; color: {color};">{story_attribution}</div>
            </div>
            <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 10px 0;">
              <strong>Family Safety Authority:</strong> {framework}
            </div>
          </div>
        </div>

        <div class="forum-links" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
          <a href="/restoration-forum.html" style="background: {color}; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            🏠 Main Restoration Forum
          </a>
          <a href="/maryland-forum-content.html" style="background: {secondary_color}; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            🏔️ Maryland Community Archives
          </a>
          <a href="/maryland-water-damage-faq.html" style="background: #166534; color: white; padding: 18px 25px; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 700; transition: all 0.3s ease; display: block;">
            ❓ FAQ Resources
          </a>
        </div>

        <div class="emergency-contact" style="background: {color}; color: white; padding: 25px; border-radius: 12px; text-align: center;">
          <h3 style="margin-bottom: 15px; font-size: 22px;">🚨 Maryland {service_display} Emergency</h3>
          <p style="font-size: 18px; margin-bottom: 20px;">Family safety first • Professional response • Maryland homeowner advocacy</p>
          <div style="font-size: 28px; font-weight: 900; letter-spacing: 1px;">
            📞 <span style="color: #fef3c7;">301-900-5171</span>
          </div>
          <p style="font-size: 14px; margin-top: 15px; opacity: 0.9;">24/7 Emergency Response • Maryland licensed • Children\'s health priority</p>
        </div>
      </div>
    </section>'''

        return template

    def extract_county(self, page_name: str) -> str:
        """Extract county/city name from page filename"""
        if "anne-arundel" in page_name:
            return "Anne Arundel County"
        elif "calvert" in page_name:
            return "Calvert County"
        elif "carroll" in page_name:
            return "Carroll County"
        elif "charles" in page_name:
            return "Charles County"
        elif "frederick" in page_name:
            return "Frederick County"
        elif "howard" in page_name:
            return "Howard County"
        elif "montgomery" in page_name:
            return "Montgomery County"
        elif "prince-georges" in page_name:
            return "Prince George's County"
        elif "st-marys" in page_name:
            return "St. Mary's County"
        elif "washington" in page_name:
            return "Washington County"
        elif "annapolis" in page_name:
            return "Annapolis"
        else:
            return "Maryland"

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

    def integrate_all_maryland_pages(self) -> Dict[str, int]:
        """Integrate forum sections into all Maryland pages"""
        results = {"success": 0, "failed": 0, "skipped": 0}

        print("🚀 Starting Maryland Forum Integration")
        print("=" * 60)

        for service_type, pages in self.maryland_pages.items():
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
    integrator = MarylandForumIntegrator(workspace_path)

    results = integrator.integrate_all_maryland_pages()

    print("\n" + "=" * 60)
    print("📊 Maryland Forum Integration Complete")
    print(f"✅ Success: {results['success']} pages")
    print(f"❌ Failed: {results['failed']} pages")
    print(f"⚠️  Skipped: {results['skipped']} pages")
    print(f"📈 Total Maryland Pages: {results['success'] + results['failed']}")

if __name__ == "__main__":
    main()