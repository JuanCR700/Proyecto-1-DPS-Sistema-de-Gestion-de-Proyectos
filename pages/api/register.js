// pages/api/register.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
 
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, password } = req.body;

  // Validación básica
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validación del correo electrónico
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido' });
  }

  // Validación de la contraseña
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuarios.findUnique({
      where: { correo_electronico: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.usuarios.create({
      data: {
        nombre_usuario: name,
        correo_electronico: email,
        contrasena: hashedPassword,
      },
    });

    // Respuesta exitosa
    res.status(201).json({
      message: 'Registro exitoso',
      user: {
        id: newUser.id,
        name: newUser.nombre_usuario,
        email: newUser.correo_electronico,
      },
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    await prisma.$disconnect();
  }
}