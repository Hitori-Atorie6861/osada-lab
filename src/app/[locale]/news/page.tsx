import { resolveLocale } from "@/i18n/resolve-locale";
import { getNewsList } from "@/lib/cms";
import PageBanner from "@/components/ui/PageBanner";
import NewsContent from "@/components/News/NewsContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "news");
}


export const revalidate = 60;

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);
  const news = await getNewsList();

  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.news.pageTitle} />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* 説明文 */}
        <div className="max-w-3xl">
          <p className="mt-4 text-text-[#1B3A2F]">
            {locale === "ja"
              ? "研究室からのお知らせ"
              : "News and updates from the laboratory."}
          </p>
        </div>

        {/* NEWSのカテゴリ選択・一覧 */}
        <NewsContent locale={locale} news={news} />
      </section>
    </main>
  );
}
