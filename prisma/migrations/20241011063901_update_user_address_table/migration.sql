/*
  Warnings:

  - Added the required column `district` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regency` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_addresses` ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `regency` VARCHAR(191) NOT NULL,
    ADD COLUMN `village` VARCHAR(191) NOT NULL;
