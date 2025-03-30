import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId, gerenteId } = req.query;

    try {
      if (gerenteId) {
        // Filtrar proyectos creados por el gerente
        const proyectos = await prisma.proyectos.findMany({
          where: { gerenteId: parseInt(gerenteId) },
          include: {
            gerente: true,
          },
        });
        return res.status(200).json({ proyectos });
      }

      if (userId) {
        // Filtrar proyectos asignados al usuario
        const proyectos = await prisma.proyectos.findMany({
          where: {
            tareas: {
              some: {
                asignado_a: parseInt(userId),
              },
            },
          },
          include: {
            tareas: {
              include: { usuario: true },
            },
            gerente: true,
          },
        });
        return res.status(200).json({ proyectos });
      }

      // Obtener todos los proyectos
      const proyectos = await prisma.proyectos.findMany({
        include: {
          tareas: {
            include: { usuario: true },
          },
          gerente: true,
        },
      });

      return res.status(200).json({ proyectos });
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      return res.status(500).json({ error: 'Error al obtener proyectos' });
    }
  } else if (req.method === 'POST') {
    const { nombre, descripcion, gerenteId } = req.body;

    try {
      const nuevoProyecto = await prisma.proyectos.create({
        data: { nombre, descripcion, gerenteId: parseInt(gerenteId) },
      });

      return res.status(201).json({ proyecto: nuevoProyecto });
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      return res.status(500).json({ error: 'Error al crear proyecto' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}