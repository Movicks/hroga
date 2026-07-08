import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "../redux/StoreProvider";
import AutoFetch from "../components/reusables/AutoFetch";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HROGA App",
  description: "HROGA Alumni & Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`flex flex-col ${poppins.className}`}>
        <StoreProvider>
          <AutoFetch />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
