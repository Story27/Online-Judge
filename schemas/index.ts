import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ProblemSetSchema = z.object({
  problemName: z.string().min(1, {
    message: "Problem name is required",
  }),
  problemId: z.string().min(1, {
    message: "Problem ID is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  tags: z.array(z.string().min(1)).nonempty({
    message: "At least one tag is required",
  }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    message: "Difficulty level is required",
  }),
  exampleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, {
          message: "Input for example test case is required",
        }),
        output: z.string().min(1, {
          message: "Output for example test case is required",
        }),
      })
    )
    .nonempty({
      message: "At least one example test case is required",
    }),
  allTestCases: z
    .array(
      z.object({
        input: z.string().min(1, {
          message: "Input for test case is required",
        }),
        output: z.string().min(1, {
          message: "Output for test case is required",
        }),
      })
    )
    .nonempty({
      message: "At least one test case is required",
    }),
  userId: z.string().min(1, {
    message: "User ID is required",
  }),
  constraints: z.string().min(1, {
    message: "Constraints are required",
  }),
});

export const CreateSubmissionSchema = z.object({
  problemId: z.string().min(1, {
    message: "Problem ID is required",
  }),
  code: z.string().min(1, {
    message: "Code is required",
  }),
  language: z.string().min(1, {
    message: "Language is required",
  }),
});
