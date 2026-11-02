
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { NewsListItem } from "@/lib/cms/news";
import { formatNewsDate, getCategoryLabel } from "@/lib/news";
import NewsCategorySelect, {
  type NewsCategory,
} from "./NewsCategorySelect";

type Props = {
  locale: Locale;
  news: NewsListItem[];
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
    <div className="pb-4 pt-5 md:pt-12">
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
      <div
        id="news-results"
        className="scroll-mt-24 pt-6 md:scroll-mt-28 md:pt-8"
      >
        <p
          aria-live="polite"
          className="text-xs text-text-secondary md:text-sm"
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
          <ul className="mt-4 divide-y divide-border border-y border-border md:mt-6">
            {currentNews.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}/news/${encodeURIComponent(item.id)}`}
                  className="group grid min-w-0 gap-2 py-5 transition-colors md:grid-cols-[130px_minmax(0,1fr)_24px] md:gap-8 md:py-8"
                >
                  {/* Date */}
                  <time
                    dateTime={item.date}
                    className="text-sm leading-6 text-text-secondary md:text-base md:leading-7"
                  >
                    {formatNewsDate(item.date, locale)}
                  </time>

                  {/* Content */}
                  <div className="min-w-0">
                    {item.category.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 md:mb-3 md:gap-x-4 md:gap-y-2">
                        {item.category.map((category) => (
                          <span
                            key={category}
                            className="text-xs font-medium text-primary md:text-sm"
                          >
                            {getCategoryLabel(category, locale)}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="break-words text-base font-medium leading-relaxed transition-colors group-hover:text-primary group-hover:underline group-hover:underline-offset-4 md:text-lg">
                      {item.title}
                    </h2>
                  </div>

                  {/* Arrow */}
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
          className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-12"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            className="min-h-11 rounded-sm border border-border px-3 text-sm transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-30 md:px-4"
          >
            {isJa ? "前へ" : "Previous"}
          </button>

          {/* Page Numbers */}
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
                isJa
                  ? `${pageNumber}ページ目`
                  : `Page ${pageNumber}`
              }
              onClick={() => changePage(pageNumber)}
              className={`grid h-11 min-w-11 place-items-center rounded-sm border px-3 text-sm transition-colors md:text-base ${
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
            className="min-h-11 rounded-sm border border-border px-3 text-sm transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-30 md:px-4"
          >
            {isJa ? "次へ" : "Next"}
          </button>
        </nav>
      )}
    </div>
  );
}
