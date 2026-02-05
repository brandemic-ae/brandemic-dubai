/**
 * Lottie Prefetch Utility
 * Simple solution to cache Lottie resources before Barba.js transitions
 */

/**
 * Prefetch all Lottie JSON files on the page
 * This caches them so Barba.js can use the cached versions
 */
export function prefetchLottieResources() {
    const lottieElements = document.querySelectorAll('[data-animation-type="lottie"]');
    
    lottieElements.forEach((element) => {
        const src = element.getAttribute('data-src');
        
        if (src) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = src;
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        }
    });
}