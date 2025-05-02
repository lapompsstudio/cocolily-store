import { getArticles } from "@/lib/shopify";
import Image from "next/image";

export default async function ArticlePage() {
  const articles = await getArticles();
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="mb-12 text-center text-4xl font-bold text-red-400 md:text-6xl lg:text-8xl">
        Latest Articles
      </h1>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <figure className="relative h-60 w-full">
              <Image
                src={article.image.transformedSrc}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </figure>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="mb-3 text-2xl font-semibold transition-colors hover:text-red-400">
                <a
                  href={`/articles/${article.handle}`}
                  className="line-clamp-2"
                >
                  {article.title}
                </a>
              </h2>

              <p className="mb-4 line-clamp-3 flex-1 text-gray-600">
                {article.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <a
                  href={`/articles/${article.handle}`}
                  className="font-medium text-red-400 hover:text-ruby-red"
                >
                  Read more →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
