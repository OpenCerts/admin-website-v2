interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

export const initGTM = (containerId?: string): void => {
  if (!containerId) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.insertBefore(script, document.head.firstChild);

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  const noscript = document.createElement("noscript");
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
};
