/*
  Warnings:

  - Added the required column `gerenteId` to the `proyectos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proyectos` ADD COLUMN `gerenteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `proyectos` ADD CONSTRAINT `proyectos_gerenteId_fkey` FOREIGN KEY (`gerenteId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_asignado_a_fkey` FOREIGN KEY (`asignado_a`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_proyecto_id_fkey` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
