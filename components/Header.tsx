import Link from "next/link";
import { NAV } from "@/lib/site-config";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="border-gold bg-paper relative border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Wordmark />

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV.filter((i) => i.key !== "inicio").map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-ink hover:text-gold-deep text-sm no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Account entry point. The team notes flag "user sign in" as broken.
            Auth is issue #32 — this routes to a placeholder until then rather
            than rendering a dead icon like the old site did.
          */}
          <Link
            href="/acceder"
            className="text-ink hover:text-gold-deep hidden text-sm no-underline md:inline"
          >
            Acceder
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
