// JavaScript nuclear option to force text visibility
document.addEventListener('DOMContentLoaded', function() {
  // Find all links and force visibility
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    const computedStyle = window.getComputedStyle(link);
    const textColor = computedStyle.color;

    // If text is blue/cyan or similar, force white on red
    if (textColor.includes('rgb(0, 102, 204)') ||
        textColor.includes('rgb(0, 212, 255)') ||
        textColor.includes('blue') ||
        textColor.includes('cyan')) {

      link.style.color = '#ffffff';
      link.style.background = '#dc3545';
      link.style.padding = '8px 16px';
      link.style.borderRadius = '6px';
      link.style.textDecoration = 'none';
      link.style.fontWeight = '600';
      link.style.display = 'inline-block';
      link.style.margin = '4px 2px';
    }
  });

  // Additional check every 2 seconds for dynamic content
  setInterval(() => {
    const blueLinks = document.querySelectorAll('a[style*="color: blue"], a[style*="color: #0066cc"]');
    blueLinks.forEach(link => {
      link.style.color = '#ffffff';
      link.style.background = '#dc3545';
      link.style.padding = '8px 16px';
      link.style.borderRadius = '6px';
    });
  }, 2000);
});