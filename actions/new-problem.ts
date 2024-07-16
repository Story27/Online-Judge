// new-problem.ts

"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { ProblemSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { error } from "console";

interface TestCase {
  id: string;
  input: string;
  output: string;
  problemId: string;
  isSampleTestCase: boolean;
}

interface ProblemData {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  topics: string[];
  userId: string;
  testCases: TestCase[];
  description?: string;
}

export const addProblem = async (data: ProblemData) => {
  const validatedFields = ProblemSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error(error);
    return { error: "Invalid Fields!" };
  }

  const { title, difficulty, topics, description, testCases, userId } =
    validatedFields.data;

  // Check user role
  const currentUserData = await currentUser();
  if (currentUserData?.role !== UserRole.ADMIN) {
    return { error: "Forbidden" };
  }

  try {
    // Create problem with basic details
    const createdProblem = await db.problem.create({
      data: {
        title,
        difficulty,
        topics,
        description,
        userId,
      },
      include: {
        testCases: true,
      },
    });

    // If test cases provided, add them
    if (testCases && testCases.length > 0) {
      await db.testCase.createMany({
        data: testCases.map((testCase) => ({
          problemId: createdProblem.id,
          input: testCase.input,
          output: testCase.output,
          isSampleTestCase: testCase.isSampleTestCase,
        })),
      });
    }

    return { success: "Problem created successfully!" };
  } catch (error) {
    console.error("Error creating problem:", error);
    return { error: "Failed to create problem." };
  }
};
