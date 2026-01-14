/**
 * Share Button - Native share or copy URL to clipboard
 */

let shareButtons = [];

/**
 * Handle share button click
 * Uses Web Share API on supported devices, fallback to clipboard copy
 */
function handleShare(e) {
    e.preventDefault();
    
    const shareData = {
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href
    };

    // Use native share if available (primarily mobile)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch((err) => {
            // User cancelled or share failed - fallback to clipboard
            if (err.name !== 'AbortError') {
                copyToClipboard(shareData.url, e.currentTarget);
            }
        });
    } else {
        // Fallback: copy URL to clipboard
        copyToClipboard(shareData.url, e.currentTarget);
    }
}

/**
 * Copy URL to clipboard and show feedback
 */
function copyToClipboard(url, button) {
    navigator.clipboard.writeText(url).then(() => {
        showCopyFeedback(button, true);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(button, true);
        } catch (err) {
            showCopyFeedback(button, false);
        }
        
        document.body.removeChild(textArea);
    });
}

/**
 * Show visual feedback after copy action
 */
function showCopyFeedback(button, success) {
    const originalText = button.textContent;
    const feedbackText = success ? 'Link Copied!' : 'Copy Failed';
    
    button.textContent = feedbackText;
    button.classList.add('is-copied');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('is-copied');
    }, 2000);
}

/**
 * Initialize share button functionality
 */
export function initShareButton() {
    shareButtons = document.querySelectorAll('.blog_share');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', handleShare);
    });
}

/**
 * Destroy share button event listeners
 */
export function destroyShareButton() {
    shareButtons.forEach(button => {
        button.removeEventListener('click', handleShare);
    });
    shareButtons = [];
}
