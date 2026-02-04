    export function destroyWebflowLottie() {
  if (!window.Webflow || !Webflow.require) return;
  Webflow.require('lottie').destroy();
}

export function initWebflowLottie() {
  if (!window.Webflow || !Webflow.require) return;
  Webflow.require('lottie').ready();
}
