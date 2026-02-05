export function initLotties(container) {
  container.querySelectorAll('[data-lottie]').forEach(el => {
    // prevent double init
    if (el._lottieInstance) return;

    const anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: el.dataset.lottieSrc
    });

    el._lottieInstance = anim;
  });
}
export function destroyLotties(container) {
  container.querySelectorAll('[data-lottie]').forEach(el => {
    if (el._lottieInstance) {
      el._lottieInstance.destroy();
      el._lottieInstance = null;
    }
  });
}
