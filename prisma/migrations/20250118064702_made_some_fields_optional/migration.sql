-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'unknown';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL;
