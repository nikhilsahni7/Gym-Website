"use client";

import { useState } from "react";
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
import Logout from "@/components/Logout";
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
  FaSearch,
  FaBell,
  FaSignOutAlt,
  FaHeart,
  FaRunning,
} from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { icon: FaHome, label: "Dashboard" },
    { icon: FaDumbbell, label: "Workouts" },
    { icon: FaCalendar, label: "Schedule" },
    { icon: FaAppleAlt, label: "Nutrition & Diet" },
    { icon: FaChartLine, label: "Progress Tracker" },
    { icon: FaTrophy, label: "Challenges" },
    { icon: FaCreditCard, label: "Membership" },
    { icon: FaUser, label: "Profile" },
    { icon: FaCog, label: "Settings" },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          <FaBars className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-gray-900 text-white border-r border-gray-800"
      >
        <SheetHeader>
          <SheetTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
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
              <Avatar className="w-32 h-32 border-4 border-green-500">
                <AvatarImage
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="User"
                />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-green-400 to-blue-500">
                  {session?.user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <h2 className="mt-4 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {session?.user?.name || "Guest"}
            </h2>
            <p className="text-sm text-gray-400">Elite Member</p>
            <div className="w-full mt-4 px-4">
              <p className="text-sm text-gray-400 mb-1">
                Fitness Goal Progress
              </p>
              <Progress value={75} className="h-2 bg-gray-700" />
            </div>
          </div>

          <div className="px-4 mb-6">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
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
                    className="w-full justify-start text-lg mb-2 hover:bg-gray-800 text-gray-300 hover:text-white transition-all duration-200 group"
                    onClick={() => {
                      if (item.label === "Membership") {
                        console.log("Navigating to payment gateway");
                      }
                      // Add navigation logic for other menu items
                    }}
                  >
                    <item.icon className="mr-4 h-5 w-5 group-hover:text-green-400 transition-colors duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>

          <div className="mt-8 px-4">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <FaHeart className="text-red-500 mb-1" />
                <p className="text-sm">Heart Rate</p>
                <p className="text-lg font-bold">72 bpm</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <FaRunning className="text-blue-500 mb-1" />
                <p className="text-sm">Steps Today</p>
                <p className="text-lg font-bold">8,456</p>
              </div>
            </div>
          </div>

          <div className="mt-8 px-4">
            <Button
              variant="outline"
              className="w-full justify-center text-lg mb-4 bg-green-600 hover:bg-green-700 text-white border-none"
            >
              <FaDumbbell className="mr-2" /> Quick Start Workout
            </Button>
            <Logout />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
