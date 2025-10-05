"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const banners = [
  {
    id: 1,
    title: "Top Hits 2024",
    description: "Những bản hit đỉnh cao năm 2024",
    image: "/images/banner1.jpg",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 2,
    title: "V-Pop Rising",
    description: "Ngôi sao đang lên của V-Pop",
    image: "/images/banner2.jpg",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 3,
    title: "Chill Vibes",
    description: "Thư giãn cùng những giai điệu nhẹ nhàng",
    image: "/images/banner3.jpg",
    color: "from-green-600 to-teal-600",
  },
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 relative h-80 rounded-xl overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${banner.color} flex items-center justify-center`}
          >
            <div className="text-center px-8">
              <h2 className="text-5xl font-bold text-white mb-4">
                {banner.title}
              </h2>
              <p className="text-xl text-white/90">{banner.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
