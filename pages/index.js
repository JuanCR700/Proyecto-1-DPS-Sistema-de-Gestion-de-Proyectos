// pages/index.js
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio - Gestión de Proyectos</title>
        <meta name="description" content="Gestiona tus proyectos de manera fácil y eficiente" />
      </Head>
      <div className="container mt-5">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold">¡Bienvenido! 🚀</h1>
          <p className="lead">Gestiona tus proyectos de manera fácil y eficiente</p>
        </header>

        <section className="text-center">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link href="/login" passHref>
              <button className="btn btn-primary btn-lg me-2 shadow-sm">
                Iniciar sesión
              </button>
            </Link>
            <Link href="/register" passHref>
              <button className="btn btn-success btn-lg shadow-sm">
                Registrarse
              </button>
            </Link>
          </div>
        </section>

        <footer className="text-center mt-5">
          <p className="text-muted">&copy; 2025 | Todos los derechos reservados</p>
        </footer>
      </div>
    </>
  );
}