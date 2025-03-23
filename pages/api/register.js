// pages/api/register.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Datos recibidos:', { name, email, password });

    // Simula una respuesta exitosa
    res.status(200).json({ message: 'Registro exitoso' });
  } else {
    res.status(405).json({ error: 'Método no permitido' }); // Método no permitido
  }
}