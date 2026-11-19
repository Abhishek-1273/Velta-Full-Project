import { useState, useRef, useEffect, useCallback, useId, useMemo } from "react";
import { FaWhatsapp, FaWifi } from "react-icons/fa";
import styles from "./FlickCard.module.css";

// ── Scannable WhatsApp QR Code Vector Matrix (wa.me/919960240648) ──
const QR_VIEWBOX_SIZE = 53;
const QR_SVG_PATH =
  "M4 4h7v1h-7z M15 4h1v1h-1z M18 4h1v1h-1z M23 4h1v1h-1z M25 4h1v1h-1z M27 4h1v1h-1z M29 4h1v1h-1z M31 4h1v1h-1z M33 4h3v1h-3z M40 4h1v1h-1z M42 4h7v1h-7z M4 5h1v1h-1z M10 5h1v1h-1z M12 5h4v1h-4z M17 5h1v1h-1z M22 5h1v1h-1z M25 5h2v1h-2z M28 5h3v1h-3z M32 5h2v1h-2z M35 5h1v1h-1z M37 5h1v1h-1z M39 5h1v1h-1z M42 5h1v1h-1z M48 5h1v1h-1z M4 6h1v1h-1z M6 6h3v1h-3z M10 6h1v1h-1z M14 6h3v1h-3z M21 6h3v1h-3z M25 6h1v1h-1z M27 6h2v1h-2z M32 6h1v1h-1z M34 6h4v1h-4z M39 6h1v1h-1z M42 6h1v1h-1z M44 6h3v1h-3z M48 6h1v1h-1z M4 7h1v1h-1z M6 7h3v1h-3z M10 7h1v1h-1z M12 7h1v1h-1z M14 7h1v1h-1z M20 7h3v1h-3z M24 7h1v1h-1z M26 7h3v1h-3z M30 7h1v1h-1z M34 7h1v1h-1z M39 7h2v1h-2z M42 7h1v1h-1z M44 7h3v1h-3z M48 7h1v1h-1z M4 8h1v1h-1z M6 8h3v1h-3z M10 8h1v1h-1z M15 8h1v1h-1z M18 8h1v1h-1z M23 8h7v1h-7z M33 8h2v1h-2z M36 8h1v1h-1z M38 8h3v1h-3z M42 8h1v1h-1z M44 8h3v1h-3z M48 8h1v1h-1z M4 9h1v1h-1z M10 9h1v1h-1z M12 9h2v1h-2z M16 9h3v1h-3z M24 9h1v1h-1z M28 9h1v1h-1z M30 9h1v1h-1z M42 9h1v1h-1z M48 9h1v1h-1z M4 10h7v1h-7z M12 10h1v1h-1z M14 10h1v1h-1z M16 10h1v1h-1z M18 10h1v1h-1z M20 10h1v1h-1z M22 10h1v1h-1z M24 10h1v1h-1z M26 10h1v1h-1z M28 10h1v1h-1z M30 10h1v1h-1z M32 10h1v1h-1z M34 10h1v1h-1z M36 10h1v1h-1z M38 10h1v1h-1z M40 10h1v1h-1z M42 10h7v1h-7z M14 11h1v1h-1z M17 11h1v1h-1z M21 11h4v1h-4z M28 11h2v1h-2z M31 11h2v1h-2z M36 11h1v1h-1z M39 11h2v1h-2z M4 12h5v1h-5z M10 12h3v1h-3z M16 12h2v1h-2z M19 12h4v1h-4z M24 12h5v1h-5z M34 12h2v1h-2z M37 12h3v1h-3z M41 12h1v1h-1z M43 12h1v1h-1z M45 12h1v1h-1z M47 12h1v1h-1z M4 13h3v1h-3z M12 13h2v1h-2z M16 13h3v1h-3z M23 13h1v1h-1z M25 13h1v1h-1z M27 13h1v1h-1z M29 13h1v1h-1z M33 13h2v1h-2z M37 13h1v1h-1z M40 13h2v1h-2z M43 13h6v1h-6z M6 14h1v1h-1z M9 14h2v1h-2z M13 14h1v1h-1z M15 14h3v1h-3z M19 14h1v1h-1z M22 14h5v1h-5z M28 14h1v1h-1z M30 14h1v1h-1z M33 14h1v1h-1z M35 14h1v1h-1z M38 14h3v1h-3z M42 14h1v1h-1z M44 14h2v1h-2z M47 14h1v1h-1z M4 15h1v1h-1z M6 15h1v1h-1z M9 15h1v1h-1z M15 15h1v1h-1z M17 15h1v1h-1z M21 15h1v1h-1z M23 15h1v1h-1z M25 15h1v1h-1z M27 15h3v1h-3z M32 15h1v1h-1z M34 15h3v1h-3z M41 15h4v1h-4z M46 15h1v1h-1z M5 16h1v1h-1z M10 16h1v1h-1z M13 16h3v1h-3z M20 16h4v1h-4z M26 16h4v1h-4z M33 16h2v1h-2z M37 16h1v1h-1z M41 16h2v1h-2z M47 16h1v1h-1z M5 17h2v1h-2z M8 17h1v1h-1z M11 17h1v1h-1z M14 17h1v1h-1z M16 17h3v1h-3z M25 17h1v1h-1z M31 17h1v1h-1z M33 17h3v1h-3z M39 17h3v1h-3z M43 17h1v1h-1z M46 17h1v1h-1z M48 17h1v1h-1z M5 18h1v1h-1z M7 18h4v1h-4z M13 18h1v1h-1z M15 18h1v1h-1z M20 18h2v1h-2z M24 18h2v1h-2z M28 18h1v1h-1z M30 18h1v1h-1z M33 18h1v1h-1z M35 18h1v1h-1z M38 18h2v1h-2z M42 18h1v1h-1z M46 18h2v1h-2z M4 19h3v1h-3z M9 19h1v1h-1z M12 19h4v1h-4z M17 19h2v1h-2z M20 19h2v1h-2z M23 19h1v1h-1z M27 19h2v1h-2z M31 19h7v1h-7z M39 19h1v1h-1z M41 19h6v1h-6z M48 19h1v1h-1z M4 20h1v1h-1z M6 20h2v1h-2z M10 20h1v1h-1z M15 20h2v1h-2z M20 20h3v1h-3z M24 20h3v1h-3z M29 20h1v1h-1z M34 20h2v1h-2z M37 20h1v1h-1z M39 20h1v1h-1z M41 20h1v1h-1z M43 20h1v1h-1z M45 20h1v1h-1z M47 20h2v1h-2z M4 21h1v1h-1z M7 21h3v1h-3z M12 21h1v1h-1z M14 21h3v1h-3z M18 21h1v1h-1z M29 21h1v1h-1z M31 21h2v1h-2z M34 21h4v1h-4z M40 21h2v1h-2z M45 21h4v1h-4z M5 22h4v1h-4z M10 22h7v1h-7z M20 22h1v1h-1z M24 22h1v1h-1z M26 22h1v1h-1z M28 22h2v1h-2z M33 22h1v1h-1z M35 22h2v1h-2z M38 22h3v1h-3z M42 22h2v1h-2z M45 22h3v1h-3z M4 23h2v1h-2z M12 23h2v1h-2z M16 23h1v1h-1z M18 23h2v1h-2z M22 23h2v1h-2z M28 23h2v1h-2z M32 23h1v1h-1z M34 23h1v1h-1z M36 23h1v1h-1z M41 23h2v1h-2z M44 23h1v1h-1z M46 23h1v1h-1z M5 24h8v1h-8z M14 24h3v1h-3z M19 24h11v1h-11z M38 24h1v1h-1z M40 24h6v1h-6z M47 24h1v1h-1z M6 25h1v1h-1z M8 25h1v1h-1z M12 25h1v1h-1z M14 25h2v1h-2z M17 25h2v1h-2z M24 25h1v1h-1z M28 25h1v1h-1z M32 25h5v1h-5z M39 25h2v1h-2z M44 25h1v1h-1z M46 25h1v1h-1z M48 25h1v1h-1z M5 26h1v1h-1z M8 26h1v1h-1z M10 26h1v1h-1z M12 26h2v1h-2z M15 26h5v1h-5z M21 26h1v1h-1z M23 26h2v1h-2z M26 26h1v1h-1z M28 26h4v1h-4z M37 26h4v1h-4z M42 26h1v1h-1z M44 26h2v1h-2z M47 26h1v1h-1z M4 27h2v1h-2z M8 27h1v1h-1z M12 27h1v1h-1z M14 27h1v1h-1z M18 27h2v1h-2z M23 27h2v1h-2z M28 27h1v1h-1z M30 27h1v1h-1z M33 27h1v1h-1z M35 27h3v1h-3z M40 27h1v1h-1z M44 27h1v1h-1z M46 27h2v1h-2z M5 28h2v1h-2z M8 28h6v1h-6z M16 28h1v1h-1z M20 28h1v1h-1z M22 28h7v1h-7z M30 28h1v1h-1z M33 28h2v1h-2z M37 28h9v1h-9z M48 28h1v1h-1z M5 29h2v1h-2z M8 29h1v1h-1z M11 29h5v1h-5z M23 29h6v1h-6z M31 29h1v1h-1z M33 29h2v1h-2z M37 29h1v1h-1z M39 29h3v1h-3z M46 29h3v1h-3z M4 30h4v1h-4z M9 30h2v1h-2z M12 30h1v1h-1z M14 30h1v1h-1z M25 30h1v1h-1z M28 30h1v1h-1z M30 30h2v1h-2z M34 30h1v1h-1z M36 30h1v1h-1z M38 30h1v1h-1z M44 30h1v1h-1z M47 30h1v1h-1z M14 31h2v1h-2z M19 31h4v1h-4z M27 31h2v1h-2z M31 31h2v1h-2z M34 31h1v1h-1z M37 31h1v1h-1z M39 31h2v1h-2z M42 31h2v1h-2z M46 31h1v1h-1z M4 32h1v1h-1z M7 32h1v1h-1z M9 32h3v1h-3z M14 32h2v1h-2z M17 32h1v1h-1z M20 32h3v1h-3z M28 32h1v1h-1z M30 32h1v1h-1z M33 32h1v1h-1z M35 32h1v1h-1z M41 32h1v1h-1z M43 32h3v1h-3z M48 32h1v1h-1z M5 33h3v1h-3z M11 33h1v1h-1z M15 33h5v1h-5z M23 33h2v1h-2z M26 33h1v1h-1z M28 33h1v1h-1z M33 33h2v1h-2z M36 33h1v1h-1z M40 33h2v1h-2z M48 33h1v1h-1z M5 34h1v1h-1z M8 34h3v1h-3z M12 34h1v1h-1z M15 34h8v1h-8z M24 34h1v1h-1z M26 34h1v1h-1z M29 34h2v1h-2z M38 34h1v1h-1z M44 34h1v1h-1z M47 34h1v1h-1z M4 35h1v1h-1z M6 35h1v1h-1z M11 35h1v1h-1z M16 35h1v1h-1z M18 35h2v1h-2z M21 35h4v1h-4z M27 35h2v1h-2z M32 35h1v1h-1z M35 35h2v1h-2z M39 35h1v1h-1z M42 35h1v1h-1z M46 35h1v1h-1z M4 36h1v1h-1z M6 36h3v1h-3z M10 36h1v1h-1z M14 36h5v1h-5z M20 36h1v1h-1z M22 36h4v1h-4z M29 36h1v1h-1z M31 36h1v1h-1z M34 36h1v1h-1z M37 36h1v1h-1z M40 36h2v1h-2z M44 36h1v1h-1z M47 36h1v1h-1z M5 37h5v1h-5z M11 37h2v1h-2z M16 37h1v1h-1z M21 37h1v1h-1z M23 37h1v1h-1z M25 37h3v1h-3z M31 37h4v1h-4z M37 37h1v1h-1z M40 37h2v1h-2z M46 37h1v1h-1z M48 37h1v1h-1z M8 38h1v1h-1z M10 38h3v1h-3z M14 38h3v1h-3z M20 38h2v1h-2z M27 38h1v1h-1z M30 38h2v1h-2z M35 38h1v1h-1z M38 38h1v1h-1z M46 38h2v1h-2z M5 39h4v1h-4z M14 39h1v1h-1z M16 39h1v1h-1z M18 39h2v1h-2z M23 39h1v1h-1z M28 39h1v1h-1z M31 39h2v1h-2z M35 39h3v1h-3z M39 39h4v1h-4z M45 39h3v1h-3z M4 40h1v1h-1z M7 40h2v1h-2z M10 40h3v1h-3z M17 40h1v1h-1z M20 40h3v1h-3z M24 40h5v1h-5z M34 40h1v1h-1z M37 40h2v1h-2z M40 40h5v1h-5z M47 40h1v1h-1z M12 41h1v1h-1z M14 41h3v1h-3z M18 41h2v1h-2z M24 41h1v1h-1z M28 41h2v1h-2z M31 41h1v1h-1z M33 41h3v1h-3z M39 41h2v1h-2z M44 41h2v1h-2z M48 41h1v1h-1z M4 42h7v1h-7z M12 42h4v1h-4z M22 42h3v1h-3z M26 42h1v1h-1z M28 42h1v1h-1z M30 42h1v1h-1z M35 42h1v1h-1z M37 42h2v1h-2z M40 42h1v1h-1z M42 42h1v1h-1z M44 42h2v1h-2z M47 42h1v1h-1z M4 43h1v1h-1z M10 43h1v1h-1z M13 43h1v1h-1z M15 43h3v1h-3z M23 43h2v1h-2z M28 43h2v1h-2z M32 43h1v1h-1z M35 43h3v1h-3z M40 43h1v1h-1z M44 43h1v1h-1z M46 43h1v1h-1z M48 43h1v1h-1z M4 44h1v1h-1z M6 44h3v1h-3z M10 44h1v1h-1z M12 44h3v1h-3z M16 44h1v1h-1z M20 44h1v1h-1z M22 44h1v1h-1z M24 44h6v1h-6z M31 44h1v1h-1z M33 44h2v1h-2z M37 44h1v1h-1z M39 44h6v1h-6z M4 45h1v1h-1z M6 45h3v1h-3z M10 45h1v1h-1z M12 45h1v1h-1z M14 45h2v1h-2z M17 45h1v1h-1z M21 45h1v1h-1z M34 45h1v1h-1z M36 45h2v1h-2z M39 45h1v1h-1z M41 45h2v1h-2z M44 45h1v1h-1z M46 45h2v1h-2z M4 46h1v1h-1z M6 46h3v1h-3z M10 46h1v1h-1z M12 46h1v1h-1z M14 46h1v1h-1z M17 46h1v1h-1z M19 46h1v1h-1z M21 46h3v1h-3z M26 46h1v1h-1z M28 46h3v1h-3z M35 46h1v1h-1z M38 46h1v1h-1z M40 46h3v1h-3z M45 46h1v1h-1z M48 46h1v1h-1z M4 47h1v1h-1z M10 47h1v1h-1z M12 47h4v1h-4z M17 47h1v1h-1z M19 47h1v1h-1z M21 47h1v1h-1z M23 47h2v1h-2z M32 47h1v1h-1z M36 47h1v1h-1z M44 47h3v1h-3z M4 48h7v1h-7z M12 48h1v1h-1z M14 48h1v1h-1z M17 48h1v1h-1z M19 48h2v1h-2z M22 48h1v1h-1z M27 48h3v1h-3z M33 48h2v1h-2z M40 48h3v1h-3z M44 48h2v1h-2z M47 48h1v1h-1z";

