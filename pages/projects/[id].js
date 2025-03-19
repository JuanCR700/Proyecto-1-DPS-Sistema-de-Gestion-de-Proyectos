// pages/projects/[id].js
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Datos de ejemplo para el proyecto
  const project = {
    id: id,
    name: `Proyecto ${id}`,
    description: `Descripción detallada del Proyecto ${id}. Este es un proyecto importante que requiere atención inmediata.`,
    status: 'En progreso',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <header className="bg-dark text-white p-3">
        <div className="container">
          <h1>{project.name}</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h2>Descripción</h2>
            <p>{project.description}</p>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Detalles del Proyecto</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Estado:</strong>{' '}
                    <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <strong>Fecha de inicio:</strong> {project.startDate}
                  </li>
                  <li className="list-group-item">
                    <strong>Fecha de fin:</strong> {project.endDate}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Botón para volver al dashboard */}
        <div className="mt-4">
          <Link href="/dashboard">
            <a className="btn btn-secondary">Volver al Dashboard</a>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-4">
        <p className="mb-0">© 2025. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

// Función para obtener la clase del badge según el estado del proyecto
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'En progreso':
      return 'bg-warning text-dark';
    case 'Completado':
      return 'bg-success text-white';
    case 'Pendiente':
      return 'bg-secondary text-white';
    default:
      return 'bg-light text-dark';
  }
};

export default ProjectDetails;