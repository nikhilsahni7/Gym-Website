// GymInfoAlert.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaDumbbell, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const GymInfoAlert = () => {
  return (
    <Alert className=" bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-80 border-none text-white shadow-lg hover:shadow-xl transition-all duration-300 mt-8 rounded-xl overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center space-x-2">
          <FaDumbbell className="h-8 w-8 text-yellow-300 animate-pulse" />
          <AlertTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
            BYNC GYM
          </AlertTitle>
        </div>
        <AlertDescription className="mt-4 space-y-3">
          <div className="flex items-center space-x-3 bg-white bg-opacity-10 p-2 rounded-lg">
            <FaPhone className="h-6 w-6 text-green-300" />
            <a href="tel:9999144847" className="text-xl hover:underline">
              9999144847
            </a>
          </div>
          <div className="flex items-start space-x-3 bg-white bg-opacity-10 p-2 rounded-lg">
            <FaMapMarkerAlt className="h-6 w-6 text-red-300 mt-1" />
            <p className="text-lg">
              C-43 Basement, Main Road, Sector 20, Noida, Uttar Pradesh 201301
            </p>
          </div>
        </AlertDescription>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 opacity-50 blur-xl"></div>
    </Alert>
  );
};

export default GymInfoAlert;
