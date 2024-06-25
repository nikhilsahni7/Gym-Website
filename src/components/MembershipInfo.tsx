import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "./ui/button";

const MembershipInfo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4">
          <FaInfoCircle className="mr-2" />
          Membership Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Membership Information</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Timings: Morning 5:30 AM to 11:30 AM, Evening 4:30 PM to 10:00 PM
          </p>
          <p>For more information, call: 9999144847 (BYNC GYM)</p>
          <p>
            Address: C-43 Basement, Main Road, Sector 20, Noida, Uttar Pradesh
            201301
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipInfo;
