"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { NAV } from "@/lib/site-config";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const t = useTranslations("nav");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openMenu) {
        setOpenMenu(null);
        const trigger = document.getElementById(`nav-button-${openMenu}`);
        trigger?.focus();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

  const toggleMenu = (key: string) => {
    setOpenMenu((current) => (current === key ? null : key));
  };

  return (
    <header className="border-gold bg-paper relative border-b">
      <div
        ref={navRef}
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4"
      >
        <Wordmark />

        <nav aria-label={t("mainNavigation")} className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV.filter((i) => i.key !== "inicio").map((item) => {
              const hasChildren = Boolean(item.children?.length);

              return (
                <li key={item.key} className="relative">
                  {hasChildren ? (
                    <>
                      <button
                        id={`nav-button-${item.key}`}
                        type="button"
                        aria-expanded={openMenu === item.key}
                        aria-controls={`nav-panel-${item.key}`}
                        onClick={() => toggleMenu(item.key)}
                        onMouseEnter={() => setOpenMenu(item.key)}
                        onFocus={() => setOpenMenu(item.key)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            toggleMenu(item.key);
                          }
                        }}
                        className="text-ink hover:text-gold-deep inline-flex items-center gap-1 text-sm no-underline"
                      >
                        {t(item.key)}
                      </button>

                      {openMenu === item.key && (
                        <div className="absolute top-full left-0 z-20 mt-2">
                          <ul
                            id={`nav-panel-${item.key}`}
                            className="border-rule bg-paper shadow-card w-72 list-none rounded-sm border p-2"
                          >
                            {item.children!.map((child) => (
                              <li key={child.key}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="text-ink hover:text-gold-deep block px-3 py-2 text-sm no-underline"
                                >
                                  {t(child.key)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-ink hover:text-gold-deep text-sm no-underline"
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </li>
              );
            })}
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
