# Kinétika — project context

Rebuild of `kinetika.consulting`, previously WordPress (Astra + Elementor + LearnPress).
Kinétika is a Honduran education consultancy: college prep, test prep, and business coaching for
students and professionals across Central America.

**Read `BACKLOG.md` before starting any task.** It contains the research this project is built on.

---

## Stack

- Next.js 16, App Router, TypeScript strict
- Tailwind v4 (CSS-first `@theme` in `app/globals.css` — there is no `tailwind.config.ts`)
- `next-intl`, Spanish default
- Vercel hosting
- Resend for transactional email
- Vitest (unit), Playwright + `@axe-core/playwright` (e2e and accessibility)

Phases 3+ only: Postgres on Neon, Prisma, Auth.js v5.

---

## Non-negotiables

These come from usability testing with seven participants, not from preference.

**1. Spanish is the source language, not a translation.**
Write copy in Spanish first. The parent buyer persona lists an English language barrier as a pain
point. Participants were confused by pages mixing both languages: _"as it is in English and you are
asking me in Spanish, that confuses me."_ A single page must never contain both.

**2. Never name two things "courses."**
All seven participants failed or struggled to find SWC College Prep Circuit courses because the top
nav "Courses" meant Kinétika Academy while SWC courses lived elsewhere. Top nav says **Kinétika
Academy**. SWC College Prep Circuit is a service page that links into a filtered Academy view.

**3. Contrast and focus are build gates, not review comments.**
CI runs axe over every route. WCAG 2.1 AA minimum. Every interactive element needs a visible focus
ring. `prefers-reduced-motion` is respected.

**4. No color or font outside `app/globals.css`.**
Participants complained the font changed page to page. Use the tokens. If you need a value that
doesn't exist, add it to the theme rather than inlining it.

**5. Real photographs only.**
_"The images seem to be taken from Google — it is better to use real photos."_ Use a labeled
placeholder component rather than stock imagery. Never silently fill a slot with a stock photo.

**6. Every form that asks for contact has a message field.**
Five of seven participants failed to message the team because the contact form had name, email, and
phone but no textarea.

---

## Design tokens

```
--color-ink        #161A1D   type, wordmark, footer band — never a full-page background
--color-paper      #F7F5F0   primary surface
--color-gold       #C9A227   accent for ink surfaces only
--color-gold-deep  #8A6410   links and interactive states on paper
```

Display face (Cormorant Garamond) is for the wordmark, page titles, and pull quotes only. Everything
else is Inter.

---

## Information architecture

Seven top-level items. The competitive audit found 6–7 to be the working range; a competitor with
eight read as cluttered. Do not add an eighth without discussion.

```
Inicio · Servicios · Kinétika Academy · Historias de Éxito · Blog · Sobre Nosotros · Contacto
```

Never link off-site from primary navigation. The audit flagged a competitor doing this as a mistake
to avoid.

---

## Conventions

- Routes: `app/[locale]/...`
- Components: `components/` — colocate a `.test.tsx` beside anything with logic
- Content: `content/blog/{locale}/*.mdx`
- Copy strings: `messages/es.json` and `messages/en.json`, never hardcoded in JSX
- Server Components by default. `"use client"` needs a reason.
- Conventional commits. Reference the issue: `feat(nav): add dropdown menus (#8)`

## Writing copy

Plain Spanish, sentence case, active voice. Buttons name what happens: "Solicitar información," not
"Enviar." Errors say what went wrong and how to fix it. The audience includes anxious 16-year-olds
and parents worried about online scams — clarity reads as trustworthy, cleverness does not.
