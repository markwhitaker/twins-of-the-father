import { XMLParser } from 'fast-xml-parser';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getText,
  extractCategories,
  buildFilename,
  buildFrontmatter,
  buildMarkdown,
} from './migrate-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error('Usage: node scripts/migrate.mjs <path-to-wordpress.xml>');
  process.exit(1);
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  isArray: (name) => ['item', 'category'].includes(name),
});

const xml = readFileSync(xmlPath, 'utf8');
const parsed = parser.parse(xml);
const items = parsed?.rss?.channel?.item ?? [];

const outDir = join(__dirname, '../src/content/posts');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

let count = 0;
let skipped = 0;

for (const item of items) {
  const postType = getText(item['wp:post_type']);
  if (postType !== 'post') { skipped++; continue; }

  const title = getText(item.title);
  const slug = getText(item['wp:post_name']);
  const rawDate = getText(item['wp:post_date']);
  const date = rawDate.split(' ')[0];
  const htmlContent = getText(item['content:encoded']);
  const tags = extractCategories(item.category);

  if (!slug || !date || date === '0000-00-00') { skipped++; continue; }

  const frontmatter = buildFrontmatter({ title, date, slug, tags });
  const mdContent = buildMarkdown(htmlContent);
  const fileContent = `${frontmatter}\n\n${mdContent}\n`;
  const filename = buildFilename(date, slug);

  writeFileSync(join(outDir, filename), fileContent, 'utf8');
  count++;
}

console.log(`Done: ${count} posts written, ${skipped} items skipped.`);
