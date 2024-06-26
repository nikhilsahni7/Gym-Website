"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Logout from "@/components/Logout";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaHome,
  FaDumbbell,
  FaCalendar,
  FaUser,
  FaCog,
  FaAppleAlt,
  FaCreditCard,
  FaChartLine,
  FaTrophy,
  FaHeart,
  FaRunning,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const menuItems = [
    { icon: FaHome, label: "Dashboard" },
    { icon: FaDumbbell, label: "Workouts" },
    { icon: FaCalendar, label: "Schedule" },
    { icon: FaAppleAlt, label: "Nutrition & Diet" },
    { icon: FaCreditCard, label: "Membership" },
    { icon: FaTrophy, label: "Workout-planner" },
    { icon: FaUser, label: "Profile" },
    { icon: FaCog, label: "Settings" },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaBars className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-r border-gray-200 dark:border-gray-800"
      >
        <SheetHeader>
          <SheetTitle className="text-4xl font-bold text-gray-800 dark:text-white">
            FitnessFusion
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] py-6">
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar className="w-32 h-32 border-4 border-blue-500">
                <AvatarImage
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="User"
                />
                <AvatarFallback className="text-4xl font-bold bg-blue-500 text-white">
                  {session?.user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
              {session?.user?.name || "Guest"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Elite Member
            </p>
            <div className="w-full mt-4 px-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Fitness Goal Progress
              </p>
              <Progress
                value={75}
                className="h-2 bg-gray-200 dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="px-4 mb-6">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <nav>
            <AnimatePresence>
              {filteredMenuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg mb-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => {
                      if (item.label === "Membership") {
                        router.push("/membership");
                      }
                      if (item.label === "Nutrition & Diet") {
                        router.push("/nutrition");
                      }

                      if (item.label === "Workouts") {
                        router.push("/workout");
                      }
                      if (item.label === "Schedule") {
                        router.push("/schedule");
                      }
                      if (item.label === "Dashboard") {
                        router.push("/dashboard");
                      }
                      if (item.label === "Workout-planner") {
                        router.push("/workoutPlanner");
                      }
                    }}
                  >
                    <item.icon className="mr-4 h-5 w-5 group-hover:text-blue-500 transition-colors duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>

          <div className="mt-8 px-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <FaHeart className="text-red-500 mb-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Heart Rate
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  72 bpm
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <FaRunning className="text-blue-500 mb-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Steps Today
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  8,456
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 px-4">
            <Button
              variant="default"
              className="w-full justify-center text-lg mb-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FaDumbbell className="mr-2" /> Quick Start Workout
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center text-lg mb-4"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <FaSun className="mr-2" />
              ) : (
                <FaMoon className="mr-2" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            <Logout />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
