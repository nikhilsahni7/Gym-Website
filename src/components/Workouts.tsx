/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FaDumbbell,
  FaRunning,
  FaHeartbeat,
  FaAppleAlt,
  FaPrayingHands,
} from "react-icons/fa";
import { IoMdFitness } from "react-icons/io";

interface Workout {
  name: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Strength" | "Cardio" | "HIIT" | "Yoga";
  exercises: {
    name: string;
    sets: number;
    reps: string;
    restTime: string;
  }[];
}

const workouts: Workout[] = [
  {
    name: "Full Body Strength",
    description:
      "A comprehensive strength training workout targeting all major muscle groups.",
    duration: "45 minutes",
    difficulty: "Intermediate",
    category: "Strength",
    exercises: [
      { name: "Squats", sets: 3, reps: "12-15", restTime: "60 seconds" },
      { name: "Push-ups", sets: 3, reps: "10-12", restTime: "45 seconds" },
      { name: "Deadlifts", sets: 3, reps: "8-10", restTime: "90 seconds" },
      { name: "Pull-ups", sets: 3, reps: "6-8", restTime: "60 seconds" },
      { name: "Plank", sets: 3, reps: "30-60 seconds", restTime: "30 seconds" },
    ],
  },
  {
    name: "HIIT Cardio Blast",
    description:
      "High-intensity interval training to boost cardiovascular fitness and burn calories.",
    duration: "30 minutes",
    difficulty: "Advanced",
    category: "HIIT",
    exercises: [
      { name: "Burpees", sets: 4, reps: "30 seconds", restTime: "15 seconds" },
      {
        name: "Mountain Climbers",
        sets: 4,
        reps: "30 seconds",
        restTime: "15 seconds",
      },
      {
        name: "Jump Squats",
        sets: 4,
        reps: "30 seconds",
        restTime: "15 seconds",
      },
      {
        name: "High Knees",
        sets: 4,
        reps: "30 seconds",
        restTime: "15 seconds",
      },
    ],
  },
  {
    name: "Yoga Flow",
    description:
      "A calming yoga sequence to improve flexibility, balance, and mindfulness.",
    duration: "60 minutes",
    difficulty: "Beginner",
    category: "Yoga",
    exercises: [
      { name: "Sun Salutations", sets: 1, reps: "5 rounds", restTime: "None" },
      {
        name: "Warrior Poses",
        sets: 1,
        reps: "Hold each for 30 seconds",
        restTime: "Brief",
      },
      {
        name: "Balance Poses",
        sets: 1,
        reps: "Hold each for 30 seconds",
        restTime: "Brief",
      },
      {
        name: "Seated Forward Fold",
        sets: 1,
        reps: "Hold for 2 minutes",
        restTime: "None",
      },
    ],
  },
  {
    name: "Cardio Endurance",
    description:
      "A challenging cardio workout to improve stamina and endurance.",
    duration: "40 minutes",
    difficulty: "Intermediate",
    category: "Cardio",
    exercises: [
      { name: "Jogging", sets: 1, reps: "10 minutes", restTime: "1 minute" },
      { name: "Jump Rope", sets: 3, reps: "2 minutes", restTime: "30 seconds" },
      { name: "Cycling", sets: 1, reps: "15 minutes", restTime: "1 minute" },
      {
        name: "Stair Climbing",
        sets: 3,
        reps: "2 minutes",
        restTime: "30 seconds",
      },
    ],
  },
  {
    name: "Bodyweight Circuit",
    description: "A full-body workout using just your bodyweight.",
    duration: "30 minutes",
    difficulty: "Beginner",
    category: "Strength",
    exercises: [
      {
        name: "Bodyweight Squats",
        sets: 3,
        reps: "15",
        restTime: "30 seconds",
      },
      { name: "Push-ups", sets: 3, reps: "10", restTime: "30 seconds" },
      { name: "Lunges", sets: 3, reps: "10 each leg", restTime: "30 seconds" },
      { name: "Plank", sets: 3, reps: "30 seconds", restTime: "30 seconds" },
      {
        name: "Mountain Climbers",
        sets: 3,
        reps: "20",
        restTime: "30 seconds",
      },
    ],
  },
  {
    name: "Core Crusher",
    description:
      "Intensive core workout to strengthen your abs and lower back.",
    duration: "20 minutes",
    difficulty: "Intermediate",
    category: "Strength",
    exercises: [
      { name: "Crunches", sets: 3, reps: "20", restTime: "30 seconds" },
      { name: "Russian Twists", sets: 3, reps: "30", restTime: "30 seconds" },
      { name: "Leg Raises", sets: 3, reps: "15", restTime: "30 seconds" },
      { name: "Planks", sets: 3, reps: "45 seconds", restTime: "30 seconds" },
      { name: "Superman", sets: 3, reps: "12", restTime: "30 seconds" },
    ],
  },
];

const WorkoutsPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expertly Crafted Workouts
        </motion.h1>
        <motion.p
          className="text-xl mb-10 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover a variety of workouts designed to help you achieve your
          fitness goals. From strength training to yoga, we've got you covered.
        </motion.p>

        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
            <TabsTrigger value="hiit">HIIT</TabsTrigger>
            <TabsTrigger value="yoga">Yoga</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <WorkoutGrid
              workouts={workouts}
              setSelectedWorkout={setSelectedWorkout}
            />
          </TabsContent>
          <TabsContent value="strength">
            <WorkoutGrid
              workouts={workouts.filter((w) => w.category === "Strength")}
              setSelectedWorkout={setSelectedWorkout}
            />
          </TabsContent>
          <TabsContent value="cardio">
            <WorkoutGrid
              workouts={workouts.filter((w) => w.category === "Cardio")}
              setSelectedWorkout={setSelectedWorkout}
            />
          </TabsContent>
          <TabsContent value="hiit">
            <WorkoutGrid
              workouts={workouts.filter((w) => w.category === "HIIT")}
              setSelectedWorkout={setSelectedWorkout}
            />
          </TabsContent>
          <TabsContent value="yoga">
            <WorkoutGrid
              workouts={workouts.filter((w) => w.category === "Yoga")}
              setSelectedWorkout={setSelectedWorkout}
            />
          </TabsContent>
        </Tabs>

        {selectedWorkout && (
          <WorkoutDetails
            workout={selectedWorkout}
            onClose={() => setSelectedWorkout(null)}
          />
        )}

        <WorkoutTips />
      </div>
    </div>
  );
};

const WorkoutGrid = ({
  workouts,
  setSelectedWorkout,
}: {
  workouts: Workout[];
  setSelectedWorkout: (workout: Workout) => void;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {workouts.map((workout, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{workout.name}</CardTitle>
              <div className="flex space-x-2 mt-2">
                <Badge>{workout.difficulty}</Badge>
                <Badge variant="secondary">{workout.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="mb-4">{workout.description}</p>
              <div>
                <p className="mb-2">
                  <strong>Duration:</strong> {workout.duration}
                </p>
                <Button onClick={() => setSelectedWorkout(workout)}>
                  View Workout
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

const WorkoutDetails = ({
  workout,
  onClose,
}: {
  workout: Workout;
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">{workout.name}</h2>
        <p className="mb-4">{workout.description}</p>
        <div className="flex space-x-2 mb-4">
          <Badge>{workout.difficulty}</Badge>
          <Badge variant="secondary">{workout.category}</Badge>
          <Badge variant="outline">{workout.duration}</Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">Exercises</h3>
        <ul className="space-y-4">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="border-b pb-2">
              <Collapsible>
                <CollapsibleTrigger className="font-semibold hover:text-blue-500">
                  {exercise.name}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p>Sets: {exercise.sets}</p>
                  <p>Reps: {exercise.reps}</p>
                  <p>Rest: {exercise.restTime}</p>
                </CollapsibleContent>
              </Collapsible>
            </li>
          ))}
        </ul>
        <Button onClick={onClose} className="mt-6">
          Close
        </Button>
      </motion.div>
    </motion.div>
  );
};

const WorkoutTips = () => {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Workout Tips for Success
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaDumbbell className="mr-2" /> Proper Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Maintaining proper form during exercises is crucial for maximizing
              results and preventing injuries. Focus on controlled movements and
              engage the correct muscle groups.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaHeartbeat className="mr-2" /> Progressive Overload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Gradually increase the weight, frequency, or number of repetitions
              in your strength training routine. This progressive overload
              principle is essential for continuous improvement.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaRunning className="mr-2" /> Consistent Cardio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Incorporate regular cardio sessions into your routine to improve
              heart health, boost endurance, and burn calories. Aim for at least
              150 minutes of moderate-intensity cardio per week.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaAppleAlt className="mr-2" /> Nutrition Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Fuel your workouts with a balanced diet rich in protein, complex
              carbohydrates, and healthy fats. Stay hydrated and consider pre-
              and post-workout nutrition for optimal performance and recovery.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaPrayingHands className="mr-2" /> Yoga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Helps ease symptoms of arthritis Improves balance, strength, and
              flexibility Helps you manage and relieve stress Boosts your energy
              levels and brightens your mood Helps ease back pain Improves your
              heart health
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <IoMdFitness className="mr-2" /> Strength Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              By stressing your bones, strength training can increase bone
              density and reduce the risk of osteoporosis. Strength training can
              help you manage or lose weight, and it can increase your
              metabolism to help you burn more calories. Enhance your quality of
              life.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default WorkoutsPage;
