// app/articles/[handle]/page.tsx
import React from "react";
import { getArticleByHandle } from "@/lib/shopify";
import ArticleClient from "@/components/article/article-client";

export default async function ArticleDetailPage({
  params,
}: {
  params: { handle: string };
}) {
  const article = await getArticleByHandle("blog", params.handle);

  // Error handling
  if (!article || article.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    );
  }

  const publishedDate = new Date(article[0].publishedAt);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ArticleClient article={article[0]} publishedDate={publishedDate} />
    </div>
  );
}
