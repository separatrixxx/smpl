-- AlterTable
ALTER TABLE "Project" ADD COLUMN "alias" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN "serial" TEXT NOT NULL DEFAULT '';
