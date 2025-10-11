"use client";

import { useState } from "react";
import LoginForm from "../../../src/components/auth/LoginForm";
import RegisterForm from "../../../src/components/auth/RegisterForm";
import { Github, Facebook, Mail } from "lucide-react";
export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-4">
      <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Background overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative z-10">
          {/* Left panel: Auth card */}
          <div className="flex flex-col justify-center p-10">
            {/* Header + tabs */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-white">
                <h1 className="text-4xl font-bold tracking-tight">
                  {tab === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  {tab === "login"
                    ? "Please log in to continue"
                    : "Join us today by creating an account"}
                </p>
              </div>
              <div className="flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setTab("login")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    tab === "login"
                      ? "bg-white text-black shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    tab === "register"
                      ? "bg-white text-black shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Form section */}
            <div className="transition-all duration-500">
              {tab === "login" ? <LoginForm /> : <RegisterForm />}
            </div>

            {/* Divider */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-white/60 text-sm">or continue with</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

           {/* Social buttons */}
<div className="flex justify-center gap-4 mt-6">
  <button className="p-3 bg-white/10 hover:bg-white/20 transition rounded-full border border-white/20">
    <Mail className="w-5 h-5 text-white" />
  </button>
  <button className="p-3 bg-white/10 hover:bg-white/20 transition rounded-full border border-white/20">
    <Github className="w-5 h-5 text-white" />
  </button>
  <button className="p-3 bg-white/10 hover:bg-white/20 transition rounded-full border border-white/20">
    <Facebook className="w-5 h-5 text-white" />
  </button>
</div>
          </div>

          {/* Right panel: Showcase image / gradient */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-purple-600/40 to-pink-500/30 backdrop-blur-lg">
            <div className="text-center px-6 text-white">
              <h2 className="text-3xl font-semibold mb-2">✨ Modern Auth UI</h2>
              <p className="text-white/70 text-sm">
                Chào bạn đã đến với WebNhạc - Nơi trải nghiệm âm nhạc tuyệt vời!
              </p>
              <div className="mt-6 text-sm text-white/60">
                Tip: Switch between Login & Register tabs above!
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
