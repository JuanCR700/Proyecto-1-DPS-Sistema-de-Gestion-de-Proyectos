import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { descripcion, asignadoA } = req.body;

    try {
      const nuevaTarea = await prisma.tareas.create({
        data: {
          descripcion,
          proyectoId: parseInt(id),
          asignadoA,
        },
      });
      res.status(201).json({ tarea: nuevaTarea });
    } catch (error) {
      console.error('Error al asignar tarea:', error);
      res.status(500).json({ error: 'Error al asignar tarea' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}