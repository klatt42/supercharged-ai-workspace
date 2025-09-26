#!/usr/bin/env python3
"""
Blog and FAQ Pages Forum Integration Automation
Adds Community Knowledge Hub sections to remaining blog and content pages
"""

import os
import re
from typing import Dict, List

class BlogFAQIntegrator:
    def __init__(self, workspace_path: str):
        self.workspace_path = workspace_path
        self.remaining_pages = {
            "blog_index_pages": [
                "blog-index.html",
                "blog-index-va.html",
                "blog-index-md.html",
                "blog-index-dc.html"
            ],
            "authority_blog_posts": [
                "blog-post-1-emergency-authority-foundation.html",
                "blog-post-2-prevention-authority-education.html",
                "blog-post-3-insurance-vs-homeowner-authority.html"
            ],
            "specialized_content": [
                "independent-restoration-storm-damage.html",
                "independent-restoration-geo-seo-hook-optimized.html"
            ]
        }

    def get_blog_template(self, page_type: str, page_name: str) -> str:
        """Get the appropriate forum template for blog and content pages"""

        # Determine regional context from filename
        region = self.extract_region(page_name)

        if region == "virginia":
            color = "#dc2626"
            secondary_color = "#991b1b"
            bg_gradient = "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
            border_color = "#fecaca"
            regional_phone = "703-844-4204"
            regional_focus = "Virginia homeowner rights • Professional contractor choice"
            authority_message = '"Would you let your insurance company choose your heart surgeon? Professional restoration requires expert evaluation - not insurance convenience."'

        elif region == "maryland":
            color = "#16a34a"
            secondary_color = "#15803d"
            bg_gradient = "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            border_color = "#bbf7d0"
            regional_phone = "301-900-5171"
            regional_focus = "Family safety priority • Children's health protection"
            authority_message = '"Children\'s health cannot wait for insurance approval. Professional restoration follows medical protocols - not insurance convenience scheduling."'

        elif region == "dc":
            color = "#1e40af"
            secondary_color = "#1d4ed8"
            bg_gradient = "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)"
            border_color = "#93c5fd"
            regional_phone = "202-796-7422"
            regional_focus = "Historic district expertise • Federal area compliance"
            authority_message = '"Historic district restoration requires specialized expertise - not generic insurance contractor approaches. Professional preservation techniques protect property value."'

        else:  # Tri-state or general
            color = "#a16207"
            secondary_color = "#92400e"
            bg_gradient = "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)"
            border_color = "#fde047"
            regional_phone = "Call: VA 703-844-4204 • MD 301-900-5171 • DC 202-796-7422"
            regional_focus = "Tri-state expertise • Regional authority specialization"
            authority_message = '"Professional restoration authority serves Virginia, Maryland, and Washington DC - homeowner choice trumps insurance convenience across all regions."'

        if page_type == "blog_index_pages":
            icon = "📚"
            title_suffix = "Blog Community Hub"
            content_focus = "Educational content • Expert insights • Community discussions"
            insights = [
                "<li><strong>Educational resources:</strong> Professional restoration knowledge and homeowner guidance</li>",
                "<li><strong>Authority framework:</strong> Understanding your rights and restoration options</li>",
                "<li><strong>Expert perspectives:</strong> Industry insights and professional best practices</li>",
                "<li><strong>Community wisdom:</strong> Real homeowner experiences and lessons learned</li>"
            ]

        elif page_type == "authority_blog_posts":
            icon = "🧠"
            title_suffix = "Authority Knowledge Hub"
            content_focus = "Authority Reversal Framework™ • Professional expertise • Homeowner empowerment"
            insights = [
                "<li><strong>Authority education:</strong> Understanding professional restoration vs insurance convenience</li>",
                "<li><strong>Framework application:</strong> Real-world examples of Authority Reversal principles</li>",
                "<li><strong>Professional standards:</strong> IICRC protocols and expert restoration practices</li>",
                "<li><strong>Homeowner empowerment:</strong> Legal rights and contractor choice protection</li>"
            ]

        else:  # specialized_content
            icon = "⚡"
            title_suffix = "Specialized Knowledge Hub"
            content_focus = "Advanced restoration techniques • Specialized expertise • Professional authority"
            insights = [
                "<li><strong>Advanced techniques:</strong> Specialized restoration methods and professional expertise</li>",
                "<li><strong>Technical authority:</strong> Professional standards and scientific restoration approaches</li>",
                "<li><strong>Innovation leadership:</strong> Cutting-edge restoration technology and methods</li>",
                "<li><strong>Expert knowledge:</strong> Professional insights and industry best practices</li>"
            ]

        story = f'"This blog content helped me understand the restoration industry and my rights as a homeowner. When our emergency occurred, I knew exactly what to expect from professional restoration services."'
        story_attribution = f"- {region.title()} Reader" if region != "tristate" else "- Community Member"

        template = f'''
    <!-- Community Knowledge Hub - Blog Integration -->
    <section class="community-knowledge-hub" style="background: {bg_gradient}; padding: 40px 20px; margin: 40px 0; border-radius: 15px; border: 2px solid {border_color};">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="hub-header" style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: clamp(24px, 5vw, 32px); color: {color}; margin-bottom: 15px; font-weight: 800;">
            {icon} Join the Restoration Community Discussion
          </h2>
          <p style="font-size: clamp(16px, 3vw, 18px); color: {secondary_color}; font-weight: 600;">
            {content_focus}
          </p>
        </div>

        <div class="knowledge-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px;">
          <div class="expert-insight" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">💡 Community Knowledge</h3>
            <ul style="color: #374151; line-height: 1.7;">
              {"".join(insights)}
            </ul>
          </div>

          <div class="homeowner-stories" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px; font-size: 20px; font-weight: 700;">💬 Reader Experiences</h3>
            <div class="story-highlight" style="border-left: 4px solid {color}; padding-left: 15px; margin: 15px 0; font-style: italic; color: #4b5563;">
              {story}
              <div style="font-weight: 600; margin-top: 8px; color: {color};">{story_attribution}</div>
            </div>
            <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 10px 0;">
              <strong>Authority Reversal Framework:</strong> {authority_message}
            </div>
          </div>
        </div>

        <div class="community-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 25px;">
          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px;">💭 Share Your Experience</h3>
            <p style="color: #4b5563; margin-bottom: 15px;">Help other homeowners with your restoration insights and lessons learned.</p>
            <a href="/restoration-forum.html" style="background: {color}; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">Post Your Story</a>
          </div>

          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px;">🧠 Expert Guidance</h3>
            <p style="color: #4b5563; margin-bottom: 15px;">Get professional restoration advice and Authority Reversal Framework insights.</p>
            <a href="/virginia-forum-content.html" style="background: {secondary_color}; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">Browse Archives</a>
          </div>

          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: {color}; margin-bottom: 15px;">🚨 Emergency Help</h3>
            <p style="color: #4b5563; margin-bottom: 15px;">Need immediate restoration assistance? Professional response available 24/7.</p>
            <div style="font-weight: 700; color: #dc2626; font-size: 16px;">{regional_phone}</div>
          </div>
        </div>

        <div class="authority-framework" style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 20px; text-align: center;">
          <strong style="color: {secondary_color}; font-size: 18px;">Authority Reversal Framework Community:</strong>
          <p style="color: #78350f; margin: 10px 0 0 0; font-style: italic;">"Homeowner experiences and professional expertise working together - because you choose your restoration authority, not your insurance company."</p>
        </div>
      </div>
    </section>'''

        return template

    def extract_region(self, page_name: str) -> str:
        """Extract region from page filename"""
        if "-va.html" in page_name or "virginia" in page_name:
            return "virginia"
        elif "-md.html" in page_name or "maryland" in page_name:
            return "maryland"
        elif "-dc.html" in page_name or "dc" in page_name.lower():
            return "dc"
        else:
            return "tristate"

    def add_forum_integration(self, file_path: str, page_type: str) -> bool:
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
            template = self.get_blog_template(page_type, page_name)

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

    def integrate_all_blog_faq_pages(self) -> Dict[str, int]:
        """Integrate forum sections into all remaining blog and FAQ pages"""
        results = {"success": 0, "failed": 0, "skipped": 0}

        print("🚀 Starting Blog & FAQ Forum Integration")
        print("=" * 60)

        for page_type, pages in self.remaining_pages.items():
            print(f"\n🔧 Processing {page_type.replace('_', ' ').title()} Pages:")

            for page in pages:
                file_path = os.path.join(self.workspace_path, page)

                if not os.path.exists(file_path):
                    print(f"⚠️  File not found: {page}")
                    results["skipped"] += 1
                    continue

                if self.add_forum_integration(file_path, page_type):
                    results["success"] += 1
                else:
                    results["failed"] += 1

        return results

def main():
    workspace_path = "/home/klatt42/Developer/projects/personal/supercharged-ai-workspace"
    integrator = BlogFAQIntegrator(workspace_path)

    results = integrator.integrate_all_blog_faq_pages()

    print("\n" + "=" * 60)
    print("📊 Blog & FAQ Forum Integration Complete")
    print(f"✅ Success: {results['success']} pages")
    print(f"❌ Failed: {results['failed']} pages")
    print(f"⚠️  Skipped: {results['skipped']} pages")
    print(f"📈 Total Blog/FAQ Pages: {results['success'] + results['failed']}")

if __name__ == "__main__":
    main()