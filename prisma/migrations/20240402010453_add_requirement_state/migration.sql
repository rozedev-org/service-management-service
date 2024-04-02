/*
  Warnings:

  - Added the required column `state_id` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "state_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RequirementState" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "secuence" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequirementState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "RequirementState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
