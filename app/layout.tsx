import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOT ZOOM",
  description: "Video calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <ClerkProvider 
    
    appearance={{
      layout:{
        logoImageUrl:'/icons/yoom-logo.svg',
        socialButtonsVariant:'iconButton'
      },
        variables:{
        colorText:'#fff',
        colorPrimary:'#0e78f9',
        colorBackground:'#1c1f2e',
        colorInputBackground:'#252a41',
        colorInputText:'#fff'
      }
    }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-dark-2 antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </ClerkProvider>
    </html>
  );
}
