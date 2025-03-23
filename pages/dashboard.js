import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      // Llamada al endpoint de cierre de sesión
      await axios.post('/api/logout');
      console.log('Sesión cerrada exitosamente');

      // Redirigir al usuario a la página de inicio de sesión
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Datos de ejemplo para los proyectos
  const projects = [
    { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1', status: 'En progreso' },
    { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2', status: 'Completado' },
    { id: 3, name: 'Proyecto 3', description: 'Descripción del Proyecto 3', status: 'Pendiente' },
  ];

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-light"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Ocultar Menú' : 'Mostrar Menú'}
        </button>
        <div>
          <span className="me-3">Bienvenido, Usuario</span>
          <Link href="/profile">
            <button className="btn btn-outline-light me-2">Perfil</button>
          </Link>
          {/* Botón para cerrar sesión */}
          <button className="btn btn-primary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Resto del código del dashboard */}
      <div className="row g-0">
        {/* Menú lateral */}
        <div
          className={`col-md-3 bg-light vh-100 p-4 ${isSidebarOpen ? '' : 'd-none d-md-block'}`}
          style={{ transition: 'all 0.3s' }}
        >
          <h3>Dashboard</h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link active">
                Proyectos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/tasks" className="nav-link">
                Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/settings" className="nav-link">
                Configuración
              </Link>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="col-md-9 p-4">
          <h1>Mis Proyectos</h1>
          <div className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="card-footer">
                    <Link href={`/projects/${project.id}`}>
                      <button className="btn btn-primary w-100">Ver Detalles</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3">
        <p className="mb-0">© 2025 . Todos los derechos reservados.</p>
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

export default Dashboard;