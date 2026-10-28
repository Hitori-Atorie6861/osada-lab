
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

type MembersPageContentProps = {
  dict: Dictionary;
  locale: "ja" | "en";
};

export default function MembersPageContent({
  dict,
  locale,
}: MembersPageContentProps) {
  const professor = dict.professor;
  const profile = professor.profile;

  return (
    <>
      <PageBanner title={professor.pageTitle} />

      <main className="min-h-screen bg-white text-text-primary">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">

          {/* Basic Information */}
          <section className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:gap-12">
            <div className="relative aspect-[4/5] w-full max-w-[220px] overflow-hidden bg-border">
              <Image
                src="/osadat.jpg"
                alt={professor.name}
                fill
                sizes="(max-width: 768px) 220px, 220px"
                className="object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {professor.title}
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F4D3A] md:text-4xl">
                {professor.name}
              </h1>

              {locale === "ja" && (
                <p className="mt-2 text-sm text-text-secondary">
                  {professor.englishName}
                </p>
              )}

              <p className="mt-6 text-base font-medium">
                {professor.specialty}
              </p>
            </div>
          </section>

          {/* Career */}
          <section className="mt-16 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold text-[#1F4D3A]">
              {profile.backgroundTitle}
            </h2>

            <div className="mt-7 space-y-6">

              {/* Education */}
              <div className="grid gap-2 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold text-text-primary">
                  {profile.educationTitle}
                </h3>

                <div className="space-y-1">
                  {profile.education.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Career History */}
              <div className="grid gap-2 border-t border-border/60 pt-6 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold text-text-primary">
                  {profile.careerTitle}
                </h3>

                <div className="space-y-1">
                  {profile.career.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* University Positions */}
              <div className="grid gap-2 border-t border-border/60 pt-6 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold text-text-primary">
                  {profile.universityTitle}
                </h3>

                <div className="space-y-1">
                  {profile.universityPositions.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* International Research Experience */}
          <section className="mt-14 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold text-[#1F4D3A]">
              {profile.visitingTitle}
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              {profile.visitingNote}
            </p>

            <div className="mt-6 space-y-2">
              {profile.visiting.map((item, index) => (
                <p
                  key={index}
                  className="text-sm leading-7 text-text-primary/80"
                >
                  <span className="font-medium text-text-primary">
                    {item.organization}
                  </span>
                  <span className="ml-2 text-text-secondary">
                    {item.location}
                  </span>
                </p>
              ))}
            </div>
          </section>

          {/* Research & Academic Activities */}
          <section className="mt-14 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold text-[#1F4D3A]">
              {profile.academicTitle}
            </h2>

            <div className="mt-7 space-y-6">

              {/* Research Fields */}
              <div className="grid gap-2 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold text-text-primary">
                  {profile.researchTitle}
                </h3>

                <p className="text-sm leading-7 text-text-primary/80">
                  {profile.researchFields.join("・")}
                </p>
              </div>

              {/* Academic Society Positions */}
              <div className="grid gap-2 border-t border-border/60 pt-6 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold text-text-primary">
                  {profile.societyRoleTitle}
                </h3>

                <div className="space-y-1">
                  {profile.societyRoles.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Academic Society Memberships */}
              <div className="grid gap-2 border-t border-border/60 pt-6 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold text-text-primary">
                  {profile.societiesTitle}
                </h3>

                <p className="text-sm leading-7 text-text-primary/80">
                  {profile.societies.join(
                    locale === "ja" ? "、" : ", "
                  )}
                </p>
              </div>
            </div>

            {/* Publications Link */}
            <div className="mt-10">
              <Link
                href={`/${locale}/publications`}
                className="group inline-flex items-center gap-2 border-b border-[#1F4D3A]/30 pb-1 text-sm font-medium text-[#1F4D3A] transition-colors hover:border-[#1F4D3A]"
              >
                {profile.publicationsLink}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
