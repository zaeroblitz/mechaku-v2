/*
  Warnings:

  - You are about to drop the column `upadted_at` on the `carts` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carts` DROP COLUMN `upadted_at`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `permissions` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `roles` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `roles_permissions` ALTER COLUMN `updated_at` DROP DEFAULT;
