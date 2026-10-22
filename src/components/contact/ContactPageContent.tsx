import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function ContactPageContent({ dict }: { dict: Dictionary }) {

  return (
    <main className="bg-white text-text-primary">
      {/* Page Banner */}
      <PageBanner title={dict.nav.contact} />

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Contact
          </h2>

          <p className="mt-6 leading-loose text-text-secondary">
            研究に関するお問い合わせや共同研究などについては、
            下記の連絡先までお問い合わせください。
          </p>

          <div className="mt-10 border-t border-border">
            <div className="flex flex-col gap-2 border-b border-border py-6 sm:flex-row sm:gap-16">
              <span className="w-32 font-medium text-text-secondary">
                Email
              </span>

              <span className="text-text-primary">
                example@saitama-u.ac.jp
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Location
          </h2>

          <p className="mt-8 leading-loose text-text-secondary">
            {dict.footer.address}
          </p>
        </div>
      </section>

      {/* Access */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Access
          </h2>

          <div className="mt-8 space-y-6 leading-loose text-text-secondary">
            <p>
              最寄駅から埼玉大学までのアクセス方法や、
              キャンパス内の研究室までの道順を掲載します。
            </p>

            <p>
              バスや徒歩でのアクセス方法などを、
              必要に応じて追加できます。
            </p>
          </div>
        </div>
      </section>

      {/* Map */}
      {/* Map */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Map
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1616.688523974961!2d139.60529183861328!3d35.864275866815184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c220c3cce2b5%3A0xe0b3e5dadfd07b7!2z5Z-8546J5aSn5a2m57WM5riI5a2m6YOo!5e0!3m2!1sja!2sjp!4v1789921943556!5m2!1sja!2sjp"
              className="aspect-[16/9] w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}