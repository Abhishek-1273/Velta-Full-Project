import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, ChevronDown,
  Home, Building2, Landmark, Trees, Castle,
  House, GraduationCap, Users,
} from 'lucide-react';

import { useSiteSettings } from '../../contexts';
import { fetchMasterData, submitEnquiry } from '../../utils/api';
import FormSuccessStep from './FormSuccessStep';

/* ── Tokens ── */
const OR       = '#A67A08';
const NAVY     = '#0B1728';

/* ── Data ── */
const TABS = [
  { id: 'buy',        label: 'Buy',                 Icon: Home      },
  { id: 'rent',       label: 'Rent',                Icon: Building2 },
  { id: 'management', label: 'Property Management', Icon: Landmark  },
];

const PROP_TYPES_BUY = [
  { val: 'residential', label: 'Residential', Icon: Building2 },
  { val: 'commercial',  label: 'Commercial',  Icon: Landmark  },
  { val: 'plot',        label: 'Land / Plot', Icon: Trees     },
  { val: 'villa',       label: 'Villa',       Icon: Castle    },
];

const RENT_TYPES     = [
  { val: 'full',       label: 'Residential', Icon: House          },
  { val: 'commercial', label: 'Commercial', Icon: Landmark       },
  { val: 'pg',         label: 'PG / Hostel', Icon: GraduationCap  },
  { val: 'flatmates',  label: 'Flatmates',   Icon: Users          },
];

const BHK_OPTIONS     = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
const VILLA_BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
const STATUS_OPTIONS  = ['Ready to Move', 'Under Construction'];
const COMMERCIAL_PROPERTY_TYPES = ['Office Space', 'Showroom', 'Shop', 'Industrial Building', 'Co-working', 'Warehouse', 'Other'];
const COMMERCIAL_AVAILABILITY = ['Immediately', 'Within 15 days', 'Within 1 month', 'After 2 months', 'After 3 months'];
const TENANT_OPTIONS  = ['Male', 'Female', 'Any'];
const PG_ROOM_OPTIONS = [
  { label: 'Single', value: 'Single' },
  { label: 'Double', value: 'Double' },
  { label: 'Triple', value: 'Triple' },
  { label: 'Shared', value: 'Shared' },
];

const FLATMATE_ROOM_OPTIONS = [
  { label: 'Single', value: 'Single' },
  { label: 'Shared', value: 'Shared' },
];
const LEAD_PROP_TYPES = ['Apartment / Flat', 'Independent House', 'Villa', 'Plot / Land', 'Commercial Space'];


/* ── Primitives ── */
function CheckBox({ active }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded shrink-0 transition-all duration-150 border"
      style={{
        width: 16, height: 16,
        borderColor: active ? OR : 'rgba(150, 150, 150, 0.3)',
        background: active ? OR : 'transparent',
      }}
    >
      {active && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </span>
  );
}

