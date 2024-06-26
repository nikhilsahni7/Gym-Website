/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast, useToast } from "./ui/use-toast";
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
import MembershipInfo from "./MembershipInfo";
import Spinner from "./Spinner";

const HeroSection = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [bmi, setBmi] = useState<number | null>(null);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [dailyQuote, setDailyQuote] = useState("");
  const [loading, setLoading] = useState(true);
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

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {session?.user?.name
            ? `Welcome, ${session.user.name}!`
            : "Elevate Your Fitness"}
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl mb-12 text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Embark on a transformative journey with FitnessFusion. Redefine your
          limits and achieve your health goals with our expert guidance.
        </motion.p>

        <motion.div
          className="text-lg sm:text-xl mb-16 text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-400 italic font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          "{dailyQuote}"
        </motion.div>

        <motion.div
          className="mb-24"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="bmi" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="bmi" className="text-sm sm:text-lg">
                BMI
              </TabsTrigger>
              <TabsTrigger value="start" className="text-sm sm:text-lg">
                Start
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="text-sm sm:text-lg">
                Reviews
              </TabsTrigger>
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
                    <Button
                      onClick={() => {
                        toast({
                          title:
                            "Check out our membership plans for free trial",
                          description: "Contact us to know more !",
                        });
                      }}
                      className="w-full"
                    >
                      Schedule a Free Trial
                    </Button>
                    <Button
                      variant="outline"
                      onClickCapture={() => {
                        toast({
                          title: "Virtual tour feature is coming soon",
                          description:
                            "Subscribe and follow us we will give you early access to the virtual tour feature",
                        });
                      }}
                      className="w-full"
                    >
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
                      <Button
                        onClick={() => {
                          toast({
                            title: "Thank you for subscribing!",
                            description: "We'll keep you updated!",
                          });
                        }}
                      >
                        Subscribe
                      </Button>
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
                          name: "Surender Mittal",
                          quote:
                            "FitnessFusion changed my life! I've never felt better.",
                          avatar: "/avatars/john.jpg",
                        },
                        {
                          name: "Rahul Sharma",
                          quote:
                            "The trainers here are top-notch. Highly recommended!",
                          avatar: "/avatars/sarah.jpg",
                        },
                        {
                          name: "Deepshika Singh",
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
            {
              icon: FaHeartbeat,
              label: "Personalized Plans",
              link: "/membership",
            },
            {
              icon: FaRunning,
              label: "State-of-the-art Equipment",
              link: "/equipment",
            },
            {
              icon: FaBolt,
              label: "High-Intensity Workouts",
              link: "/workout",
            },
            {
              icon: FaAppleAlt,
              label: "Nutrition Guidance",
              link: "/nutrition",
            },
            {
              icon: FaCalculator,
              label: "Schedule and Classes",
              link: "/schedule",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center p-8">
                  <item.icon className="text-5xl mb-6 text-blue-500" />
                  <p className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
                    {item.label}
                  </p>
                  {item.link && (
                    <Link
                      href={item.link}
                      className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Learn More →
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <MembershipInfo />
      </div>
    </div>
  );
};

export default HeroSection;
