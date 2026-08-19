"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { NAV } from "@/lib/site-config";

/**
 * Mobile navigation.
 *
 * Participants asked repeatedly for orientation: "put bullets or something like
 * that to see what's inside, to orient people." The old site's burger menu hid
 * everything behind an unlabeled icon. This one is labeled, announces its state,
 * and shows all seven destinations at once rather than nesting them.
 *
 * Dropdown sub-navigation is issue #8, not this one.
 */
export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={t("menu")}
        className="flex items-center gap-2 rounded-sm px-2 py-2 text-sm"
      >
        <span className="flex flex-col gap-[5px]" aria-hidden="true">
          <span className="bg-ink block h-px w-5" aria-hidden="true" />
          <span className="bg-ink block h-px w-5" aria-hidden="true" />
          <span className="bg-ink block h-px w-5" aria-hidden="true" />
        </span>
        <span aria-hidden="true">{open ? t("closeMenu") : t("menu")}</span>
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t("mainNavigation")}
          className="border-rule bg-paper-raised shadow-card absolute top-full right-0 left-0 border-b"
        >
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {NAV.map((item) => {
              const hasChildren = Boolean(item.children?.length);

              return (
                <li
                  key={item.key}
                  className="border-rule border-b last:border-0"
                >
                  {hasChildren ? (
                    <div className="py-3.5">
                      <div className="text-ink text-base font-medium">
                        {t(item.key)}
                      </div>
                      <ul className="mt-2 ml-4 list-none space-y-2">
                        {item.children!.map((child) => (
                          <li key={child.key}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="text-ink hover:text-gold-deep block py-2 text-sm no-underline"
                            >
                              {t(child.key)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-ink hover:text-gold-deep block py-3.5 no-underline"
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
