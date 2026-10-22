import { resolveLocale } from "@/i18n/resolve-locale";
import ResearchPageContent from "@/components/research/ResearchPageContent";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);
  return <ResearchPageContent dict={dict} />;
}
