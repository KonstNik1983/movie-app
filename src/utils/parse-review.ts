import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function parseReview(content: string) {
  if (!content) return '';

  const md = content.replace(/\r\n/g, '\n');

  const html = marked.parse(md, { async: false });
  return DOMPurify.sanitize(html);
}
