export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. URLs antigas do Blogger (/AAAA/MM/nome.html) e Feeds
  const isBloggerUrl = /^\/\d{4}\/\d{2}\/.*\.html$/.test(url.pathname);
  const isBloggerFeed = url.pathname.startsWith('/feeds/');

  // 2. Página de cotações de bolsas mundiais excluída
  const isCotacoesMundiais = url.pathname.startsWith('/cotacoes-bolsas-mundiais-em-tempo-real');

  // Se corresponder a qualquer uma das regras, retorna 410 Gone
  if (isBloggerUrl || isBloggerFeed || isCotacoesMundiais) {
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