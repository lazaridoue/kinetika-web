#!/usr/bin/env bash
#
# Creates labels, milestones, and the full issue backlog for the Kinétika rebuild.
#
# Prerequisites:
#   gh auth login
#   REPO=<owner>/<repo> ./create-github-issues.sh
#
# Safe to read before running. It only creates; it never deletes.

set -euo pipefail

REPO="${REPO:-lazaridoue/kinetika-web}"

echo "Target repository: $REPO"
read -rp "Continue? [y/N] " ok
[[ "$ok" == "y" || "$ok" == "Y" ]] || exit 1

# ---------------------------------------------------------------- labels ----

label() {
  gh label create "$1" --repo "$REPO" --color "$2" --description "$3" --force >/dev/null
  echo "  label: $1"
}

echo "Creating labels..."
label "foundation"    "0E8A16" "Tooling, config, deploy pipeline"
label "page"          "1D76DB" "A user-facing page"
label "ia"            "5319E7" "Information architecture and navigation"
label "a11y"          "D93F0B" "Accessibility"
label "i18n"          "FBCA04" "Translation and localization"
label "blog"          "C2E0C6" "Blog and editorial"
label "courses"       "BFD4F2" "Course catalog and LMS"
label "auth"          "B60205" "Accounts and sessions"
label "content"       "E99695" "Copy, photography, media — not code"
label "usability-fix" "FF6B35" "Directly fixes a documented test failure"
label "seo"           "006B75" "Search, metadata, performance"

# ------------------------------------------------------------ milestones ----

milestone() {
  gh api "repos/$REPO/milestones" -f title="$1" -f description="$2" >/dev/null 2>&1 \
    && echo "  milestone: $1" \
    || echo "  milestone: $1 (already exists)"
}

echo "Creating milestones..."
milestone "M1 — Foundation"        "Repo, design tokens, layout shell, i18n, a11y gate, CI"
milestone "M2 — Public site"       "All marketing pages with corrected IA. Public launch."
milestone "M3 — Blog"              "MDX pipeline and team posts"
milestone "M4 — Courses"           "Read-only catalog and enrollment requests"
milestone "M5 — Accounts & LMS"    "Auth, manual payments, gated content, admin"
milestone "M6 — Polish & validate" "SEO, performance, redirects, retest"

# ---------------------------------------------------------------- issues ----

mk() {
  local title="$1" labels="$2" milestone="$3"
  gh issue create --repo "$REPO" --title "$title" --label "$labels" \
    --milestone "$milestone" --body-file - >/dev/null
  echo "  issue: $title"
}

echo "Creating issues..."

# ============================ M1 — Foundation ==============================

mk "Recover old site content from WordPress or the Wayback Machine" \
   "foundation,content" "M1 — Foundation" <<'BODY'
The live site is unreachable. Recover as much original content as possible before rebuilding.

**Try, in order:**
1. `web.archive.org/web/*/kinetika.consulting/*` — gives a full URL list of everything ever crawled.
2. If WP hosting is still active: `Tools → Export` produces an XML with all posts, pages, and media URLs.
3. If an UpdraftPlus backup exists, it contains the full database and uploads directory.
4. Fallback: the `Guía de Usuario` screenshots plus the Information Architecture diagram.

**Done when:** `content/legacy/` holds recovered copy and media, or a note records what's unrecoverable.
BODY

mk "Scaffold Next.js 16 + TypeScript + Tailwind and deploy to Vercel" \
   "foundation" "M1 — Foundation" <<'BODY'
App Router, TypeScript strict mode, Tailwind, ESLint, Prettier, Vitest.

**Done when:** pushing to `main` auto-deploys to a public URL.
BODY

mk "Define design tokens and a single type scale" \
   "foundation,usability-fix" "M1 — Foundation" <<'BODY'
Every participant in usability testing complained about darkness, and several about inconsistent
typography ("the font is different on each page, you have to be more uniform").

**Palette** — keep the Didone wordmark, invert everything else:

```
--ink        #161A1D   type, wordmark, footer band — never a full-page background
--paper      #F7F5F0   primary surface
--sage       #C8D5BB   section bands (from the existing persona deck)
--periwinkle #5B51C4   links and interactive states
--signal     #1F6F5C   CTAs, scholarship stats, admission markers
```

**Type:** Didone serif for display only — wordmark, page titles, pull quotes. One humanist sans for
everything else, one scale, site-wide.

**Done when:** no raw hex value or `font-family` exists outside the token file.
BODY

mk "Build the layout shell — header, footer, skip link" \
   "foundation,a11y" "M1 — Foundation" <<'BODY'
