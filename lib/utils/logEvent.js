const dev = process.env.NODE_ENV !== 'production';

const logEvent = ({ action, label }) => {
  if (!dev) {
    window.gtag('event', action, {
      event_category: 'Acciones',
      event_label: label,
      value: undefined,
    });
  }
  return;
};

export default logEvent;
