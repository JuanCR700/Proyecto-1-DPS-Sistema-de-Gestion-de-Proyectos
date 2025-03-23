export default function handler(req, res) {
  if (req.method === 'POST') {
    // Aquí puedes limpiar la sesión, eliminar tokens, etc.
    console.log('Sesión cerrada');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}