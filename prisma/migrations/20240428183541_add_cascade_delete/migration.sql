-- DropForeignKey
ALTER TABLE "RequirementTypeField" DROP CONSTRAINT "RequirementTypeField_requirement_type_id_fkey";

-- AddForeignKey
ALTER TABLE "RequirementTypeField" ADD CONSTRAINT "RequirementTypeField_requirement_type_id_fkey" FOREIGN KEY ("requirement_type_id") REFERENCES "RequirementType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
