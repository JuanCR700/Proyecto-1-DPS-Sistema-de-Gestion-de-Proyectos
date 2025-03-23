// pages/api/register.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.usuario.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
      }

      // Hashear la contraseña antes de guardarla
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Crear el nuevo usuario en la base de datos
      const newUser = await prisma.usuario.create({
        data: {
          nombre: name,
          email,
          password: hashedPassword, // Guardar la contraseña hasheada
          rolId: 1, // Asigna un rol por defecto
        },
      });

      // Respuesta exitosa
      res.status(201).json({ message: 'Registro exitoso', user: newUser });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}