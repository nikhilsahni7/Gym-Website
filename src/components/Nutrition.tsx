/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  FaAppleAlt,
  FaCarrot,
  FaEgg,
  FaFish,
  FaLeaf,
  FaWeight,
  FaCalculator,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { IconType } from "react-icons";
import MembershipInfo from "./MembershipInfo";

const NutritionPage = () => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<NutritionPlan | null>(null);
  const [calorieIntake, setCalorieIntake] = useState(2000);
  const [macroGoals, setMacroGoals] = useState({
    protein: 30,
    carbs: 40,
    fat: 30,
  });
  const [activeTab, setActiveTab] = useState("plans");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  interface NutritionPlan {
    name: string;
    description: string;
    icon: IconType;
    features: string[];
    sampleMenu: { meal: string; items: string[] }[];
    recommendedCalories: number;
    macros: { protein: number; carbs: number; fat: number };
  }

  const nutritionPlans = [
    {
      name: "Weight Loss",
      description:
        "A balanced plan focused on calorie deficit and nutrient-dense foods.",
      icon: FaWeight,
      features: [
        "Personalized calorie goals",
        "High-protein meals",
        "Portion control guidance",
      ],
      sampleMenu: [
        {
          meal: "Breakfast",
          items: ["Greek yogurt with berries", "Whole grain toast"],
        },
        { meal: "Lunch", items: ["Grilled chicken salad", "Quinoa"] },
        { meal: "Dinner", items: ["Baked salmon", "Roasted vegetables"] },
      ],
      recommendedCalories: 1800,
      macros: { protein: 35, carbs: 35, fat: 30 },
    },
    {
      name: "Muscle Gain",
      description:
        "High-protein plan designed to support muscle growth and recovery.",
      icon: FaEgg,
      features: [
        "Increased protein intake",
        "Complex carbohydrates",
        "Healthy fats",
      ],
      sampleMenu: [
        { meal: "Breakfast", items: ["Protein smoothie", "Oatmeal with nuts"] },
        { meal: "Lunch", items: ["Lean beef stir-fry", "Brown rice"] },
        {
          meal: "Dinner",
          items: ["Grilled chicken breast", "Sweet potato", "Broccoli"],
        },
      ],
      recommendedCalories: 2500,
      macros: { protein: 40, carbs: 40, fat: 20 },
    },
    {
      name: "Vegetarian",
      description:
        "Plant-based nutrition plan rich in vegetables, fruits, and plant proteins.",
      icon: FaLeaf,
      features: [
        "Diverse plant proteins",
        "High-fiber meals",
        "Iron-rich foods",
      ],
      sampleMenu: [
        { meal: "Breakfast", items: ["Tofu scramble", "Whole grain toast"] },
        { meal: "Lunch", items: ["Lentil soup", "Mixed green salad"] },
        { meal: "Dinner", items: ["Veggie stir-fry", "Quinoa"] },
      ],
      recommendedCalories: 2200,
      macros: { protein: 25, carbs: 50, fat: 25 },
    },
  ];

  interface testimonialsProps {
    name: string;
    plan: string;
    quote: string;
    avatar: string;
  }

  const testimonials: testimonialsProps[] = [
    {
      name: "Emily R.",
      plan: "Weight Loss",
      quote: "I've lost 20 pounds and feel more energetic than ever!",
      avatar: "/avatars/emily.jpg",
    },
    {
      name: "Michael T.",
      plan: "Muscle Gain",
      quote:
        "Gained 10 pounds of lean muscle in just 3 months. Amazing results!",
      avatar: "/avatars/michael.jpg",
    },
    {
      name: "Sophia L.",
      plan: "Vegetarian",
      quote:
        "This plan made transitioning to a vegetarian diet so easy and delicious.",
      avatar: "/avatars/sophia.jpg",
    },
  ];

  const faqs = [
    {
      question: "How do I choose the right nutrition plan?",
      answer:
        "Consider your fitness goals, dietary preferences, and any health conditions. Our nutritionists can help you select the best plan during a consultation.",
    },
    {
      question: "Can the plans be customized?",
      answer:
        "Yes, all our nutrition plans can be tailored to your specific needs, allergies, and preferences.",
    },
    {
      question: "How often should I update my nutrition plan?",
      answer:
        "We recommend reviewing and adjusting your plan every 4-6 weeks based on your progress and any changes in your goals.",
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

  useEffect(() => {
    if (selectedPlan) {
      setCalorieIntake(selectedPlan.recommendedCalories);
      setMacroGoals(selectedPlan.macros);
    }
  }, [selectedPlan]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status !== "authenticated") {
      alert("Please sign in to submit a consultation request.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        toast({
          title: "Consultation Request Submitted",
          description: "Thank you for submitting a consultation request.",
        });

        router.refresh();
      } else {
        toast({
          title: "Failed to submit consultation request",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Failed to submit consultation request",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          Personalized Nutrition Plans
        </motion.h1>
        <motion.p
          className="text-xl mb-10 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Fuel your fitness journey with expert-designed nutrition plans
          tailored to your unique goals and lifestyle.
        </motion.p>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto mb-12"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Nutrition Plans</TabsTrigger>
            <TabsTrigger value="calculator">Macro Calculator</TabsTrigger>
            <TabsTrigger value="testimonials">Success Stories</TabsTrigger>
          </TabsList>
          <TabsContent value="plans">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {nutritionPlans.map((plan, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <plan.icon className="text-4xl text-blue-500" />
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <Badge>{plan.description}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="list-disc pl-5 mb-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedPlan(plan)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{plan.name} Plan Details</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="menu">
                            <TabsList>
                              <TabsTrigger value="menu">
                                Sample Menu
                              </TabsTrigger>
                              <TabsTrigger value="macros">
                                Macro Breakdown
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="menu">
                              {plan.sampleMenu.map((meal, idx) => (
                                <div key={idx} className="mb-4">
                                  <h3 className="font-semibold">{meal.meal}</h3>
                                  <ul className="list-disc pl-5">
                                    {meal.items.map((item, itemIdx) => (
                                      <li key={itemIdx}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </TabsContent>
                            <TabsContent value="macros">
                              <div className="space-y-4">
                                <p>
                                  Recommended Daily Calories:{" "}
                                  {plan.recommendedCalories}
                                </p>
                                <div>
                                  <Label>Protein: {plan.macros.protein}%</Label>
                                  <Progress
                                    value={plan.macros.protein}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Carbs: {plan.macros.carbs}%</Label>
                                  <Progress
                                    value={plan.macros.carbs}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Fat: {plan.macros.fat}%</Label>
                                  <Progress
                                    value={plan.macros.fat}
                                    className="mt-2"
                                  />
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Macro Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="calories">Daily Calorie Intake</Label>
                    <Slider
                      id="calories"
                      min={1200}
                      max={4000}
                      step={50}
                      value={[calorieIntake]}
                      onValueChange={(value) => setCalorieIntake(value[0])}
                    />
                    <p className="text-right text-sm text-gray-500">
                      {calorieIntake} calories
                    </p>
                  </div>
                  <div>
                    <Label>Protein: {macroGoals.protein}%</Label>
                    <Slider
                      min={10}
                      max={50}
                      step={1}
                      value={[macroGoals.protein]}
                      onValueChange={(value) =>
                        setMacroGoals({ ...macroGoals, protein: value[0] })
                      }
                    />
                  </div>
                  <div>
                    <Label>Carbs: {macroGoals.carbs}%</Label>
                    <Slider
                      min={10}
                      max={60}
                      step={1}
                      value={[macroGoals.carbs]}
                      onValueChange={(value) =>
                        setMacroGoals({ ...macroGoals, carbs: value[0] })
                      }
                    />
                  </div>
                  <div>
                    <Label>Fat: {macroGoals.fat}%</Label>
                    <Slider
                      min={10}
                      max={50}
                      step={1}
                      value={[macroGoals.fat]}
                      onValueChange={(value) =>
                        setMacroGoals({ ...macroGoals, fat: value[0] })
                      }
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Your Daily Macro Goals:
                  </h3>
                  <p>
                    Protein:{" "}
                    {Math.round((calorieIntake * macroGoals.protein) / 100 / 4)}
                    g
                  </p>
                  <p>
                    Carbs:{" "}
                    {Math.round((calorieIntake * macroGoals.carbs) / 100 / 4)}g
                  </p>
                  <p>
                    Fat:{" "}
                    {Math.round((calorieIntake * macroGoals.fat) / 100 / 9)}g
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
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
                          <p className="text-center text-sm text-gray-500">
                            {testimonial.plan} Plan
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

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              {status === "authenticated" ? (
                <form onSubmit={handleSubmit}>
                  <p className="mb-4">
                    Get personalized nutrition advice from our expert
                    dietitians. Schedule a consultation today!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Input
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any specific questions or concerns?"
                    />
                  </div>
                  <Button
                    className="mt-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Schedule Consultation"}
                  </Button>
                </form>
              ) : (
                <p>Please sign in to submit a consultation request.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready to Transform Your Nutrition?
          </h2>
          <p className="mb-6">
            Join thousands of satisfied clients who have achieved their health
            and fitness goals with our personalized nutrition plans.
          </p>
          <Button variant="outline" size="lg">
            Contact and join us
          </Button>
        </motion.div>
        <MembershipInfo />
      </div>
    </div>
  );
};

export default NutritionPage;
