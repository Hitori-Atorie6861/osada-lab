import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function LecturePageContent({ dict }: { dict: Dictionary }) {

  return (
    <main className="bg-white">
      <PageBanner title={dict.lecture.pageTitle} />

      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        {/* Course introduction */}
        <section>
          <p className="text-sm font-medium tracking-[0.16em] text-accent">
            COURSE
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            {dict.lecture.courseTitle}
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
            {dict.lecture.intro}
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-8 text-text-secondary md:text-base">
            {dict.lecture.courseIntro}
          </p>
        </section>

        {/* Course overview */}
        <section className="mt-20 md:mt-24">
          <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
            {dict.lecture.overviewTitle}
          </h2>

          <p className="mt-6 max-w-3xl text-sm leading-8 text-text-secondary md:text-base">
            {dict.lecture.overview}
          </p>
        </section>

        {/* Key topics */}
        <section className="mt-20 md:mt-24">
          <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
            {dict.lecture.themesTitle}
          </h2>

          <div className="mt-7 flex max-w-3xl flex-wrap gap-x-8 gap-y-3">
            {dict.lecture.themes.map((theme) => (
              <span
                key={theme}
                className="text-sm text-text-secondary md:text-base"
              >
                {theme}
              </span>
            ))}
          </div>
        </section>

        {/* Course information */}
        <section className="mt-20 md:mt-24">
          <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
            {dict.lecture.informationTitle}
          </h2>

          <dl className="mt-7 max-w-3xl">
            {dict.lecture.information.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-1 gap-1 border-b border-border/70 py-4 md:grid-cols-[180px_1fr] md:gap-8"
              >
                <dt className="text-sm font-medium text-text-primary">
                  {item.label}
                </dt>

                <dd className="text-sm leading-7 text-text-secondary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Syllabus */}
        <section className="mt-10">
          <a
            href="https://syllabus.risyu.saitama-u.ac.jp/syllabusHtml/2026/03/03_A02111_ja_JP.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-text-primary transition-opacity hover:opacity-60"
          >
            {dict.lecture.syllabus}
            <span className="ml-2">↗</span>
          </a>
        </section>
      </div>
    </main>
  );
}