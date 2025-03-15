"use client";

import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { format } from "date-fns";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import clsx from "clsx";

interface ArticleClientProps {
  article: {
    title: string;
    publishedAt: string;
    image?: { src: string };
    contentHtml: string;
    tags?: string[];
  };
  publishedDate: Date;
}

gsap.registerPlugin(useGSAP);

const ArticleClient = ({ article, publishedDate }: ArticleClientProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useSplitTextAnimation({ selector: ".split-text-stagger" });

  useGSAP(
    () => {
      if (article) {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isPortrait: "(orientation: portrait)",
            isLandscape: "(orientation: landscape)",
            xl: "(min-width: 1439px) and (orientation: landscape)",
            md: "(min-width: 768px) and (orientation: landscape)",
            sm: "(min-width: 640px)",
            xs: "(min-width: 376px)",
            maxXXs: "(max-width: 767.98px)",
          },
          (context) => {
            gsap.to(".reveal-fade-article", {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power1.inOut",
            });
          }
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [article],
    }
  );

  return (
    <div ref={containerRef}>
      {/* Article Header */}
      <header className="mb-8">
        <h1
          className={clsx(
            "text-3xl sm:text-4xl font-bold text-gray-900 mb-4",
            "split-text-stagger"
          )}
        >
          {article.title}
        </h1>
        <div
          className={clsx("text-sm text-gray-500 mb-6", "split-text-stagger")}
        >
          {format(publishedDate, "MMMM d, yyyy")}
        </div>
      </header>

      <div className="reveal-fade-article opacity-0 translate-y-1/4">
        {/* Featured Image with proper handling */}
        {article.image?.src && (
          <div
            className={clsx(
              "relative w-full aspect-wide mb-8 overflow-hidden rounded-lg shadow-md"
            )}
          >
            <Image
              src={article.image.src}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 75vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-md">
          {parse(article.contentHtml)}
        </article>

        {/* Tags if available */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
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
    </div>
  );
};

export default ArticleClient;
