import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  direction?: Direction;
};

function hiddenTransform(dir: Direction) {
  if (dir === "left")  return "translateX(-36px)";
  if (dir === "right") return "translateX(36px)";
  return "translateY(32px)";
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  threshold = 0.1,
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
      { threshold, rootMargin: "0px 0px -48px 0px" }
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
              transform: visible ? "translate(0,0)" : hiddenTransform(direction),
              transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                           transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
