export function getExcerpt(body: string): string {
  const text = body
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*`>_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 150 ? text.slice(0, 150).trimEnd() + '…' : text;
}
