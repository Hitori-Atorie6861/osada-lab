import { resolveLocale } from "@/i18n/resolve-locale";
import SeminarPageContent from "@/components/seminar/SeminarPageContent";

export default async function SeminarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);
  return <SeminarPageContent dict={dict} />;
}
