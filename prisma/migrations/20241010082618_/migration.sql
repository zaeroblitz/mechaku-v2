/*
  Warnings:

  - You are about to drop the `regencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `district` DROP FOREIGN KEY `District_regency_id_fkey`;

-- DropForeignKey
ALTER TABLE `regencies` DROP FOREIGN KEY `regencies_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `village` DROP FOREIGN KEY `Village_district_id_fkey`;

-- DropTable
DROP TABLE `regencies`;

-- CreateTable
CREATE TABLE `regency` (
    `id` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,
    `regency_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `regency_regency_id_key`(`regency_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `regency` ADD CONSTRAINT `regency_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `district` ADD CONSTRAINT `district_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regency`(`regency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `village` ADD CONSTRAINT `village_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `district`(`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `district` RENAME INDEX `District_district_id_key` TO `district_district_id_key`;
