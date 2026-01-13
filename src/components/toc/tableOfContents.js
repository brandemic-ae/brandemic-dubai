/**
 * Table of Contents - Dynamically generates TOC from H2 headings
 */

import { getSmoother } from '../../core/smoothScroll.js';

// Store click handlers for cleanup
let clickHandlers = [];

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
        const link = document.createElement('a');
        link.className = 'toc_list-link';
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
}

/**
 * Destroy Table of Contents
 * Removes event listeners and cleans up
 */
export function destroyTableOfContents() {
    // Remove all click handlers
    clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
    });

    // Clear handlers array
    clickHandlers = [];
}
