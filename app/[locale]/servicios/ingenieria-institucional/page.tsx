import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ingeniería Institucional",
  };
}

export default function IngenieriaInstitucionalPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">Ingeniería Institucional</h1>
      <p className="mt-6 text-lg">
        Nos apasiona marcar la diferencia con entregables de alto valor
        estratégico, una mirada omnicanal y con un diseño que genere
        experiencias únicas para poner tu máximo potencial empresarial en
        movimiento.
      </p>
    </section>
  );
}
