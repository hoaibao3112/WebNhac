"use client";

import { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("Chào bạn");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Chào buổi sáng");
    } else if (hour < 18) {
      setGreeting("Chào buổi chiều");
    } else {
      setGreeting("Chào buổi tối");
    }
  }, []);

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white">{greeting}</h1>
    </div>
  );
};

export default Greeting;