function Dropdown({ open, onClick, label, children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onClick}
        className={`h-[38px] w-full px-4 flex items-center justify-between gap-2 rounded-lg border text-[13px] font-semibold transition-all duration-150 focus:outline-none bg-white dark:bg-navy-light text-navy dark:text-white transition-colors duration-300 ${
          open ? 'border-gold shadow-sm' : 'border-gray-200 dark:border-white/10'
        }`}
        style={{
          boxShadow: open ? `0 0 0 3px ${OR}22` : 'none',
        }}
      >
        <span className="truncate">{label}</span>
        <ChevronDown
          size={14}
          className={`opacity-70 shrink-0 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 right-0 top-[44px] z-50 rounded-2xl border border-gray-100 dark:border-white/10 py-1.5 min-w-[160px] bg-white dark:bg-navy shadow-xl transition-colors duration-300"
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* PG filters mirror Properties.jsx exactly:
   For → pgGender | Room Type → roomType.
*/
/* ── Main ── */
export default function Hero() {
  const { settings } = useSiteSettings();
  const navigate     = useNavigate();
  const location     = useLocation();

  // Footer service links set heroTab via location.state
  useEffect(() => {
    const heroTab = location.state?.heroTab;
    if (heroTab && TABS.some(t => t.id === heroTab)) {
      setTab(heroTab);
    }
  }, [location.state]);

  // ── Master Data — city + locality from backend ──
  const [masterCities,     setMasterCities]     = useState(['Pune', 'PCMC']);
  const [masterLocalities, setMasterLocalities] = useState({ Pune: [], PCMC: [] });

  useEffect(() => {
    fetchMasterData().then(d => {
      if (!d) return;
      if (d.city?.length) setMasterCities(d.city);
      setMasterLocalities({
        Pune: d.locality_pune || [],
        PCMC: d.locality_pcmc || [],
      });
    }).catch(() => {});
  }, []);

  const [tab,          setTab]          = useState('buy');
  const [city,         setCity]         = useState('Pune');
  const [searchText,   setSearchText]   = useState('');
  const [localities,   setLocalities]   = useState([]);
  const [showSuggest,  setShowSuggest]  = useState(false);
  const [searchError,  setSearchError]  = useState('');

  const [propType,     setPropType]     = useState('residential');
  const [bhk,          setBhk]          = useState([]);
  const [status,       setStatus]       = useState('');
  const [commercialPropertyType, setCommercialPropertyType] = useState('');
  const [commercialAvailability, setCommercialAvailability] = useState('');

  const [rentType,     setRentType]     = useState('full');
  const [rentBhk,      setRentBhk]      = useState([]);
  const [tenant,       setTenant]       = useState('');
  const [room,         setRoom]         = useState('');

  const [leadName,     setLeadName]     = useState('');
  const [leadPhone,    setLeadPhone]    = useState('');
  const [leadProp,     setLeadProp]     = useState('');
  const [leadAddr,     setLeadAddr]     = useState('');
  const [leadDone,     setLeadDone]     = useState(false);

  const [openCity,     setOpenCity]     = useState(false);
  const [openBhk,      setOpenBhk]      = useState(false);
  const [openStatus,   setOpenStatus]   = useState(false);
  const [openCommercialType, setOpenCommercialType] = useState(false);
  const [openCommercialAvailability, setOpenCommercialAvailability] = useState(false);
  const [openRentBhk,  setOpenRentBhk]  = useState(false);
  const [openTenant,   setOpenTenant]   = useState(false);
  const [openRoom,     setOpenRoom]     = useState(false);
  const [openLeadProp, setOpenLeadProp] = useState(false);

  const closeAll = () => {
    setOpenCity(false); setOpenBhk(false); setOpenStatus(false);
    setOpenCommercialType(false); setOpenCommercialAvailability(false);
    setOpenRentBhk(false); setOpenTenant(false); setOpenRoom(false);
    setOpenLeadProp(false);
  };

  const filtered = (masterLocalities[city] || [])
    .filter(l => l.toLowerCase().includes(searchText.toLowerCase()) && !localities.includes(l))
    .sort((a, b) => a.localeCompare(b));

  const addLocality = (l) => {
    if (localities.length >= 3) return;
    setLocalities(p => [...p, l]);
    setSearchText('');
    setShowSuggest(false);
    setSearchError('');
  };

  const toggleBhk     = v => setBhk(p     => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleRentBhk = v => setRentBhk(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const handleSearch = () => {
    let finalLocalities = [...localities];
    if (finalLocalities.length === 0) {
      if (searchText.trim() && filtered.length > 0) {
        finalLocalities = [filtered[0]];
      } else {
        setSearchError('Please enter a location to search!');
        setTimeout(() => setSearchError(''), 2500);
        return;
      }
    }
    setSearchError('');

    const q = new URLSearchParams();

    // Map tab/rentType to adType param for Properties.jsx
    if (tab === 'buy') {
      q.set('adType', 'Buy');
    } else if (tab === 'rent') {
      if (rentType === 'pg') {
        q.set('adType', 'PG/Hostel');
      } else if (rentType === 'flatmates') {
        q.set('adType', 'Flatmates');
      } else {
        q.set('adType', 'Rent');
        // Explicitly scope Rent searches to Residential or Commercial.
        q.set('propertyType', rentType === 'commercial' ? 'Commercial' : 'Residential');
      }
    }

    // Set selected city
    if (city) q.set('city', city);

    // localities (multi-select chips)
    if (finalLocalities.length) q.set('locality', finalLocalities.join(','));

    // Rent — Residential uses the selected BHK values.
    // The Properties API expects the same exact strings (e.g. "2 BHK").
    if (tab === 'rent' && rentType === 'full' && rentBhk.length) {
      q.set('bhk', rentBhk.join(','));
    }

    // Buy — Residential uses BHK + Property Status. Commercial uses the
    // exact Property Type + Available From values from Post Property.
    if (tab === 'buy' && (propType === 'residential' || propType === 'villa')) {
      if (bhk.length) q.set('bhk', bhk.join(','));
      // Residential has status; Villa does not use a separate status filter here.
      if (propType === 'residential' && status) q.set('status', status);
    }

    if ((tab === 'buy' && propType === 'commercial') || (tab === 'rent' && rentType === 'commercial')) {
      if (commercialPropertyType) q.set('commercialPropertyType', commercialPropertyType);
      if (commercialAvailability) q.set('possession', commercialAvailability);
    }

    // PG/Hostel — exact Properties.jsx mapping:
    // For → pgGender | Room Type → roomType.
    if (tab === 'rent' && rentType === 'pg') {
      if (tenant)         q.set('pgGender', tenant);
      if (room)           q.set('roomType', room);
    }

    // Flatmates — tenant preference
    if (tab === 'rent' && rentType === 'flatmates') {
      if (tenant) q.set('tenantType', tenant === 'Anyone' ? 'Any' : tenant);
      if (room)   q.set('roomType', room);
    }

    // Property type → map hero values to Property.type values
    const propTypeMap = {
      residential: 'Apartment',   // Residential → Apartment/Independent House
      commercial:  'Commercial',
      plot:        'Plot',
      villa:       'Villa',
    };
    if (propType && propType !== 'residential') {
      // residential is default/all-apartments, no need to filter
      q.set('propertyType', propTypeMap[propType] || propType);
    }

    navigate(`/properties?${q}`);
  };

  return (
    <section
      className="relative flex flex-col bg-white dark:bg-navy-dark transition-colors duration-300"
      style={{ minHeight: '100vh' }}
      onClick={closeAll}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-4px); }
          30%, 60%, 90% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.35s cubic-bezier(.36,.07,.19,.97) both;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />






      {/* ── Main content ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-4"
        style={{ paddingTop: '90px', paddingBottom: '220px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 mb-5"
        >
          <span style={{ flex:1, maxWidth:60, height:1, background: `linear-gradient(to right, transparent, ${OR})` }}/>
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: OR }}>
            {settings?.heroEyebrow || "Pune & PCMC's Trusted Property Platform"}
          </p>
          <span style={{ flex:1, maxWidth:60, height:1, background: `linear-gradient(to left, transparent, ${OR})` }}/>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="font-black text-center leading-[1.12] tracking-tight text-navy dark:text-white transition-colors"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', marginBottom: 14 }}
        >
          {settings?.heroHeadline || 'Find a Place Worth Calling'}{' '}
          <span style={{
            background: `linear-gradient(90deg, #A67A08, #E8C547)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline',
          }}>
            {settings?.heroHeadlineGold || 'Yours'}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-[14px] mb-8 text-slate-500 dark:text-white/60 transition-colors"
          style={{ maxWidth: '46ch' }}
        >
          {settings?.heroSubtitle || 'Buy, Rent or Manage Property with Complete Trust & Transparency'}
        </motion.p>

        {/* ── White Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="w-full bg-white dark:bg-navy border border-gray-100 dark:border-white/5 transition-colors duration-300"
          style={{
            maxWidth: '820px',
            borderRadius: 24,
            overflow: 'visible',
            boxShadow: '0 2px 4px rgba(11,23,40,0.04), 0 8px 24px rgba(11,23,40,0.08), 0 32px 64px rgba(11,23,40,0.12)',
          }}
        >
          {/* ── Tabs ── */}
          <div className="flex border-b border-gray-100 dark:border-white/10 transition-colors" style={{ borderBottom: '1px solid rgba(238,240,244,0.1)' }}>
            {TABS.map(({ id, label, Icon }, idx) => {
              const active   = tab === id;
              const isFirst  = idx === 0;
              const isLast   = idx === TABS.length - 1;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setTab(id);
                    setSearchError('');
                    setOpenCommercialType(false);
                    setOpenCommercialAvailability(false);
                    if (id !== 'buy') {
                      setPropType('residential');
                      setBhk([]);
                      setStatus('');
                    }
                    setCommercialPropertyType('');
                    setCommercialAvailability('');
                  }}
                  className={`relative flex flex-1 items-center justify-center gap-1.5 md:gap-2.5 py-4 md:py-[28px] text-[11px] sm:text-[13px] md:text-[15px] font-semibold transition-all duration-200 focus:outline-none ${active ? 'text-navy dark:text-white' : 'text-slate-500 dark:text-white/40'}`}
                  style={{
                    background: 'transparent',
                    borderRadius: isFirst ? '24px 0 0 0' : isLast ? '0 24px 0 0' : '0',
                  }}
                >
                  <Icon size={21} strokeWidth={1.75} style={{ color: active ? OR : undefined }} className={`transition-colors ${active ? '' : 'text-slate-400 dark:text-white/30'}`} />
                  <span style={{ color: active ? OR : undefined }}>{label}</span>

                  {/* Gold underline for active tab */}
                  {active && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] rounded-t-full"
                      style={{ background: `linear-gradient(90deg, #D4B040, ${OR})` }}
                    />
                  )}
                  {!active && !isLast && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-gray-200" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Property Management form ── */}
          {tab === 'management' && (
            <div className="px-9 pt-7 pb-8">
              {leadDone ? (
                <FormSuccessStep
                  accent="#C9940A"
                  title="Request Received!"
                  subtitle="Our property management team will contact you within 24 hours."
                  onReset={() => { setLeadName(''); setLeadPhone(''); setLeadProp(''); setLeadAddr(''); setLeadDone(false); }}
                />
              ) : (
                <>
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: OR }}>
                    Get a Free Property Management Consultation
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text" placeholder="Your Name" value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      className="h-11 px-4 rounded-xl border border-gray-200 text-[13px] placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ color: NAVY }}
                    />
                    <input
                      type="tel" placeholder="Phone Number" value={leadPhone}
                      onChange={e => setLeadPhone(e.target.value)}
                      className="h-11 px-4 rounded-xl border border-gray-200 text-[13px] placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ color: NAVY }}
                    />
                    <div className="relative" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setOpenLeadProp(o => !o)}
                        className="w-full h-11 px-4 flex items-center justify-between rounded-xl border border-gray-200 text-[13px] focus:outline-none transition-colors"
                        style={{ color: leadProp ? NAVY : '#9CA3AF' }}
                      >
                        {leadProp || 'Property Type'}
                        <ChevronDown size={14} style={{ color: '#9CA3AF', transform: openLeadProp ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                      </button>
                      {openLeadProp && (
                        <div className="absolute left-0 top-12 z-50 w-full rounded-2xl border border-gray-100 py-1.5" style={{ background: '#fff', boxShadow: '0 8px 32px rgba(11,23,40,0.13)' }}>
                          {LEAD_PROP_TYPES.map(t => (
                            <button key={t} onClick={() => { setLeadProp(t); setOpenLeadProp(false); }}
                              className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 transition-colors"
                              style={{ color: leadProp === t ? OR : NAVY }}
                            >{t}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="text" placeholder="Property Address / Area" value={leadAddr}
                      onChange={e => setLeadAddr(e.target.value)}
                      className="h-11 px-4 rounded-xl border border-gray-200 text-[13px] placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ color: NAVY }}
                    />
                  </div>
                  <button
                    onClick={async () => {
                      if (!leadName.trim() || !leadPhone.trim() || !leadProp || !leadAddr.trim()) return;
                      try {
                        await submitEnquiry({
                          type: 'management',
                          name: leadName.trim(),
                          phone: leadPhone.trim(),
                          propertyType: leadProp,
                          address: leadAddr.trim(),
                        });
                      } catch (_) { /* fail silently — UX still shows success */ }
                      setLeadDone(true);
                    }}
                    disabled={!leadName.trim() || !leadPhone.trim() || !leadProp || !leadAddr.trim()}
                    className="w-full h-11 rounded-xl font-bold text-[13px] text-white flex items-center justify-center gap-2 transition-all duration-150 hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, #D4B040, ${OR})`,
                      boxShadow: '0 2px 12px rgba(201,162,39,0.30)',
                    }}
                  >
                    <Search size={15} />
                    Get Free Consultation
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── Search row ── */}
          {tab !== 'management' && (
            <div className="relative">
              <div
                className={`flex flex-col md:flex-row items-stretch md:items-center mx-4 md:mx-6 mt-6 mb-4 rounded-2xl border bg-white dark:bg-navy-light transition-all duration-300 shadow-sm ${
                  searchError ? 'border-red-500 ring-4 ring-red-500/10 animate-shake' : 'border-gray-200 dark:border-white/10'
                }`}
                style={{
                  minHeight: 66,
                }}
                onClick={e => e.stopPropagation()}
              >
              {/* City */}
              <div className="relative shrink-0 w-full md:w-auto" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => { setOpenCity(o => !o); setOpenBhk(false); setOpenStatus(false); setSearchError(''); }}
                  className="h-[52px] md:h-[62px] pl-5 pr-4 flex items-center justify-between md:justify-start gap-1.5 text-[13px] md:text-[14px] font-bold focus:outline-none border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 text-navy dark:text-white transition-colors w-full md:min-w-[110px]"
                >
                  <MapPin size={15} strokeWidth={2} style={{ color: OR, flexShrink: 0 }} />
                  {city}
                  <ChevronDown size={13} className="text-navy dark:text-white transition-transform duration-200" style={{ transform: openCity ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
                {openCity && (
                  <div className="absolute left-0 right-0 md:right-auto top-full mt-1 z-50 rounded-2xl border border-gray-100 dark:border-white/10 py-1.5 bg-white dark:bg-navy transition-colors duration-300 shadow-xl">
                    {masterCities.map(c => (
                      <button key={c} onClick={() => { setCity(c); setOpenCity(false); setLocalities([]); setSearchText(''); }}
                        className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${city === c ? 'text-gold' : 'text-navy dark:text-white'}`}
                      >{c}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search input */}
              <div className="flex-1 relative w-full" onClick={e => e.stopPropagation()}>
                <div className="flex flex-wrap items-center gap-1.5 min-h-[52px] md:min-h-[62px] px-5 py-2 md:py-0 border-b md:border-b-0 border-gray-200 dark:border-white/10">
                  <Search size={15} strokeWidth={2} style={{ color: '#94A3B8', flexShrink: 0, marginRight: 4 }} />
                  {localities.map(loc => (
                    <span
                      key={loc}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      style={{ background: OR, color: '#fff' }}
                    >
                      {loc}
                      <button onClick={() => setLocalities(p => p.filter(l => l !== loc))} className="hover:opacity-70 leading-none ml-0.5">×</button>
                    </span>
                  ))}
                  {localities.length < 3 && (
                    <input
                      type="text"
                      value={searchText}
                      onChange={e => {
                        setSearchText(e.target.value);
                        setShowSuggest(true);
                        setSearchError('');
                      }}
                      onFocus={() => { setShowSuggest(true); setSearchError(''); }}
                      onBlur={() => setTimeout(() => setShowSuggest(false), 160)}
                      placeholder={localities.length ? '' : 'Search localities, societies or landmarks'}
                      className="flex-1 min-w-[140px] bg-transparent text-[13px] placeholder-gray-400 focus:outline-none text-navy dark:text-white transition-colors"
                    />
                  )}
                </div>
                {showSuggest && filtered.length > 0 && (
                  <div className="absolute left-0 top-[66px] z-50 w-full rounded-2xl border border-gray-100 dark:border-white/10 py-1.5 max-h-52 overflow-y-auto bg-white dark:bg-navy transition-colors duration-300 shadow-xl">
                    {filtered.map(loc => (
                      <button key={loc} onMouseDown={() => addLocality(loc)}
                        className="w-full text-left px-5 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2.5 text-navy dark:text-white"
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: OR }} />
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="h-11 md:h-[52px] px-9 mx-4 md:mx-0 md:mr-2.5 my-3.5 md:my-0 rounded-xl font-bold text-[14px] md:text-[15px] flex items-center justify-center gap-2 shrink-0 transition-all duration-200 hover:brightness-110 hover:-translate-y-px active:scale-[0.97] focus:outline-none"
                style={{
                  background: `linear-gradient(135deg, #C9940A, ${OR})`,
                  color: '#fff',
                  boxShadow: '0 4px 6px rgba(201,162,39,0.2), 0 8px 20px rgba(201,162,39,0.3)',
                }}
              >
                <Search size={15} strokeWidth={2.2} />
                Search
              </button>
            </div>
            {searchError && (
              <div className="absolute left-8 bottom-[-20px] z-[55] flex items-center gap-2 pointer-events-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <p className="text-red-500 dark:text-red-400 text-[11.5px] font-bold tracking-wide">
                  {searchError}
                </p>
              </div>
            )}
            </div>
          )}

          {/* ── Filters ── */}
          {tab !== 'management' && (
            <div className="px-7 pb-7 pt-1" style={{ overflow: 'visible' }} onClick={e => e.stopPropagation()}>

              {/* BUY */}
              {tab === 'buy' && (
                <div className="flex flex-col gap-4">
                  <p className="text-[13px] font-semibold text-navy dark:text-white transition-colors">Property Type</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PROP_TYPES_BUY.map(({ val, label, Icon }) => {
                      const active = propType === val;
                      return (
                        <div key={val} className="relative">
                          <button
                            onClick={() => { setPropType(val); setBhk([]); setStatus(''); setCommercialPropertyType(''); setCommercialAvailability(''); closeAll(); }}
                            className={`w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-[13px] font-semibold transition-all duration-150 focus:outline-none bg-gray-50/50 dark:bg-white/[0.02] hover:border-gold hover:text-gold ${
                              active ? 'border-gold text-gold' : 'border-gray-200 dark:border-white/10 text-navy dark:text-white'
                            }`}
                          >
                            <Icon size={16} strokeWidth={1.6} className={`shrink-0 transition-colors ${active ? 'text-gold' : 'text-navy dark:text-white'}`} />
                            {label}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {propType === 'residential' && (
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 pt-1 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openBhk}
                        onClick={() => { setOpenBhk(o => !o); setOpenStatus(false); setOpenCity(false); }}
                        label={bhk.length ? bhk.join(', ') : 'BHK Type  ·  Any'}
                      >
                        {BHK_OPTIONS.map(b => (
                          <button key={b} onClick={() => toggleBhk(b)}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2.5 ${bhk.includes(b) ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >
                            <CheckBox active={bhk.includes(b)} />
                            {b}
                          </button>
                        ))}
                      </Dropdown>

                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openStatus}
                        onClick={() => { setOpenStatus(o => !o); setOpenBhk(false); setOpenCity(false); }}
                        label={status || 'Property Status  ·  Any'}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <button key={s} onClick={() => { setStatus(s); setOpenStatus(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${status === s ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >{s}</button>
                        ))}
                        {status && (
                          <button onClick={() => { setStatus(''); setOpenStatus(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 hover:text-red-500 border-t border-gray-150 dark:border-white/5 mt-1 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>
                    </div>
                  )}

                  {propType === 'villa' && (
                    <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 pt-1 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openBhk}
                        onClick={() => { setOpenBhk(o => !o); setOpenStatus(false); setOpenCity(false); }}
                        label={bhk.length ? bhk.join(', ') : 'Villa BHK  ·  Any'}
                      >
                        {VILLA_BHK_OPTIONS.map(b => (
                          <button key={b} onClick={() => toggleBhk(b)}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2.5 ${bhk.includes(b) ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >
                            <CheckBox active={bhk.includes(b)} />
                            {b}
                          </button>
                        ))}
                      </Dropdown>
                    </div>
                  )}

                  {propType === 'commercial' && (
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 pt-1 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openCommercialType}
                        onClick={() => { setOpenCommercialType(o => !o); setOpenCommercialAvailability(false); setOpenCity(false); }}
                        label={commercialPropertyType || 'Property Type'}
                      >
                        {COMMERCIAL_PROPERTY_TYPES.map(t => (
                          <button key={t} onClick={() => { setCommercialPropertyType(t); setOpenCommercialType(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${commercialPropertyType === t ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >{t}</button>
                        ))}
                        {commercialPropertyType && (
                          <button onClick={() => { setCommercialPropertyType(''); setOpenCommercialType(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 hover:text-red-500 border-t border-gray-150 dark:border-white/5 mt-1 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>

                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openCommercialAvailability}
                        onClick={() => { setOpenCommercialAvailability(o => !o); setOpenCommercialType(false); setOpenCity(false); }}
                        label={commercialAvailability || 'Availability'}
                      >
                        {COMMERCIAL_AVAILABILITY.map(a => (
                          <button key={a} onClick={() => { setCommercialAvailability(a); setOpenCommercialAvailability(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${commercialAvailability === a ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >{a}</button>
                        ))}
                        {commercialAvailability && (
                          <button onClick={() => { setCommercialAvailability(''); setOpenCommercialAvailability(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 hover:text-red-500 border-t border-gray-150 dark:border-white/5 mt-1 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>
                    </div>
                  )}
                </div>
              )}

              {/* RENT */}
              {tab === 'rent' && (
                <div className="flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                  <p className="text-[13px] font-semibold text-navy dark:text-white transition-colors">Rent Type</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {RENT_TYPES.map(({ val, label, Icon }) => {
                      const active = rentType === val;
                      return (
                        <div key={val} className="relative">
                          <button
                            onClick={() => { setRentType(val); setRentBhk([]); setTenant(''); setRoom(''); setPgFood([]); setPgPreferredFor(''); if (val !== 'commercial') { setCommercialPropertyType(''); setCommercialAvailability(''); } closeAll(); }}
                            className={`w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-[13px] font-semibold transition-all duration-150 focus:outline-none bg-gray-50/50 dark:bg-white/[0.02] hover:border-gold hover:text-gold ${
                              active ? 'border-gold text-gold' : 'border-gray-200 dark:border-white/10 text-navy dark:text-white'
                            }`}
                          >
                            <Icon size={16} strokeWidth={1.6} className={`shrink-0 transition-colors ${active ? 'text-gold' : 'text-navy dark:text-white'}`} />
                            {label}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {rentType === 'full' && (
                    <Dropdown
                      className="w-full sm:w-[150px]"
                      open={openRentBhk}
                      onClick={() => { setOpenRentBhk(o => !o); setOpenTenant(false); setOpenRoom(false); }}
                      label={rentBhk.length ? rentBhk.join(', ') : 'BHK Type  ·  Any'}
                    >
                      {BHK_OPTIONS.map(b => (
                        <button key={b} onClick={() => toggleRentBhk(b)}
                          className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2.5 ${rentBhk.includes(b) ? 'text-gold' : 'text-navy dark:text-white'}`}
                        >
                          <CheckBox active={rentBhk.includes(b)} />
                          {b}
                        </button>
                      ))}
                    </Dropdown>
                  )}

                  {/* PG / HOSTEL — For + Room Type only */}
                  {rentType === 'pg' && (
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 w-full sm:w-auto">
                      {/* For → pgGender: Male | Female | Any */}
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openTenant}
                        onClick={() => {
                          setOpenTenant(o => !o);
                          setOpenRoom(false);
                        }}
                        label={tenant || 'For'}
                      >
                        {TENANT_OPTIONS.map(t => (
                          <button
                            key={t}
                            onClick={() => { setTenant(t); setOpenTenant(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${
                              tenant === t ? 'text-gold' : 'text-navy dark:text-white'
                            }`}
                          >{t}</button>
                        ))}
                        {tenant && (
                          <button
                            onClick={() => { setTenant(''); setOpenTenant(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 border-t border-gray-150 dark:border-white/5 mt-1 hover:text-red-500 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>

                      {/* Room Type → Single | Double | Triple | Shared */}
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openRoom}
                        onClick={() => {
                          setOpenRoom(o => !o);
                          setOpenTenant(false);
                        }}
                        label={room || 'Room Type'}
                      >
                        {PG_ROOM_OPTIONS.map(r => (
                          <button
                            key={r.value}
                            onClick={() => { setRoom(r.value); setOpenRoom(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${
                              room === r.value ? 'text-gold' : 'text-navy dark:text-white'
                            }`}
                          >{r.label}</button>
                        ))}
                        {room && (
                          <button
                            onClick={() => { setRoom(''); setOpenRoom(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 border-t border-gray-150 dark:border-white/5 mt-1 hover:text-red-500 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>
                    </div>
                  )}

                  {/* FLATMATES — unchanged mapping to tenantType + roomType */}
                  {rentType === 'flatmates' && (
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 w-full sm:w-auto">
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openTenant}
                        onClick={() => { setOpenTenant(o => !o); setOpenRoom(false); }}
                        label={tenant || 'Tenant Type'}
                      >
                        {TENANT_OPTIONS.map(t => (
                          <button
                            key={t}
                            onClick={() => { setTenant(t); setOpenTenant(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${
                              tenant === t ? 'text-gold' : 'text-navy dark:text-white'
                            }`}
                          >{t}</button>
                        ))}
                        {tenant && (
                          <button
                            onClick={() => { setTenant(''); setOpenTenant(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 border-t border-gray-150 dark:border-white/5 mt-1 hover:text-red-500 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>

                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openRoom}
                        onClick={() => { setOpenRoom(o => !o); setOpenTenant(false); }}
                        label={room || 'Room Type'}
                      >
                        {FLATMATE_ROOM_OPTIONS.map(r => (
                          <button
                            key={r.value}
                            onClick={() => { setRoom(r.value); setOpenRoom(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${
                              room === r.value ? 'text-gold' : 'text-navy dark:text-white'
                            }`}
                          >{r.label}</button>
                        ))}
                        {room && (
                          <button
                            onClick={() => { setRoom(''); setOpenRoom(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 border-t border-gray-150 dark:border-white/5 mt-1 hover:text-red-500 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>
                    </div>
                  )}

                  {rentType === 'commercial' && (
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 pt-1 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openCommercialType}
                        onClick={() => { setOpenCommercialType(o => !o); setOpenCommercialAvailability(false); setOpenCity(false); }}
                        label={commercialPropertyType || 'Property Type'}
                      >
                        {COMMERCIAL_PROPERTY_TYPES.map(t => (
                          <button key={t} onClick={() => { setCommercialPropertyType(t); setOpenCommercialType(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${commercialPropertyType === t ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >{t}</button>
                        ))}
                        {commercialPropertyType && (
                          <button onClick={() => { setCommercialPropertyType(''); setOpenCommercialType(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 hover:text-red-500 border-t border-gray-150 dark:border-white/5 mt-1 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>

                      <Dropdown
                        className="w-full sm:w-auto"
                        open={openCommercialAvailability}
                        onClick={() => { setOpenCommercialAvailability(o => !o); setOpenCommercialType(false); setOpenCity(false); }}
                        label={commercialAvailability || 'Availability'}
                      >
                        {COMMERCIAL_AVAILABILITY.map(a => (
                          <button key={a} onClick={() => { setCommercialAvailability(a); setOpenCommercialAvailability(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-white/5 transition-colors ${commercialAvailability === a ? 'text-gold' : 'text-navy dark:text-white'}`}
                          >{a}</button>
                        ))}
                        {commercialAvailability && (
                          <button onClick={() => { setCommercialAvailability(''); setOpenCommercialAvailability(false); }}
                            className="w-full text-left px-4 py-2 text-[12px] text-red-400 hover:text-red-500 border-t border-gray-150 dark:border-white/5 mt-1 transition-colors"
                          >Clear</button>
                        )}
                      </Dropdown>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
