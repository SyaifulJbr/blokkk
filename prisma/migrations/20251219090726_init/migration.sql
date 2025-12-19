-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
