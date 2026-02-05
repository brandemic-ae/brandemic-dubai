/**
 * Force load Webflow Lottie animations after Barba.js page transitions
 * Solves the issue where Lottie JSON resources aren't requested due to SPA caching
 */

/**
 * Trigger Webflow's Lottie initialization
 */
export function triggerWebflowLottie() {
    // Force Webflow to re-scan and initialize Lottie elements
    if (window.Webflow && typeof window.Webflow.require === 'function') {
        try {
            // Get Webflow's Lottie module
            const Webflow = window.Webflow;
            
            // Destroy previous instance
            if (Webflow.destroy) {
                Webflow.destroy();
            }
            
            // Re-initialize Webflow
            if (Webflow.ready) {
                Webflow.ready();
            }
            
            // Specifically trigger Lottie module
            const lottieModule = Webflow.require('lottie');
            if (lottieModule && lottieModule.ready) {
                lottieModule.ready();
            }
            
            // Force redraw
            if (Webflow.redraw) {
                Webflow.redraw.up();  
            }
        } catch (error) {
            console.warn('Error reinitializing Webflow Lottie:', error);
        }
    }
}
/**
 * Destroy all Lottie instances before page transition
 */
export function destroyLottieAnimations() {
    const lottieElements = document.querySelectorAll('[data-animation-type="lottie"]');
    
    lottieElements.forEach((element) => {
        if (element.lottie) {
            element.lottie.destroy();
            delete element.lottie;
        }
    });
}