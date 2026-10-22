import { notFound } from "next/navigation";
import { isLocale } from "./config";
import { getDictionary } from "./dictionaries";

export async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, dict: getDictionary(locale) };
}
