import { useEffect, useState } from "react";

type UseCountdownProps = {
  seconds: number;
  disabled?: boolean;
  onStart?: (initValue: number) => void;
  onEnd?: (initValue: number) => void;
}

export function  useCountdown ({
  seconds,
  disabled,
  onStart,
  onEnd
}: UseCountdownProps)  {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (disabled) return;
    onStart?.(seconds);
  }, [disabled])

  useEffect(() => {
    if (disabled) return;

    if (count === 0) {
      onEnd?.(seconds)
      return;
    }

    const id = setInterval(() => setCount((prev) => prev - 1), 1000);

    return () => clearInterval(id);
  }, [count, disabled]);

  return [count, setCount] as const;
}
