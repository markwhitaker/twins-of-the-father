import { describe, it, expect } from 'vitest';
import { tagSlug } from './tag-slug';

describe('tagSlug', () => {
  it('lowercases simple tags', () => {
    expect(tagSlug('Funny')).toBe('funny');
  });
  it('replaces spaces with hyphens', () => {
    expect(tagSlug('Growing up')).toBe('growing-up');
  });
  it('strips special characters', () => {
    expect(tagSlug('AAARGHH! GET ME OUT OF HERE!!')).toBe('aaarghh-get-me-out-of-here');
  });
  it('handles quoted category names', () => {
    expect(tagSlug('"Getting Dressed" (ha!)')).toBe('getting-dressed-ha');
  });
  it('collapses consecutive hyphens', () => {
    expect(tagSlug('Tech  Dad')).toBe('tech-dad');
  });
});
