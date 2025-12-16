export function onRequest({ request }) {
  const url = new URL(request.url);

  if (url.hostname === 'darf6015.pages.dev') {
    url.hostname = 'www.darf6015.com.br';
    return Response.redirect(url.toString(), 301);
  }

  return fetch(request);
}
