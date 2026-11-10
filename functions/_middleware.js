export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // 1. ISENÇÃO TOTAL: Home, arquivos de infraestrutura e pastas de ativos estáticos passam direto
  if (
    pathname === '/' || 
    pathname === '' || 
    pathname === '/robots.txt' || 
    pathname === '/favicon.ico' || 
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/imagens/') ||
    pathname.startsWith('/fonts/') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.txt')
  ) {
    return context.next();
  }

  // 2. URLs antigas do Blogger (/AAAA/MM/nome.html) e Feeds
  const isBloggerUrl = /^\/\d{4}\/\d{2}\/.*\.html$/.test(pathname);
  const isBloggerFeed = pathname.startsWith('/feeds/');

  // 3. Páginas descontinuadas
  const isCotacoesMundiais = pathname.startsWith('/cotacoes-bolsas-mundiais-em-tempo-real');

  // Retorna 410 Gone imediatamente para o que foi removido
  if (isBloggerUrl || isBloggerFeed || isCotacoesMundiais) {
    return new Response('410 Gone - Conteudo removido permanentemente.', {
      status: 410,
      statusText: 'Gone',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  return context.next();
}