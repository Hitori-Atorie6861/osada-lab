import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";

type Dict = ReturnType<typeof getDictionary>;

export default function Seminar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <div>
            
            <h2 className="mt-3 text-2xl font-bold text-primary">
              {dict.seminar.pageTitle}
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-loose text-text-primary">
              {dict.seminar.intro}
            </p>

            <Link
              href={`/${locale}/seminar`}
              className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {locale === "ja" ? "ゼミ活動を見る" : "View Seminar"} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}