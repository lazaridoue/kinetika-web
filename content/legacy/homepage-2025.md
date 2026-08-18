# Recovered homepage copy

**Source:** `web.archive.org/web/20250328064524/https://kinetika.consulting/`
**Captured:** 28 March 2025
**Status:** the only page ever archived. 40 captures of `/`, plus `robots.txt` and `favicon.ico`.
No subpages exist in the archive.

---

## Read this before using the copy below

This capture is **not** the site the usability testing was run against. Compare it to the 2022
`Guía de Usuario` screenshots:

|              | 2022 (tested version)                                     | 2025 (this capture)                                                      |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| Background   | Near-black                                                | Light                                                                    |
| Nav          | Home · About Us · Our Staff · Courses · Blog · Contact    | "MAIN MENU" burger                                                       |
| Structure    | Services + LearnPress course catalog                      | Three pillars, no visible catalog                                        |
| Pillar names | Avance Empresarial, Enriquecimiento Académico, RESET, SWC | Ingeniería Institucional, Enriquecimiento Académico, Ingeniería Personal |

Someone already began a rebuild between 2022 and 2025. The pillar names changed. Confirm with the
team which naming is current before writing any page copy — the IA diagram uses the 2022 names, and
this capture uses different ones for what appear to be the same three things.

### Two items that look like unreplaced theme placeholders

- **Address: `2360 Hood Avenue, San Diego, CA, 92123`.** Kinétika is Honduran and every persona is
  Central American. This is almost certainly demo content that shipped to production. Verify before
  it reaches the new contact page.
- **Testimonial signed "Juan Perez."** Generic placeholder name, no photo, no context. Do not
  migrate. Issue #13 needs real, attributable success stories.

### Language mixing is still present in 2025

A Spanish heading with an English body directly beneath it:

> **Pilares de Servicio**
> Explore the core services that drive transformation and growth for individuals and startups

Also `EXPLORA` next to `LEARN MORE`, and a footer section headed `Our Services` listing
`Leadership · Consulting · Personal Growth · Startup Support` in English on an otherwise Spanish
page. This is exactly what participants flagged: _"Choose whether to use Spanish or English, do not
combine."_ Issue #5 exists because of this.

---

## Recovered copy — verbatim, Spanish

### Hero

> **Desencadenando potencial a través de la transformación**
> Especialistas en liderazgo y desarrollo empresarial con enfoque cristocéntrico
> `EXPLORA`

### Pilares de Servicio

**Ingeniería Institucional**

> Nos apasiona marcar la diferencia con entregables de alto valor estratégico, una mirada omnicanal
> y con un diseño que genere experiencias únicas para poner tu máximo potencial empresarial en
> movimiento.

**Enriquecimiento Académico**

> La gente extraordinaria invierte en educación. Nosotros transformamos vidas equipando líderes en
> aquello que suena imposible de obtener.

**Ingeniería Personal**

> Te acompañamos a desarrollar tu marca personal con nuestro programa Reset, en donde aprenderás y
> te empoderarás de tu imagen personal.

_Note: this resolves the team-notes item "pillars of service need a proper text" — the text exists,
it just wasn't surfaced on the tile. Testing confirmed: "there are 3 pillars on the page, but you
have to enter one at a time to see which is which."_

### Nuestra Historia

> Hoy, KINÉTIKA, se posiciona como la institución cuyo movimiento continuamente inspira generaciones
> alrededor de Latinoamérica **a alcanzar su máximo potencial y desafiar su zona de comfort** para
> ayudarles a alcanzar aquello que consideran imposible o incómodo a través de 3 ejes estratégicos:
>
> - INGENIERÍA PERSONAL
> - ENRIQUECIMIENTO ACADÉMICO
> - INGENIERÍA INSTITUCIONAL

### ¿Por qué KINÉTIKA y qué hay detrás de la marca?

> La palabra de origen griego significa cinésica, la ciencia que estudia el movimiento, factor clave
> del éxito: FE + OBRAS EN MOVIMIENTO.
>
> Nuestras generaciones, sin importar su edad, desean éxitos y riquezas con poco sacrificio dada la
> nueva cultura basada en la gratificación inmediata. Razón por la cual luchamos para hacer entender
> a toda persona o institución que si nos estancamos y no nos movemos con sentido de urgencia será
> imposible lograr los objetivos trazados. Creemos firmemente que bajo nuestro método de trabajo
> Cristocéntrico, el Espíritu Santo se manifiesta con poder en la vida de las personas en medio de
> su movimiento guiado por los expertos.
>
> El isotipo de la **marca** es la G y la P de **Gabriella Peña**, quien da a luz la idea original
> inspirada por Dios. Conscientes de que la cabeza de un cuerpo no es más importante que cada una de
> sus partes, KINÉTIKA y su CEO honran constantemente la labor de cada uno de los especialistas que
> han sido escogidos con sumo cuidado para colaborar en la visión. Cada uno de ellos son nuestros
> activos más valiosos. Ellos contribuyen día con día a crear experiencias inolvidables para cada
> una de las personas que buscan transformar su vida y negocios marcando una huella personal
> indeleble.
>
> Es por ello, que nuestra marca se posiciona como sombrilla de una serie de empresas e iniciativas
> que tienen como finalidad el **crecimiento, aprendizaje y transformación** de las naciones
> latinoamericanas a través de experiencias **altamente personalizadas**.

### Sobre Nosotros

> Somos una firma consultora que se especializa en la transformación de personas, futuros líderes y
> empresas startup para desencadenar y poner en movimiento su potencial a través de un método
> cristocéntrico de trabajo con especialistas expertos en diferentes disciplinas.

### Value blocks

**Crecimiento Auténtico**

> Enfocados en tu crecimiento personal y profesional de manera auténtica y consciente.

**Guiados por la Excelencia**

> Nuestro equipo de expertos te guiará en tu camino hacia la excelencia y el logro de tus metas.

### Working hours (verify)

> Mon-Fri: 9 AM – 6 PM · Saturday: 9 AM – 4 PM · Sunday: Closed

---

## What this changes in the backlog

- **#1 — closed.** This is the recovery.
- **#39 — shrinks.** Only `/` was ever archived, so there is no legacy URL map to preserve. A single
  root redirect covers it.
- **#11, #12, #14 — unblocked.** Real Spanish copy now exists for the hero, all three pillars,
  Nuestra Historia, and Sobre Nosotros.
- **New consideration for #14 and #12:** the cristocéntrico positioning and the FE + OBRAS EN
  MOVIMIENTO framing are central to the brand and appear nowhere in the IA diagram, the personas, or
  the competitive audit. Ask the team how prominent this should be on the new site — it's a
  positioning decision, not a design one, and it affects the hero.
- **New question:** which pillar naming is current, the 2022 set or the 2025 set?
