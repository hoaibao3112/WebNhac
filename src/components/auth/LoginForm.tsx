"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../../services/authService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validate = () => {
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Email không hợp lệ");
      return false;
    }
    return true;
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const token = await authService.login({ email, password });
      localStorage.setItem("wn_token", token || "");
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="backdrop-blur-md bg-white/8 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Đăng nhập</h2>
        {error && <div className="mb-3 text-red-400">{error}</div>}

        <label className="block text-sm md:text-base text-white/80 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-5 px-5 py-4 rounded-2xl bg-white/8 text-white placeholder:text-white/60 focus:outline-none text-lg"
          placeholder="you@example.com"
        />

        <label className="block text-sm md:text-base text-white/80 mb-2">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 px-5 py-4 rounded-2xl bg-white/8 text-white placeholder:text-white/60 focus:outline-none text-lg"
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm text-white/80">
            <input type="checkbox" className="mr-2" /> Ghi nhớ tôi
          </label>
          <a className="text-sm text-primary hover:underline">Quên mật khẩu?</a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-extrabold py-4 rounded-2xl shadow-lg text-lg"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </div>
    </form>
  );
}
