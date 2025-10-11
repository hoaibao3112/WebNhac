"use client";

import React from "react";

type Props = {
  name: string;
  id?: string | number;
  realName?: string;
  birthday?: string;
  gender?: string;
  views?: number;
  listens?: number;
  // optional: thông báo phía dưới (màu xanh lá trong ảnh)
  noticeText?: string;
};

function getInitial(n?: string) {
  if (!n) return "U";
  const t = n.trim();
  return t ? t[0].toUpperCase() : "U";
}

export default function ProfileHeader({
  name,
  id,
  realName,
  birthday,
  gender,
  views = 0,
  listens = 0,
  noticeText = "Hiện chưa có nào.",
}: Props) {
  return (
    <section className="w-full">
      {/* ====== Header ====== */}
      <div className="relative overflow-hidden rounded-b-2xl">
        {/* Background gradient + concentric rings */}
        <div className="h-60 md:h-72 lg:h-80 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.08),transparent),radial-gradient(900px_500px_at_10%_120%,rgba(255,255,255,0.05),transparent)] bg-[#6f2a39]" />
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0,transparent_35%),radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.04)_0,transparent_28%),radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.03)_0,transparent_30%)]" />

        {/* Decorative bubbles like BXH VN/USUK/HÀN */}
        <Bubble className="hidden md:flex top-[18%] left-[62%] bg-orange-500" label="BXH HÀN" />
        <Bubble className="hidden md:flex top-[42%] left-[58%] bg-sky-500 scale-90" label="BXH USUK" />
        <Bubble className="hidden md:flex top-[36%] right-[12%] bg-emerald-500 scale-110" label="BXH VN" />
        <Bubble className="hidden lg:flex top-[10%] right-[18%] bg-indigo-600 scale-75" label="" avatar />

        {/* Content row */}
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto h-full px-6 md:px-8 flex items-end">
            <div className="w-full pb-5 md:pb-6">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-rose-500/90 ring-4 ring-white/25 shadow-xl flex items-center justify-center text-white font-bold text-3xl md:text-4xl select-none">
                    {getInitial(name)}
                  </div>
                </div>

                {/* Info */}
                <div className="text-white flex-1 min-w-0">
                  <h1 className="text-2xl md:text-4xl font-semibold leading-tight truncate">{name}</h1>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm md:text-base text-white/90">
                    {id && <div><span className="text-white/70">ID:</span> {id}</div>}
                    {realName && <div><span className="text-white/70">Tên thật:</span> {realName}</div>}
                    {birthday && <div><span className="text-white/70">Sinh nhật:</span> {birthday}</div>}
                    {gender && <div><span className="text-white/70">Giới tính:</span> {gender}</div>}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <button className="px-4 py-2 rounded-full bg-white text-black font-medium shadow-md hover:shadow-lg hover:bg-white/90 transition">
                      + Kết bạn
                    </button>

                    <div className="flex items-center divide-x divide-white/20 text-white/80">
                      <Stat label="Lượt xem Profile" value={views} />
                      <Stat label="Lượt nghe Playlist" value={listens} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs (Playlist / Video / Tủi Upload / Bạn Bè) */}
              <nav className="mt-6">
                <ul className="flex flex-wrap items-center gap-2 text-sm">
                  <li className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 transition">
                    <span className="inline-block w-4 h-4 rounded-full bg-white/80" />
                    <span>Playlist</span>
                  </li>
                  <Tab label="Video" />
                  <Tab label="Tui Upload" />
                  <Tab label="Bạn Bè" />
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Content under header ====== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-6 grid grid-cols-12 gap-6">
        {/* Left notice (green banner) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-lg bg-emerald-500 text-white shadow-md">
            <div className="px-5 py-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20">✔</span>
              <p className="font-medium">
                <span className="text-white/90">nct.gg.</span>
                <span className="opacity-90"> {noticeText}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation card (blue) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-700 via-sky-600 to-indigo-700 text-white p-6 shadow-xl">
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <h3 className="text-xl font-bold">GỢI Ý DÀNH CHO BẠN</h3>
            <p className="text-white/80 text-sm mt-1">
              Thưởng thức những ca khúc phù hợp nhất với bạn
            </p>
            <button className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-sky-900 font-medium hover:shadow-lg transition">
              <span>►</span> Nghe bài hát
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small sub components ---------- */
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4">
      <div className="text-center">
        <div className="text-xl md:text-2xl font-semibold">{value}</div>
        <div className="text-xs md:text-[13px] text-white/70">{label}</div>
      </div>
    </div>
  );
}

function Tab({ label }: { label: string }) {
  return (
    <li className="inline-flex items-center px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/15 backdrop-blur transition">
      {label}
    </li>
  );
}

function Bubble({
  className = "",
  label,
  avatar = false,
}: {
  className?: string;
  label?: string;
  avatar?: boolean;
}) {
  return (
    <div
      className={[
        "absolute flex items-center justify-center rounded-full text-white shadow-2xl",
        avatar ? "w-24 h-24" : "w-24 h-24",
        className,
      ].join(" ")}
      style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,.25))" }}
    >
      {avatar ? (
        <div className="w-20 h-20 rounded-full bg-[#ffd34d] flex items-center justify-center text-sky-900 font-extrabold text-2xl">
          ♫
        </div>
      ) : (
        <span className="text-[13px] font-semibold select-none">{label}</span>
      )}
    </div>
  );
}
