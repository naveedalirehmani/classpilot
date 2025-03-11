/*
  Warnings:

  - You are about to drop the column `firstTimeLogin` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `firstTimeLogin`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `firstTimeLogin` BOOLEAN NOT NULL DEFAULT true;
