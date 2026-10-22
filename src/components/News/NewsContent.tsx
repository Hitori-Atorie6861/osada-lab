"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import type { Locale } from "@/i18n/config";

import type { NewsItem } from "@/lib/cms";

import {
  formatNewsDate,
  getCategoryLabel,
} from "@/lib/news";

import NewsCategorySelect from "./NewsCategorySelect";

type Category =
  | "all"
  | "お知らせ"
  | "論文"
  | "受賞"
  | "研究"
  | "イベント"
  | "ゼミ";

type Props = {
  locale: Locale;
  news: NewsItem[];
};

const ITEMS_PER_PAGE = 10;

export default function NewsContent({
  locale,
  news,
}: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("all");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews =
    selectedCategory === "all"
      ? news
      : news.filter((item) =>
          item.category.includes(selectedCategory),
        );

  // カテゴリーを変更したら1ページ目に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // ページ数
  const totalPages = Math.ceil(
    filteredNews.length / ITEMS_PER_PAGE,
  );

  // 現在のページに表示するニュース
  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentNews = filteredNews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      {/* Category Select */}
      <NewsCategorySelect
        locale={locale}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* News List */}
      {filteredNews.length === 0 ? (
        <p className="mt-12 text-text-secondary">
          {locale === "ja"
            ? "該当するニュースはありません。"
            : "No news found."}
        </p>
      ) : (
        <>
          <div className="mt-16 border-t border-border">
            {currentNews.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/news/${item.id}`}
                className="group block border-b border-border py-8 transition-colors"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-12">
                  {/* Date */}
                  <time className="text-sm text-text-secondary md:w-32 md:shrink-0">
                    {formatNewsDate(item.date, locale)}
                  </time>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3">
                    {/* Category */}
                    <div className="flex flex-wrap gap-3">
                      {item.category.map((category) => (
                        <span
                          key={category}
                          className="w-fit text-xs font-medium tracking-wide text-primary"
                        >
                          {getCategoryLabel(
                            category,
                            locale,
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-medium leading-relaxed transition-colors group-hover:text-primary md:text-xl">
                      {item.title}
                    </h2>
                  </div>

                  {/* Arrow */}
                  <span className="hidden text-xl text-text-secondary transition-transform group-hover:translate-x-1 md:block">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label={
                locale === "ja"
                  ? "ページネーション"
                  : "Pagination"
              }
              className="mt-12 flex items-center justify-center gap-2"
            >
              {/* Previous */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1),
                  )
                }
                disabled={currentPage === 1}
                aria-label={
                  locale === "ja"
                    ? "前のページ"
                    : "Previous page"
                }
                className="flex h-9 w-9 items-center justify-center text-sm text-text-secondary transition-colors duration-200 hover:text-primary disabled:cursor-default disabled:opacity-30"
              >
                ←
              </button>

              {/* Page numbers */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1,
              ).map((page) => {
                const isCurrent =
                  currentPage === page;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    aria-current={
                      isCurrent ? "page" : undefined
                    }
                    className={`flex h-9 min-w-9 items-center justify-center px-2 text-sm transition-colors duration-200 ${
                      isCurrent
                        ? "bg-[#EEF3F0] font-medium text-primary"
                        : "text-text-secondary hover:bg-[#F5F7F6] hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages),
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                aria-label={
                  locale === "ja"
                    ? "次のページ"
                    : "Next page"
                }
                className="flex h-9 w-9 items-center justify-center text-sm text-text-secondary transition-colors duration-200 hover:text-primary disabled:cursor-default disabled:opacity-30"
              >
                →
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );
}
