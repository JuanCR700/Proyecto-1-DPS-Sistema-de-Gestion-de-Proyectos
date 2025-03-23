-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_tareaId_fkey`;

-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `permiso` DROP FOREIGN KEY `Permiso_rolId_fkey`;

-- DropForeignKey
ALTER TABLE `proyecto` DROP FOREIGN KEY `Proyecto_gerenteId_fkey`;

-- DropForeignKey
ALTER TABLE `tarea` DROP FOREIGN KEY `Tarea_asignadoAId_fkey`;

-- DropForeignKey
ALTER TABLE `tarea` DROP FOREIGN KEY `Tarea_proyectoId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_rolId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_proyectos` DROP FOREIGN KEY `Usuarios_Proyectos_proyectoId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_proyectos` DROP FOREIGN KEY `Usuarios_Proyectos_usuarioId_fkey`;

-- CreateTable
CREATE TABLE `permisos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol_id` INTEGER NOT NULL,
    `puede_crear_proyectos` BOOLEAN NULL DEFAULT false,
    `puede_editar_proyectos` BOOLEAN NULL DEFAULT false,
    `puede_eliminar_proyectos` BOOLEAN NULL DEFAULT false,
    `puede_crear_tareas` BOOLEAN NULL DEFAULT false,
    `puede_editar_tareas` BOOLEAN NULL DEFAULT false,
    `puede_eliminar_tareas` BOOLEAN NULL DEFAULT false,
    `puede_ver_reportes` BOOLEAN NULL DEFAULT false,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `puede_crear_usuarios` BOOLEAN NULL DEFAULT false,
    `puede_editar_usuarios` BOOLEAN NULL DEFAULT false,
    `puede_eliminar_usuarios` BOOLEAN NULL DEFAULT false,
    `puede_ver_usuarios` BOOLEAN NULL DEFAULT false,

    INDEX `rol_id`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `fecha_inicio` DATE NULL,
    `fecha_fin` DATE NULL,
    `estado` ENUM('Activo', 'Inactivo', 'Finalizado') NULL DEFAULT 'Activo',
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` ENUM('Scrum Master', 'PM', 'Programador', 'QA', 'Admin') NOT NULL,
    `descripcion` TEXT NULL,

    UNIQUE INDEX `nombre`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tareas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proyecto_id` INTEGER NOT NULL,
    `titulo` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `estado` ENUM('Pendiente', 'En Progreso', 'Completa') NULL DEFAULT 'Pendiente',
    `prioridad` ENUM('Baja', 'Media', 'Alta') NULL DEFAULT 'Media',
    `asignado_a` INTEGER NULL,
    `fecha_vencimiento` DATE NULL,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `asignado_a`(`asignado_a`),
    INDEX `proyecto_id`(`proyecto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,

    INDEX `rol_id`(`rol_id`),
    INDEX `usuario_id`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `correo_electronico` VARCHAR(100) NOT NULL,
    `nombre_completo` VARCHAR(100) NULL,
    `estado` ENUM('Activo', 'Inactivo', 'Suspendido') NULL DEFAULT 'Activo',
    `ultimo_acceso` TIMESTAMP(0) NULL,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `nombre_usuario`(`nombre_usuario`),
    UNIQUE INDEX `correo_electronico`(`correo_electronico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
