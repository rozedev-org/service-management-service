/*
  Warnings:

  - Added the required column `state_type` to the `RequirementState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RequirementState" ADD COLUMN     "state_type" TEXT NOT NULL;
