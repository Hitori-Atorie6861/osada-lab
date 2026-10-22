import { resolveLocale } from "@/i18n/resolve-locale";
import MembersPageContent from "@/components/members/MembersPageContent";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await resolveLocale(params);
  return <MembersPageContent dict={dict} />;
}
