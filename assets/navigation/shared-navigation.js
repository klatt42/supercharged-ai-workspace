/**
 * Shared Navigation System for Authority Reversal Framework
 * Handles breadcrumbs, cross-page linking, and SEO optimization
 * Victoria Validator - Cross-Page Navigation & SEO Integration
 */

// Navigation configuration for all regions and services
const NAVIGATION_CONFIG = {
    regions: {
        maryland: {
            name: 'Maryland',
            url: '/maryland-restoration.html',
            phone: '410-555-0199',
            counties: {
                montgomery: {
                    name: 'Montgomery County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                },
                annapolis: {
                    name: 'Annapolis',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                },
                frederick: {
                    name: 'Frederick County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                },
                washington: {
                    name: 'Washington County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                }
            }
        },
        dc: {
            name: 'Washington DC',
            url: '/dc-restoration.html',
            phone: '202-796-7422',
            neighborhoods: {
                georgetown: {
                    name: 'Georgetown',
                    services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage']
                },
                'capitol-hill': {
                    name: 'Capitol Hill',
                    services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage']
                },
                'dupont-circle': {
                    name: 'Dupont Circle',
                    services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage']
                },
                'adams-morgan': {
                    name: 'Adams Morgan',
                    services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage']
                },
                'foggy-bottom': {
                    name: 'Foggy Bottom',
                    services: ['water-damage', 'fire-restoration', 'mold-removal', 'storm-damage']
                }
            }
        },
        virginia: {
            name: 'Northern Virginia',
            url: '/virginia-restoration.html',
            phone: '703-844-4204',
            counties: {
                fairfax: {
                    name: 'Fairfax County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                },
                arlington: {
                    name: 'Arlington County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                },
                loudoun: {
                    name: 'Loudoun County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                },
                'prince-william': {
                    name: 'Prince William County',
                    services: ['water-damage', 'fire-damage', 'mold-remediation', 'storm-damage']
                }
            }
        }
    },
    
    services: {
        'water-damage': {
            name: 'Water Damage Restoration',
            icon: '💧',
            relatedServices: ['mold-remediation', 'fire-damage']
        },
        'fire-damage': {
            name: 'Fire Damage Cleanup',
            icon: '🔥',
            relatedServices: ['water-damage', 'storm-damage']
        },
        'fire-restoration': {
            name: 'Fire Restoration Services',
            icon: '🔥',
            relatedServices: ['water-damage', 'storm-damage']
        },
        'mold-remediation': {
            name: 'Mold Remediation Services',
            icon: '🧪',
            relatedServices: ['water-damage']
        },
        'mold-removal': {
            name: 'Mold Removal Experts',
            icon: '🧪',
            relatedServices: ['water-damage']
        },
        'storm-damage': {
            name: 'Storm Damage Emergency',
            icon: '⚡',
            relatedServices: ['water-damage', 'fire-damage']
        }
    }
};

/**
 * Generate breadcrumb navigation based on current page
 * @param {string} currentPath - Current page path
 * @returns {string} HTML for breadcrumb navigation
 */
function generateBreadcrumbs(currentPath) {
    const breadcrumbs = [];
    
    // Home link
    breadcrumbs.push({
        name: 'Home',
        url: '/index.html'
    });
    
    // Parse current path to determine location and service
    const pathParts = currentPath.replace('.html', '').split('-');
    
    if (pathParts.includes('restoration')) {
        // Regional page
        const region = pathParts[0];
        if (NAVIGATION_CONFIG.regions[region]) {
            breadcrumbs.push({
                name: NAVIGATION_CONFIG.regions[region].name + ' Restoration',
                url: currentPath,
                current: true
            });
        }
    } else if (pathParts.length >= 2) {
        // Service page
        const location = pathParts.slice(0, -2).join('-');
        const serviceType = pathParts.slice(-2).join('-');
        
        // Find region for this location
        let region = null;
        let locationName = '';
        
        Object.entries(NAVIGATION_CONFIG.regions).forEach(([regionKey, regionData]) => {
            if (regionData.counties && regionData.counties[location]) {
                region = regionKey;
                locationName = regionData.counties[location].name;
            } else if (regionData.neighborhoods && regionData.neighborhoods[location]) {
                region = regionKey;
                locationName = regionData.neighborhoods[location].name;
            }
        });
        
        if (region) {
            // Add region breadcrumb
            breadcrumbs.push({
                name: NAVIGATION_CONFIG.regions[region].name + ' Restoration',
                url: NAVIGATION_CONFIG.regions[region].url
            });
            
            // Add location breadcrumb (if different from current page)
            if (locationName) {
                breadcrumbs.push({
                    name: locationName,
                    url: `/${location}.html` // Assumes location landing pages exist
                });
            }
            
            // Add current service
            if (NAVIGATION_CONFIG.services[serviceType]) {
                breadcrumbs.push({
                    name: NAVIGATION_CONFIG.services[serviceType].name,
                    url: currentPath,
                    current: true
                });
            }
        }
    }
    
    // Generate HTML
    let breadcrumbHTML = '<nav class="breadcrumb" aria-label="Breadcrumb">';
    breadcrumbHTML += '<ol class="breadcrumb-list">';
    
    breadcrumbs.forEach((crumb, index) => {
        breadcrumbHTML += '<li class="breadcrumb-item">';
        
        if (crumb.current) {
            breadcrumbHTML += `<span class="breadcrumb-current" aria-current="page">${crumb.name}</span>`;
        } else {
            breadcrumbHTML += `<a href="${crumb.url}" class="breadcrumb-link">${crumb.name}</a>`;
        }
        
        if (index < breadcrumbs.length - 1) {
            breadcrumbHTML += '<span class="breadcrumb-separator" aria-hidden="true">›</span>';
        }
        
        breadcrumbHTML += '</li>';
    });
    
    breadcrumbHTML += '</ol>';
    breadcrumbHTML += '</nav>';
    
    return breadcrumbHTML;
}

/**
 * Generate cross-page navigation links
 * @param {string} currentPath - Current page path
 * @returns {string} HTML for related pages navigation
 */
function generateCrossPageNavigation(currentPath) {
    const pathParts = currentPath.replace('.html', '').split('-');
    
    if (pathParts.length < 2) return '';
    
    const location = pathParts.slice(0, -2).join('-');
    const currentService = pathParts.slice(-2).join('-');
    
    // Find region and location data
    let region = null;
    let locationData = null;
    
    Object.entries(NAVIGATION_CONFIG.regions).forEach(([regionKey, regionData]) => {
        if (regionData.counties && regionData.counties[location]) {
            region = regionKey;
            locationData = regionData.counties[location];
        } else if (regionData.neighborhoods && regionData.neighborhoods[location]) {
            region = regionKey;
            locationData = regionData.neighborhoods[location];
        }
    });
    
    if (!region || !locationData) return '';
    
    let navigationHTML = '<section class="cross-page-navigation">';
    navigationHTML += '<div class="container">';
    
    // Related services in same location
    navigationHTML += '<div class="related-services">';
    navigationHTML += `<h3>Other ${locationData.name} Services</h3>`;
    navigationHTML += '<div class="service-links-grid">';
    
    locationData.services.forEach(service => {
        if (service !== currentService) {
            const serviceData = NAVIGATION_CONFIG.services[service];
            if (serviceData) {
                navigationHTML += `<a href="/${location}-${service}.html" class="service-link">`;
                navigationHTML += `<span class="service-icon">${serviceData.icon}</span>`;
                navigationHTML += `<span class="service-name">${serviceData.name}</span>`;
                navigationHTML += '</a>';
            }
        }
    });
    
    navigationHTML += '</div>';
    navigationHTML += '</div>';
    
    // Neighboring locations for same service
    const regionData = NAVIGATION_CONFIG.regions[region];
    const locations = regionData.counties || regionData.neighborhoods;
    
    navigationHTML += '<div class="neighboring-locations">';
    navigationHTML += `<h3>${NAVIGATION_CONFIG.services[currentService].name} in ${regionData.name}</h3>`;
    navigationHTML += '<div class="location-links-grid">';
    
    Object.entries(locations).forEach(([locationKey, locationInfo]) => {
        if (locationKey !== location && locationInfo.services.includes(currentService)) {
            navigationHTML += `<a href="/${locationKey}-${currentService}.html" class="location-link">`;
            navigationHTML += `${locationInfo.name}`;
            navigationHTML += '</a>';
        }
    });
    
    navigationHTML += '</div>';
    navigationHTML += '</div>';
    
    // Regional hub link
    navigationHTML += '<div class="regional-hub">';
    navigationHTML += `<a href="${regionData.url}" class="regional-hub-link">`;
    navigationHTML += `View All ${regionData.name} Restoration Services`;
    navigationHTML += '</a>';
    navigationHTML += '</div>';
    
    navigationHTML += '</div>';
    navigationHTML += '</section>';
    
    return navigationHTML;
}

/**
 * Generate CSS for navigation components
 * @returns {string} CSS styles for navigation
 */
function generateNavigationCSS() {
    return `
        /* Breadcrumb Navigation */
        .breadcrumb {
            background: #f8fafc;
            padding: 1rem 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .breadcrumb-list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .breadcrumb-item {
            display: flex;
            align-items: center;
        }
        
        .breadcrumb-link {
            color: #6b7280;
            text-decoration: none;
            font-size: 0.875rem;
            transition: color 0.2s ease;
        }
        
        .breadcrumb-link:hover {
            color: #374151;
            text-decoration: underline;
        }
        
        .breadcrumb-current {
            color: #374151;
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .breadcrumb-separator {
            color: #9ca3af;
            margin: 0 0.5rem;
            font-size: 0.875rem;
        }
        
        /* Cross-Page Navigation */
        .cross-page-navigation {
            background: #f8fafc;
            padding: 3rem 0;
            margin-top: 2rem;
        }
        
        .related-services, .neighboring-locations {
            margin-bottom: 2rem;
        }
        
        .related-services h3, .neighboring-locations h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #374151;
            margin-bottom: 1rem;
        }
        
        .service-links-grid, .location-links-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .service-link {
            display: flex;
            align-items: center;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            text-decoration: none;
            color: #374151;
            border: 2px solid #e5e7eb;
            transition: all 0.2s ease;
        }
        
        .service-link:hover {
            border-color: #6b7280;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .service-icon {
            font-size: 1.5rem;
            margin-right: 0.75rem;
        }
        
        .service-name {
            font-weight: 600;
        }
        
        .location-link {
            display: block;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            text-decoration: none;
            color: #374151;
            font-weight: 600;
            border: 2px solid #e5e7eb;
            transition: all 0.2s ease;
            text-align: center;
        }
        
        .location-link:hover {
            border-color: #6b7280;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .regional-hub {
            text-align: center;
            margin-top: 2rem;
        }
        
        .regional-hub-link {
            display: inline-block;
            background: #374151;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.2s ease;
        }
        
        .regional-hub-link:hover {
            background: #4b5563;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .service-links-grid, .location-links-grid {
                grid-template-columns: 1fr;
            }
            
            .breadcrumb-list {
                padding: 0 10px;
            }
            
            .breadcrumb-item {
                font-size: 0.8rem;
            }
        }
    `;
}

/**
 * Initialize navigation system for current page
 * @param {string} currentPath - Current page path
 */
function initializeNavigation(currentPath) {
    // Add CSS to page head
    const style = document.createElement('style');
    style.textContent = generateNavigationCSS();
    document.head.appendChild(style);
    
    // Add breadcrumbs after header
    const header = document.querySelector('header');
    if (header) {
        const breadcrumbHTML = generateBreadcrumbs(currentPath);
        header.insertAdjacentHTML('afterend', breadcrumbHTML);
    }
    
    // Add cross-page navigation before contact section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const crossNavHTML = generateCrossPageNavigation(currentPath);
        contactSection.insertAdjacentHTML('beforebegin', crossNavHTML);
    }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        initializeNavigation(currentPath);
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateBreadcrumbs,
        generateCrossPageNavigation,
        generateNavigationCSS,
        initializeNavigation,
        NAVIGATION_CONFIG
    };
}