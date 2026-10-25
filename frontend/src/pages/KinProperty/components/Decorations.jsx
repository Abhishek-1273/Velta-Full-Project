import React from 'react'

const COLOR = '#475569'

export function TopArrowDoodle({ className = '' }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <div style={{ width: '16px', height: '2px', background: COLOR }} />
      <div style={{ width: '16px', height: '2px', background: COLOR }} />
      <div style={{ width: '16px', height: '2px', background: COLOR }} />
      <span style={{ fontSize: '14px', color: COLOR, lineHeight: 1, marginLeft: '-2px' }}>&gt;</span>
    </div>
  )
}

/* Real Estate Themed Speech Bubble with House Icon — Single Color */
export function SpeechBubbleHouseDoodle({ className = '' }) {
  return (
    <svg width="88" height="78" viewBox="0 0 88 78" fill="none" className={className}>
      <path
        d="M 12 10 C 12 4, 76 4, 76 10 C 76 38, 58 44, 44 44 L 35 58 L 33 44 C 12 44, 12 32, 12 10 Z"
        stroke={COLOR}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Hand-drawn house icon inside bubble */}
      <path
        d="M 23 30 L 29 23 L 35 30 L 35 37 L 23 37 Z"
        stroke={COLOR}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="27" y="32" width="4" height="5" stroke={COLOR} strokeWidth="1" />
      {/* Blueprint survey text lines */}
      <line x1="41" y1="25" x2="64" y2="25" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="41" y1="30.5" x2="60" y2="30.5" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="41" y1="36" x2="54" y2="36" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function WaveDoodle({ className = '' }) {
  return (
    <svg width="55" height="18" viewBox="0 0 55 18" fill="none" className={className}>
      <path
        d="M 2 9 C 8 2, 14 16, 20 9 C 26 2, 32 16, 38 9 C 44 2, 50 16, 54 9"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* Real Estate House Doodle — Single Color */
export function HouseDoodle({ className = '' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className={className}>
      {/* Chimney smoke */}
      <path d="M 23 6 C 24 4, 26 5, 27 3" stroke={COLOR} strokeWidth="1.4" strokeLinecap="round" />
      {/* Chimney */}
      <path d="M 22 10 L 22 7 L 25 7 L 25 13" stroke={COLOR} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Roof */}
      <path d="M 4 15 L 16 5 L 28 15" stroke={COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* House Body */}
      <path d="M 7 14 L 7 26 C 7 27 8 28 9 28 L 23 28 C 24 28 25 27 25 26 L 25 14" stroke={COLOR} strokeWidth="1.6" strokeLinejoin="round" />
      {/* Door */}
      <rect x="13" y="19" width="6" height="9" rx="1" stroke={COLOR} strokeWidth="1.4" />
      {/* Round Attic Window */}
      <circle cx="16" cy="11.5" r="2.2" stroke={COLOR} strokeWidth="1.3" />
    </svg>
  )
}

/* Real Estate Property Key Doodle — Single Color */
export function KeyDoodle({ className = '' }) {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className={className}>
      {/* Key Bow */}
      <circle cx="9" cy="19" r="6" stroke={COLOR} strokeWidth="1.6" />
      <circle cx="9" cy="19" r="2.2" stroke={COLOR} strokeWidth="1.3" />
      {/* Key Blade */}
      <path d="M 13.5 14.5 L 23 5" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      {/* Key Bits */}
      <path d="M 19 9 L 21.5 11.5" stroke={COLOR} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 21.5 6.5 L 24 9" stroke={COLOR} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* Real Estate Location / Map Pin Doodle — Single Color */
export function LocationPinDoodle({ className = '' }) {
  return (
    <svg width="24" height="26" viewBox="0 0 26 28" fill="none" className={className}>
      <path
        d="M 13 2 C 7.5 2, 3 6.5, 3 12 C 3 19, 13 26, 13 26 C 13 26, 23 19, 23 12 C 23 6.5, 18.5 2, 13 2 Z"
        stroke={COLOR}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="11" r="3" stroke={COLOR} strokeWidth="1.4" />
    </svg>
  )
}

export function CheckmarkDoodle({ className = '' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <rect x="2" y="2" width="18" height="18" rx="5" stroke={COLOR} strokeWidth="1.5" />
      <path d="M 6.5 11 L 9.5 14 L 15.5 8" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StarDoodle({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLOR} strokeWidth="1.5" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function DiagonalArrowDoodle({ className = '' }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M 8 24 L 24 8 M 12 8 L 24 8 L 24 20" stroke={COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function RibbonLoopDoodle({ className = '' }) {
  return (
    <svg width="105" height="70" viewBox="0 0 105 70" fill="none" className={className}>
      <path
        d="M 5 60 C 25 65, 45 40, 48 25 C 52 10, 75 10, 75 28 C 75 48, 40 45, 30 20 C 25 5, 55 5, 70 20 C 85 35, 95 65, 85 68"
        stroke={COLOR}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function HeartDoodle({ className = '' }) {
  return (
    <svg width="22" height="20" viewBox="0 0 24 22" fill="none" className={className}>
      <path
        d="M 12 20 L 3.5 11 C 1 8.5 2 4 5.5 3 C 8.5 2 11 4.5 12 6 C 13 4.5 15.5 2 18.5 3 C 22 4 23 8.5 20.5 11 L 12 20 Z"
        stroke={COLOR}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HashDoodle({ className = '' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <line x1="7" y1="2" x2="5" y2="18" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15" y1="2" x2="13" y2="18" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="2" y1="7" x2="18" y2="7" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="2" y1="13" x2="18" y2="13" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function SlashDoodle({ className = '' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <line x1="16" y1="2" x2="4" y2="18" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="2" x2="2" y2="16" stroke={COLOR} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* Swooping line from Hero section looping and pointing arrow (<---) at the Overview blue phone */
export function HeroToOverviewArrowDoodle({ className = '' }) {
  return (
    <svg width="340" height="260" viewBox="0 0 340 260" fill="none" className={className}>
      <path
        d="M 310 15 C 310 80, 280 135, 245 165 C 205 205, 225 245, 260 225 C 290 195, 265 130, 205 150 C 145 170, 70 192, 12 195"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Crisp Arrowhead pointing directly at the blue phone */}
      <path
        d="M 28 186 L 10 195 L 26 205"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Circle with Double Down-Chevrons — Single Color */
export function DoubleChevronCircleDoodle({ className = '' }) {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className={className}>
      <circle cx="23" cy="23" r="20" stroke={COLOR} strokeWidth="1.6" fill="#ffffff" />
      <path d="M 16 18 L 23 24 L 30 18" stroke={COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 23 L 23 29 L 30 23" stroke={COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Horizontal Line Looping into a Heart — Single Color */
export function HeartLoopLineDoodle({ className = '' }) {
  return (
    <svg width="100" height="34" viewBox="0 0 100 34" fill="none" className={className}>
      <path
        d="M 4 25 L 34 25 C 38 25, 42 18, 46 12 C 48 8, 52 8, 54 11 C 57 15, 52 23, 46 27 C 40 23, 35 15, 38 11 C 40 8, 44 8, 46 12 C 50 18, 54 25, 58 25 L 96 25"
        stroke={COLOR}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* Wide Section-to-Section Dashed Connecting Line pointing directly to 3D character */
export function SectionConnectingDashedLine({ className = '' }) {
  return (
    <svg width="1020" height="460" viewBox="0 0 1020 460" fill="none" className={className}>
      {/* Hand-drawn Dashed Connecting Path curving naturally forward toward Problem character */}
      <path
        d="M 30 30 C 230 60, 450 95, 630 145 C 710 180, 760 260, 775 390"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
      {/* Sleek, Compact Hand-Drawn Arrowhead pointing naturally at 3D character */}
      <path
        d="M 766 381 L 775 390 L 778 377"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Dashed trail looping around the Problem Statement illustration */
export function ProblemDashedTrail({ className = '' }) {
  return (
    <svg width="600" height="340" viewBox="0 0 600 340" fill="none" className={className}>
      <path
        d="M 10 30 C 140 10, 260 40, 310 130 C 350 210, 310 300, 210 320 C 110 340, 20 290, 10 260"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeDasharray="5 7"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* Wide Section-to-Section Dashed Trail from Problem character (Right) into Solution Phone (Left) */
export function SolutionDashedTrail({ className = '' }) {
  return (
    <svg width="1020" height="280" viewBox="0 0 1020 280" fill="none" className={className}>
      {/* Hand-drawn Dashed Connecting Path curving all the way from Right (Problem) into Left (Solution Phone) */}
      <path
        d="M 820 15 C 780 80, 550 50, 360 90 C 310 110, 275 135, 255 165"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
      {/* Sleek, Compact Hand-Drawn Arrowhead pointing directly into the Solution Phone */}
      <path
        d="M 258 153 L 255 165 L 266 160"
        stroke={COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Modern Sleek Tech Flow Connector between chapters */
export function ChapterBridgeArrowDoodle({ className = '' }) {
  return (
    <svg
      width="36"
      height="56"
      viewBox="0 0 36 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bridgeTechGrad" x1="18" y1="2" x2="18" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
        </linearGradient>
        <filter id="bridgeArrowGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3B82F6" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Top Anchor Ring & Core Dot */}
      <circle cx="18" cy="6" r="5" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.35" />
      <circle cx="18" cy="6" r="2.5" fill="#3B82F6" />

      {/* Sleek Vertical Gradient Stem */}
      <line
        x1="18"
        y1="12"
        x2="18"
        y2="42"
        stroke="url(#bridgeTechGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Modern Sharp Chevron Arrowhead */}
      <path
        d="M 10 37 L 18 45 L 26 37"
        stroke="#2563EB"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#bridgeArrowGlow)"
      />
    </svg>
  )
}


