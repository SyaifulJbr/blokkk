/*
  Warnings:

  - You are about to drop the column `description` on the `Car` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Car" ("capacity", "id", "imageUrl", "isAvailable", "name", "pricePerDay", "transmission") SELECT "capacity", "id", "imageUrl", "isAvailable", "name", "pricePerDay", "transmission" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
