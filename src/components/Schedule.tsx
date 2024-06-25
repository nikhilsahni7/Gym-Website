"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconType } from "react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaDumbbell, FaRunning, FaPrayingHands } from "react-icons/fa";
import { useToast } from "./ui/use-toast";

const SchedulePage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<classProps>();

  const classes = [
    {
      id: 1,
      name: "Morning Yoga",
      time: "6:00 AM - 7:00 AM",
      instructor: "Aarav Patel",
      type: "Yoga",
      icon: FaPrayingHands,
    },
    {
      id: 2,
      name: "HIIT Blast",
      time: "7:30 AM - 8:30 AM",
      instructor: "Rohit Sharma",
      type: "Cardio",
      icon: FaRunning,
    },
    {
      id: 3,
      name: "Strength Training",
      time: "9:00 AM - 10:00 AM",
      instructor: "Rahul Singh",
      type: "Strength",
      icon: FaDumbbell,
    },
    {
      id: 4,
      name: "Strength Training",
      time: "10:00 AM - 11:30 AM",
      instructor: "Sumit kumar",
      type: "Strength",
      icon: FaDumbbell,
    },
    {
      id: 5,
      name: "Evening Cardio",
      time: "6:00PM - 7:25PM",
      instructor: "Priya Singh",
      type: "Cardio",
      icon: FaRunning,
    },
    {
      id: 6,
      name: "Pilates",
      time: "7:30PM - 8:30PM",
      instructor: "Divya",
      type: "Cardio",
      icon: FaRunning,
    },
    {
      id: 7,
      name: "Advance Strength Training",
      time: "8:40PM - 9:50PM",
      instructor: "Rahul Singh",
      type: "Cardio",
      icon: FaDumbbell,
    },
    {
      id: 8,
      name: "Power Yoga",
      time: "8:30PM- 9:30PM",
      instructor: "Aarav Patel",
      type: "Cardio",
      icon: FaDumbbell,
    },
  ];

  interface classProps {
    id: number;
    name: string;
    time: string;
    instructor: string;
    type: string;
    icon: IconType;
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
          Class Schedule
        </motion.h1>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="classes">Class Info</TabsTrigger>
          </TabsList>
          <TabsContent value="schedule">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(day: Date | undefined) =>
                      day && setSelectedDate(day)
                    }
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Classes for {selectedDate.toDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Instructor</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classes.map((classItem: classProps) => (
                          <TableRow key={classItem.id}>
                            <TableCell>{classItem.time}</TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <classItem.icon className="mr-2" />
                                {classItem.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage
                                    src={`/avatars/${classItem.instructor
                                      .toLowerCase()
                                      .replace(" ", "-")}.jpg`}
                                  />
                                  <AvatarFallback>
                                    {classItem.instructor
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {classItem.instructor}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedClass(classItem)}
                                  >
                                    Book Now
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Book {selectedClass?.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Confirm your booking for{" "}
                                      {selectedClass?.name} on{" "}
                                      {selectedDate.toDateString()} at{" "}
                                      {selectedClass?.time}.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex justify-end space-x-2 mt-4">
                                    <Button variant="outline">Cancel</Button>
                                    <Button
                                      onClick={() => {
                                        toast({
                                          title:
                                            "You can choose our membership plans to book your classes",
                                          description:
                                            "Contact us for the membership plan and book your class(phone number: 99999144847)",
                                        });
                                      }}
                                    >
                                      Confirm Booking
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="classes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {classes.map((classItem) => (
                <Card key={classItem.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <classItem.icon className="mr-2" /> {classItem.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">
                      <strong>Time:</strong> {classItem.time}
                    </p>
                    <p className="mb-2">
                      <strong>Instructor:</strong> {classItem.instructor}
                    </p>
                    <p className="mb-4">
                      <strong>Type:</strong> {classItem.type}
                    </p>
                    <Badge>{classItem.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Gym Timings</h2>
          <p className="text-lg">
            Morning: 5:30 AM to 11:30 AM
            <br />
            Evening: 4:30 PM to 10:00 PM
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Contact us at{" "}
            <a href="tel:9999144847" className="text-blue-500 hover:underline">
              9999144847
            </a>{" "}
            for more information or to schedule a visit.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SchedulePage;
