/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaDumbbell,
  FaHeartbeat,
  FaRunning,
  FaBolt,
  FaAppleAlt,
  FaCalculator,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const HeroSection = () => {
  const { data: session } = useSession();
  const [bmi, setBmi] = useState<number | null>(null);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [dailyQuote, setDailyQuote] = useState("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const quotes = [
      "The only bad workout is the one that didn't happen.",
      "Fitness is not about being better than someone else. It's about being better than you used to be.",
      "Take care of your body. It's the only place you have to live.",
    ];
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = Number(
      (weight / (heightInMeters * heightInMeters)).toFixed(1)
    );
    setBmi(bmiValue);
  };

  const getBMICategory = (bmiValue: number | null) => {
    if (!bmiValue) return "Unknown";
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal weight";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {session?.user?.name
            ? `Welcome, ${session.user.name}!`
            : "Elevate Your Fitness"}
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl mb-10 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Embark on a transformative journey with FitnessFusion. Redefine your
          limits.
        </motion.p>

        <motion.div
          className="text-lg sm:text-xl mb-10 text-center max-w-2xl mx-auto text-gray-500 dark:text-gray-400 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {dailyQuote}
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="bmi" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
              <TabsTrigger value="start">Get Started</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            <TabsContent value="bmi">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Slider
                        id="height"
                        min={100}
                        max={250}
                        step={1}
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                      />
                      <p className="text-right text-sm text-gray-500">
                        {height} cm
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Slider
                        id="weight"
                        min={30}
                        max={200}
                        step={0.1}
                        value={[weight]}
                        onValueChange={(value) => setWeight(value[0])}
                      />
                      <p className="text-right text-sm text-gray-500">
                        {weight} kg
                      </p>
                    </div>
                    <Button onClick={calculateBMI} className="w-full">
                      Calculate BMI
                    </Button>
                    {bmi !== null && (
                      <div className="text-center mt-4">
                        <p className="text-2xl font-bold">Your BMI: {bmi}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Category: {getBMICategory(bmi)}
                        </p>
                        <Progress value={bmi} max={40} className="mt-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="start">
              <Card>
                <CardHeader>
                  <CardTitle>Begin Your Fitness Journey</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="w-full">Schedule a Free Trial</Button>
                    <Button variant="outline" className="w-full">
                      Take a Virtual Tour
                    </Button>
                  </div>
                  <div className="mt-6">
                    <Label htmlFor="email">Get Our Newsletter</Label>
                    <div className="flex mt-2">
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        className="mr-2"
                      />
                      <Button>Subscribe</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonials">
              <Card>
                <CardHeader>
                  <CardTitle>What Our Members Say</CardTitle>
                </CardHeader>
                <CardContent>
                  <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {[
                        {
                          name: "John D.",
                          quote:
                            "FitnessFusion changed my life! I've never felt better.",
                          avatar: "/avatars/john.jpg",
                        },
                        {
                          name: "Sarah M.",
                          quote:
                            "The trainers here are top-notch. Highly recommended!",
                          avatar: "/avatars/sarah.jpg",
                        },
                        {
                          name: "Mike R.",
                          quote:
                            "Great community and amazing results. Love it!",
                          avatar: "/avatars/mike.jpg",
                        },
                      ].map((testimonial, index) => (
                        <CarouselItem key={index}>
                          <div className="p-4">
                            <Avatar className="w-20 h-20 mx-auto mb-4">
                              <AvatarImage
                                src={testimonial.avatar}
                                alt={testimonial.name}
                              />
                              <AvatarFallback>
                                {testimonial.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-center italic mb-2">
                              "{testimonial.quote}"
                            </p>
                            <p className="text-center font-semibold">
                              {testimonial.name}
                            </p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            {
              icon: FaDumbbell,
              label: "Expert Trainers",
              link: "/expert-trainers",
            },
            { icon: FaHeartbeat, label: "Personalized Plans" },
            {
              icon: FaRunning,
              label: "State-of-the-art Equipment",
              link: "/equipment",
            },
            { icon: FaBolt, label: "High-Intensity Workouts" },
            {
              icon: FaAppleAlt,
              label: "Nutrition Guidance",
              link: "/nutrition",
            },
            { icon: FaCalculator, label: "Progress Tracking" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <item.icon className="text-4xl mb-4 text-blue-500" />
                  <p className="text-lg font-semibold text-center">
                    {item.label}
                    <br />
                    {item.link && (
                      <Link
                        href={item.link}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Learn More
                      </Link>
                    )}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
