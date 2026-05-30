import { describe, it, expect } from 'vitest';
import { getExcerpt } from './excerpt';

describe('getExcerpt', () => {
  it('strips markdown bold syntax', () => {
    expect(getExcerpt('**Hello** world')).toBe('Hello world');
  });
  it('strips markdown links', () => {
    expect(getExcerpt('[link text](http://example.com)')).toBe('link text');
  });
  it('strips markdown headings', () => {
    expect(getExcerpt('# Big heading')).toBe('Big heading');
  });
  it('strips image syntax', () => {
    expect(getExcerpt('![alt text](http://example.com/img.jpg)')).toBe('');
  });
  it('returns short text unchanged', () => {
    expect(getExcerpt('Hello world')).toBe('Hello world');
  });
  it('truncates to 150 chars with ellipsis', () => {
    const long = 'word '.repeat(40);
    const result = getExcerpt(long);
    expect(result.endsWith('…')).toBe(true);
    expect(result.length).toBeLessThanOrEqual(155);
  });
  it('does not truncate text under 150 chars', () => {
    const short = 'Short post content here.';
    expect(getExcerpt(short)).toBe('Short post content here.');
  });
});
