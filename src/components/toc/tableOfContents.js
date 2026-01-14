/**
 * Table of Contents - Dynamically generates TOC from H2 headings
 * Includes sticky sidebar functionality using ScrollTrigger pin
 */

import { getSmoother } from '../../core/smoothScroll.js';
import { isMobile } from '../../utils/isMobile.js';

// Store click handlers for cleanup
let clickHandlers = [];
let sideInfoPin = null;

// Mobile drawer state
let mobileTocOpen = false;
let mobileTocHandlers = {
    wrapperClick: null,
    outsideClick: null,
};

/**
 * Generate a URL-friendly slug from text
 * @param {string} text 
 * @returns {string}
 */
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Initialize Table of Contents
 * Fetches H2 tags from .blog_content and creates anchor links in .toc_lists
 */
export function initTableOfContents() {
    const blogContent = document.querySelector('.blog_content');
    const tocContainer = document.querySelector('.toc_lists');

    if (!blogContent || !tocContainer) return;

    // Get all H2 headings inside blog content
    const headings = blogContent.querySelectorAll('h2');

    if (headings.length === 0) return;

    // Clear existing TOC links
    tocContainer.innerHTML = '';

    // Reset handlers array
    clickHandlers = [];

    headings.forEach((heading, index) => {
        // Generate or use existing ID for the heading
        if (!heading.id) {
            const slug = slugify(heading.textContent);
            heading.id = slug || `heading-${index}`;
        }

        // Create anchor link
        const link = document.createElement('p');
        link.className = 'toc_list-link';
        link.classList.add('link-hover-ix');
        link.textContent = heading.textContent;

        // Create click handler
        const clickHandler = () => {
            const smoother = getSmoother();
            if (smoother) {
                // Use ScrollSmoother's scrollTo method
                smoother.scrollTo(heading, true, 'top top+=100');
            } else {
                // Fallback for non-smooth scroll
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Add event listener
        link.addEventListener('click', clickHandler);

        // Store handler for cleanup
        clickHandlers.push({ element: link, handler: clickHandler });

        // Append link to TOC container
        tocContainer.appendChild(link);
    });

    // Initialize sticky sidebar (desktop) or mobile drawer
    initStickySidebar();
    initMobileTocDrawer();
}

/**
 * Initialize sticky sidebar using ScrollTrigger pin
 * Works with ScrollSmoother where CSS sticky doesn't
 */
function initStickySidebar() {
    // Skip sticky on mobile
    if (isMobile()) return;

    const contentWrapper = document.querySelector('.blog_content-wrapper');
    const sideInfo = document.querySelector('.blog_side-info-wrapper');

    if (!contentWrapper || !sideInfo) return;

    sideInfoPin = ScrollTrigger.create({
        trigger: sideInfo,
        start: 'top top+=100', // Adjust offset based on nav height
        endTrigger: contentWrapper,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
    });
}

/**
 * Destroy sticky sidebar
 */
function destroyStickySidebar() {
    if (sideInfoPin) {
        sideInfoPin.kill();
        sideInfoPin = null;
    }
}

/**
 * Open mobile TOC drawer with animation
 */
function openMobileToc() {
    const tocLists = document.querySelector('.toc_lists');
    if (!tocLists || mobileTocOpen) return;

    mobileTocOpen = true;
    tocLists.style.display = 'flex';

    gsap.fromTo(tocLists, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
}

/**
 * Close mobile TOC drawer with animation
 */
function closeMobileToc() {
    const tocLists = document.querySelector('.toc_lists');
    if (!tocLists || !mobileTocOpen) return;

    gsap.to(tocLists, {
        y: "-20px",
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
            tocLists.style.display = 'none';
            mobileTocOpen = false;
        }
    });
}

/**
 * Initialize mobile TOC drawer functionality
 * Opens/closes the TOC list on mobile devices
 */
function initMobileTocDrawer() {
    // Only initialize on mobile
    if (!isMobile()) return;

    const tocWrapper = document.querySelector('.blog_toc-wrapper');
    const tocLists = document.querySelector('.toc_lists');

    if (!tocWrapper || !tocLists) return;

    // Toggle drawer on wrapper click
    mobileTocHandlers.wrapperClick = (e) => {
        // Don't toggle if clicking on a link inside
        if (e.target.closest('.toc_list-link')) return;

        if (mobileTocOpen) {
            closeMobileToc();
        } else {
            openMobileToc();
        }
    };

    // Close drawer when clicking outside
    mobileTocHandlers.outsideClick = (e) => {
        if (mobileTocOpen && !tocWrapper.contains(e.target)) {
            closeMobileToc();
        }
    };

    // Add close handler to TOC links
    clickHandlers.forEach(({ element }) => {
        const originalHandler = element.onclick;
        element.addEventListener('click', () => {
            if (isMobile()) {
                closeMobileToc();
            }
        });
    });

    tocWrapper.addEventListener('click', mobileTocHandlers.wrapperClick);
    document.addEventListener('click', mobileTocHandlers.outsideClick);
}

/**
 * Destroy mobile TOC drawer
 */
function destroyMobileTocDrawer() {
    const tocWrapper = document.querySelector('.blog_toc-wrapper');

    if (tocWrapper && mobileTocHandlers.wrapperClick) {
        tocWrapper.removeEventListener('click', mobileTocHandlers.wrapperClick);
    }

    if (mobileTocHandlers.outsideClick) {
        document.removeEventListener('click', mobileTocHandlers.outsideClick);
    }

    mobileTocHandlers.wrapperClick = null;
    mobileTocHandlers.outsideClick = null;
    mobileTocOpen = false;
}

/**
 * Destroy Table of Contents
 * Removes event listeners and cleans up
 */
export function destroyTableOfContents() {
    // Kill sticky sidebar and mobile drawer
    destroyStickySidebar();
    destroyMobileTocDrawer();

    // Remove all click handlers
    clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
    });

    // Clear handlers array
    clickHandlers = [];
}
