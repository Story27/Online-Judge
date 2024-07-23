import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const db = prisma;
if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = prisma;
}
