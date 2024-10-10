/*
  Warnings:

  - You are about to drop the column `city` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `wishlists` table. All the data in the column will be lost.
  - You are about to drop the `wishlist_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `district_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regency_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `wishlist_items` DROP FOREIGN KEY `wishlist_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist_items` DROP FOREIGN KEY `wishlist_items_wishlist_id_fkey`;

-- AlterTable
ALTER TABLE `user_addresses` DROP COLUMN `city`,
    DROP COLUMN `state`,
    ADD COLUMN `district_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `regency_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `village_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wishlists` DROP COLUMN `label`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `wishlist_items`;

-- CreateTable
CREATE TABLE `provinces` (
    `id` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `provinces_province_id_key`(`province_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regencies` (
    `id` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,
    `regency_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `regencies_regency_id_key`(`regency_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `District` (
    `id` VARCHAR(191) NOT NULL,
    `regency_id` VARCHAR(191) NOT NULL,
    `district_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `District_district_id_key`(`district_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Village` (
    `id` VARCHAR(191) NOT NULL,
    `village_id` VARCHAR(191) NOT NULL,
    `district_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regencies` ADD CONSTRAINT `regencies_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `District` ADD CONSTRAINT `District_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regencies`(`regency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Village` ADD CONSTRAINT `Village_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `District`(`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