// ── Physics & Interaction Parameters ──
const DEG_PER_PX = 0.6;
const STIFFNESS = 170;
const DAMPING = 20;
const PROJECTION = 0.22;
const FLICK_SPEED = 450;
const MAX_HALF_TURNS = 6;
const DRAG_SLOP = 4;
const LIFT = 36;
const TILT = 6;
const THICKNESS = 4;
const SUBSTEP = 1 / 240;
const VELOCITY_WINDOW = 80;
const INTERACTIVE = "button, a, input, select, textarea, [data-no-flip]";

const mod2 = (n) => ((n % 2) + 2) % 2;
const sideOf = (angle) => mod2(Math.round(angle / 180)) === 1;
const nearestFace = (angle) => Math.round(angle / 180) * 180;

function cardTransform(angle, lift) {
  return `translateZ(${lift.toFixed(2)}px) rotateY(${angle.toFixed(2)}deg)`;
}

function paintLight(sin, bands, shades) {
  const turn = Math.abs(sin);
  const shift = `${(sin * 140).toFixed(1)}%`;
  const transform = `translateX(${shift}) rotate(18deg)`;
  for (const band of bands) {
    if (band) {
      band.style.opacity = (turn * 0.25).toFixed(3);
      band.style.transform = transform;
    }
  }
  for (const shade of shades) {
    if (shade) {
      shade.style.opacity = (turn * 0.2).toFixed(3);
    }
  }
}

