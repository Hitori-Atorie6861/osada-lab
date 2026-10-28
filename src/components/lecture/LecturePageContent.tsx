
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function LecturePageContent({
  dict,
}: {
  dict: Dictionary;
}) {
  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.lecture.pageTitle} />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-16 lg:px-16">
        {/* Course introduction */}
        <section>
          <p className="text-sm font-medium tracking-[0.16em] text-primary">
            COURSE
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight text-primary md:text-4xl">
            {dict.lecture.courseTitle}
          </h2>

          <p className="mt-6 max-w-[900px] text-lg leading-loose text-text-primary">
            {dict.lecture.intro}
          </p>

          <p className="mt-4 max-w-[900px] text-base leading-8 text-text-secondary">
            {dict.lecture.courseIntro}
          </p>
        </section>

        <div className="mt-12 grid items-start gap-12 border-t border-border pt-10 md:mt-16 md:pt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            {/* Course overview */}
            <section>
              <h2 className="flex items-center gap-4 text-2xl font-medium text-primary">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-primary"
                />
                {dict.lecture.overviewTitle}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-secondary">
                {dict.lecture.overview}
              </p>
            </section>

            {/* Key topics */}
            <section className="mt-10 md:mt-12">
              <h2 className="flex items-center gap-4 text-2xl font-medium text-primary">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-primary"
                />
                {dict.lecture.themesTitle}
              </h2>

              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {dict.lecture.themes.map((theme) => (
                  <li
                    key={theme}
                    className="flex items-start gap-3 text-base leading-7 text-text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary/70"
                    />
                    {theme}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Course information */}
          <section className="min-w-0 p-6 md:p-8">
            <h2 className="text-2xl font-medium text-primary">
              {dict.lecture.informationTitle}
            </h2>

            <dl className="mt-5 divide-y divide-primary/10">
              {dict.lecture.information.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 py-4"
                >
                  <dt className="text-base font-medium leading-7 text-text-primary">
                    {item.label}
                  </dt>

                  <dd className="break-words text-base leading-7 text-text-secondary">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="https://syllabus.risyu.saitama-u.ac.jp/syllabusHtml/2026/03/03_A02111_ja_JP.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-between gap-4 border border-primary/30 px-4 py-3 text-base font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {dict.lecture.syllabus}

              <span aria-hidden="true" className="shrink-0">
                ↗
              </span>
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
