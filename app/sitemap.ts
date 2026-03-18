import { posts } from "./lib/post";
import { tools } from "./lib/tools";

export default function sitemap() {
  const baseUrl = "https://devtools.cl";

  const now = new Date();

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: now,
  }));

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: now,
  }));

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
    },
    ...categoryPages,
    ...toolPages,
    ...blogPages,
  ];
}
