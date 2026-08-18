import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleHomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28">
        <h1 className="max-w-4xl text-3xl md:text-4xl">{t("heroTitle")}</h1>
        <p className="text-ink-muted mt-6 max-w-2xl text-lg">
          {t("heroSubtitle")}
        </p>
        <Link
          href="/servicios"
          className="bg-ink text-paper hover:bg-gold mt-10 inline-block rounded-md px-6 py-3.5 no-underline transition-colors"
        >
          {t("ctaExplore")}
        </Link>
      </section>

      <section className="bg-ink text-paper py-20" aria-labelledby="pilares">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="pilares" className="text-gold text-2xl">
            {t("pillarsTitle")}
          </h2>
        </div>
      </section>
    </>
  );
}
