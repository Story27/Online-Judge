-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_problemId_fkey";

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
