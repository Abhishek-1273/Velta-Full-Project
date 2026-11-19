import React, { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import styles from "./social-card.module.css";

export interface SocialLink {
  href: string;
  icon: React.ReactNode;
  className: string;
  delay?: string;
  label: string;
}

export interface SocialCardProps {
  title?: string;
  subtitle?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const DEFAULT_LINKS: SocialLink[] = [
  {
    href: "https://www.instagram.com/veltaz_aii?gwpx=MWF1ZzRjcTNiZDhjNw==",
    icon: <FaInstagram className={styles.socialSvg} aria-hidden="true" />,
    className: styles.box1,
    delay: "0s",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/veltaz/home",
    icon: <FaLinkedinIn className={styles.socialSvg} aria-hidden="true" />,
    className: styles.box2,
    delay: "0.1s",
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/share/1LLPfH59gu/",
    icon: <FaFacebookF className={styles.socialSvg} aria-hidden="true" />,
    className: styles.box3,
    delay: "0.2s",
    label: "Facebook",
  },
  {
    href: "https://x.com/Veltaz_ai",
    icon: <FaXTwitter className={styles.socialSvg} aria-hidden="true" />,
    className: styles.box4,
    delay: "0.3s",
    label: "X (Twitter)",
  },
];

export const SocialCard = ({
  subtitle = "Socials",
  socialLinks = DEFAULT_LINKS,
  className = "",
}: SocialCardProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Close when tapping outside on mobile touch devices
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isMobileOpen]);

  // Mobile-only tap open: opens on tap, but clicking inside empty space keeps it open!
  const handleCardClick = () => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (max-width: 768px)").matches;
    if (isMobile && !isMobileOpen) {
      setIsMobileOpen(true);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.socialCard} ${isMobileOpen ? styles.isMobileOpen : ""} ${className}`}
      onClick={handleCardClick}
      role="region"
      aria-label="VeltaZ Social Networks"
    >
      {/* Authentic Instagram App Brand Gradient Definition */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.background} aria-hidden="true" />

      {/* Floating Center Badge with Official VeltaZ Gold Emblem & SOCIALS label */}
      <div className={styles.logo}>
        <div className={styles.logoOrb}>
          <img src="/logo/logo-gold.png" alt="VeltaZ" className={styles.logoOrbImg} />
        </div>
        <span className={styles.logoSubtitle}>{subtitle}</span>
      </div>

      {/* 4 Shutter Fan Boxes */}
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit VeltaZ on ${link.label}`}
          className={`${styles.box} ${link.className}`}
          style={{ transitionDelay: link.delay }}
          onClick={(e) => {
            const isMobile =
              typeof window !== "undefined" &&
              window.matchMedia("(hover: none), (max-width: 768px)").matches;
            if (isMobile) {
              if (!isMobileOpen) {
                // First tap expands the fan smoothly on mobile
                e.preventDefault();
                e.stopPropagation();
                setIsMobileOpen(true);
              } else {
                // When open, tapping the link directly navigates
                e.stopPropagation();
              }
            }
          }}
        >
          <span className={styles.icon}>{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialCard;
