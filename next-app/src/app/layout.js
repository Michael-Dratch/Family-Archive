import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Family Archive",
  description: "Curate and share media collections in a family archive.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed z-10 top-0 w-screen">
          <Navbar></Navbar>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
