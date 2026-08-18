/**
 * Single source of truth for navigation, social, and contact details.
 *
 * PROVENANCE RULES (see CLAUDE.md):
 * Spanish strings here are either verbatim from the Kinétika Information
 * Architecture diagram (team-authored) or from the archived site. Nothing is
 * translated or invented. Anything unverified is null and renders nothing.
 */

export type NavItem = {
  key: string;
  href: string;
};

/**
 * Seven top-level items. The competitive audit found 6–7 to be the working
 * range; a competitor with eight read as cluttered.
 *
 * Source: Kinétika Information Architecture diagram (team-authored).
 * "Kinétika Academy" is deliberate — issue #9. The old site called two
 * different things "Courses" and all seven usability participants got lost.
 */
export const NAV: NavItem[] = [
  { key: "inicio", href: "/" },
  { key: "servicios", href: "/servicios" },
  { key: "academia", href: "/academia" },
  { key: "historias", href: "/historias" },
  { key: "blog", href: "/blog" },
  { key: "nosotros", href: "/nosotros" },
  { key: "contacto", href: "/contacto" },
];

/**
 * Social profiles.
 *
 * The team notes list the social links as broken on the old site. The archived
 * header showed Instagram, Facebook, and Twitter icons, but the hrefs were not
 * captured, so the real URLs are unknown.
 *
 * A null URL renders nothing at all — a missing link is better than a broken
 * one, which is the exact defect this issue exists to fix. Fill these in and
 * they appear automatically.
 */
export const SOCIAL: { name: string; url: string | null }[] = [
  { name: "Instagram", url: null }, // TODO: real profile URL
  { name: "Facebook", url: null }, // TODO: real profile URL
  { name: "LinkedIn", url: null }, // TODO: real profile URL
];

/**
 * Contact details.
 *
 * Deliberately empty. The archived site listed "2360 Hood Avenue, San Diego,
 * CA 92123" for a Honduras-based company — almost certainly unreplaced theme
 * demo content. Publishing it would be worse than publishing nothing.
 * Verify with the team before filling these in.
 */
export const CONTACT = {
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null,
  address: null as string | null,
};

export const SITE = {
  name: "KINÉTIKA",
  /** Verbatim: archived <title>, capture 20250328064524 */
  tagline: "Transformando tu potencial en movimiento",
};
