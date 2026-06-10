import { useEffect, useRef, useState } from "react";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  curtain?: string; // CSS color for the reveal curtain
};

/**
 * Wraps an image with a brand-colored curtain that slides upward when
 * the image scrolls into view — a hallmark of high-end agency and luxury
 * real estate sites.
 */
export function ImageReveal({
  src,
  alt,
  className = "",
  delay = 0,
  curtain = "var(--navy)",
}: ImageRevealProps) {
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ willChange: "transform" }}>
      <img
        src={src}
        alt={alt}
        className={className}
      />
      {/* The curtain — slides upward to reveal the image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: curtain,
          transform: mounted && visible ? "translateY(-101%)" : "translateY(0%)",
          transition: `transform 1.3s cubic-bezier(0.77, 0, 0.18, 1) ${delay}ms`,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
