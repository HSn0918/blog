export async function onRequest(context: { request: Request; next: () => Promise<Response> }) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (
    pathname !== "/" &&
    !pathname.endsWith("/") &&
    !pathname.includes(".")
  ) {
    url.pathname = `${pathname}/`;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}

