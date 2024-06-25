"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { login } from "@/app/actions/login";
import { register } from "@/app/actions/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doSocialLogin } from "@/lib";
import {
  FaDumbbell,
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaRunning,
  FaHeartbeat,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const AuthForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("login");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onLoginSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      const result = await login(values);
      if (result?.error) setError(result.error);
    });
  };

  const onRegisterSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await register(values);
      if (result?.error) setError(result.error);
      if (result?.success) setSuccess(result.success);
    });
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 6) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 20;
    setPasswordStrength(strength);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md relative">
        <motion.div
          className="absolute -top-16 sm:-top-24 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaDumbbell className="text-4xl sm:text-5xl text-green-600" />
          <FaRunning className="text-4xl sm:text-5xl text-gray-800" />
          <FaHeartbeat className="text-4xl sm:text-5xl text-green-600" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-2xl border overflow-hidden bg-white/50 border-green-200">
            <CardHeader className="space-y-1 bg-gradient-to-r from-green-400 to-green-500 p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-white">
                FitnessFusion
              </CardTitle>
              <CardDescription className="text-center text-green-100">
                Elevate Your Fitness Journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Tabs
                defaultValue="login"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
                  <TabsTrigger
                    value="login"
                    className={`text-base sm:text-lg transition-all duration-300 ${
                      activeTab === "login"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className={`text-base sm:text-lg transition-all duration-300 ${
                      activeTab === "register"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="login">
                      <Form {...loginForm}>
                        <form
                          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                          className="space-y-4 sm:space-y-6"
                        >
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                    <Input
                                      {...field}
                                      className="bg-white/50 border-green-300 text-gray-900 pl-10 focus:border-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                    <Input
                                      {...field}
                                      type="password"
                                      className="bg-white/50 border-green-300 text-gray-900 pl-10 focus:border-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-red-500/80 text-white px-4 py-2 rounded-md text-sm"
                            >
                              {error}
                            </motion.div>
                          )}
                          <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            Sign in
                          </Button>
                        </form>
                      </Form>
                      <div className="mt-4 sm:mt-6">
                        <form action={doSocialLogin}>
                          <Button
                            variant="outline"
                            className="w-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 text-gray-800 border-green-600 dark:text-white"
                            type="submit"
                            name="action"
                            value="google"
                          >
                            <FaGoogle className="w-5 h-5 mr-2" />
                            Sign In With Google
                          </Button>
                        </form>
                      </div>
                    </TabsContent>
                    <TabsContent value="register">
                      <Form {...registerForm}>
                        <form
                          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                          className="space-y-4 sm:space-y-6"
                        >
                          <FormField
                            control={registerForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  Name
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                    <Input
                                      {...field}
                                      className="bg-white/50 border-green-300 text-gray-900 pl-10 focus:border-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                    <Input
                                      {...field}
                                      className="bg-white/50 border-green-300 text-gray-900 pl-10 focus:border-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                    <Input
                                      {...field}
                                      type="password"
                                      className="bg-white/50 border-green-300 text-gray-900 pl-10 focus:border-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        checkPasswordStrength(e.target.value);
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          <div className="mt-2">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${passwordStrength}%` }}
                              ></div>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">
                              Password strength: {passwordStrength}%
                            </p>
                          </div>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-red-500/80 text-white px-4 py-2 rounded-md text-sm"
                            >
                              {error}
                            </motion.div>
                          )}
                          {success && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-green-500/80 text-white px-4 py-2 rounded-md text-sm"
                            >
                              {success}
                            </motion.div>
                          )}
                          <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            Sign up
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              {/* Social Proof */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Join over 100,000 fitness enthusiasts!
                </p>
              </div>

              {/* Terms and Privacy Policy */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="underline text-green-600 hover:text-green-700"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="underline text-green-600 hover:text-green-700"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
