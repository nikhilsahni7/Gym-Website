"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { FaDumbbell, FaTrash, FaEdit } from "react-icons/fa";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "./Spinner";

const WorkoutPlanners = () => {
  const { toast } = useToast();
  const { data: session } = useSession();

  interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }

  interface Workout {
    id: string;
    name: string;
    exercises?: Exercise[];
  }

  const [showAddExercise, setShowAddExercise] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [newExercise, setNewExercise] = useState<Omit<Exercise, "id">>({
    name: "",
    sets: 3,
    reps: 10,
    weight: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchWorkouts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchWorkouts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workouts");
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data.data);
      } else {
        throw new Error("Failed to fetch workouts");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch workouts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkout = async () => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `Workout ${workouts.length + 1}` }),
      });

      if (response.ok) {
        const data = await response.json();
        const newWorkout = data.data;
        setWorkouts([...workouts, newWorkout]);
        setCurrentWorkout(newWorkout);
        toast({
          title: "Success",
          description: "New workout created",
        });
      } else {
        throw new Error("Failed to create workout");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workout",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWorkout = async (workoutId: string) => {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWorkouts(workouts.filter((w) => w.id !== workoutId));
        if (currentWorkout && currentWorkout.id === workoutId) {
          setCurrentWorkout(null);
        }
        toast({
          title: "Success",
          description: "Workout deleted",
        });
      } else {
        throw new Error("Failed to delete workout");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete workout",
        variant: "destructive",
      });
    }
  };

  const handleAddExercise = async () => {
    if (newExercise.name.trim() === "") {
      toast({
        title: "Error",
        description: "Exercise name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (currentWorkout) {
      try {
        const response = await fetch(
          `/api/workouts/${currentWorkout.id}/exercises`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExercise),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const addedExercise = data.data;
          const updatedWorkout = {
            ...currentWorkout,
            exercises: [...(currentWorkout.exercises || []), addedExercise],
          };
          setWorkouts(
            workouts.map((w) =>
              w.id === currentWorkout.id ? updatedWorkout : w
            )
          );
          setCurrentWorkout(updatedWorkout);
          setNewExercise({ name: "", sets: 3, reps: 10, weight: 0 });
          setShowAddExercise(false);
          toast({
            title: "Success",
            description: `${addedExercise.name} has been added to your workout`,
          });
        } else {
          throw new Error("Failed to add exercise");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add exercise",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    if (currentWorkout) {
      try {
        const response = await fetch(`/api/exercises/${exerciseId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedWorkout = {
            ...currentWorkout,
            exercises: (currentWorkout.exercises || []).filter(
              (e) => e.id !== exerciseId
            ),
          };
          setWorkouts(
            workouts.map((w) =>
              w.id === currentWorkout.id ? updatedWorkout : w
            )
          );
          setCurrentWorkout(updatedWorkout);
          toast({
            title: "Success",
            description: "Exercise deleted",
          });
        } else {
          throw new Error("Failed to delete exercise");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete exercise",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    setNewExercise(exercise);
    setShowAddExercise(true);
  };

  const handleUpdateExercise = async () => {
    if ("id" in newExercise) {
      try {
        const response = await fetch(`/api/exercises/${newExercise.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExercise),
        });

        if (response.ok) {
          const data = await response.json();
          const updatedExercise = data.data;
          if (currentWorkout) {
            const updatedWorkout = {
              ...currentWorkout,
              exercises: (currentWorkout.exercises || []).map((e) =>
                e.id === updatedExercise.id ? updatedExercise : e
              ),
            };
            setWorkouts(
              workouts.map((w) =>
                w.id === currentWorkout.id ? updatedWorkout : w
              )
            );
            setCurrentWorkout(updatedWorkout);
          }
          setNewExercise({ name: "", sets: 3, reps: 10, weight: 0 });
          setShowAddExercise(false);
          toast({
            title: "Success",
            description: `${updatedExercise.name} has been updated`,
          });
        } else {
          throw new Error("Failed to update exercise");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update exercise",
          variant: "destructive",
        });
      }
    }
  };

  if (!session) {
    return (
      <div>
        <p className="flex justify-center items-center">
          please sign in to access this page
        </p>
        <Spinner />
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Workout Planner
        </motion.h1>
        <motion.p
          className="text-xl mb-10 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Create and customize your own workout routines
        </motion.p>

        <Tabs defaultValue="workouts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>
          <TabsContent value="workouts">
            <Card>
              <CardHeader>
                <CardTitle>Your Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleCreateWorkout} className="mb-4">
                  Create New Workout
                </Button>
                <ScrollArea className="h-[600px]">
                  <AnimatePresence>
                    {workouts.map((workout) => (
                      <motion.div
                        key={workout.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div>
                          <p className="font-semibold text-lg">
                            {workout.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {workout.exercises?.length || 0} exercises
                          </p>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentWorkout(workout)}
                            className="mr-2"
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteWorkout(workout.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
            {currentWorkout && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{currentWorkout.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => {
                      setNewExercise({
                        name: "",
                        sets: 3,
                        reps: 10,
                        weight: 0,
                      });
                      setShowAddExercise(true);
                    }}
                    className="mb-4"
                  >
                    Add Exercise
                  </Button>
                  <ScrollArea className="h-[400px]">
                    {currentWorkout.exercises?.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{exercise.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {exercise.sets} sets x {exercise.reps} reps @{" "}
                            {exercise.weight} lbs
                          </p>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditExercise(exercise)}
                            className="mr-2"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteExercise(exercise.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="exercises">
            <Card>
              <CardHeader>
                <CardTitle>All Exercises</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setNewExercise({ name: "", sets: 3, reps: 10, weight: 0 });
                    setShowAddExercise(true);
                  }}
                  className="mb-4"
                >
                  Add New Exercise
                </Button>
                <ScrollArea className="h-[600px]">
                  <AnimatePresence>
                    {workouts.flatMap((workout) =>
                      workout.exercises?.map((exercise) => (
                        <motion.div
                          key={exercise.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center">
                            <FaDumbbell className="text-blue-500 mr-4 text-2xl" />
                            <div>
                              <p className="font-semibold text-lg">
                                {exercise.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {exercise.sets} sets x {exercise.reps} reps{" "}
                                {exercise.weight > 0 &&
                                  `@ ${exercise.weight} lbs`}
                              </p>
                              <p className="text-xs text-gray-500">
                                Workout: {workout.name}
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditExercise(exercise)}
                              className="mr-2"
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteExercise(exercise.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showAddExercise} onOpenChange={setShowAddExercise}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {"id" in newExercise ? "Edit Exercise" : "Add New Exercise"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="exerciseName">Exercise Name</Label>
                <Input
                  id="exerciseName"
                  value={newExercise.name}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, name: e.target.value })
                  }
                  placeholder="e.g., Bench Press"
                />
              </div>
              <div>
                <Label htmlFor="sets">Sets</Label>
                <Input
                  id="sets"
                  type="number"
                  value={newExercise.sets}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      sets: parseInt(e.target.value),
                    })
                  }
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="reps">Reps</Label>
                <Input
                  id="reps"
                  type="number"
                  value={newExercise.reps}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      reps: parseInt(e.target.value),
                    })
                  }
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newExercise.weight}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      weight: parseFloat(e.target.value),
                    })
                  }
                  min="0"
                  step="0.5"
                />
              </div>
              <Button
                onClick={
                  "id" in newExercise ? handleUpdateExercise : handleAddExercise
                }
                className="w-full"
              >
                {"id" in newExercise ? "Update Exercise" : "Add Exercise"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WorkoutPlanners;
