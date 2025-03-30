import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4 shadow text-center">
        <h3 className="text-danger mb-4">Acceso no autorizado</h3>
        <p>No tienes permisos para acceder a esta página.</p>
        <Link href="/dashboard">
          <button className="btn btn-primary">Volver al Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;