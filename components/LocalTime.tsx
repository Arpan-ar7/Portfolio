"use client";

import { useEffect, useState } from "react";

// A live clock showing Arpan's local time in India (a little "mission control" detail).
export default function LocalTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time} IST</span>;
}
