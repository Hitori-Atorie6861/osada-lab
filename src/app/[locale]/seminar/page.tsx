import { resolveLocale } from "@/i18n/resolve-locale";
import SeminarPageContent from "@/components/seminar/SeminarPageContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "seminar");
}


export default async function SeminarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);
  return <SeminarPageContent dict={dict} />;
}
