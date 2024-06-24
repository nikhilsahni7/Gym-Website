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
      description:
        "Advanced treadmill with performance monitoring and virtual training programs.",
      image: "/equipment/treadmill.jpg",
      features: [
        "Speed range: 0.5 to 30 km/h",
        "Incline: -3% to 25%",
        "22-inch HD touchscreen display",
        "Integrated heart rate monitoring",
      ],
      workouts: [
        "High-Intensity Interval Training (HIIT)",
        "Endurance runs",
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
    // more equipment with similar detailed information
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
                      objectFit="cover"
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
