"use client"
import MeditationApp from "../meditation-app";
import { useEffect, useState } from "react";

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <MeditationApp /> : null;
}

