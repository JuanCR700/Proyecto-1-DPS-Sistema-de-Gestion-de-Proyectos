import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const PrivateRoute = ({ children, requiredRole }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (!email || !password) {
          router.push('/login');
          return;
        }

        const response = await axios.post('/api/login', { email, password });
        if (response.data.user) {
          setIsAuthenticated(true);
          setUserRole(response.data.user.rol);
          
          // Verificar si el usuario tiene el rol requerido
          if (requiredRole && response.data.user.rol !== requiredRole) {
            router.push('/unauthorized');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;