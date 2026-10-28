
import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/resolve-locale";
import { createPageMetadata } from "@/lib/page-metadata";
import AboutPageContent from "@/components/about/AboutPageContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createPageMetadata(params, "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);

  return <AboutPageContent dict={dict} />;
}
