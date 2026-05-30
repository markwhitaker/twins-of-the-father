import TurndownService from 'turndown';

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

export function getText(node) {
  if (!node && node !== 0) return '';
  if (typeof node === 'string') return node;
  if (node.__cdata !== undefined) return node.__cdata;
  return String(node);
}

export function extractCategories(categories) {
  if (!Array.isArray(categories)) return [];
  return categories
    .filter(c => c['@_domain'] === 'category')
    .map(c => getText(c));
}

export function buildFilename(date, slug) {
  return `${date}-${slug}.md`;
}

export function buildFrontmatter({ title, date, slug, tags }) {
  const tagsYaml = `[${tags.map(t => JSON.stringify(t)).join(', ')}]`;
  return `---
title: ${JSON.stringify(title)}
date: ${date}
slug: ${JSON.stringify(slug)}
tags: ${tagsYaml}
draft: false
---`;
}

export function buildMarkdown(html) {
  if (!html) return '';
  return td.turndown(html);
}
