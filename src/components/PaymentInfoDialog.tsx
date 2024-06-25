/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

interface Plan {
  duration: string;
  price: number;
}

interface PaymentInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

const PaymentInfoDialog: React.FC<PaymentInfoDialogProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">
            Payment Information
          </DialogTitle>
          <DialogDescription className="text-lg">
            Thank you for choosing our {plan.duration} plan.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We are currently updating our online payment system. In the
            meantime, please contact us for payment instructions and to complete
            your membership registration.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We will provide you with our UPI details or other payment options.
            Soon, you'll be able to make payments directly through our website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              className="flex items-center justify-center space-x-2 w-full sm:w-auto"
              onClick={() => (window.location.href = "tel:9999144847")}
            >
              <FaPhoneAlt />
              <span>Call Us</span>
            </Button>
            <Button
              className="flex items-center justify-center space-x-2 w-full sm:w-auto"
              onClick={() =>
                window.open("https://wa.me/919999144847", "_blank")
              }
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </Button>
            <Button
              className="flex items-center justify-center space-x-2 w-full sm:w-auto"
              onClick={() => window.open("https://wa.me/8800244926", "_blank")}
            >
              <FaWhatsapp />
              <span>WhatsApp(Nikhil Sahni)</span>
            </Button>
          </div>
        </div>
        <DialogClose asChild>
          <Button className="mt-6 w-full" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentInfoDialog;
