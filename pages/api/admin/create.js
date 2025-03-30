import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email, password, rol } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el email ya existe
    const userExists = await prisma.usuarios.findUnique({
      where: { correo_electronico: email }
    });

    if (userExists) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await prisma.usuarios.create({
      data: {
        nombre_usuario: nombre,
        correo_electronico: email,
        contrasena: hashedPassword,
        rol: rol,
        estado: 'Activo'
      },
      select: {
        id: true,
        nombre_usuario: true,
        correo_electronico: true,
        rol: true
      }
    });

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    await prisma.$disconnect();
  }
}