
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";
import ResearchAreasDiagram from "@/components/research/ResearchAreasDiagram";

const researchImages: Record<string, string> = {
  "01": "/osada_sensei.png",
  "02": "/osada_sensei.png",
  "03": "/osada_sensei.png",
  "04": "/osada_sensei.png",
  "05": "/osada_sensei.png",
};

type ResearchPageContentProps = {
  dict: Dictionary;
  locale: "ja" | "en";
};

export default function ResearchPageContent({
  dict,
  locale,
}: ResearchPageContentProps) {
  const { research } = dict;
  const isJa = locale === "ja";

  return (
    <main className="bg-white text-text-primary">
      {/* Page Banner */}
      <PageBanner title={research.pageTitle} />

      <div className="site-container py-16 md:py-24">
        {/* Introduction */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-6xl">
            <p className="text-sm font-medium tracking-[0.15em] text-[#1F4D3A]">
              
            </p>

            <h2 className="mt-5 text-2xl font-medium leading-relaxed md:text-3xl">
              {isJa
                ? "金融を通じて、経済と社会の仕組みを読み解く。"
                : "Understanding the Economy and Society Through Finance."}
            </h2>

            <p className="mt-7 text-base leading-loose text-text-secondary">
              {research.intro}
            </p>
          </div>
        </section>

        {/* Research Areas */}
        <section>
          <div className="border-b border-border pb-6">
            <h2 className="text-3xl font-medium md:text-4xl">
              {research.areasTitle}
            </h2>
          </div>

          {/* Overview */}
          <div className="grid items-center gap-12 py-12 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-16">
            <div>
              <h3 className="text-2xl font-medium md:text-3xl">
                {research.areasOverviewTitle}
              </h3>

              <p className="mt-6 text-base leading-loose text-text-secondary">
                {research.areasOverview}
              </p>
            </div>

            <ResearchAreasDiagram />
          </div>

          {/* Research Area Cards */}
          <div className="mt-4 grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20">
            {research.areas.map((area) => (
              <article
                key={area.number}
                className="flex min-w-0 flex-col"
              >
                {/* Research Image */}
                <div className="aspect-[16/10] overflow-hidden bg-border/40">
                  <img
                    src={researchImages[area.number]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="mt-7 flex flex-1 items-start gap-4">
                  {/* Research Number */}
                  <span className="shrink-0 pt-1 text-sm font-medium tracking-[0.15em] text-[#1F4D3A]">
                    {area.number}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Title */}
                    <h3 className="text-xl font-medium leading-snug md:text-2xl">
                      {area.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-[#1F4D3A]">
                      {area.subtitle}
                    </p>

                    {/* Keywords */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {area.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-[#1F4D3A]/20 bg-[#F0F4F0] px-3 py-1.5 text-xs font-medium text-[#1F4D3A]"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-base leading-loose text-text-secondary">
                      {area.body}
                    </p>

                    {/* Research Question */}
                    {area.question && (
                      <div className="mt-6 border-l-[3px] border-[#1F4D3A] bg-[#F0F4F0] px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1F4D3A]">
                          Research Question
                        </p>

                        <p className="mt-2 text-sm font-medium leading-relaxed text-text-primary">
                          {area.question}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Publications Link - displayed only once */}
          <div className="mt-20 border-t border-border pt-12 text-center md:mt-24 md:pt-16">
            <h3 className="text-2xl font-medium md:text-3xl">
              {isJa ? "研究成果・論文" : "Research Publications"}
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-loose text-text-secondary">
              {isJa
                ? "研究室の研究成果や発表論文については、研究業績ページで紹介しています。"
                : "Explore the laboratory's publications and research outputs on our publications page."}
            </p>

            <Link
              href={`/${locale}/publications`}
              className="group mt-8 inline-flex items-center gap-2 border-b border-[#1F4D3A]/30 pb-1 text-sm font-medium text-[#1F4D3A] transition-colors hover:border-[#1F4D3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F4D3A]"
            >
              {research.publicationsLink}

              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </section>

        {/* Research Methodology */}
        <section className="mt-24 border-t border-border pt-14 md:mt-32 md:pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.15em] text-[#1F4D3A]">
              RESEARCH METHODOLOGY
            </p>

            <h2 className="mt-4 text-3xl font-medium md:text-4xl">
              {research.methodology.title}
            </h2>

            <p className="mt-6 text-base leading-loose text-text-secondary">
              {research.methodology.intro}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {research.methodology.items.map((item, index) => (
              <article
                key={item.title}
                className="border border-border bg-[#F0F4F0] p-7 md:p-8"
              >
                <span className="text-sm font-medium tracking-widest text-[#1F4D3A]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-xl font-medium">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-[#1F4D3A]">
                  {item.subtitle}
                </p>

                <div className="mt-6 h-px w-12 bg-[#1F4D3A]" />

                <p className="mt-6 text-sm leading-loose text-text-secondary">
                  {item.body}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-text-secondary"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Social Collaboration */}
        <section className="mt-20 border-t border-border pt-12 md:mt-28 md:pt-16">
          <h2 className="text-2xl font-medium md:text-3xl">
            {research.collaboration.title}
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-loose text-text-secondary">
            {research.collaboration.intro}
          </p>

          <div className="mt-10 space-y-12 md:mt-14 md:space-y-16">
            {research.collaboration.projects.map((project) => (
              <article
                key={project.title}
                className="grid items-center gap-6 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10"
              >
                {/* Collaboration Image */}
                <div className="aspect-[4/3] overflow-hidden bg-border/40">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Collaboration Description */}
                <div>
                  <p className="text-sm font-medium text-[#1F4D3A]">
                    {project.organization}
                  </p>

                  <h3 className="mt-3 text-xl font-medium leading-snug md:text-2xl">
                    {project.title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-base leading-loose text-text-secondary">
                    {project.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
