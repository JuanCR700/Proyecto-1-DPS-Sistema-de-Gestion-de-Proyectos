import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Función para verificar las credenciales del usuario
    const checkAuth = async () => {
      try {
        // Obtener el correo y la contraseña del localStorage
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (!email || !password) {
          // Si no hay credenciales, redirigir al login
          router.push('/auth/login');
          return;
        }

        // Llamada al backend para verificar las credenciales
        const response = await axios.post('/api/login', { email, password });
        if (response.data.user) {
          // Si las credenciales son válidas, permitir el acceso
          setIsAuthenticated(true);
        } else {
          // Si no son válidas, redirigir al login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  // Si el usuario está autenticado, mostrar el contenido protegido
  return isAuthenticated ? children : null;
};

export default PrivateRoute;