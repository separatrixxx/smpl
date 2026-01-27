-- AlterTable
ALTER TABLE "User" ADD COLUMN "telegram_id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");
