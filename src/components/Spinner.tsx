import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute border-4 border-solid border-blue-500 border-t-transparent rounded-full w-full h-full animate-spin"></div>
        <div className="absolute border-4 border-solid border-green-500 border-t-transparent rounded-full w-3/4 h-3/4 top-2 left-2 animate-spin-reverse"></div>
        <div className="absolute border-4 border-solid border-red-500 border-t-transparent rounded-full w-1/2 h-1/2 top-4 left-4 animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
