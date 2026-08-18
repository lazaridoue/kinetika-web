import { getTranslations } from "next-intl/server";

export default async function HistoriasPage() {
  const t = await getTranslations("pages");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">{t("historiasTitle")}</h1>
      <p className="mt-6 text-lg">{t("inProgress")}</p>
    </section>
  );
}
