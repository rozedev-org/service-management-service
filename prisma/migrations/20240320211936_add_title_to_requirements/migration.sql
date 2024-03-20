-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_user_id_fkey";

-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
