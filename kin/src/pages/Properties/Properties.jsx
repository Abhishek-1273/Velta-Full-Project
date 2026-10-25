import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Search, ChevronDown, MapPin, Loader2,
  ArrowUpDown, SlidersHorizontal, X, Check, Home,
  Building2, Landmark, Trees, Castle, ChevronUp
} from 'lucide-react';
import PropertyCard from '../../components/common/PropertyCard';
import { properties as staticProperties } from '../../data/properties';
import { fetchProperties, fetchMasterData } from '../../utils/api';
import { fadeUp, staggerContainer } from '../../animations/variants';
import SEO from '../../components/common/SEO';

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const OR = '#A67A08';
const NAVY = '#0B1728';

/* ─── static data ────────────────────────────────────────────────────────── */
const BHK_OPTIONS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
const VILLA_BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
const FACING_OPTIONS = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const FURNISHING_OPTS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
const PROPERTY_AGE_OPTS = ['Under Construction', 'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
const POSSESSION_OPTS = ['Immediately', 'Within 15 days', 'Within 1 month', 'After 2 months', 'After 3 months'];
const TENANT_OPTS = ['Anyone', 'Family', 'Bachelors', 'Company'];
const CITIES = ['All Cities', 'Pune', 'PCMC'];

// Property type → sub ad types (display label → backend value)
const PROP_AD_MAP = {
  Residential: ['Rent', 'Buy', 'PG/Hostel', 'Flatmates'],
  Commercial: ['Rent', 'Buy'],
  'Land/Plot': ['Buy'],
  Villa: ['Buy'],
};
// Map display label → backend adType value
const AD_DISPLAY_TO_BACKEND = { 'Buy': 'Resale' };
const ALL_PROP_TYPES = ['Residential', 'Commercial', 'Land/Plot', 'Villa'];

// Budget slider config per adType
const BUDGET_CFG = {
  Rent: { min: 10000, max: 200000, step: 5000, fmt: v => v >= 100000 ? '₹' + (v / 100000).toFixed(1) + 'L' : '₹' + Math.round(v / 1000) + 'K' },
  'PG/Hostel': { min: 3000, max: 30000, step: 1000, fmt: v => '₹' + (v / 1000).toFixed(1) + 'K' },
  Flatmates: { min: 3000, max: 30000, step: 1000, fmt: v => '₹' + (v / 1000).toFixed(1) + 'K' },
  default: { min: 1000000, max: 100000000, step: 500000, fmt: v => v >= 10000000 ? '₹' + (v / 10000000).toFixed(1) + 'Cr' : '₹' + Math.round(v / 100000) + 'L' },
};

const SORTBY = [
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
  'Area: Large to Small',
];
const SORT_API_MAP = {
  'Newest': 'newest',
  'Price: Low to High': 'price-asc',
  'Price: High to Low': 'price-desc',
  'Area: Large to Small': 'area-desc',
};

const LOCALITIES = {
  Pune: [
    'Koregaon Park', 'Kalyani Nagar', 'Viman Nagar', 'Kharadi', 'Hadapsar',
    'Magarpatta', 'Wagholi', 'Undri', 'Kondhwa', 'Wanowrie', 'NIBM Road',
    'Bibwewadi', 'Katraj', 'Ganga Dham', 'Kothrud', 'Karve Nagar', 'Erandwane', 'Deccan',
    'Shivajinagar', 'Model Colony', 'Aundh', 'Baner', 'Balewadi', 'Sus',
    'Pashan', 'Bavdhan', 'Pimple Gurav', 'Dhanori', 'Lohegaon', 'Vishrantwadi',
  ],
  PCMC: [
    'Wakad', 'Hinjewadi', 'Pimple Saudagar', 'Pimple Nilakh', 'Ravet',
    'Punawale', 'Tathawade', 'Thergaon', 'Chinchwad', 'Pimpri', 'Akurdi',
    'Nigdi', 'Pradhikaran', 'Bhosari', 'Moshi', 'Chakan', 'Dighi', 'Kalewadi',
  ],
};
const ALL_LOCALITIES = [...LOCALITIES.Pune, ...LOCALITIES.PCMC];

/* ─── small helpers ──────────────────────────────────────────────────────── */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 dark:border-white/5 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-[10px] font-accent font-bold tracking-wider uppercase focus:outline-none text-navy dark:text-white"
      >
        {title}
        {open
          ? <ChevronUp size={12} className="text-gray-400 dark:text-white/40" />
          : <ChevronDown size={12} className="text-gray-400 dark:text-white/40" />
        }
      </button>
      {open && (
        <div className="pb-4 pt-1">{children}</div>
      )}
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-[11px] font-accent font-bold tracking-wider uppercase border transition-all duration-200 focus:outline-none whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        borderColor: active ? OR : 'rgba(148,163,184,0.2)',
        background: active ? `${OR}12` : 'transparent',
        color: active ? OR : '#64748B',
      }}
    >
      {children}
    </button>
  );
}

function CheckRow({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 py-2.5 px-1 text-[11px] font-accent font-bold tracking-wider uppercase rounded-xl hover:bg-gold/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
      style={{ color: active ? OR : '#64748B' }}
    >
      <span
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          border: `1.5px solid ${active ? OR : 'rgba(148,163,184,0.4)'}`,
          background: active ? OR : 'transparent',
        }}
      >
        {active && <Check size={10} strokeWidth={3} color="#fff" />}
      </span>
      {label}
    </button>
  );
}

