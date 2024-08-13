/*
  Warnings:

  - You are about to alter the column `plate` on the `vehicle` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE `vehicle` MODIFY `plate` VARCHAR(8) NOT NULL;
