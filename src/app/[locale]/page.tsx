import { resolveLocale } from "@/i18n/resolve-locale";
import HomePage from "@/components/home/HomePage";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);
  return <HomePage locale={locale} dict={dict} />;
}
