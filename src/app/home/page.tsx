import Logout from "@/components/Logout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

const Home = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <div>
      <h1 className="text-3 xl font-medium flex justify-center items-center ">
        {" "}
        welcome to our website {session?.user?.name}
      </h1>
      <Image
        src={session?.user?.image || (process.env.defaultImage as string)}
        alt="User Avatar"
        width={60}
        height={60}
        className="rounded-full border-2 border-primary"
      />

      <Logout />
    </div>
  );
};

export default Home;
