export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Detecta URLs antigas do Blogger (/AAAA/MM/nome.html) ou feeds
  const isBloggerUrl = /^\/\d{4}\/\d{2}\/.*\.html$/.test(url.pathname);
  const isBloggerFeed = url.pathname.startsWith('/feeds/');

  if (isBloggerUrl || isBloggerFeed) {
    return new Response('410 Gone - Este conteudo foi removido permanentemente.', {
      status: 410,
      statusText: 'Gone',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return context.next();
}