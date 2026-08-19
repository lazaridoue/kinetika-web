import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return {
    title: t("nosotrosTitle"),
  };
}

export default async function NosotrosPage() {
  const t = await getTranslations("pages");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">{t("nosotrosTitle")}</h1>

      <p className="mt-6 text-lg">
        Somos una firma consultora que se especializa en la transformación de
        personas, futuros líderes y empresas startup para desencadenar y poner
        en movimiento su potencial a través de un método cristocéntrico de
        trabajo con especialistas expertos en diferentes disciplinas.
      </p>

      <h2 className="mt-12 text-2xl md:text-3xl">Nuestra Historia</h2>
      <p className="mt-4 text-lg">
        Hoy, KINÉTIKA, se posiciona como la institución cuyo movimiento
        continuamente inspira generaciones alrededor de Latinoamérica a alcanzar
        su máximo potencial y desafiar su zona de comfort para ayudarles a
        alcanzar aquello que consideran imposible o incómodo a través de 3 ejes
        estratégicos:
      </p>
      <p className="mt-4 text-lg">
        INGENIERÍA PERSONAL
        <br />
        ENRIQUECIMIENTO ACADÉMICO
        <br />
        INGENIERÍA INSTITUCIONAL
      </p>

      <h2 className="mt-12 text-2xl md:text-3xl">
        ¿Por qué KINÉTIKA y qué hay detrás de la marca?
      </h2>
      <p className="mt-4 text-lg">
        La palabra de origen griego significa cinésica, la ciencia que estudia
        el movimiento, factor clave del éxito: FE + OBRAS EN MOVIMIENTO.
      </p>
      <p className="mt-4 text-lg">
        Nuestras generaciones, sin importar su edad, desean éxitos y riquezas
        con poco sacrificio dada la nueva cultura basada en la gratificación
        inmediata. Razón por la cual luchamos para hacer entender a toda persona
        o institución que si nos estancamos y no nos movemos con sentido de
        urgencia será imposible lograr los objetivos trazados. Creemos
        firmemente que bajo nuestro método de trabajo Cristocéntrico, el
        Espíritu Santo se manifiesta con poder en la vida de las personas en
        medio de su movimiento guiado por los expertos.
      </p>
      <p className="mt-4 text-lg">
        El isotipo de la marca es la G y la P de Gabriella Peña, quien da a luz
        la idea original inspirada por Dios. Conscientes de que la cabeza de un
        cuerpo no es más importante que cada una de sus partes, KINÉTIKA y su
        CEO honran constantemente la labor de cada uno de los especialistas que
        han sido escogidos con sumo cuidado para colaborar en la visión. Cada
        uno de ellos son nuestros activos más valiosos. Ellos contribuyen día
        con día a crear experiencias inolvidables para cada una de las personas
        que buscan transformar su vida y negocios marcando una huella personal
        indeleble.
      </p>
      <p className="mt-4 text-lg">
        Es por ello, que nuestra marca se posiciona como sombrilla de una serie
        de empresas e iniciativas que tienen como finalidad el crecimiento,
        aprendizaje y transformación de las naciones latinoamericanas a través
        de experiencias altamente personalizadas.
      </p>
    </section>
  );
}
