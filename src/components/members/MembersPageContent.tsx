
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
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-20">

          {/* Basic Information */}
          <section className="grid min-w-0 gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:gap-12">
            <div className="relative aspect-[4/5] w-full max-w-[180px] overflow-hidden bg-border sm:max-w-[220px]">
              <Image
                src="/osadat.jpg"
                alt={professor.name}
                fill
                sizes="(max-width: 640px) 180px, 220px"
                className="object-cover"
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="break-words text-xs leading-relaxed text-text-secondary md:text-sm">
                {professor.title}
              </p>

              <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#1F4D3A] md:mt-3 md:text-4xl">
                {professor.name}
              </h1>

              {locale === "ja" && (
                <p className="mt-2 text-sm text-text-secondary">
                  {professor.englishName}
                </p>
              )}

              <p className="mt-4 break-words text-sm font-medium md:mt-6 md:text-base">
                {professor.specialty}
              </p>
            </div>
          </section>

          {/* Career */}
          <section className="mt-10 border-t border-border pt-6 md:mt-16 md:pt-8">
            <h2 className="text-xl font-semibold text-[#1F4D3A] md:text-2xl">
              {profile.backgroundTitle}
            </h2>

            <div className="mt-5 space-y-5 md:mt-7 md:space-y-6">

              {/* Education */}
              <div className="grid min-w-0 gap-2 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="text-sm font-semibold text-text-primary md:text-base">
                  {profile.educationTitle}
                </h3>

                <div className="min-w-0 space-y-1">
                  {profile.education.map((item, index) => (
                    <p
                      key={index}
                      className="break-words text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Career History */}
              <div className="grid min-w-0 gap-2 border-t border-border/60 pt-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8 md:pt-6">
                <h3 className="text-sm font-semibold text-text-primary md:text-base">
                  {profile.careerTitle}
                </h3>

                <div className="min-w-0 space-y-1">
                  {profile.career.map((item, index) => (
                    <p
                      key={index}
                      className="break-words text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* University Positions */}
              <div className="grid min-w-0 gap-2 border-t border-border/60 pt-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8 md:pt-6">
                <h3 className="text-sm font-semibold text-text-primary md:text-base">
                  {profile.universityTitle}
                </h3>

                <div className="min-w-0 space-y-1">
                  {profile.universityPositions.map((item, index) => (
                    <p
                      key={index}
                      className="break-words text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* International Research Experience */}
          <section className="mt-10 border-t border-border pt-6 md:mt-14 md:pt-8">
            <h2 className="text-xl font-semibold text-[#1F4D3A] md:text-2xl">
              {profile.visitingTitle}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {profile.visitingNote}
            </p>

            <div className="mt-5 space-y-3 md:mt-6 md:space-y-2">
              {profile.visiting.map((item, index) => (
                <p
                  key={index}
                  className="break-words text-sm leading-7 text-text-primary/80"
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
          <section className="mt-10 border-t border-border pt-6 md:mt-14 md:pt-8">
            <h2 className="text-xl font-semibold text-[#1F4D3A] md:text-2xl">
              {profile.academicTitle}
            </h2>

            <div className="mt-5 space-y-5 md:mt-7 md:space-y-6">

              {/* Research Fields */}
              <div className="grid min-w-0 gap-2 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                <h3 className="text-sm font-semibold text-text-primary md:text-base">
                  {profile.researchTitle}
                </h3>

                <p className="min-w-0 break-words text-sm leading-7 text-text-primary/80">
                  {profile.researchFields.join("・")}
                </p>
              </div>

              {/* Academic Society Positions */}
              <div className="grid min-w-0 gap-2 border-t border-border/60 pt-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8 md:pt-6">
                <h3 className="text-sm font-semibold text-text-primary md:text-base">
                  {profile.societyRoleTitle}
                </h3>

                <div className="min-w-0 space-y-1">
                  {profile.societyRoles.map((item, index) => (
                    <p
                      key={index}
                      className="break-words text-sm leading-7 text-text-primary/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Academic Society Memberships */}
              <div className="grid min-w-0 gap-2 border-t border-border/60 pt-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8 md:pt-6">
                <h3 className="text-sm font-semibold text-text-primary md:text-base">
                  {profile.societiesTitle}
                </h3>

                <p className="min-w-0 break-words text-sm leading-7 text-text-primary/80">
                  {profile.societies.join(
                    locale === "ja" ? "、" : ", "
                  )}
                </p>
              </div>
            </div>

            {/* Publications Link */}
            <div className="mt-8 md:mt-10">
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
