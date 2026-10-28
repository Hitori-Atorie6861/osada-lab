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
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1000px] px-6 py-12 md:px-10 md:py-16">
        <Link
          href={`/${locale}/news`}
          className="inline-flex min-h-11 items-center gap-2 text-base text-primary underline-offset-4 hover:underline"
        >
          <span aria-hidden="true">←</span>
          {dict.news.backToList}
        </Link>

        <article className="mt-8 md:mt-12">
          <header className="border-b border-border pb-8 md:pb-10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <time
                dateTime={news.date}
                className="text-base text-text-secondary"
              >
                {formatNewsDate(news.date, locale)}
              </time>

              <div className="flex flex-wrap gap-2">
                {news.category.map((category) => (
                  <span
                    key={category}
                    className="rounded-sm border border-primary/25 px-3 py-1 text-sm text-primary"
                  >
                    {getCategoryLabel(category, locale)}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="mt-6 break-words text-2xl font-medium leading-relaxed text-text-primary md:text-4xl">
              {news.title}
            </h1>
          </header>

          {news.body && (
            <div
              className="rich-text mt-8 break-words text-base leading-loose text-text-primary md:mt-10 [&_iframe]:max-w-full [&_img]:h-auto [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: news.body }}
            />
          )}
        </article>

        <div className="mt-12 border-t border-border pt-6 md:mt-16">
          <Link
            href={`/${locale}/news`}
            className="inline-flex min-h-11 items-center gap-2 text-base text-primary underline-offset-4 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {dict.news.backToList}
          </Link>
        </div>
      </div>
    </div>
  );
}