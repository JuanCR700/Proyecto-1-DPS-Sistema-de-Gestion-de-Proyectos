import { useEffect, useState } from 'react';

const ProyectosList = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = async () => {
    try {
      const response = await fetch('/api/proyectos');
      if (!response.ok) {
        throw new Error('Error al obtener los proyectos');
      }
      const data = await response.json();
      setProyectos(data.proyectos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Proyectos</h1>
      {proyectos.length === 0 ? (
        <p>No hay proyectos disponibles.</p>
      ) : (
        proyectos.map((proyecto) => (
          <div key={proyecto.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{proyecto.nombre}</h2>
            <p>{proyecto.descripcion || 'Sin descripción'}</p>
            <h3>Tareas:</h3>
            {proyecto.tareas.length === 0 ? (
              <p>No hay tareas asignadas a este proyecto.</p>
            ) : (
              <ul>
                {proyecto.tareas.map((tarea) => (
                  <li key={tarea.id}>
                    <strong>{tarea.titulo}</strong> - {tarea.estado}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProyectosList;