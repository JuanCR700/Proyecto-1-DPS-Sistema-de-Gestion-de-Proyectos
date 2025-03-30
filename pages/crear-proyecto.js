import { useState, useEffect } from 'react';
import axios from 'axios';

const CrearProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState({ nombre: '', descripcion: '', gerenteId: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProyectos();
    fetchUsuarios();
  }, []);

  const fetchProyectos = async () => {
    try {
      const response = await axios.get('/api/proyectos');
      setProyectos(response.data.proyectos);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      setError('Error al cargar los proyectos.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsuarios(response.data.users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleCrearProyecto = async () => {
    if (!nuevoProyecto.nombre || !nuevoProyecto.gerenteId) {
      alert('El nombre del proyecto y el gerente son obligatorios');
      return;
    }

    try {
      await axios.post('/api/proyectos', nuevoProyecto);
      setNuevoProyecto({ nombre: '', descripcion: '', gerenteId: null });
      fetchProyectos();
      alert('Proyecto creado correctamente');
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      alert('Error al crear el proyecto.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Proyectos</h1>

      {/* Crear Proyecto */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white text-center">
          <h2>Crear Proyecto</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Nombre del Proyecto</label>
            <input
              type="text"
              className="form-control text-center"
              value={nuevoProyecto.nombre}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, nombre: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control text-center"
              value={nuevoProyecto.descripcion}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcion: e.target.value })}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Miembro a asignar proyecto</label>
            <select
              className="form-select text-center"
              value={nuevoProyecto.gerenteId || ''}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, gerenteId: e.target.value })}
            >
              <option value="">Seleccionar Miembro</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre_usuario}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-success w-100" onClick={handleCrearProyecto} disabled={loading}>
            Crear Proyecto
          </button>
        </div>
      </div>

      {/* Listar Proyectos */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white text-center">
          <h2>Lista de Proyectos</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-center">Cargando proyectos...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : proyectos.length === 0 ? (
            <p className="text-center">No hay proyectos disponibles.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '25%' }}>Nombre</th>
                    <th style={{ width: '35%' }}>Descripción</th>
                    <th style={{ width: '20%' }}>Miembro</th>
                    <th style={{ width: '20%' }}>Tareas</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((proyecto) => (
                    <tr key={proyecto.id}>
                      <td>{proyecto.nombre}</td>
                      <td>{proyecto.descripcion || 'Sin descripción'}</td>
                      <td>{proyecto.gerente?.nombre_usuario || 'No asignado'}</td>
                      <td>
                        {proyecto.tareas.length > 0
                          ? proyecto.tareas.map((tarea) => tarea.titulo).join(', ')
                          : 'Sin tareas'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearProyecto;