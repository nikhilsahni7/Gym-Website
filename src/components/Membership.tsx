/* eslint-disable react/no-unescaped-entities */
"use client";
import PaymentInfoDialog from "./PaymentInfoDialog";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FaDumbbell, FaUsers, FaCalendar, FaCheckCircle } from "react-icons/fa";
import GymInfoAlert from "./GymInfo";
import MembershipInfo from "./MembershipInfo";

interface Plan {
  duration: string;
  price: number;
  features?: string[];
}

const MembershipsPage = () => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showAnnualPricing, setShowAnnualPricing] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const personalPlans: Plan[] = [
    {
      duration: "1 Month",
      price: 14999,
      features: [
        "1-on-1 sessions",
        "Customized workout plan",
        "Nutritional guidance",
      ],
    },
    {
      duration: "3 Months",
      price: 34999,
      features: [
        "All 1 Month features",
        "Progress tracking",
        "Monthly fitness assessment",
      ],
    },
    {
      duration: "12 Months",
      price: 119999,
      features: [
        "All 3 Month features",
        "Priority scheduling",
        "Complimentary supplements",
      ],
    },
  ];

  const couplePlans: Plan[] = [
    {
      duration: "1 Month",
      price: 2500,
      features: [
        "Joint workout sessions",
        "Shared nutritional plan",
        "Partner motivation tracking",
      ],
    },
    {
      duration: "3 Months",
      price: 6999,
      features: [
        "All 1 Month features",
        "Couples' fitness challenges",
        "Dual progress reports",
      ],
    },
    {
      duration: "12 Months",
      price: 19999,
      features: [
        "All 3 Month features",
        "Romantic fitness getaway",
        "Couples' massage sessions",
      ],
    },
  ];

  const individualPlans: Plan[] = [
    {
      duration: "1 Day",
      price: 100,
      features: ["Full gym access", "Locker usage", "Towel service"],
    },
    {
      duration: "1 Month",
      price: 1500,
      features: [
        "Unlimited gym access",
        "2 group classes/week",
        "Basic fitness assessment",
      ],
    },
    {
      duration: "12 Months",
      price: 10999,
      features: [
        "All 1 Month features",
        "Personal trainer consultation",
        "Access to premium classes",
      ],
    },
  ];

  const handlePayment = async (plan: Plan) => {
    if (status !== "authenticated") {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to purchase a membership.",
      });
      return;
    }

    setSelectedPlan(plan);
    setIsPaymentDialogOpen(true);

    toast({
      title: "Payment gateway will be added shortly",
      description: `payment gateway for ${plan.price}- (${plan.duration}) will be added shortly ,for now on contact us  on the numbers and address provided .`,
    });

    // Razorpay integration here once you have all credentials
  };

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
          Elevate Your Fitness Journey
        </motion.h1>
        <motion.p
          className="text-xl mb-10 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose the perfect plan to transform your body and mind.
        </motion.p>

        <div className="flex items-center justify-center mb-8">
          <Label htmlFor="annual-pricing" className="mr-2">
            Monthly
          </Label>
          <Switch
            id="annual-pricing"
            checked={showAnnualPricing}
            onCheckedChange={setShowAnnualPricing}
          />
          <Label htmlFor="annual-pricing" className="ml-2">
            Annual (Save 20%)
          </Label>
        </div>

        <Tabs
          defaultValue="personal"
          className="w-full max-w-4xl mx-auto mb-12"
        >
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm md:text-base">
            <TabsTrigger value="personal" className="px-1 py-2 md:px-2 md:py-3">
              <span className="hidden sm:inline">Personal Training</span>
              <span className="sm:hidden">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="couple" className="px-1 py-2 md:px-2 md:py-3">
              <span className="hidden sm:inline">Couple Packages</span>
              <span className="sm:hidden">Couple</span>
            </TabsTrigger>
            <TabsTrigger
              value="individual"
              className="px-1 py-2 md:px-2 md:py-3"
            >
              <span className="hidden sm:inline">Individual Memberships</span>
              <span className="sm:hidden">Individual</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {personalPlans.map((plan, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{plan.duration}</CardTitle>
                        <FaDumbbell className="text-3xl text-blue-500" />
                      </div>
                      <CardDescription>
                        Personal Training Package
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-3xl font-bold mb-4">
                          ₹
                          {showAnnualPricing
                            ? Math.round(plan.price * 0.8).toLocaleString()
                            : plan.price.toLocaleString()}
                          <span className="text-sm font-normal">
                            /{showAnnualPricing ? "year" : "month"}
                          </span>
                        </p>
                        <ul className="space-y-2">
                          {plan.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <FaCheckCircle className="text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        onClick={() => handlePayment(plan)}
                        className="mt-4"
                      >
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="couple">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {couplePlans.map((plan, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{plan.duration}</CardTitle>
                        <FaUsers className="text-3xl text-pink-500" />
                      </div>
                      <CardDescription>Couple Training Package</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-3xl font-bold mb-4">
                          ₹
                          {showAnnualPricing
                            ? Math.round(plan.price * 0.8).toLocaleString()
                            : plan.price.toLocaleString()}
                          <span className="text-sm font-normal">
                            /{showAnnualPricing ? "year" : "month"}
                          </span>
                        </p>
                        <ul className="space-y-2">
                          {plan.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <FaCheckCircle className="text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        onClick={() => handlePayment(plan)}
                        className="mt-4"
                      >
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="individual">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {individualPlans.map((plan, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{plan.duration}</CardTitle>
                        <FaCalendar className="text-3xl text-purple-500" />
                      </div>
                      <CardDescription>Individual Membership</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-3xl font-bold mb-4">
                          ₹
                          {showAnnualPricing
                            ? Math.round(plan.price * 0.8).toLocaleString()
                            : plan.price.toLocaleString()}
                          <span className="text-sm font-normal">
                            /{plan.duration.toLowerCase()}
                          </span>
                        </p>
                        <ul className="space-y-2">
                          {plan.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <FaCheckCircle className="text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        onClick={() => handlePayment(plan)}
                        className="mt-4"
                      >
                        {/* */}
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-4xl mx-auto"
        >
          <AccordionItem value="faq-1">
            <AccordionTrigger>
              What's included in the personal training packages?
            </AccordionTrigger>
            <AccordionContent>
              Our personal training packages include one-on-one sessions with a
              certified trainer, customized workout plans, nutritional guidance,
              and regular progress assessments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Can I freeze my membership?</AccordionTrigger>
            <AccordionContent>
              Yes, you can freeze your membership for up to 3 months per year.
              Please contact our customer service for more details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>
              What's your cancellation policy?
            </AccordionTrigger>
            <AccordionContent>
              We offer a 7-day cancellation policy for all new memberships.
              After this period, cancellations are subject to our terms and
              conditions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">Why Choose BYNC GYM?</h2>
          <p className="mb-6">
            Join our community of fitness enthusiasts and achieve your health
            goals with our expert-guided programs. We offer state-of-the-art
            equipment, experienced trainers, and a motivating atmosphere to help
            you succeed.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Important Information
            </h3>
            <p>
              <strong>Location:</strong> Noida
            </p>
            <p>
              <strong>Address:</strong> C-43 Basement, Main Road, Sector 20,
              Noida, Uttar Pradesh 201301
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <a
                href="tel:9999144847"
                className="text-blue-500 hover:underline"
              >
                9999144847
              </a>
            </p>
            <p>
              <strong>Timings:</strong> Morning 5:30 AM to 11:30 AM, Evening
              4:30 PM to 10:00 PM
            </p>
            <p className="mt-4">
              For more details or to schedule a visit, please contact us at the
              number above.
            </p>
          </div>
        </motion.div>
        <PaymentInfoDialog
          isOpen={isPaymentDialogOpen}
          onClose={() => setIsPaymentDialogOpen(false)}
          plan={selectedPlan}
        />
        <GymInfoAlert />
      </div>

      <MembershipInfo />
    </div>
  );
};

export default MembershipsPage;
