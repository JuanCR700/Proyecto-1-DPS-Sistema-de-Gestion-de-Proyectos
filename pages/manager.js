// pages/manager.js
import { PrivateRoute } from '../components/PrivateRoute';

const ManagerPage = () => {
  return (
    <PrivateRoute requiredRole="GERENTE">
      <div className="container mt-4">
        <h2>Panel de Gerente</h2>
        {/* Contenido específico para gerentes */}
      </div>
    </PrivateRoute>
  );
};

export default ManagerPage;