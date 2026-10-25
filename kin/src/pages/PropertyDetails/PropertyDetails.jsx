import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bed, Bath, Square, MapPin, Heart, Share2, Phone, Mail,
  ChevronLeft, ChevronRight, X, CheckCircle2, Shield, Star,
  Scale, FileText, Settings, Link2,
  Car, Calendar, Layers, Sparkles, Loader2,
  GraduationCap, TrainFront, Activity, ShoppingBag, Locate,
  ChevronDown, Building2, Users, Sofa, Clock, CalendarDays,
  CalendarCheck, Camera
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { useWishlist, useAuth, useSiteSettings, getBrandName } from '../../contexts';
import PropertyCard from '../../components/common/PropertyCard';
import { fetchPropertyById, fetchProperties } from '../../utils/api';
import { getDynamicOgImage } from '../../utils/ogImage';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../animations/variants';
import InteractiveMap from '../../components/common/InteractiveMap';
import SEO from '../../components/common/SEO';
import ErrorBoundary from '../../components/common/ErrorBoundary';
const OR = '#A67A08';
const NAVY = '#0B1728';
const IndianRupeeIcon = () => <span className="w-5 h-5 flex items-center justify-center font-bold text-[16px]" style={{ color: OR }}>₹</span>;
const WalletIcon = () => <span className="w-5 h-5 flex items-center justify-center font-bold text-[14px]" style={{ color: OR }}>₹</span>;

