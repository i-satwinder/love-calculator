import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);
  const hostname = url.hostname;
  
  // Always redirect to non-www
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    url.hostname = newHostname;
    throw redirect(308, url.toString());
  }
  
  // Ensure HTTPS
  if (url.protocol !== 'https:') {
    url.protocol = 'https:';
    throw redirect(308, url.toString());
  }

  // Add content security policy headers
  event.setHeaders({
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });

  return resolve(event);
};
