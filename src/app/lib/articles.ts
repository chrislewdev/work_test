// app/lib/articles.ts

import articleData from "./articleData.json";

export interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  content: string;
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

// Simulate database fetch delay
const simulateFetch = async <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 100); // 100ms delay to simulate network request
  });
};

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  // Simulate fetching from an API
  const articles = await simulateFetch(articleData);

  // Sort articles by date (newest first)
  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithSlug | undefined> {
  // Simulate fetching a specific article
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug);
}
