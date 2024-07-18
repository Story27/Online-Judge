import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const problems = await db.problem.findMany({
      include: {
        testCases: true,
      },
    });

    return NextResponse.json(problems);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}
