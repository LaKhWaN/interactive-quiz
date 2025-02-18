import React, { useEffect, useState } from "react";
import { Timer } from "lucide-react";

export function QuizTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Timer className="w-5 h-5" />
      <span>{timeLeft}s</span>
    </div>
  );
}
