import { resolveLocale } from "@/i18n/resolve-locale";
import { getPublicationsList } from "@/lib/cms";
import PublicationsPageContent from "@/components/publications/PublicationsPageContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "publications");
}


export const revalidate = 60;

export default async function PublicationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    year?: string;
  }>;
}) {
  const { locale, dict } = await resolveLocale(params);
  const { category, year } = await searchParams;
  const publications = await getPublicationsList();

  return (
    <PublicationsPageContent
      locale={locale}
      dict={dict}
      publications={publications}
      category={category}
      year={year}
    />
  );
}
