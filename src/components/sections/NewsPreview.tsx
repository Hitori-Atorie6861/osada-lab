import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";

import { getNewsList } from "@/lib/microcms";

import {
  formatNewsDate,
  getCategoryLabel,
} from "@/lib/news";

type Dict = ReturnType<typeof getDictionary>;

export default async function NewsPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const news = (await getNewsList()).slice(0, 3);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-primary">
            {dict.news.title}
          </h2>

          <Link
            href={`/${locale}/news`}
            className="text-sm text-primary hover:underline"
          >
            {dict.news.viewMore} →
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-border border-t border-border">
          {news.map((item) => (
            <li key={item.id}>
              <Link
                href={`/${locale}/news/${item.id}`}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-6"
              >
                {/* Date */}
                <span className="text-sm text-text-secondary sm:w-28 sm:shrink-0">
                  {formatNewsDate(item.date, locale)}
                </span>

                {/* Category */}
                <div className="flex flex-wrap gap-2 sm:w-32 sm:shrink-0">
                  {item.category.map((category) => (
                    <span
                      key={category}
                      className="w-fit rounded-sm border border-primary/30 px-2 py-0.5 text-xs text-primary"
                    >
                      {getCategoryLabel(category, locale)}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <span className="text-sm text-text-primary transition-colors hover:text-primary">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}