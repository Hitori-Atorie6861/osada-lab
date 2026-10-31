
import type { Dictionary } from "@/i18n/dictionaries";
import PageBanner from "@/components/ui/PageBanner";

export default function ContactPageContent({
  dict,
}: {
  dict: Dictionary;
}) {
  const contact = dict.contact;

  return (
    <main className="bg-white text-text-primary">
      <PageBanner title={dict.nav.contact} />

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-20 lg:py-28">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-primary md:text-4xl">
            {contact.contactTitle}
          </h2>

          <p className="mt-6 leading-loose text-text-secondary">
            {contact.description}
          </p>

          <dl className="mt-10 border-y border-border">
            <div className="grid gap-2 py-6 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-16">
              <dt className="font-medium text-text-secondary">
                Email
              </dt>

              <dd className="min-w-0">
                <a
                  href="mailto:example@saitama-u.ac.jp"
                  className="break-all text-primary underline-offset-4 hover:underline"
                >
                  example@saitama-u.ac.jp
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-20 lg:py-28">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-primary md:text-4xl">
            {contact.locationTitle}
          </h2>

          <p className="mt-8 whitespace-pre-line leading-loose text-text-secondary">
            {dict.footer.address}
          </p>
        </div>
      </section>

      {/* Access */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-20 lg:py-28">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-primary md:text-4xl">
            {contact.accessTitle}
          </h2>

          <div className="mt-8 space-y-6 leading-loose text-text-secondary">
            {contact.accessDescriptions.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-20 lg:py-28">
        <h2 className="text-2xl font-bold text-primary md:text-4xl">
          {contact.mapTitle}
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl md:mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1616.688523974961!2d139.60529183861328!3d35.864275866815184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c220c3cce2b5%3A0xe0b3e5dadfd07b7!2z5Z-8546J5aSn5a2m57WM5riI5a2m6YOo!5e0!3m2!1sja!2sjp!4v1789921943556!5m2!1sja!2sjp"
            className="block aspect-[4/3] w-full border-0 md:aspect-[16/9]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={contact.mapFrameTitle}
          />
        </div>
      </section>
    </main>
  );
}
