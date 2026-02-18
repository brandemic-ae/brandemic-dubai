export function initCasePreviewIframe() {
  // Guard 1: Ensure section exists
  const section = document.querySelector(".case-preview_screen");
  if (!section) return;

  // Guard 2: Ensure link element exists
  const linkElement = section.querySelector(".web_preview-link");
  if (!linkElement) return;

  let url = linkElement.textContent.trim();
  if (!url) return;

  // Guard 3: Ensure iframe exists
  const iframe = section.querySelector("iframe");
  if (!iframe) return;

  // Guard 4: Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  // Prevent unnecessary reassignments
  if (iframe.src === url) return;

  iframe.src = url;
}
