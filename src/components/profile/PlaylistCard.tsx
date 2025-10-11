"use client";

import React from "react";

type Props = {
  title: string;
  cta?: string;
};

export default function PlaylistCard({ title, cta = "Nghe bài hát" }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">Thưởng thức những ca khúc phù hợp nhất với bạn</p>
      <button className="px-4 py-2 bg-primary text-white rounded-full">{cta}</button>
    </div>
  );
}
