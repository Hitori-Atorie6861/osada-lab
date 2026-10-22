import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function AboutPageContent({ dict }: { dict: Dictionary }) {

  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.about.pageTitle} />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          
          {/* Mission */}
          <section>
            <p className="text-sm font-medium tracking-widest text-primary">
              {dict.about.mission.label}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-normal md:text-4xl">
              {dict.about.mission.title}
            </h1>

            <div className="mt-8 space-y-3 text-base leading-normal md:text-lg">
              {dict.about.mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-8 text-xl leading-normal md:text-2xl">
              {dict.about.mission.statement}
            </p>

            <p className="mt-8 text-base leading-normal md:text-lg">
              {dict.about.mission.closing}
            </p>
          </section>

          {/* Vision */}
          <section className="mt-20 border-t border-black/10 pt-16">
            <p className="text-sm font-medium tracking-widest text-primary">
              {dict.about.vision.label}
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-normal md:text-4xl">
              {dict.about.vision.title}
            </h2>

            <div className="mt-8 space-y-3 text-base leading-normal md:text-lg">
              {dict.about.vision.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-8 text-xl leading-normal md:text-2xl">
              {dict.about.vision.statement}
            </p>

            <p className="mt-8 text-base leading-normal md:text-lg">
              {dict.about.vision.closing}
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}