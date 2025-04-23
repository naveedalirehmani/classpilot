/*
  Warnings:

  - You are about to drop the column `assessment` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevel` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `homework` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `materials` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `objectives` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `procedures` on the `lesson_plans` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `lesson_plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lesson_plans` DROP COLUMN `assessment`,
    DROP COLUMN `duration`,
    DROP COLUMN `gradeLevel`,
    DROP COLUMN `homework`,
    DROP COLUMN `materials`,
    DROP COLUMN `notes`,
    DROP COLUMN `objectives`,
    DROP COLUMN `procedures`,
    DROP COLUMN `subject`;
