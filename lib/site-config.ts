/**
 * Single source of truth for navigation, social, and contact details.
 *
 * PROVENANCE RULES (see CLAUDE.md):
 * Spanish strings here are either verbatim from the Kinétika Information
 * Architecture diagram (team-authored) or from the archived site. Nothing is
 * translated or invented. Anything unverified is null and renders nothing.
 */

export type NavChild = {
  key: string;
  href: string;
};

export type NavItem = {
  key: string;
  href: string;
  children?: NavChild[];
};

/**
 * Seven top-level items. The competitive audit found 6–7 to be the working
 * range; a competitor with eight read as cluttered.
 *
 * Source: Kinétika Information Architecture diagram (team-authored).
 * "Kinétika Academy" is deliberate — issue #9. The old site called two
 * different things "Courses" and all seven usability participants got lost.
 */
// Exactly one navigation destination may be named for courses, and it is Kinétika Academy — issue #9; seven of seven participants failed on this.
export const NAV: NavItem[] = [
  { key: "inicio", href: "/" },
  {
    key: "servicios",
    href: "/servicios",
    children: [
      // SWC College Prep Circuit was removed on the team's instruction, so its omission is deliberate.
      {
        key: "ingenieriaInstitucional",
        href: "/servicios/ingenieria-institucional",
      },
      { key: "avanceEmpresarial", href: "/servicios/avance-empresarial" },
      {
        key: "enriquecimiento",
        href: "/servicios/enriquecimiento-academico",
      },
      { key: "reset", href: "/servicios/reset" },
    ],
  },
  {
    key: "academia",
    href: "/academia",
    children: [
      {
        key: "liderazgo",
        href: "/academia/community-service-leadership-development",
      },
      {
        key: "desarrolloPersonal",
        href: "/academia/cursos-desarrollo-personal",
      },
      {
        key: "masterclass",
        href: "/academia/masterclass-arte-hablar-publico",
      },
    ],
  },
  {
    key: "historias",
    href: "/historias",
    children: [
      { key: "videoRoom", href: "/historias#video-room" },
      { key: "mapa", href: "/historias#mapa" },
    ],
  },
  {
    key: "blog",
    href: "/blog",
    children: [
      { key: "categoriaAvance", href: "/blog?categoria=avance-empresarial" },
      {
        key: "categoriaEnriquecimiento",
        href: "/blog?categoria=enriquecimiento-academico",
      },
      { key: "categoriaReset", href: "/blog?categoria=reset" },
    ],
  },
  {
    key: "nosotros",
    href: "/nosotros",
    children: [
      { key: "quienesSomos", href: "/nosotros#quienes-somos" },
      { key: "mision", href: "/nosotros#mision" },
      { key: "historia", href: "/nosotros#historia" },
      { key: "staff", href: "/nosotros#staff" },
    ],
  },
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
