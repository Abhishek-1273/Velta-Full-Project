"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineBolt,
  HiOutlineUserGroup,
  HiOutlineArrowPath,
  HiOutlineCalendarDays,
  HiOutlineLockClosed,
  HiOutlineFolder,
  HiOutlineDevicePhoneMobile,
  HiOutlineBuildingOffice2,
  HiOutlineCalculator,
  HiOutlineSparkles,
} from "react-icons/hi2";
import styles from "./stacking-card.module.css";

export interface StackingFeature {
  title?: string;
  desc?: string;
  text?: string;
  icon?: string;
}

export interface StackingProject {
  title: string;
  titleAccent?: string;
  themeKey?: string;
  kicker?: string;
  badge?: string;
  description: string;
  features?: (string | StackingFeature)[];
  link: string;
  url?: string;
  cta?: string;
}

export interface StackingCardProps {
  projects: StackingProject[];
  className?: string;
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
}

const themeClassMap: Record<string, string> = {
  whatsflow: styles.cardWhatsflow,
  docket14: styles.cardDocket14,
  kin: styles.cardKin,
};

function getFeatureIcon(iconName?: string) {
  switch (iconName) {
    case "chat":
      return <HiOutlineChatBubbleLeftRight />;
    case "bolt":
      return <HiOutlineBolt />;
    case "team":
      return <HiOutlineUserGroup />;
    case "sync":
      return <HiOutlineArrowPath />;
    case "calendar":
      return <HiOutlineCalendarDays />;
    case "lock":
      return <HiOutlineLockClosed />;
    case "folder":
      return <HiOutlineFolder />;
    case "device":
      return <HiOutlineDevicePhoneMobile />;
    case "building":
      return <HiOutlineBuildingOffice2 />;
    case "calculator":
      return <HiOutlineCalculator />;
    case "sparkles":
      return <HiOutlineSparkles />;
    default:
      return <HiOutlineSparkles />;
  }
}

function renderStyledTitle(title: string, accent?: string) {
  if (accent && title.includes(accent)) {
    const parts = title.split(accent);
    return (
      <>
        {parts[0]}
        <span className={styles.titleAccent}>{accent}</span>
        {parts.slice(1).join(accent)}
      </>
    );
  }

  // Automatic split for designated showcase brands
  if (title === "WhatsFlow") {
    return (
      <>
        Whats<span className={styles.titleAccent}>Flow</span>
      </>
    );
  }
  if (title === "Docket14") {
    return (
      <>
        Docket<span className={styles.titleAccent}>14</span>
      </>
    );
  }
  if (title === "KIN Property") {
    return (
      <>
        KIN <span className={styles.titleAccent}>Property</span>
      </>
    );
  }

  return title;
}

/**
 * 3D Interactive Tilt Card Image with Dynamic Specular Glare & Depth Reflection
 */
