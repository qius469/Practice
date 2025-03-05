import { serve } from "https://deno.land/std@0.220.1/http/server.ts";

const html = await Deno.readTextFile("./index.html");

function handler(req: Request): Response {
  const url = new URL(req.url);
  
  // Serve the main page
  if (url.pathname === "/" || url.pathname === "/index.html") {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  // Proxy the API requests to your existing API endpoint
  if (url.pathname === "/chat/completions") {
    return fetch("https://qius469-gemini-82.deno.dev/chat/completions", {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
  }

  // Handle 404
  return new Response("Not Found", { status: 404 });
}

serve(handler);
