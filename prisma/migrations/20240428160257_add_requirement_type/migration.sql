-- CreateTable
CREATE TABLE "RequirementType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RequirementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequirementTypeField" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "requirement_type_id" INTEGER NOT NULL,

    CONSTRAINT "RequirementTypeField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequirementTypeField" ADD CONSTRAINT "RequirementTypeField_requirement_type_id_fkey" FOREIGN KEY ("requirement_type_id") REFERENCES "RequirementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
