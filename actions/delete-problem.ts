"use server";

import { db } from "@/lib/db";

export const deleteProblem = async (problemId: string): Promise<{ success?: string; error?: string }> => {
  try {
    await db.$transaction(async (prisma) => {
      await prisma.testCase.deleteMany({
        where: { problemId },
      });

      await prisma.problem.delete({
        where: { id: problemId },
      });
    });

    return { success: "Problem deleted successfully" };
  } catch (error) {
    console.error("Error deleting problem:", error);
    return { error: "Failed to delete problem" };
  }
};