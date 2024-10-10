/*
  Warnings:

  - You are about to drop the `district` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `provinces` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `village` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `district` DROP FOREIGN KEY `district_regency_id_fkey`;

-- DropForeignKey
ALTER TABLE `regency` DROP FOREIGN KEY `regency_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `village` DROP FOREIGN KEY `village_district_id_fkey`;

-- DropTable
DROP TABLE `district`;

-- DropTable
DROP TABLE `provinces`;

-- DropTable
DROP TABLE `regency`;

-- DropTable
DROP TABLE `village`;
