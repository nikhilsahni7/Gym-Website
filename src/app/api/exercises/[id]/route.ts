import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

interface ExerciseUpdateProps {
  name?: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user || typeof session.user.id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id: params.id },
      include: { workout: true },
    });

    if (!exercise || exercise.workout.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { name, sets, reps, weight } =
      (await req.json()) as ExerciseUpdateProps;

    const updatedExercise = await prisma.exercise.update({
      where: { id: params.id },
      data: { name, sets, reps, weight },
    });

    return NextResponse.json({ data: updatedExercise }, { status: 200 });
  } catch (error: any) {
    console.error(
      `Error in PUT /api/exercises/${params.id}:`,
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user || typeof session.user.id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id: params.id },
      include: { workout: true },
    });

    if (!exercise || exercise.workout.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.exercise.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Exercise deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(
      `Error in DELETE /api/exercises/${params.id}:`,
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
