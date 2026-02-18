export function initLotties(container) {
  if (!container) return;

  const elements = container.querySelectorAll('[data-animation-type="lottie"]');

  elements.forEach((el) => {

    if (el._manualLottie) return;

    const src = el.getAttribute("data-src");

    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: el.getAttribute("data-loop") === "1",
      autoplay: el.getAttribute("data-autoplay") === "1",
      path: src
    });

    el._manualLottie = anim;

  });
}

export function destroyLotties(container) {
  if (!container) return;

  container.querySelectorAll('[data-animation-type="lottie"]').forEach((el) => {
    if (el._manualLottie) {
      el._manualLottie.destroy();
      el._manualLottie = null;
    }
  });
}
