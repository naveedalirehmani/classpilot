/*
  Warnings:

  - A unique constraint covering the columns `[teacherLicenseNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user_restrictions` MODIFY `restrictionType` ENUM('CREATE_POST', 'EDIT_POST', 'DELETE_POST', 'VIEW_POST', 'CREATE_COMMENT', 'VIEW_COMMENT', 'ANALYTICS', 'REPORT', 'ACCOUNT', 'CONTENT', 'CREATE_LESSON_PLAN') NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `dailyGenerationCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `educationalQualification` VARCHAR(191) NULL,
    ADD COLUMN `gradeLevel` VARCHAR(191) NULL,
    ADD COLUMN `lastGenerationDate` DATETIME(3) NULL,
    ADD COLUMN `schoolName` VARCHAR(191) NULL,
    ADD COLUMN `subjectsTaught` VARCHAR(191) NULL,
    ADD COLUMN `teacherLicenseNumber` VARCHAR(191) NULL,
    ADD COLUMN `yearsOfExperience` INTEGER NULL,
    MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'DEVELOPER', 'USER', 'GUEST', 'ANALYST', 'MODERATOR', 'TEACHER') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('FREE', 'BASIC', 'PREMIUM', 'GOLD') NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `dailyLimit` INTEGER NOT NULL DEFAULT 10,
    `stripeCustomerId` VARCHAR(191) NULL,
    `stripePriceId` VARCHAR(191) NULL,
    `stripeSubscriptionId` VARCHAR(191) NULL,

    UNIQUE INDEX `subscriptions_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson_plans` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `gradeLevel` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `objectives` TEXT NOT NULL,
    `materials` TEXT NOT NULL,
    `procedures` TEXT NOT NULL,
    `assessment` TEXT NOT NULL,
    `homework` TEXT NULL,
    `notes` TEXT NULL,
    `aiPrompt` TEXT NOT NULL,
    `aiResponse` TEXT NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite_lesson_plans` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `lessonPlanId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `favorite_lesson_plans_userId_lessonPlanId_key`(`userId`, `lessonPlanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_teacherLicenseNumber_key` ON `users`(`teacherLicenseNumber`);

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson_plans` ADD CONSTRAINT `lesson_plans_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_lesson_plans` ADD CONSTRAINT `favorite_lesson_plans_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_lesson_plans` ADD CONSTRAINT `favorite_lesson_plans_lessonPlanId_fkey` FOREIGN KEY (`lessonPlanId`) REFERENCES `lesson_plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
