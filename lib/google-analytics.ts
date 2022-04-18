/* eslint-disable  @typescript-eslint/no-explicit-any */
declare const window: any;

// log pageview with url
export const logPageView = (url: URL) => {
  window.gtag('config', process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// log events
export const logEvent = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
