"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("nav");

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      className="border-rule bg-paper flex items-center gap-2 rounded-md border px-2 py-1"
      aria-label={t("mainNavigation")}
    >
      <button
        type="button"
        onClick={() => handleLocaleChange("es")}
        className={
          locale === "es"
            ? "text-gold-deep rounded-sm px-2 py-1 text-sm font-medium underline underline-offset-4"
            : "text-ink hover:text-gold-deep rounded-sm px-2 py-1 text-sm no-underline"
        }
        aria-pressed={locale === "es"}
      >
        ES
      </button>
      <span aria-hidden="true" className="text-ink-muted text-xs">
        /
      </span>
      <button
        type="button"
        onClick={() => handleLocaleChange("en")}
        className={
          locale === "en"
            ? "text-gold-deep rounded-sm px-2 py-1 text-sm font-medium underline underline-offset-4"
            : "text-ink hover:text-gold-deep rounded-sm px-2 py-1 text-sm no-underline"
        }
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
