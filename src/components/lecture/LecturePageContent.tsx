
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function LecturePageContent({
  dict,
}: {
  dict: Dictionary;
}) {
  return (
    <main className="bg-white text-[#29352F]">
      <PageBanner title={dict.lecture.pageTitle} />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 md:px-10 md:py-16 lg:px-16">

        {/* Course Introduction */}
        <section>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-7 shrink-0 bg-[#1F4D3A]"
            />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#1F4D3A] md:text-sm md:tracking-[0.16em]">
              COURSE
            </p>
          </div>

          <h2 className="mt-4 break-words text-2xl font-semibold leading-snug tracking-tight text-[#1F4D3A] sm:text-3xl md:text-4xl">
            {dict.lecture.courseTitle}
          </h2>

          <p className="mt-5 max-w-[900px] text-base leading-8 text-[#29352F] md:mt-6 md:text-lg md:leading-loose">
            {dict.lecture.intro}
          </p>

          <p className="mt-4 max-w-[900px] text-sm leading-7 text-[#58665D] md:text-base md:leading-8">
            {dict.lecture.courseIntro}
          </p>
        </section>

        {/* Main Content */}
        <div className="mt-10 grid min-w-0 items-start gap-10 border-t border-[#DCE5DC] pt-8 md:mt-16 md:gap-12 md:pt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">

          {/* Left Column */}
          <div className="min-w-0">

            {/* Course Overview */}
            <section>
              <h2 className="flex items-center gap-3 text-xl font-semibold text-[#1F4D3A] md:gap-4 md:text-2xl">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-[#1F4D3A]"
                />
                {dict.lecture.overviewTitle}
              </h2>

              <p className="mt-4 break-words text-sm leading-8 text-[#45544A] md:mt-5 md:text-base">
                {dict.lecture.overview}
              </p>
            </section>

            {/* Key Topics */}
            <section className="mt-10 md:mt-12">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-[#1F4D3A] md:gap-4 md:text-2xl">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-[#1F4D3A]"
                />
                {dict.lecture.themesTitle}
              </h2>

              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 md:mt-6">
                {dict.lecture.themes.map((theme) => (
                  <li
                    key={theme}
                    className="flex min-w-0 items-start gap-3 text-sm leading-7 text-[#45544A] md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F4D3A]/70"
                    />
                    <span className="min-w-0 break-words">
                      {theme}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Course Information */}
          <section className="min-w-0 border border-[#E0E8DF] bg-[#F5F8F4] p-5 sm:p-6 md:p-8">
            <div className="border-b border-[#D5E1D5] pb-4">
              <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[#64776A]">
                INFORMATION
              </p>

              <h2 className="text-xl font-semibold text-[#1F4D3A] md:text-2xl">
                {dict.lecture.informationTitle}
              </h2>
            </div>

            <dl className="mt-2 divide-y divide-[#DCE5DC]">
              {dict.lecture.information.map((item) => (
                <div
                  key={item.label}
                  className="grid min-w-0 grid-cols-[80px_minmax(0,1fr)] gap-3 py-4 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="break-words text-sm font-semibold leading-7 text-[#29352F] md:text-base">
                    {item.label}
                  </dt>

                  <dd className="min-w-0 break-words text-sm leading-7 text-[#58665D] md:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Syllabus Link */}
            <a
              href="https://syllabus.risyu.saitama-u.ac.jp/syllabusHtml/2026/03/03_A02111_ja_JP.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-12 w-full items-center justify-between gap-4 border border-[#1F4D3A] bg-[#1F4D3A] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2F6B50] md:text-base"
            >
              <span className="min-w-0 break-words">
                {dict.lecture.syllabus}
              </span>

              <span
                aria-hidden="true"
                className="shrink-0 text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
