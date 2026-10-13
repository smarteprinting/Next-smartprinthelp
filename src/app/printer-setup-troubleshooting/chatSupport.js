export function openSetupChat() {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.jivo_api?.open === "function") {
    window.jivo_api.open();
    return;
  }

  window.alert("Chat support not available");
}