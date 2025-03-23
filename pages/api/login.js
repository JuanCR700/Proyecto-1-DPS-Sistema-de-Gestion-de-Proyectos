// pages/api/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      console.log('Datos recibidos:', { email, password }); // Agrega este log

      // Buscar al usuario por su correo electrónico
      const user = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        console.log('Usuario no encontrado:', email); // Agrega este log
        return res.status(400).json({ error: 'Credenciales incorrectas.' });
      }

      // Comparar la contraseña proporcionada con la almacenada
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.log('Contraseña no coincide:', password, user.password); // Agrega este log
        return res.status(400).json({ error: 'Credenciales incorrectas.' });
      }

      // Respuesta exitosa
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}