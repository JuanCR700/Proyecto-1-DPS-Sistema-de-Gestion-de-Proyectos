import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Obtener el correo y la contraseña del localStorage (simulado)
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    // Buscar al usuario en la base de datos
    const user = await prisma.usuarios.findUnique({
      where: { correo_electronico: email },
    });

    if (user) {
      // Si el usuario está autenticado, devolver sus datos
      res.status(200).json({ user });
    } else {
      // Si no está autenticado, devolver un error
      res.status(401).json({ error: 'No autenticado' });
    }
  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    await prisma.$disconnect();
  }
}