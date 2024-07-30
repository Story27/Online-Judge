"use server";

import { db } from "@/lib/db";

export const deleteContest = async (contestId: string): Promise<{ success?: string; error?: string }> => {
  try {
    await db.$transaction(async (prisma) => {
      await prisma.contest.delete({
        where: { id: contestId },
      });
    });

    return { success: "Contest deleted successfully" };
  } catch (error) {
    console.error("Error deleting contest:", error);
    return { error: "Failed to delete contest" };
  }
};