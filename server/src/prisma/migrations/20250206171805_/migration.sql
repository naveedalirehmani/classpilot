/*
  Warnings:

  - You are about to drop the column `isBlocked` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `isBlocked`,
    ADD COLUMN `isSuspended` BOOLEAN NOT NULL DEFAULT false;
