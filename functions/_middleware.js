export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Padrão para detetar URLs antigas do Blogger (ex: /2015/06/nome-do-post.html)
  const isBloggerUrl = /^\/\d{4}\/\d{2}\/.*\.html$/.test(url.pathname);
  
  // 2. Padrão para detetar feeds antigos
  const isBloggerFeed = url.pathname.startsWith('/feeds/');

  // Se corresponder a qualquer um dos padrões antigos, retorna o status 410 (Gone)
  if (isBloggerUrl || isBloggerFeed) {
    return new Response(
      `
      
        
          
          410 Conteúdo Removido