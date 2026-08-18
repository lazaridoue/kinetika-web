# Kinétika — Rebuild Backlog

Rebuilding `kinetika.consulting` from WordPress (Astra + Elementor + LearnPress) into a custom
full-stack app. Public-first, bilingual, accessible.

---

## 1. What the research already tells us

Everything below is evidence from the uploaded documents, not guesswork. Each issue links back to it.

### 1.1 Usability test results (7 participants, 8 tasks)

| Task | Outcome | Root cause |
|---|---|---|
| T1 — Reach Academic Enrichment | Mostly easy | — |
| **T2 — Find SWC College Prep Circuit courses** | **Failed or difficult for 7/7** | Two different things are called "Courses." Top nav "Courses" = Kinétika Academy. SWC courses are buried under Academic Enrichment. |
| T3 — Institutional Advancement page | Confusing for most | Three "pillars" render as unlabeled tiles; you must enter each one to learn what it is. |
| **T4 — Find SWC success stories** | **Failed or difficult for 6/7** | No top-level destination. Participants looked in Blog and About Us. Content isn't labeled "success stories." |
| T5 — About Us | Easy | Repeated complaint: background too dark. |
| T6 — Blog | Easy | Inconsistent card sizes, fonts, and image treatment. Mixed languages. |
| T7 — Buy a course | Easy | Modules named "Módulo 1 / Módulo 2" with no description of contents. |
| **T8 — Message the team** | **Failed or difficult for 5/7** | The contact form has no message field. Name / email / phone only. |

Verbatim themes, repeated by nearly every participant:

- **Too dark.** "very sad, very gloomy" / "the page is too dark" / "look for a more cheerful color, more vivid" / "I feel I need a little color."
- **Language mixing.** Spanish and English on the same page. "Choose whether to use Spanish or English, do not combine." / "as it is in English and you are asking me in Spanish, that confuses me."
- **No wayfinding.** "put bullets or something like that to see what's inside, to orient people" / "where it says home, more options will be displayed... not to get lost."
- **Stock photography.** "the images seem to be taken from Google, it is better to use photos of mixed race people and real photos."
- **Inconsistency.** "the font is different on each page, you have to be more uniform" / "the size of each square is different... people who have ADHD or get lost easily."

### 1.2 Team notes (`Kinetika Website.docx`)

Accessibility, English translation, font, dark background, responsive. Community: more student/staff
photos, reviews and statistics. Broken: pillars text, courses page, footer, social links, user sign-in.
Remove the gift card. Update plugins.

> The "update plugins" item disappears entirely once we leave WordPress. That's a real argument for the rebuild.

### 1.3 Competitive audit (BGS Consulting, Convierte Más, Cyber Click)

- 6–7 top-level categories is the target. Cyber Click's 8 was judged too many; its density read as "dirty."
- Never send a user off-site from primary nav (Convierte Más links its school externally — flagged as a mistake).
- Case studies / success stories are a credibility differentiator. Convierte Más has none and it shows.
- "Meet the team" with photo, name, role, contact is table stakes.
- About Us reads best split three ways: who we are, meet the team, client testimonials.

### 1.4 Personas → design constraints

| Persona | Constraint it creates |
|---|---|
| Marta Flores, 17, HN — SWC student | Mobile-first. Wants to see the 9-week process laid out before committing. |
| Jorge Flores, 16, HN — Full SWC CPC | Anxiety, parental pressure. Needs reassurance and a visible path, not a wall of services. |
| Antigone Kalliope, 17, SV — SAT prep | Not Honduran. Regional copy, no HN-only assumptions. |
| Lindsey Parker, 24, HN — TOEFL | Adult, job-driven. Needs schedule and duration up front. |
| David Lagos, 25, HN — Masters | Time-poor. Self-paced framing matters. |
| **Marta's Parents, 45, HN** | **"Scared of online scams." "English language barrier."** Spanish must be the default language, and trust signals (real staff photos, real results, real contact) are conversion-critical, not decoration. |
| Juan Martínez, 38 / Marta Flores, 40 — Avance Empresarial | A second, separate audience. B2B needs its own entry point, not a buried sub-page. |

