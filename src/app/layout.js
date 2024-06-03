import { AuthProvider } from "./provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import GlobalState from "./context/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-screen-4xl ">
        <GlobalState>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </GlobalState>
      </body>
    </html>
  );
}