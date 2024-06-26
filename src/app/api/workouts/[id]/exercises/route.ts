import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

interface ExerciseProps {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user || typeof session.user.id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workout = await prisma.workout.findUnique({
      where: { id: params.id },
    });

    if (!workout || workout.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { name, sets, reps, weight } = (await req.json()) as ExerciseProps;

    if (!name || !sets || !reps) {
      return NextResponse.json(
        { error: "Name, sets, and reps are required" },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        sets,
        reps,
        weight,
        workoutId: params.id,
      },
    });

    return NextResponse.json({ data: exercise }, { status: 201 });
  } catch (error: any) {
    console.error(
      `Error in POST /api/workouts/${params.id}/exercises:`,
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
