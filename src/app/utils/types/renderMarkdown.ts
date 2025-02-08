import { remark } from "remark";
import html from "remark-html";
import matter from 'gray-matter';

export async function renderMarkdown(content: string) {
  const matterResult = matter(content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data,
  };
}