### 1.5 Old site inventory (from `Guía de Usuario`)

- Nav: Home · About Us · Our Staff · Courses · Blog · Contact, plus IG/FB/Twitter and an account icon.
- Stack: WordPress + Astra theme + Elementor + LearnPress + SeedProd + UpdraftPlus + Essential Addons.
- Courses priced in Lempiras (150.00L, 230.00L, Gratis). Instructor: Ariany Rodríguez.
- Course detail: duration, level, lessons, quizzes, enrolled count; accordions for Requisitos /
  Características / Audiencia objetivo; tabs for Vista General / Curriculum / Instructor / FAQ.
- **Payment is manual.** Student submits proof of payment → admin approves the order in LearnPress →
  student receives a link to set a password. Course content stays locked until the order is approved.
- Contact form: Nombre y Apellido, Correo Electrónico, Número de Teléfono. **No message field.**

### 1.6 Target IA (from the Information Architecture diagram)

```
Inicio
Servicios
  ├── SWC College Prep Circuit
  ├── Avance Empresarial
  ├── Enriquecimiento Académico (Formación de Líderes)
  └── RESET  (con La Nutria Latinoamérica)
Kinétika Academy            ← courses live HERE, and only here
  ├── Scholarship Writing Camp
  ├── SAT Prep Course
  ├── TOEFL Prep Course
  ├── Community Service & Leadership Development
  ├── Cursos de Desarrollo Personal
  ├── Masterclass: El Arte de Hablar en Público
  ├── Cursos de Avance Empresarial
  └── Curso de Enriquecimiento Académico
Historias de Éxito          ← promoted to top level (fixes T4)
  ├── Video Room
  ├── Students Origin Map
  └── Students Studying Abroad Map
Blog
  └── filters: Avance Empresarial · Enriquecimiento Académico · RESET
Sobre Nosotros
  ├── Quiénes Somos · Misión · Filosofía · Valores
  ├── Nuestra Historia · Mensaje del CEO
  ├── Staff
  └── Trusted By / Casos de éxito
Contacto  (+ FAQs, Newsletter)
```

Seven top-level items. Inside the 6–7 the audit recommends.

---

## 2. Decisions

| Area | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | Same stack as fc-usa. SSG/ISR gives fast public pages on slow LatAm mobile connections. |
| Styling | Tailwind CSS + design tokens | Kills the "different font on every page" complaint structurally. |
| i18n | `next-intl`, **`es` default**, `en` secondary | Parents have an English barrier. Spanish is not the translation — it's the source. |
| Blog content | MDX in-repo (phase 1) → headless CMS (phase 4) | Team posts already exist as text. Ship now, add authoring later. |
| Database | Postgres (Neon free tier) + Prisma | Only needed from Phase 3. |
| Auth | Auth.js v5 | Replaces the WP account icon. |
| Payments | **Manual approval, same as today** | Stripe has no Honduras support. Don't let a payments integration block launch. |
| Email | Resend | Contact form, enrollment notices, newsletter. |
| Media | S3 or UploadThing | Student/staff photos, payment proofs, video posters. |
| Testing | Vitest + Playwright + `@axe-core/playwright` | Accessibility is a stated priority, so it gets a CI gate, not a checklist. |
| CI/CD | GitHub Actions | |

### Visual direction

Keep the brand equity, drop the gloom. The Didone serif wordmark and GP monogram stay — they're
the one thing nobody complained about. Everything else inverts.

```
--ink        #161A1D   type, wordmark, footer band — never a full-page background
--paper      #F7F5F0   primary surface (warm, not clinical white)
--sage       #C8D5BB   section bands — lifted from your own persona deck
--periwinkle #5B51C4   links, interactive states — deepened from the persona accent to pass AA on paper (5.7:1)
--signal     #1F6F5C   CTAs, scholarship stats, "admitted" markers
```

Type: the existing Didone serif for display **only** (wordmark, page titles, pull quotes). A single
humanist sans for everything else, at one scale, site-wide.

