/*
  Warnings:

  - Added the required column `specCategoryId` to the `Specification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Specification" ADD COLUMN     "specCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SpecCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SpecCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Specification" ADD CONSTRAINT "Specification_specCategoryId_fkey" FOREIGN KEY ("specCategoryId") REFERENCES "SpecCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
