import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, Shield, Award, Clock, CheckCircle2, Building2, MapPinned
} from 'lucide-react';
import Hero from '../../components/common/Hero';
import { categories, agents } from '../../data/index';
import { submitEnquiry, fetchPropertyCounts, fetchPartners, fetchAdvisors } from '../../utils/api';
import { fadeUp, viewportOnce } from '../../animations/variants';
import SEO from '../../components/common/SEO';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import KineticGrid from '../../components/common/KineticGrid';
import Smooth3DSlideshow from '../../components/common/Smooth3DSlideshow';
import StickerPeeling from '../../components/common/StickerPeeling';

import { useSiteSettings, getLogoInitials, getBrandName } from '../../contexts';
// useSiteSettings is also used in HeroStats for heroStats array


// Subcomponents

import BlogPreview from './components/BlogPreview';
import ServicesStrip from './components/ServicesStrip';
import PropertyOwnerBrokerBanner from './components/PropertyOwnerBrokerBanner';
import AppDownload from './components/AppDownload';




/* ══════════════════════════════════════════════════════════════════════════
   HERO STATS BAR
══════════════════════════════════════════════════════════════════════════ */
const OR   = '#A67A08';
const SNVY = '#0B1728';

const DEFAULT_HERO_STATS = [
  { icon: Shield,    value: 'Trusted by 10,000+', label: 'Happy Customers'   },
  { icon: Building2, value: '5,000+',              label: 'Properties Listed' },
  { icon: Star,      value: '4.8/5',               label: 'Customer Rating'   },
  { icon: MapPinned, value: 'Pune & PCMC',          label: 'Wide Coverage'     },
];

const STAT_ICONS = [Shield, Building2, Star, MapPinned];

function HeroStats() {
  const { settings } = useSiteSettings();
  const stats = (settings?.heroStats?.length === 4 ? settings.heroStats : DEFAULT_HERO_STATS).map(
    (s, i) => ({ ...s, icon: STAT_ICONS[i] })
  );

  return (
    <div className="w-full flex justify-center px-4 py-6 bg-white dark:bg-navy-dark transition-colors duration-300">
      <div
        style={{
          maxWidth: 820,
          width: '100%',
          borderRadius: 14,
          boxShadow: '0 2px 4px rgba(11,23,40,0.04), 0 8px 32px rgba(11,23,40,0.10)',
        }}
        className="bg-white dark:bg-navy border border-gray-100 dark:border-white/5 transition-colors duration-300 grid grid-cols-2 sm:grid-cols-4 gap-y-3 py-4 px-2 sm:p-3"
      >
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 px-3 py-2 ${
              i < stats.length - 1 ? 'sm:border-r border-gray-100 dark:border-white/10' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${OR}18` }}>
              <Icon size={14} style={{ color: OR }} />
            </div>
            <div>
              <p className="font-bold text-[12px] leading-tight text-navy dark:text-white transition-colors">{value}</p>
              <p className="text-[10px] mt-0.5 text-slate-400 dark:text-white/45 transition-colors">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROPERTY CATEGORIES
══════════════════════════════════════════════════════════════════════════ */


function Categories({ counts = {} }) {
  const navigate = useNavigate();
  const [cardSize, setCardSize] = useState({ width: 340, height: 340 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardSize({ width: 265, height: 265 });
      } else if (window.innerWidth < 1024) {
        setCardSize({ width: 300, height: 300 });
      } else {
        setCardSize({ width: 340, height: 340 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCount = (cName) => {
    if (counts && counts[cName] !== undefined) return counts[cName];
    if (counts) {
      const alt = cName.replace('Luxury ', '');
      if (counts[alt] !== undefined) return counts[alt];
    }
    return 0;
  };

  const slides = categories.map((c) => ({
    image: { src: c.image, alt: c.name },
    title: `${c.name}\n${getCount(c.name)} Listings`,
    id: c.id
  }));

  const handleActiveClick = (slide) => {
    navigate(`/properties?category=${slide.id}`);
  };

  return (
    <section className="bg-[#FAFAF8] dark:bg-navy-dark transition-colors duration-300 py-16">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <div className="flex items-center gap-2.5 mb-4 justify-center">
            <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase" style={{ color: '#B8860B' }}>Browse by Type</span>
            <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(270deg, #B8860B, transparent)' }} />
          </div>
          <div className="font-display font-bold leading-[1.1] text-navy dark:text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Property <span style={{ color: '#B8860B' }}>Collections</span>
          </div>
        </div>

        {/* Mobile / Tablet view (< 1024px): Clean static grid showing all category boxes without 3D animation */}
        <div className="grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5 w-full">
          {categories.map((c) => {
            const count = getCount(c.name);
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/properties?category=${c.id}`)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-card border border-gray-100 dark:border-white/10 active:scale-[0.98] transition-transform"
              >
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent flex flex-col justify-end p-4 text-left">
                  <h3 className="font-display font-bold text-white text-base leading-tight">{c.name}</h3>
                  <p className="text-gold text-xs font-semibold mt-1" style={{ color: '#B8860B' }}>
                    {count} {count === 1 ? 'Listing' : 'Listings'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop view (>= 1024px): 3D Smooth Slideshow 100% unchanged */}
        <div className="hidden lg:flex h-[380px] items-center justify-center relative select-none overflow-hidden w-full">
          <Smooth3DSlideshow
            slides={slides}
            cardWidth={cardSize.width}
            cardHeight={cardSize.height}
            radius={3}
            tilt={10}
            sideTilt={6}
            gap={9}
            opacity={50}
            autoplay={true}
            transition={{ type: "tween", duration: 0.6, delay: 3.5 }}
            titleFont={{ fontSize: cardSize.width < 300 ? 16 : 22, fontWeight: 800 }}
            onActiveClick={handleActiveClick}
          />
        </div>
      </div>
    </section>
  );
}



