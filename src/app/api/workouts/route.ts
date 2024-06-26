import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

interface WorkoutProps {
  name: string;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || typeof session.user.id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workouts = await prisma.workout.findMany({
      where: { userId: session.user.id },
      include: { exercises: true },
    });

    return NextResponse.json({ data: workouts }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/workouts:", error.message, error.stack);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || typeof session.user.id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = (await req.json()) as WorkoutProps;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const workout = await prisma.workout.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ data: workout }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/workouts:", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
