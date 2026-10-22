import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";
import ResearchAreasDiagram from "@/components/research/ResearchAreasDiagram";

export default function ResearchPageContent({ dict }: { dict: Dictionary }) {

  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.research.pageTitle} />

      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Research Areas */}
        <section>
          <div className="border-b border-border pb-6">
            <h2 className="text-2xl font-medium text-text-primary md:text-3xl">
              {dict.research.areasTitle}
            </h2>
          </div>

          {/* Overview */}
          <div className="grid gap-16 py-16 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <h3 className="text-2xl font-medium text-text-primary">
                {dict.research.areasOverviewTitle}
              </h3>

              <p className="mt-6 text-base leading-loose text-text-secondary">
                {dict.research.areasOverview}
              </p>
            </div>

            <ResearchAreasDiagram />
          </div>

          {/* Research Area List */}
          <div className="mt-8">
            {dict.research.areas.map((area) => (
              <article
                key={area.number}
                className="border-b border-border py-16 first:pt-0"
              >
                {/* Title */}
                <div>
                  <p className="text-sm font-medium tracking-[0.2em] text-[#1F4D3A]">
                    {area.number}
                  </p>

                  <h3 className="mt-4 text-2xl font-medium text-text-primary md:text-3xl">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-base text-text-secondary">
                    {area.subtitle}
                  </p>
                </div>

                {/* Photo + Description */}
                <div className="mt-10 grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
                  {/* Photo */}
                  <div className="aspect-[4/3] overflow-hidden bg-border/40">
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm tracking-widest text-text-secondary">
                        PHOTO
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-center">
                    <p className="text-base leading-loose text-text-secondary">
                      {area.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Industry Collaboration */}
        <section className="mt-32">
          <div className="border-b border-border pb-6">
            <h2 className="text-2xl font-medium text-text-primary md:text-3xl">
              {dict.research.collaboration.title}
            </h2>
          </div>

          {/* Collaboration Introduction */}
          <div className="max-w-3xl py-16">
            <p className="text-sm font-medium tracking-[0.2em] text-[#1F4D3A]">
              COLLABORATION
            </p>

            <h3 className="mt-5 text-3xl font-medium text-text-primary md:text-4xl">
              {dict.research.collaboration.headline}
            </h3>

            <p className="mt-8 text-base leading-loose text-text-secondary">
              {dict.research.collaboration.intro}
            </p>
          </div>

          {/* Research × Practice */}
          <div className="border-t border-border pt-12">
            <p className="text-sm font-medium tracking-[0.2em] text-[#1F4D3A]">
              {dict.research.collaboration.approach.label}
            </p>

            <h3 className="mt-4 text-2xl font-medium text-text-primary md:text-3xl">
              {dict.research.collaboration.approach.title}
            </h3>

            <div className="mt-12">
              {dict.research.collaboration.approach.items.map((item) => (
                <article
                  key={item.number}
                  className="grid gap-6 border-b border-border py-10 md:grid-cols-[80px_1fr_2fr] md:gap-10"
                >
                  <p className="text-sm font-medium tracking-[0.2em] text-[#1F4D3A]">
                    {item.number}
                  </p>

                  <h4 className="text-lg font-medium text-text-primary">
                    {item.title}
                  </h4>

                  <p className="text-base leading-loose text-text-secondary">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mt-24">
            <div className="border-b border-border pb-6">
              <h3 className="text-2xl font-medium text-text-primary md:text-3xl">
                {dict.research.collaboration.projectsTitle}
              </h3>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-loose text-text-secondary">
              {dict.research.collaboration.projectsIntro}
            </p>

            <div className="mt-12 border-t border-border">
              {dict.research.collaboration.projects.map(
                (project, index) => (
                  <article
                    key={project.name}
                    className="grid gap-6 border-b border-border py-10 md:grid-cols-[80px_1fr_2fr] md:gap-10"
                  >
                    {/* Number */}
                    <p className="text-sm font-medium tracking-[0.2em] text-[#1F4D3A]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {/* Project */}
                    <div>
                      <h4 className="text-lg font-medium text-text-primary">
                        {project.name}
                      </h4>

                      <p className="mt-2 text-sm text-text-secondary">
                        {project.category}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-base leading-loose text-text-secondary">
                      {project.body}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}