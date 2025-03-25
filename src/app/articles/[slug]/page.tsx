// app/articles/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Container } from "@/components/ui_blocks/Container";
import { formatDate } from "@/app/lib/formatDate";
import { getArticleBySlug } from "@/app/lib/articles";
import BackButton from "@/components/ui_blocks/BackButton";
import Header from "@/components/header/Header";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <BackButton />
            </div>

            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  {article.title}
                </h1>
                <time
                  dateTime={article.date}
                  className="order-first flex items-center text-base text-zinc-500 dark:text-zinc-400"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(article.date)}</span>
                </time>
              </header>
              <div className="mt-8 prose dark:prose-invert">
                {/* Split content by newlines and map to paragraphs */}
                {article.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Written by {article.author}
                </p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
