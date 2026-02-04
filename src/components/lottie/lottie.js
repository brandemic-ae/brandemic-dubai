export function destroyWebflowLottie() {
  if (!window.Webflow || !Webflow.require) return;

  Webflow.push(() => {
    const lottie = Webflow.require('lottie');
    lottie.destroy();
  });
}

export function initWebflowLottie() {
  if (!window.Webflow || !Webflow.require) return;

  Webflow.push(() => {
    const lottie = Webflow.require('lottie');
    lottie.ready();
  });
}