function LoanEstimator({ property, OR }) {
  const [loan, setLoan] = useState(Math.round((property.price || 5000000) * 0.8));
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const emi = loan > 0
    ? Math.round((loan * (rate / 1200) * Math.pow(1 + rate / 1200, years * 12)) / (Math.pow(1 + rate / 1200, years * 12) - 1))
    : 0;

  return (
    <div className="space-y-4">
      {/* Loan Amount */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-ink-soft dark:text-white/40">Loan Amount</span>
          <span className="font-bold text-navy dark:text-white">
            {loan >= 10000000 ? `₹${(loan / 10000000).toFixed(2)} Cr` : `₹${(loan / 100000).toFixed(0)} L`}
          </span>
        </div>
        <input type="range" min={500000} max={Math.max(property.price || 10000000, 10000000)} step={100000} value={loan}
          onChange={e => setLoan(Number(e.target.value))}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-gold bg-gray-100 dark:bg-white/10" />
      </div>
      {/* Interest Rate */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-ink-soft dark:text-white/40">Interest Rate</span>
          <span className="font-bold text-navy dark:text-white">{rate}% p.a.</span>
        </div>
        <input type="range" min={6} max={15} step={0.1} value={rate}
          onChange={e => setRate(Number(e.target.value))}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-gold bg-gray-100 dark:bg-white/10" />
      </div>
      {/* Tenure */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-ink-soft dark:text-white/40">Loan Tenure</span>
          <span className="font-bold text-navy dark:text-white">{years} Years</span>
        </div>
        <input type="range" min={5} max={30} step={1} value={years}
          onChange={e => setYears(Number(e.target.value))}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-gold bg-gray-100 dark:bg-white/10" />
      </div>
      {/* EMI Result */}
      <div className="rounded-2xl p-4 text-center bg-gold/5 dark:bg-gold/10 border border-gold/20 mt-2">
        <p className="text-ink-soft dark:text-white/40 text-[10px] mb-1 uppercase tracking-wider">Estimated EMI</p>
        <p className="font-black text-2xl" style={{ color: OR }}>₹{emi.toLocaleString()}</p>
        <p className="text-[10px] text-ink-soft dark:text-white/30 mt-1">/ month*</p>
      </div>
      <p className="text-[9px] text-center text-ink-soft dark:text-white/30">*Consult bank for final rates & charges</p>
    </div>
  );
}

function generateNearbyAmenities(lat, lng) {
  if (!lat || !lng) return {};

  const categories = {
    education: [
      { name: 'Delhi Public School', offsetLat: 0.006, offsetLng: -0.005 },
      { name: 'International Institute of Technology', offsetLat: -0.009, offsetLng: 0.007 },
      { name: 'Royal Orchid Preschool', offsetLat: 0.003, offsetLng: 0.005 },
      { name: 'Oakridge International School', offsetLat: -0.005, offsetLng: -0.006 }
    ],
    transit: [
      { name: 'Metro Station - Line 1', offsetLat: 0.004, offsetLng: 0.002 },
      { name: 'Central Bus Terminal', offsetLat: -0.005, offsetLng: -0.003 },
      { name: 'Prestige Auto Stand', offsetLat: 0.002, offsetLng: -0.001 },
      { name: 'Railway Junction Station', offsetLat: 0.012, offsetLng: -0.011 }
    ],
    medical: [
      { name: 'Max Super Speciality Hospital', offsetLat: -0.003, offsetLng: 0.004 },
      { name: 'Apollo Pharmacy & Wellness', offsetLat: 0.001, offsetLng: 0.002 },
      { name: 'Fortis Memorial Health Institute', offsetLat: 0.008, offsetLng: -0.005 },
      { name: 'LifeCare Diagnostic Clinic', offsetLat: -0.002, offsetLng: -0.003 }
    ],
    shopping: [
      { name: 'Phoenix Marketcity Mall', offsetLat: -0.006, offsetLng: -0.008 },
      { name: 'The Galleria Luxury Highstreet', offsetLat: 0.003, offsetLng: 0.003 },
      { name: 'Gourmet World Supermarket', offsetLat: -0.001, offsetLng: 0.001 },
      { name: 'Starbucks Coffee & Roastery', offsetLat: 0.001, offsetLng: 0.002 }
    ]
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const result = {};
  Object.keys(categories).forEach(cat => {
    result[cat] = categories[cat].map(item => {
      const itemLat = lat + item.offsetLat;
      const itemLng = lng + item.offsetLng;
      const dist = getDistance(lat, lng, itemLat, itemLng);
      return {
        name: item.name,
        distance: dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`,
        distanceVal: dist,
        coordinates: { lat: itemLat, lng: itemLng }
      };
    }).sort((a, b) => a.distanceVal - b.distanceVal);
  });

  return result;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user, openAuth } = useAuth();
  const { settings } = useSiteSettings();
  const brandName = getBrandName(settings);

  const [amenityCategory, setAmenityCategory] = useState('education');
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(14);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedList, setRelatedList] = useState([]);

  const propertiesList = useMemo(() => {
    return property ? [property] : [];
  }, [property]);

  const nearbyAmenities = useMemo(() => {
    if (!property?.coordinates?.lat || !property?.coordinates?.lng) return [];
    return generateNearbyAmenities(
      property.coordinates.lat,
      property.coordinates.lng
    )[amenityCategory] || [];
  }, [property?.coordinates?.lat, property?.coordinates?.lng, amenityCategory]);
  const [currency, setCurrency] = useState('INR');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);
  const mapSectionRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const currenciesList = [
    { value: 'INR', label: 'INR (₹)' },
    { value: 'USD', label: 'USD ($)' },
    { value: 'AED', label: 'AED (Dh)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD (C$)' },
  ];

  const formatPrice = (price, curr) => {
    if (!price) return '—';
    const rates = {
      INR: { rate: 1, symbol: '₹' },
      USD: { rate: 1 / 83.5, symbol: '$' },
      AED: { rate: 1 / 22.7, symbol: 'AED ' },
      GBP: { rate: 1 / 106.2, symbol: '£' },
      CAD: { rate: 1 / 61.2, symbol: 'C$' }
    };
    const { rate, symbol } = rates[curr];
    const converted = price * rate;
    if (curr === 'INR') {
      if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
      if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakh`;
      return `₹${price.toLocaleString()}`;
    }
    if (converted >= 1000000) {
      return `${symbol}${(converted / 1000000).toFixed(2)} M`;
    }
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        if (active) {
          setProperty(data);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load property details.');
          setLoading(false);
        }
      }
    };
    const getRelated = async () => {
      try {
        const resData = await fetchProperties({ limit: 12 });
        if (active && resData?.properties) {
          setRelatedList(resData.properties);
        }
      } catch (err) {
        console.error('Failed to load related properties:', err);
      }
    };
    getProperty();
    getRelated();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (property?.coordinates?.lat && property?.coordinates?.lng) {
      setMapCenter([property.coordinates.lat, property.coordinates.lng]);
    } else {
      setMapCenter([19.0178, 72.8173]); // default fallback: Worli, Mumbai
    }
  }, [property]);

  const handleShare = async () => {
    const shareData = {
      title: property?.title,
      text: `Check out this luxury property: ${property?.title} in ${property?.location}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Share was canceled or failed — this is expected user behavior, not an error
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

  // Related: match by listing category (Rent/Sale/PG/Plot/Villa) — always 3 results
  const { related, relatedLabel } = (() => {
    const others = relatedList.filter(p => String(p.id) !== String(id) && p._id !== id);

    // Detect current property category
    const curLT          = String(property?.listingType || property?.adType || '').toLowerCase();
    const curPropType    = String(property?.propertyType || property?.type || '').toLowerCase();
    const curIsPG        = curLT.includes('pg') || Boolean(property?.pgName || property?.pgRooms?.length);
    const curIsPlot      = !curIsPG && (curPropType.includes('plot') || curPropType.includes('land') || Boolean(property?.plotLength || property?.plotWidth));
    const curIsVilla     = !curIsPG && !curIsPlot && (curPropType.includes('villa') || Boolean(property?.villaType));
    const curIsCommercial= !curIsPG && !curIsPlot && !curIsVilla && curPropType.includes('commercial');
    const curIsRent      = !curIsPG && !curIsPlot && !curIsVilla && !curIsCommercial && (curLT.includes('rent') || curLT.includes('flatmate'));
    const curIsResale    = !curIsPG && !curIsPlot && !curIsVilla && !curIsCommercial && (curLT.includes('resale') || curLT.includes('sale'));

    // Helper to detect a property's category
    const detectCat = (p) => {
      const lt = String(p.listingType || p.adType || '').toLowerCase();
      const pt = String(p.propertyType || p.type || '').toLowerCase();
      if (lt.includes('pg') || Boolean(p.pgName || p.pgRooms?.length)) return 'pg';
      if (lt.includes('flatmate') || Boolean(p.tenantType && !p.pgName)) return 'flatmate';
      if (pt.includes('plot') || pt.includes('land') || Boolean(p.plotLength || p.plotWidth)) return 'plot';
      if (pt.includes('villa') || Boolean(p.villaType)) return 'villa';
      if (pt.includes('commercial')) return lt.includes('rent') ? 'commercial-rent' : 'commercial-sale';
      if (lt.includes('rent')) return 'rent';
      if (lt.includes('resale') || lt.includes('sale')) return 'resale';
      return 'other';
    };

    const curIsFlatmate = !curIsPG && (curLT.includes('flatmate') || Boolean(property?.tenantType && !property?.pgName));
    const curCat = curIsPG ? 'pg'
      : curIsFlatmate ? 'flatmate'
      : curIsPlot ? 'plot'
      : curIsVilla ? 'villa'
      : curIsCommercial ? (curLT.includes('rent') ? 'commercial-rent' : 'commercial-sale')
      : curIsRent ? 'rent'
      : curIsResale ? 'resale'
      : 'other';

    // Filter others by exact same category
    const sameCategory = others.filter(p => detectCat(p) === curCat);

    const adLabel = curCat === 'pg' ? 'PG / Hostels'
      : curCat === 'flatmate' ? 'Flatmates'
      : curCat === 'plot' ? 'Plots'
      : curCat === 'villa' ? 'Villas'
      : curCat === 'commercial-rent' ? 'Commercial Rentals'
      : curCat === 'commercial-sale' ? 'Commercial Properties for Sale'
      : curCat === 'rent' ? 'Rentals'
      : curCat === 'resale' ? 'Properties for Sale'
      : 'Properties';

    // Priority 1: same category + same city (3 exact)
    const sameCityCategory = sameCategory.filter(p => p.city === property?.city);
    if (sameCityCategory.length >= 3) return { related: sameCityCategory.slice(0, 3), relatedLabel: `More ${adLabel} in ${property?.city}` };

    // Priority 2: same category anywhere (3 exact)
    if (sameCategory.length >= 3) return { related: sameCategory.slice(0, 3), relatedLabel: `More ${adLabel}` };

    // Priority 3: fill remaining slots with any other property (never show < 3 if data exists)
    const alreadyIncluded = new Set(sameCategory.map(p => p._id || p.id));
    const fillers = others.filter(p => !alreadyIncluded.has(p._id || p.id));
    const filled = [...sameCategory, ...fillers].slice(0, 3);
    if (filled.length > 0) return { related: filled, relatedLabel: sameCategory.length > 0 ? `More ${adLabel}` : 'You May Also Like' };

    // Fallback
    return { related: others.slice(0, 3), relatedLabel: 'You May Also Like' };
  })();
  const wished = isWishlisted(property?._id || property?.id || id);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#071A2F]">
      <Loader2 className="w-8 h-8 animate-spin text-gold" style={{ color: '#B8860B' }} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-dark transition-colors duration-300">
      <div className="text-center max-w-md p-6">
        <h2 className="font-display font-bold text-red-500 text-2xl mb-2">Error Loading Property</h2>
        <p className="text-sm text-ink-soft dark:text-white/60 mb-6">{error}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
          <Link to="/properties" className="btn-outline">Back to Listings</Link>
        </div>
      </div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-dark transition-colors duration-300">
      <div className="text-center">
        <h2 className="font-display font-bold text-navy dark:text-white text-3xl mb-4">Property not found</h2>
        <Link to="/properties" className="btn-primary">Back to Listings</Link>
      </div>
    </div>
  );



  const galleryImages = property.images && property.images.length > 0
    ? property.images
    : (property.image ? [property.image] : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200']);

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-20 transition-colors duration-300">
      <SEO
        title={`${property.title} in ${property.location}, ${property.city}`}
        description={`${property.type} for sale in ${property.location}, ${property.city}. Price: ${property.priceLabel}. ${property.description || `Discover this verified premium listing on ${brandName}.`}`}
        image={getDynamicOgImage(property)}
        url={`/properties/${id}`}
      />

      {/* Schema.org Structured Data for Real Estate Listings */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SingleFamilyResidence",
          "name": property.title,
          "description": property.description || `${property.type} for sale in ${property.location}, ${property.city}.`,
          "image": galleryImages,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": property.location,
            "addressRegion": property.city,
            "addressCountry": "IN"
          },
          ...(property.coordinates?.lat && property.coordinates?.lng ? {
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": property.coordinates.lat,
              "longitude": property.coordinates.lng
            }
          } : {}),
          "offers": {
            "@type": "Offer",
            "price": property.price,
            "priceCurrency": "INR",
            "availability": property.status === 'Sold Out' ? "https://schema.org/SoldOut" : "https://schema.org/InStock"
          }
        })}
      </script>

      {/* Swiper gallery styles are in globals.css — .main-swiper-gallery, .thumbs-swiper-gallery */}

      {/* ── Breadcrumb ── */}
      <div className="bg-white dark:bg-navy border-b border-gray-100 dark:border-white/10 transition-colors mb-6">
        <div className="container-luxury py-4 flex items-center gap-2.5 text-xs text-ink-muted dark:text-cream/80 font-accent uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-neutral-300 dark:text-white/20 font-normal">/</span>
          <Link to="/properties" className="hover:text-gold transition-colors">Properties</Link>
          <span className="text-neutral-300 dark:text-white/20 font-normal">/</span>
          <span className="text-navy dark:text-white truncate font-black">{property.title}</span>
        </div>
      </div>



      {/* ══════════════════════════════════════════════════════════════
          HERO — NoBroker exact layout
          [3-photo collage LEFT] | [Features grid + CTAs RIGHT]
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-navy-dark transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Photos + Right Panel row ── */}
          <div className="flex flex-col lg:flex-row gap-0 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">

            {/* ── LEFT: 3-photo NoBroker collage ── */}
            <div className="flex-1 min-w-0 relative overflow-hidden" style={{ minHeight: '420px', maxHeight: '420px' }}>

              {/* Shortlist top-right */}
              <button
                onClick={() => { if (!user) { openAuth(); return; } toggleWishlist(property); }}
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-accent font-bold tracking-wider uppercase text-white"
                style={{ background: 'rgba(7,26,47,0.72)', backdropFilter: 'blur(6px)' }}
              >
                <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-red-500 text-red-500' : ''}`} />
                {wished ? 'Saved' : 'Shortlist'}
              </button>

              {/* LIVE badge bottom-left */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-accent font-black text-white uppercase tracking-widest"
                style={{ background: 'rgba(220,38,38,0.92)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping inline-block" />
                LIVE
              </div>

              {/* 3-photo collage grid — exactly NoBroker */}
              <div className="flex h-full" style={{ height: '420px' }}>
                {/* Big photo LEFT */}
                <div className="flex-1 relative overflow-hidden cursor-pointer" onClick={() => setLightbox(0)}>
                  <img
                    src={galleryImages[0]}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Thin vertical divider */}
                <div className="w-[3px] bg-white dark:bg-navy-dark shrink-0" />

                {/* 2 small photos stacked RIGHT */}
                <div className="flex flex-col" style={{ width: '42%' }}>
                  {/* Top-right photo */}
                  <div className="flex-1 relative overflow-hidden cursor-pointer border-b-[3px] border-white dark:border-navy-dark" onClick={() => setLightbox(1)}>
                    <img
                      src={galleryImages[1] || galleryImages[0]}
                      alt=""
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  {/* Bottom-right photo with +N overlay */}
                  <div className="flex-1 relative overflow-hidden cursor-pointer" onClick={() => setLightbox(2)}>
                    <img
                      src={galleryImages[2] || galleryImages[0]}
                      alt=""
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* +N more overlay */}
                    {galleryImages.length > 3 && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        style={{ background: 'rgba(0,0,0,0.48)' }}
                        onClick={(e) => { e.stopPropagation(); setLightbox(0); }}
                      >
                        <span className="text-white font-black text-2xl">+{galleryImages.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Features + CTAs panel ── */}
            <div
              className="w-full lg:w-[380px] xl:w-[420px] shrink-0 border-l border-gray-200 dark:border-white/10 flex flex-col bg-white dark:bg-navy transition-colors duration-300"
            >
              {/* Features grid — 2×4, each cell with icon + value + label */}
              <div className="flex-1">
                {(() => {
                  const type = String(property.type || property.propertyType || '').toLowerCase();
                  const listingType = String(property.listingType || '').toLowerCase();
                  const isPG = listingType.includes('pg') || String(property.adType || '').toLowerCase().includes('pg') || Boolean(property.pgName || property.pgRooms?.length || property.pgGender || property.pgFood || property.pgNotice);
                  const isFlatmate = !isPG && (listingType.includes('flatmate') || String(property.adType || '').toLowerCase().includes('flatmate') || Boolean(property.tenantType));
                  const isCommercial = !isPG && !isFlatmate && (type.includes('commercial') || property.propertyType === 'Commercial' || Boolean(property.commercialPropertyType || property.buildingType));
                  const isPlot = !isPG && !isFlatmate && !isCommercial && (type.includes('land') || type.includes('plot') || property.propertyType === 'Plot' || Boolean(property.plotLength || property.plotWidth || property.floorsAllowed));
                  const isVilla = !isPG && !isFlatmate && !isCommercial && !isPlot && (type.includes('villa') || property.propertyType === 'Villa' || Boolean(property.villaType));

                  const money = v => v ? `₹${Number(v).toLocaleString('en-IN')}` : null;
                  const list = v => Array.isArray(v) ? v.join(', ') : (v || null);
                  const postedOn = property.createdAt
                    ? new Date(property.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                    : null;

                  // These cards intentionally mirror the fields collected by PostProperty.
                  // PG/Flatmates do not inherit irrelevant bedroom/bathroom/ownership cards.
                  let feats;

                  if (isPG) {
                    feats = [
                      { icon: <Building2 className="w-5 h-5" style={{ color: OR }} />, val: property.pgName || 'PG / Hostel', label: 'PG Name' },
                      { icon: <Bed className="w-5 h-5" style={{ color: OR }} />, val: list(property.pgRooms), label: 'Room Types' },
                      { icon: <IndianRupeeIcon />, val: money(property.price), label: 'Monthly Rent' },
                      { icon: <WalletIcon />, val: money(property.deposit), label: 'Security Deposit' },
                      { icon: <Sparkles className="w-5 h-5" style={{ color: OR }} />, val: list(property.pgFood), label: 'Food Included' },
                      { icon: <Users className="w-5 h-5" style={{ color: OR }} />, val: property.pgGender, label: 'Preferred Tenants' },
                      { icon: <Clock className="w-5 h-5" style={{ color: OR }} />, val: property.pgNotice, label: 'Notice Period' },
                      { icon: <CalendarDays className="w-5 h-5" style={{ color: OR }} />, val: postedOn, label: 'Posted On' },
                    ];
                  } else if (isFlatmate) {
                    feats = [
                      { icon: <Building2 className="w-5 h-5" style={{ color: OR }} />, val: property.apartmentType, label: 'Apartment Type' },
                      { icon: <Bed className="w-5 h-5" style={{ color: OR }} />, val: property.bhkType, label: 'BHK Type' },
                      { icon: <Users className="w-5 h-5" style={{ color: OR }} />, val: property.roomType, label: 'Room Type' },
                      { icon: <Users className="w-5 h-5" style={{ color: OR }} />, val: property.tenantType, label: 'Tenant Type' },
                      { icon: <Layers className="w-5 h-5" style={{ color: OR }} />, val: property.floor != null ? `${property.floor}${property.totalFloor ? ` / ${property.totalFloor}` : ''}` : null, label: 'Floor' },
                      { icon: <Sofa className="w-5 h-5" style={{ color: OR }} />, val: property.furnishing, label: 'Furnishing' },
                      { icon: <CalendarCheck className="w-5 h-5" style={{ color: OR }} />, val: property.availableFrom, label: 'Available From' },
                      { icon: <CalendarDays className="w-5 h-5" style={{ color: OR }} />, val: postedOn, label: 'Posted On' },
                    ];
                  } else if (isCommercial) {
                    feats = [
                      { icon: <Building2 className="w-5 h-5" style={{ color: OR }} />, val: property.commercialPropertyType || property.type, label: 'Property Type' },
                      { icon: <Building2 className="w-5 h-5" style={{ color: OR }} />, val: property.buildingType, label: 'Building Type' },
                      { icon: <Square className="w-5 h-5" style={{ color: OR }} />, val: property.area ? `${Number(property.area).toLocaleString('en-IN')} sqft` : null, label: 'Area' },
                      { icon: <Layers className="w-5 h-5" style={{ color: OR }} />, val: property.floor != null ? `${property.floor}${property.totalFloor ? ` / ${property.totalFloor}` : ''}` : null, label: 'Floor' },
                      { icon: <Sofa className="w-5 h-5" style={{ color: OR }} />, val: property.furnishing, label: 'Furnishing' },
                      { icon: <Clock className="w-5 h-5" style={{ color: OR }} />, val: property.propertyAge, label: 'Age of Property' },
                      { icon: <CalendarCheck className="w-5 h-5" style={{ color: OR }} />, val: property.availableFrom || property.possessionStatus, label: 'Available From' },
                      { icon: <CalendarDays className="w-5 h-5" style={{ color: OR }} />, val: postedOn, label: 'Posted On' },
                    ];
                  } else if (isPlot) {
                    feats = [
                      { icon: <Square className="w-5 h-5" style={{ color: OR }} />, val: property.area ? `${Number(property.area).toLocaleString('en-IN')} sqft` : null, label: 'Plot Area' },
                      { icon: <Layers className="w-5 h-5" style={{ color: OR }} />, val: property.plotLength ? `${property.plotLength} ft` : null, label: 'Length' },
                      { icon: <Layers className="w-5 h-5" style={{ color: OR }} />, val: property.plotWidth ? `${property.plotWidth} ft` : null, label: 'Width' },
                      { icon: <MapPin className="w-5 h-5" style={{ color: OR }} />, val: property.facing, label: 'Facing' },
                      { icon: <CheckCircle2 className="w-5 h-5" style={{ color: OR }} />, val: property.boundaryWall, label: 'Boundary Wall' },
                      { icon: <CheckCircle2 className="w-5 h-5" style={{ color: OR }} />, val: property.cornerPlot, label: 'Corner Plot' },
                      { icon: <CheckCircle2 className="w-5 h-5" style={{ color: OR }} />, val: property.gatedProject, label: 'Gated Project' },
                      { icon: <CalendarDays className="w-5 h-5" style={{ color: OR }} />, val: postedOn, label: 'Posted On' },
                    ];
                  } else if (isVilla) {
                    feats = [
                      { icon: <Building2 className="w-5 h-5" style={{ color: OR }} />, val: property.villaType, label: 'Villa Type' },
                      { icon: <Bed className="w-5 h-5" style={{ color: OR }} />, val: property.bhkType, label: 'BHK Type' },
                      { icon: <Sofa className="w-5 h-5" style={{ color: OR }} />, val: property.furnishing, label: 'Furnishing' },
                      { icon: <Square className="w-5 h-5" style={{ color: OR }} />, val: property.area ? `${Number(property.area).toLocaleString('en-IN')} sqft` : null, label: 'Built-up Area' },
                      { icon: <Square className="w-5 h-5" style={{ color: OR }} />, val: property.plotArea ? `${Number(property.plotArea).toLocaleString('en-IN')} sqft` : null, label: 'Plot Area' },
                      { icon: <Layers className="w-5 h-5" style={{ color: OR }} />, val: property.floor != null ? `${property.floor}${property.totalFloor ? ` / ${property.totalFloor}` : ''}` : null, label: 'Floor' },
                      { icon: <Clock className="w-5 h-5" style={{ color: OR }} />, val: property.propertyAge, label: 'Age of Property' },
                      { icon: <CheckCircle2 className="w-5 h-5" style={{ color: OR }} />, val: property.gatedProject, label: 'Gated Project' },
                      { icon: <CalendarDays className="w-5 h-5" style={{ color: OR }} />, val: postedOn, label: 'Posted On' },
                    ];
                  } else {
                    // Residential Rent / Resale — mirrors the residential PostProperty fields.
                    feats = [
                      { icon: <Bed className="w-5 h-5" style={{ color: OR }} />, val: property.bedrooms || property.bhkType, label: 'Bedrooms' },
                      { icon: <Bath className="w-5 h-5" style={{ color: OR }} />, val: property.bathrooms, label: 'Bathrooms' },
                      { icon: <Building2 className="w-5 h-5" style={{ color: OR }} />, val: property.apartmentType || property.type, label: 'Property Type' },
                      { icon: <Car className="w-5 h-5" style={{ color: OR }} />, val: property.parkingType || property.parking, label: 'Parking' },
                      { icon: <Users className="w-5 h-5" style={{ color: OR }} />, val: property.ownershipType, label: 'Ownership Type' },
                      { icon: <Layers className="w-5 h-5" style={{ color: OR }} />, val: property.floor != null ? String(property.floor) : null, label: property.totalFloor ? `Floor / ${property.totalFloor}` : 'Floor' },
                      { icon: <Sofa className="w-5 h-5" style={{ color: OR }} />, val: property.furnishing, label: 'Furnishing' },
                      { icon: <Clock className="w-5 h-5" style={{ color: OR }} />, val: property.propertyAge, label: 'Age of Property' },
                      { icon: <CalendarDays className="w-5 h-5" style={{ color: OR }} />, val: postedOn, label: 'Posted On' },
                      { icon: <CalendarCheck className="w-5 h-5" style={{ color: OR }} />, val: property.availableFrom, label: 'Available From' },
                    ];
                  }

                  // Filter empty cards so the hero never displays misleading “—” values.
                  feats = feats.filter(f => f.val !== null && f.val !== undefined && String(f.val).trim() !== '');
                  return feats.map((f, i) => {
                    const isLeft = i % 2 === 0;
                    const isLastRow = i >= feats.length - 2;
                    return (
                      <div
                        key={i}
                        className={[
                          'flex items-start gap-3 px-5 py-4 transition-colors duration-200',
                          'bg-white dark:bg-navy',
                          isLeft ? 'border-r border-gray-150 dark:border-white/5' : '',
                          !isLastRow ? 'border-b border-gray-150 dark:border-white/5' : '',
                        ].join(' ')}
                        style={{ width: '50%', float: 'left', boxSizing: 'border-box' }}
                      >
                        <div className="shrink-0 mt-0.5">{f.icon}</div>
                        <div className="min-w-0">
                          <p className="font-accent font-bold text-gray-800 dark:text-white text-[13px] tracking-wider uppercase leading-snug truncate">{f.val}</p>
                          <p className="text-gray-400 dark:text-white/40 text-[9px] font-accent font-semibold tracking-wider uppercase mt-0.5 leading-tight">{f.label}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
                <div className="clear-both" />
              {/* CTA buttons */}
              <div className="px-4 py-6 border-t border-gray-200 dark:border-white/10 flex justify-center bg-white dark:bg-navy transition-colors duration-300">
                <a
                  href={`tel:${property.agent?.phone}`}
                  className="w-full max-w-xs py-3 rounded font-bold text-sm flex items-center justify-center text-white transition-all hover:opacity-90"
                  style={{ background: OR }}
                >
                  Contact
                </a>
              </div>



              {/* Report section — commented out temporarily */}
              {/* <div className="px-4 pb-4 pt-1 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-navy transition-colors duration-300">
                <div className="flex items-start gap-2 mb-2.5">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                    <span className="text-teal-600 dark:text-teal-400 text-[9px] font-black">!</span>
                  </span>
                  <p className="text-gray-500 dark:text-white/50 text-[10px] font-accent font-bold tracking-wide uppercase leading-snug">
                    Report what was not correct in this property
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Listed by Broker', 'Sold Out', 'Wrong Info'].map(flag => (
                    <button
                      key={flag}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-[9px] font-accent font-bold tracking-wider uppercase text-gray-500 dark:text-white/45 hover:border-gold hover:text-gold dark:hover:text-gold transition-colors bg-white dark:bg-transparent"
                    >
                      {flag}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>{/* end hero */}
      </div>{/* end hero background */}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10">
              <X className="w-5 h-5" />
            </button>
            <img src={galleryImages[lightbox] || galleryImages[0]} alt="" className="max-w-full max-h-full rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setLightbox(l => (l === 0 ? galleryImages.length - 1 : l - 1)); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setLightbox(l => (l === galleryImages.length - 1 ? 0 : l + 1)); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          BODY — Left: details  |  Right: sticky contact card
      ══════════════════════════════════════════════════════════════ */}
      <div className="container-luxury py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Property Title & Info Card */}
            <div className="bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/10 p-6 shadow-sm">
              <div className="pb-6 border-b border-gray-100 dark:border-white/5">
                {/* Category icon + Title + Location */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-2xl border border-gold/25 flex flex-col items-center justify-center shrink-0 bg-gold/5">
                    <Building2 className="w-6 h-6 text-gold" />
                    <span className="text-[8px] font-black text-gold leading-none mt-1 text-center px-1 uppercase">
                      {property.listingType || 'Buy'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h1 className="font-bold text-gray-900 dark:text-white text-xl md:text-2xl leading-tight">
                      {property.title}
                    </h1>
                    <p className="text-gray-500 dark:text-white/50 text-xs mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      {property.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Metrics — only Price + Area/Deposit. No price-per-sq.ft and no Apply Loan. */}
              {(() => {
                const _listingType = String(property.listingType || '').toLowerCase();
                const _isPG = _listingType.includes('pg') ||
                  String(property.adType || '').toLowerCase().includes('pg') ||
                  Boolean(property.pgName || property.pgRooms?.length || property.pgGender || property.pgFood || property.pgNotice);
                const _isRent = _isPG || _listingType.includes('rent') || _listingType.includes('flatmate');
                const _priceLabel = _isPG ? 'Monthly Rent' : _isRent ? 'Rent' : 'Price';

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 pt-6">
                    <div className="pb-5 sm:pb-0 sm:pr-8">
                      <p className="text-gray-400 dark:text-white/40 text-[9px] font-accent font-bold tracking-wider uppercase">
                        {_priceLabel}
                      </p>
                      <p className="font-black text-gray-900 dark:text-white text-xl md:text-2xl mt-1.5 leading-none">
                        {formatPrice(property.price, currency)}
                      </p>
                    </div>

                    {_isPG ? (
                      property.deposit ? (
                        <div className="pt-5 sm:pt-0 sm:border-l sm:border-gray-150 sm:dark:border-white/5 sm:pl-8 border-t border-gray-100 dark:border-white/5">
                          <p className="text-gray-400 dark:text-white/40 text-[9px] font-accent font-bold tracking-wider uppercase">
                            Security Deposit
                          </p>
                          <p className="font-black text-gray-900 dark:text-white text-xl md:text-2xl mt-1.5 leading-none">
                            ₹{Number(property.deposit).toLocaleString()}
                          </p>
                          <p className="text-gray-500 dark:text-white/30 text-[10px] mt-1.5">Refundable</p>
                        </div>
                      ) : (
                        <div className="hidden sm:block" />
                      )
                    ) : (
                      property.area ? (
                        <div className="pt-5 sm:pt-0 sm:border-l sm:border-gray-150 sm:dark:border-white/5 sm:pl-8 border-t border-gray-100 dark:border-white/5">
                          <p className="text-gray-400 dark:text-white/40 text-[9px] font-accent font-bold tracking-wider uppercase">
                            Carpet Area
                          </p>
                          <p className="font-black text-gray-900 dark:text-white text-xl md:text-2xl mt-1.5 leading-none">
                            {Number(property.area).toLocaleString()} Sq.Ft
                          </p>
                          <p className="text-gray-500 dark:text-white/30 text-[10px] mt-1.5">Measured Area</p>
                        </div>
                      ) : (
                        <div className="hidden sm:block" />
                      )
                    )}
                  </div>
                );
              })()}
            </div>

            {/* ── Service shortcuts — compact, tappable, directly below Price + Area ── */}
            <div className="bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/10 p-4 sm:p-5 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {[
                  {
                    label: 'Legal Services',
                    note: 'Paperwork help',
                    to: '/services/legal',
                    icon: Scale,
                  },
                  {
                    label: 'Rental Agreement',
                    note: 'Airtight & registered',
                    to: '/services/rental',
                    icon: FileText,
                  },
                  {
                    label: 'Property Management',
                    note: 'Hands-free care',
                    to: '/services/management',
                    icon: Settings,
                  },
                  {
                    label: 'Loan Services',
                    note: 'Best interest rate',
                    to: '/services/loan',
                    icon: Link2,
                  },
                  {
                    label: 'Painting & Cleaning',
                    note: '48-hour turnaround',
                    to: '/services/painting-cleaning',
                    icon: Sparkles,
                  },
                ].map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.label}
                      to={service.to}
                      className="group rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-navy-light px-3.5 py-4 min-h-[116px] flex flex-col items-start justify-between hover:border-gold/40 hover:bg-gold/[0.03] dark:hover:bg-gold/[0.04] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-xl border border-gold/20 bg-gold/5 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" style={{ color: OR }} strokeWidth={1.8} />
                      </div>
                      <div className="w-full mt-3">
                        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.08em] text-gold truncate">
                          {service.note}
                        </p>
                        <p className="text-[12px] font-bold text-navy dark:text-white leading-tight mt-1 truncate group-hover:text-gold transition-colors">
                          {service.label}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Full details table */}
            <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ background: OR }} />
                <h2 className="font-display font-bold text-navy dark:text-white text-lg">Property Details</h2>
              </div>

              {(() => {
                const type = String(property.type || property.propertyType || '').toLowerCase();
                const listingType = String(property.listingType || '').toLowerCase();
                const isPG = type.includes('pg') || listingType.includes('pg') || Boolean(property.pgName || property.pgGender || (Array.isArray(property.pgRooms) && property.pgRooms.length) || property.pgFood || property.pgNotice);

                // Keep this table in sync with the PostProperty form.
                // Only fields that are actually collected for a given flow are
                // shown, while empty values remain hidden.
                const common = [
                  ['Property Type', property.type || property.propertyType],
                  ['Category', isPG ? null : (property.category || property.propertyType)],
                  ['Area', property.area ? `${Number(property.area).toLocaleString()} sqft` : null],
                  ['Carpet Area', property.carpetArea ? `${Number(property.carpetArea).toLocaleString()} sqft` : null],
                  ['Bathrooms', property.bathrooms],
                  ['Balconies', property.balconies],
                  ['Parking', property.parkingType || property.parking],
                  ['Property Age', property.propertyAge],
                  ['Facing', property.facing],
                  ['Floor', (property.floor != null && property.floor !== 0 && property.floor !== '0' && property.floor !== '')
                    ? `${property.floor}${(property.totalFloor != null && property.totalFloor !== 0) ? ` / ${property.totalFloor}` : ''}`
                    : null],
                  ['Total Floors', property.totalFloor],
                  ['Floor Type', property.floorType],
                  ['Furnishing', property.furnishing],
                  ['Available From', property.availableFrom],
                ];

                // Residential Rent / Resale / Flatmates
                const residential = [
                  ['Apartment Type', property.apartmentType],
                  ['BHK Type', property.bhkType],
                  ['Ownership Type', property.ownershipType],
                  ['Landmark', property.landmark],
                ];

                const villa = [
                  ['Villa Type', property.villaType],
                  ['BHK Type', property.bhkType],
                  ['Plot Area', property.plotArea ? `${Number(property.plotArea).toLocaleString()} sqft` : null],
                  ['Gated Project', property.gatedProject],
                ];

                const commercial = [
                  ['Commercial Property Type', property.commercialPropertyType],
                  ['Building Type', property.buildingType],
                  ['Lease Duration', property.leaseDuration],
                  ['Lock-in Period', property.lockInPeriod],
                  ['Possession Status', property.possessionStatus],
                  ['Other Features', Array.isArray(property.otherFeatures) && property.otherFeatures.length ? property.otherFeatures.join(', ') : property.otherFeatures],
                ];

                const land = [
                  ['Plot Area', property.area ? `${Number(property.area).toLocaleString()} sqft` : null],
                  ['Length', property.plotLength ? `${property.plotLength} ft` : null],
                  ['Width', property.plotWidth ? `${property.plotWidth} ft` : null],
                  ['Boundary Wall', property.boundaryWall],
                  ['Corner Plot', property.cornerPlot],
                  ['Floors Allowed', property.floorsAllowed],
                  ['Facing', property.facing],
                  ['Gated Project', property.gatedProject],
                ];

                const pg = [
                  ['PG Name', property.pgName],
                  ['Room Types', Array.isArray(property.pgRooms) && property.pgRooms.length ? property.pgRooms.join(', ') : property.pgRooms],
                  ['Monthly Rent', property.price ? `₹${Number(property.price).toLocaleString()}` : null],
                  ['Security Deposit', property.deposit ? `₹${Number(property.deposit).toLocaleString()}` : null],
                  ['Food Included', Array.isArray(property.pgFood) && property.pgFood.length ? property.pgFood.join(', ') : property.pgFood],
                  ['Preferred Tenants', property.pgGender],
                  ['Notice Period', property.pgNotice],
                  ['Parking Available', property.parking || property.parkingType],
                  ['Amenities', Array.isArray(property.amenities) && property.amenities.length ? property.amenities.join(', ') : property.amenities],
                  ['Description', property.description],
                ];

                const flatmates = [
                  ['Room Type', property.roomType],
                  ['Tenant Type', property.tenantType],
                ];

                const resale = [
                  ['Ownership Type', property.ownershipType],
                  ['Price', property.price ? `₹${Number(property.price).toLocaleString()}` : null],
                  ['Loan Available', property.loanAvailable],
                  ['Transaction Type', property.transactionType],
                  ['Under Loan', property.underLoan],
                ];

                const rental = [
                  ['Monthly Rent', property.price ? `₹${Number(property.price).toLocaleString()}` : null],
                  ['Security Deposit', property.deposit ? `₹${Number(property.deposit).toLocaleString()}` : null],
                  ['Maintenance', property.maintenance ? `₹${Number(property.maintenance).toLocaleString()}/mo` : null],
                  ['Preferred Tenants', property.preferredTenant],
                ];

                const commercialRent = [
                  ['Monthly Rent', property.price ? `₹${Number(property.price).toLocaleString()}` : null],
                  ['Security Deposit', property.deposit ? `₹${Number(property.deposit).toLocaleString()}` : null],
                  ['Lease Duration', property.leaseDuration],
                  ['Lock-in Period', property.lockInPeriod],
                  ['Maintenance / CAM', property.maintenance ? `₹${Number(property.maintenance).toLocaleString()}/mo` : null],
                ];

                const commercialSale = [
                  ['Expected Price', property.price ? `₹${Number(property.price).toLocaleString()}` : null],
                  ['Maintenance', property.maintenance ? `₹${Number(property.maintenance).toLocaleString()}/mo` : null],
                  ['Possession Status', property.possessionStatus],
                  ['Transaction Type', property.transactionType],
                  ['Loan Available', property.loanAvailable],
                ];

                const plotPricing = [
                  ['Expected Price', property.price ? `₹${Number(property.price).toLocaleString()}` : null],
                  ['Loan Available', property.loanAvailable],
                  ['Transaction Type', property.transactionType],
                ];

                const extra = [
                  ['Status', property.status],
                  ['Developer', property.developer],
                  ['RERA Number', property.rera],
                  ['Best Visit Time', property.visitTime],
                  ['Visit Days', Array.isArray(property.visitDays) && property.visitDays.length ? property.visitDays.join(', ') : null],
                  ['Schedule Notes', property.scheduleNotes],
                  ['Additional Notes', property.additionalNotes],
                ];

                let fields = [...common];
                // isPG already declared above (before common array)
                const isFlatmate = !isPG && (type.includes('flatmate') || listingType.includes('flatmate') || Boolean(property.tenantType));
                const isCommercial = !isPG && !isFlatmate && (type.includes('commercial') || Boolean(property.commercialPropertyType || property.buildingType));
                const isPlot = !isPG && !isFlatmate && !isCommercial && (type.includes('land') || type.includes('plot') || Boolean(property.plotLength || property.plotWidth || property.floorsAllowed));
                const isVilla = !isPG && !isFlatmate && !isCommercial && !isPlot && (type.includes('villa') || Boolean(property.villaType));

                if (isPG) {
                  fields = [...fields, ...pg];
                } else if (isFlatmate) {
                  fields = [...fields, ...residential, ...flatmates];
                } else if (isCommercial) {
                  fields = [...fields, ...commercial, ...(listingType.includes('sale') ? commercialSale : commercialRent)];
                } else if (isPlot) {
                  fields = [...fields, ...land, ...plotPricing];
                } else if (isVilla) {
                  fields = [...fields, ...villa];
                  if (listingType.includes('rent')) {
                    // Rent villa: show rent fields but replace 'Monthly Rent' label with maintenance separately
                    const rentWithoutRent = rental.filter(([key]) => key !== 'Monthly Rent');
                    fields = [...fields, ...rentWithoutRent];
                  } else if (listingType.includes('resale') || property.transactionType || property.underLoan) {
                    fields = [...fields, ...resale];
                  }
                  // Always show Monthly Maintenance for villa (all listing types)
                  if (property.maintenance) {
                    fields = [...fields, ['Monthly Maintenance', `₹${Number(property.maintenance).toLocaleString()}/mo`]];
                  }
                } else {
                  // Residential Rent / Resale
                  fields = [...fields, ...residential];
                  if (listingType.includes('resale') || property.transactionType || property.underLoan) {
                    fields = [...fields, ...resale];
                  } else if (listingType.includes('rent') || listingType.includes('pg') || listingType.includes('flatmate')) {
                    fields = [...fields, ...rental];
                  }
                  // sale / new-launch / unknown — no rental fields
                }

                fields = [...fields, ...extra];

                const seen = new Set();
                fields = fields.filter(([key, value]) => {
                  if (
                    value == null ||
                    value === '' ||
                    value === 0 ||
                    value === '0' ||
                    (Array.isArray(value) && value.length === 0) ||
                    seen.has(key)
                  ) return false;
                  seen.add(key);
                  return true;
                });

                return (
                  <div className="grid grid-cols-2">
                    {fields.map(([key, value], i) => (
                      <div
                        key={`${key}-${i}`}
                        className={`flex flex-col px-5 py-3.5 ${
                          Math.floor(i / 2) % 2 === 0
                            ? 'bg-white dark:bg-navy'
                            : 'bg-gray-50/60 dark:bg-white/[0.02]'
                        } ${
                          i % 2 === 0
                            ? 'border-r border-gray-100 dark:border-white/10'
                            : ''
                        } ${
                          i < fields.length - 2
                            ? 'border-b border-gray-100 dark:border-white/10'
                            : ''
                        }`}
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft dark:text-white/40 mb-1">
                          {key}
                        </span>
                        <span className="font-bold text-navy dark:text-white text-sm break-words">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Location & Map — commented out temporarily */}
            {/* <div ref={mapSectionRef} className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10">
                <h2 className="font-display font-bold text-navy dark:text-white text-xl">Location & Neighborhood</h2>
                <p className="text-xs text-ink-soft dark:text-white/40 mt-0.5">Verify nearby landmarks and travel convenience</p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 min-h-[320px] relative z-0">
                  <ErrorBoundary widget>
                    <InteractiveMap
                      properties={propertiesList}
                      center={mapCenter}
                      zoom={mapZoom}
                      activePropertyId={property._id || property.id}
                      showAmenities={nearbyAmenities}
                      amenityCategory={amenityCategory}
                    />
                  </ErrorBoundary>
                </div>
                <div className="w-full lg:w-72 shrink-0 p-4 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-white/10 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'education', label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5" /> },
                      { id: 'transit', label: 'Transit', icon: <TrainFront className="w-3.5 h-3.5" /> },
                      { id: 'medical', label: 'Medical', icon: <Activity className="w-3.5 h-3.5" /> },
                      { id: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
                    ].map(tab => {
                      const active = amenityCategory === tab.id;
                      return (
                        <button key={tab.id} onClick={() => setAmenityCategory(tab.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold border transition-all ${active ? 'bg-gold/10 border-gold/50' : 'bg-gray-50 dark:bg-white/5 border-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-ink-muted dark:text-cream/80'}`}
                          style={active ? { color: '#B8860B' } : {}}
                        >{tab.icon}{tab.label}</button>
                      );
                    })}
                  </div>
                  <div className="space-y-2 overflow-y-auto max-h-60">
                    {(() => {
                      const items = generateNearbyAmenities(property?.coordinates?.lat || 19.0178, property?.coordinates?.lng || 72.8173)[amenityCategory] || [];
                      return items.map((item, idx) => (
                        <div key={idx} onClick={() => { if (item.coordinates) { setMapCenter([item.coordinates.lat, item.coordinates.lng]); setMapZoom(16); } }}
                          className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gold/5 border border-transparent hover:border-gold/20 cursor-pointer transition-all group">
                          <div className="flex gap-2 items-center min-w-0">
                            <div className={`p-1 rounded-lg shrink-0 ${amenityCategory === 'education' ? 'bg-emerald-500/10 text-emerald-500' : amenityCategory === 'transit' ? 'bg-blue-500/10 text-blue-500' : amenityCategory === 'medical' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                              {amenityCategory === 'education' ? <GraduationCap className="w-3 h-3" /> : amenityCategory === 'transit' ? <TrainFront className="w-3 h-3" /> : amenityCategory === 'medical' ? <Activity className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                            </div>
                            <p className="text-xs font-semibold text-navy dark:text-white truncate group-hover:text-gold transition-colors">{item.name}</p>
                          </div>
                          <span className="text-[10px] font-black shrink-0 uppercase" style={{ color: '#B8860B' }}>{item.distance}</span>
                        </div>
                      ));
                    })()}
                  </div>
                  <button
                    onClick={() => { if (property?.coordinates) { setMapCenter([property.coordinates.lat, property.coordinates.lng]); setMapZoom(14); } }}
                    className="flex items-center justify-center gap-1.5 w-full py-2 text-[10px] font-bold uppercase tracking-widest text-ink-muted dark:text-cream/80 hover:text-gold transition-colors border border-dashed border-gray-200 dark:border-white/10 hover:border-gold/30 rounded-xl"
                  ><Locate className="w-3 h-3" style={{ color: '#B8860B' }} /> Recenter</button>
                </div>
              </div>
            </div> */}

          </div>{/* end left column */}

          {/* ─── RIGHT COLUMN: Loan Estimator ─── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-[90px]">
              <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: OR }} />
                  <h2 className="font-display font-bold text-navy dark:text-white text-lg">Loan Estimator</h2>
                </div>
                <div className="space-y-5">
                  <LoanEstimator property={property} OR={OR} />
                </div>
              </div>
            </div>
          </div>

        </div>{/* end grid */}

        {/* Related Properties */}
        <div className="mt-16">
          <h2 className="font-display font-bold text-navy dark:text-white text-2xl mb-8">{relatedLabel}</h2>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-3 gap-7"
          >
            {related.map(p => (
              <motion.div key={p.id} variants={fadeUp}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>{/* end container-luxury */}

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#071A2F]/95 border border-[#B8860B]/30 px-6 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-2xl backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 animate-bounce" style={{ color: '#B8860B' }} />
            <span className="text-white text-xs font-bold uppercase tracking-wider font-accent">Property Link Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}