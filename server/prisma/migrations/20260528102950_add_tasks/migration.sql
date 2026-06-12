-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "priority" TEXT,
ADD COLUMN     "progress" INTEGER,
ADD COLUMN     "startDate" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
