import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Twins of the Father',
    description: "A father's blog about raising twins.",
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.slug}/`,
    })),
  });
}
