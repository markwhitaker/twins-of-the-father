import { describe, it, expect } from 'vitest';
import {
  getText,
  extractCategories,
  buildFilename,
  buildFrontmatter,
  buildMarkdown,
} from './migrate-utils.mjs';

describe('getText', () => {
  it('returns a string directly', () => {
    expect(getText('Hello')).toBe('Hello');
  });
  it('returns __cdata content', () => {
    expect(getText({ __cdata: 'Hello CDATA' })).toBe('Hello CDATA');
  });
  it('returns empty string for falsy input', () => {
    expect(getText(undefined)).toBe('');
    expect(getText(null)).toBe('');
  });
  it('coerces other values to string', () => {
    expect(getText(42)).toBe('42');
  });
  it('returns empty string for an object without __cdata', () => {
    expect(getText({ someKey: 'x' })).toBe('');
  });
});

describe('extractCategories', () => {
  it('returns texts for domain=category items only', () => {
    const cats = [
      { '@_domain': 'category', __cdata: 'Funny' },
      { '@_domain': 'post_tag', __cdata: 'jokes' },
      { '@_domain': 'category', __cdata: 'Growing up' },
    ];
    expect(extractCategories(cats)).toEqual(['Funny', 'Growing up']);
  });
  it('returns empty array when input is empty', () => {
    expect(extractCategories([])).toEqual([]);
  });
  it('returns empty array for undefined input', () => {
    expect(extractCategories(undefined)).toEqual([]);
  });
});

describe('buildFilename', () => {
  it('combines date and slug with .md extension', () => {
    expect(buildFilename('2007-02-22', 'the-gingerbread-olympics'))
      .toBe('2007-02-22-the-gingerbread-olympics.md');
  });
});

describe('buildFrontmatter', () => {
  it('produces valid YAML frontmatter block', () => {
    const result = buildFrontmatter({
      title: 'Hello World',
      date: '2007-02-22',
      slug: 'hello-world',
      tags: ['Funny', 'Growing up'],
    });
    expect(result).toContain('title: "Hello World"');
    expect(result).toContain('date: 2007-02-22');
    expect(result).toContain('slug: "hello-world"');
    expect(result).toContain('tags: ["Funny", "Growing up"]');
    expect(result).toContain('draft: false');
    expect(result).toMatch(/^---/);
    expect(result).toMatch(/---$/);
  });
  it('escapes double quotes in titles', () => {
    const result = buildFrontmatter({
      title: 'She said "hello"',
      date: '2007-02-22',
      slug: 'hello',
      tags: [],
    });
    expect(result).toContain('title: "She said \\"hello\\""');
  });
  it('renders empty tags as empty array', () => {
    const result = buildFrontmatter({
      title: 'No tags',
      date: '2007-02-22',
      slug: 'no-tags',
      tags: [],
    });
    expect(result).toContain('tags: []');
  });
});

describe('buildMarkdown', () => {
  it('converts HTML bold to markdown bold', () => {
    expect(buildMarkdown('<p>Hello <strong>world</strong></p>')).toContain('Hello **world**');
  });
  it('converts img tags to markdown image syntax', () => {
    expect(buildMarkdown('<img src="http://example.com/img.jpg" alt="test" />'))
      .toContain('![test](http://example.com/img.jpg)');
  });
  it('returns empty string for empty input', () => {
    expect(buildMarkdown('')).toBe('');
    expect(buildMarkdown(undefined)).toBe('');
  });
});
