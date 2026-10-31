
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

      <div className="site-container py-10 md:py-24">
        {/* Introduction */}
        <section className="pb-12 md:pb-24">
          <div className="max-w-6xl">
            <h2 className="text-xl font-medium leading-relaxed md:mt-5 md:text-3xl">
              {isJa
                ? "金融を通じて、経済と社会の仕組みを読み解く。"
                : "Understanding the Economy and Society Through Finance."}
            </h2>

            <p className="mt-5 text-sm leading-7 text-text-secondary md:mt-7 md:text-base md:leading-loose">
              {research.intro}
            </p>
          </div>
        </section>

        {/* Research Areas */}
        <section>
          <div className="border-b border-border pb-4 md:pb-6">
            <h2 className="text-2xl font-medium md:text-4xl">
              {research.areasTitle}
            </h2>
          </div>

          {/* Overview */}
          <div className="grid min-w-0 items-center gap-6 py-8 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-16">
            <div className="min-w-0">
              <h3 className="text-xl font-medium md:text-3xl">
                {research.areasOverviewTitle}
              </h3>

              <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
                {research.areasOverview}
              </p>
            </div>

            <div className="min-w-0 overflow-hidden">
              <ResearchAreasDiagram />
            </div>
          </div>

          {/* Research Area Cards */}
          <div className="mt-2 grid gap-x-10 gap-y-10 md:mt-4 md:grid-cols-2 md:gap-y-20">
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

                <div className="mt-5 flex flex-1 items-start gap-3 md:mt-7 md:gap-4">
                  {/* Research Number */}
                  <span className="shrink-0 pt-1 text-xs font-medium tracking-[0.15em] text-[#1F4D3A] md:text-sm">
                    {area.number}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Title */}
                    <h3 className="break-words text-lg font-medium leading-snug md:text-2xl">
                      {area.title}
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-relaxed text-[#1F4D3A] md:text-sm">
                      {area.subtitle}
                    </p>

                    {/* Keywords */}
                    <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                      {area.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="max-w-full break-words rounded-full border border-[#1F4D3A]/20 bg-[#F0F4F0] px-3 py-1.5 text-xs font-medium text-[#1F4D3A]"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
                      {area.body}
                    </p>

                    {/* Research Question */}
                    {area.question && (
                      <div className="mt-5 border-l-[3px] border-[#1F4D3A] bg-[#F0F4F0] px-4 py-4 md:mt-6 md:px-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1F4D3A]">
                          Research Question
                        </p>

                        <p className="mt-2 break-words text-sm font-medium leading-relaxed text-text-primary">
                          {area.question}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Publications Link */}
          <div className="mt-12 border-t border-border pt-8 text-center md:mt-24 md:pt-16">
            <h3 className="text-xl font-medium md:text-3xl">
              {isJa
                ? "研究成果・論文"
                : "Research Publications"}
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:mt-5 md:text-base md:leading-loose">
              {isJa
                ? "研究室の研究成果や発表論文については、研究業績ページで紹介しています。"
                : "Explore the laboratory's publications and research outputs on our publications page."}
            </p>

            <Link
              href={`/${locale}/publications`}
              className="group mt-6 inline-flex items-center gap-2 border-b border-[#1F4D3A]/30 pb-1 text-sm font-medium text-[#1F4D3A] transition-colors hover:border-[#1F4D3A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F4D3A] md:mt-8"
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
        <section className="mt-14 border-t border-border pt-10 md:mt-32 md:pt-20">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.15em] text-[#1F4D3A] md:text-sm">
              RESEARCH METHODOLOGY
            </p>

            <h2 className="mt-3 text-2xl font-medium md:mt-4 md:text-4xl">
              {research.methodology.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
              {research.methodology.intro}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
            {research.methodology.items.map((item, index) => (
              <article
                key={item.title}
                className="min-w-0 border border-border bg-[#F0F4F0] p-5 md:p-8"
              >
                <span className="text-xs font-medium tracking-widest text-[#1F4D3A] md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 break-words text-lg font-medium md:mt-5 md:text-xl">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-[#1F4D3A]">
                  {item.subtitle}
                </p>

                <div className="mt-5 h-px w-12 bg-[#1F4D3A] md:mt-6" />

                <p className="mt-5 text-sm leading-7 text-text-secondary md:mt-6 md:leading-loose">
                  {item.body}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="max-w-full break-words rounded-full border border-border bg-white px-3 py-1.5 text-xs text-text-secondary"
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
        <section className="mt-14 border-t border-border pt-10 md:mt-28 md:pt-16">
          <h2 className="text-2xl font-medium md:text-3xl">
            {research.collaboration.title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
            {research.collaboration.intro}
          </p>

          <div className="mt-8 space-y-10 md:mt-14 md:space-y-16">
            {research.collaboration.projects.map((project) => (
              <article
                key={project.title}
                className="grid min-w-0 items-center gap-5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10"
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
                <div className="min-w-0">
                  <p className="break-words text-xs font-medium text-[#1F4D3A] md:text-sm">
                    {project.organization}
                  </p>

                  <h3 className="mt-2 break-words text-lg font-medium leading-snug md:mt-3 md:text-2xl">
                    {project.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary md:mt-5 md:text-base md:leading-loose">
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
