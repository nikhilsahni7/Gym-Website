"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaDumbbell,
  FaHeartbeat,
  FaRunning,
  FaBolt,
  FaFire,
  FaCalculator,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const { data: session } = useSession();
  const [bmiVisible, setBmiVisible] = useState(false);
  const [bmi, setBmi] = useState<string | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
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
    if (height && weight) {
      const heightInMeters = Number(height) / 100;
      const bmiValue = (
        Number(weight) /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setBmi(bmiValue);
    }
  };

  const getBMICategory = (bmiValue: string | null) => {
    if (!bmiValue) return "Unknown";
    const bmi = parseFloat(bmiValue);
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-black opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        />
        <motion.img
          src="/fitness-bg-advanced.jpg"
          alt="Fitness Background"
          className="object-cover w-full h-full"
          initial={{ scale: 1.2, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-20">
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(75,0,130,0.1) 50%, rgba(0,0,0,0) 100%)",
            backgroundSize: "200% 100%",
          }}
        />

        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-6 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {session?.user?.name
              ? `Welcome, ${session.user.name}!`
              : "Elevate Your Fitness"}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mb-10 text-center max-w-3xl text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Embark on a transformative journey with FitnessFusion. Redefine your
          limits.
        </motion.p>

        <motion.div
          className="text-lg sm:text-xl md:text-2xl mb-10 text-center max-w-2xl text-purple-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {dailyQuote}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white text-xl px-10 py-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Begin Your Transformation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-black border-purple-500 hover:bg-purple-500 hover:text-white text-xl px-10 py-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => setBmiVisible(!bmiVisible)}
          >
            <FaCalculator className="mr-2" /> BMI Calculator
          </Button>
        </motion.div>

        <AnimatePresence>
          {bmiVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mb-10"
            >
              <Card className="bg-gray-800 border-purple-500 border shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">
                    BMI Calculator
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="height" className="text-gray-300">
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-gray-300">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <Button
                      onClick={calculateBMI}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Calculate BMI
                    </Button>
                    {bmi && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">
                          Your BMI: {bmi}
                        </p>
                        <p className="text-gray-300">
                          Category: {getBMICategory(bmi)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-20"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            { icon: FaDumbbell, label: "Expert Trainers" },
            { icon: FaHeartbeat, label: "Personalized Plans" },
            { icon: FaRunning, label: "State-of-the-art Equipment" },
            { icon: FaBolt, label: "High-Intensity Workouts" },
            { icon: FaFire, label: "Nutrition Guidance" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gray-800 border-purple-500 border shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <CardContent className="flex flex-col items-center p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <item.icon className="text-5xl mb-4 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                  <p className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 text-center">
                    {item.label}
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