/* ─── BudgetSlider — HTML5 range slider styled with Tailwind ────────────── */
function BudgetSlider({ adType, priceRange, setPriceRange }) {
  const isRentType = adType === 'Rent' || adType === 'PG/Hostel' || adType === 'Flatmates';
  const cfg = BUDGET_CFG[adType] || BUDGET_CFG.default;
  
  // If max is Infinity, represent it as cfg.max + cfg.step (which will act as the "Any" boundary value)
  const sliderMaxVal = cfg.max + cfg.step;
  const currentVal = priceRange.max === Infinity ? sliderMaxVal : Math.min(Math.max(priceRange.max, cfg.min), cfg.max);

  // Local state to keep the drag completely fluid and continuous at 60fps
  const [localVal, setLocalVal] = useState(currentVal);
  const timerRef = useRef(null);

  // Sync localVal if parent priceRange changes externally (e.g. on Clear All)
  useEffect(() => {
    setLocalVal(currentVal);
  }, [priceRange.max, currentVal]);

  // Clean up debouncing timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSliderChange = (e) => {
    const v = parseInt(e.target.value, 10);
    setLocalVal(v);
    
    // Clear previous debouncing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set new timer to update parent state after 300ms of inactivity
    timerRef.current = setTimeout(() => {
      if (v >= sliderMaxVal - (cfg.step / 2)) {
        setPriceRange({ min: 0, max: Infinity });
      } else {
        const rounded = Math.round(v / cfg.step) * cfg.step;
        setPriceRange({ min: 0, max: Math.max(rounded, cfg.min) });
      }
    }, 300);
  };

  const isMax = localVal >= sliderMaxVal - (cfg.step / 2);

  return (
    <FilterSection title={isRentType ? 'Rent Range' : 'Price Range'}>
      <div className="flex flex-col gap-3 px-1">
        {/* Header value display */}
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-gray-400 font-medium">Max Budget</span>
          <span className="text-[13px] font-black tracking-wide" style={{ color: OR }}>
            {isMax ? 'Any' : cfg.fmt(localVal)}
          </span>
        </div>

        {/* Scrollable range slider */}
        <div className="relative pt-1 flex items-center">
          <input
            type="range"
            min={cfg.min}
            max={sliderMaxVal}
            // Use small step intervals for pixel-perfect continuous drag smoothness
            step={isRentType ? 100 : 10000}
            value={localVal}
            onChange={handleSliderChange}
            className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 transition-all duration-75"
            style={{
              accentColor: OR,
              background: `linear-gradient(to right, ${OR} 0%, ${OR} ${((localVal - cfg.min) / (sliderMaxVal - cfg.min)) * 100}%, rgba(148,163,184,0.15) ${((localVal - cfg.min) / (sliderMaxVal - cfg.min)) * 100}%, rgba(148,163,184,0.15) 100%)`
            }}
          />
        </div>

        {/* Min/Max legend */}
        <div className="flex justify-between items-center text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
          <span>{cfg.fmt(cfg.min)}</span>
          <span>Any</span>
        </div>
      </div>
    </FilterSection>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* filter state */
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All Cities');
  const [propType, setPropType] = useState('Residential');  // merged: Residential/Commercial/Land/Villa
  const [adType, setAdType] = useState('Buy');          // sub-type under propType
  const [localities, setLocalities] = useState([]);
  const [bhk, setBhk] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [furnishing, setFurnishing] = useState([]);
  const [facing, setFacing] = useState([]);
  const [propAge, setPropAge] = useState('');
  const [possession, setPossession] = useState('');
  const [commercialPropertyType, setCommercialPropertyType] = useState('');
  const [tenantPref, setTenantPref] = useState('');
  const [pgGender, setPgGender] = useState('');
  const [roomType, setRoomType] = useState('');
  const [pgFood, setPgFood] = useState([]);
  const [buildingType, setBuildingType] = useState('');
  const [tenantType, setTenantType] = useState('');
  const [parkingType, setParkingType] = useState('');
  const [plotAreaBucket, setPlotAreaBucket] = useState(''); // 'Below 1000' | '1000-2000' | '2000-5000' | '5000+'

  /* location search / autocomplete state */
  const [locInput, setLocInput] = useState('');
  const [locOpen, setLocOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const locInputRef = useRef(null);
  const locDropRef = useRef(null);
  const cityDropRef = useRef(null);

  /* ui state */
  const [sort, setSort] = useState('Newest');
  const [view, setView] = useState('list');
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);   // mobile
  const [localQuery, setLocalQuery] = useState('');      // sidebar locality search

  /* data state */
  const [allProperties, setAllProperties] = useState(staticProperties);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [total, setTotal] = useState(staticProperties.length);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dynamicLocalities, setDynamicLocalities] = useState([]);
  const [dynamicTypes, setDynamicTypes] = useState([]);

  const sortRef = useRef(null);

  /* ── close sort on outside click ─────────────────────────────────────── */
  useEffect(() => {
    const h = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* ── close location dropdown on outside click ────────────────────────── */
  useEffect(() => {
    const h = e => {
      if (locDropRef.current && !locDropRef.current.contains(e.target) &&
        locInputRef.current && !locInputRef.current.contains(e.target)) {
        setLocOpen(false);
      }
      if (cityDropRef.current && !cityDropRef.current.contains(e.target)) {
        setCityOpen(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* ── master data ─────────────────────────────────────────────────────── */
  useEffect(() => {
    fetchMasterData()
      .then(data => {
        if (data?.locality) {
          setDynamicLocalities(data.locality);
        } else if (data?.locality_pune && data?.locality_pcmc) {
          setDynamicLocalities([...data.locality_pune, ...data.locality_pcmc]);
        }
        if (data?.propertyType) setDynamicTypes(['All', ...data.propertyType]);
      })
      .catch(() => { });
  }, []);

  /* ── read URL params from hero search ───────────────────────────────── */
  useEffect(() => {
    // ?city=Pune / PCMC
    const cityParam = searchParams.get('city');
    if (cityParam === 'PCMC') setCity('PCMC');
    else if (cityParam === 'Pune') setCity('Pune');
    else setCity('All Cities');

    // ?locality=Baner,Kharadi
    const localityParam = searchParams.get('locality');
    if (localityParam) {
      const locs = localityParam.split(',').map(l => l.trim()).filter(Boolean);
      setLocalities(locs);
    } else {
      setLocalities([]);
    }

    // ?bhk=2 BHK,3 BHK
    const bhkParam = searchParams.get('bhk');
    if (bhkParam) {
      setBhk(bhkParam.split(',').map(b => b.trim()).filter(Boolean));
    } else {
      setBhk([]);
    }

    // ?propertyType=Residential|Commercial|Land/Plot|Villa (from Hero)
    const propTypeParam = searchParams.get('propertyType');

    // Read adType first because PG/Hostel and Flatmates are listing types,
    // not property types. They must NOT inherit the default Residential
    // property filter.
    const adTypeParam = searchParams.get('adType');
    const normalizedAdType = adTypeParam
      ? (adTypeParam.toLowerCase() === 'pg/hostel' ? 'PG/Hostel'
        : adTypeParam.toLowerCase() === 'flatmates' ? 'Flatmates'
        : adTypeParam.toLowerCase() === 'rent' ? 'Rent'
        : adTypeParam.toLowerCase() === 'buy' ? 'Buy'
        : adTypeParam)
      : '';

    let resolvedPropType = 'Residential';

    if (normalizedAdType === 'PG/Hostel' || normalizedAdType === 'Flatmates') {
      // PG/Hostel and Flatmates live under Residential in the filter bar.
      // Keep propType = 'Residential' so the top bar highlights correctly
      // and the sidebar renders PG/Flatmate-specific filters via isPG/isFlatmate.
      resolvedPropType = 'Residential';
    } else if (propTypeParam) {
      const lower = propTypeParam.toLowerCase();
      const match = ALL_PROP_TYPES.find(t => t.toLowerCase() === lower ||
        (lower === 'land/plot' && t === 'Land/Plot') ||
        (lower === 'plot' && t === 'Land/Plot')
      );
      resolvedPropType = match || 'Residential';
    }

    setPropType(resolvedPropType);

    // ?adType=Rent|Buy|PG/Hostel|Flatmates (from Hero)
    if (normalizedAdType) {
      const validAdTypes = PROP_AD_MAP[resolvedPropType] || [];
      // PG/Hostel + Flatmates are valid listing types independent of propType.
      if (normalizedAdType === 'PG/Hostel' || normalizedAdType === 'Flatmates') {
        setAdType(normalizedAdType);
      } else {
        const matchedAd = validAdTypes.find(a => a.toLowerCase() === normalizedAdType.toLowerCase());
        setAdType(matchedAd || validAdTypes[0] || 'Buy');
      }
    } else {
      setAdType(PROP_AD_MAP[resolvedPropType]?.[0] || 'Buy');
    }

    // ?search=...
    const searchP = searchParams.get('search');
    if (searchP) setQuery(searchP);

    // ?commercialPropertyType=... (from Hero Commercial Buy)
    const commercialPropertyTypeParam = searchParams.get('commercialPropertyType');
    if (commercialPropertyTypeParam) setCommercialPropertyType(commercialPropertyTypeParam);
    else setCommercialPropertyType('');

    // ?possession=... (Availability / Available From from Hero)
    const facingParam = searchParams.get('facing');
    if (facingParam) setFacing(facingParam.split(',').map(f => f.trim()).filter(Boolean));
    else setFacing([]);

    const possessionParam = searchParams.get('possession');
    if (possessionParam) setPossession(possessionParam);
    else setPossession('');

    // ?tenantType=Male|Female|Anyone (from Hero PG/Flatmates)
    const tenantTypeParam = searchParams.get('tenantType');
    if (tenantTypeParam) setTenantType(tenantTypeParam);

    // ?pgGender=Male|Female|Any (from Hero PG)
    const pgGenderParam = searchParams.get('pgGender');
    if (pgGenderParam) setPgGender(pgGenderParam);
    else setPgGender('');

    // ?pgRooms=Single|Double|Triple|Shared (DB exact values)
    const pgRoomsParam = searchParams.get('pgRooms');
    const roomTypeParam = searchParams.get('roomType');
    const rawRoom = pgRoomsParam || roomTypeParam || '';
    if (rawRoom) {
      setRoomType(rawRoom);
    } else {
      setRoomType('');
    }

    // ?status=Ready to Move|Under Construction (from Hero Buy tab)
    const statusParam = searchParams.get('status');
    if (statusParam) setPropAge(statusParam);

  }, [searchParams]);

  /* ── reset page on filter change ─────────────────────────────────────── */
  useEffect(() => { setPage(1); }, [query, city, adType, propType, localities, bhk, priceRange, furnishing, facing, propAge, possession, commercialPropertyType, tenantPref, pgGender, roomType, pgFood, buildingType, tenantType, parkingType, plotAreaBucket, sort]);

  /* ── scroll top on page change ───────────────────────────────────────── */
  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [page]);

  /* ── fetch ───────────────────────────────────────────────────────────── */
  const loadProperties = useCallback(async (signal) => {
    setLoading(true);
    try {
      const params = { sort: SORT_API_MAP[sort], page, limit: 9 };

      // propType: frontend uses "Land/Plot" but admin DB stores type:"Plot"
      // send both so backend $or catches admin + user listings
      const PROP_TYPE_MAP = { 'Land/Plot': 'Plot', 'Residential': 'Residential', 'Commercial': 'Commercial', 'Villa': 'Villa' };
      // PG/Hostel and Flatmates are scoped by listingType (adType).
      // Do NOT add Residential type/propertyType filters for them.
      if (propType && propType !== 'All' && adType !== 'PG/Hostel' && adType !== 'Flatmates') {
        params.type = PROP_TYPE_MAP[propType] || propType;
        params.propertyType = propType;
      }

      // Residential/Villa/Plot: Buy → "Resale" | Commercial: Buy → "Sale"
      if (propType === 'Commercial' && adType === 'Buy') {
        params.adType = 'Sale';
      } else {
        params.adType = AD_DISPLAY_TO_BACKEND[adType] || adType; // Buy→Resale for backend
      }
      if (localities.length) params.locality = localities.join(',');
      if (city !== 'All Cities') params.city = city;
      if (query) params.search = query;
      if (priceRange.min > 0) params.minPrice = priceRange.min;
      if (priceRange.max !== Infinity) params.maxPrice = priceRange.max;
      if (bhk.length) params.bhk = bhk.join(',');
      if (furnishing.length) params.furnishing = furnishing.join(',');
      if (facing.length) params.facing = facing.join(',');

      // propAge stores both status values ("Ready to Move","Under Construction")
      // and age values ("Less than 1 year","1-3 years" etc.)
      // Backend has separate fields: status vs propertyAge — split them correctly
      const STATUS_VALUES = ['Ready to Move', 'Under Construction', 'Pre-Launch', 'Sold Out'];
      if (propAge) {
        if (STATUS_VALUES.includes(propAge)) {
          params.status = propAge;        // → filter.status in backend
        } else {
          params.propertyAge = propAge;   // → filter.propertyAge in backend
        }
      }

      if (possession) params.possession = possession;
      if (commercialPropertyType) params.commercialPropertyType = commercialPropertyType;
      if (tenantPref) params.tenantPref = tenantPref;
      if (pgGender) params.pgGender = pgGender;
      if (roomType) {
        if (adType === 'PG/Hostel') {
          // DB stores pgRooms as array of exact strings: "Single"|"Double"|"Triple"|"Shared"
          params.pgRooms = roomType;
        } else {
          params.roomType = roomType;
        }
      }
      if (pgFood.length) params.pgFood = pgFood.join(',');
      if (buildingType) params.buildingType = buildingType;
      if (tenantType) params.tenantType = tenantType;
      if (parkingType) params.parkingType = parkingType;

      // Plot Area bucket → actual minArea / maxArea params
      if (plotAreaBucket) {
        const plotAreaMap = {
          'Below 1000': { minArea: 0,    maxArea: 999  },
          '1000-2000':  { minArea: 1000, maxArea: 2000 },
          '2000-5000':  { minArea: 2001, maxArea: 5000 },
          '5000+':      { minArea: 5001, maxArea: undefined },
        };
        const areaRange = plotAreaMap[plotAreaBucket];
        if (areaRange) {
          if (areaRange.minArea) params.minArea = areaRange.minArea;
          if (areaRange.maxArea) params.maxArea = areaRange.maxArea;
        }
      }

      const data = await fetchProperties(params, { signal });
      setAllProperties(data.properties);
      const totalCount = data.total ?? data.properties.length;
      setTotal(totalCount);
      setTotalPages(Math.ceil(totalCount / 9) || 1);
      setApiError(false);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setApiError(true);
      // client-side fallback
      const f = staticProperties.filter(p => {
        if (query && !p.title.toLowerCase().includes(query.toLowerCase()) &&
          !p.location.toLowerCase().includes(query.toLowerCase())) return false;
        if (propType !== 'All') {
          const allowedTypes = {
            Residential: ['Apartment', 'Penthouse', 'PG/Hostel', 'Flatmates'],
            Villa: ['Villa', 'Bungalow'],
            'Land/Plot': ['Plot'],
            Commercial: ['Commercial']
          }[propType] || [propType];
          if (!allowedTypes.includes(p.type)) return false;
        }
        if (localities.length) {
          const matchLoc = localities.some(l =>
            p.location.toLowerCase().includes(l.toLowerCase())
          );
          if (!matchLoc) return false;
        }
        if (priceRange.min > 0 && p.price < priceRange.min) return false;
        if (priceRange.max !== Infinity && p.price > priceRange.max) return false;
        if (bhk.length) {
          const beds = `${p.bedrooms} BHK`;
          if (!bhk.some(b => b === beds || (b === '4+ BHK' && p.bedrooms >= 4))) return false;
        }

        return true;
      });
      setAllProperties(f.slice((page - 1) * 9, page * 9));
      setTotal(f.length);
      setTotalPages(Math.ceil(f.length / 9) || 1);
    } finally {
      setLoading(false);
    }
  }, [sort, page, propType, localities, query, priceRange, bhk, city, adType, furnishing, facing, propAge, possession, commercialPropertyType, tenantPref, pgGender, roomType, pgFood, buildingType, tenantType, parkingType, plotAreaBucket]);

  useEffect(() => {
    const c = new AbortController();
    const t = setTimeout(() => loadProperties(c.signal), query ? 350 : 0);
    return () => { clearTimeout(t); c.abort(); };
  }, [loadProperties]);

  /* ── helpers ─────────────────────────────────────────────────────────── */
  const toggleBhk = v => setBhk(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleLocality = l => setLocalities(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  const toggleFurnish = v => setFurnishing(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleFacing = v => setFacing(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const clearAll = () => {
    setQuery(''); setCity('All Cities'); setAdType('All'); setPropType('All');
    setLocalities([]); setBhk([]);
    setPriceRange({ min: 0, max: Infinity }); setFurnishing([]); setFacing([]); setPropAge(''); setPossession(''); setCommercialPropertyType(''); setTenantPref('');
    setPgGender(''); setRoomType(''); setPgFood([]); setBuildingType(''); setTenantType(''); setParkingType('');
    setLocInput('');
    setSearchParams({});
  };

  const activeFilterCount = [
    false, // city is top-bar selection, not sidebar filter
    false, // propType always selected
    false, // adType always selected
    localities.length > 0,
    bhk.length > 0,

    priceRange.min > 0 || priceRange.max !== Infinity,
    furnishing.length > 0,

    propAge !== '',
    possession !== '',
    tenantPref !== '',
  ].filter(Boolean).length;

  const displayLocalities = useMemo(() => {
    let base;
    if (dynamicLocalities.length) {
      base = dynamicLocalities;
    } else if (city === 'Pune') {
      base = LOCALITIES.Pune;
    } else if (city === 'PCMC') {
      base = LOCALITIES.PCMC;
    } else {
      base = ALL_LOCALITIES;
    }
    return localQuery
      ? base.filter(l => l.toLowerCase().includes(localQuery.toLowerCase()))
      : base;
  }, [dynamicLocalities, localQuery, city]);

  // autocomplete suggestions for top bar location input
  const locSuggestions = useMemo(() => {
    if (!locInput.trim()) return [];
    let base;
    if (dynamicLocalities.length) {
      base = dynamicLocalities;
    } else if (city === 'Pune') {
      base = LOCALITIES.Pune;
    } else if (city === 'PCMC') {
      base = LOCALITIES.PCMC;
    } else {
      base = ALL_LOCALITIES;
    }
    return base
      .filter(l => l.toLowerCase().includes(locInput.toLowerCase()) && !localities.includes(l))
      .slice(0, 8);
  }, [locInput, city, localities, dynamicLocalities]);

  /* ── sidebar ─────────────────────────────────────────────────────────── */
  const SidebarContent = () => {
    const isBuy = adType === 'Buy';
    const isRent = adType === 'Rent';
    const isPG = adType === 'PG/Hostel';
    const isFlatmate = adType === 'Flatmates';
    const isRentType = isRent || isPG || isFlatmate;
    const isRes = propType === 'Residential';
    const isCom = propType === 'Commercial';
    const isPlot = propType === 'Land/Plot';
    const isVilla = propType === 'Villa';

    const toggleArr = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

    const Row = ({ label, active, onClick }) => (
      <button onClick={onClick}
        className="w-full flex items-center gap-2.5 py-2 px-1 text-[12px] font-semibold rounded-lg hover:bg-amber-50 transition-colors focus:outline-none"
        style={{ color: active ? OR : '#334155' }}
      >
        <span
          className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all border"
          style={{
            borderColor: active ? OR : 'rgba(150, 150, 150, 0.3)',
            background: active ? OR : 'transparent',
          }}
        >
          {active && <Check size={10} strokeWidth={3} color="#fff" />}
        </span>
        {label}
      </button>
    );

    return (
      <div className="flex flex-col gap-2">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pt-4 pb-4 mb-2 border-b border-gray-100 dark:border-white/5 sticky top-0 bg-white dark:bg-navy z-10">
          <span className="font-accent font-bold text-[10px] tracking-widest uppercase text-navy dark:text-white">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
          <button
            onClick={clearAll}
            className="text-[10px] font-accent font-bold tracking-wider uppercase hover:opacity-85 transition-opacity"
            style={{ color: OR }}
          >
            Clear All
          </button>
        </div>

        {/* ── RESIDENTIAL RENT ─────────────────────────────────────────── */}
        {isRes && isRent && (<>
          <FilterSection title="BHK">
            <div className="flex flex-wrap gap-1.5">{BHK_OPTIONS.map(b => <Pill key={b} active={bhk.includes(b)} onClick={() => toggleBhk(b)}>{b}</Pill>)}</div>
          </FilterSection>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Availability" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{POSSESSION_OPTS.map(p => <Row key={p} label={p} active={possession === p} onClick={() => setPossession(possession === p ? '' : p)} />)}</div>
          </FilterSection>
          <FilterSection title="Preferred Tenant" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Anyone', 'Family', 'Bachelors', 'Company'].map(t => <Row key={t} label={t} active={tenantPref === t} onClick={() => setTenantPref(tenantPref === t ? '' : t)} />)}</div>
          </FilterSection>
          <FilterSection title="Furnishing" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">{FURNISHING_OPTS.map(f => <Pill key={f} active={furnishing.includes(f)} onClick={() => toggleFurnish(f)}>{f}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Parking" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Two Wheeler', 'Four Wheeler', 'Both'].map(p => <Row key={p} label={p} active={parkingType === p} onClick={() => setParkingType(parkingType === p ? '' : p)} />)}</div>
          </FilterSection>
        </>)}

        {/* ── RESIDENTIAL BUY ──────────────────────────────────────────── */}
        {isRes && isBuy && (<>
          <FilterSection title="BHK">
            <div className="flex flex-wrap gap-1.5">{BHK_OPTIONS.map(b => <Pill key={b} active={bhk.includes(b)} onClick={() => toggleBhk(b)}>{b}</Pill>)}</div>
          </FilterSection>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Property Status" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">
              {['Ready to Move', 'Under Construction'].map(a => (
                <Row key={a} label={a} active={propAge === a} onClick={() => setPropAge(propAge === a ? '' : a)} />
              ))}
            </div>
          </FilterSection>
          <FilterSection title="Furnishing" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">{FURNISHING_OPTS.map(f => <Pill key={f} active={furnishing.includes(f)} onClick={() => toggleFurnish(f)}>{f}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Parking" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Two Wheeler', 'Four Wheeler', 'Both'].map(p => <Row key={p} label={p} active={parkingType === p} onClick={() => setParkingType(parkingType === p ? '' : p)} />)}</div>
          </FilterSection>
        </>)}

        {/* ── PG / HOSTEL ───────────────────────────────────────────────── */}
        {isPG && (<>
          <FilterSection title="For">
            <div className="flex gap-1.5">{['Male', 'Female', 'Any'].map(g => <Pill key={g} active={pgGender === g} onClick={() => setPgGender(pgGender === g ? '' : g)}>{g}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Room Type">
            <div className="flex gap-1.5 overflow-x-auto pb-1.5" style={{ scrollbarWidth: "none" }}>{['Single', 'Double', 'Triple', 'Shared'].map(r => <Pill key={r} active={roomType === r} onClick={() => setRoomType(roomType === r ? '' : r)}>{r}</Pill>)}</div>
          </FilterSection>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Food Included" defaultOpen={false}>
            <div className="flex gap-1.5 overflow-x-auto pb-1.5" style={{ scrollbarWidth: "none" }}>{['Breakfast', 'Lunch', 'Dinner', 'All Meals'].map(f => <Pill key={f} active={pgFood.includes(f)} onClick={() => toggleArr(setPgFood, f)}>{f}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Preferred For" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Student', 'Working Professional', 'Any'].map(t => <Row key={t} label={t} active={tenantType === t} onClick={() => setTenantType(tenantType === t ? '' : t)} />)}</div>
          </FilterSection>
        </>)}

        {/* ── FLATMATES ─────────────────────────────────────────────────── */}
        {isFlatmate && (<>
          <FilterSection title="BHK">
            <div className="flex flex-wrap gap-1.5">{BHK_OPTIONS.map(b => <Pill key={b} active={bhk.includes(b)} onClick={() => toggleBhk(b)}>{b}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Room Type">
            <div className="flex gap-1.5">{['Shared', 'Single'].map(r => <Pill key={r} active={roomType === r} onClick={() => setRoomType(roomType === r ? '' : r)}>{r}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Looking For">
            <div className="flex gap-1.5">{['Male', 'Female', 'Any'].map(g => <Pill key={g} active={tenantType === g} onClick={() => setTenantType(tenantType === g ? '' : g)}>{g}</Pill>)}</div>
          </FilterSection>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Furnishing" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">{FURNISHING_OPTS.map(f => <Pill key={f} active={furnishing.includes(f)} onClick={() => toggleFurnish(f)}>{f}</Pill>)}</div>
          </FilterSection>
        </>)}

        {/* ── LAND / PLOT ───────────────────────────────────────────────── */}
        {isPlot && (<>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Plot Area (sqft)" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Below 1000', '1000-2000', '2000-5000', '5000+'].map(a => <Row key={a} label={a} active={plotAreaBucket === a} onClick={() => setPlotAreaBucket(plotAreaBucket === a ? '' : a)} />)}</div>
          </FilterSection>
          <FilterSection title="Facing" defaultOpen={false}>
            <div className="flex gap-1.5 overflow-x-auto pb-1.5" style={{ scrollbarWidth: "none" }}>{FACING_OPTIONS.map(f => <Pill key={f} active={facing.includes(f)} onClick={() => toggleFacing(f)}>{f}</Pill>)}</div>
          </FilterSection>
        </>)}

        {/* ── VILLA BUY ─────────────────────────────────────────────────── */}
        {isVilla && isBuy && (<>
          <FilterSection title="BHK">
            <div className="flex flex-wrap gap-1.5">{VILLA_BHK_OPTIONS.map(b => <Pill key={b} active={bhk.includes(b)} onClick={() => toggleBhk(b)}>{b}</Pill>)}</div>
          </FilterSection>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Furnishing" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">{FURNISHING_OPTS.map(f => <Pill key={f} active={furnishing.includes(f)} onClick={() => toggleFurnish(f)}>{f}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Property Status" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Ready to Move', 'Under Construction'].map(a => <Row key={a} label={a} active={propAge === a} onClick={() => setPropAge(propAge === a ? '' : a)} />)}</div>
          </FilterSection>
          <FilterSection title="Parking" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Two Wheeler', 'Four Wheeler', 'Both'].map(p => <Row key={p} label={p} active={parkingType === p} onClick={() => setParkingType(parkingType === p ? '' : p)} />)}</div>
          </FilterSection>
        </>)}

        {/* ── COMMERCIAL RENT ───────────────────────────────────────────── */}
        {isCom && isRent && (<>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Furnishing" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">{FURNISHING_OPTS.map(f => <Pill key={f} active={furnishing.includes(f)} onClick={() => toggleFurnish(f)}>{f}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Property Type" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Office Space', 'Showroom', 'Shop', 'Industrial Building', 'Co-working', 'Warehouse', 'Other'].map(t => <Row key={t} label={t} active={commercialPropertyType === t} onClick={() => setCommercialPropertyType(commercialPropertyType === t ? '' : t)} />)}</div>
          </FilterSection>
          <FilterSection title="Availability" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{POSSESSION_OPTS.map(p => <Row key={p} label={p} active={possession === p} onClick={() => setPossession(possession === p ? '' : p)} />)}</div>
          </FilterSection>
          <FilterSection title="Parking" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Public', 'Reserved', 'Both'].map(p => <Row key={p} label={p} active={parkingType === p} onClick={() => setParkingType(parkingType === p ? '' : p)} />)}</div>
          </FilterSection>
        </>)}

        {/* ── COMMERCIAL BUY ────────────────────────────────────────────── */}
        {isCom && isBuy && (<>
          <BudgetSlider adType={adType} priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterSection title="Furnishing" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">{FURNISHING_OPTS.map(f => <Pill key={f} active={furnishing.includes(f)} onClick={() => toggleFurnish(f)}>{f}</Pill>)}</div>
          </FilterSection>
          <FilterSection title="Property Type" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Office Space', 'Showroom', 'Shop', 'Industrial Building', 'Co-working', 'Warehouse', 'Other'].map(t => <Row key={t} label={t} active={commercialPropertyType === t} onClick={() => setCommercialPropertyType(commercialPropertyType === t ? '' : t)} />)}</div>
          </FilterSection>
          <FilterSection title="Availability" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{POSSESSION_OPTS.map(a => <Row key={a} label={a} active={possession === a} onClick={() => setPossession(possession === a ? '' : a)} />)}</div>
          </FilterSection>
          <FilterSection title="Parking" defaultOpen={false}>
            <div className="flex flex-col gap-0.5">{['Public', 'Reserved', 'Both'].map(p => <Row key={p} label={p} active={parkingType === p} onClick={() => setParkingType(parkingType === p ? '' : p)} />)}</div>
          </FilterSection>
        </>)}
      </div>
    );
  };

  /* ── render ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-20 pb-16 transition-colors duration-300">
      <SEO
        title="Properties in Pune & PCMC"
        description="Browse verified properties for buy and rent in Pune and PCMC. Filter by locality, BHK, budget and more."
        url="/properties"
      />

      {/* ── Top Filter Bar ─────────────────────────── */}
      {/* ── Property Type + Ad Type selector bar ─────────────────────────── */}
      <div className="bg-white dark:bg-navy border-b border-gray-100 dark:border-white/10">
        {/* Row 1: search + city + sort */}
        <div className="w-full px-4 pt-6 pb-2 flex flex-col md:flex-row md:items-center gap-3 md:gap-2">
          
          {/* Location search */}
          <div className="relative w-full md:flex-1 md:max-w-md order-1 md:order-2">
            <div className="flex items-center flex-wrap gap-1.5 min-h-9 px-2.5 rounded-xl border border-gray-200 bg-white focus-within:border-amber-400 transition-colors">
              <Search size={13} className="text-gray-400 shrink-0" />
              {localities.map(l => (
                <span key={l} className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold text-white shrink-0" style={{ background: OR }}>
                  {l}<button onClick={() => toggleLocality(l)} className="hover:opacity-70 font-bold">×</button>
                </span>
              ))}
              <input ref={locInputRef} value={locInput}
                onChange={e => { setLocInput(e.target.value); setLocOpen(true); }}
                onFocus={() => setLocOpen(true)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (locSuggestions.length > 0) {
                      toggleLocality(locSuggestions[0]);
                      setLocInput('');
                      setLocOpen(false);
                    }
                  }
                }}
                placeholder={localities.length ? 'Add more...' : 'Search location...'}
                className="flex-1 min-w-[100px] h-7 bg-transparent text-[12px] placeholder-gray-400 focus:outline-none"
              />
              {(locInput || localities.length > 0) && (
                <button onClick={() => { setLocInput(''); setLocalities([]); setLocOpen(false); }} className="text-gray-400 hover:text-gray-600">
                  <X size={13} />
                </button>
              )}
            </div>
            <AnimatePresence>
              {locOpen && locSuggestions.length > 0 && (
                <motion.div ref={locDropRef} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.13 }}
                  className="absolute left-0 top-full mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 z-50 max-h-56 overflow-y-auto"
                >
                  {locSuggestions.map(l => (
                    <button key={l} onMouseDown={e => { e.preventDefault(); toggleLocality(l); setLocInput(''); }}
                      className="w-full text-left px-4 py-2 text-[12px] font-semibold flex items-center gap-2.5 hover:bg-amber-50 transition-colors" style={{ color: '#334155' }}
                    >
                      <MapPin size={12} style={{ color: OR }} />{l}
                      <span className="ml-auto text-[10px] text-gray-400">{city === 'All Cities' ? (LOCALITIES.Pune.includes(l) ? 'Pune' : 'PCMC') : city}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 w-full md:w-auto order-2 md:order-1">
            {/* mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 h-9 px-3.5 rounded-xl border font-semibold text-[12px] flex-1 sm:flex-initial shrink-0"
              style={{ borderColor: OR, color: OR, background: `${OR}12` }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: OR }}>{activeFilterCount}</span>
              )}
            </button>

            {/* City */}
            <div className="relative shrink-0 flex-1 sm:flex-initial" ref={cityDropRef}>
              <button onClick={() => setCityOpen(o => !o)}
                className="flex items-center justify-center gap-1.5 h-9 w-full sm:w-auto px-3 rounded-xl border text-[12px] font-bold transition-colors"
                style={{ borderColor: city !== 'All Cities' ? OR : '#E2E8F0', background: city !== 'All Cities' ? `${OR}12` : '#FAFBFC', color: city !== 'All Cities' ? OR : NAVY }}
              >
                <MapPin size={13} />{city}
                <ChevronDown size={11} className={`transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {cityOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.13 }}
                    className="absolute left-0 top-full mt-1.5 w-36 bg-white dark:bg-navy border border-gray-100 rounded-xl shadow-xl py-1 z-50"
                  >
                    {CITIES.map(c => (
                      <button key={c} onClick={() => { setCity(c); setCityOpen(false); setLocalities([]); setLocInput(''); }}
                        className="w-full text-left px-3.5 py-2 text-[12px] font-semibold flex items-center justify-between hover:bg-amber-50 transition-colors"
                        style={{ color: city === c ? OR : '#334155' }}
                      >{c}{city === c && <Check size={11} style={{ color: OR }} />}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block h-6 w-px bg-gray-200 shrink-0" />

            {/* Sort */}
            <div className="relative shrink-0 flex-1 sm:flex-initial" ref={sortRef}>
              <button onClick={() => setSortOpen(o => !o)}
                className="flex items-center justify-center gap-2 h-9 w-full sm:w-auto px-3.5 rounded-xl border border-gray-200 text-[12px] font-semibold bg-white text-navy hover:border-amber-400 transition-colors"
              >
                <ArrowUpDown size={13} className="text-gray-400" />
                <span>{sort}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50"
                  >
                    {SORTBY.map(s => (
                      <button key={s} onClick={() => { setSort(s); setSortOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-[12px] font-semibold flex items-center justify-between hover:bg-amber-50 transition-colors"
                        style={{ color: sort === s ? OR : '#334155' }}
                      >{s}{sort === s && <Check size={12} style={{ color: OR }} />}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Row 2: Property Type + Ad Type — all screens */}
        <div className="w-full px-4 pt-4 pb-4 overflow-x-auto no-scrollbar border-t border-gray-100 dark:border-white/10">
          <div className="flex gap-8 min-w-max">
            {ALL_PROP_TYPES.map(pt => {
              const adTypes = PROP_AD_MAP[pt];
              const isActiveProp = propType === pt;
              return (
                <div key={pt} className="flex flex-col items-start gap-1.5">
                  <button
                    onClick={() => { setPropType(pt); setAdType(PROP_AD_MAP[pt][0]); setPriceRange({ min: 0, max: Infinity }); setBhk([]); setFurnishing([]); setPropAge(''); setPossession(''); setCommercialPropertyType(''); setTenantPref(''); setPgGender(''); setRoomType(''); setPgFood([]); setTenantType(''); setParkingType(''); setFacing([]); setPlotAreaBucket(''); setBuildingType(''); }}
                    className="text-[11px] font-black uppercase tracking-wide pb-1 transition-all border-b-2"
                    style={{ color: isActiveProp ? OR : '#94A3B8', borderColor: isActiveProp ? OR : 'transparent' }}
                  >{pt}</button>
                  <div className="flex gap-1.5 flex-wrap">
                    {adTypes.map(at => {
                      const isActiveAd = isActiveProp && adType === at;
                      return (
                        <button key={at}
                          onClick={() => { setPropType(pt); setAdType(at); setPriceRange({ min: 0, max: Infinity }); setBhk([]); setFurnishing([]); setPropAge(''); setPossession(''); setCommercialPropertyType(''); setTenantPref(''); setPgGender(''); setRoomType(''); setPgFood([]); setTenantType(''); setParkingType(''); setFacing([]); setPlotAreaBucket(''); setBuildingType(''); }}
                          className="px-3 py-1 rounded-lg text-[11px] font-semibold transition-all border"
                          style={{ background: isActiveAd ? OR : isActiveProp ? `${OR}10` : 'transparent', color: isActiveAd ? '#fff' : isActiveProp ? OR : '#94A3B8', borderColor: isActiveAd ? OR : isActiveProp ? `${OR}40` : '#E2E8F0' }}
                        >{at}</button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main layout: sidebar + grid ─────────────────────────────────── */}
      <div className="w-full px-4 pt-4 pb-6 flex gap-4 items-start">

        {/* ── Desktop sidebar ─────────────────────────────────────────── */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-28" data-lenis-prevent>
          <div 
            className="bg-white dark:bg-navy rounded-2xl overflow-hidden" 
            style={{ boxShadow: '0 2px 16px rgba(11,23,40,0.06)' }}
          >
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
              <div className="px-4 pt-4 pb-4">
                {SidebarContent()}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Properties grid ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] text-gray-500 dark:text-white/50">
              {loading
                ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading…</span>
                : <><span className="font-bold text-navy dark:text-white">{total}</span> properties found</>
              }
            </p>
            {apiError && (
              <span className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Showing cached listings
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-white dark:bg-navy border border-gray-100 dark:border-white/10 overflow-hidden animate-pulse flex h-40">
                  <div className="w-48 shrink-0 bg-gray-100 dark:bg-navy-light" />
                  <div className="flex-1 p-4 space-y-2.5">
                    <div className="h-4 bg-gray-100 dark:bg-navy-light rounded w-3/4" />
                    <div className="h-3 bg-gray-100 dark:bg-navy-light rounded w-1/2" />
                    <div className="h-5 bg-gray-100 dark:bg-navy-light rounded w-1/3" />
                    <div className="h-3 bg-gray-100 dark:bg-navy-light rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : allProperties.length > 0 ? (
            <motion.div
              variants={staggerContainer} initial="hidden" animate="visible"
              className="flex flex-col gap-4"
            >
              {allProperties.map(p => (
                <motion.div key={p._id || p.id} variants={fadeUp} className="rounded-2xl overflow-hidden">
                  <PropertyCard property={p} view={view} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm"
            >
              {/* Circular Badge Icon */}
              <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute w-20 h-20 bg-gold/5 dark:bg-white/5 rounded-full animate-ping duration-[3s]" />
                <div className="w-16 h-16 bg-gold/10 dark:bg-white/10 rounded-full flex items-center justify-center z-10 border border-gold/20">
                  <Home size={28} style={{ color: OR }} />
                </div>
              </div>
              <h3 className="font-accent font-black text-navy dark:text-white text-md tracking-wider uppercase mb-2">
                0 Properties Found
              </h3>
              <p className="text-gray-400 dark:text-white/40 text-xs max-w-sm leading-relaxed mb-6">
                We couldn't find any listings matching your selection. Try clearing or relaxing your search filters to find more properties.
              </p>
              <button
                onClick={clearAll}
                className="px-6 py-2.5 rounded-xl text-[10px] font-accent font-bold tracking-widest uppercase text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{ background: `linear-gradient(135deg, #C9940A, ${OR})` }}
              >
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-gray-100 dark:border-white/10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 text-[12px] font-bold rounded-xl border border-gray-200 dark:border-white/10 text-navy dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                const pg = i + 1;
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-9 h-9 rounded-xl text-[12px] font-bold transition-all ${page === pg
                      ? 'text-white shadow-md'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                    style={page === pg ? { background: `linear-gradient(135deg, #C9940A, ${OR})` } : {}}
                  >
                    {pg}
                  </button>
                );
              })}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 text-[12px] font-bold rounded-xl border border-gray-200 dark:border-white/10 text-navy dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Mobile sidebar drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-navy z-50 p-5 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-[15px]" style={{ color: NAVY }}>Filters</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"
                >
                  <X size={15} style={{ color: NAVY }} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {SidebarContent()}
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="mt-4 w-full h-11 rounded-xl font-bold text-white text-[13px]"
                style={{ background: `linear-gradient(135deg, #C9940A, ${OR})` }}
              >
                Show {total} Properties
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}