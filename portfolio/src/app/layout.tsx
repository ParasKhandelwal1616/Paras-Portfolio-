import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter} from "next/font/google";
import "./globals.css";

const Interfont = Inter({
  variable : "--Text-Inter",
  subsets :["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paras Portfolio",
  description: "Personal portfolio to showcase my skill and all the projects",
  icons: {
    icon: '/online-resume.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Interfont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
