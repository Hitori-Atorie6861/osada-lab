import Link from "next/link";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  formatNewsDate,
  getCategoryLabel,
  } from "@/lib/news";
import {
  getNewsDetail,
  getNewsList,
} from "@/lib/microcms"
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const news = await getNewsList();
    return news.flatMap((item) =>
      ["ja", "en"].map((locale) => ({ locale, id: item.id })),
    );
  } catch {
    return [];
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  let news;
  try {
    news = await getNewsDetail(id);
  } catch {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
        <Link
          href={`/${locale}/news`}
          className="text-sm text-primary hover:underline"
        >
          ← {dict.news.backToList}
        </Link>

        <article className="mt-8">
          <div className="flex flex-wrap items-center gap-4">
            <time
              dateTime={news.date}
              className="text-sm text-text-secondary"
            >
              {formatNewsDate(news.date, locale)}
            </time>
            <div className="flex flex-wrap gap-2">
              {news.category.map((category) => (
                <span
                  key={category}
                  className="rounded-sm border border-primary/30 px-2 py-0.5 text-xs text-primary"
                >
                  {getCategoryLabel(category, locale)}
                </span>
              ))}
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-text-primary">
            {news.title}
          </h1>

          {news.body && (
            <div
              className="rich-text mt-8 text-base leading-loose text-text-primary"
              dangerouslySetInnerHTML={{ __html: news.body }}
            />
          )}
        </article>
      </div>
    </div>
  );
}
