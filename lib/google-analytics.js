// log pageview with url
export const logPageView = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
    page_path: url,
  });
};

// log events
export const logEvent = ({ action, params }) => {
  window.gtag("event", action, params);
};
