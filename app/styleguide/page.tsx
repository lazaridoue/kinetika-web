/* Design token reference. Visit /styleguide.
   Keep this route for the life of the project — it's how you catch a drifting
   palette or a fourth font sneaking in. */

const swatches = [
  {
    name: "ink",
    cls: "bg-ink",
    hex: "#161A1D",
    note: "Type, wordmark, footer band. Never a full-page background.",
    contrast: "16.8 : 1 — AAA",
    onDark: true,
  },
  {
    name: "paper",
    cls: "bg-paper",
    hex: "#F7F5F0",
    note: "Primary surface. Warm, not clinical white.",
    contrast: "—",
    onDark: false,
  },
  {
    name: "sage",
    cls: "bg-sage",
    hex: "#C8D5BB",
    note: "Section bands. Lifted from the persona deck.",
    contrast: "background only",
    onDark: false,
  },
  {
    name: "periwinkle",
    cls: "bg-periwinkle",
    hex: "#5B51C4",
    note: "Links and interactive states.",
    contrast: "5.7 : 1 — AA",
    onDark: true,
  },
  {
    name: "signal",
    cls: "bg-signal",
    hex: "#1F6F5C",
    note: "CTAs, scholarship stats, admissions.",
    contrast: "5.6 : 1 — AA",
    onDark: true,
  },
];

const scale = [
  { cls: "text-4xl", label: "4xl / 60px", use: "Hero only" },
  { cls: "text-3xl", label: "3xl / 44px", use: "Page titles" },
  { cls: "text-2xl", label: "2xl / 32px", use: "Section headings" },
  { cls: "text-xl", label: "xl / 24px", use: "Subheadings" },
  { cls: "text-lg", label: "lg / 20px", use: "Lead paragraphs" },
  { cls: "text-base", label: "base / 17px", use: "Body" },
  { cls: "text-sm", label: "sm / 15px", use: "Captions, metadata" },
];

export default function StyleGuide() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm uppercase tracking-widest text-ink-muted">
        Kinétika
      </p>
      <h1 className="mt-2 text-3xl">Design tokens</h1>
      <p className="mt-4 text-ink-muted">
        If a color or font appears anywhere in this project that isn&apos;t on
        this page, it&apos;s a bug. Issue #3.
      </p>

      {/* ---------------------------------------------------------- color */}
      <h2 className="mt-16 text-2xl">Color</h2>
      <div className="mt-6 space-y-3">
        {swatches.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-5 rounded-md border border-rule bg-paper-raised p-4"
          >
            <div
              className={`${s.cls} h-16 w-16 shrink-0 rounded-md border border-rule`}
            />
            <div className="min-w-0">
              <p className="font-medium">
                {s.name}{" "}
                <span className="font-normal text-ink-muted">{s.hex}</span>
              </p>
              <p className="text-sm text-ink-muted">{s.note}</p>
              <p className="text-sm text-ink-muted">On paper: {s.contrast}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md bg-sage p-6">
        <p className="text-ink">
          Sage is a band color. Ink on sage reads at 11.8 : 1, so body copy is
          safe here — but never set periwinkle or signal type on it.
        </p>
      </div>

      {/* ----------------------------------------------------------- type */}
      <h2 className="mt-16 text-2xl">Typography</h2>
      <p className="mt-4 text-ink-muted">
        Two families. Participants said the font changed page to page, so this
        is the whole system.
      </p>

      <div className="mt-6 rounded-md border border-rule bg-paper-raised p-6">
        <p className="text-sm uppercase tracking-widest text-ink-muted">
          Display — Cormorant Garamond
        </p>
        <p className="mt-2 font-display text-3xl">
          Desencadenando potencial a través de la transformación
        </p>
        <p className="mt-3 text-sm text-ink-muted">
          Wordmark, page titles, and pull quotes only. Nothing else.
        </p>
      </div>

      <div className="mt-4 rounded-md border border-rule bg-paper-raised p-6">
        <p className="text-sm uppercase tracking-widest text-ink-muted">
          Sans — Inter
        </p>
        <p className="mt-2 font-sans text-lg">
          Somos una firma consultora que se especializa en la transformación de
          personas, futuros líderes y empresas startup.
        </p>
        <p className="mt-3 text-sm text-ink-muted">
          Everything else. Accented characters above confirm the latin-ext
          subset loaded — if á, é, í, ó, ú or ñ render in a fallback face, the
          font config is wrong.
        </p>
      </div>

      <div className="mt-6 space-y-3 rounded-md border border-rule bg-paper-raised p-6">
        {scale.map((t) => (
          <div key={t.cls} className="flex items-baseline gap-4">
            <span className={`${t.cls} font-display`}>Movimiento</span>
            <span className="text-sm text-ink-muted">
              {t.label} — {t.use}
            </span>
          </div>
        ))}
      </div>

      {/* -------------------------------------------------------- a11y */}
      <h2 className="mt-16 text-2xl">Accessibility check</h2>
      <p className="mt-4 text-ink-muted">
        Press Tab to move through these. Every one must show a periwinkle ring.
        Issue #6 makes this a CI gate.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button className="rounded-md bg-signal px-5 py-3 text-paper">
          Request information
        </button>
        <button className="rounded-md border border-ink px-5 py-3 text-ink">
          View courses
        </button>
        <a href="#main" className="self-center underline">
          A Text Link
        </a>
      </div>

      <p className="mt-10 text-sm text-ink-muted">
        Buttons name what happens. &ldquo;Solicitar información,&rdquo; not
        &ldquo;Enviar.&rdquo;
      </p>
    </div>
  );
}
