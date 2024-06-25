/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaDumbbell,
  FaHeartbeat,
  FaRunning,
  FaAppleAlt,
  FaCalendarAlt,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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

  const workoutData = [
    { name: "Mon", duration: 45 },
    { name: "Tue", duration: 60 },
    { name: "Wed", duration: 30 },
    { name: "Thu", duration: 45 },
    { name: "Fri", duration: 50 },
    { name: "Sat", duration: 75 },
    { name: "Sun", duration: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back, {session?.user?.name || "Fitness Enthusiast"}!
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaHeartbeat className="mr-2 text-red-500" />
                  Daily Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Steps</span>
                      <span>8,456 / 10,000</span>
                    </div>
                    <Progress value={84.56} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Calories Burned</span>
                      <span>450 / 600 kcal</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Active Minutes</span>
                      <span>45 / 60 min</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaDumbbell className="mr-2 text-blue-500" />
                  Workout Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">
                    Total: 305 minutes this week
                  </p>
                  <p className="text-sm text-gray-500">
                    You're 15 minutes ahead of last week!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaAppleAlt className="mr-2 text-green-500" />
                  Nutrition Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Calories</span>
                      <span>1,800 / 2,200 kcal</span>
                    </div>
                    <Progress value={81.82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Protein</span>
                      <span>90 / 120 g</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Carbs</span>
                      <span>200 / 250 g</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Fat</span>
                      <span>50 / 70 g</span>
                    </div>
                    <Progress value={71.43} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: FaDumbbell,
                    label: "Start Workout",
                    link: "/workout",
                  },
                  { icon: FaAppleAlt, label: "Log Meal", link: "/nutrition" },
                  { icon: FaCalendarAlt, label: "Schedule", link: "/schedule" },
                  {
                    icon: FaChartLine,
                    label: "Membership",
                    link: "/membership",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center space-y-2"
                      onClick={() => router.push(item.link)}
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader>
              <CardTitle>Fitness Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="goals">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="goals">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Weight Loss</span>
                        <span>7 / 10 kg</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Muscle Gain</span>
                        <span>2 / 5 kg</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>5K Run Time</span>
                        <span>28 / 25 min</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="challenges">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FaTrophy className="text-yellow-500 mr-2" />
                      30-Day Plank Challenge (Day 18/30)
                    </li>
                    <li className="flex items-center">
                      <FaTrophy className="text-yellow-500 mr-2" />
                      10K Steps Daily (Streak: 7 days)
                    </li>
                    <li className="flex items-center">
                      <FaTrophy className="text-yellow-500 mr-2" />
                      Drink 8 Glasses of Water (5/8 today)
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="achievements">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FaTrophy className="text-yellow-500 mr-2" />
                      First 5K Run Completed
                    </li>
                    <li className="flex items-center">
                      <FaTrophy className="text-yellow-500 mr-2" />
                      100 Workouts Milestone
                    </li>
                    <li className="flex items-center">
                      <FaTrophy className="text-yellow-500 mr-2" />
                      30-Day Meditation Streak
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
