import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  groupPublicationsByYear,
  type PublicationCategory,
  type PublicationItem,
} from "@/lib/cms";
import PageBanner from "@/components/ui/PageBanner";

const categories: PublicationCategory[] = [
  "論文",
  "MISC",
  "書籍等出版物",
  "研究課題",
];

export default function PublicationsPageContent({
  locale,
  dict,
  publications,
  category,
  year,
}: {
  locale: Locale;
  dict: Dictionary;
  publications: PublicationItem[];
  category?: string;
  year?: string;
}) {

  const selectedCategory: PublicationCategory | undefined =
    categories.includes(category as PublicationCategory)
      ? (category as PublicationCategory)
      : undefined;

  const selectedYear =
    year && /^\d{4}$/.test(year) ? Number(year) : undefined;

  const filteredPublications = publications.filter((pub) => {
    const matchesCategory =
      !selectedCategory || pub.category.includes(selectedCategory);

    const matchesYear = !selectedYear || pub.year === selectedYear;

    return matchesCategory && matchesYear;
  });

  const grouped = groupPublicationsByYear(filteredPublications);

  const years = [...grouped.keys()].sort((a, b) => b - a);

  const allYears = [...new Set(publications.map((pub) => pub.year))].sort(
    (a, b) => b - a,
  );

  const createFilterUrl = (
    nextCategory?: PublicationCategory,
    nextYear?: number,
  ) => {
    const params = new URLSearchParams();

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    if (nextYear) {
      params.set("year", String(nextYear));
    }

    const query = params.toString();

    return query
      ? `/${locale}/publications?${query}`
      : `/${locale}/publications`;
  };

  return (
    <main className="bg-white text-text-primary">
      {/* Page Banner */}
      <PageBanner title={dict.publications.title} />

      {/* Publications */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
          {/* Filters */}
          <div className="space-y-6 border-b border-border pb-8">
            {/* Category filter */}
            <div>
              <p className="mb-3 text-sm font-medium text-text-secondary">
                カテゴリー
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href={createFilterUrl(undefined, selectedYear)}
                  className={
                    !selectedCategory
                      ? "text-sm font-medium text-primary"
                      : "text-sm text-text-secondary hover:text-primary"
                  }
                >
                  すべて
                </a>

                {categories.map((item) => (
                  <a
                    key={item}
                    href={createFilterUrl(item, selectedYear)}
                    className={
                      selectedCategory === item
                        ? "text-sm font-medium text-primary"
                        : "text-sm text-text-secondary hover:text-primary"
                    }
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Year filter */}
            <div>
              <p className="mb-3 text-sm font-medium text-text-secondary">
                年
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href={createFilterUrl(selectedCategory, undefined)}
                  className={
                    !selectedYear
                      ? "text-sm font-medium text-primary"
                      : "text-sm text-text-secondary hover:text-primary"
                  }
                >
                  すべて
                </a>

                {allYears.map((item) => (
                  <a
                    key={item}
                    href={createFilterUrl(selectedCategory, item)}
                    className={
                      selectedYear === item
                        ? "text-sm font-medium text-primary"
                        : "text-sm text-text-secondary hover:text-primary"
                    }
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Publications list */}
          {filteredPublications.length === 0 ? (
            <p className="mt-8 text-text-secondary">
              {dict.publications.empty}
            </p>
          ) : (
            <div className="mt-10 space-y-12">
              {years.map((year) => (
                <section key={year}>
                  <h2 className="border-b border-border pb-2 text-lg font-bold text-primary">
                    {year}
                  </h2>

                  <ul className="divide-y divide-border">
                    {(grouped.get(year) ?? []).map((pub) => (
                      <li key={pub.id} className="py-5">
                        {/* Category */}
                        <div className="mb-2 text-xs text-text-secondary">
                          {pub.category.join(" / ")}
                        </div>

                        {/* Title */}
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium leading-relaxed text-text-primary underline-offset-4 hover:text-primary hover:underline"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          <span className="font-medium leading-relaxed text-text-primary">
                            {pub.title}
                          </span>
                        )}

                        {/* Authors */}
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                          {pub.authors}
                        </p>

                        {/* Publication */}
                        {pub.publication && (
                          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                            {pub.publication}
                            {pub.details && `, ${pub.details}`}
                          </p>
                        )}

                        {/* Research project period */}
                        {pub.category.includes("研究課題")&&
                          (pub.startYear || pub.endYear) && (
                            <p className="mt-1 text-sm text-text-secondary">
                              {pub.startYear ?? ""}
                              {"–"}
                              {pub.endYear ?? ""}
                            </p>
                          )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}