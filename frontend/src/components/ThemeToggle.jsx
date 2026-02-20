import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import styles from "./ThemeToggle.module.css";

function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    setIsAnimating(false);
    window.requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
    }, 620);

    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isDark}
      aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
      className={[
        "relative inline-flex h-10 w-[74px] items-center rounded-full p-1",
        "transition-all duration-500 ease-luxury",
        "shadow-skeuo-toggle hover:shadow-skeuo-toggle-hover",
        styles.toggle,
        isDark ? styles.dark : "",
        className,
      ].join(" ")}
    >
      <span className={`${styles.glowSweep} ${isAnimating ? styles.animateSweep : ""}`} />
      <span className={styles.knob}>
        <span className={styles.knobGlow} />
        <span className={styles.iconWrap}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`${styles.icon} ${styles.iconSun} ${isAnimating ? styles.animateIcon : ""}`}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M12 2.75v2.1M12 19.15v2.1M21.25 12h-2.1M4.85 12h-2.1M18.54 5.46l-1.48 1.48M6.94 17.06l-1.48 1.48M18.54 18.54l-1.48-1.48M6.94 6.94L5.46 5.46"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`${styles.icon} ${styles.iconMoon} ${isAnimating ? styles.animateIcon : ""}`}
            aria-hidden="true"
          >
            <path
              d="M20.5 13.6A8.8 8.8 0 1 1 10.4 3.5a7.3 7.3 0 0 0 10.1 10.1Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}

export default ThemeToggle;