The team notes list both the footer and the social media links as broken.

- Header with logo, nav, language toggle, account entry point
- Footer with working navigation, contact details, and **working** social links
- Skip-to-content link, semantic landmarks

**Done when:** every footer and social link resolves, and skip-to-content works via keyboard.
BODY

mk "Set up next-intl with Spanish as the default locale" \
   "i18n,usability-fix" "M1 — Foundation" <<'BODY'
Participants repeatedly hit mixed-language pages:
- "Choose whether to use Spanish or English, do not combine."
- "As it is in English and you are asking me in Spanish, that confuses me."
- "That you can choose the language in which the page is viewed."

The parent persona explicitly lists an English language barrier as a pain point, so Spanish is the
source language, not the translation.

- Locale-prefixed routes: `/es/...` and `/en/...`
- Visible toggle in the header
- Correct `<html lang>` per locale

**Done when:** every route renders completely in both locales with no mixed-language page.
BODY

mk "Establish accessibility baseline and CI gate" \
   "a11y,foundation" "M1 — Foundation" <<'BODY'
Accessibility is a stated priority, so it gets a build gate rather than a checklist.

- `@axe-core/playwright` across every route
- WCAG 2.1 AA contrast verified on all tokens
- Visible focus rings, logical tab order
- `prefers-reduced-motion` respected
- Semantic landmarks and heading hierarchy

**Done when:** CI fails on any new axe violation.
BODY

mk "Add GitHub Actions workflow for lint, typecheck, unit tests, and a11y" \
   "foundation" "M1 — Foundation" <<'BODY'
Same shape as the fc-usa Vitest workflow. Runs on PRs to `main`.
BODY

# =========================== M2 — Public site ==============================

mk "Build global navigation with dropdown menus" \
   "ia,usability-fix" "M2 — Public site" <<'BODY'
Participants could not orient themselves:
- "You have the Kinétika menu, and on each branch I don't know if you could put bullets or something
  like that to see what's inside, to orient people."
- "Where it says home, more options will be displayed to know where things are and not to get lost."

Seven top-level items — inside the 6–7 range the competitive audit recommends:
Inicio · Servicios · Kinétika Academy · Historias de Éxito · Blog · Sobre Nosotros · Contacto

Each opens a dropdown listing its children.

**Done when:** every page in the IA is reachable within two clicks of home.
BODY

mk "Resolve the Courses naming collision" \
   "ia,usability-fix" "M2 — Public site" <<'BODY'
**The single highest-value fix in this backlog.** All seven participants failed or struggled with the
task "access SWC College Prep Circuit courses."

- "I got confused at the top where it says courses, I thought they were those."
- "I was guided mostly by what courses said, I didn't know there was more than one."
- "I would change the two tabs that indicate courses — tell me which one is which."

Root cause: two distinct things are both called "Courses." The top nav means Kinétika Academy; the
SWC courses live under Academic Enrichment.

**Fix:**
- Top nav reads **Kinétika Academy**, never "Courses"
- SWC College Prep Circuit is a *service* page that links into a filtered Academy view
- Exactly one place on the site is named courses

**Done when:** a first-time user reaches SWC courses on their first attempt.
BODY

mk "Add breadcrumbs to all pages below top level" "ia" "M2 — Public site" <<'BODY'
Click paths in the usability test show heavy back-and-forth through Home. Breadcrumbs give lateral
movement without a round trip.
BODY

mk "Build the home page" "page,content" "M2 — Public site" <<'BODY'
- Hero
- Four service pillars **with real body text** — the team notes flag "pillars of service need a proper text"
- Results strip (scholarships, admissions, countries)
- Featured success story
- Newsletter signup

The competitive audit notes the strongest competitor makes it clear from the first screen what the
company is and how it helps.
BODY

mk "Build the services hub and four pillar pages" \
   "page,usability-fix,content" "M2 — Public site" <<'BODY'
SWC College Prep Circuit · Avance Empresarial · Enriquecimiento Académico · RESET (con La Nutria Latinoamérica)

Testing found the current pillar treatment confusing: "there are 3 pillars on the page, but you have
to enter one at a time to see which is which. Bullets that each page contains."

Each pillar page must state, above the fold: what it is, who it's for, the process, the duration,
and the outcome. Not behind a tile.
BODY

mk "Build Historias de Éxito as a top-level page" \
   "page,usability-fix,content" "M2 — Public site" <<'BODY'
Six of seven participants failed to find the success stories.

- "I've been all over the site and I can't find it."
- "They are very hidden and do not say the name of the success stories."
- "I realize that they are success stories because you told me, but not because of the video or what it says."

