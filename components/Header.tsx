"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV } from "@/lib/site-config";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="border-gold bg-paper relative border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Wordmark />

        <nav aria-label={t("mainNavigation")} className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV.filter((i) => i.key !== "inicio").map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-ink hover:text-gold-deep text-sm no-underline"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/acceder"
            className="text-ink hover:text-gold-deep hidden text-sm no-underline md:inline"
          >
            {t("acceder")}
          </Link>
          <LanguageToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
