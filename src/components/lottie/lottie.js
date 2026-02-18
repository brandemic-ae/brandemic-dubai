export function initLotties(container) {
  console.log("🔵 initLotties called");
  
  if (!container) {
    console.log("❌ No container passed to initLotties");
    return;
  }

  const elements = container.querySelectorAll('[data-animation-type="lottie"]');
  console.log(`🟡 Found ${elements.length} Lottie element(s)`);

  elements.forEach((el, index) => {

    if (el._manualLottie) {
      console.log(`⚠️ Lottie ${index} already initialized, skipping`);
      return;
    }

    const src = el.getAttribute("data-src");

    if (!src) {
      console.log(`❌ Lottie ${index} has no data-src`);
      return;
    }

    console.log(`🟢 Initializing Lottie ${index}`, src);

    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: el.getAttribute("data-loop") === "1",
      autoplay: el.getAttribute("data-autoplay") === "1",
      path: src
    });

    anim.addEventListener("DOMLoaded", () => {
      console.log(`✅ Lottie ${index} DOMLoaded`);
    });

    anim.addEventListener("data_failed", () => {
      console.log(`❌ Lottie ${index} failed to load JSON`);
    });

    el._manualLottie = anim;

  });
}

export function destroyLotties(container) {
  console.log("🔴 destroyLotties called");

  if (!container) {
    console.log("❌ No container passed to destroyLotties");
    return;
  }

  const elements = container.querySelectorAll('[data-animation-type="lottie"]');
  console.log(`🟡 Found ${elements.length} Lottie element(s) to destroy`);

  elements.forEach((el, index) => {
    if (el._manualLottie) {
      console.log(`🗑 Destroying Lottie ${index}`);
      el._manualLottie.destroy();
      el._manualLottie = null;
    }
  });
}
