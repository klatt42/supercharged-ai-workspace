// Enhanced Regional Switching with Emergency Services
function showRegionalServices(region) {
  // Hide all regional services
  document.getElementById('virginia-services').classList.add('hidden');
  document.getElementById('maryland-services').classList.add('hidden');
  document.getElementById('dc-services').classList.add('hidden');

  // Hide all emergency services
  document.getElementById('virginia-emergency').classList.add('hidden');
  document.getElementById('maryland-emergency').classList.add('hidden');
  document.getElementById('dc-emergency').classList.add('hidden');

  // Remove active state from all buttons
  document.getElementById('va-btn').classList.remove('active');
  document.getElementById('md-btn').classList.remove('active');
  document.getElementById('dc-btn').classList.remove('active');

  // Show selected region services AND emergency services
  document.getElementById(region + '-services').classList.remove('hidden');
  document.getElementById(region + '-emergency').classList.remove('hidden');

  // Add active state to selected button
  if (region === 'virginia') {
    document.getElementById('va-btn').classList.add('active');
  } else if (region === 'maryland') {
    document.getElementById('md-btn').classList.add('active');
  } else if (region === 'dc') {
    document.getElementById('dc-btn').classList.add('active');
  }

  // Update phone number in emergency banner
  const emergencyPhone = document.querySelector('.emergency-cta .phone-number');
  if (emergencyPhone) {
    if (region === 'virginia') {
      emergencyPhone.textContent = '703-844-4204';
    } else if (region === 'maryland') {
      emergencyPhone.textContent = '301-900-5171';
    } else if (region === 'dc') {
      emergencyPhone.textContent = '202-796-7422';
    }
  }

  // Update emergency banner phone numbers
  const emergencyBannerPhones = document.querySelectorAll('[href^="tel:"]');
  emergencyBannerPhones.forEach(phone => {
    if (region === 'virginia') {
      phone.href = 'tel:703-844-4204';
      phone.textContent = '703-844-4204';
    } else if (region === 'maryland') {
      phone.href = 'tel:301-900-5171';
      phone.textContent = '301-900-5171';
    } else if (region === 'dc') {
      phone.href = 'tel:202-796-7422';
      phone.textContent = '202-796-7422';
    }
  });

  console.log(`Switched to ${region} services and emergency links`);
}

// Auto-detect region and set appropriate defaults on page load
document.addEventListener('DOMContentLoaded', function() {
  // Default to Virginia since this is a VA-focused landing page
  showRegionalServices('virginia');

  // Optional: Try to detect user location and set appropriate region
  // This would require geolocation API implementation
});