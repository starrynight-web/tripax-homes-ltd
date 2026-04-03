import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tripax Homes Ltd. | Premium Builders in Dhaka",
  description: "Specializing in land development partnerships and premium flat resales in Dhaka, Bangladesh.",
  keywords: ["Tripax Homes", "Real Estate Dhaka", "Land Development", "Apartments Dhaka", "Construction Bangladesh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-jakarta bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
