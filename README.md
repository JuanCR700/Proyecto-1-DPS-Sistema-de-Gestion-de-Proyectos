# 📌 Gestión de Proyectos

## 🔗 Enlace del alojamiento del proyecto
[https://proyecto-1-dps-sistema-de-gestion-de-proyectos.vercel.app/](https://proyecto-1-dps-sistema-de-gestion-de-proyectos.vercel.app/)

## 🔗 Enlace video de defensa 
[https://www.canva.com/design/DAGjvBrQOw8/h_c3DkY_iFgJbDEZhbguBg/watch?utm_content=DAGjvBrQOw8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf9c8e2978a]

## 👥 Integrantes del Proyecto
- Juan Carlos Ramírez Chávez (RC231487)
- Mauricio Vladimir Alvarado Abarca (AA230087)
- Angel Marcelo Delgado Estrada (DE241507)
- Daniela Fernanda Tamayo Jovel Tj232470
## 1. Descripción del Proyecto
Este proyecto es un sistema de gestión de proyectos que permite a los usuarios registrarse, iniciar sesión, gestionar proyectos, tareas y roles. Utiliza una **API REST** para la gestión de datos y está desarrollado con **React** y **Next.js**.

---

## 2. Dependencias Instaladas
El proyecto utiliza varias dependencias para manejar la funcionalidad básica y de gestión de datos. Aquí están las principales:

- **@prisma/client**: Cliente de Prisma para interactuar con la base de datos.
- **axios**: Para realizar solicitudes HTTP a la API.
- **react-query**: Maneja el estado de las solicitudes de datos en la aplicación.
- **react-router-dom**: Maneja el enrutamiento de las páginas dentro de la aplicación React.
- **tailwindcss**: Framework CSS para diseñar la interfaz de usuario de manera rápida y personalizada.
- **mysql2**: Cliente MySQL para conectarse y gestionar la base de datos.
- **prisma**: Herramienta ORM para gestionar la base de datos y generar migraciones.
- **next.js**: Framework para React que permite la creación de aplicaciones web con renderizado del lado del servidor.
- **bootstrap**: Framework CSS adicional para diseño responsive.

---

## 3. Configuración de la Base de Datos
El proyecto utiliza **MySQL** para la base de datos. La estructura está definida con **Prisma ORM** en el archivo `schema.prisma`. Las tablas principales son:

- **Usuarios**
- **Proyectos**
- **Tareas**
- **Roles**
- **Permisos**
- **Usuarios_Proyectos** (relación muchos a muchos entre usuarios y proyectos)
- **Comentarios** (para notas o actualizaciones en las tareas)

### Pasos para Configurar la Base de Datos:
 Instalar **MySQL** en tu máquina si aún no lo tienes.
Configurar el archivo `.env`: Asegúrate de tener configurada la variable de entorno `DATABASE_URL` en el archivo `.env`. Para MySQL, el formato es:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/project-manager"
Reemplaza USER y PASSWORD con tus credenciales de MySQL
Ejecutar migraciones de Prisma para sincronizar el esquema de la base de datos con Prisma:
npx prisma migrate dev
Esto aplicará las migraciones definidas en schema.prisma y creará las tablas en la base de datos.

4. Desplegar el Proyecto en tu Ordenador
Pasos para Desplegar el Proyecto Localmente:
Clonar el Repositorio:
# 1. Clonar repositorio
git clone https://github.com/JuanCR700/Proyecto-1-DPS-Sistema-de-Gestion-de-Proyectos.git

cd tu-repositorio

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp .env.example .env
# Editar .env con tus credenciales

# 5. Ejecutar migraciones de Prisma:
npx prisma migrate dev

# 6. Iniciar aplicación
npm run dev

Esto iniciará un servidor de desarrollo en http://localhost:3000, donde podrás acceder a la aplicación.
