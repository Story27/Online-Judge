import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const contests = await db.contest.findMany({
      include: {
        problems: true,
      },
    });

    return NextResponse.json(contests);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contests" },
      { status: 500 }
    );
  }
}
