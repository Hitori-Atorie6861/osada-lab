import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function MembersPageContent({ dict }: { dict: Dictionary }) {
  const professor = dict.professor;

  return (
    <>
      <PageBanner title={professor.pageTitle} />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Professor */}
          <section className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
            {/* Photo */}
            <div>
              <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-sm bg-border">
                <Image
                  src="/osadat.jpg"
                  alt={professor.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Basic information */}
            <div className="flex flex-col justify-center">
              <p className="text-sm tracking-wide text-text-primary/60">
                {professor.title}
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
                {professor.name}
              </h1>

              <p className="mt-4 text-base text-text-primary/70">
                {professor.specialty}
              </p>

              <p className="mt-6 max-w-xl text-base leading-8 text-text-primary/80">
                {professor.bio}
              </p>
            </div>
          </section>

          {/* Profile */}
          <section className="mt-24">
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                {professor.profile.title}
              </h2>

              <div className="mt-10 space-y-12">
                {/* Career */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {professor.profile.careerTitle}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {professor.profile.career.map((item, index) => (
                      <p
                        key={index}
                        className="text-base leading-8 text-text-primary/80"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Visiting positions */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {professor.profile.visitingTitle}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {professor.profile.visiting.map((item, index) => (
                      <p
                        key={index}
                        className="text-base leading-8 text-text-primary/80"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Specialty */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {professor.profile.specialtyTitle}
                  </h3>

                  <p className="mt-5 text-base leading-8 text-text-primary/80">
                    {professor.profile.specialtyBody}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}