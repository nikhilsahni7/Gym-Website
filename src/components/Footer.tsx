"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

const Footer = () => {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "We'll send you the latest news, articles, and resources.",
      duration: 3000,
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/nutrition"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Nutrition
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Membership (Pricing)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/expert-trainers"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Expert Trainers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/equipment"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Equipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/workout"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Workouts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/schedule"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Schedule
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                  Contact
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="text-base text-gray-600 dark:text-gray-300">
                    <strong>Location:</strong> Noida
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-300">
                    <strong>Address:</strong> C-43 Basement, Main Road, Sector
                    20, Noida, Uttar Pradesh 201301
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-300">
                    <strong>Contact:</strong> 9999144847
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image
                src="https://avatars.githubusercontent.com/u/100983397?v=4"
                alt="Nikhil Sahni"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Made by Nikhil Sahni
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full Stack Developer
                </p>
                <a
                  href="tel:8800244926"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center mt-1"
                >
                  <FaPhone className="mr-2" /> 8800 244 926
                </a>
              </div>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/Nikhilllsahni"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <span className="sr-only">Twitter/X</span>
                <FaTwitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/iam.nikhil7?igsh=cTFyZDh0NXk0eGNs"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <span className="sr-only">YouTube</span>
                <FaYoutube className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/nikhilsahni7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-sahni-655518222?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <p className="mt-8 text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; 2024 FitnessFusion X Bync Gym, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <Toaster />
    </footer>
  );
};

export default Footer;
