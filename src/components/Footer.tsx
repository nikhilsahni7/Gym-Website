"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
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
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  About
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/personal-training"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Personal Training
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/group-classes"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Group Classes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nutrition"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Nutrition Counseling
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Membership
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/pricing"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Contact
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/contact"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Locations
                    </Link>
                  </li>
                  <li>
                    <a
                      href="tel:+1234567890"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      +1 (234) 567-890
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-300">
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
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <FaFacebook className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">YouTube</span>
              <FaYoutube className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 FitnessFusion, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <Toaster />
    </footer>
  );
};

export default Footer;