function releaseVelocity(samples, now) {
  const last = samples.at(-1);
  if (!last || now - last.t > VELOCITY_WINDOW) return 0;
  const first = samples.find((p) => last.t - p.t <= VELOCITY_WINDOW);
  if (!first || last.t <= first.t) return 0;
  return ((last.a - first.a) / (last.t - first.t)) * 1000;
}

export default function FlickCard({ className = "", clientData = {}, passId = "#04" }) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const [backVisible, setBackVisible] = useState(false);
  const [wordmarkFailed, setWordmarkFailed] = useState(false);
  const hintId = useId();
  const lastBackRef = useRef(false);

  // Dynamic client details synced from Contact Form with clean placeholder states
  const hasName = Boolean(clientData.fullName && clientData.fullName.trim());
  const displayName = hasName ? clientData.fullName.trim().toUpperCase() : "•••• ••••";
  const signatureName = hasName ? clientData.fullName.trim() : "——————";

  const hasBusiness = Boolean(clientData.businessName && clientData.businessName.trim());
  const displayBusiness = hasBusiness ? clientData.businessName.trim() : "———";

  const hasCountry = Boolean(clientData.country && clientData.country.trim());
  const displayCountry = hasCountry ? clientData.country.trim() : "———";

  const hasEmail = Boolean(clientData.email && clientData.email.trim());
  const displayEmail = hasEmail ? clientData.email.trim() : "———";

  // Smart responsive font sizing based on name length
  const nameFontSize =
    displayName.length > 24
      ? "15px"
      : displayName.length > 18
        ? "17px"
        : "19px";

  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const cardRef = useRef(null);
  const shadowRef = useRef(null);
  const frontBandRef = useRef(null);
  const frontShadeRef = useRef(null);
  const backBandRef = useRef(null);
  const backShadeRef = useRef(null);

  const initial = useRef({
    card: cardTransform(0, 0),
    bands: [null, null],
    shades: [null, null],
  }).current;

  const sim = useRef({
    angle: 0,
    vel: 0,
    target: 0,
    lift: 0,
    dragOriginAngle: 0,
    dragOriginX: 0,
    dragOriginY: 0,
    pointerId: null,
    dragging: false,
    history: [],
    animId: 0,
    lastTime: 0,
    reduceMotion: false,
  });

  const setTilt = useCallback((rx, ry) => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    }
  }, []);

  const renderFrame = useCallback(
    (angle, lift) => {
      if (cardRef.current) {
        cardRef.current.style.transform = cardTransform(angle, lift);
      }
      if (shadowRef.current) {
        const turn = Math.abs(Math.sin((angle * Math.PI) / 180));
        const scale = 1 - turn * 0.15 + (lift / LIFT) * 0.1;
        const opacity = Math.max(0.2, (1 - (lift / LIFT) * 0.3) * (1 - turn * 0.4));
        shadowRef.current.style.transform = `scale(${scale.toFixed(3)}) translateY(${(lift * 0.4).toFixed(1)}px)`;
        shadowRef.current.style.opacity = opacity.toFixed(3);
      }
      const rad = (angle * Math.PI) / 180;
      paintLight(
        Math.sin(rad),
        [frontBandRef.current, backBandRef.current],
        [frontShadeRef.current, backShadeRef.current]
      );
      const isBack = sideOf(angle);
      if (lastBackRef.current !== isBack) {
        lastBackRef.current = isBack;
        setBackVisible(isBack);
        setInternalFlipped(isBack);
      }
    },
    []
  );

  const stepPhysics = useCallback(
    (now) => {
      const s = sim.current;
      if (!s.lastTime) s.lastTime = now;
      let dt = Math.min((now - s.lastTime) / 1000, 0.05);
      s.lastTime = now;

      while (dt > 0) {
        const h = Math.min(dt, SUBSTEP);
        const disp = s.angle - s.target;
        const spring = -STIFFNESS * disp;
        const dampr = -DAMPING * s.vel;
        const acc = spring + dampr;
        s.vel += acc * h;
        s.angle += s.vel * h;

        const targetLift = s.pointerId !== null ? LIFT : 0;
        s.lift += (targetLift - s.lift) * Math.min(1, 15 * h);
        dt -= h;
      }

      renderFrame(s.angle, s.lift);

      const settled =
        Math.abs(s.angle - s.target) < 0.1 &&
        Math.abs(s.vel) < 0.2 &&
        Math.abs(s.lift - (s.pointerId !== null ? LIFT : 0)) < 0.1;

      if (settled) {
        s.angle = s.target;
        s.vel = 0;
        s.lift = s.pointerId !== null ? LIFT : 0;
        renderFrame(s.angle, s.lift);
        s.animId = 0;
        return;
      }

      s.animId = requestAnimationFrame(stepPhysics);
    },
    [renderFrame]
  );

  const wake = useCallback(() => {
    const s = sim.current;
    if (!s.animId) {
      s.lastTime = performance.now();
      s.animId = requestAnimationFrame(stepPhysics);
    }
  }, [stepPhysics]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    sim.current.reduceMotion = mq.matches;
    const update = (e) => {
      sim.current.reduceMotion = e.matches;
    };
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (sim.current.animId) {
        cancelAnimationFrame(sim.current.animId);
      }
    };
  }, []);

  const flipCard = useCallback(
    (deltaHalves = 1) => {
      const s = sim.current;
      if (s.reduceMotion) {
        const next = nearestFace(s.target) + deltaHalves * 180;
        s.angle = next;
        s.target = next;
        s.vel = 0;
        s.lift = 0;
        renderFrame(next, 0);
        return;
      }
      s.target = nearestFace(s.target) + deltaHalves * 180;
      s.vel += Math.sign(deltaHalves) * 200;
      wake();
    },
    [renderFrame, wake]
  );

  const onPointerDown = (e) => {
    if (e.target.closest(INTERACTIVE)) return;
    const s = sim.current;
    if (s.pointerId !== null) return;
    s.pointerId = e.pointerId;
    s.dragOriginX = e.clientX;
    s.dragOriginY = e.clientY;
    s.dragOriginAngle = s.angle;
    s.dragging = false;
    s.history = [{ a: s.angle, t: performance.now() }];
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    wake();
  };

  const onPointerMove = (e) => {
    const s = sim.current;
    if (s.pointerId !== e.pointerId) {
      if (s.pointerId === null && rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setTilt(-ny * TILT, nx * TILT);
      }
      return;
    }

    const dx = e.clientX - s.dragOriginX;
    const dy = e.clientY - s.dragOriginY;

    if (!s.dragging && Math.hypot(dx, dy) > DRAG_SLOP) {
      s.dragging = true;
    }

    if (s.dragging) {
      const now = performance.now();
      s.angle = s.dragOriginAngle + dx * DEG_PER_PX;
      s.target = s.angle;
      s.vel = 0;
      s.history.push({ a: s.angle, t: now });
      if (s.history.length > 10) s.history.shift();
      wake();
    }
  };

  const release = (e, cancel = false) => {
    const s = sim.current;
    if (s.pointerId !== e.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const wasDragging = s.dragging;
    s.pointerId = null;
    s.dragging = false;
    setTilt(0, 0);

    if (cancel) {
      s.target = nearestFace(s.angle);
      wake();
      return;
    }

    if (!wasDragging) {
      flipCard(1);
      return;
    }

    const now = performance.now();
    const v = releaseVelocity(s.history, now);
    const projected = s.angle + v * PROJECTION;
    const currentHalf = Math.round(s.angle / 180);
    let targetHalf;

    if (Math.abs(v) > FLICK_SPEED) {
      targetHalf = currentHalf + Math.sign(v);
    } else {
      targetHalf = Math.round(projected / 180);
    }

    const clampMin = currentHalf - MAX_HALF_TURNS;
    const clampMax = currentHalf + MAX_HALF_TURNS;
    targetHalf = Math.max(clampMin, Math.min(clampMax, targetHalf));

    s.target = targetHalf * 180;
    s.vel = v;
    wake();
  };

  const onKeyDown = (e) => {
    if (e.target.closest(INTERACTIVE)) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flipCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      flipCard(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      flipCard(1);
    }
  };

  return (
    <div
      aria-describedby={hintId}
      aria-label="VeltaZ Executive Digital Pass"
      aria-roledescription="flip card"
      className={`${styles.root} ${className}`}
      onKeyDown={onKeyDown}
      onLostPointerCapture={(e) => release(e, true)}
      onPointerCancel={(e) => release(e, true)}
      onPointerDown={onPointerDown}
      onPointerLeave={() => {
        if (sim.current.pointerId === null) setTilt(0, 0);
      }}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => release(e, false)}
      ref={rootRef}
      role="group"
      tabIndex={0}
    >
      {/* Dynamic floor shadow */}
      <div aria-hidden="true" className={styles.shadow} ref={shadowRef} />

      <div className={styles.tilt} ref={tiltRef}>
        <div className={styles.card} ref={cardRef} style={{ transform: initial.card }}>
          {/* FRONT FACE: APPROVED HORIZONTAL TITANIUM OBSIDIAN EXECUTIVE PASS */}
          <div
            aria-hidden={backVisible || undefined}
            className={`${styles.face} ${styles.faceFront} ${styles.styleObsidian}`}
            inert={backVisible ? "" : undefined}
            style={{
              transform: "rotateY(0deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Subtle Metallic Chamfer / Bevel Perimeter Rim */}
            <div className={styles.innerFrame} aria-hidden="true" />

            {/* Subtle Faded Large VeltaZ Crest Watermark in Card Center */}
            <div className={styles.centerWatermark} aria-hidden="true">
              <img
                src="/logo/logo-gold.png"
                alt=""
                className={styles.centerWatermarkImg}
              />
            </div>

            {/* 1. Top Header: Official Gold Logo + VELTAZ Wordmark on Left, Straight WiFi on Right */}
            <div className={styles.frontHeader}>
              <div className={styles.brandGroup}>
                <div className={styles.brandLogoOrb}>
                  <img src="/logo/logo-gold.png" alt="VeltaZ Emblem" className={styles.brandLogoImg} />
                </div>
                {!wordmarkFailed ? (
                  <img
                    src="/logo/logo-text.png"
                    alt="VELTAZ"
                    className={styles.brandWordmarkImg}
                    onError={() => setWordmarkFailed(true)}
                  />
                ) : (
                  <span className={styles.brandFallbackText}>VELTAZ</span>
                )}
              </div>

              <div className={styles.headerRight}>
                <FaWifi className={styles.nfcIcon} aria-hidden="true" title="Contactless Smart Access" />
              </div>
            </div>

            {/* 2. Chip Row: Brushed Gold EMV Chip on Left, White Gold EXECUTIVE PASS on Right */}
            <div className={styles.frontChipRow}>
              <div className={styles.emvChip} aria-hidden="true">
                <div className={styles.chipCenter} />
                <div className={styles.chipLineH} />
                <div className={styles.chipLineV} />
              </div>

              <div className={styles.tierStamp} title="Executive Membership Tier">
                <span className={styles.tierStar}>✦</span>
                <span className={styles.tierLabel}>EXECUTIVE PASS</span>
              </div>
            </div>

            {/* 3. Cardholder Name Block: Positioned directly BELOW the Chip */}
            <div className={styles.cardholderNameBlock}>
              <span className={styles.engravedMicroLabel}>NAME</span>
              <h3
                className={`${styles.engravedHeroName} ${styles.fontCinzel} ${hasName ? styles.finishLaserWhite : styles.finishPlaceholder}`}
                style={{ fontSize: nameFontSize }}
                title={displayName}
              >
                {displayName}
              </h3>
            </div>

            {/* 4. Lower Corporate Telemetry Row (Entity, Jurisdiction, Advisory Comms) */}
            <div className={styles.frontTelemetryRow}>
              <div className={styles.telemetryCol}>
                <span className={styles.engravedMicroLabel}>COMPANY</span>
                <span className={`${styles.engravedSubText} ${styles.fontExecutive} ${hasBusiness ? styles.finishLaserWhite : styles.finishPlaceholder}`}>
                  {displayBusiness}
                </span>
              </div>
              <div className={styles.telemetryCol}>
                <span className={styles.engravedMicroLabel}>COUNTRY</span>
                <span className={`${styles.engravedSubText} ${styles.fontExecutive} ${hasCountry ? styles.finishLaserWhite : styles.finishPlaceholder}`}>
                  {displayCountry}
                </span>
              </div>
              <div className={`${styles.telemetryCol} ${styles.telemetryColEmail}`}>
                <span className={styles.engravedMicroLabel}>EMAIL</span>
                <span className={`${styles.engravedEmailText} ${styles.fontExecutive} ${hasEmail ? styles.finishLaserWhite : styles.finishPlaceholder}`}>
                  {displayEmail}
                </span>
              </div>
            </div>

            {/* 5. Bottom Footer Bar: Authentic Laser-etched Markings */}
            <div className={styles.frontFooter}>
              <div className={styles.footerLeft}>
                <span className={styles.footerMicroText}>PASS</span>
                <span className={styles.footerDot}>•</span>
                <span className={styles.footerPassId}>#{passId.replace('#', '')}</span>
              </div>
              <div className={styles.footerRight}>
                <span className={styles.footerMicroText}>VELTALABS.NET</span>
                <span className={styles.footerDot}>•</span>
                <span className={styles.footerVerified}>VERIFIED</span>
              </div>
            </div>

            {/* Light reflection band */}
            <div aria-hidden="true" className={styles.lightWrap}>
              <div className={styles.shade} ref={frontShadeRef} />
              <div className={styles.lightBand} ref={frontBandRef} />
            </div>
          </div>

          {/* BACK FACE: HORIZONTAL REAL-WORLD LUXURY CARD BACK WITH QR CODE & DIRECT CONTACTS */}
          <div
            aria-hidden={!backVisible || undefined}
            className={`${styles.face} ${styles.faceBack} ${styles.styleObsidian}`}
            inert={!backVisible ? "" : undefined}
            style={{
              transform: "rotateY(180deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div className={styles.innerFrame} aria-hidden="true" />

            {/* 1. Full-width Authentic Recessed Magnetic Stripe */}
            <div className={styles.magneticStripe} aria-hidden="true" />

            {/* 2. Horizontal Back Body: 2 Balanced Columns */}
            <div className={styles.backBody}>
              {/* Left Column: Signature, Executive Desk Contacts, Security */}
              <div className={styles.backLeftCol}>
                {/* Signature Strip & Pass ID */}
                <div className={styles.signatureRow}>
                  <div className={styles.signatureStrip} title="Cardholder Signature">
                    <span className={`${styles.signatureText} ${!hasName ? styles.signaturePlaceholder : ""}`}>
                      {signatureName}
                    </span>
                  </div>
                  <div className={styles.cvvBox}>
                    <span className={styles.cvvLabel}>PASS ID</span>
                    <span className={styles.cvvVal}>{passId}</span>
                  </div>
                </div>

                {/* Direct Executive Desk Contacts Block */}
                <div className={styles.backInfoBlock}>
                  <a
                    href="https://wa.me/919960240648"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.backInfoItem}
                    data-no-flip="true"
                    title="Direct Desk Phone / WhatsApp"
                  >
                    <span className={styles.backInfoLabel}>PHONE</span>
                    <span className={styles.backInfoVal}>+91 99602 40648</span>
                  </a>
                  <a
                    href="mailto:support@veltalabs.net"
                    className={styles.backInfoItem}
                    data-no-flip="true"
                    title="Direct Support Email"
                  >
                    <span className={styles.backInfoLabel}>EMAIL</span>
                    <span className={styles.backInfoVal}>support@veltalabs.net</span>
                  </a>
                  <div className={styles.backInfoItem}>
                    <span className={styles.backInfoLabel}>LOCATION</span>
                    <span className={styles.backInfoVal}>Pune, India</span>
                  </div>
                </div>

                {/* Security Hologram Badge on Left */}
                <div className={styles.backHologramRow}>
                  <div className={styles.hologramBadge} title="Security Hologram" />
                </div>
              </div>

              {/* Right Column: Scannable WhatsApp QR Code (with pre-message) & Display Badge */}
              <div className={styles.backRightCol}>
                <div className={styles.qrCardWrap} title="Scan QR Code with camera to chat on WhatsApp with pre-filled message">
                  <div className={styles.qrPlate}>
                    <svg
                      viewBox={`0 0 ${QR_VIEWBOX_SIZE} ${QR_VIEWBOX_SIZE}`}
                      className={styles.qrSvg}
                      shapeRendering="crispEdges"
                      aria-label="WhatsApp QR Code with pre-filled message"
                    >
                      <rect width={QR_VIEWBOX_SIZE} height={QR_VIEWBOX_SIZE} fill="#ffffff" />
                      <path d={QR_SVG_PATH} fill="#0a0b0e" />
                    </svg>
                  </div>
                </div>

                {/* Non-Clickable Display Badge for Guidance */}
                <div className={styles.scanBadge} aria-hidden="true">
                  <FaWhatsapp className={styles.scanBadgeWaIcon} />
                  <span>SCAN TO CHAT</span>
                </div>

                {/* Issued by VeltaZ Notice Aligned Fully on Right */}
                <div className={styles.backNoticeRight}>
                  Issued by VeltaZ Labs • veltalabs.net
                </div>
              </div>
            </div>

            {/* Light reflection band */}
            <div aria-hidden="true" className={styles.lightWrap}>
              <div className={styles.shade} ref={backShadeRef} />
              <div className={styles.lightBand} ref={backBandRef} />
            </div>
          </div>
        </div>
      </div>

      <span className={styles.srOnly} id={hintId}>
        Showing {internalFlipped ? "back side of VeltaZ Executive Pass" : "front side of VeltaZ Executive Pass"}.
        Press Enter, Space, or drag to turn card over.
      </span>
    </div>
  );
}
