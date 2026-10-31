
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { NewsItem } from "@/lib/cms";
import { formatNewsDate, getCategoryLabel } from "@/lib/news";

type Props = {
  locale: Locale;
  dict: Dictionary;
  news: NewsItem;
};

export default function NewsArticle({
  locale,
  dict,
  news,
}: Props) {
  const isJa = locale === "ja";

  return (
    <main className="min-h-screen bg-white text-text-primary">
      {/* Article Header */}
      <header className="bg-[#F5F7F3]">
        <div className="mx-auto w-full max-w-[1000px] px-4 pb-12 pt-8 sm:px-6 md:px-10 md:pb-20 md:pt-12">
          {/* Breadcrumb */}
          <nav
            aria-label={isJa ? "パンくずリスト" : "Breadcrumb"}
            className="flex flex-wrap items-center gap-2 text-xs text-[#64776A] md:text-sm"
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-[#1F4D3A]"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href={`/${locale}/news`}
              className="transition-colors hover:text-[#1F4D3A]"
            >
              News
            </Link>

            <span aria-hidden="true">/</span>

            <span
              aria-current="page"
              className="text-[#1F4D3A]"
            >
              {isJa ? "記事詳細" : "Article"}
            </span>
          </nav>

          {/* Section Label */}
          <div className="mt-10 flex items-center gap-3 md:mt-14">
            <span className="h-px w-8 bg-[#1F4D3A]" />

            <p className="text-xs font-semibold tracking-[0.2em] text-[#1F4D3A]">
              OSADA LAB / NEWS
            </p>
          </div>

          {/* Article Metadata */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-8">
            <time
              dateTime={news.date}
              className="text-sm font-medium tracking-wide text-[#64776A]"
            >
              {formatNewsDate(news.date, locale)}
            </time>

            {news.category.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {news.category.map((category) => (
                  <span
                    key={category}
                    className="rounded-sm border border-[#1F4D3A]/20 bg-[#E6EEE5] px-3 py-1 text-xs font-medium text-[#1F4D3A]"
                  >
                    {getCategoryLabel(category, locale)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Title */}
          <h1 className="mt-5 max-w-4xl break-words text-2xl font-semibold leading-[1.5] tracking-tight text-[#1F4D3A] sm:text-3xl md:mt-7 md:text-4xl md:leading-[1.45]">
            {news.title}
          </h1>

          {/* Decorative Line */}
          <div className="mt-8 h-[2px] w-16 bg-[#1F4D3A] md:mt-12" />
        </div>
      </header>

      {/* Article Body */}
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6 md:px-10">
        <article className="py-10 md:py-16">
          {news.body ? (
            <div
              className="rich-text news-article-body min-w-0 break-words text-sm leading-8 text-text-primary md:text-base md:leading-loose [&_iframe]:max-w-full [&_img]:h-auto [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: news.body,
              }}
            />
          ) : (
            <p className="text-sm text-text-secondary">
              {isJa
                ? "本文はありません。"
                : "No article content available."}
            </p>
          )}
        </article>

        {/* Footer Navigation */}
        <div className="border-t border-border pb-14 pt-8 md:pb-20 md:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href={`/${locale}/news`}
              className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-[#1F4D3A] transition-colors hover:text-[#2F6B50]"
            >
              <span
                aria-hidden="true"
                className="text-lg transition-transform group-hover:-translate-x-1"
              >
                ←
              </span>

              <span className="border-b border-[#1F4D3A]/30 pb-1 group-hover:border-[#1F4D3A]">
                {dict.news.backToList}
              </span>
            </Link>

            <span className="text-xs font-medium tracking-[0.15em] text-[#8A9A8D]">
              OSADA LAB
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
