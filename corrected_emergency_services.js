// CORRECTED EMERGENCY SERVICES JAVASCRIPT
// Fixed link logic, improved regional switching, better error handling

// Region data with correct phone numbers and service links
const regionData = {
  virginia: {
    phone: '703-844-4204',
    services: [
      { name: 'Water Damage', url: 'virginia-water-damage.html' },
      { name: 'Fire Damage', url: 'virginia-fire-damage.html' },
      { name: 'Mold Remediation', url: 'virginia-mold-remediation.html' },
      { name: 'Storm Damage', url: 'virginia-storm-damage.html' }
    ]
  },
  maryland: {
    phone: '301-799-2000',
    services: [
      { name: 'Water Damage', url: 'maryland-water-damage.html' },
      { name: 'Fire Damage', url: 'maryland-fire-damage.html' },
      { name: 'Mold Remediation', url: 'maryland-mold-remediation.html' },
      { name: 'Storm Damage', url: 'maryland-storm-damage.html' }
    ]
  },
  dc: {
    phone: '202-555-0199',
    services: [
      { name: 'Water Damage', url: 'dc-water-damage.html' },
      { name: 'Fire Damage', url: 'dc-fire-damage.html' },
      { name: 'Mold Remediation', url: 'dc-mold-remediation.html' },
      { name: 'Storm Damage', url: 'dc-storm-damage.html' }
    ]
  }
};

// Current selected region (default to Virginia)
let currentRegion = 'virginia';

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeRegionalServices();
  updateEmergencyPhoneNumbers();
  addRegionButtonListeners();
});

// Initialize regional services display
function initializeRegionalServices() {
  try {
    // Show default region (Virginia)
    showRegionalServices('virginia');

    // Update active button state
    const virginiaBtn = document.querySelector('[onclick*="virginia"]');
    if (virginiaBtn) {
      virginiaBtn.classList.add('active');
    }
  } catch (error) {
    console.error('Error initializing regional services:', error);
  }
}

// Show services for selected region
function showRegionalServices(region) {
  try {
    currentRegion = region;

    // Hide all regional services
    const regions = ['virginia', 'maryland', 'dc'];
    regions.forEach(r => {
      const element = document.getElementById(`${r}-services`);
      if (element) {
        element.classList.add('hidden');
      }
    });

    // Show selected region
    const selectedElement = document.getElementById(`${region}-services`);
    if (selectedElement) {
      selectedElement.classList.remove('hidden');
    }

    // Update all phone numbers
    updatePhoneNumbers(region);

    // Update emergency services links
    updateEmergencyServicesLinks(region);

    // Update button states
    updateButtonStates(region);

    // Show notification of region change
    showRegionChangeNotification(region);

  } catch (error) {
    console.error('Error showing regional services:', error);
  }
}

// Update all phone numbers on the page
function updatePhoneNumbers(region) {
  try {
    const phoneNumber = regionData[region].phone;

    // Update all phone number elements
    const phoneElements = document.querySelectorAll('.phone-number, a[href^="tel:"]');
    phoneElements.forEach(element => {
      if (element.tagName === 'A') {
        element.href = `tel:${phoneNumber}`;
        element.textContent = phoneNumber;
      } else {
        element.textContent = phoneNumber;
      }
    });

    // Update emergency banner phone numbers
    const emergencyPhones = document.querySelectorAll('.emergency-banner .phone-number, .emergency-cta a[href^="tel:"]');
    emergencyPhones.forEach(element => {
      if (element.tagName === 'A') {
        element.href = `tel:${phoneNumber}`;
        element.textContent = phoneNumber;
      } else {
        element.textContent = phoneNumber;
      }
    });

  } catch (error) {
    console.error('Error updating phone numbers:', error);
  }
}

// Update emergency services links
function updateEmergencyServicesLinks(region) {
  try {
    const services = regionData[region].services;

    // Find emergency services container
    const emergencyContainer = document.querySelector('.emergency-services-links');
    if (!emergencyContainer) return;

    // Clear existing links
    emergencyContainer.innerHTML = '';

    // Add new links for selected region
    services.forEach(service => {
      const link = document.createElement('a');
      link.href = service.url;
      link.className = 'emergency-service-btn';
      link.textContent = service.name;
      link.setAttribute('aria-label', `${service.name} services in ${region.charAt(0).toUpperCase() + region.slice(1)}`);
      emergencyContainer.appendChild(link);
    });

  } catch (error) {
    console.error('Error updating emergency services links:', error);
  }
}

// Update button active states
function updateButtonStates(region) {
  try {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.region-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to selected button
    const activeButton = document.querySelector(`[onclick*="${region}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  } catch (error) {
    console.error('Error updating button states:', error);
  }
}

// Show region change notification
function showRegionChangeNotification(region) {
  try {
    const regionName = region.charAt(0).toUpperCase() + region.slice(1);
    const phone = regionData[region].phone;

    // Create or update notification
    let notification = document.querySelector('.regional-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'regional-notification';

      // Insert after region selector
      const regionSelector = document.querySelector('.region-selector');
      if (regionSelector) {
        regionSelector.parentNode.insertBefore(notification, regionSelector.nextSibling);
      }
    }

    notification.innerHTML = `
      <strong>Now showing ${regionName} services</strong><br>
      Emergency: <a href="tel:${phone}" class="notification-phone">${phone}</a>
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (notification) {
        notification.style.opacity = '0.7';
      }
    }, 5000);

  } catch (error) {
    console.error('Error showing notification:', error);
  }
}

// Add event listeners to region buttons
function addRegionButtonListeners() {
  try {
    const buttons = document.querySelectorAll('.region-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        // Extract region from onclick attribute or data attribute
        const onclickAttr = this.getAttribute('onclick');
        if (onclickAttr) {
          const match = onclickAttr.match(/showRegionalServices\(['"](\w+)['"]\)/);
          if (match) {
            showRegionalServices(match[1]);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error adding button listeners:', error);
  }
}

// Update emergency phone numbers in banners
function updateEmergencyPhoneNumbers() {
  try {
    const phone = regionData[currentRegion].phone;

    // Update top banner
    const topBanner = document.querySelector('.emergency-call-banner .phone-number');
    if (topBanner) {
      topBanner.textContent = phone;
      const phoneLink = topBanner.parentElement.querySelector('a[href^="tel:"]');
      if (phoneLink) {
        phoneLink.href = `tel:${phone}`;
      }
    }

    // Update bottom banner
    const bottomBanner = document.querySelector('.bottom-emergency-banner .phone-number');
    if (bottomBanner) {
      bottomBanner.textContent = phone;
      const phoneLink = bottomBanner.parentElement.querySelector('a[href^="tel:"]');
      if (phoneLink) {
        phoneLink.href = `tel:${phone}`;
      }
    }

  } catch (error) {
    console.error('Error updating emergency phone numbers:', error);
  }
}

// CSS for active button state
const style = document.createElement('style');
style.textContent = `
  .region-btn.active {
    background: #007bff !important;
    color: #ffffff !important;
    border-color: #007bff !important;
    font-weight: 700 !important;
  }

  .notification-phone {
    color: #000000 !important;
    background: rgba(255,255,255,0.9) !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    text-decoration: none !important;
    font-weight: 800 !important;
  }

  .regional-notification {
    transition: opacity 0.3s ease !important;
  }
`;
document.head.appendChild(style);