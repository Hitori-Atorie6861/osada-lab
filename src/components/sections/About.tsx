import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";

type Dict = ReturnType<typeof getDictionary>;

export default function About({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <h2 className="text-2xl font-bold text-text-primary">
            {dict.about.title}
          </h2>
          <div>
            <p className="max-w-2xl text-base leading-loose text-text-primary">
              {dict.about.body}
            </p>
            <Link
              href={`/${locale}/about`}
              className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {dict.about.link} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
