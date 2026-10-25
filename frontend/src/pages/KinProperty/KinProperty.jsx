import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BsArrowLeft,
  BsArrowRight,
  BsArrowDown,
  BsClipboardData,
  BsGrid1X2,
  BsCalendarCheck,
  BsPhone,
  BsPersonFill,
  BsGeoAltFill,
  BsBriefcaseFill,
  BsCheckCircleFill,
  BsStars,
  BsBoxSeam,
  BsMapFill,
  BsShieldCheck,
  BsSearch,
  BsPaletteFill,
  BsCodeSlash,
  BsGoogle,
  BsCameraReelsFill,
  BsChatDotsFill,
  BsBuildings,
  BsLightningChargeFill,
  BsXCircleFill,
  BsExclamationCircleFill,
  BsShieldLockFill,
  BsStarFill,
  BsBoxArrowUpRight,
  BsDisplay,
  BsFilter,
  BsWhatsapp,
  BsSpeedometer2,
  BsPinMapFill,
  BsQrCode,
  BsTelephoneFill,
  BsInstagram,
  BsFacebook,
  BsPlayFill,
  BsEyeFill,
  BsHeartFill,
  BsSendFill,
  BsMusicNoteBeamed
} from 'react-icons/bs'
import styles from './KinProperty.module.css'
import {
  ChapterBridgeArrowDoodle
} from './components/Decorations'
import PhoneMockup from './components/PhoneMockup'
import {
  ScreenListingDiscovery,
  ScreenAgentCrm,
  ScreenPropertyDetail,
  ScreenEmployeeApp
} from './components/KinPhoneMockups'

