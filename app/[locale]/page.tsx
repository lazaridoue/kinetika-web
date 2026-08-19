import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("homeTitle"),
    description: t("description"),
  };
}

export default async function LocaleHomePage() {
  const t = await getTranslations("home");

  const pillars = [
    {
      title: t("pillarInstitutionalTitle"),
      description: t("pillarInstitutionalBody"),
      href: "/servicios/ingenieria-institucional",
    },
    {
      title: t("pillarAcademicTitle"),
      description: t("pillarAcademicBody"),
      href: "/servicios/enriquecimiento-academico",
    },
    {
      title: t("pillarPersonalTitle"),
      description: t("pillarPersonalBody"),
      href: "/servicios/reset",
    },
  ];

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

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="h-full">
                <Link
                  href={pillar.href}
                  className="border-gold/30 bg-paper/5 hover:border-gold/70 block h-full rounded-md border p-6 text-left no-underline transition-colors"
                >
                  <h3 className="text-gold text-2xl leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-paper mt-4 text-sm leading-relaxed opacity-90">
                    {pillar.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
