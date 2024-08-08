/*
  Warnings:

  - You are about to drop the `Parroquia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Parroquia" DROP CONSTRAINT "Parroquia_city_id_fkey";

-- DropTable
DROP TABLE "Parroquia";

-- CreateTable
CREATE TABLE "Town" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
