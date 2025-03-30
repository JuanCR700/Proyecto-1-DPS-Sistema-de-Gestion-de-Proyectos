import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // Verificar que el ID sea numérico
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    // Manejar método PUT (actualización de rol)
    if (req.method === 'PUT') {
      const { rol } = req.body;

      // Validar el rol recibido
      const rolesPermitidos = ['ADMIN', 'GERENTE', 'MIEMBRO'];
      if (!rolesPermitidos.includes(rol)) {
        return res.status(400).json({ error: 'Rol no válido' });
      }

      // Verificar que el usuario exista
      const userExists = await prisma.usuarios.findUnique({
        where: { id: parseInt(id) }
      });

      if (!userExists) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualizar el rol del usuario
      const updatedUser = await prisma.usuarios.update({
        where: { id: parseInt(id) },
        data: { rol },
        select: {
          id: true,
          nombre_usuario: true,
          correo_electronico: true,
          rol: true,
          estado: true
        }
      });

      return res.status(200).json({ 
        message: 'Rol actualizado correctamente',
        user: updatedUser 
      });
    }

    // Manejar método DELETE (eliminación de usuario)
    if (req.method === 'DELETE') {
      // Verificar que el usuario exista
      const userToDelete = await prisma.usuarios.findUnique({
        where: { id: parseInt(id) }
      });

      if (!userToDelete) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Prevenir auto-eliminación
      if (req.user?.email === userToDelete.correo_electronico) {
        return res.status(403).json({ error: 'No puedes eliminarte a ti mismo' });
      }

      // Eliminar el usuario
      await prisma.usuarios.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({ 
        message: 'Usuario eliminado correctamente',
        deletedUserId: parseInt(id)
      });
    }

    // Si el método no es PUT ni DELETE
    return res.status(405).json({ 
      error: 'Método no permitido',
      allowedMethods: ['PUT', 'DELETE'] 
    });

  } catch (error) {
    console.error('Error en el manejador:', error);
    return res.status(500).json({ 
      error: 'Error en el servidor',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}