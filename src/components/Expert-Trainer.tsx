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

const ExpertTrainersPage = () => {
  interface TrainerItem {
    name: string;
    specialty: string;
    experience: string;
    bio: string;
    avatar: string;
    certifications: string[];
    schedule: { day: string; time: string }[];
    testimonials: { name: string; text: string }[];
  }
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerItem>();

  const trainers: TrainerItem[] = [
    {
      name: "Alex Johnson",
      specialty: "Strength Training",
      experience: "10+ years",
      bio: "Alex is a certified strength coach with a passion for helping clients achieve their fitness goals.",
      avatar: "/trainers/alex.jpg",
      certifications: ["NSCA-CSCS", "NASM-CPT"],
      schedule: [
        { day: "Monday", time: "6:00 AM - 2:00 PM" },
        { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
        { day: "Friday", time: "12:00 PM - 8:00 PM" },
      ],
      testimonials: [
        {
          name: "John D.",
          text: "Alex helped me increase my deadlift by 50lbs in just 3 months!",
        },
        {
          name: "Sarah M.",
          text: "I've never felt stronger. Alex's programs are challenging but effective.",
        },
      ],
    },
    // more trainers with similar detailed information will be added
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
                          <TabsTrigger value="testimonials">
                            Testimonials
                          </TabsTrigger>
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
                          <h3 className="font-semibold mb-2">
                            Weekly Schedule
                          </h3>
                          <ul>
                            {trainer.schedule.map((slot, index) => (
                              <li key={index}>
                                {slot.day}: {slot.time}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="testimonials">
                          <h3 className="font-semibold mb-2">
                            Client Testimonials
                          </h3>
                          {trainer.testimonials.map((testimonial, index) => (
                            <div key={index} className="mb-4">
                              <p className="italic">"{testimonial.text}"</p>
                              <p className="text-right">- {testimonial.name}</p>
                            </div>
                          ))}
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
