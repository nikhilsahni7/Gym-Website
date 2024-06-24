import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import { Providers } from "./providers";
import { ThemeProvider } from "./theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "500",
});

export const metadata = {
  title: "Gym-fitness-website",
  description:
    "A website for gym, fitness, and diet that focuses on health of people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
