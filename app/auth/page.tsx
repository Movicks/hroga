"use client"

import AuthLayout from "./layout";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  
  return (
      <div className="flex flex-col items-center justify-center gap-8 py-12 px-4">
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/auth/login')}
            className="px-12 py-2 bg-[#6393f6] text-white rounded-full font-semibold text-lg hover:bg-[#6393f6]/80 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="px-12 py-2 bg-white text-[#6393f6] border-2 border-[#6393f6] rounded-full font-semibold text-lg hover:bg-[#6393f6] hover:text-white transition"
          >
            Signup
          </button>
        </div>
      </div>
  )
}