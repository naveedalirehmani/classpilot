/*
  Warnings:

  - You are about to drop the column `isSuspended` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `isSuspended`,
    ADD COLUMN `isBlocked` BOOLEAN NOT NULL DEFAULT false;
