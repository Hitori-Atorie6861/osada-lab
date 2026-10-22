import { resolveLocale } from "@/i18n/resolve-locale";
import AboutPageContent from "@/components/about/AboutPageContent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);
  return <AboutPageContent dict={dict} />;
}
