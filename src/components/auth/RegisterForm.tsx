"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../../services/authService";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validate = () => {
    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự");
      return false;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp");
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
      await authService.register({ name, email, password });
      // after register, redirect to login
      router.push("/auth?tab=login");
    } catch (err: any) {
      setError(err?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="backdrop-blur-md bg-white/8 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Đăng ký</h2>
        {error && <div className="mb-3 text-red-400">{error}</div>}

        <label className="block text-sm md:text-base text-white/80 mb-2">Họ và tên</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-5 px-5 py-4 rounded-2xl bg-white/8 text-white placeholder:text-white/60 focus:outline-none text-lg"
          placeholder="Nguyễn Văn A"
        />

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

        <label className="block text-sm md:text-base text-white/80 mb-2">Xác nhận mật khẩu</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full mb-6 px-5 py-4 rounded-2xl bg-white/8 text-white placeholder:text-white/60 focus:outline-none text-lg"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-extrabold py-4 rounded-2xl shadow-lg text-lg"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </div>
    </form>
  );
}
