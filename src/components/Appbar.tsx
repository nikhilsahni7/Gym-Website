"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { IconContext } from "react-icons";
import {
  FaDumbbell,
  FaBars,
  FaTimes,
  FaUserFriends,
  FaDumbbell as FaEquipment,
  FaAppleAlt,
  FaIdCard,
} from "react-icons/fa";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { CgGym } from "react-icons/cg";

const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Trainers", path: "/expert-trainers", icon: FaUserFriends },
    { name: "Equipment", path: "/equipment", icon: FaEquipment },
    { name: "Nutrition", path: "/nutrition", icon: FaAppleAlt },
    { name: "Membership", path: "/membership", icon: FaIdCard },
    { name: "Workouts", path: "/workout", icon: CgGym },
    { name: "Schedule/Classes", path: "/schedule", icon: FaIdCard },
  ];

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
          : "bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/home" className="flex-shrink-0">
              <FaDumbbell
                className={`h-8 w-8 ${
                  scrolled
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-indigo-600 dark:text-indigo-400"
                }`}
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`${
                      pathname === item.path
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : scrolled
                        ? "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center`}
                  >
                    <IconContext.Provider value={{ className: "mr-2" }}>
                      <item.icon />
                    </IconContext.Provider>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full ${
                scrolled
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "bg-gray-200 dark:bg-gray-700"
              } hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {theme === "dark" ? (
                <HiOutlineSun className="h-6 w-6 text-yellow-400" />
              ) : (
                <HiOutlineMoon className="h-6 w-6 text-indigo-600" />
              )}
              <span className="sr-only">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`${
                scrolled
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-800 dark:text-gray-200"
              } inline-flex items-center justify-center p-2 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900"
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }  px-3 py-2 rounded-md text-base font-medium flex items-center`}
                >
                  <IconContext.Provider value={{ className: "mr-2" }}>
                    <item.icon />
                  </IconContext.Provider>
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {theme === "dark" ? (
                  <HiOutlineSun className="h-5 w-5 mr-2" />
                ) : (
                  <HiOutlineMoon className="h-5 w-5 mr-2" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AppBar;
