import Link from "next/link";
import Image from "next/image";

import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";

type Dict = ReturnType<typeof getDictionary>;

export default function MembersPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const professor = dict.professor;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-lg md:py-xl">
        <h2 className="text-2xl font-bold text-primary">
          {dict.members.title}
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-[240px_1fr] md:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-sm bg-border">
            <Image
              src="/osadat.jpg"
              alt={professor.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xl font-bold text-text-primary">
              {professor.name}
            </p>

            <p className="mt-1 text-sm font-medium text-primary">
              {professor.title}
            </p>

            <p className="mt-4 text-sm text-text-secondary">
              {professor.specialty}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-loose text-text-primary">
              {professor.bio}
            </p>

            <Link
              href={`/${locale}/members`}
              className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {dict.members.viewMore} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}