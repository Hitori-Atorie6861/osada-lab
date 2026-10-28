"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { NewsItem } from "@/lib/cms";
import { formatNewsDate, getCategoryLabel } from "@/lib/news";
import NewsCategorySelect, {
  type NewsCategory,
} from "./NewsCategorySelect";

type Props = {
  locale: Locale;
  news: NewsItem[];
};

const ITEMS_PER_PAGE = 10;

export default function NewsContent({ locale, news }: Props) {
  const isJa = locale === "ja";

  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory>("all");

  const [page, setPage] = useState(1);

  const filteredNews = news
    .filter(
      (item) =>
        selectedCategory === "all" ||
        item.category.includes(selectedCategory),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  const total = filteredNews.length;
  const totalPages = Math.max(
    1,
    Math.ceil(total / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentNews = filteredNews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  function changePage(nextPage: number) {
    setPage(nextPage);

    document.getElementById("news-results")?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }

  return (
    <div className="pb-4 pt-8 md:pt-12">
      {/* Filters */}
      <NewsCategorySelect
        locale={locale}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setPage(1);
        }}
      />

      {/* Results */}
      <div id="news-results" className="scroll-mt-28 pt-8">
        <p
          aria-live="polite"
          className="text-sm text-text-secondary"
        >
          {total === 0
            ? isJa
              ? "該当するニュースはありません。"
              : "No matching news."
            : isJa
              ? `全${total}件中 ${startIndex + 1}〜${Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  total,
                )}件`
              : `${startIndex + 1}–${Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  total,
                )} of ${total} results`}
        </p>

        {total > 0 && (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {currentNews.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}/news/${encodeURIComponent(item.id)}`}
                  className="group grid gap-4 py-7 transition-colors md:grid-cols-[130px_minmax(0,1fr)_24px] md:gap-8 md:py-8"
                >
                  <time
                    dateTime={item.date}
                    className="text-base leading-7 text-text-secondary"
                  >
                    {formatNewsDate(item.date, locale)}
                  </time>

                  <div className="min-w-0">
                    {item.category.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
                        {item.category.map((category) => (
                          <span
                            key={category}
                            className="text-sm font-medium text-primary"
                          >
                            {getCategoryLabel(category, locale)}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="break-words text-lg font-medium leading-relaxed transition-colors group-hover:text-primary group-hover:underline group-hover:underline-offset-4">
                      {item.title}
                    </h2>
                  </div>

                  <span
                    aria-hidden="true"
                    className="hidden text-xl text-text-secondary transition-transform group-hover:translate-x-1 md:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label={
            isJa ? "ニュースのページ切り替え" : "News pagination"
          }
          className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            className="min-h-11 rounded-sm border border-border px-4 text-sm transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isJa ? "前へ" : "Previous"}
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-current={
                currentPage === pageNumber ? "page" : undefined
              }
              aria-label={
                isJa ? `${pageNumber}ページ目` : `Page ${pageNumber}`
              }
              onClick={() => changePage(pageNumber)}
              className={`grid h-11 min-w-11 place-items-center rounded-sm border px-3 text-base transition-colors ${
                currentPage === pageNumber
                  ? "border-primary bg-primary text-white"
                  : "border-border text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
            className="min-h-11 rounded-sm border border-border px-4 text-sm transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isJa ? "次へ" : "Next"}
          </button>
        </nav>
      )}
    </div>
  );
}