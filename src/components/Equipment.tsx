"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import Image from "next/image";

const EquipmentPage = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem>();

  interface EquipmentItem {
    name: string;
    category: string;
    description: string;
    image: string;
    features: string[];
    workouts: string[];
    maintenanceTips: string[];
  }

  const equipment: EquipmentItem[] = [
    {
      name: "TechnoGym SKILLRUN",
      category: "Cardio",
      description: "Advanced treadmill for HIIT and cardio workouts.",
      image: "/equipment/treadmill.jpg",
      features: [
        "Speed range: 0.5 to 30 km/h",
        "Incline: -3% to 25%",
        "22-inch HD touchscreen display",
        "Integrated heart rate monitoring",
      ],
      workouts: [
        "HIIT Blast",
        "Evening Cardio",
        "Sprint training",
        "Uphill power walking",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Lubricate the belt monthly",
        "Check and tighten bolts quarterly",
        "Professional inspection annually",
      ],
    },
    {
      name: "Concept2 RowErg",
      category: "Cardio",
      description: "High-quality rowing machine for full-body workouts.",
      image: "/equipment/rower.jpg",
      features: [
        "Air resistance flywheel",
        "Adjustable damper settings",
        "PM5 performance monitor",
        "Ergonomic handle design",
      ],
      workouts: [
        "HIIT Blast",
        "Evening Cardio",
        "Endurance rowing",
        "Power strokes",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Oil the chain weekly",
        "Clean the flywheel monthly",
        "Check for loose bolts quarterly",
      ],
    },
    {
      name: "Life Fitness Signature Series Squat Rack",
      category: "Strength",
      description: "Professional-grade squat rack for heavy lifting.",
      image: "/equipment/squat-rack.png",
      features: [
        "Multiple bar catch positions",
        "Integrated weight plate storage",
        "Pull-up bar",
        "Safety spotter arms",
      ],
      workouts: [
        "Strength Training",
        "Advance Strength Training",
        "Squats",
        "Bench press",
        "Pull-ups",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Check and tighten bolts monthly",
        "Lubricate moving parts quarterly",
        "Inspect welds and joints annually",
      ],
    },
    {
      name: "Manduka PRO Yoga Mat",
      category: "Yoga",
      description: "High-density yoga mat for comfort and stability.",
      image: "/equipment/yoga-mat.jpg",
      features: [
        "6mm thickness",
        "Closed-cell surface to prevent moisture absorption",
        "Non-slip texture",
        "Lifetime guarantee",
      ],
      workouts: [
        "Morning Yoga",
        "Power Yoga",
        "Pilates",
        "Stretching exercises",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Deep clean with mild soap weekly",
        "Air dry completely before rolling",
        "Store away from direct sunlight",
      ],
    },
    {
      name: "Assault AirBike",
      category: "Cardio",
      description: "Fan bike for high-intensity cardio workouts.",
      image: "/equipment/airbike.jpg",
      features: [
        "Unlimited air resistance",
        "Full-body engagement",
        "LCD display for performance metrics",
        "Heavy-duty steel frame",
      ],
      workouts: [
        "HIIT Blast",
        "Evening Cardio",
        "Tabata intervals",
        "Endurance rides",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Check and tighten pedals weekly",
        "Lubricate chain monthly",
        "Inspect fan blades quarterly",
      ],
    },
    {
      name: "TRX Suspension Trainer",
      category: "Strength",
      description: "Versatile bodyweight training system.",
      image: "/equipment/trx.jpg",
      features: [
        "Adjustable straps",
        "Multiple anchor options",
        "Supports up to 1400 lbs",
        "Lightweight and portable",
      ],
      workouts: [
        "Strength Training",
        "HIIT Blast",
        "Core workouts",
        "Full-body resistance training",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Check for wear and tear weekly",
        "Clean anchoring carabiners monthly",
        "Replace if any signs of fraying or damage",
      ],
    },
    {
      name: "Eleiko IWF Weightlifting Set",
      category: "Strength",
      description: "Competition-grade barbell and weight plates.",
      image: "/equipment/weightlifting-set.jpg",
      features: [
        "20kg men's / 15kg women's barbells",
        "Calibrated steel plates",
        "Precision bearings for smooth spin",
        "IWF certified",
      ],
      workouts: [
        "Strength Training",
        "Advance Strength Training",
        "Olympic weightlifting",
        "Powerlifting",
      ],
      maintenanceTips: [
        "Wipe down barbell and plates after use",
        "Brush and oil barbell weekly",
        "Store plates on weight trees",
        "Check for loose collars before each use",
      ],
    },
    {
      name: "Balanced Body Studio Reformer",
      category: "Pilates",
      description: "Professional Pilates reformer for studio use.",
      image: "/equipment/pilates.jpg",
      features: [
        "Smooth-gliding carriage",
        "Adjustable springs for variable resistance",
        "Padded footbar and headrest",
        "Convertible to mat platform",
      ],
      workouts: [
        "Pilates",
        "Core strengthening",
        "Flexibility training",
        "Rehabilitation exercises",
      ],
      maintenanceTips: [
        "Wipe down after each use",
        "Check spring tension weekly",
        "Lubricate wheels and tracks monthly",
        "Professional inspection annually",
      ],
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
          State-of-the-Art Equipment
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {equipment.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{item.name}</CardTitle>
                    <Badge>{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4 relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="medium"
                      objectPosition="center"
                      className="rounded-md"
                    />
                  </div>
                  <p className="mb-4">{item.description}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedEquipment(item)}>
                        Learn More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="features">
                        <TabsList>
                          <TabsTrigger value="features">Features</TabsTrigger>
                          <TabsTrigger value="workouts">Workouts</TabsTrigger>
                          <TabsTrigger value="maintenance">
                            Maintenance
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="features">
                          <h3 className="font-semibold mb-2">Key Features</h3>
                          <ul className="list-disc pl-5">
                            {item.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="workouts">
                          <h3 className="font-semibold mb-2">
                            Recommended Workouts
                          </h3>
                          <ul className="list-disc pl-5">
                            {item.workouts.map((workout, index) => (
                              <li key={index}>{workout}</li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="maintenance">
                          <h3 className="font-semibold mb-2">
                            Maintenance Tips
                          </h3>
                          <ul className="list-disc pl-5">
                            {item.maintenanceTips.map((tip, index) => (
                              <li key={index}>{tip}</li>
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

export default EquipmentPage;
