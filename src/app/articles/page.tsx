// app/articles/page.tsx

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui_blocks/Container";
import { getAllArticles } from "@/app/lib/articles";
import { formatDate } from "@/app/lib/formatDate";
import Button from "@/components/ui_blocks/Button";
import CustomLink from "@/components/ui_blocks/CustomLink";
import NavigationWrapper from "@/components/ui_blocks/NavigationWrapper";
import Header from "@/components/header/Header";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Get all articles
  const allArticles = await getAllArticles();

  // Pagination settings
  const articlesPerPage = 6;
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  // Get articles for current page
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = allArticles.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <Container>
        <NavigationWrapper />
      </Container>
      <Container className="mt-16 lg:mt-24">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-12">
          All Portfolios
        </h1>

        <div className="min-h-[850px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article) => (
              <div
                key={article.slug}
                className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 flex flex-col h-[400px]"
              >
                <div className="flex-grow overflow-hidden">
                  <time
                    dateTime={article.date}
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    {formatDate(article.date)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-2">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 line-clamp-6">
                    {article.description}
                  </p>
                </div>
                <CustomLink
                  href={`/articles/${article.slug}`}
                  variant="secondary"
                  className="mt-auto w-full"
                >
                  Read portfolio
                </CustomLink>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center h-[50px]">
          <div className="flex space-x-2 items-center">
            {currentPage > 1 ? (
              <Link href={`/articles?page=${currentPage - 1}`} passHref>
                <Button variant="secondary" className="w-[100px]">
                  Previous
                </Button>
              </Link>
            ) : (
              <div className="w-[100px]"></div>
            )}

            <div className="flex items-center px-4 text-sm text-zinc-700 dark:text-zinc-300 w-[120px] justify-center">
              Page {currentPage} of {totalPages}
            </div>

            {currentPage < totalPages ? (
              <Link href={`/articles?page=${currentPage + 1}`} passHref>
                <Button variant="secondary" className="w-[100px]">
                  Next
                </Button>
              </Link>
            ) : (
              <div className="w-[100px]"></div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
