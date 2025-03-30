import { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'MIEMBRO'
  });

  // Obtener lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        alert('Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Cambiar rol de usuario
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, { 
        rol: newRole 
      });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, rol: newRole } : user
      ));
      
      alert('Rol actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      alert(error.response?.data?.error || 'Error al actualizar el rol');
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert(error.response?.data?.error || 'Error al eliminar usuario');
    }
  };

  // Crear nuevo usuario
  const handleCreateUser = async () => {
    try {
      const response = await axios.post('/api/admin/create', newUser);
      setUsers([...users, response.data.user]);
      setShowCreateModal(false);
      setNewUser({
        nombre: '',
        email: '',
        password: '',
        rol: 'MIEMBRO'
      });
      alert('Usuario creado correctamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert(error.response?.data?.error || 'Error al crear usuario');
    }
  };

  if (loading) return <div className="text-center my-5">Cargando usuarios...</div>;

  return (
    <PrivateRoute requiredRole="ADMIN">
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Panel de Administración</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Crear Nuevo Usuario
          </button>
        </div>

        {/* Modal para crear usuario */}
        {showCreateModal && (
          <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Nuevo Usuario</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowCreateModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.nombre}
                      onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      required
                      minLength="6"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                      className="form-select"
                      value={newUser.rol}
                      onChange={(e) => setNewUser({...newUser, rol: e.target.value})}
                    >
                      <option value="ADMIN">Administrador</option>
                      <option value="GERENTE">Gerente</option>
                      <option value="MIEMBRO">Miembro</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleCreateUser}
                    disabled={!newUser.nombre || !newUser.email || !newUser.password}
                  >
                    Crear Usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de usuarios */}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre_usuario}</td>
                  <td>{user.correo_electronico}</td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={user.rol}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="ADMIN">Administrador</option>
                      <option value="GERENTE">Gerente</option>
                      <option value="MIEMBRO">Miembro</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={user.correo_electronico === localStorage.getItem('email')}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminPanel;