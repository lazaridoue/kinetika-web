import { getTranslations } from "next-intl/server";

export default async function NosotrosPage() {
  const t = await getTranslations("pages");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">{t("nosotrosTitle")}</h1>
      <p className="mt-6 text-lg">{t("inProgress")}</p>
    </section>
  );
}
