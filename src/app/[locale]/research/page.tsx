
import { resolveLocale } from "@/i18n/resolve-locale";
import ResearchPageContent from "@/components/research/ResearchPageContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "research");
}


export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);

  return <ResearchPageContent dict={dict} locale={locale} />;
}
