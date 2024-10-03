import { Progress } from "@components/ui/progress";
import { useEffect } from "react";

interface PhoneProgressProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export function PhoneProgress({ progress, setProgress }: PhoneProgressProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.2;
      });
    }, 1);

    return () => clearInterval(interval);
  }, [setProgress]);

  return <Progress value={progress} className="w-[60%]" />;
}
