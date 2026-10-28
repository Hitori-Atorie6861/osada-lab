
import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/resolve-locale";
import { createPageMetadata } from "@/lib/page-metadata";
import MembersPageContent from "@/components/members/MembersPageContent";

// Page Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "professor");
}

// Members Page
export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);

  return <MembersPageContent dict={dict} locale={locale} />;
}
