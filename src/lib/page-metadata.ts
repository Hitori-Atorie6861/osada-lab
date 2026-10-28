
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type NavPageKey =
  | "about"
  | "research"
  | "seminar"
  | "members"
  | "publications"
  | "news"
  | "lecture"
  | "contact";

type PageKey = NavPageKey | "professor";

export async function createPageMetadata(
  params: Promise<{ locale: string }>,
  page: PageKey
): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  const title =
    page === "professor"
      ? dict.professor.pageTitle
      : dict.nav[page];

  return {
    title,
  };
}
