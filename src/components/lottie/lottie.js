export function initLotties(scope) {
  // Auto-detect active Barba container if none provided
  const container =
    scope ||
    document.querySelector('[data-barba="container"]') ||
    document;

  if (!container || !(container instanceof Element)) return;

  const lottieElements = container.querySelectorAll('[data-lottie]');
  if (!lottieElements.length) return;

  // Wait one frame to ensure DOM/layout is ready after transition
  requestAnimationFrame(() => {
    lottieElements.forEach((el) => {
      if (!el || el._lottieInstance) return;

      const src = el.dataset.lottieSrc;
      if (!src) return;

      const anim = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: src,
      });

      el._lottieInstance = anim;
    });
  });
}

export function destroyLotties(scope) {
  const container =
    scope ||
    document.querySelector('[data-barba="container"]') ||
    document;

  if (!container || !(container instanceof Element)) return;

  container.querySelectorAll('[data-lottie]').forEach((el) => {
    if (el?._lottieInstance) {
      el._lottieInstance.destroy();
      el._lottieInstance = null;
    }
  });
}
