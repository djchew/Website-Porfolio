import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const staticRoutes = ["/", "/projects", "/resume"];

const normalize = (path: string) => (path === "/" ? "/" : `${path.replace(/\/$/, "")}/`);

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.toString() ?? "https://darrellchew.com").replace(/\/$/, "");
  const projects = await getCollection("projects");
  const now = new Date().toISOString();

  const urls = [
    ...staticRoutes.map((path) => `${origin}${normalize(path)}`),
    ...projects.map((project) => `${origin}/projects/${project.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