Signature element: *kinétika* means movement. Build the "Students Origin Map → Students Studying
Abroad Map" from your own IA as one continuous scroll-driven arc — a line that leaves Honduras and
El Salvador and lands on real campuses, with real student photos as the endpoints. It's the
success-stories fix, the "real photos" fix, and the brand thesis in one component.

---

## 3. Milestones

| Milestone | Contains | Ships |
|---|---|---|
| **M1 — Foundation** | Repo, tokens, shell, i18n, a11y gate, CI | Deployed empty site |
| **M2 — Public site** | All marketing pages, correct IA | **Public launch** |
| **M3 — Blog** | Team posts live | |
| **M4 — Courses (read-only)** | Catalog, detail pages, enrollment requests | |
| **M5 — Accounts & LMS** | Auth, orders, gated lessons, admin | |
| **M6 — Polish & validate** | SEO, perf, redirects, retest | |

---

## 4. Issues

### M1 — Foundation

**#1 Recover old site content before anything else**
Try `web.archive.org/web/*/kinetika.consulting/*` for a full URL list. If you still have WP hosting
or an UpdraftPlus backup, `Tools → Export` gives an XML with every post, page, and media URL. If
neither works, the Guía de Usuario screenshots plus the IA diagram are the source of truth.
*Done when:* a `content/legacy/` folder holds recovered copy, or a written note says it's unrecoverable.

**#2 Scaffold Next.js 16 + TypeScript + Tailwind, deploy to Vercel**
*Done when:* `main` auto-deploys to a public URL.

**#3 Design tokens and type scale**
Palette and type scale above, as CSS custom properties + Tailwind theme extension. One font pair,
site-wide.
*Fixes:* "the font is different on each page" · "too dark" · "I need a little color"
*Done when:* no raw hex or font-family exists outside the token file.

**#4 Layout shell — header, footer, skip link**
Footer with working links and working social icons. Both are broken today per the team notes.
*Done when:* footer and every social link resolve; skip-to-content works on keyboard.

**#5 i18n with `next-intl`, Spanish default**
Locale-prefixed routes, visible language toggle in the header, `<html lang>` correct per locale.
No page may mix languages.
*Fixes:* "choose whether to use Spanish or English, do not combine"
*Done when:* every route renders complete under `/es` and `/en`.

**#6 Accessibility baseline + CI gate**
Axe in Playwright over every route, WCAG 2.1 AA contrast on all tokens, visible focus rings,
`prefers-reduced-motion` respected, semantic landmarks.
*Done when:* CI fails on any new axe violation.

**#7 GitHub Actions: lint, typecheck, unit, a11y**
Same shape as the fc-usa Vitest workflow.

---

### M2 — Public site

**#8 Global nav with dropdowns**
Seven top-level items per the IA. Each opens a menu listing its children.
*Fixes:* "put bullets... to orient people" · "more options will be displayed so as not to get lost"
*Done when:* every page in the IA is reachable in ≤2 clicks from home.

**#9 Resolve the "Courses" collision — highest-value fix in this backlog**
Top nav says **Kinétika Academy**, not "Courses." SWC College Prep Circuit is a *service* page that
links into filtered Academy courses. One place named "courses," never two.
*Fixes:* T2, which 7/7 participants failed or struggled with.
*Done when:* a first-time user finds SWC courses in one attempt.

**#10 Breadcrumbs on every page below top level**

**#11 Home page**
Hero, four service pillars **with real body text** (currently placeholder), results strip, featured
success story, newsletter.
*Fixes:* "pillars of service need a proper text"

**#12 Services hub + 4 pillar pages**
SWC College Prep Circuit · Avance Empresarial · Enriquecimiento Académico · RESET. Each states what
it is, who it's for, the process, duration, and outcome — above the fold, not behind a tile.
*Fixes:* T3 — "you have to enter one at a time to see which is which"

**#13 Historias de Éxito as a top-level page**
Video room (the existing YouTube testimonials), the origin/abroad map, named students with photos
and where they were admitted. Explicitly labeled "Historias de Éxito."
*Fixes:* T4 — "I've been all over the site and I can't find it"