Contents, per the IA diagram:
- Video room (existing YouTube testimonials), each explicitly labeled as a success story
- Students Origin Map and Students Studying Abroad Map
- Named students with photos and where they were admitted

Consider building the two maps as one continuous scroll-driven arc — origin to destination. It is
the success-stories fix and the brand thesis in one component.
BODY

mk "Build Sobre Nosotros" "page,content" "M2 — Public site" <<'BODY'
Quiénes Somos · Misión · Filosofía · Valores · Nuestra Historia · CEO message

Two direct notes from testing:
- "I think the vision is missing and the values are there — for many it is important. I would add the vision."
- "I like it, but I feel like the story should be at the beginning."

The competitive audit found the strongest structure splits three ways: who we are, meet the team,
client testimonials.
BODY

mk "Build the Our Staff page" "page,content" "M2 — Public site" <<'BODY'
Photo, name, role, credentials, contact for each team member. The audit calls this table stakes —
the strongest competitor has it, the weakest has no team section at all.

Real photographs only.
BODY

mk "Build a reusable results and statistics module" \
   "page,content" "M2 — Public site" <<'BODY'
Scholarships secured, admission rate, countries represented, students served.

The team notes ask to "show results of the education (reviews and statistics)." Every student persona
wants proof of outcomes, and the parent persona lists "scared of online scams" as a pain point —
verifiable results are a conversion mechanism here, not decoration.

Reusable across home, service pages, and success stories.
BODY

mk "Rebuild the contact page with a message field" \
   "page,usability-fix" "M2 — Public site" <<'BODY'
Five of seven participants could not complete "send a message to the Kinétika team." The form
collects name, email, and phone — and has no message box.

- "Add text box to send message in contact area."
- "Add the box mail to be able to write the message."
- "Possibly what I would change is to add the message box... because that would facilitate the process."
- "I would like you to have a message or let me choose what I would like to know about."

**Build:** name, email, phone, **subject dropdown, message textarea**, map, direct email, WhatsApp.
Submissions go to Resend and persist to the database.
BODY

mk "Build the FAQ page" "page,content" "M2 — Public site" <<'BODY'
Accordions grouped by audience — students, parents, business clients — with search.
BODY

mk "Build the #SWCNewsletter signup" "page" "M2 — Public site" <<'BODY'
Double opt-in. Present in the footer and on the home page.
BODY

mk "Build the Trusted By section" "page,content" "M2 — Public site" <<'BODY'
Partner schools, universities, and company logos. The audit found case studies and client logos to
be the clearest credibility differentiator between competitors.
BODY

mk "Replace all stock photography with real students and staff" \
   "content,usability-fix" "M2 — Public site" <<'BODY'
"The images seem to be taken from Google — it is better to use photos of mixed race people and real
photos." / "The photos should be real."

The team notes also ask to "include more pictures of students/staff."

**This is a content task, not a code task.** It needs a photo shoot or release-form requests to past
students. Start it early — it is the long pole for launch.
BODY

mk "Remove gift card functionality" "content" "M2 — Public site" <<'BODY'
Listed for removal in the team notes. Ensure no route, nav entry, or footer link survives migration.
BODY

# ============================== M3 — Blog ==================================

mk "Build the MDX content pipeline" "blog,foundation" "M3 — Blog" <<'BODY'
Frontmatter: title, slug, locale, date, author, category, cover, excerpt.
Generate reading time and table of contents. Categories: Avance Empresarial, Enriquecimiento
Académico, RESET.
BODY

mk "Build the blog index with uniform cards" \
   "blog,usability-fix" "M3 — Blog" <<'BODY'
"The size of each square is different... there are people who have ADHD or get lost easily, one gets
lost. Maybe they should be the same size." / "The font is different on each page, you have to be more
uniform."

Identical card dimensions and image aspect ratio, fixed by CSS rather than by content discipline.
Filter by category. Search.

One participant found the content itself genuinely useful — "they all look very relevant" — so the
problem is presentation, not editorial.
BODY

mk "Build the blog post page and author profiles" "blog" "M3 — Blog" <<'BODY'
Post layout with byline linking to the author's staff profile, category, related posts.
BODY

mk "Migrate existing team blog posts to MDX" "blog,content" "M3 — Blog" <<'BODY'
One MDX file per post. Correct author, category, and locale tag on each.

Posts written in Spanish stay Spanish — do not machine-translate. Mark translated versions
explicitly and only publish them when a human has reviewed them.
BODY

