-- CreateTable
CREATE TABLE `player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NULL,
    `playerId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vehicle_plate_key`(`plate`),
    INDEX `Vehicle_playerId_fkey`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `Vehicle_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `player`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
