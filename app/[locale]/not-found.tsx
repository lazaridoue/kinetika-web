import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">404</h1>
      <p className="mt-6 text-lg">{t("message")}</p>
      <Link
        href="/"
        className="text-gold-deep mt-8 inline-block underline-offset-4 hover:underline"
      >
        {t("homeLink")}
      </Link>
    </section>
  );
}
