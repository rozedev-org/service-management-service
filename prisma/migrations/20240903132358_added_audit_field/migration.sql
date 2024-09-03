-- CreateTable
CREATE TABLE "RequirementsAudit" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "new_state_id" INTEGER NOT NULL,
    "old_state_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "RequirementsAudit_pkey" PRIMARY KEY ("id")
);
