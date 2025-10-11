"use client";

import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="w-full max-w-xl p-6">
        <LoginForm />
      </div>
    </main>
  );
}
