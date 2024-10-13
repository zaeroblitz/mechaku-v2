-- DropForeignKey
ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_district_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_regency_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_village_id_fkey`;

-- DropIndex
DROP INDEX `villages_village_id_key` ON `villages`;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_village_id_fkey` FOREIGN KEY (`village_id`) REFERENCES `villages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
