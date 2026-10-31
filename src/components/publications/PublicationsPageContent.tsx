"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type {
  PublicationCategory,
  PublicationItem,
} from "@/lib/cms";
import PageBanner from "@/components/ui/PageBanner";

const categories: PublicationCategory[] = [
  "論文",
  "MISC",
  "書籍等出版物",
  "研究課題",
];

const categoryLabels: Record<PublicationCategory, string> = {
  論文: "Papers",
  MISC: "Miscellaneous",
  書籍等出版物: "Books",
  研究課題: "Research Projects",
};

const PAGE_SIZE = 10;

type Props = {
  locale: Locale;
  dict: Dictionary;
  publications: PublicationItem[];
  category?: string;
  year?: string;
};

export default function PublicationsPageContent({
  locale,
  dict,
  publications,
  category,
  year,
}: Props) {
  const isJa = locale === "ja";

  const [selectedCategory, setSelectedCategory] = useState<
    PublicationCategory | ""
  >(
    categories.includes(category as PublicationCategory)
      ? (category as PublicationCategory)
      : "",
  );

  const [selectedYear, setSelectedYear] = useState(
    year && /^\d{4}$/.test(year) ? year : "",
  );

  const [page, setPage] = useState(1);

  const allYears = [
    ...new Set(publications.map((pub) => pub.year)),
  ].sort((a, b) => b - a);

  const filteredPublications = publications
    .filter((pub) => {
      const matchesCategory =
        selectedCategory === "" ||
        pub.category.includes(selectedCategory);

      const matchesYear =
        selectedYear === "" ||
        pub.year === Number(selectedYear);

      return matchesCategory && matchesYear;
    })
    .sort((a, b) => b.year - a.year);

  const total = filteredPublications.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const visiblePublications = filteredPublications.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const grouped = new Map<number, PublicationItem[]>();

  for (const pub of visiblePublications) {
    const items = grouped.get(pub.year) ?? [];
    items.push(pub);
    grouped.set(pub.year, items);
  }

  const visibleYears = [...grouped.keys()].sort((a, b) => b - a);

  function changePage(nextPage: number) {
    setPage(nextPage);

    document.getElementById("publications-results")?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }

  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.publications.title} />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-16 lg:px-16">
        {/* Filters */}
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)\_180px] lg:gap-12">
          <div>
            <p className="mb-4 text-sm font-medium text-text-secondary">
              {isJa ? "カテゴリー" : "Category"}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={selectedCategory === ""}
                onClick={() => {
                  setSelectedCategory("");
                  setPage(1);
                }}
                className={`min-h-11 rounded-sm border px-5 py-2 text-base transition-colors ${
                  selectedCategory === ""
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {isJa ? "すべて" : "All"}
              </button>

              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selectedCategory === item}
                  onClick={() => {
                    setSelectedCategory(item);
                    setPage(1);
                  }}
                  className={`min-h-11 rounded-sm border px-5 py-2 text-base transition-colors ${
                    selectedCategory === item
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-text-secondary hover:border-primary hover:text-primary"
                  }`}
                >
                  {isJa ? item : categoryLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="publication-year"
              className="mb-4 block text-sm font-medium text-text-secondary"
            >
              {isJa ? "発表年" : "Year"}
            </label>

            <select
              id="publication-year"
              value={selectedYear}
              onChange={(event) => {
                setSelectedYear(event.target.value);
                setPage(1);
              }}
              className="min-h-11 w-full rounded-sm border border-border bg-white px-4 py-2 text-base text-text-primary"
            >
              <option value="">
                {isJa ? "すべての年" : "All years"}
              </option>

              {allYears.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div
          id="publications-results"
          className="scroll-mt-28 pt-8"
        >
          <p
            aria-live="polite"
            className="text-sm text-text-secondary"
          >
            
          {isJa
            ? total === 0
            ?  "該当する業績はありません"
            : `全${total}件中 ${startIndex + 1}〜${Math.min(
            startIndex + PAGE_SIZE,
            total,
            )}件`
          : total === 0
            ? "No matching publications"
          : `${startIndex + 1}–${Math.min(
            startIndex + PAGE_SIZE,
            total,
          )} of ${total} results`}
          </p>


          {total === 0 ? (
            <p className="py-12 text-base text-text-secondary">
              {dict.publications.empty}
            </p>
          ) : (
            <div className="mt-10 space-y-12 md:space-y-16">
              {visibleYears.map((publicationYear) => (
                <section
                  key={publicationYear}
                  className="grid gap-5 md:grid-cols-[100px_minmax(0,1fr)] md:gap-10"
                >
                  <h2 className="text-2xl font-medium text-primary md:pt-7">
                    {publicationYear}
                  </h2>

                  <ul className="min-w-0 divide-y divide-border border-y border-border">
                    {(grouped.get(publicationYear) ?? []).map(
                      (pub) => (
                        <li key={pub.id} className="py-7 md:py-8">
                          <p className="mb-3 text-sm text-text-secondary">
                            {pub.category
                              .map((item) =>
                                isJa
                                  ? item
                                  : categoryLabels[item] ?? item,
                              )
                              .join(" / ")}
                          </p>

                          <h3 className="break-words text-lg font-medium leading-relaxed">
                            {pub.url ? (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline-offset-4 hover:text-primary hover:underline"
                              >
                                {pub.title}
                              </a>
                            ) : (
                              pub.title
                            )}
                          </h3>

                          {pub.authors && (
                            <p className="mt-3 text-base leading-7 text-text-secondary">
                              {pub.authors}
                            </p>
                          )}

                          {(pub.publication || pub.details) && (
                            <p className="mt-2 text-sm leading-7 text-text-secondary">
                              {[pub.publication, pub.details]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          )}

                          {pub.category.includes("研究課題") &&
                            (pub.startYear || pub.endYear) && (
                              <p className="mt-2 text-sm leading-7 text-text-secondary">
                                {pub.startYear ?? ""}
                                {"–"}
                                {pub.endYear ??
                                  (isJa ? "現在" : "Present")}
                              </p>
                            )}
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label={
                isJa ? "研究業績のページ切り替え" : "Pagination"
              }
              className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-8 md:mt-16"
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
                  onClick={() => changePage(pageNumber)}
                  className={`grid h-11 min-w-11 place-items-center rounded-sm border px-3 text-base transition-colors ${
                    currentPage === pageNumber
                      ? "border-primary bg-primary text-white"
                      : "border-border hover:border-primary hover:text-primary"
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
      </div>
    </main>
  );
}