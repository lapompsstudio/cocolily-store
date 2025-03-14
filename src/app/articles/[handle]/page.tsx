import React from "react";
import { getArticleByHandle } from "@/lib/shopify";
import parse from "html-react-parser";
import Image from "next/image";
import { format } from "date-fns";

const ArticleDetailPage = async ({
  params,
}: {
  params: { handle: string };
}) => {
  const article = await getArticleByHandle("blog", params.handle);
  const html = article[0].contentHtml;
  const publishedDate = new Date(article[0].publishedAt);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {article[0].title}
        </h1>
        <div className="text-sm text-gray-500 mb-6">
          {format(publishedDate, "MMMM d, yyyy")}
        </div>
      </header>

      {/* Featured Image with proper handling */}
      {article[0].image?.src && (
        <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-lg shadow-md">
          <Image
            src={article[0].image.src}
            alt={article[0].title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-md">
        {parse(html)}
      </article>

      {/* Tags if available */}
      {article[0].tags && article[0].tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {article[0].tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailPage;
