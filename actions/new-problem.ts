// new-problem.ts

"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { ProblemSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export const addProblem = async (values: z.infer<typeof ProblemSchema>) => {
  const validatedFields = ProblemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { title, difficulty, topics, description, testCases } =
    validatedFields.data;
  const currentUserData = await currentUser();
  const userId = currentUserData?.id ?? undefined;

  // Check user role
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
        userId: userId,
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
