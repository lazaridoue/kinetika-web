import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return {
    title: t("enriquecimientoTitle"),
  };
}

export default async function EnriquecimientoPage() {
  const t = await getTranslations("pages");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">{t("enriquecimientoTitle")}</h1>
      <p className="mt-6 text-lg">
        La gente extraordinaria invierte en educación. Nosotros transformamos
        vidas equipando líderes en aquello que suena imposible de obtener.
      </p>
    </section>
  );
}
