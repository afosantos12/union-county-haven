import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  direction?: Direction;
};

// Expo-out easing — starts fast, decelerates smoothly to rest. Feels deliberate and premium.
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 1250; // ms

function hiddenTransform(dir: Direction) {
  if (dir === "left")  return "translateX(-70px) scale(0.96)";
  if (dir === "right") return "translateX(70px) scale(0.96)";
  return "translateY(80px) scale(0.96)";
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  threshold = 0.08,
  direction = "up",
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        mounted
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1) translateX(0)" : hiddenTransform(direction),
              transition: `opacity ${DURATION}ms ${EASING} ${delay}ms,
                           transform ${DURATION}ms ${EASING} ${delay}ms`,
              willChange: "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
