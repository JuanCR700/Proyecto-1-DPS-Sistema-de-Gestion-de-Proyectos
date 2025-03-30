import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState('');
  const [tareas, setTareas] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  // Obtener proyectos al cargar el componente
  useEffect(() => {
    fetchProyectos();
    fetchMiembros();
  }, []);

  const fetchProyectos = async () => {
    try {
      const response = await axios.get('/api/proyectos');
      setProyectos(response.data.proyectos);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const fetchMiembros = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setMiembros(response.data.users);
    } catch (error) {
      console.error('Error al obtener miembros:', error);
    }
  };

  const crearProyecto = async () => {
    if (!nuevoProyecto) return alert('El nombre del proyecto es obligatorio');
    try {
      await axios.post('/api/proyectos', { nombre: nuevoProyecto });
      setNuevoProyecto('');
      fetchProyectos();
    } catch (error) {
      console.error('Error al crear proyecto:', error);
    }
  };

  const asignarTarea = async (proyectoId, tarea) => {
    try {
      await axios.post(`/api/proyectos/${proyectoId}/tareas`, tarea);
      fetchProyectos();
    } catch (error) {
      console.error('Error al asignar tarea:', error);
    }
  };

  return (
    <div>
      <h1>Panel de Administración</h1>

      {/* Crear Proyecto */}
      <div>
        <h2>Crear Proyecto</h2>
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={nuevoProyecto}
          onChange={(e) => setNuevoProyecto(e.target.value)}
        />
        <button onClick={crearProyecto}>Crear</button>
      </div>

      {/* Listar Proyectos */}
      <div>
        <h2>Proyectos</h2>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id}>
            <h3>{proyecto.nombre}</h3>
            <button onClick={() => setProyectoSeleccionado(proyecto)}>
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {/* Detalles del Proyecto */}
      {proyectoSeleccionado && (
        <div>
          <h2>Detalles del Proyecto: {proyectoSeleccionado.nombre}</h2>
          <h3>Tareas</h3>
          {proyectoSeleccionado.tareas.map((tarea) => (
            <div key={tarea.id}>
              <p>{tarea.descripcion}</p>
              <p>Asignado a: {tarea.asignadoA}</p>
            </div>
          ))}

          <h3>Asignar Nueva Tarea</h3>
          <input
            type="text"
            placeholder="Descripción de la tarea"
            onChange={(e) =>
              setTareas({ ...tareas, descripcion: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setTareas({ ...tareas, asignadoA: e.target.value })
            }
          >
            <option value="">Seleccionar Miembro</option>
            {miembros.map((miembro) => (
              <option key={miembro.id} value={miembro.id}>
                {miembro.nombre_usuario}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              asignarTarea(proyectoSeleccionado.id, {
                descripcion: tareas.descripcion,
                asignadoA: tareas.asignadoA,
              })
            }
          >
            Asignar Tarea
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
