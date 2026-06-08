export const trackClick = (elementName: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'click', { element: elementName });
  }
};

export const trackPageView = (pagePath: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'page_view', { page_path: pagePath });
  }
};
