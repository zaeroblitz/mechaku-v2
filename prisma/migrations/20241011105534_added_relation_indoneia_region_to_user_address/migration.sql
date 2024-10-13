/*
  Warnings:

  - You are about to drop the column `district` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `regency` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `village` on the `user_addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[village_id]` on the table `villages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user_addresses` DROP COLUMN `district`,
    DROP COLUMN `province`,
    DROP COLUMN `regency`,
    DROP COLUMN `village`;

-- CreateIndex
CREATE UNIQUE INDEX `villages_village_id_key` ON `villages`(`village_id`);

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regencies`(`regency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_village_id_fkey` FOREIGN KEY (`village_id`) REFERENCES `villages`(`village_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
