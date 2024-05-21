/*
  Warnings:

  - Added the required column `requirement_type_id` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "requirement_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_requirement_type_id_fkey" FOREIGN KEY ("requirement_type_id") REFERENCES "RequirementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
