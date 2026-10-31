
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function SeminarPageContent({
  dict,
}: {
  dict: Dictionary;
}) {
  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.seminar.pageTitle} />

      {/* 01 Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 md:py-28">
          <div className="max-w-8xl">
            <p className="text-base leading-8 text-text-secondary md:text-xl md:leading-loose">
              {dict.seminar.intro}
            </p>
          </div>
        </div>
      </section>

      {/* 02 基本活動 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
            {dict.seminar.basicTitle}
          </h2>
        </div>

        <div className="mt-8 space-y-12 md:mt-16 md:space-y-24">
          {dict.seminar.basicActivities.map((activity, index) => (
            <article
              key={activity.title}
              className="grid gap-5 md:grid-cols-2 md:items-start md:gap-16"
            >
              {/* 写真 */}
              {/* 画像 */}
            <div
              className={`aspect-[4/3] overflow-hidden rounded-xl bg-[#FAF9F5] md:rounded-2xl ${
                index % 2 === 1 ? "md:order-2" : ""
                  }`}
            >
              <img
                src={
                   [
                   "/presentation.png",
                   "/discussion-seminar.png",
                   "/feedback.png",
                    ][index]
                    }
                  alt={activity.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* 文章 */}
              <div
                className={
                  index % 2 === 1 ? "md:order-1" : ""
                }
              >
                <p className="text-xs font-medium tracking-[0.15em] text-primary md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#1F4D3A] md:mt-4 md:text-3xl">
                  {activity.title}
                </h3>

                <p className="mt-4 text-base font-medium leading-7 text-text-primary md:mt-8 md:text-lg md:leading-relaxed">
                  {activity.summary}
                </p>

                <p className="mt-3 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
                  {activity.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 学年ごとの活動 */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
              {dict.seminar.yearTitle}
            </h2>
          </div>

          <div className="mt-8 md:mt-14">
            {dict.seminar.yearActivities.map((activity, index) => (
              <article
                key={`${activity.period}-${activity.year}`}
                className="group grid gap-4 border-t border-border py-7 md:grid-cols-[180px_1fr] md:gap-12 md:py-10"
              >
                {/* 年次 */}
                <div className="relative">
                  <p className="text-xs font-medium tracking-wide text-primary md:text-sm">
                    {activity.period}
                  </p>

                  <p className="mt-1 text-xl font-bold text-[#1F4D3A] md:mt-2 md:text-2xl">
                    {activity.year}
                  </p>

                  {index !==
                    dict.seminar.yearActivities.length - 1 && (
                    <div className="absolute left-[5px] top-16 hidden h-[calc(100%+1px)] w-px bg-border md:block" />
                  )}

                  <div className="absolute left-0 top-[4.5rem] hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block" />
                </div>

                {/* 内容 */}
                <div className="min-w-0 max-w-3xl">
                  <p className="text-xs font-medium text-primary md:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-[#1F4D3A] transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {activity.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-text-primary md:mt-4 md:text-base md:leading-relaxed">
                    {activity.summary}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-text-secondary md:mt-5 md:text-base md:leading-loose">
                    {activity.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 学生の研究テーマ */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
          <div className="max-w-6xl">
            <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
              {dict.seminar.studentResearchTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
              {dict.seminar.studentResearchIntro}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
            {dict.seminar.studentResearch.map((research, index) => (
              <article
                key={research.title}
                className="group min-w-0 rounded-xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:rounded-2xl md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-primary md:text-sm">
                    {research.category}
                  </span>

                  <span className="text-xs text-text-secondary md:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-relaxed text-[#1F4D3A] md:mt-6 md:text-2xl">
                  {research.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary md:mt-4 md:text-base md:leading-loose">
                  {research.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 学外活動 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
            {dict.seminar.externalTitle}
          </h2>

          <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
            {dict.seminar.externalIntro}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
  {dict.seminar.externalActivities.map((activity, index) => (
    <article
      key={activity.title}
      className="group min-w-0 overflow-hidden rounded-xl border border-border transition-shadow duration-300 hover:shadow-lg md:rounded-2xl"
    >
      <div className="aspect-[16/9] overflow-hidden bg-surface">
        <img
          src={
            [
              "/lecture.jpg",
              "/company-visit.jpg",
              "/facility-tour.jpg",
              "/alumni.jpg",
            ][index]
          }
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-5 md:p-7">
        <h3 className="text-lg font-bold text-[#1F4D3A] md:text-xl">
          {activity.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-text-secondary md:text-base md:leading-loose">
          {activity.body}
        </p>
      </div>
    </article>
  ))}
</div>
      </section>

      {/* 06 実績 */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
              {dict.seminar.achievementTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
            {dict.seminar.achievements.map((achievement) => (
              <article
                key={achievement.title}
                className="min-w-0 rounded-xl border border-border p-5 transition-transform duration-300 hover:-translate-y-1 md:rounded-2xl md:p-8"
              >
                <p className="text-xs font-medium text-primary md:text-sm">
                  {achievement.year}
                </p>

                <h3 className="mt-3 text-lg font-bold text-[#1F4D3A] md:text-xl">
                  {achievement.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary md:mt-4 md:text-base md:leading-loose">
                  {achievement.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 合宿・交流 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
        <div className="grid gap-7 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-10">
          <div>
            <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
              {dict.seminar.lifeTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
              {dict.seminar.lifeBody}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-surface md:rounded-2xl">
              <img
                src="/seminar-camp.jpg"
                alt={dict.seminar.lifeTitle}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mt-5 aspect-square overflow-hidden rounded-xl bg-surface md:mt-8 md:rounded-2xl">
              <img
                src="/seminar交流.jpg"
                alt={dict.seminar.lifeTitle}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
            />
            </div>
          </div>
        </div>
      </section>

      {/* 08 ゼミを希望する方へ */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#1F4D3A] md:mt-3 md:text-4xl">
              {dict.seminar.applicantTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary md:mt-6 md:text-base md:leading-loose">
              {dict.seminar.applicantIntro}
            </p>
          </div>

          {/* 基本情報 */}
          <div className="mt-10 md:mt-16">
            <h3 className="text-xl font-bold text-[#1F4D3A] md:text-2xl">
              {dict.seminar.basicInfoTitle}
            </h3>

            <div className="mt-5 grid overflow-hidden rounded-xl border border-border bg-background md:mt-8 md:grid-cols-2 md:rounded-2xl">
            {dict.seminar.basicInfo
              .filter((info) => info.label !== "活動場所" && info.label !== "Location")
              .map((info) => (
                <div
                  key={info.label}
                  className="flex min-w-0 flex-col gap-2 border-b border-border px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-6 md:py-5 md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span className="text-sm font-medium text-text-secondary md:text-base">
                    {info.label}
                  </span>

                  <span className="break-words text-sm font-medium sm:text-right md:text-base">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 md:mt-20">
            <h3 className="text-xl font-bold text-[#1F4D3A] md:text-2xl">
              {dict.seminar.faqTitle}
            </h3>

            <div className="mt-5 border-t border-border md:mt-8">
              {dict.seminar.faq.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-border"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-bold text-[#1F4D3A] md:gap-6 md:py-6 md:text-lg">
                    <span className="min-w-0">
                      Q. {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl font-light text-primary transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="pb-5 pr-4 text-sm leading-7 text-text-secondary md:pb-6 md:pr-12 md:text-base md:leading-loose">
                    <span className="font-medium text-text-primary">
                      A.
                    </span>{" "}
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
