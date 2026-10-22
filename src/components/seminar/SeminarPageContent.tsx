import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function SeminarPageContent({ dict }: { dict: Dictionary }) {

  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.seminar.pageTitle}/>

      {/* 01 Hero */}
      <section>

        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <div className="max-w-4xl">

            <p className="text-lg leading-loose text-text-secondary md:text-xl">
              {dict.seminar.intro}
            </p>

          </div>

        </div>

      </section>

      {/* 02 基本活動 */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.15em] text-primary">
            
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            {dict.seminar.basicTitle}
          </h2>
        </div>

        <div className="mt-16 space-y-24">
          {dict.seminar.basicActivities.map((activity, index) => (
            <article
              key={activity.title}
              className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16"
            >
              {/* 写真 */}
              <div
                className={`aspect-[4/3] overflow-hidden rounded-2xl bg-surface ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="flex h-full items-center justify-center text-sm text-text-secondary">
                  Photo {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* 文章 */}
              <div
                className={`${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <p className="text-sm font-medium tracking-[0.15em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 text-2xl font-bold md:text-3xl">
                  {activity.title}
                </h3>

              {/* リード文 */}
              <p className="mt-8 text-lg font-medium leading-relaxed text-text-primary">
                {activity.summary}
              </p>

              {/* 本文 */}
              <p className="mt-6 leading-loose text-text-secondary">
                {activity.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>

      {/* 03 学年ごとの活動 */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.15em] text-primary">
              
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {dict.seminar.yearTitle}
            </h2>
          </div>

          <div className="mt-14">
            {dict.seminar.yearActivities.map((activity, index) => (
              <article
                key={`${activity.period}-${activity.year}`}
                className="group grid gap-8 border-t border-border py-10 md:grid-cols-[180px_1fr] md:gap-12"
              >
                {/* 年次 */}
                <div className="relative">
                  <p className="text-sm font-medium tracking-wide text-primary">
                    {activity.period}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {activity.year}
                  </p>
                  {/* 縦のライン */}
                  {index !== dict.seminar.yearActivities.length - 1 && (
                    <div className="absolute left-[5px] top-16 hidden h-[calc(100%+1px)] w-px bg-border md:block" />
                  )}
                  
                  {/* ドット */}
                  <div className="absolute left-0 top-[4.5rem] hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block" />
                </div>

                {/* 内容 */}
                <div className="max-w-3xl">
                  <p className="text-sm font-medium text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {activity.title}
                  </h3>

                  <p className="mt-4 text-base font-medium leading-relaxed text-text-primary">
                    {activity.summary}
                  </p>
                  
                  <p className="mt-5 leading-loose text-text-secondary">
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
  <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

    <div className="max-w-2xl">
      <p className="text-sm font-medium tracking-[0.15em] text-primary">
        
      </p>

      <h2 className="mt-3 text-3xl font-bold md:text-4xl">
        {dict.seminar.studentResearchTitle}
      </h2>

      <p className="mt-6 leading-loose text-text-secondary">
        {dict.seminar.studentResearchIntro}
      </p>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {dict.seminar.studentResearch.map((research, index) => (
        <article
          key={research.title}
          className="group rounded-2xl border border-border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {research.category}
            </span>

            <span className="text-sm text-text-secondary">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-6 text-xl font-bold leading-relaxed md:text-2xl">
            {research.title}
          </h3>

          <p className="mt-4 leading-loose text-text-secondary">
            {research.body}
          </p>
        </article>
      ))}
    </div>

  </div>
</section>

      {/* 05 学外活動 */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.15em] text-primary">
            
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            {dict.seminar.externalTitle}
          </h2>

          <p className="mt-6 leading-loose text-text-secondary">
            {dict.seminar.externalIntro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {dict.seminar.externalActivities.map((activity) => (
            <article
              key={activity.title}
              className="group overflow-hidden rounded-2xl border border-border transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex aspect-[16/9] items-center justify-center bg-surface text-sm text-text-secondary transition-transform duration-500 group-hover:scale-[1.02]">
                Photo
              </div>

              <div className="p-7">
                <h3 className="text-xl font-bold">{activity.title}</h3>
                <p className="mt-3 leading-loose text-text-secondary">
                  {activity.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 06 実績 */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.15em] text-primary">
              
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {dict.seminar.achievementTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {dict.seminar.achievements.map((achievement) => (
              <article
                key={achievement.title}
                className="rounded-2xl border border-border p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-sm font-medium text-primary">
                  {achievement.year}
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  {achievement.title}
                </h3>

                <p className="mt-4 leading-loose text-text-secondary">
                  {achievement.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 合宿・交流 */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-medium tracking-[0.15em] text-primary">
              
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {dict.seminar.lifeTitle}
            </h2>

            <p className="mt-6 leading-loose text-text-secondary">
              {dict.seminar.lifeBody}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface text-sm text-text-secondary">
              Photo
            </div>
            <div className="mt-8 flex aspect-square items-center justify-center rounded-2xl bg-surface text-sm text-text-secondary">
              Photo
            </div>
          </div>
        </div>
      </section>
      {/* 07 ゼミを希望する方へ */}

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          {/* Heading */}

          <div className="max-w-3xl">

            <p className="text-sm font-medium tracking-[0.15em] text-primary">
              
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {dict.seminar.applicantTitle}
            </h2>

            <p className="mt-6 leading-loose text-text-secondary">
              {dict.seminar.applicantIntro}
            </p>
          </div>


          {/* 基本情報 */}

          <div className="mt-16">

            <h3 className="text-2xl font-bold">
              {dict.seminar.basicInfoTitle}
            </h3>

            <div className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-background md:grid-cols-2">

              {dict.seminar.basicInfo.map((info) => (

                <div
                  key={info.label}
                  className="flex items-center justify-between gap-6 border-b border-border px-6 py-5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                >

                  <span className="font-medium text-text-secondary">
                    {info.label}
                  </span>

                  <span className="text-right font-medium">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>

        </div>

        {/* FAQ */}

        <div className="mt-20">

          <h3 className="text-2xl font-bold">
            {dict.seminar.faqTitle}
          </h3>

          <div className="mt-8 border-t border-border">

            {dict.seminar.faq.map((item, index) => (

              <details
                key={item.question}
                className="group border-b border-border"
              >

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold">

                  <span>
                    Q. {item.question}
                  </span>

                  <span className="text-2xl font-light text-primary transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>

                </summary>

                <div className="pb-6 pr-12 leading-loose text-text-secondary">

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

 