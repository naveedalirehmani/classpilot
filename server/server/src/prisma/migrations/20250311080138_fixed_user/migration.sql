/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `CommenLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faqs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FrequentWords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Miscellaneous` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelatedKeywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensitiveMeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensitivePixels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CommenLikes` DROP FOREIGN KEY `CommenLikes_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `CommenLikes` DROP FOREIGN KEY `CommenLikes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Otp` DROP FOREIGN KEY `Otp_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PostLikes` DROP FOREIGN KEY `PostLikes_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostLikes` DROP FOREIGN KEY `PostLikes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `RelatedKeywords` DROP FOREIGN KEY `RelatedKeywords_postId_fkey`;

-- DropForeignKey
ALTER TABLE `SensitiveMeta` DROP FOREIGN KEY `SensitiveMeta_postId_fkey`;

-- DropForeignKey
ALTER TABLE `SensitivePixels` DROP FOREIGN KEY `SensitivePixels_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_postId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_postId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_recipientId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `post_reports` DROP FOREIGN KEY `post_reports_reportedPostId_fkey`;

-- DropForeignKey
ALTER TABLE `post_reports` DROP FOREIGN KEY `post_reports_reporterId_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `report_images` DROP FOREIGN KEY `report_images_reportId_fkey`;

-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `age`,
    DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider` ENUM('GOOGLE', 'OUTLOOK', 'FACEBOOK', 'GITHUB', 'TWITTER', 'LINKEDIN', 'EMAIL_PASSWORD') NOT NULL DEFAULT 'EMAIL_PASSWORD',
    MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'DEVELOPER', 'USER', 'GUEST', 'ANALYST', 'MODERATOR') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `CommenLikes`;

-- DropTable
DROP TABLE `Comments`;

-- DropTable
DROP TABLE `Faqs`;

-- DropTable
DROP TABLE `FrequentWords`;

-- DropTable
DROP TABLE `Image`;

-- DropTable
DROP TABLE `Miscellaneous`;

-- DropTable
DROP TABLE `Otp`;

-- DropTable
DROP TABLE `PostLikes`;

-- DropTable
DROP TABLE `RelatedKeywords`;

-- DropTable
DROP TABLE `SensitiveMeta`;

-- DropTable
DROP TABLE `SensitivePixels`;

-- DropTable
DROP TABLE `Tags`;

-- DropTable
DROP TABLE `notifications`;

-- DropTable
DROP TABLE `post_reports`;

-- DropTable
DROP TABLE `posts`;

-- DropTable
DROP TABLE `report_images`;
