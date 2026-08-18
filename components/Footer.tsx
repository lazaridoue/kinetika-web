import Link from "next/link";
import { NAV, SOCIAL, CONTACT, SITE } from "@/lib/site-config";

/**
 * The team notes list the footer and the social links as broken on the old site.
 *
 * The rule here: nothing renders unless it resolves. Social entries with a null
 * URL are filtered out, and the contact block only appears once real details
 * exist in site-config. A missing link is better than a dead one.
 */
export function Footer() {
  const social = SOCIAL.filter((s) => s.url !== null);
  const hasContact = Object.values(CONTACT).some((v) => v !== null);

  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl tracking-[0.18em]">
              {SITE.name}
            </p>
            <p className="mt-2 max-w-xs text-sm opacity-70">{SITE.tagline}</p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-paper hover:text-gold text-sm no-underline opacity-80 hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {hasContact ? (
              <ul className="space-y-2.5 text-sm opacity-80">
                {CONTACT.email && (
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-paper hover:text-gold no-underline hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                  </li>
                )}
                {CONTACT.phone && (
                  <li>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="text-paper hover:text-gold no-underline hover:underline"
                    >
                      {CONTACT.phone}
                    </a>
                  </li>
                )}
                {CONTACT.address && <li>{CONTACT.address}</li>}
              </ul>
            ) : (
              <Link
                href="/contacto"
                className="text-paper hover:text-gold text-sm no-underline opacity-80 hover:opacity-100"
              >
                Contáctanos
              </Link>
            )}

            {social.length > 0 && (
              <ul className="mt-6 flex gap-5">
                {social.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper hover:text-gold text-sm no-underline opacity-80 hover:opacity-100"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="border-paper/15 mt-14 border-t pt-6 text-sm opacity-60">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
