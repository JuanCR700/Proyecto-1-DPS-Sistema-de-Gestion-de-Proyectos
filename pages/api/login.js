// pages/api/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscar al usuario en la base de datos
    const user = await prisma.usuarios.findUnique({
      where: { correo_electronico: email },
    });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar si la contraseña es correcta
    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Respuesta exitosa
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        name: user.nombre_usuario,
        email: user.correo_electronico,
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    await prisma.$disconnect();
  }
}