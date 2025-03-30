import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.usuarios.findMany({
        select: {
          id: true,
          nombre_usuario: true,
          correo_electronico: true,
          rol: true,
        },
      });
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const { role } = req.body;

    try {
      const updatedUser = await prisma.usuarios.update({
        where: { id: parseInt(id) },
        data: { rol: role },
      });
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}