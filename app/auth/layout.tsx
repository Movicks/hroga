import { ReactNode } from "react";
import AuthBanner from "@/components/reusables/AuthBanner";
import HomeTopbar from "@/components/topbars/HomeTopbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#e6e0d8]">
      <div className="w-full mb-15 md:mb-20 pt-8">
        <HomeTopbar/>
      </div>
      <div className="w-full px-4 md:px-8 space-y-4 md:space-y-8 md:mt-8">
        <AuthBanner />
        <section className="flex flex-col items-center max-w-5xl mx-auto w-full mb-8">
          {children}
        </section>
      </div>
    </div>
  )
}