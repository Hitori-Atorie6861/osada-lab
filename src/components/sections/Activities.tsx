import type { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

type Dict = ReturnType<typeof getDictionary>;

export default function Activities({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
        <h2 className="text-2xl font-bold text-primary">
          {dict.activities.title}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {dict.activities.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-sm border border-border bg-white p-md"
            >
              <span className="text-xs font-medium text-text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-3 text-lg font-medium text-text-primary">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/research`}
          className="mt-8 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {locale === "ja" ? "研究活動を見る" : "View Research"} →
        </Link>
      </div>
    </section>
  );
}
