import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <head>
        <title>Kinétika — Transforming your potential into movement</title>
      </head>
      <body>
        <main className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-3xl md:text-4xl">404</h1>
          <p className="mt-6 text-lg">Página no encontrada.</p>
          <Link
            href="/es"
            className="text-gold-deep mt-8 inline-block underline-offset-4 hover:underline"
          >
            Volver al inicio
          </Link>
        </main>
      </body>
    </html>
  );
}