function Card3DImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({
    rotX: 0,
    rotY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt calculations on mobile touch devices
    if (typeof window !== "undefined" && window.innerWidth <= 860) return;
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    setTilt({
      rotX: -py * 8,
      rotY: px * 9,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.35,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false,
    });
  };

  return (
    <div
      ref={boxRef}
      className={styles.tiltOuter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.tiltInner}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${
            tilt.isHovered ? 1.02 : 1
          }, ${tilt.isHovered ? 1.02 : 1}, 1)`,
          transition: tilt.isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className={styles.imgBezel}>
          <img
            src={src}
            alt={alt}
            className={styles.cardImg}
            loading={priority ? "eager" : "lazy"}
          />

          {/* Dynamic Specular Light Glare */}
          <div
            className={styles.glareLayer}
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255) 65%)`,
              opacity: tilt.glareOpacity,
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export default function StackingCard({
  projects,
  className = "",
  eyebrow,
  heading,
  subtitle = "Production-ready platforms, automation engines, and custom applications engineered by VeltaZ.",
}: StackingCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  const n = projects.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];

    if (!container || cards.length === 0) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP ONLY (> 860px): Luxury Pinned Stacking Scroll ──
    mm.add("(min-width: 861px)", () => {
      // Cards start anchored with transform-origin at center
      // Inactive upcoming cards start with autoAlpha: 0 so they NEVER peek from the bottom
      cards.forEach((card, idx) => {
        gsap.set(card, {
          yPercent: idx === 0 ? 0 : 130,
          y: 0,
          autoAlpha: idx === 0 ? 1 : 0,
          opacity: idx === 0 ? 1 : 0,
          scale: 1,
          zIndex: idx + 1,
          transformOrigin: "50% 50%",
        });
      });

      const DWELL_TIME = 0.7; // Generous reading hold for each card
      const TRANSITION_TIME = 1.0; // Smooth transition duration between cards
      const scrollDistance = (n - 1) * 1200 + 800;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial dwell buffer on Card 0: perfectly stable when entering OR scrolling back up
      tl.to({}, { duration: DWELL_TIME }, 0);
      let currentTime = DWELL_TIME;

      // 2. Sequential card landings with equal dwell on every single card
      for (let i = 1; i < n; i++) {
        const incomingCard = cards[i];
        const stepStart = currentTime;

        // Incoming card becomes 100% opaque at stepStart and slides in as a solid opaque card
        tl.fromTo(
          incomingCard,
          {
            yPercent: 130,
            autoAlpha: 1,
            opacity: 1,
            scale: 0.98,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            opacity: 1,
            scale: 1,
            duration: TRANSITION_TIME,
            ease: "power1.inOut",
          },
          stepStart
        );

        // Previous cards scale down from center (0.94, 0.88)
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              scale: Math.max(0.88, 1 - depth * 0.06),
              duration: TRANSITION_TIME,
              ease: "power1.inOut",
            },
            stepStart
          );
        }

        currentTime = stepStart + TRANSITION_TIME;

        // Equal reading dwell for this card!
        tl.to({}, { duration: DWELL_TIME }, currentTime);
        currentTime += DWELL_TIME;
      }
    });

    // ── MOBILE ONLY (<= 860px): Zero Pinning, Pure Clean Document Flow ──
    // Clear all GSAP inline transforms/opacities so CSS presents cards naturally
    mm.add("(max-width: 860px)", () => {
      cards.forEach((card) => {
        gsap.set(card, {
          clearProps: "all",
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, [n, projects]);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* STAGE CONTAINER */}
      <div className={styles.stage}>
        {(eyebrow || heading) && (
          <header className={styles.header}>
            {eyebrow && (
              <div className={styles.eyebrowWrap}>
                <span className={styles.eyebrowLine} />
                <span className={styles.eyebrow}>{eyebrow}</span>
                <span className={styles.eyebrowLine} />
              </div>
            )}
            {heading && <h2 className={styles.heading}>{heading}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
        )}

        <div className={styles.deck}>
          {projects.map((project, i) => {
            const padI = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
            const padTotal = n < 10 ? `0${n}` : `${n}`;
            const cardThemeClass =
              themeClassMap[project.themeKey || "whatsflow"] ||
              styles.cardWhatsflow;

            return (
              <article
                key={`${project.title}-${i}`}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={`${styles.card} ${cardThemeClass}`}
              >
                {/* Header: Title on Left, Category Pill, Counter on Right */}
                <div className={styles.cardHead}>
                  <div className={styles.cardTitleGroup}>
                    <h3 className={styles.cardTitle}>
                      {renderStyledTitle(project.title, project.titleAccent)}
                    </h3>
                    {project.kicker && (
                      <span className={styles.cardCategory}>
                        {project.kicker}
                      </span>
                    )}
                  </div>
                  <span className={styles.cardCounter}>
                    {padI} / {padTotal}
                  </span>
                </div>

                {/* Body: 2-Column Responsive Bento */}
                <div className={styles.cardBody}>
                  <div className={styles.cardLeft}>
                    {/* Clear 1-Line Description */}
                    <p className={styles.cardDesc}>{project.description}</p>

                    {/* Attractive 2x2 Bento Micro-Cards for Key Features */}
                    {project.features && project.features.length > 0 && (
                      <div className={styles.featuresSection}>
                        <span className={styles.featuresHeading}>
                          KEY CAPABILITIES
                        </span>
                        <div className={styles.featuresGrid}>
                          {project.features.map((item, fIdx) => {
                            const isObj = typeof item === "object" && item !== null;
                            const featureObj = isObj ? (item as StackingFeature) : null;
                            const title = featureObj
                              ? featureObj.title || featureObj.text || ""
                              : (item as string);
                            const desc = featureObj?.desc;
                            const icon = featureObj?.icon;

                            return (
                              <div key={fIdx} className={styles.featureCard}>
                                <span className={styles.featureIconBadge}>
                                  {getFeatureIcon(icon)}
                                </span>
                                <div className={styles.featureContent}>
                                  <span className={styles.featureTitle}>
                                    {title}
                                  </span>
                                  {desc && (
                                    <span className={styles.featureDesc}>
                                      {desc}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Row */}
                    <div className={styles.cardActionRow}>
                      {(project.url || project.cta) &&
                        (project.url?.startsWith("/") ? (
                          <Link to={project.url || "/"} className={styles.cardBtn}>
                            {project.cta || "Explore Project →"}
                          </Link>
                        ) : (
                          <a
                            href={project.url || "#"}
                            className={styles.cardBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.cta || "Explore Project →"}
                          </a>
                        ))}
                      <span className={styles.liveStatusBadge}>
                        <span className={styles.statusDot} />
                        {project.badge || "LIVE SYSTEM"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardRight}>
                    <Card3DImage
                      src={project.link}
                      alt={project.title}
                      priority={i === 0}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
