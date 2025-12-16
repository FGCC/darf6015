export function onRequest({ request }) {
  const host = request.headers.get("host");

  if (host === "darf6015.pages.dev") {
    return Response.redirect(
      "https://www.darf6015.com.br" + new URL(request.url).pathname,
      301
    );
  }

  return fetch(request);
}
