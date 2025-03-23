import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Limpiar mensajes de error anteriores
    setError('');

    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Llamada a la API para iniciar sesión

      const response = await axios.post('/api/login', { email, password });
      if (response.data.user) {
        // Almacenar credenciales en el localStorage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error en el servidor');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '300px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Correo electrónico"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;