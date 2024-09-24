import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import AuthStatus from "@/components/authstatus";
import { AuthProvider } from "@/contexts/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Family Archive",
  description: "Curate and share media collections in a family archive.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="fixed z-10 top-0 w-screen">
            <Navbar></Navbar>
          </div>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
