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
CREATE TABLE `districts` (
    `id` VARCHAR(191) NOT NULL,
    `regency_id` VARCHAR(191) NOT NULL,
    `district_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `districts_district_id_key`(`district_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `villages` (
    `id` VARCHAR(191) NOT NULL,
    `village_id` VARCHAR(191) NOT NULL,
    `district_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `regencies` ADD CONSTRAINT `regencies_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `districts` ADD CONSTRAINT `districts_regency_id_fkey` FOREIGN KEY (`regency_id`) REFERENCES `regencies`(`regency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `villages` ADD CONSTRAINT `villages_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