**#14 Sobre Nosotros**
Quiénes Somos, Misión, Filosofía, Valores, Nuestra Historia, CEO message.
*Note from testing:* "I think the vision is missing" and "I feel like the story should be at the beginning."

**#15 Our Staff**
Photo, name, role, credentials, contact. Real photos only.

**#16 Results and statistics module**
Scholarships secured, admission rate, countries, students served. Reusable across home, services,
success stories.
*Why:* every persona wants proof; the parent persona is actively "scared of online scams."

**#17 Contact page — with a message field**
Name, email, phone, **subject dropdown, message textarea**, map, direct email, WhatsApp.
Submissions go to Resend and to the database.
*Fixes:* T8 — "add text box to send message" (said by 5 of 7 participants, unprompted)

**#18 FAQ page** with accordions and search.

**#19 Newsletter signup (#SWCNewsletter)** with double opt-in.

**#20 Trusted By** — partner and school logos.

**#21 Replace all stock photography**
*Fixes:* "the images seem to be taken from Google, it is better to use real photos"
*Note:* this is a content task, not a code task. It needs a photo shoot or a release-form request to
past students. Start it early — it will be the long pole.

**#22 Remove gift card functionality**

---

### M3 — Blog

**#23 MDX pipeline**
Frontmatter: title, slug, locale, date, author, category, cover, excerpt. Reading time, TOC.

**#24 Blog index — uniform cards**
Identical card dimensions and image aspect ratio. Filter by Avance Empresarial / Enriquecimiento
Académico / RESET.
*Fixes:* "the size of each square is different... one gets lost"

**#25 Post page + author profiles**
Author byline links to a staff profile.

**#26 Migrate existing team posts**
One MDX file per post, correct author and category, locale tagged.

**#27 RSS, sitemap, OG images, JSON-LD**

---

### M4 — Courses (read-only)

**#28 Course catalog**
Card: title, category, duration, level, price in HNL, **and a one-line description of what's inside.**
*Fixes:* "I don't know what Módulo 1 or 2 is — tell me what each module is so I know what I'm buying"

**#29 Course detail page**
Rebuild the LearnPress layout: overview / curriculum / instructor / FAQ tabs, requisitos /
características / audiencia objetivo, price box.
*Keep:* "inside I find everything I need and it guides me on how to pay" — this page tested well.

**#30 Enrollment request form (no account required)**
Captures the lead before payment. Emails the team.

---

### M5 — Accounts & LMS

**#31 Prisma schema** — User, Course, Module, Lesson, Enrollment, Order, Post, ContactSubmission.
**#32 Auth.js sign-in / sign-up / password reset** — *fixes:* "user sign in" broken.
**#33 Manual payment flow** — order + proof upload + admin approve/deny + receipt email. Mirrors the current LearnPress process exactly.
**#34 Student dashboard** — enrolled courses, profile, progress.
**#35 Gated lesson content** — locked until the order is approved.
*Requested in testing:* "it has locks and they are activated as the weeks go by" — support time-release.
**#36 Admin panel** — orders, students, contact submissions, course CRUD.

---

### M6 — Polish and validate

**#37 SEO and analytics** — metadata per locale, `hreflang`, sitemap, Plausible or GA4.
**#38 Performance budget** — Lighthouse ≥95 on mobile. Test on a throttled 3G profile; the audience is mobile-first in Central America.
**#39 Domain cutover + 301 redirects** from every legacy WordPress URL.
**#40 Repeat the usability test** — same 8 tasks, new build. T2, T4, and T8 must pass.

---

## 5. Not yet captured

- Three session recordings (`Ricardo_pen_a.mp4`, `Jafet_Romero.mp4`, `dra_diana.mp4`) are uploaded but
  I can't process video. Ricardo's and Jafet's sessions are already written up in the notes PDF.
  **Dra. Diana's session is not** — her notes row is missing from the document. Worth transcribing.
- No brand style guide was provided. The palette above is inferred from the persona deck and the logo.
