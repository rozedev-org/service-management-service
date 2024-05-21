-- CreateTable
CREATE TABLE "RequirementFieldValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "requirement_field_id" INTEGER NOT NULL,
    "requirement_id" INTEGER NOT NULL,

    CONSTRAINT "RequirementFieldValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequirementFieldValue" ADD CONSTRAINT "RequirementFieldValue_requirement_field_id_fkey" FOREIGN KEY ("requirement_field_id") REFERENCES "RequirementTypeField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequirementFieldValue" ADD CONSTRAINT "RequirementFieldValue_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
