import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const proyectos = await prisma.proyectos.findMany({
        include: { tareas: true },
      });
      res.status(200).json({ proyectos });
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      res.status(500).json({ error: 'Error al obtener proyectos' });
    }
  } else if (req.method === 'POST') {
    const { nombre } = req.body;
    try {
      const nuevoProyecto = await prisma.proyectos.create({
        data: { nombre },
      });
      res.status(201).json({ proyecto: nuevoProyecto });
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      res.status(500).json({ error: 'Error al crear proyecto' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}