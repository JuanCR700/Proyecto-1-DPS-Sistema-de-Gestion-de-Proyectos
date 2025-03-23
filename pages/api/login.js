// pages/api/login.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Aquí puedes agregar la lógica para validar el inicio de sesión
    console.log('Datos recibidos:', { email, password });

    // Simula una respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { email } });
  } else {
    res.status(405).json({ error: 'Método no permitido' }); // Método no permitido
  }
}