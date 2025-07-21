// Advanced Lazy Loading Implementation
// Provides fallback for browsers that don't support native lazy loading

(function() {
    'use strict';

    // Check if native lazy loading is supported
    const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;

    if (supportsLazyLoading) {
        // Native lazy loading is supported, no need for polyfill
        console.log('Native lazy loading supported');
        return;
    }

    // Polyfill for browsers that don't support native lazy loading
    console.log('Using lazy loading polyfill');

    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Create a new image to preload
                const newImg = new Image();
                newImg.onload = () => {
                    // Replace the src when the image is loaded
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');
                };
                newImg.src = img.dataset.src;
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        // Load images when they're 100px away from viewport
        rootMargin: '100px 0px',
        threshold: 0.01
    });

    // Function to setup lazy loading for images
    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        lazyImages.forEach(img => {
            // Move src to data-src for polyfill
            if (img.src && !img.dataset.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                img.classList.add('lazy-loading');
            }
            
            // Start observing the image
            imageObserver.observe(img);
        });
    }

    // Setup lazy loading when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLazyLoading);
    } else {
        setupLazyLoading();
    }

    // Add CSS for lazy loading states
    const style = document.createElement('style');
    style.textContent = `
        .lazy-loading {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .lazy-loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
})();