export default function KinProperty() {
  const navigate = useNavigate()
  const [activeWebTab, setActiveWebTab] = React.useState(0)

  // Smooth scroll handler for Snapshot Cards & Chapter anchors
  const scrollToChapter = (e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  // Scroll to chapter on initial mount if hash is in URL
  React.useEffect(() => {
    if (window.location.hash) {
      let id = window.location.hash.replace('#', '');
      if (id === 'chapter-4-seo') id = 'chapter-4-gbp';
      if (id === 'chapter-5-content') id = 'chapter-5-social';
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, []);

  // 👉 Hero Phone Mockup Cloudinary Screenshots
  const heroMockupImages = {
    1: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792863186/homepage_dlafct.png',
    2: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792863185/propertypage_gwxqyg.png',
    3: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792863185/propertydetail_caxt7m.png'
  }
  const [heroImgErrors, setHeroImgErrors] = React.useState({ 1: false, 2: false, 3: false })

  // WhatsFlow Interactive App Mode ('employee' | 'admin')
  const [wfAppTab, setWfAppTab] = React.useState('employee')
  const [wfImgErrors, setWfImgErrors] = React.useState({ employee: false, admin: false })
  const employeeAppImg = 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792919800/employee__whatsFlow.jpg_uxcuon.jpg'
  const adminAppImg = 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792917399/admin_whatsFlow.jpg_pcyu3j.jpg'

  const webPages = [
    {
      id: 'homepage',
      tabLabel: '01 · Homepage',
      tagIcon: <BsDisplay className={styles.featureTagIcon} />,
      tagText: 'Page 01 • Homepage & Locality Search',
      tagColor: '#071A2F',
      tagBg: '#EFF6FF',
      title: 'Homepage & 1-Tap Locality Search',
      desc: 'Clean, fast homepage with 1-tap filters for prime Pune localities like Baner, Wakad, and Kharadi.',
      bullets: [
        '1-tap chips for top Pune localities (Baner, Wakad, Kharadi)',
        'Featured listings with verified photos and pricing',
        'Fast mobile-first layout optimized for quick browsing'
      ],
      metric: '1-Tap Access to Pune Localities',
      image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792865394/kin-pc-home_xfaki5.png',
      alt: 'KIN Property PC Homepage'
    },
    {
      id: 'listings',
      tabLabel: '02 · Search & Grid',
      tagIcon: <BsFilter className={styles.featureTagIcon} />,
      tagText: 'Page 02 • Search & Listing Filters',
      tagColor: '#2563EB',
      tagBg: '#EFF6FF',
      title: 'Property Search & Live Filters',
      desc: 'Instant filters for Buy or Rent, BHK type, and budget with real-time updates and zero page reload.',
      bullets: [
        'Filters for Buy, Rent, BHK type, and budget range',
        'Clear pricing with no hidden charges',
        'Availability status tags on every listing'
      ],
      metric: 'Instant Filter Updates',
      image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792865833/kin_property_listing_dashboard_4k_sra3ry.png',
      alt: 'KIN Property Search & Listing Dashboard'
    },
    {
      id: 'details',
      tabLabel: '03 · Property Detail',
      tagIcon: <BsWhatsapp className={styles.featureTagIcon} />,
      tagText: 'Page 03 • Verified Details & WhatsApp',
      tagColor: '#16A34A',
      tagBg: '#DCFCE7',
      title: 'Verified Property Details & WhatsApp Chat',
      desc: 'Full property details on one page: photo gallery, verified RERA number, carpet area, and direct WhatsApp contact.',
      bullets: [
        'Photo galleries and floor plan breakdowns',
        'Verified RERA registration numbers and exact carpet area',
        '1-click WhatsApp button with pre-filled property reference'
      ],
      metric: '1-Click Direct WhatsApp Connect',
      image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792867570/kin_property_listing_final_4k_uxxys5.png',
      alt: 'KIN Property Verified Detail Page'
    }
  ]

  return (
    <div className={styles.page}>
      <div className={styles.caseStudyContainer}>

        {/* Back navigation */}
        <div className={styles.topNav}>
          <button
            onClick={() => navigate('/case-studies')}
            className={styles.backBtn}
            aria-label="Back to Case Studies"
          >
            <BsArrowLeft />
            <span>Back to Case Studies</span>
          </button>
        </div>

        {/* ==================================================================
            HERO SHOWCASE CANVAS: 3 Parallel S24 Ultra Mobile Mockups
            ================================================================== */}
        <section className={styles.heroSection}>
          <div className={styles.heroGrid}>

            {/* --- Left Column: Eyebrow + Title + Narrative + CTAs + Meta Summary + Doodles --- */}
            <div className={styles.heroLeft}>
              {/* Eyebrow: Case Study Badge */}
              <div className={styles.eyebrowBadge}>
                <span className={styles.eyebrowDot} />
                <span className={styles.eyebrowBadgeText}>CASE STUDY · REAL ESTATE</span>
              </div>

              {/* Editorial Title */}
              <h1 className={styles.heroMainTitle}>
                <span className={styles.titleLine}>Building KIN Property&apos;s</span>
                <span className={styles.titleLineGradient}>Digital Presence</span>
                <span className={styles.titleLine}>from Scratch.</span>
              </h1>

              {/* Narrative Paragraph */}
              <p className={styles.heroNarrative}>
                How VeltaZ built the complete digital setup for <strong>KIN Property Management</strong> in Pune — brand identity, custom website (kinpropertymanagement.com), local Google SEO, Instagram property reels, and an internal WhatsApp lead tool.
              </p>

              {/* CTAs Row */}
              <div className={styles.heroCtaRow}>
                <a href="#project-snapshot" className={styles.primaryCtaBtn}>
                  <span>Explore the Journey</span>
                  <BsArrowDown className={styles.ctaIconBounce} />
                </a>
                <button onClick={() => navigate('/contact')} className={styles.secondaryCtaBtn}>
                  <span>Discuss Your Project</span>
                  <BsArrowRight />
                </button>
              </div>

              {/* Project Meta Summary Grid (2x2) */}
              <div className={styles.heroMetaStrip}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>CLIENT</span>
                  <span className={styles.metaValue}>KIN Property Management</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>LOCATION</span>
                  <span className={styles.metaValue}>Pune, Maharashtra</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>DELIVERABLES</span>
                  <span className={styles.metaValue}>Brand · Website · SEO · Reels · CRM</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>STATUS</span>
                  <span className={styles.metaBadge}>
                    <span className={styles.statusPulseDot} />
                    Live &amp; Active
                  </span>
                </div>
              </div>
            </div>

            {/* --- Right Column: 3 Parallel S24 Ultra Mobile Phones --- */}
            <div className={styles.heroRight}>
              {/* Tilted Stage: 3 Parallel S24 Ultra Mobile Phones (Same Size) */}
              <div className={styles.tiltedMockupStage}>
                {/* Column 1: S24 Ultra Mockup — Homepage Discovery */}
                <div className={styles.column1}>
                  <PhoneMockup>
                    {!heroImgErrors[1] ? (
                      <img
                        src={heroMockupImages[1]}
                        alt="KIN Property Mobile Homepage"
                        className={styles.heroPhoneImg}
                        onError={() => setHeroImgErrors(prev => ({ ...prev, 1: true }))}
                      />
                    ) : (
                      <ScreenListingDiscovery />
                    )}
                  </PhoneMockup>
                </div>

                {/* Column 2: S24 Ultra Mockup — Property Search & Grid */}
                <div className={styles.column2}>
                  <PhoneMockup>
                    {!heroImgErrors[2] ? (
                      <img
                        src={heroMockupImages[2]}
                        alt="KIN Property Listings Grid"
                        className={styles.heroPhoneImg}
                        onError={() => setHeroImgErrors(prev => ({ ...prev, 2: true }))}
                      />
                    ) : (
                      <ScreenAgentCrm />
                    )}
                  </PhoneMockup>
                </div>

                {/* Column 3: S24 Ultra Mockup — Property Detail Page */}
                <div className={styles.column3}>
                  <PhoneMockup>
                    {!heroImgErrors[3] ? (
                      <img
                        src={heroMockupImages[3]}
                        alt="KIN Property Detail Page"
                        className={styles.heroPhoneImg}
                        onError={() => setHeroImgErrors(prev => ({ ...prev, 3: true }))}
                      />
                    ) : (
                      <ScreenPropertyDetail />
                    )}
                  </PhoneMockup>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================================
            SECTION 3: THE WORK AT A GLANCE (Project Snapshot)
            ================================================================== */}
        <section id="project-snapshot" className={styles.snapshotSection}>
          <div className={styles.snapshotHeader}>
            <div className={styles.snapshotBadge}>
              <BsLightningChargeFill className={styles.snapshotBadgeIcon} />
              <span>OVERVIEW</span>
            </div>
            <h2 className={styles.snapshotTitle}>
              Scope of Work
            </h2>
            <p className={styles.snapshotSubtitle}>
              What VeltaZ delivered for KIN Property across 6 core pillars:
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className={styles.snapshotGrid}>
            <a
              href="#chapter-1-research"
              onClick={(e) => scrollToChapter(e, 'chapter-1-research')}
              className={styles.snapshotCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>01</span>
                <div className={styles.cardIconBox}><BsSearch /></div>
              </div>
              <h3 className={styles.cardTitle}>Market Research</h3>
              <p className={styles.cardDesc}>
                Audited Pune broker practices and identified buyer pain points around portal spam and slow response times.
              </p>
              <div className={styles.cardLink}>
                <span>View Research</span>
                <BsArrowRight />
              </div>
            </a>

            <a
              href="#chapter-2-brand"
              onClick={(e) => scrollToChapter(e, 'chapter-2-brand')}
              className={styles.snapshotCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>02</span>
                <div className={styles.cardIconBox}><BsPaletteFill /></div>
              </div>
              <h3 className={styles.cardTitle}>Brand Identity</h3>
              <p className={styles.cardDesc}>
                Designed a new logo, color palette, typography, and brand assets for print and digital use.
              </p>
              <div className={styles.cardLink}>
                <span>View Branding</span>
                <BsArrowRight />
              </div>
            </a>

            <a
              href="#chapter-3-website"
              onClick={(e) => scrollToChapter(e, 'chapter-3-website')}
              className={styles.snapshotCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>03</span>
                <div className={styles.cardIconBox}><BsCodeSlash /></div>
              </div>
              <h3 className={styles.cardTitle}>Website Development</h3>
              <p className={styles.cardDesc}>
                Built kinpropertymanagement.com with verified listings, locality search, and 1-click WhatsApp inquiry.
              </p>
              <div className={styles.cardLink}>
                <span>View Website</span>
                <BsArrowRight />
              </div>
            </a>

            <a
              href="#chapter-4-gbp"
              onClick={(e) => scrollToChapter(e, 'chapter-4-gbp')}
              className={styles.snapshotCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>04</span>
                <div className={styles.cardIconBox}><BsGoogle /></div>
              </div>
              <h3 className={styles.cardTitle}>Google Business &amp; Local SEO</h3>
              <p className={styles.cardDesc}>
                Set up and verified Google Business Profile to rank on Google Maps for local property searches.
              </p>
              <div className={styles.cardLink}>
                <span>View Local SEO</span>
                <BsArrowRight />
              </div>
            </a>

            <a
              href="#chapter-5-social"
              onClick={(e) => scrollToChapter(e, 'chapter-5-social')}
              className={styles.snapshotCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>05</span>
                <div className={styles.cardIconBox}><BsCameraReelsFill /></div>
              </div>
              <h3 className={styles.cardTitle}>Property Walkthrough Reels</h3>
              <p className={styles.cardDesc}>
                Scripted, shot, and edited property walkthrough reels on Instagram, generating 700K+ organic views.
              </p>
              <div className={styles.cardLink}>
                <span>View Reels</span>
                <BsArrowRight />
              </div>
            </a>

            <a
              href="#chapter-6-whatsflow"
              onClick={(e) => scrollToChapter(e, 'chapter-6-whatsflow')}
              className={styles.snapshotCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>06</span>
                <div className={styles.cardIconBox}><BsChatDotsFill /></div>
              </div>
              <h3 className={styles.cardTitle}>WhatsFlow Lead Tool</h3>
              <p className={styles.cardDesc}>
                Built an internal tool for employees to receive website inquiries and respond on WhatsApp within seconds.
              </p>
              <div className={styles.cardLink}>
                <span>View WhatsFlow</span>
                <BsArrowRight />
              </div>
            </a>
          </div>
        </section>

        {/* ==================================================================
            CHAPTER 1: THE FOUNDATION — MARKET AUDIT & COMPETITOR BENCHMARK
            ================================================================== */}
        <section id="chapter-1-research" className={styles.chapterSection}>
          <div className={styles.chapterHeader}>
            <div className={styles.chapterTagBadge}>
              <span className={styles.chapterNumber}>CHAPTER 01</span>
              <span className={styles.chapterTagDivider}>&bull;</span>
              <span>MARKET RESEARCH</span>
            </div>
            <h2 className={styles.chapterHeading}>
              Market Research &amp; Competitor Audit
            </h2>
            <p className={styles.chapterSubtitle}>
              We researched the Pune property market to understand why buyers drop off on major property portals. We identified three main problems:
            </p>

            {/* Micro-Market Tags Row */}
            <div className={styles.microMarketsRow}>
              <span className={styles.microMarketLabel}>Key Localities Audited:</span>
              <div className={styles.microMarketsList}>
                <span className={styles.marketChip}>Hinjawadi IT Corridor</span>
                <span className={styles.marketChip}>Baner &amp; Balewadi</span>
                <span className={styles.marketChip}>Wakad</span>
                <span className={styles.marketChip}>Kharadi</span>
                <span className={styles.marketChip}>Koregaon Park</span>
              </div>
            </div>
          </div>

          {/* 3 Core Market Blindspots / Discovery Cards */}
          <div className={styles.blindspotsGrid}>
            <div className={styles.blindspotCard}>
              <div className={styles.blindspotHeader}>
                <span className={styles.blindspotNum}>01</span>
                <div className={styles.blindspotIconWrap} style={{ background: '#FEE2E2', color: '#DC2626' }}>
                  <BsXCircleFill />
                </div>
              </div>
              <h3 className={styles.blindspotTitle}>Portal Spam Calls</h3>
              <p className={styles.blindspotDesc}>
                National portals sell buyer contact info to multiple brokers. One inquiry often leads to 15–20 unwanted spam calls, frustrating serious buyers.
              </p>
              <div className={styles.blindspotStatPill}>
                <span>Buyers abandon portals due to spam calls</span>
              </div>
            </div>

            <div className={styles.blindspotCard}>
              <div className={styles.blindspotHeader}>
                <span className={styles.blindspotNum}>02</span>
                <div className={styles.blindspotIconWrap} style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <BsExclamationCircleFill />
                </div>
              </div>
              <h3 className={styles.blindspotTitle}>Slow Response Times</h3>
              <p className={styles.blindspotDesc}>
                Pune buyers expect quick replies on WhatsApp. Traditional agencies often take hours or days to respond, losing interested clients to other brokers.
              </p>
              <div className={styles.blindspotStatPill}>
                <span>Delayed responses cause high lead drop-off</span>
              </div>
            </div>

            <div className={styles.blindspotCard}>
              <div className={styles.blindspotHeader}>
                <span className={styles.blindspotNum}>03</span>
                <div className={styles.blindspotIconWrap} style={{ background: '#E0E7FF', color: '#4338CA' }}>
                  <BsShieldLockFill />
                </div>
              </div>
              <h3 className={styles.blindspotTitle}>Inaccurate Details</h3>
              <p className={styles.blindspotDesc}>
                Buyers waste weekends visiting properties only to find incorrect pricing, pending approvals, or carpet areas smaller than advertised.
              </p>
              <div className={styles.blindspotStatPill}>
                <span>Lack of verified property details upfront</span>
              </div>
            </div>
          </div>

          {/* Strategic Synthesis Bridge: Market Research to Brand System */}
          <div className={styles.chapterBridgeWrap}>
            <div className={styles.chapterBridgeCard}>
              <div className={styles.bridgeEyebrow}>
                <span className={styles.bridgeDot} />
                <span>KEY TAKEAWAY</span>
              </div>
              <h3 className={styles.bridgeTitle}>
                What KIN Needed: Direct Connect &amp; Verified Listings
              </h3>
              <p className={styles.bridgeDesc}>
                To stand out in Pune, KIN needed a professional brand and a fast website showing only genuine listings, with zero spam calls and instant WhatsApp communication.
              </p>

              <div className={styles.bridgePillarsRow}>
                <div className={styles.bridgePillar}>
                  <BsShieldCheck className={styles.bridgePillarIcon} />
                  <span>Verified Listings</span>
                </div>
                <div className={styles.bridgePillar}>
                  <BsLightningChargeFill className={styles.bridgePillarIcon} />
                  <span>Direct WhatsApp Contact</span>
                </div>
                <div className={styles.bridgePillar}>
                  <BsCheckCircleFill className={styles.bridgePillarIcon} />
                  <span>Professional Brand</span>
                </div>
              </div>
            </div>

            {/* Hand-drawn Connecting Arrow pointing cleanly into Chapter 2 */}
            <div className={styles.bridgeArrowHolder}>
              <ChapterBridgeArrowDoodle className={styles.bridgeArrowSvg} />
            </div>
          </div>

        </section>



        {/* ==================================================================
            CHAPTER 2: BRAND IDENTITY & DESIGN SYSTEM
            ================================================================== */}
        <section id="chapter-2-brand" className={`${styles.chapterSection} ${styles.chapter2Section}`}>
          <div className={styles.chapterHeader}>
            <div className={styles.chapterTagBadge}>
              <span className={styles.chapterNumber}>CHAPTER 02</span>
              <span className={styles.chapterTagDivider}>&bull;</span>
              <span>BRAND IDENTITY</span>
            </div>
            <h2 className={styles.chapterHeading}>
              Brand Identity &amp; Design System
            </h2>
            <p className={styles.chapterSubtitle}>
              We replaced KIN&apos;s old generic branding with a clean, professional identity designed for credibility and recognition across Pune.
            </p>
          </div>

          {/* Brand Transformation (Before vs After) */}
          <div className={styles.beforeAfterWrapper}>
            <div className={styles.beforeAfterCard}>
              <div className={styles.beforeCol}>
                <div className={styles.evolutionBadge} style={{ background: '#FEE2E2', color: '#DC2626' }}>
                  <span>BEFORE &bull; OLD BRANDING</span>
                </div>
                <div className={styles.beforeVisualPreview}>
                  <div className={styles.legacyLogoBox}>
                    <div className={styles.legacyRoofIcon}>⌂</div>
                    <div className={styles.legacyText}>KIN PROPERTY</div>
                    <div className={styles.legacySub}>Deals &bull; Rent &bull; Sale</div>
                  </div>
                </div>
                <ul className={styles.evolutionList}>
                  <li>Generic clip-art roof icon used by local roadside brokers.</li>
                  <li>Dull maroon and grey colors with poor contrast.</li>
                  <li>Default system fonts (Calibri / Arial) with no visual hierarchy.</li>
                  <li>No consistent style across print, boardings, or social media.</li>
                </ul>
              </div>

              <div className={styles.afterCol}>
                <div className={styles.evolutionBadge} style={{ background: '#EFF6FF', color: '#3157E8' }}>
                  <span>AFTER &bull; NEW IDENTITY</span>
                </div>
                <div className={styles.afterVisualPreview}>
                  <div className={styles.flagshipLogoBox}>
                    <img
                      src="/logo/kin-logo.png"
                      alt="KIN Property Monogram"
                      className={styles.flagshipLogoImg}
                    />
                    <div className={styles.flagshipBrandInfo}>
                      <div className={styles.flagshipTitle}>KIN</div>
                      <div className={styles.flagshipSubtitle}>PROPERTY MANAGEMENT</div>
                    </div>
                  </div>
                </div>
                <ul className={styles.evolutionList}>
                  <li>Custom geometric logo symbol crafted for KIN Property.</li>
                  <li>Deep Navy (#071A2F) and Gold (#D4AF37) brand palette.</li>
                  <li>Modern typography (Manrope &amp; Plus Jakarta Sans).</li>
                  <li>Standardized brand guidelines for website, cards, and site boards.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* DESIGN SYSTEM & STYLE GUIDE                                     */}
          {/* ============================================================== */}
          <div className={styles.dsContainer}>

            {/* Unified Header: Style Guide */}
            <div className={styles.dsHeader}>
              <div className={styles.dsHeadingWrap}>
                <h3 className={styles.dsHeading}>
                  <span className={styles.styleBlueWord}>Style</span> Guide
                </h3>
                <div className={styles.dsCloudDoodle}>
                  <svg viewBox="0 0 48 36" fill="none">
                    <path d="M12 28C7.58 28 4 24.42 4 20C4 16.03 6.9 12.74 10.7 12.11C11.9 6.96 16.5 3 22 3C27.94 3 32.85 7.54 33.58 13.31C37.21 13.92 40 17.08 40 20.91C40 25.38 36.38 29 31.91 29L12 28Z" fill="#E0F2FE" />
                  </svg>
                </div>
              </div>
              <p className={styles.dsSubtitle}>
                Typography and color specifications used across all KIN digital assets.
              </p>
            </div>

            {/* Sub-Section 1: Typography */}
            <div className={styles.origSubSection}>
              <div className={styles.sectionSubHeader}>
                <h5 className={styles.sectionBarTitle}>
                  <span className={styles.blueBar}>|</span> <span className={styles.blueWord}>Typography</span> System
                </h5>
                <p className={styles.sectionSubDesc}>
                  <em>Manrope</em> for clean headlines, <em>Plus Jakarta Sans</em> for readable property details, and <em>Space Grotesk</em> for pricing and specs.
                </p>
              </div>

              <div className={styles.typographyShowcase}>
                {/* Left: Aa Glyph */}
                <div className={styles.typeGlyphCol}>
                  <span className={styles.typeFontTitle}>Manrope</span>
                  <div className={styles.typeAaInteractive}>
                    <span className={styles.aaText} style={{ fontFamily: 'Manrope, sans-serif' }}>Aa</span>
                    <span className={styles.aaBlueCircle} />
                  </div>
                </div>

                {/* Middle: Headline & Body Specs */}
                <div className={styles.typeSpecsCol}>
                  <div className={styles.typeSpecRow}>
                    <span className={styles.specName}>Headlines</span>
                    <div className={styles.specDetails}>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Font</span>
                        <span className={styles.specDetailVal}>Manrope</span>
                      </div>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Weight</span>
                        <span className={styles.specDetailVal}>Bold / SemiBold</span>
                      </div>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Size</span>
                        <span className={styles.specDetailVal}>32px / 20px</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.typeSpecRow}>
                    <span className={styles.specName}>Body Text</span>
                    <div className={styles.specDetails}>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Font</span>
                        <span className={styles.specDetailVal}>Plus Jakarta Sans</span>
                      </div>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Weight</span>
                        <span className={styles.specDetailVal}>Regular / Medium</span>
                      </div>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Size</span>
                        <span className={styles.specDetailVal}>15px / 14px</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.typeSpecRow}>
                    <span className={styles.specName}>Metrics &amp; Tags</span>
                    <div className={styles.specDetails}>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Font</span>
                        <span className={styles.specDetailVal}>Space Grotesk</span>
                      </div>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Weight</span>
                        <span className={styles.specDetailVal}>Medium</span>
                      </div>
                      <div className={styles.specDetailItem}>
                        <span className={styles.specDetailLabel}>Size</span>
                        <span className={styles.specDetailVal}>12px / 11px</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Decorative Concentric Rings */}
                <div className={styles.typeRingsDecor}>
                  <svg viewBox="0 0 160 320" fill="none">
                    <circle cx="160" cy="160" r="140" stroke="#fde68a" strokeWidth="2" />
                    <circle cx="160" cy="160" r="105" stroke="#fde68a" strokeWidth="2" />
                    <circle cx="160" cy="160" r="70" stroke="#fde68a" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sub-Section 2: Color Palette */}
            <div className={styles.origSubSection}>
              <div className={styles.sectionSubHeader}>
                <h5 className={styles.sectionBarTitle}>
                  <span className={styles.blueBar}>|</span> <span className={styles.blueWord}>Color</span> Palette
                </h5>
                <p className={styles.sectionSubDesc}>
                  Deep Navy primary (#071A2F) paired with Warm Gold (#D4AF37), Royal Blue (#1E3A8A), and clean light background surfaces (#F4F0EA).
                </p>
              </div>

              <div className={styles.colorPaletteShowcase}>
                <div className={styles.paletteContainer}>
                  {/* Left: Primary Color Swatch */}
                  <div className={styles.primaryColorBlock}>
                    <span className={styles.primaryColorLabel}>Navy Primary</span>
                    <span className={styles.primaryColorHex}>#071A2F</span>
                  </div>

                  {/* Right: 6 Secondary Swatches Grid */}
                  <div className={styles.swatchesGrid}>
                    <div className={styles.swatchItem} style={{ background: '#D4AF37' }}>
                      <span className={styles.swatchTextLight} style={{ color: '#030E1B', fontWeight: 700 }}>#D4AF37 · Gold</span>
                    </div>
                    <div className={styles.swatchItem} style={{ background: '#0E2B4A' }}>
                      <span className={styles.swatchTextLight}>#0E2B4A · Navy Lt</span>
                    </div>
                    <div className={styles.swatchItem} style={{ background: '#E8C84A' }}>
                      <span className={styles.swatchTextDark} style={{ color: '#030E1B', fontWeight: 700 }}>#E8C84A · Gold Lt</span>
                    </div>
                    <div className={styles.swatchItem} style={{ background: '#1E3A8A' }}>
                      <span className={styles.swatchTextLight}>#1E3A8A · Royal</span>
                    </div>
                    <div className={styles.swatchItem} style={{ background: '#1A1A2E' }}>
                      <span className={styles.swatchTextLight}>#1A1A2E · Deep Ink</span>
                    </div>
                    <div className={styles.swatchItem} style={{ background: '#F4F0EA', border: '1px solid #E2E8F0' }}>
                      <span className={styles.swatchTextDark}>#F4F0EA · Surface</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hand-drawn Connecting Arrow pointing cleanly into Chapter 3 */}
          <div className={styles.bridgeArrowHolder} style={{ marginTop: '28px', marginBottom: '-8px' }}>
            <ChapterBridgeArrowDoodle className={styles.bridgeArrowSvg} />
          </div>

        </section>

        {/* ============================================================== */}
        {/* CHAPTER 3: WEBSITE DESIGN & DEVELOPMENT                         */}
        {/* ============================================================== */}
        <section id="chapter-3-website" className={`${styles.chapterSection} ${styles.chapter3Section}`}>
          <div className={styles.chapterHeader}>
            <div className={styles.chapterTagBadge}>
              <span className={styles.chapterNumber}>CHAPTER 03</span>
              <span className={styles.chapterTagDivider}>&bull;</span>
              <span>WEBSITE DEVELOPMENT</span>
            </div>
            <h2 className={styles.chapterHeading}>
              Custom Website: kinpropertymanagement.com
            </h2>
            <p className={styles.chapterSubtitle}>
              We designed and developed a fast, mobile-friendly website with verified listings, locality search, and 1-click WhatsApp contact.
            </p>
          </div>

          {/* 5-Stage Progression Stepper */}
          <div className={styles.pipelineStepperWrap}>
            <div className={styles.pipelineStepItem}>
              <div className={styles.stepNumBadge}>01</div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>Step 01</span>
                <h4 className={styles.stepTitle}>Requirements</h4>
                <p className={styles.stepDesc}>Identified buyer needs &amp; pain points</p>
              </div>
            </div>
            <div className={styles.pipelineArrow}>&rarr;</div>

            <div className={styles.pipelineStepItem}>
              <div className={styles.stepNumBadge}>02</div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>Step 02</span>
                <h4 className={styles.stepTitle}>Wireframes</h4>
                <p className={styles.stepDesc}>Page structure &amp; user journey flows</p>
              </div>
            </div>
            <div className={styles.pipelineArrow}>&rarr;</div>

            <div className={styles.pipelineStepItem}>
              <div className={styles.stepNumBadge}>03</div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>Step 03</span>
                <h4 className={styles.stepTitle}>UI Design</h4>
                <p className={styles.stepDesc}>Figma design system &amp; mockups</p>
              </div>
            </div>
            <div className={styles.pipelineArrow}>&rarr;</div>

            <div className={styles.pipelineStepItem}>
              <div className={styles.stepNumBadge}>04</div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>Step 04</span>
                <h4 className={styles.stepTitle}>Development</h4>
                <p className={styles.stepDesc}>Frontend build &amp; WhatsApp routing</p>
              </div>
            </div>
            <div className={styles.pipelineArrow}>&rarr;</div>

            <div className={`${styles.pipelineStepItem} ${styles.stepLiveActive}`}>
              <div className={styles.stepNumBadgeLive}>05</div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabelLive}>Step 05 &bull; LIVE</span>
                <h4 className={styles.stepTitleLive}>Live Website</h4>
                <p className={styles.stepDesc}>kinpropertymanagement.com</p>
              </div>
            </div>
          </div>

          {/* Interactive 3-Tab Web Platform Switcher (Compact View) */}
          <div className={styles.webTabsContainer}>
            {/* Tab Selection Navigation Bar */}
            <div className={styles.webTabBar}>
              {webPages.map((page, idx) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setActiveWebTab(idx)}
                  className={`${styles.webTabBtn} ${activeWebTab === idx ? styles.webTabBtnActive : ''}`}
                >
                  <span className={styles.webTabPillNum}>0{idx + 1}</span>
                  <span className={styles.webTabTitleText}>
                    {page.tabLabel.split('·')[1]?.trim() || page.tabLabel}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Page Showcase View (Single Compact Row) */}
            <div key={webPages[activeWebTab].id} className={styles.webTabActiveContent}>
              <div className={styles.featureRow}>
                <div className={styles.featureContentCol}>
                  <div
                    className={styles.featureTag}
                    style={{ color: webPages[activeWebTab].tagColor, background: webPages[activeWebTab].tagBg }}
                  >
                    {webPages[activeWebTab].tagIcon}
                    <span>{webPages[activeWebTab].tagText}</span>
                  </div>
                  <h3 className={styles.featureTitle}>
                    {webPages[activeWebTab].title}
                  </h3>
                  <p className={styles.featureDesc}>
                    {webPages[activeWebTab].desc}
                  </p>
                  <div className={styles.featureCheckList}>
                    {webPages[activeWebTab].bullets.map((b, i) => (
                      <div key={i} className={styles.featureCheckItem}>
                        <BsCheckCircleFill
                          className={styles.checkIcon}
                          style={{ color: webPages[activeWebTab].tagColor }}
                        />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className={styles.featureMetricChip}
                    style={{ borderLeftColor: webPages[activeWebTab].tagColor }}
                  >
                    <BsStars
                      className={styles.metricChipIcon}
                      style={{ color: webPages[activeWebTab].tagColor }}
                    />
                    <span>{webPages[activeWebTab].metric}</span>
                  </div>
                </div>

                <div className={styles.featureMockupCol}>
                  <div
                    className={styles.mockupAmbientGlow}
                    style={{
                      background: `radial-gradient(circle, ${activeWebTab === 0
                        ? 'rgba(7, 26, 47, 0.20)'
                        : activeWebTab === 1
                          ? 'rgba(37, 99, 235, 0.20)'
                          : 'rgba(22, 163, 74, 0.18)'
                        } 0%, transparent 70%)`
                    }}
                  />
                  <div className={styles.showcaseBrowserCard}>
                    <div className={styles.browserHeaderBar}>
                      <div className={styles.browserDots}>
                        <span className={styles.dotClose} />
                        <span className={styles.dotMin} />
                        <span className={styles.dotMax} />
                      </div>
                      <div className={styles.browserUrlPill}>
                        <span className={styles.browserLockIcon}>🔒</span>
                        <span className={styles.browserUrlText}>
                          {activeWebTab === 0
                            ? 'kinpropertymanagement.com'
                            : activeWebTab === 1
                              ? 'kinpropertymanagement.com/properties'
                              : 'kinpropertymanagement.com/properties/devachi-uruli'}
                        </span>
                      </div>
                    </div>
                    <img
                      src={webPages[activeWebTab].image}
                      alt={webPages[activeWebTab].alt}
                      className={styles.showcaseBrowserImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Mobile Responsiveness & Production Deployment Card */}
          <div className={styles.deploymentCard}>
            <div className={styles.deploymentContent}>
              <div className={styles.liveStatusBadge}>
                <span className={styles.livePulseDot} />
                <span>LIVE IN PRODUCTION</span>
              </div>
              <h3 className={styles.deploymentTitle}>
                Fast, Mobile-First Web Experience
              </h3>
              <p className={styles.deploymentDesc}>
                Engineered to load smoothly on smartphones across Pune&apos;s mobile networks, with simple navigation and zero clutter.
              </p>

              <div className={styles.deploymentSpecsGrid}>
                <div className={styles.deploymentSpecItem}>
                  <BsPhone className={styles.specIcon} />
                  <div>
                    <h5 className={styles.specHeading}>100% Mobile Responsive</h5>
                    <p className={styles.specText}>Optimized for phone screens and quick browsing</p>
                  </div>
                </div>
                <div className={styles.deploymentSpecItem}>
                  <BsSpeedometer2 className={styles.specIcon} />
                  <div>
                    <h5 className={styles.specHeading}>Fast Loading Speed</h5>
                    <p className={styles.specText}>Clean code and optimized property photos</p>
                  </div>
                </div>
                <div className={styles.deploymentSpecItem}>
                  <BsShieldCheck className={styles.specIcon} />
                  <div>
                    <h5 className={styles.specHeading}>Direct WhatsApp Contact</h5>
                    <p className={styles.specText}>Chat with brokers without signup forms or spam</p>
                  </div>
                </div>
              </div>

              <div className={styles.deploymentActionRow}>
                <a
                  href="https://kinpropertymanagement.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveSiteBtn}
                >
                  <span>Visit kinpropertymanagement.com</span>
                  <BsBoxArrowUpRight className={styles.btnIconExternal} />
                </a>
                <span className={styles.liveSiteNote}>
                  Live client website &bull; Designed &amp; built by VeltaZ
                </span>
              </div>
            </div>
          </div>

          {/* Hand-drawn Connecting Arrow pointing cleanly into Chapter 4 */}
          <div className={styles.bridgeArrowOnlyWrap}>
            <ChapterBridgeArrowDoodle className={styles.bridgeArrowSvg} />
          </div>

        </section>

        {/* ============================================================== */}
        {/* CHAPTER 4: GOOGLE BUSINESS PROFILE & LOCAL SEARCH              */}
        {/* ============================================================== */}
        <section id="chapter-4-gbp" className={`${styles.chapterSection} ${styles.chapter4Section}`}>
          <span id="chapter-4-seo" style={{ position: 'absolute', top: 0 }} />
          <div className={styles.chapterHeader}>
            <div className={styles.chapterTagBadge}>
              <span className={styles.chapterNumber}>CHAPTER 04</span>
              <span className={styles.chapterTagDivider}>&bull;</span>
              <span>LOCAL SEO &amp; GOOGLE MAPS</span>
            </div>
            <h2 className={styles.chapterHeading}>
              Google Business Profile &amp; Local Search
            </h2>
            <p className={styles.chapterSubtitle}>
              We set up and optimized KIN&apos;s Google Business Profile so local buyers and tenants in Pune can find and contact them directly on Google Maps.
            </p>
          </div>

          <div className={styles.gbpCompactGrid}>
            {/* Left: Google Search / Maps Knowledge Panel Mockup */}
            <div className={styles.gbpMockupCard}>
              <div className={styles.gbpMockupHeader}>
                <div className={styles.googleBrandBadge}>
                  <BsGoogle className={styles.googleIcon} />
                  <span>Google Business Profile &bull; Verified</span>
                </div>
                <div className={styles.liveRankingBadge}>
                  <span className={styles.rankDot} />
                  <span>Rank #1 &bull; Local 3-Pack</span>
                </div>
              </div>

              <div className={styles.gbpBusinessProfile}>
                <h3 className={styles.gbpBusinessName}>KIN Property Management</h3>
                <div className={styles.gbpRatingRow}>
                  <span className={styles.ratingScore}>4.9</span>
                  <div className={styles.starsRow}>
                    <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
                  </div>
                  <span className={styles.reviewCount}>(48 Google Reviews)</span>
                </div>
                <p className={styles.gbpCategory}>
                  Property Management &bull; Hadapsar, Pune
                </p>
                <p className={styles.gbpAddressLine}>
                  Megacenter, Magarpatta Road, Hadapsar, Pune 411013
                </p>
              </div>

              {/* Quick Actions Row */}
              <div className={styles.gbpActionsGrid}>
                <a
                  href="tel:+917498366577"
                  className={styles.gbpActionBtn}
                  title="Call KIN Property"
                >
                  <BsTelephoneFill className={styles.actionIcon} />
                  <span>Call</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Megacenter+Magarpatta+Hadapsar+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.gbpActionBtn}
                  title="Directions to KIN Office"
                >
                  <BsGeoAltFill className={styles.actionIcon} />
                  <span>Directions</span>
                </a>
                <a
                  href="https://kinpropertymanagement.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.gbpActionBtn}
                  title="Visit Website"
                >
                  <BsBoxArrowUpRight className={styles.actionIcon} />
                  <span>Website</span>
                </a>
                <a
                  href="https://wa.me/917498366577?text=Hi%20KIN%20Property,%20I%20found%20you%20on%20Google"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.gbpActionBtn} ${styles.gbpActionWhatsapp}`}
                  title="Chat on WhatsApp"
                >
                  <BsWhatsapp className={styles.actionIcon} />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Micro-Market Corridors Preview */}
              <div className={styles.gbpCorridorsBox}>
                <div className={styles.corridorLabel}>Primary Coverage Areas:</div>
                <div className={styles.corridorTags}>
                  <span className={styles.corridorTag}>📍 Magarpatta &amp; Hadapsar</span>
                  <span className={styles.corridorTag}>📍 Kharadi &amp; Viman Nagar</span>
                  <span className={styles.corridorTag}>📍 Koregaon Park</span>
                  <span className={styles.corridorTag}>📍 Baner &amp; Balewadi</span>
                </div>
              </div>
            </div>

            {/* Right: 3 Execution Highlights */}
            <div className={styles.gbpStrategyCol}>
              <div className={styles.gbpCardList}>
                <div className={styles.gbpHighlightCard}>
                  <div className={styles.gbpIconHolder}>
                    <BsPinMapFill />
                  </div>
                  <div className={styles.gbpHighlightContent}>
                    <h4 className={styles.gbpHighlightTitle}>Verified Profile Setup</h4>
                    <p className={styles.gbpHighlightDesc}>
                      Correct business name, office address, contact numbers, and verified categories for Pune property management.
                    </p>
                  </div>
                </div>

                <div className={styles.gbpHighlightCard}>
                  <div className={styles.gbpIconHolder}>
                    <BsQrCode />
                  </div>
                  <div className={styles.gbpHighlightContent}>
                    <h4 className={styles.gbpHighlightTitle}>Review Collection System</h4>
                    <p className={styles.gbpHighlightDesc}>
                      Simple WhatsApp links and QR stands at site viewings to gather genuine 5-star reviews from satisfied clients.
                    </p>
                  </div>
                </div>

                <div className={styles.gbpHighlightCard}>
                  <div className={styles.gbpIconHolder}>
                    <BsLightningChargeFill />
                  </div>
                  <div className={styles.gbpHighlightContent}>
                    <h4 className={styles.gbpHighlightTitle}>Direct WhatsApp Contact</h4>
                    <p className={styles.gbpHighlightDesc}>
                      Direct WhatsApp chat button on Google Maps so high-intent buyers can reach the KIN team without middleman portals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hand-drawn Connecting Arrow pointing cleanly into Chapter 5 */}
          <div className={styles.bridgeArrowOnlyWrap}>
            <ChapterBridgeArrowDoodle className={styles.bridgeArrowSvg} />
          </div>
        </section>

        {/* ============================================================== */}
        {/* CHAPTER 5: SOCIAL MEDIA & CONTENT PRODUCTION                    */}
        {/* ============================================================== */}
        <section id="chapter-5-social" className={`${styles.chapterSection} ${styles.chapter5Section}`}>
          <span id="chapter-5-content" style={{ position: 'absolute', top: 0 }} />
          <div className={styles.chapterHeader}>
            <div className={styles.chapterTagBadge}>
              <span className={styles.chapterNumber}>CHAPTER 05</span>
              <span className={styles.chapterTagDivider}>&bull;</span>
              <span>PROPERTY REELS &amp; INSTAGRAM</span>
            </div>
            <h2 className={styles.chapterHeading}>
              Property Walkthrough Reels &amp; Content
            </h2>
            <p className={styles.chapterSubtitle}>
              We planned, scripted, and shot short-form property walkthrough reels for Instagram, helping KIN achieve 700K+ organic views without paid ads.
            </p>
          </div>

          <div className={styles.socialCompactGrid}>
            {/* Left Column: Authentic S24 Ultra Phone Reel Mockup */}
            <div className={styles.socialPhoneCol}>
              <div className={styles.socialPhoneFrame}>
                <PhoneMockup>
                  <img
                    src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792868990/kin-insta_goevsd.jpg"
                    alt="KIN Property Instagram Profile &amp; Reels"
                    className={styles.phoneScreenImg}
                  />
                </PhoneMockup>
              </div>
            </div>

            {/* Right Column: Profile Meta + 3 Strategy Cards + Workflow + Metrics Ribbon */}
            <div className={styles.socialStrategyCol}>
              <div className={styles.socialProfileMetaBar}>
                <div className={styles.socialAccountMeta}>
                  <div className={styles.socialAvatarHolder}>
                    <BsInstagram className={styles.socialAvatarIcon} />
                  </div>
                  <div>
                    <div className={styles.socialHandleRow}>
                      <span className={styles.socialHandle}>@kinpropertymanagement</span>
                      <BsCheckCircleFill className={styles.verifiedCheck} />
                    </div>
                    <span className={styles.socialSubtext}>Real Estate Agency &bull; Pune, Maharashtra</span>
                  </div>
                </div>
                {/* 5-Step Workflow Ribbon */}
                <div className={styles.contentWorkflowStrip}>
                  <span className={styles.workflowStep}>IDEA</span>
                  <span className={styles.workflowArrow}>&rarr;</span>
                  <span className={styles.workflowStep}>SCRIPT</span>
                  <span className={styles.workflowArrow}>&rarr;</span>
                  <span className={styles.workflowStep}>SHOOT</span>
                  <span className={styles.workflowArrow}>&rarr;</span>
                  <span className={styles.workflowStep}>EDIT</span>
                  <span className={styles.workflowArrow}>&rarr;</span>
                  <span className={`${styles.workflowStep} ${styles.workflowPublish}`}>PUBLISH</span>
                </div>
              </div>

              <div className={styles.socialCardList}>
                <div className={styles.socialHighlightCard}>
                  <div className={styles.socialIconHolder}>
                    <BsCameraReelsFill />
                  </div>
                  <div className={styles.socialHighlightContent}>
                    <h4 className={styles.socialHighlightTitle}>Hindi &amp; English Hook Scripts</h4>
                    <p className={styles.socialHighlightDesc}>
                      Short opening hooks stating price, BHK, and location in the first 3 seconds to keep viewers engaged.
                    </p>
                  </div>
                </div>

                <div className={styles.socialHighlightCard}>
                  <div className={styles.socialIconHolder}>
                    <BsLightningChargeFill />
                  </div>
                  <div className={styles.socialHighlightContent}>
                    <h4 className={styles.socialHighlightTitle}>On-Site Video Shoots</h4>
                    <p className={styles.socialHighlightDesc}>
                      Clear walkthrough footage showing real room layouts, natural lighting, and actual views to build trust.
                    </p>
                  </div>
                </div>

                <div className={styles.socialHighlightCard}>
                  <div className={styles.socialIconHolder}>
                    <BsChatDotsFill />
                  </div>
                  <div className={styles.socialHighlightContent}>
                    <h4 className={styles.socialHighlightTitle}>WhatsApp CTA in Bio &amp; DMs</h4>
                    <p className={styles.socialHighlightDesc}>
                      Direct call-to-actions sending interested buyers straight to WhatsApp for property brochures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Verified Social Metrics Ribbon */}
              <div className={styles.socialMetricsRibbon}>
                <div className={styles.socialMetricItem}>
                  <span className={styles.socialMetricNum}>700K+</span>
                  <span className={styles.socialMetricLabel}>Organic Video Views</span>
                </div>
                <div className={styles.socialMetricDivider} />
                <div className={styles.socialMetricItem}>
                  <span className={styles.socialMetricNum}>1K+</span>
                  <span className={styles.socialMetricLabel}>Instagram Followers</span>
                </div>
                <div className={styles.socialMetricDivider} />
                <div className={styles.socialMetricItem}>
                  <span className={styles.socialMetricNum}>Zero</span>
                  <span className={styles.socialMetricLabel}>Paid Ad Spend</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connecting Arrow: Chapter 5 → Chapter 6 */}
        <div className={styles.bridgeArrowOnlyWrap}>
          <ChapterBridgeArrowDoodle className={styles.bridgeArrowSvg} />
        </div>

        {/* ============================================================== */}
        {/* CHAPTER 6: WHATSFLOW & LEAD-MANAGEMENT SYSTEMS                 */}
        {/* ============================================================== */}
        <section id="chapter-6-whatsflow" className={`${styles.chapterSection} ${styles.chapter6Section}`}>
          <div className={styles.chapterHeader}>
            <div className={styles.chapterTagBadge}>
              <span className={styles.chapterNumber}>CHAPTER 06</span>
              <span className={styles.chapterTagDivider}>&bull;</span>
              <span>WHATSFLOW LEAD TOOL</span>
            </div>
            <h2 className={styles.chapterHeading}>
              WhatsFlow: Internal Lead Management Tool
            </h2>
            <p className={styles.chapterSubtitle}>
              We built an internal tool for KIN&apos;s team to receive website inquiries on WhatsApp and manage follow-ups without losing leads.
            </p>
          </div>

          <div className={styles.wfCompactGrid}>
            {/* Left Column: Platform Bar + App Switcher + Feature Cards + Metrics */}
            <div className={styles.wfStrategyCol}>

              {/* Platform Meta Bar */}
              <div className={styles.wfPlatformBar}>
                <div className={styles.wfPlatformIcon}>
                  <BsGrid1X2 />
                </div>
                <div>
                  <div className={styles.wfPlatformName}>WhatsFlow Lead Tool</div>
                  <div className={styles.wfPlatformSub}>Instant alerts &bull; WhatsApp replies &bull; Pipeline tracking</div>
                </div>
                <div className={styles.wfStatusPill}>
                  <span className={styles.wfStatusDot} />
                  <span>INTERNAL TOOL</span>
                </div>
              </div>

              {/* Interactive App Mode Switcher */}
              <div className={styles.wfAppSwitcherBar}>
                <button
                  type="button"
                  onClick={() => setWfAppTab('employee')}
                  className={`${styles.wfAppSwitchBtn} ${wfAppTab === 'employee' ? styles.wfAppSwitchBtnActive : ''}`}
                >
                  <BsPersonFill size={14} color={wfAppTab === 'employee' ? '#16A34A' : '#64748B'} />
                  <span>01 &bull; Employee Mobile App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWfAppTab('admin')}
                  className={`${styles.wfAppSwitchBtn} ${wfAppTab === 'admin' ? styles.wfAppSwitchBtnActive : ''}`}
                >
                  <BsShieldCheck size={14} color={wfAppTab === 'admin' ? '#2563EB' : '#64748B'} />
                  <span>02 &bull; Admin Overview</span>
                </button>
              </div>

              {/* Dynamic Feature Banner */}
              <div className={styles.wfAppBanner}>
                <span className={`${styles.wfAppBadge} ${wfAppTab === 'admin' ? styles.wfAppBadgeAdmin : ''}`}>
                  {wfAppTab === 'employee' ? 'EMPLOYEE VIEW' : 'ADMIN VIEW'}
                </span>
                <h3 className={styles.wfAppTitle}>
                  {wfAppTab === 'employee'
                    ? 'Field Employee Lead Notifications'
                    : 'Admin Overview & Lead Assignment'}
                </h3>
                <p className={styles.wfAppDesc}>
                  {wfAppTab === 'employee'
                    ? 'Whenever a buyer inquires on the website, the assigned employee receives an instant WhatsApp alert with property name, budget, and contact info.'
                    : 'Agency heads can view all incoming leads, assign brokers, and ensure every inquiry gets a quick response.'}
                </p>
              </div>

              {/* 3 Focused Feature Cards */}
              <div className={styles.wfCardList}>
                {wfAppTab === 'employee' ? (
                  <>
                    <div className={styles.wfFeatureCard}>
                      <div className={styles.wfFeatureIconBox}>
                        <BsLightningChargeFill />
                      </div>
                      <div className={styles.wfFeatureContent}>
                        <h4 className={styles.wfFeatureTitle}>Instant Lead Alerts</h4>
                        <p className={styles.wfFeatureDesc}>
                          Website inquiries land on the employee&apos;s phone within seconds with full property context.
                        </p>
                      </div>
                    </div>

                    <div className={styles.wfFeatureCard}>
                      <div className={styles.wfFeatureIconBox}>
                        <BsWhatsapp />
                      </div>
                      <div className={styles.wfFeatureContent}>
                        <h4 className={styles.wfFeatureTitle}>1-Tap WhatsApp Replies</h4>
                        <p className={styles.wfFeatureDesc}>
                          Quick reply templates to send brochures and schedule site visits directly.
                        </p>
                      </div>
                    </div>

                    <div className={styles.wfFeatureCard}>
                      <div className={styles.wfFeatureIconBox}>
                        <BsCalendarCheck />
                      </div>
                      <div className={styles.wfFeatureContent}>
                        <h4 className={styles.wfFeatureTitle}>Lead Status Pipeline</h4>
                        <p className={styles.wfFeatureDesc}>
                          Easily update lead status: New &rarr; Contacted &rarr; Site Visit &rarr; Closed.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.wfFeatureCard}>
                      <div className={`${styles.wfFeatureIconBox} ${styles.wfFeatureIconBoxAdmin}`}>
                        <BsBuildings />
                      </div>
                      <div className={styles.wfFeatureContent}>
                        <h4 className={styles.wfFeatureTitle}>Locality-Based Routing</h4>
                        <p className={styles.wfFeatureDesc}>
                          Assign incoming leads to employees based on property location (Baner, Wakad, Kharadi).
                        </p>
                      </div>
                    </div>

                    <div className={styles.wfFeatureCard}>
                      <div className={`${styles.wfFeatureIconBox} ${styles.wfFeatureIconBoxAdmin}`}>
                        <BsChatDotsFill />
                      </div>
                      <div className={styles.wfFeatureContent}>
                        <h4 className={styles.wfFeatureTitle}>Team Broadcasts</h4>
                        <p className={styles.wfFeatureDesc}>
                          Send internal announcements or price updates to all employees simultaneously.
                        </p>
                      </div>
                    </div>

                    <div className={styles.wfFeatureCard}>
                      <div className={`${styles.wfFeatureIconBox} ${styles.wfFeatureIconBoxAdmin}`}>
                        <BsClipboardData />
                      </div>
                      <div className={styles.wfFeatureContent}>
                        <h4 className={styles.wfFeatureTitle}>Follow-up Tracking</h4>
                        <p className={styles.wfFeatureDesc}>
                          Monitor response times and follow-up status to ensure no lead is missed.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Metrics Ribbon */}
              <div className={styles.wfMetricsRibbon}>
                <div className={styles.wfMetricItem}>
                  <span className={styles.wfMetricNum}>&lt; 1 min</span>
                  <span className={styles.wfMetricLabel}>Lead Alert Time</span>
                </div>
                <div className={styles.wfMetricDivider} />
                <div className={styles.wfMetricItem}>
                  <span className={styles.wfMetricNum}>100%</span>
                  <span className={styles.wfMetricLabel}>Inquiries Logged</span>
                </div>
                <div className={styles.wfMetricDivider} />
                <div className={styles.wfMetricItem}>
                  <span className={styles.wfMetricNum}>Zero</span>
                  <span className={styles.wfMetricLabel}>Lost Leads</span>
                </div>
              </div>

            </div>

            {/* Right Column: Phone Mockup */}
            <div className={styles.wfPhoneCol}>
              {/* Phone Switcher Tabs: Employee App & Admin App */}
              <div className={styles.wfPhoneModeTabs}>
                <button
                  type="button"
                  onClick={() => setWfAppTab('employee')}
                  className={`${styles.wfModeTabBtn} ${wfAppTab === 'employee' ? styles.wfModeTabBtnActive : ''}`}
                >
                  <BsPersonFill size={13} color={wfAppTab === 'employee' ? '#16A34A' : '#64748B'} />
                  <span>Employee App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWfAppTab('admin')}
                  className={`${styles.wfModeTabBtn} ${wfAppTab === 'admin' ? styles.wfModeTabBtnActive : ''}`}
                >
                  <BsShieldCheck size={13} color={wfAppTab === 'admin' ? '#2563EB' : '#64748B'} />
                  <span>Admin App</span>
                </button>
              </div>

              {/* Phone Frame */}
              <div className={styles.wfPhoneFrame}>
                <PhoneMockup>
                  {!wfImgErrors[wfAppTab] ? (
                    <img
                      src={wfAppTab === 'employee' ? employeeAppImg : adminAppImg}
                      alt={wfAppTab === 'employee' ? 'WhatsFlow Employee App Screenshot' : 'WhatsFlow Admin App Screenshot'}
                      className={styles.phoneScreenImg}
                      onError={() => setWfImgErrors(prev => ({ ...prev, [wfAppTab]: true }))}
                    />
                  ) : (
                    wfAppTab === 'employee' ? <ScreenEmployeeApp /> : <ScreenAgentCrm />
                  )}
                </PhoneMockup>
              </div>

              <div className={styles.wfPhoneCaption}>
                <span className={styles.wfModeDot} style={{ background: wfAppTab === 'employee' ? '#16A34A' : '#2563EB' }} />
                <span>Live View: {wfAppTab === 'employee' ? 'Employee Mobile Tool' : 'Admin Management Hub'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* THE CONNECTED SYSTEM & STRATEGIC RESULTS                       */}
        {/* ============================================================== */}
        <section id="chapter-7-connected" className={`${styles.chapterSection} ${styles.chapter7Section}`}>
          <div className={styles.grandFinaleHeader}>
            <div className={styles.ecosystemBadge}>
              <span className={styles.ecosystemBadgeDot} />
              <span>PROJECT SUMMARY &bull; HOW IT WORKS TOGETHER</span>
            </div>
            <h2 className={styles.grandFinaleHeading}>
              How Every Piece <span className={styles.headingAccentGradient}>Works Together</span>
            </h2>
            <p className={styles.grandFinaleSubtitle}>
              From the first Google search or Instagram reel to the website visit and WhatsApp follow-up, every part works as one connected setup.
            </p>
          </div>

          {/* 1. Master Connected Process Strip (5 Nodes) */}
          <div className={styles.connectedPipelineWrap}>
            <div className={styles.connectedPipelineHeader}>
              <span className={styles.pipelineDot} />
              <span className={styles.pipelineTitle}>End-to-End Workflow</span>
              <span className={styles.pipelineBadge}>CONNECTED SETUP</span>
            </div>

            <div className={styles.connectedPipelineGrid}>
              <div className={styles.pipelineNode}>
                <div className={styles.nodeStepNum}>01</div>
                <div className={styles.nodeIconWrap}><BsSearch /></div>
                <div className={styles.nodeTitle}>Market Research</div>
                <div className={styles.nodeDesc}>Identified buyer pain points with portal spam</div>
              </div>

              <div className={styles.pipelineArrow}>&rarr;</div>

              <div className={styles.pipelineNode}>
                <div className={styles.nodeStepNum}>02</div>
                <div className={styles.nodeIconWrap}><BsPaletteFill /></div>
                <div className={styles.nodeTitle}>Brand Identity</div>
                <div className={styles.nodeDesc}>Clean logo, modern colors, and typography</div>
              </div>

              <div className={styles.pipelineArrow}>&rarr;</div>

              <div className={styles.pipelineNode}>
                <div className={styles.nodeStepNum}>03</div>
                <div className={styles.nodeIconWrap}><BsCodeSlash /></div>
                <div className={styles.nodeTitle}>Website &amp; SEO</div>
                <div className={styles.nodeDesc}>Fast website &amp; Google Maps local ranking</div>
              </div>

              <div className={styles.pipelineArrow}>&rarr;</div>

              <div className={styles.pipelineNode}>
                <div className={styles.nodeStepNum}>04</div>
                <div className={styles.nodeIconWrap}><BsCameraReelsFill /></div>
                <div className={styles.nodeTitle}>Property Reels</div>
                <div className={styles.nodeDesc}>700K+ organic views on Instagram</div>
              </div>

              <div className={styles.pipelineArrow}>&rarr;</div>

              <div className={styles.pipelineNode}>
                <div className={styles.nodeStepNum}>05</div>
                <div className={styles.nodeIconWrap}><BsWhatsapp /></div>
                <div className={styles.nodeTitle}>WhatsFlow Tool</div>
                <div className={styles.nodeDesc}>Fast lead alerts and WhatsApp follow-ups</div>
              </div>
            </div>
          </div>

          {/* 2. Balanced 2-Column Grid: Delivered vs Learnings */}
          <div className={styles.resultsGrid}>

            {/* Column 1: What VeltaZ Delivered */}
            <div className={styles.resultsColDelivered}>
              <div className={styles.resultsCardHeader}>
                <div className={styles.resultsIconBox}>
                  <BsCheckCircleFill />
                </div>
                <div>
                  <h3 className={styles.resultsCardTitle}>What VeltaZ Delivered</h3>
                  <p className={styles.resultsCardSub}>Complete deliverables handed over to KIN Property</p>
                </div>
              </div>

              <div className={styles.deliveredItemList}>
                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>Brand Identity System:</strong>
                    <span> Logo files, brand color codes, typography, and marketing assets.</span>
                  </div>
                </div>

                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>Custom Website:</strong>
                    <span> kinpropertymanagement.com with verified listings and WhatsApp integration.</span>
                  </div>
                </div>

                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>Google Business Profile:</strong>
                    <span> Verified local listing, photos, and review collection setup.</span>
                  </div>
                </div>

                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>Local SEO &amp; Search Indexing:</strong>
                    <span> On-page real estate schema, Pune locality optimization (Baner, Wakad, Kharadi), and Google indexing.</span>
                  </div>
                </div>

                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>Property Walkthrough Reels:</strong>
                    <span> Scripting, shooting, and editing reels (700K+ organic views).</span>
                  </div>
                </div>

                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>WhatsFlow Internal Tool:</strong>
                    <span> Mobile-friendly tool for instant lead alerts and status updates.</span>
                  </div>
                </div>

                <div className={styles.deliveredItem}>
                  <span className={styles.deliveredCheck}>✓</span>
                  <div>
                    <strong>Full Code &amp; Asset Ownership:</strong>
                    <span> 100% custom code, design files, and video assets handed over to the client.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: What the Project Taught Us */}
            <div className={styles.resultsColLearnings}>
              <div className={styles.resultsCardHeader}>
                <div className={`${styles.resultsIconBox} ${styles.resultsIconBoxAmber}`}>
                  <BsStars />
                </div>
                <div>
                  <h3 className={styles.resultsCardTitle}>Key Project Learnings</h3>
                  <p className={styles.resultsCardSub}>Practical takeaways from the project</p>
                </div>
              </div>

              <div className={styles.learningItemList}>
                <div className={styles.learningItem}>
                  <div className={styles.learningBadge}>TAKEAWAY 01</div>
                  <h4 className={styles.learningHeading}>Speed Matters Most</h4>
                  <p className={styles.learningText}>
                    Real estate buyers contact multiple agencies. Getting inquiries to an employee within seconds made the biggest difference in connecting with clients.
                  </p>
                </div>

                <div className={styles.learningItem}>
                  <div className={styles.learningBadge}>TAKEAWAY 02</div>
                  <h4 className={styles.learningHeading}>Focus on Specific Localities</h4>
                  <p className={styles.learningText}>
                    Targeting specific areas like Baner, Wakad, and Kharadi brought more serious buyers than broad, general property marketing.
                  </p>
                </div>

                <div className={styles.learningItem}>
                  <div className={styles.learningBadge}>TAKEAWAY 03</div>
                  <h4 className={styles.learningHeading}>Keep Internal Tools Simple</h4>
                  <p className={styles.learningText}>
                    Employees prefer tools that work easily on their phones. WhatsApp-based notifications ensured 100% daily usage from day one.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* CLOSING CONSULTANCY SECTION: WORK WITH VELTAZ                  */}
        {/* ============================================================== */}
        <section className={styles.closingCtaSection}>
          <div className={styles.closingCtaContainer}>
            <div className={styles.closingCtaCard}>
              <div className={styles.closingBadge}>
                <span className={styles.closingBadgeSparkle}>✦</span>
                <span>WORK WITH VELTAZ</span>
              </div>

              <h2 className={styles.closingHeading}>
                Looking to Build or Upgrade Your Digital Presence?
              </h2>

              <p className={styles.closingSubtitle}>
                Whether you need a custom website, brand identity, video production, or internal business tools — we build solutions tailored to your business.
              </p>

              <div className={styles.closingBtnRow}>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className={styles.closingPrimaryBtn}
                >
                  <span>Discuss Your Project</span>
                  <BsArrowRight className={styles.btnArrowIcon} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className={styles.closingSecondaryBtn}
                >
                  <span>Explore Our Services</span>
                </button>
              </div>

              <div className={styles.closingTrustRow}>
                <span className={styles.closingTrustItem}>✦ Clear Timelines</span>
                <span className={styles.closingTrustDot}>&bull;</span>
                <span className={styles.closingTrustItem}>✦ Clean Code</span>
                <span className={styles.closingTrustDot}>&bull;</span>
                <span className={styles.closingTrustItem}>✦ Direct Communication</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