function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

function createCardCanvas(reraBadgeImg, brandName, logoAbbr) {
  // Extract capital letters from brandName (e.g. KinProperty -> KP, HyperRelestix -> HR)
  const brandInitials = brandName
    ? brandName.replace(/[^A-Z]/g, '').slice(0, 3)
    : 'HR';

  const displayAbbr = (logoAbbr && logoAbbr.length <= 3)
    ? logoAbbr
    : (brandInitials || 'HR');

  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Clip rounded corners for card aspect ratio (32px border radius -> 64px on 2x scale)
  ctx.beginPath();
  ctx.roundRect(0, 0, 960, 720, 64);
  ctx.clip();

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 960, 720);
  bgGrad.addColorStop(0, '#071626');
  bgGrad.addColorStop(1, '#0c223c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 960, 720);

  // Gold Radial Glow in Top Right
  const glowGrad = ctx.createRadialGradient(960, 0, 0, 960, 0, 500);
  glowGrad.addColorStop(0, 'rgba(184, 134, 11, 0.22)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, 960, 720);

  // Top header divider line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 200);
  ctx.lineTo(880, 200);
  ctx.stroke();

  // RERA DOCUMENT AUDIT header in gold
  ctx.fillStyle = "#B8860B";
  ctx.font = "bold 20px 'Outfit', 'Inter', sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("RERA DOCUMENT AUDIT", 80, 80);

  // Title in White
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 38px 'Outfit', 'Inter', sans-serif";
  ctx.fillText("Pune Market Intelligence", 80, 120);

  // Quote Text
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "500 28px 'Inter', sans-serif";
  const quoteText = `"${brandName} operates with complete legal compliance and fiduciary responsibility, ensuring every transaction is completely RERA-verified."`;
  wrapText(ctx, quoteText, 80, 260, 800, 44);

  // Bottom Divider
  ctx.beginPath();
  ctx.moveTo(80, 520);
  ctx.lineTo(880, 520);
  ctx.stroke();

  // Bottom Advisory Seal - HR circle
  ctx.fillStyle = "rgba(184, 134, 11, 0.12)";
  ctx.beginPath();
  ctx.arc(130, 610, 44, 0, 2 * Math.PI);
  ctx.fill();

  ctx.strokeStyle = "rgba(184, 134, 11, 0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(130, 610, 44, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#B8860B";
  ctx.font = "bold 24px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(displayAbbr, 130, 610);
  ctx.textAlign = "left";

  // Advisory Board Titles
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px 'Outfit', sans-serif";
  ctx.fillText("Advisory Board", 200, 580);

  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 16px 'Outfit', sans-serif";
  ctx.fillText("FEMA & TAX COMPLIANCE AUDITED", 200, 620);

  // Draw Gold Badge Seal Image in Top Right
  if (reraBadgeImg) {
    ctx.drawImage(reraBadgeImg, 760, 60, 110, 110);
  }

  return canvas;
}

/* ══════════════════════════════════════════════════════════════════════════
   WHY US (ACCORDION WITH IMAGE REVEAL / FLOATING TABS)
   ══════════════════════════════════════════════════════════════════════════ */
function WhyUs() {
  const { settings } = useSiteSettings();
  const brandName = getBrandName(settings);
  const logoAbbr = getLogoInitials(settings);


  const [activeTab, setActiveTab] = useState(0);
  const [cardTexture, setCardTexture] = useState(null);
  const [stickerSize, setStickerSize] = useState({ width: 480, height: 360 });

  useEffect(() => {
    const handleResize = () => {
      const w = Math.min(window.innerWidth - 32, 480);
      const h = (w * 3) / 4;
      setStickerSize({ width: w, height: h });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const badgeImg = new Image();
    badgeImg.crossOrigin = "anonymous";
    badgeImg.onload = () => {
      if (cancelled) return;
      const canvas = createCardCanvas(badgeImg, brandName, logoAbbr);
      if (canvas) setCardTexture(canvas);
    };
    badgeImg.onerror = () => {
      if (cancelled) return;
      const canvas = createCardCanvas(null, brandName, logoAbbr);
      if (canvas) setCardTexture(canvas);
    };
    badgeImg.src = reraBadge;
    return () => { cancelled = true; };
  }, [brandName, logoAbbr]);

  const items = [
    {
      title: 'RERA-Verified Portfolio Only',
      desc: 'We enforce 100% legal verification. Every penthouse, villa, and apartment has undergone RERA verification and full title registration audit before hitting our platform.',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: 'Elite Advisory Network',
      desc: 'Our real estate advisors have 15+ years of deep luxury market intelligence. We consult on legal due diligence, tax structures, FEMA compliance, and property valuations.',
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: 'Seamless Remote Execution',
      desc: 'Specifically designed for remote buyers and NRI investors. Video walkthroughs, remote PoA logistics, digital contracts, and absolute security at every stage.',
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="w-full max-w-xl mx-auto lg:max-w-none">
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase" style={{ color: '#B8860B' }}>Why {brandName}</span>
              </div>
              <div className="font-display font-bold leading-[1.1] mb-5 text-navy dark:text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Setting the Standard in <span style={{ color: '#B8860B' }}>Advisory</span>
              </div>
              <p className="font-body text-base leading-[1.9] max-w-xl text-ink-muted dark:text-white/60">
                We do not just list properties. We provide a full-service, secure transactional ecosystem built on transparency.
              </p>
            </div>

            <div className="space-y-4 w-full">
              {items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-full box-border p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${activeTab === i
                    ? 'bg-gold/5 border-gold/30 dark:bg-gold/[0.03]'
                    : 'bg-transparent border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10'
                    }`}
                >

                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeTab === i ? 'bg-gold/25 text-gold-dark dark:text-gold' : 'bg-black/5 dark:bg-white/5 text-ink-muted'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={`font-display font-bold text-sm md:text-base leading-none transition-colors mb-2.5 ${activeTab === i ? 'text-navy dark:text-white font-extrabold' : 'text-ink-muted dark:text-cream/80'}`}>
                        {item.title}
                      </h3>
                      {activeTab === i && (
                        <p className="text-ink-muted dark:text-white/60 text-xs leading-relaxed mt-2 animate-fade-in">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic illustrative elements */}
          <div className="w-full max-w-[480px] mx-auto">
            {/* Mobile view (< 1024px): Clean static RERA Audit Card (No canvas peel animation) */}
            <div className="lg:hidden w-full rounded-[28px] p-6 text-left relative overflow-hidden shadow-luxury border border-white/10"
              style={{ background: 'linear-gradient(145deg, #071626 0%, #0c223c 100%)' }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle at 100% 0%, rgba(184, 134, 11, 0.22) 0%, transparent 70%)' }} />

              <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                <div>
                  <p className="text-[#B8860B] font-bold text-xs font-display uppercase tracking-wider mb-1">RERA DOCUMENT AUDIT</p>
                  <h3 className="text-white font-display font-bold text-xl leading-tight">Pune Market Intelligence</h3>
                </div>
                <img src={reraBadge} alt="RERA Gold Badge" className="w-14 h-14 object-contain shrink-0" />
              </div>

              <div className="h-px bg-white/10 my-4" />

              <p className="text-white/85 text-xs font-body leading-relaxed mb-4 italic relative z-10">
                "{brandName} operates with complete legal compliance and fiduciary responsibility, ensuring every transaction is completely RERA-verified."
              </p>

              <div className="h-px bg-white/10 my-4" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs text-gold border border-gold/30 bg-gold/10 shrink-0" style={{ color: '#B8860B' }}>
                  {logoAbbr || 'HR'}
                </div>
                <div>
                  <p className="text-white font-display font-bold text-sm leading-none">Advisory Board</p>
                  <p className="text-white/40 text-[9px] font-bold tracking-wider uppercase mt-1">FEMA & TAX COMPLIANCE AUDITED</p>
                </div>
              </div>
            </div>

            {/* Desktop view (>= 1024px): Interactive 3D Sticker Peeling canvas animation 100% unchanged */}
            <div className="hidden lg:flex relative aspect-[4/3] w-full max-w-[480px] mx-auto select-none items-center justify-center overflow-visible">
              {cardTexture ? (
                <StickerPeeling
                  image={cardTexture}
                  imageWidth={stickerSize.width}
                  imageHeight={stickerSize.height}
                  curlRotation={220}
                  hoverPeel={26}
                  pressPeel={45}
                  backColor="#C5A028"
                  shadowEnabled={true}
                  style={{ width: `${stickerSize.width}px`, height: `${stickerSize.height}px`, willChange: 'transform' }}
                />
              ) : (
                <div className="w-full h-full aspect-[4/3] rounded-[32px] bg-mesh-dark animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BUYING JOURNEY (STAGGERED STEPS)
══════════════════════════════════════════════════════════════════════════ */
function BuyingJourney() {
  const steps = [
    { num: '01', title: 'Consultation & Shortlisting', desc: 'Connect with a senior advisor to discuss FEMA guidelines, tax parameters, and view immersive RERA-verified options.' },
    { num: '02', title: 'Virtual Tours & Auditing', desc: 'Inspect property dimensions, locality metrics, and title registry documents via video streaming and digital assets.' },
    { num: '03', title: 'Escrow & Title Transfer', desc: 'Secure remittances directly via NRE/NRO banking channels. Our legal team drafts digital contracts and manages registration.' },
  ];

  return (
    <section className="bg-[#FAFAF8] dark:bg-navy-dark transition-colors duration-300 pt-10 pb-20">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2.5 mb-4 justify-center">
            <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase" style={{ color: '#B8860B' }}>The Transaction Process</span>
            <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(270deg, #B8860B, transparent)' }} />
          </div>
          <div className="font-display font-bold leading-[1.1] text-navy dark:text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Your Journey, <span style={{ color: '#B8860B' }}>Simplified</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="rounded-3xl p-8 border border-gray-100 dark:border-white/5 shadow-sm relative h-full flex flex-col justify-between bg-white dark:bg-navy transition-colors duration-300">
              <div>
                <p className="font-display font-black text-gold/25 text-4xl mb-6">{s.num}</p>
                <h3 className="font-display font-bold text-navy dark:text-white text-lg mb-3">{s.title}</h3>
                <p className="text-ink-muted dark:text-white/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] text-ink-soft dark:text-white/40 uppercase tracking-wider font-bold">Secure Phase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   ADVISORS (PROFESSIONAL GRID)
══════════════════════════════════════════════════════════════════════════ */
function Advisors() {
  const [team, setTeam] = useState(agents);

  useEffect(() => {
    fetchAdvisors()
      .then(data => { if (data && data.length > 0) setTeam(data); })
      .catch(err => console.warn('Could not load advisors:', err));
  }, []);

  const GOLD = '#A67A08';

  return (
    <section
      className="bg-white dark:bg-navy-dark transition-colors duration-300"
      style={{ padding: '72px 0 64px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center mb-10">
          <div className="flex items-center gap-2.5 mb-4 justify-center">
            <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase" style={{ color: GOLD }}>Meet the Team</span>
            <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(270deg, #B8860B, transparent)' }} />
          </div>
          <div className="font-display font-bold leading-[1.1] mb-5 text-navy dark:text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Our <span style={{ color: GOLD }}>Advisors</span>
          </div>
          <p className="font-body text-base leading-[1.9] mx-auto max-w-2xl text-ink-muted dark:text-white/60">
            Pune's most trusted real estate specialists — each with a decade+ of proven expertise.
          </p>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 32,
          marginTop: 40,
        }}>
          {team.map((advisor, i) => (
            <div
              key={advisor.name || i}
              style={{ width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  width: 180, height: 180, borderRadius: '50%',
                  overflow: 'hidden', marginBottom: 20, flexShrink: 0,
                  border: `2.5px solid ${GOLD}30`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  cursor: 'default',
                }}
              >
                {advisor.image ? (
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 48, fontWeight: 800, color: GOLD, background: `${GOLD}12`,
                  }}>
                    {(advisor.name || 'A')[0]}
                  </div>
                )}
              </motion.div>

              {/* Name */}
              <p
                className="text-navy dark:text-white"
                style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 6, lineHeight: 1.3 }}
              >
                {advisor.name}
              </p>

              {/* Role */}
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
                {advisor.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   WHAT YOU CAN EXPECT
   Launch version — no testimonials API call / no placeholder reviews
══════════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const expectations = [
    {
      icon: CheckCircle2,
      title: 'Easy to Use',
      text: 'A simple experience designed to make listing and discovering properties easier.',
    },
    {
      icon: Shield,
      title: 'More Transparency',
      text: 'Clear property information to help you make better and more confident decisions.',
    },
    {
      icon: Award,
      title: 'Built for Everyone',
      text: 'Whether you are an owner, buyer, tenant, or broker, the platform is designed around your needs.',
    },
  ];

  return (
    <section className="bg-white dark:bg-navy-dark transition-colors duration-300 py-20">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center mb-11">
          <div>
            <div className="flex items-center gap-2.5 mb-4 justify-center">
              <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
              <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase" style={{ color: '#B8860B' }}>What You Can Expect</span>
              <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(270deg, #B8860B, transparent)' }} />
            </div>
            <div className="font-display font-bold leading-[1.1] mb-5 text-navy dark:text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
              A Better Way to <span style={{ color: '#B8860B' }}>Navigate Property</span>
            </div>
            <p className="font-body text-base leading-[1.9] mx-auto max-w-2xl text-ink-muted dark:text-white/60">
              We are building a simpler, more transparent property experience for owners, buyers, tenants, and brokers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-7 max-w-5xl mx-auto">
          {expectations.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="rounded-3xl p-7 md:p-8 border border-gray-100 dark:border-white/5 bg-white dark:bg-navy shadow-sm hover:-translate-y-1 hover:shadow-luxury transition-transform duration-300 will-change-transform"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(184,134,11,0.10)', color: '#B8860B' }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-navy dark:text-white text-lg mb-3 transition-colors">
                {title}
              </h3>
              <p className="text-ink-muted dark:text-white/60 text-sm leading-relaxed transition-colors">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DEVELOPER PARTNERS (DYNAMIC)
══════════════════════════════════════════════════════════════════════════ */
function DeveloperPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const getPartners = async () => {
      try {
        const list = await fetchPartners();
        if (active) setPartners(list || []);
      } catch (err) {
        console.error('Failed to load partners:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    getPartners();
    return () => { active = false; };
  }, []);

  if (loading || partners.length === 0) return null;

  // Double the array for infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <section className="bg-[#FAFAF8] dark:bg-navy transition-colors duration-300 py-16 border-t border-b border-gray-150 dark:border-white/5">
      <div className="container-luxury mb-10 text-center">
        <p className="text-[11px] font-accent text-gold font-bold tracking-[0.28em] uppercase mb-2">
          Premium Developer Partners
        </p>
        <p className="text-ink-muted dark:text-white/60 text-sm font-body">We work exclusively with India's most trusted developers</p>
        <div className="h-[2px] w-12 bg-gold/50 mx-auto mt-3 rounded-full" />
      </div>
      <div className="relative overflow-hidden py-2">
        <div className="flex gap-6 animate-scroll whitespace-nowrap w-max hover:[animation-play-state:paused] py-2">
          {doubled.map((d, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center px-8 py-4.5 rounded-2xl border border-gray-200 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 group cursor-pointer bg-white dark:bg-navy-light shadow-sm"
            >
              <span className="font-display font-extrabold text-sm tracking-widest uppercase transition-colors duration-300 text-slate-400 dark:text-white/40" style={{ color: "" }}>
                {d.name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10 bg-gradient-to-r from-[#FAFAF8] dark:from-navy to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10 bg-gradient-to-l from-[#FAFAF8] dark:from-navy to-transparent" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════════════════════════════════════ */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!email) { setError('Please enter your email address.'); return; }
    if (!name) { setError('Please enter your name.'); return; }
    if (!phone) { setError('Please enter your phone number.'); return; }
    setError('');
    setLoading(true);
    try {
      await submitEnquiry({
        type: 'newsletter',
        name,
        phone,
        email,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FDF8EE] dark:bg-navy transition-colors duration-300 py-16 relative overflow-hidden">
      <KineticGrid background="transparent" lineColor="rgba(201,162,39,0.08)" dotColor="rgba(184,134,11,0.15)" spacing={50} radius={200} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"
        style={{ background: 'radial-gradient(ellipse, rgba(201,162,39,0.08) 0%, transparent 65%)' }} />
      <div className="container-luxury relative text-center">
        <div>
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <span className="h-px w-8 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #A67A08)' }} />
            <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase" style={{ color: '#A67A08' }}>Stay Informed</span>
            <span className="h-px w-8 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #A67A08)' }} />
          </div>
          <h2 className="font-display font-black leading-tight mb-5 text-navy dark:text-white transition-colors" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Get Exclusive <span style={{ color: '#A67A08' }}>Luxury Property</span> Alerts
          </h2>
          <p className="max-w-lg mx-auto font-body mb-10 leading-relaxed text-slate-500 dark:text-white/60 transition-colors" style={{}}>
            Be first to know about new luxury listings, market insights, and investment opportunities from India's premium locations — curated weekly.
          </p>

          {submitted ? (
            <div className="max-w-md mx-auto py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{ background: 'linear-gradient(135deg, #A67A08, #C9940A)', boxShadow: '0 0 30px rgba(201,162,39,0.25)' }}>
                ✓
              </div>
              <p className="font-display font-bold text-lg mb-1 text-navy dark:text-white transition-colors" style={{}}>You're subscribed!</p>
              <p className="text-sm text-slate-500 dark:text-white/60 transition-colors" style={{}}>You'll receive our next luxury property update soon.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              <input
                type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter full name"
                className="px-5 py-4 rounded-2xl font-body text-sm focus:outline-none transition-all duration-200 bg-white dark:bg-navy border border-[#EDE8DF] dark:border-white/10 text-navy dark:text-white focus:border-gold dark:focus:border-gold"
                style={{}}
              />
              <input
                type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter mobile number"
                className="px-5 py-4 rounded-2xl font-body text-sm focus:outline-none transition-all duration-200 bg-white dark:bg-navy border border-[#EDE8DF] dark:border-white/10 text-navy dark:text-white focus:border-gold dark:focus:border-gold"
                style={{}}
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address"
                  className="flex-1 px-5 py-4 rounded-2xl font-body text-sm focus:outline-none transition-all duration-200 bg-white dark:bg-navy border border-[#EDE8DF] dark:border-white/10 text-navy dark:text-white focus:border-gold dark:focus:border-gold"
                  style={{}}
                />
                <button onClick={handleSubscribe} disabled={loading} className="btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl">
                  {loading ? 'Subscribing…' : <> Subscribe <ArrowRight className="w-4 h-4" /> </>}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs text-left px-1">{error}</p>}
            </div>
          )}

          <p className="text-xs mt-5" style={{ color: '#94A3B8' }}>No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [counts, setCounts] = useState({ typeCounts: {}, localityCounts: {} });

  useEffect(() => {
    let active = true;
    // Run fetchPropertyCounts in parallel — don't block on sequential awaits
    fetchPropertyCounts()
      .then((data) => { if (active) setCounts(data); })
      .catch((err) => console.error('Failed to load dynamic counts:', err));
    return () => { active = false; };
  }, []);

  return (
    <div className="home-page overflow-x-clip min-h-full">
      <style>{`
        .home-page {
          overscroll-behavior-y: auto;
        }
@media (prefers-reduced-motion: reduce) { .home-page { scroll-behavior: auto; } }
      `}</style>
      <SEO
        title="Luxury Real Estate Pune | Premium Villas & Apartments"
        description="Discover Pune's most exclusive luxury homes. RERA-verified premium villas, apartments, and penthouses in Koregaon Park, Baner, Kharadi, and Viman Nagar."
        url="/"
      />
      <Hero />
      <ServicesStrip />
      <PropertyOwnerBrokerBanner />
      <Testimonials />
      <Advisors />
      <AppDownload />

      <BlogPreview />
    </div>
  );
}