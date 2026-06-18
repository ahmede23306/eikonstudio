import { useEffect, useRef, useState } from "react";
import CustomGForm from "@customgform-lib/react-customgform";
import Vector from "@/imports/Vector/index";
import { Instagram, Linkedin, Mail } from "lucide-react";

function Logo({ className }: { className?: string }) {
  return (
    <div className={className} style={{ aspectRatio: "1394 / 650" }}>
      <Vector />
    </div>
  );
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const isVisible = useRef(false);

  useEffect(() => {
    // Don't run on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (!isVisible.current) {
        isVisible.current = true;
        setVisible(true);
      }
    };

    const onLeave = () => {
      isVisible.current = false;
      setVisible(false);
    };

    const onEnter = () => {
      isVisible.current = true;
      setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const isInteractive = (el: EventTarget | null) =>
      !!(el as HTMLElement)?.closest("a, button, input, textarea, select, label, [role='button']");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovered(true);
    };

    const onOut = (e: MouseEvent) => {
      // Only clear hovered if we're leaving the interactive element entirely
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        setHovered(false);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.2;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const ringSize = hovered ? 34 : clicking ? 14 : 24;
  const dotSize = hovered ? 4 : clicking ? 7 : 3;
  const ringBg = hovered ? "rgba(255,243,1,0.15)" : "transparent";
  const ringBorder = hovered ? "2px solid #fff301" : "1.5px solid rgba(248,248,243,0.6)";
  const dotBg = hovered ? "#fff301" : "#f8f8f3";

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          background: ringBg,
          border: ringBorder,
          opacity: visible ? 1 : 0,
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          background: dotBg,
          opacity: visible ? 1 : 0,
          pointerEvents: "none",
          zIndex: 10000,
          transition: "width 0.15s ease, height 0.15s ease, background 0.2s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}

export default function App() {
  return (
    // overflow-x-hidden prevents form's internal min-width from causing horizontal scroll on mobile
    <div className="min-h-screen flex flex-col bg-[#010200] text-[#f8f8f3] overflow-x-hidden [@media(pointer:fine)]:cursor-none">
      <Cursor />

      {/* Header */}
      <header className="w-full px-5 sm:px-8 py-4 flex items-center justify-between border-b border-[#191917]">
        <a href="/" aria-label="Eikon Studio home" className="h-8 sm:h-10 shrink-0 block">
          <Logo className="h-full" />
        </a>
        <a
          href="https://linktr.ee/ahmedeid23306"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f8f8f3] text-xs sm:text-sm font-medium tracking-wide hover:text-[#fff301] transition-colors duration-200 flex items-center gap-1.5 group shrink-0 ml-4"
        >
          <span>Stay Connected</span>
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 14 14"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h10M7 2l5 5-5 5" />
          </svg>
        </a>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center py-10 sm:py-14 px-4 sm:px-6">
        <div className="w-full max-w-[600px]">
          <CustomGForm formId="cmon4stok009iwnq9bvwfukor" />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#191917] px-5 sm:px-8 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <a href="/" aria-label="Eikon Studio home" className="h-5 sm:h-6 shrink-0 block">
            <Logo className="h-full" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <a
              href="https://www.instagram.com/eikonstudio26"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#f8f8f3]/50 hover:text-[#fff301] transition-colors duration-200"
            >
              <Instagram size={17} strokeWidth={1.6} />
            </a>
            <a
              href="https://www.linkedin.com/company/eikonstudio26/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#f8f8f3]/50 hover:text-[#fff301] transition-colors duration-200"
            >
              <Linkedin size={17} strokeWidth={1.6} />
            </a>
            <span className="flex items-center gap-1.5 text-[#f8f8f3]/50 text-[11px] sm:text-xs tracking-wide">
              <Mail size={15} strokeWidth={1.6} className="shrink-0" />
              eikonstudio26@gmail.com
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