mk "Add RSS, sitemap, OG images, and JSON-LD to the blog" "blog,seo" "M3 — Blog" <<'BODY'
Per-locale feeds and `hreflang` on all post pages.
BODY

# ============================= M4 — Courses ================================

mk "Build the course catalog page" \
   "courses,usability-fix" "M4 — Courses" <<'BODY'
The old catalog listed courses as bare "Módulo 1" / "Módulo 2":

"I would like you to tell me what each module is, 1 and 2, so that I know what I am going to buy,
because I don't know what module 1 or 2 is."

Each card: title, category, duration, level, price in HNL, **and a one-line description of contents.**
Filter by track. Search.
BODY

mk "Build the course detail page" "courses" "M4 — Courses" <<'BODY'
Rebuild the LearnPress layout, which tested well — "outside is the cost, and inside I find everything
I need and it guides me on how to pay" and "the curriculum part seems to me very complete."

- Header: instructor, category, duration, level, lesson count, enrolled count
- Accordions: Requisitos, Características, Audiencia objetivo
- Tabs: Vista General, Curriculum, Instructor, FAQ
- Price box in HNL with the enrollment CTA
- One participant asked for a share button at the top

**Do not redesign this page.** Port it.
BODY

mk "Build the enrollment request form" "courses" "M4 — Courses" <<'BODY'
Captures the lead before payment, no account required. Emails the team via Resend and persists the
request. This keeps M2 and M4 shippable without waiting on auth.
BODY

# ========================= M5 — Accounts & LMS =============================

mk "Design the Prisma schema" "auth,courses" "M5 — Accounts & LMS" <<'BODY'
User, Course, Module, Lesson, Enrollment, Order, Post, ContactSubmission.
Model the manual order lifecycle explicitly: pending → proof submitted → approved / denied.
BODY

mk "Implement Auth.js sign-in, sign-up, and password reset" "auth" "M5 — Accounts & LMS" <<'BODY'
Replaces the broken WordPress account icon flagged in the team notes.
Email and password, plus Google. Spanish-language email templates.
BODY

mk "Implement the manual payment and order approval flow" "auth,courses" "M5 — Accounts & LMS" <<'BODY'
Stripe does not support Honduras, so mirror the existing LearnPress process rather than blocking
launch on a payments integration:

1. Student requests enrollment and uploads proof of payment
2. Admin approves or denies the order
3. On approval, the student receives an access link and sets a password
4. Course content unlocks

Receipts as downloadable PDFs, matching the current invoice export.
BODY

mk "Build the student dashboard" "auth,courses" "M5 — Accounts & LMS" <<'BODY'
Enrolled courses, profile editing, progress. Matches the current front-end-only student view.
BODY

mk "Implement gated lesson content with time-release" "courses" "M5 — Accounts & LMS" <<'BODY'
Content locked until the order is approved, as today.

Requested during testing: "it has locks and they are activated as the weeks go by" — support
scheduled unlocking, not just a binary gate. Also: "the theme of each module should be in accordance
with the theme of each module" — per-module cover art rather than one generic image.
BODY

mk "Build the admin panel" "auth" "M5 — Accounts & LMS" <<'BODY'
Orders queue, student list, contact form submissions, course and lesson CRUD, blog post status.
This is what replaces wp-admin.
BODY

# ======================= M6 — Polish & validate ============================

mk "Add SEO metadata and analytics" "seo" "M6 — Polish & validate" <<'BODY'
Per-locale metadata, `hreflang`, sitemap, robots, Plausible or GA4.
BODY

mk "Meet the mobile performance budget" "seo,a11y" "M6 — Polish & validate" <<'BODY'
Lighthouse ≥95 on mobile. Test on a throttled 3G profile — the student personas are mobile-first in
Honduras and El Salvador, and one participant explicitly noted low computer literacy among older users.
BODY

mk "Cut over the domain with 301 redirects from legacy URLs" "seo" "M6 — Polish & validate" <<'BODY'
Map every WordPress URL recovered in the first issue to its new route. Any URL without a match
redirects to the nearest section, never to a 404.
BODY

mk "Repeat the usability test on the new build" "usability-fix" "M6 — Polish & validate" <<'BODY'
Same eight tasks, same script, new participants.

**Pass condition:** tasks 2 (find SWC courses), 4 (find success stories), and 8 (send a message) all
complete without assistance. These are the three that failed in the original round.

Also transcribe the `dra_diana.mp4` session — her notes are missing from the original results
document, so that participant's findings were never captured.
BODY

echo
echo "Done. Open the board:"
echo "  gh issue list --repo $REPO --milestone 'M1 — Foundation'"
