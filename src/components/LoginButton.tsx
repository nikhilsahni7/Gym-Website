"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };
  return (
    <span
      onClick={onClick}
      className="cursor-pointer flex justify-center items-center gap-2 mt-20"
    >
      {children}
    </span>
  );
};
