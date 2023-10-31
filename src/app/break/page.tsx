"use client";
import "./page.scss";

import { videos } from "@/data/videoData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Break() {
  const searchParams = useSearchParams();
  const initialTime = Number(searchParams.get("time")) * 60;
  const position = searchParams.get("position");
  const video = searchParams.get("video") || "naan";
  const videoUrl = videos[video as keyof typeof videos].videoUrl;

  const [time, setTime] = useState(initialTime);
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTime((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <main className={`countdown ${position}`}>
      <video autoPlay loop muted src={videoUrl}></video>
      {time && (
        <h1 style={{ width: "4.1ch" }}>
          {minutes !== 0 && <span>{minutes}:</span>}
          <span>
            {seconds < 10 ? "0" : ""}
            {seconds}
          </span>
        </h1>
      )}
      {!time && <h1>Let's start!</h1>}
    </main>
  );
}
