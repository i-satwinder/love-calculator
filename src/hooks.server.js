import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);
  const hostname = url.hostname;
  
  // Redirect www to non-www (or vice versa if you prefer)
  // Choose one option and stick with it
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    throw redirect(308, `${url.protocol}//${newHostname}${url.pathname}${url.search}`);
  }
  
  // Ensure HTTPS in production
  if (url.protocol !== 'https:') {
    url.protocol = 'https:';
    throw redirect(308, url.toString());
  }

  return resolve(event);
};
