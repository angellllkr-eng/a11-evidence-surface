/**
 * A11 evidence hostname migration.
 * Bind this Worker to evidence.a11-k.space/* in Cloudflare.
 * Preserves the full path and query string and permanently redirects to www.
 */
export default {
  async fetch(request) {
    const source = new URL(request.url);
    if (source.hostname !== "evidence.a11-k.space") {
      return new Response("Not found", { status: 404 });
    }
    source.hostname = "www.a11-k.space";
    source.protocol = "https:";
    return Response.redirect(source.toString(), 301);
  }
};
