export function getExcerpt(body: string): string {
  const text = body
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*`>_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= 150) return text;
  const truncated = text.slice(0, 150);
  const wordBoundary = truncated.lastIndexOf(' ');
  const snapped = wordBoundary > 100 ? truncated.slice(0, wordBoundary) : truncated;
  return snapped.trimEnd() + '…';
}
