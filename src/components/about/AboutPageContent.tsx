
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function AboutPageContent({
  dict,
}: {
  dict: Dictionary;
}) {
  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.about.pageTitle} />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:py-20">

          {/* Mission */}
          <section>
            <p className="text-xs font-medium tracking-widest text-primary md:text-sm">
              {dict.about.mission.label}
            </p>

            <h1 className="mt-3 text-2xl font-bold leading-relaxed md:mt-4 md:text-4xl md:leading-normal">
              {dict.about.mission.title}
            </h1>

            <div className="mt-5 space-y-4 text-sm leading-7 text-text-primary md:mt-8 md:space-y-3 md:text-lg md:leading-normal">
              {dict.about.mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-6 text-lg font-medium leading-relaxed md:mt-8 md:text-2xl md:font-normal md:leading-normal">
              {dict.about.mission.statement}
            </p>

            <p className="mt-5 text-sm leading-7 md:mt-8 md:text-lg md:leading-normal">
              {dict.about.mission.closing}
            </p>
          </section>

          {/* Vision */}
          <section className="mt-12 border-t border-black/10 pt-10 md:mt-20 md:pt-16">
            <p className="text-xs font-medium tracking-widest text-primary md:text-sm">
              {dict.about.vision.label}
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-relaxed md:mt-4 md:text-4xl md:leading-normal">
              {dict.about.vision.title}
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-text-primary md:mt-8 md:space-y-3 md:text-lg md:leading-normal">
              {dict.about.vision.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-6 text-lg font-medium leading-relaxed md:mt-8 md:text-2xl md:font-normal md:leading-normal">
              {dict.about.vision.statement}
            </p>

            <p className="mt-5 text-sm leading-7 md:mt-8 md:text-lg md:leading-normal">
              {dict.about.vision.closing}
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
