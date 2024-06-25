/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaDumbbell, FaRunning, FaPrayingHands } from "react-icons/fa";

const ExpertTrainersPage = () => {
  interface TrainerItem {
    name: string;
    specialty: string;
    experience: string;
    bio: string;
    avatar: string;
    certifications: string[];
    schedule: { name: string; time: string }[];
    icon: IconType;
  }
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerItem>();

  const trainers: TrainerItem[] = [
    {
      name: "Aarav Patel",
      specialty: "Yoga",
      experience: "8+ years",
      bio: "Aarav is a certified yoga instructor specializing in Morning Yoga and Power Yoga.",
      avatar: "/trainers/aarav-patel.jpg",
      certifications: ["RYT-200", "E-RYT 500"],
      schedule: [
        { name: "Morning Yoga", time: "6:00 AM - 7:00 AM" },
        { name: "Power Yoga", time: "8:30PM- 9:30PM" },
      ],
      icon: FaPrayingHands,
    },
    {
      name: "Rohit Sharma",
      specialty: "Cardio",
      experience: "7+ years",
      bio: "Rohit is an energetic cardio trainer, known for his intense HIIT Blast sessions.",
      avatar: "/trainers/rohit-sharma.jpg",
      certifications: ["ACE-CPT", "NASM-PES"],
      schedule: [{ name: "HIIT Blast", time: "7:30 AM - 8:30 AM" }],
      icon: FaRunning,
    },
    {
      name: "Rahul Singh",
      specialty: "Strength Training",
      experience: "10+ years",
      bio: "Rahul is a certified strength coach, offering both regular and advanced strength training sessions.",
      avatar: "/trainers/rahul-singh.jpg",
      certifications: ["NSCA-CSCS", "ISSA-CPT"],
      schedule: [
        { name: "Strength Training", time: "9:00 AM - 10:00 AM" },
        { name: "Advance Strength Training", time: "8:40PM - 9:50PM" },
      ],
      icon: FaDumbbell,
    },
    {
      name: "Sumit Kumar",
      specialty: "Strength Training",
      experience: "6+ years",
      bio: "Sumit specializes in strength training, focusing on building muscle and improving overall fitness.",
      avatar: "/trainers/sumit-kumar.jpg",
      certifications: ["NASM-CPT", "ACE-CPT"],
      schedule: [{ name: "Strength Training", time: "10:00 AM - 11:30 AM" }],
      icon: FaDumbbell,
    },
    {
      name: "Priya Singh",
      specialty: "Cardio",
      experience: "5+ years",
      bio: "Priya is passionate about cardio workouts and helps clients improve their endurance and stamina.",
      avatar: "/trainers/priya-singh.jpg",
      certifications: ["ACE-GFI", "AFAA-CGFI"],
      schedule: [{ name: "Evening Cardio", time: "6:00PM - 7:25PM" }],
      icon: FaRunning,
    },
    {
      name: "Divya",
      specialty: "Pilates",
      experience: "6+ years",
      bio: "Divya is a certified Pilates instructor, focusing on core strength and flexibility.",
      avatar: "/trainers/divya.jpg",
      certifications: ["PMA-CPT", "BASI Pilates"],
      schedule: [{ name: "Pilates", time: "7:30PM - 8:30PM" }],
      icon: FaRunning,
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Expert Trainers
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trainers.map((trainer, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={trainer.avatar} alt={trainer.name} />
                      <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{trainer.name}</CardTitle>
                      <Badge>{trainer.specialty}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-2">
                    <strong>Experience:</strong> {trainer.experience}
                  </p>
                  <p className="mb-4">{trainer.bio}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedTrainer(trainer)}>
                        View Full Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{trainer.name}</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="about">
                        <TabsList>
                          <TabsTrigger value="about">About</TabsTrigger>
                          <TabsTrigger value="schedule">Schedule</TabsTrigger>
                        </TabsList>
                        <TabsContent value="about">
                          <h3 className="font-semibold mb-2">Bio</h3>
                          <p>{trainer.bio}</p>
                          <h3 className="font-semibold mt-4 mb-2">
                            Certifications
                          </h3>
                          <ul className="list-disc pl-5">
                            {trainer.certifications.map((cert, index) => (
                              <li key={index}>{cert}</li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="schedule">
                          <h3 className="font-semibold mb-2">Class Schedule</h3>
                          <ul>
                            {trainer.schedule.map((slot, index) => (
                              <li
                                key={index}
                                className="flex items-center mb-2"
                              >
                                <trainer.icon className="mr-2" />
                                {slot.name}: {slot.time}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertTrainersPage;
