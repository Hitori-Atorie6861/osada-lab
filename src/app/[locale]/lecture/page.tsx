import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/resolve-locale";
import { createPageMetadata } from "@/lib/page-metadata";
import LecturePageContent from "@/components/lecture/LecturePageContent";

// Page Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "lecture");
}

// Lecture Page
export default async function LecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);

  return <LecturePageContent dict={dict} />;
}