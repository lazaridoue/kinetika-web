import Link from "next/link";

/**
 * Home page — first draft for the marketing team.
 *
 * EVERY SPANISH STRING BELOW IS VERBATIM from the archived homepage,
 * capture 20250328064524, saved in content/legacy/homepage-2025.md.
 * Nothing here is translated, paraphrased, or invented. See CLAUDE.md.
 *
 * What is deliberately NOT here:
 * - The archived English subhead under "Pilares de Servicio." That line was the
 *   language-mixing defect participants complained about; reproducing it would
 *   reintroduce the bug.
 * - The "Juan Perez" testimonial. Placeholder name, no attribution.
 * - The San Diego address and working hours. Almost certainly theme demo content.
 * - Photography. Issue #21 — real students and staff only, never stock.
 *
 * The full build-out of these sections is issues #11 and #12. This is the shell
 * for #4, populated enough to be shown to people.
 */

const PILARES = [
  {
    slug: "ingenieria-institucional",
    title: "Ingeniería Institucional",
    body: "Nos apasiona marcar la diferencia con entregables de alto valor estratégico, una mirada omnicanal y con un diseño que genere experiencias únicas para poner tu máximo potencial empresarial en movimiento.",
  },
  {
    slug: "enriquecimiento-academico",
    title: "Enriquecimiento Académico",
    body: "La gente extraordinaria invierte en educación. Nosotros transformamos vidas equipando líderes en aquello que suena imposible de obtener.",
  },
  {
    slug: "ingenieria-personal",
    title: "Ingeniería Personal",
    body: "Te acompañamos a desarrollar tu marca personal con nuestro programa Reset, en donde aprenderás y te empoderarás de tu imagen personal.",
  },
];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28">
        <h1 className="max-w-4xl text-3xl md:text-4xl">
          Desencadenando potencial a través de la transformación
        </h1>
        <p className="text-ink-muted mt-6 max-w-2xl text-lg">
          Especialistas en liderazgo y desarrollo empresarial con enfoque
          cristocéntrico
        </p>
        <Link
          href="/servicios"
          className="bg-ink text-paper hover:bg-gold mt-10 inline-block rounded-md px-6 py-3.5 no-underline transition-colors"
        >
          Explora
        </Link>
      </section>

      {/* ------------------------------------------------------- pillars */}
      <section className="bg-ink text-paper py-20" aria-labelledby="pilares">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="pilares" className="text-gold text-2xl">
            Pilares de Servicio
          </h2>

          {/*
            Issue #12: participants said "there are 3 pillars on the page, but
            you have to enter one at a time to see which is which." Each card
            now states what it is before you click anything.
          */}
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {PILARES.map((p) => (
              <li
                key={p.slug}
                className="bg-ink-raised shadow-card text-paper flex flex-col rounded-lg p-7"
              >
                <h3 className="text-gold text-xl">{p.title}</h3>
                <p className="text-paper mt-3 flex-1 opacity-85">{p.body}</p>
                <Link
                  href={`/servicios/${p.slug}`}
                  className="text-gold mt-6 self-start no-underline hover:underline"
                >
                  Leer más
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- story */}
      <section
        className="mx-auto max-w-6xl px-6 py-20"
        aria-labelledby="historia"
      >
        <div className="max-w-3xl">
          <h2 id="historia" className="text-2xl">
            Nuestra Historia
          </h2>
          <p className="mt-6 text-lg">
            Hoy, KINÉTIKA, se posiciona como la institución cuyo movimiento
            continuamente inspira generaciones alrededor de Latinoamérica a
            alcanzar su máximo potencial y desafiar su zona de comfort para
            ayudarles a alcanzar aquello que consideran imposible o incómodo a
            través de 3 ejes estratégicos.
          </p>
          <Link
            href="/nosotros"
            className="mt-8 inline-block no-underline hover:underline"
          >
            Conoce más sobre nosotros
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------- about */}
      <section className="bg-ink text-paper py-20" aria-labelledby="nosotros">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="nosotros" className="text-2xl">
            Sobre Nosotros
          </h2>
          <p className="mt-6 max-w-3xl text-lg opacity-85">
            Somos una firma consultora que se especializa en la transformación
            de personas, futuros líderes y empresas startup para desencadenar y
            poner en movimiento su potencial a través de un método
            cristocéntrico de trabajo con especialistas expertos en diferentes
            disciplinas.
          </p>
        </div>
      </section>
    </>
  );
}
