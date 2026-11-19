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
  title,
  subtitle = "Socials",
  socialLinks = DEFAULT_LINKS,
  className = "",
}: SocialCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Close when tapping outside on mobile or desktop
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleCardClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.socialCard} ${isOpen ? styles.isOpen : ""} ${className}`}
      onClick={handleCardClick}
      role="region"
      aria-label="VeltaZ Social Networks"
    >
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
            if (!isOpen) {
              // On touch / first click, expand the card smoothly!
              e.preventDefault();
              setIsOpen(true);
            } else {
              // When open, clicking the icon navigates directly to the social link
              e.stopPropagation();
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
