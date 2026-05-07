import { MetadataRoute } from "next";

const tools = [
  "word-counter", "character-counter", "text-case-converter",
  "remove-duplicate-lines", "sentence-counter", "readability-checker",
  "keyword-density-checker", "lorem-ipsum-generator", "text-reverser",
  "line-sorter", "paraphrasing-tool", "grammar-checker",
  "article-summarizer", "plagiarism-checker", "text-expander",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://texttoolsmax.com";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}