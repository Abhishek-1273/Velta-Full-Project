import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, Star, Shield, Users, Zap, PhoneCall,
  Home, MapPin, IndianRupee, Sparkles, Image, CalendarCheck, Check,
  ChevronRight, Upload, X, Plus, Phone, FileText, Info, Loader2,
  PenSquare, Building2, Clock, Trash2
} from 'lucide-react';
import { useSiteSettings, getBrandName, useAuth } from '../../contexts';
import { submitEnquiry, captureListingLead, createNewListing, saveListingStep, submitListing, uploadFile, fetchMasterData } from '../../utils/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../../config/api';
import FormSuccessStep from '../../components/common/FormSuccessStep';

// Fetch all draft listings for a logged-in user
async function getUserDrafts(phone) {
  try {
    const token = localStorage.getItem('hr_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(
      `${API_URL}/api/user-listings/my/${encodeURIComponent(phone)}?confirm=${encodeURIComponent(phone)}`,
      { headers }
    );
    const data = await res.json();
    // Only show listings with status 'draft' — exclude submitted/active/removed
    return data.success ? (data.listings || []).filter(l => l.status === 'draft') : [];
  } catch {
    return [];
  }
}

// Delete a draft listing
async function deleteDraftListing(listingId, phone) {
  try {
    const token = localStorage.getItem('hr_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}/api/user-listings/${listingId}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ ownerPhone: phone }),
    });
    const data = await res.json();
    return data.success;
  } catch {
    return false;
  }
}
// ─── Constants ────────────────────────────────────────────────────────────────
const CITIES = ['Pune', 'PCMC'];

const LOCALITIES_BY_CITY = {
  Pune: [
    'Koregaon Park', 'Kalyani Nagar', 'Viman Nagar', 'Kharadi',
    'Hadapsar', 'Magarpatta', 'Wagholi', 'Undri', 'Kondhwa',
    'Wanowrie', 'NIBM Road', 'Bibwewadi', 'Katraj', 'Dhayari',
    'Ambegaon', 'Warje', 'Kothrud', 'Karve Nagar', 'Erandwane',
    'Deccan', 'Shivajinagar', 'Model Colony', 'Aundh', 'Baner',
    'Balewadi', 'Sus', 'Pashan', 'Bavdhan', 'Pimple Gurav',
    'Dhanori', 'Lohegaon', 'Vishrantwadi',
  ],
  PCMC: [
    'Wakad', 'Hinjewadi', 'Pimple Saudagar', 'Pimple Nilakh',
    'Ravet', 'Punawale', 'Tathawade', 'Thergaon', 'Chinchwad',
    'Pimpri', 'Akurdi', 'Nigdi', 'Pradhikaran', 'Bhosari',
    'Moshi', 'Chakan', 'Dighi', 'Kalewadi', 'Kasarwadi',
    'Dapodi', 'Sangvi', 'Alandi Road', 'Chikhali', 'Charholi',
  ],
};

const AD_TYPES = {
  Residential: ['Rent', 'Resale', 'PG/Hostel', 'Flatmates'],
  Commercial:  ['Rent', 'Sale'],
  'Plot':      ['Resale'],
  'Villa':     ['Resale'],
};

const TRUST_POINTS = [
  { icon: Shield, label: 'Verified Listings',            desc: 'Connect directly with buyers & tenants' },
  { icon: Zap,    label: 'Faster Closures',           desc: 'Premium listings get 3× more responses' },
  { icon: Users,  label: '10,000+ Buyer Connections', desc: 'Verified NRI & local buyer network' },
];

const TESTIMONIALS = [
  {
    name: 'Easy to Use',
    city: '',
    text: 'A simple experience designed to make listing and discovering properties easier.'
  },
  {
    name: 'More Transparency',
    city: '',
    text: 'Clear property information to help you make better and more confident decisions.'
  },
  {
    name: 'Built for Everyone',
    city: '',
    text: 'Whether you are an owner, buyer, tenant, or broker, the platform is designed around your needs.'
  },
];

// ── Dynamic sidebar steps per adType ─────────────────────────────────────────
const STEPS_RENT = [
  { id: 'property',  label: 'Property Details', icon: Home },
  { id: 'location',  label: 'Location Details', icon: MapPin },
  { id: 'rental',    label: 'Rental Details',   icon: IndianRupee },
  { id: 'amenities', label: 'Amenities',        icon: Sparkles },
  { id: 'gallery',   label: 'Gallery',          icon: Image },
  { id: 'schedule',  label: 'Schedule',         icon: CalendarCheck },
];

const STEPS_RESALE = [
  { id: 'property',    label: 'Property Details', icon: Home },
  { id: 'location',    label: 'Location Details', icon: MapPin },
  { id: 'resale',      label: 'Resale Details',   icon: IndianRupee },
  { id: 'amenities',   label: 'Amenities',        icon: Sparkles },
  { id: 'gallery',     label: 'Gallery',          icon: Image },
  { id: 'additionalinfo', label: 'Additional Info', icon: Info },
  { id: 'schedule',    label: 'Schedule',         icon: CalendarCheck },
];

const STEPS_PG = [
  { id: 'room',      label: 'Room Details',    icon: Home },
  { id: 'location',  label: 'Location Details',icon: MapPin },
  { id: 'pgdetails', label: 'PG Details',      icon: FileText },
  { id: 'amenities', label: 'Amenities',       icon: Sparkles },
  { id: 'gallery',   label: 'Gallery',         icon: Image },
  { id: 'schedule',  label: 'Schedule',        icon: CalendarCheck },
];

const STEPS_COMMERCIAL_RENT = [
  { id: 'property',        label: 'Property Details',  icon: Home },
  { id: 'location',        label: 'Location Details',  icon: MapPin },
  { id: 'commercialrental',label: 'Rental Details',    icon: IndianRupee },
  { id: 'amenities',       label: 'Amenities',         icon: Sparkles },
  { id: 'gallery',         label: 'Gallery',           icon: Image },
  { id: 'schedule',        label: 'Schedule',          icon: CalendarCheck },
];

const STEPS_COMMERCIAL_SALE = [
  { id: 'property',       label: 'Property Details', icon: Home },
  { id: 'location',       label: 'Location Details', icon: MapPin },
  { id: 'commercialsale', label: 'Sale Details',     icon: IndianRupee },
  { id: 'amenities',      label: 'Amenities',        icon: Sparkles },
  { id: 'gallery',        label: 'Gallery',          icon: Image },
  { id: 'schedule',       label: 'Schedule',         icon: CalendarCheck },
];

const STEPS_PLOT = [
  { id: 'property',   label: 'Property Details', icon: Home },
  { id: 'location',   label: 'Location Details', icon: MapPin },
  { id: 'plotpricing',label: 'Pricing Details',  icon: IndianRupee },
  { id: 'gallery',    label: 'Gallery',          icon: Image },
  { id: 'schedule',   label: 'Schedule',         icon: CalendarCheck },
];

const STEPS_VILLA = [
  { id: 'property',      label: 'Property Details', icon: Home },
  { id: 'location',      label: 'Location Details', icon: MapPin },
  { id: 'resale',        label: 'Resale Details',   icon: IndianRupee },
  { id: 'amenities',     label: 'Amenities',        icon: Sparkles },
  { id: 'gallery',       label: 'Gallery',          icon: Image },
  { id: 'additionalinfo',label: 'Additional Info',  icon: Info },
  { id: 'schedule',      label: 'Schedule',         icon: CalendarCheck },
];

function getSteps(propertyType, adType) {
  if (adType === 'PG/Hostel') return STEPS_PG;
  if (propertyType === 'Plot' || propertyType === 'Plot/Villa') return STEPS_PLOT;
  if (propertyType === 'Villa') return STEPS_VILLA;
  if (propertyType === 'Commercial' && adType === 'Sale') return STEPS_COMMERCIAL_SALE;
  if (propertyType === 'Commercial' && adType === 'Rent') return STEPS_COMMERCIAL_RENT;
  if (adType === 'Resale') return STEPS_RESALE;
  return STEPS_RENT; // Rent, Flatmates
}

// ── Property field constants ──────────────────────────────────────────────────
// Rent / Flatmates property types
const RENT_APT_TYPES   = ['Apartment', 'Independent House', 'Gated Community Villa'];
// Resale property types
const RESALE_APT_TYPES = ['Apartment', 'Independent House', 'Gated Community Villa', 'Standalone Building'];
const BHK_TYPES        = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
const OWNERSHIP_TYPES  = ['Self Owned', 'On Lease'];
const FLOOR_TYPES      = ['Tiles', 'Marble', 'Wooden', 'Cement'];
const FLOORS           = ['Ground', ...Array.from({ length: 99 }, (_, i) => String(i + 1))];
const TOTAL_FLOORS     = Array.from({ length: 99 }, (_, i) => String(i + 1));
const PROPERTY_AGES    = ['Under Construction', 'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
const FACINGS          = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const FURNISHINGS      = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
const AMENITIES_LIST   = ['Lift', 'Parking', 'Power Backup', 'Security', 'Gym', 'Swimming Pool', 'Clubhouse', 'Garden', 'CCTV', 'Intercom', 'Gas Pipeline', 'Water Supply 24x7', 'Rainwater Harvesting', 'Wheelchair Access'];
const AVAILABLE_FROM   = ['Immediately', 'Within 15 days', 'Within 1 month', 'After 2 months', 'After 3 months'];
const PREFERRED_TENANTS = ['Anyone', 'Family', 'Bachelors', 'Company'];
const ROOM_TYPES       = ['Single', 'Shared'];
const TENANT_TYPES     = ['Male', 'Female'];

// Commercial constants
const COMMERCIAL_PROPERTY_TYPES = ['Office Space', 'Showroom', 'Shop', 'Industrial Building', 'Co-working', 'Warehouse', 'Other'];
const COMMERCIAL_BUILDING_TYPES_DEFAULT   = ['Independent House', 'Business Park', 'Mall', 'Independent Shop', 'Standalone Building'];
const COMMERCIAL_BUILDING_TYPES_WAREHOUSE = ['Standalone Building'];
const FLOORS_ALLOWED   = ['G', 'G+1', 'G+2', 'G+3', 'G+4', 'G+5', 'G+6', 'G+7', 'G+8', 'G+9', 'G+10+'];
const PLOT_FACINGS     = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];

// Villa constants
const VILLA_TYPES      = ['Independent Villa', 'Gated Community Villa', 'Duplex Villa', 'Row Villa'];
const VILLA_BHK_TYPES  = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
const VILLA_AGES       = ['New', '1–5 Years', '5–10 Years', '10+ Years'];

// ─── Reusable UI ──────────────────────────────────────────────────────────────
function Dropdown({ value, onChange, options, placeholder, error, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white dark:bg-navy text-sm font-medium text-left focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          error ? 'border-red-400 dark:border-red-400' : 'border-gray-200 dark:border-white/10'
        }`}
      >
        <span className={value ? 'text-navy dark:text-white' : 'text-gray-400 dark:text-white/35'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            data-lenis-prevent
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 right-0 mt-1.5 max-h-52 overflow-y-auto bg-white dark:bg-navy border border-gray-100 dark:border-white/10 rounded-xl shadow-luxury z-50 py-1 no-scrollbar"
          >
            {options.map(opt => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                    value === opt
                      ? 'bg-gold/10 text-gold-dark dark:text-gold'
                      : 'text-ink-muted dark:text-cream/80 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {opt}
                  {value === opt && <Check className="w-3 h-3 text-gold" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy dark:text-white mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

// Live compact preview for money fields. The stored value remains the raw numeric value
// (e.g. 4000), while the user sees a short form such as ₹4K.
function formatCompactAmount(value) {
  const n = Number(String(value ?? '').replace(/,/g, ''));
  if (!Number.isFinite(n) || n <= 0) return '';
  const compact = (amount, suffix) => {
    const rounded = Number.isInteger(amount) ? amount : Number(amount.toFixed(1));
    return `₹${rounded}${suffix}`;
  };
  if (n >= 10000000) return compact(n / 10000000, 'Cr');
  if (n >= 100000) return compact(n / 100000, 'L');
  if (n >= 1000) return compact(n / 1000, 'K');
  return `₹${n.toLocaleString('en-IN')}`;
}

function MoneyInput({ value, onChange, placeholder }) {
  const compact = formatCompactAmount(value);
  return (
    <div className="relative flex-1 min-w-0">
      <input
        value={value ?? ''}
        onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
        placeholder={placeholder}
        type="text"
        inputMode="numeric"
        className="w-full px-4 py-3 pr-20 text-sm bg-transparent text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/35 outline-none"
      />
      {compact && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-gold/10 px-2 py-1 text-[10px] font-black tracking-wide text-gold pointer-events-none">
          {compact}
        </span>
      )}
    </div>
  );
}

function AreaInput({ value, onChange, placeholder, error }) {
  return (
    <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${error ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'e.g. 1200'}
        type="number"
        className="flex-1 px-4 py-3 text-sm bg-transparent text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/35 outline-none"
      />
      <span className="px-4 py-3 text-xs font-semibold text-ink-muted dark:text-white/50 border-l border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">Sq.ft</span>
    </div>
  );
}

function ChipGroup({ options, value, onChange, multi = false }) {
  const selected = multi ? (value || []) : value;
  const toggle = (opt) => {
    if (multi) {
      const curr = value || [];
      onChange(curr.includes(opt) ? curr.filter(x => x !== opt) : [...curr, opt]);
    } else {
      onChange(opt);
    }
  };
  const isSelected = (opt) => multi ? selected.includes(opt) : selected === opt;
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => toggle(opt)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${
            isSelected(opt)
              ? 'bg-gold/10 border-gold text-gold-dark dark:text-gold'
              : 'border-gray-200 dark:border-white/10 text-ink-muted dark:text-white/60 hover:border-gold/40'
          }`}
        >
          {multi && isSelected(opt) && <Check className="w-3 h-3" />}
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Testimonial Carousel ─────────────────────────────────────────────────────
function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <div className="mt-8">
      <div className="flex items-center gap-1.5 mb-5">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
        <span className="text-xs font-bold text-gold ml-1">Built for Property Owners, Buyers & Tenants</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/80 dark:border-white/10"
        >
          <p className="text-sm text-ink-muted dark:text-white/70 leading-relaxed mb-4 italic">"{t.text}"</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-bold text-xs">
              {t.name[0]}
            </div>
            <div>
              <p className="text-xs font-bold text-navy dark:text-white">{t.name}</p>
              <p className="text-[10px] text-ink-soft dark:text-white/40">{t.city}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center gap-2 mt-4">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-gray-200 dark:bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1a. Property Details — RENT / FLATMATES ───────────────────────────────────
function StepPropertyDetailsRent({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Apartment Type" required error={errors.apartmentType}>
        <Dropdown value={data.apartmentType} onChange={v => onChange('apartmentType', v)}
          options={RENT_APT_TYPES} placeholder="Select" error={errors.apartmentType} />
      </Field>

      <Field label="BHK" required error={errors.bhkType}>
        <ChipGroup options={BHK_TYPES} value={data.bhkType} onChange={v => onChange('bhkType', v)} />
        {errors.bhkType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bhkType}</p>}
      </Field>

      <Field label="Ownership Type">
        <ChipGroup options={['Self Owned', 'On Lease']}
          value={data.ownershipType} onChange={v => onChange('ownershipType', v)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Built Up Area" required error={errors.area}>
          <AreaInput value={data.area} onChange={v => onChange('area', v)} error={errors.area} />
        </Field>
        <Field label="Carpet Area">
          <AreaInput value={data.carpetArea} onChange={v => onChange('carpetArea', v)} placeholder="e.g. 950" />
        </Field>
      </div>

      <Field label="Bathrooms">
        <ChipGroup options={['1', '2', '3', '4+']} value={String(data.bathrooms ?? '')} onChange={v => onChange('bathrooms', v)} />
      </Field>

      <Field label="Balconies">
        <ChipGroup options={['0', '1', '2', '3+']} value={String(data.balconies ?? '')} onChange={v => onChange('balconies', v)} />
      </Field>

      <Field label="Car Parking">
        <ChipGroup options={['Common', 'Reserved', 'None']} value={data.parking} onChange={v => onChange('parking', v)} />
      </Field>

      <Field label="Furnishing">
        <ChipGroup options={FURNISHINGS} value={data.furnishing} onChange={v => onChange('furnishing', v)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Floor" required error={errors.floor}>
          <Dropdown value={data.floor} onChange={v => onChange('floor', v)}
            options={FLOORS} placeholder="Select" error={errors.floor} />
        </Field>
        <Field label="Total Floor" required error={errors.totalFloor}>
          <Dropdown value={data.totalFloor} onChange={v => onChange('totalFloor', v)}
            options={TOTAL_FLOORS} placeholder="Select" error={errors.totalFloor} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Property Age" required error={errors.propertyAge}>
          <Dropdown value={data.propertyAge} onChange={v => onChange('propertyAge', v)}
            options={PROPERTY_AGES} placeholder="Select" error={errors.propertyAge} />
        </Field>
        <Field label="Facing">
          <Dropdown value={data.facing} onChange={v => onChange('facing', v)}
            options={FACINGS} placeholder="Select" />
        </Field>
      </div>
    </div>
  );
}
// ── 1a-2. Property Details — FLATMATES ───────────────────────────────────────
function StepPropertyDetailsFlatmates({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Apartment Type" required error={errors.apartmentType}>
        <Dropdown value={data.apartmentType} onChange={v => onChange('apartmentType', v)}
          options={RENT_APT_TYPES} placeholder="Select" error={errors.apartmentType} />
      </Field>

      <Field label="BHK" required error={errors.bhkType}>
        <ChipGroup options={BHK_TYPES} value={data.bhkType} onChange={v => onChange('bhkType', v)} />
        {errors.bhkType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bhkType}</p>}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Floor" required error={errors.floor}>
          <Dropdown value={data.floor} onChange={v => onChange('floor', v)}
            options={FLOORS} placeholder="Select" error={errors.floor} />
        </Field>
        <Field label="Total Floor" required error={errors.totalFloor}>
          <Dropdown value={data.totalFloor} onChange={v => onChange('totalFloor', v)}
            options={TOTAL_FLOORS} placeholder="Select" error={errors.totalFloor} />
        </Field>
      </div>

      <Field label="Room Type" required error={errors.roomType}>
        <ChipGroup options={ROOM_TYPES} value={data.roomType} onChange={v => onChange('roomType', v)} />
        {errors.roomType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.roomType}</p>}
      </Field>

      <Field label="Tenant Type" required error={errors.tenantType}>
        <ChipGroup options={TENANT_TYPES} value={data.tenantType} onChange={v => onChange('tenantType', v)} />
        {errors.tenantType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.tenantType}</p>}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Property Age" required error={errors.propertyAge}>
          <Dropdown value={data.propertyAge} onChange={v => onChange('propertyAge', v)}
            options={PROPERTY_AGES} placeholder="Select" error={errors.propertyAge} />
        </Field>
        <Field label="Facing">
          <Dropdown value={data.facing} onChange={v => onChange('facing', v)}
            options={FACINGS} placeholder="Select" />
        </Field>
      </div>

      <Field label="Built Up Area" required error={errors.area}>
        <AreaInput value={data.area} onChange={v => onChange('area', v)} error={errors.area} />
      </Field>
    </div>
  );
}

// ── 1c. Property Details — COMMERCIAL RENT ───────────────────────────────────
function StepPropertyDetailsCommercial({ data, onChange, errors, showCarpetArea = false }) {
  const isWarehouse = data.commercialPropertyType === 'Warehouse' || data.commercialPropertyType === 'Industrial Building';
  const buildingOptions = isWarehouse ? COMMERCIAL_BUILDING_TYPES_WAREHOUSE : COMMERCIAL_BUILDING_TYPES_DEFAULT;

  // If currently selected building type is not in new options, reset it
  const handlePropertyTypeChange = (v) => {
    onChange('commercialPropertyType', v);
    const newIsWarehouse = v === 'Warehouse' || v === 'Industrial Building';
    if (newIsWarehouse && data.buildingType !== 'Standalone Building') {
      onChange('buildingType', '');
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Property Type" required error={errors.commercialPropertyType}>
        <Dropdown value={data.commercialPropertyType} onChange={handlePropertyTypeChange}
          options={COMMERCIAL_PROPERTY_TYPES} placeholder="Select" error={errors.commercialPropertyType} />
      </Field>

      <Field label="Building Type" required error={errors.buildingType}>
        <Dropdown value={data.buildingType} onChange={v => onChange('buildingType', v)}
          options={buildingOptions} placeholder="Select" error={errors.buildingType} />
        {isWarehouse && (
          <p className="text-xs text-ink-muted dark:text-white/50 mt-1">Only Standalone Building available for Warehouse / Industrial Building</p>
        )}
      </Field>

      <Field label="Age of Property" required error={errors.propertyAge}>
        <Dropdown value={data.propertyAge} onChange={v => onChange('propertyAge', v)}
          options={PROPERTY_AGES} placeholder="Select" error={errors.propertyAge} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Floor" required error={errors.floor}>
          <Dropdown value={data.floor} onChange={v => onChange('floor', v)}
            options={FLOORS} placeholder="Select" error={errors.floor} />
        </Field>
        <Field label="Total Floor" required error={errors.totalFloor}>
          <Dropdown value={data.totalFloor} onChange={v => onChange('totalFloor', v)}
            options={TOTAL_FLOORS} placeholder="Select" error={errors.totalFloor} />
        </Field>
      </div>

      <Field label="Super Built Up Area" required error={errors.area}>
        <AreaInput value={data.area} onChange={v => onChange('area', v)} error={errors.area} placeholder="e.g. 1500" />
      </Field>

      {showCarpetArea && (
        <Field label="Carpet Area">
          <AreaInput value={data.carpetArea} onChange={v => onChange('carpetArea', v)} placeholder="e.g. 1200" />
        </Field>
      )}

      <Field label="Furnishing">
        <ChipGroup options={FURNISHINGS} value={data.furnishing} onChange={v => onChange('furnishing', v)} />
      </Field>

      <Field label="Bathrooms">
        <ChipGroup options={['1', '2', '3', '4+']} value={data.bathrooms} onChange={v => onChange('bathrooms', v)} />
      </Field>

      <Field label="Parking">
        <ChipGroup options={['Common', 'Reserved', 'None']} value={data.parking} onChange={v => onChange('parking', v)} />
      </Field>

      <Field label="Facing">
        <ChipGroup options={FACINGS} value={data.facing} onChange={v => onChange('facing', v)} />
      </Field>

      <Field label="Other Features">
        <ChipGroup options={['On Main Road', 'Corner Property']} value={data.otherFeatures || []}
          onChange={v => onChange('otherFeatures', v)} multi />
      </Field>
    </div>
  );
}

// ── 1d. Property Details — PLOT/VILLA RESALE ─────────────────────────────────
function StepPropertyDetailsPlot({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Plot Area (Sq.ft)" required error={errors.area}>
        <AreaInput value={data.area} onChange={v => onChange('area', v)} error={errors.area} placeholder="e.g. 2400" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Length (ft)" required error={errors.plotLength}>
          <input value={data.plotLength || ''} onChange={e => onChange('plotLength', e.target.value)}
            placeholder="e.g. 40" type="number"
            className={`input-luxury ${errors.plotLength ? 'border-red-400' : ''}`} />
        </Field>
        <Field label="Width (ft)" required error={errors.plotWidth}>
          <input value={data.plotWidth || ''} onChange={e => onChange('plotWidth', e.target.value)}
            placeholder="e.g. 60" type="number"
            className={`input-luxury ${errors.plotWidth ? 'border-red-400' : ''}`} />
        </Field>
      </div>

      <Field label="Boundary Wall">
        <ChipGroup options={['Yes', 'No']} value={data.boundaryWall} onChange={v => onChange('boundaryWall', v)} />
      </Field>

      <Field label="Corner Plot">
        <ChipGroup options={['Yes', 'No']} value={data.cornerPlot} onChange={v => onChange('cornerPlot', v)} />
      </Field>

      <Field label="Floors Allowed for Construction">
        <Dropdown value={data.floorsAllowed} onChange={v => onChange('floorsAllowed', v)}
          options={FLOORS_ALLOWED} placeholder="Select" />
      </Field>

      <Field label="Facing">
        <Dropdown value={data.facing} onChange={v => onChange('facing', v)}
          options={PLOT_FACINGS} placeholder="Select" />
      </Field>

      <Field label="Inside a Gated Project?">
        <ChipGroup options={['Yes', 'No']} value={data.gatedProject} onChange={v => onChange('gatedProject', v)} />
      </Field>
    </div>
  );
}

// ── 1e. Property Details — VILLA ──────────────────────────────────────────────
function StepPropertyDetailsVilla({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Villa Type" required error={errors.villaType}>
        <ChipGroup options={VILLA_TYPES} value={data.villaType} onChange={v => onChange('villaType', v)} />
        {errors.villaType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.villaType}</p>}
      </Field>

      <Field label="BHK" required error={errors.bhkType}>
        <ChipGroup options={VILLA_BHK_TYPES} value={data.bhkType} onChange={v => onChange('bhkType', v)} />
        {errors.bhkType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bhkType}</p>}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Built-up Area" required error={errors.area}>
          <AreaInput value={data.area} onChange={v => onChange('area', v)} error={errors.area} placeholder="e.g. 2400" />
        </Field>
        <Field label="Plot Area">
          <AreaInput value={data.plotArea} onChange={v => onChange('plotArea', v)} placeholder="e.g. 3000" />
        </Field>
      </div>

      <Field label="Property Age" required error={errors.propertyAge}>
        <ChipGroup options={VILLA_AGES} value={data.propertyAge} onChange={v => onChange('propertyAge', v)} />
        {errors.propertyAge && <p className="text-red-500 text-xs mt-1 font-medium">{errors.propertyAge}</p>}
      </Field>

      <Field label="Facing">
        <Dropdown value={data.facing} onChange={v => onChange('facing', v)}
          options={PLOT_FACINGS} placeholder="Select" />
      </Field>

      <Field label="Inside a Gated Project?">
        <ChipGroup options={['Yes', 'No']} value={data.gatedProject} onChange={v => onChange('gatedProject', v)} />
      </Field>
    </div>
  );
}

// ── 1b. Property Details — RESALE ─────────────────────────────────────────────
function StepPropertyDetailsResale({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Property Type" required error={errors.apartmentType}>
        <Dropdown value={data.apartmentType} onChange={v => onChange('apartmentType', v)}
          options={RESALE_APT_TYPES} placeholder="Select" error={errors.apartmentType} />
      </Field>

      <Field label="BHK" required error={errors.bhkType}>
        <ChipGroup options={BHK_TYPES} value={data.bhkType} onChange={v => onChange('bhkType', v)} />
        {errors.bhkType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bhkType}</p>}
      </Field>

      <Field label="Ownership Type" required error={errors.ownershipType}>
        <ChipGroup options={OWNERSHIP_TYPES} value={data.ownershipType} onChange={v => onChange('ownershipType', v)} />
        {errors.ownershipType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.ownershipType}</p>}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Built Up Area" required error={errors.area}>
          <AreaInput value={data.area} onChange={v => onChange('area', v)} error={errors.area} />
        </Field>
        <Field label="Carpet Area">
          <AreaInput value={data.carpetArea} onChange={v => onChange('carpetArea', v)} placeholder="e.g. 950" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Property Age" required error={errors.propertyAge}>
          <Dropdown value={data.propertyAge} onChange={v => onChange('propertyAge', v)}
            options={PROPERTY_AGES} placeholder="Select" error={errors.propertyAge} />
        </Field>
        <Field label="Facing">
          <Dropdown value={data.facing} onChange={v => onChange('facing', v)}
            options={FACINGS} placeholder="Select" />
        </Field>
      </div>

      <Field label="Floor Type">
        <ChipGroup options={FLOOR_TYPES} value={data.floorType} onChange={v => onChange('floorType', v)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Floor" required error={errors.floor}>
          <Dropdown value={data.floor} onChange={v => onChange('floor', v)}
            options={FLOORS} placeholder="Select" error={errors.floor} />
        </Field>
        <Field label="Total Floor" required error={errors.totalFloor}>
          <Dropdown value={data.totalFloor} onChange={v => onChange('totalFloor', v)}
            options={TOTAL_FLOORS} placeholder="Select" error={errors.totalFloor} />
        </Field>
      </div>

      <Field label="Furnishing">
        <ChipGroup options={FURNISHINGS} value={data.furnishing} onChange={v => onChange('furnishing', v)} />
      </Field>

      <Field label="Bathrooms">
        <ChipGroup options={['1', '2', '3', '4+']} value={data.bathrooms} onChange={v => onChange('bathrooms', v)} />
      </Field>

      <Field label="Balconies">
        <ChipGroup options={['0', '1', '2', '3+']} value={data.balconies} onChange={v => onChange('balconies', v)} />
      </Field>

      <Field label="Car Parking">
        <ChipGroup options={['Common', 'Reserved', 'None']} value={data.parking} onChange={v => onChange('parking', v)} />
      </Field>
    </div>
  );
}

// ── 1c. Room Details — PG ────────────────────────────────────────────────────
const PG_ROOM_ICONS = {
  Single: (
    <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="10" y="18" width="40" height="28" rx="2"/>
      <line x1="30" y1="18" x2="30" y2="46"/>
      <rect x="14" y="22" width="12" height="18" rx="1"/>
      <rect x="34" y="22" width="12" height="18" rx="1"/>
      <line x1="14" y1="34" x2="26" y2="34"/>
      <line x1="34" y1="34" x2="46" y2="34"/>
    </svg>
  ),
  Double: (
    <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="18" width="48" height="28" rx="2"/>
      <line x1="22" y1="18" x2="22" y2="46"/>
      <line x1="38" y1="18" x2="38" y2="46"/>
      <rect x="9" y="22" width="10" height="18" rx="1"/>
      <rect x="25" y="22" width="10" height="18" rx="1"/>
      <rect x="41" y="22" width="10" height="18" rx="1"/>
      <line x1="9" y1="34" x2="19" y2="34"/>
      <line x1="25" y1="34" x2="35" y2="34"/>
      <line x1="41" y1="34" x2="51" y2="34"/>
    </svg>
  ),
  Triple: (
    <svg viewBox="0 0 72 60" className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="18" width="64" height="28" rx="2"/>
      <line x1="20" y1="18" x2="20" y2="46"/>
      <line x1="36" y1="18" x2="36" y2="46"/>
      <line x1="52" y1="18" x2="52" y2="46"/>
      {[6, 22, 38, 54].map((x, i) => (
        <g key={i}>
          <rect x={x} y="22" width="12" height="18" rx="1"/>
          <line x1={x} y1="34" x2={x+12} y2="34"/>
        </g>
      ))}
    </svg>
  ),
  Shared: (
    <svg viewBox="0 0 80 60" className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="14" width="72" height="14" rx="1"/>
      <rect x="4" y="32" width="72" height="14" rx="1"/>
      <line x1="22" y1="14" x2="22" y2="28"/>
      <line x1="40" y1="14" x2="40" y2="28"/>
      <line x1="58" y1="14" x2="58" y2="28"/>
      <line x1="22" y1="32" x2="22" y2="46"/>
      <line x1="40" y1="32" x2="40" y2="46"/>
      <line x1="58" y1="32" x2="58" y2="46"/>
    </svg>
  ),
};

function StepRoomDetails({ data, onChange, errors = {} }) {
  const rooms = data.pgRooms || [];
  const toggle = (r) => {
    onChange('pgRooms', rooms.includes(r) ? rooms.filter(x => x !== r) : [...rooms, r]);
  };
  return (
    <div className="space-y-6">
      <p className="text-sm text-ink-muted dark:text-white/60">Select the type of rooms available in your PG</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Single', 'Double', 'Triple', 'Shared'].map(r => {
          const selected = rooms.includes(r);
          return (
            <button
              key={r}
              type="button"
              onClick={() => toggle(r)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-gold bg-gold/8 text-gold'
                  : errors.pgRooms
                  ? 'border-red-300 dark:border-red-700/50 text-gray-400 dark:text-white/40 hover:border-gold/40'
                  : 'border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/40 hover:border-gold/40'
              }`}
            >
              <div className={selected ? 'text-gold' : 'text-gray-400 dark:text-white/30'}>
                {PG_ROOM_ICONS[r]}
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                  selected ? 'bg-gold border-gold' : 'border-gray-300 dark:border-white/30'
                }`}>
                  {selected && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className={`text-xs font-semibold ${selected ? 'text-navy dark:text-white' : 'text-ink-muted dark:text-white/50'}`}>{r}</span>
              </div>
            </button>
          );
        })}
      </div>
      {errors.pgRooms && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1.5">
          <X className="w-3.5 h-3.5 shrink-0" /> {errors.pgRooms}
        </p>
      )}
    </div>
  );
}

// ── 2. Location Details ────────────────────────────────────────────────────────
function StepLocationDetails({ data, onChange, errors, leadData }) {
  const selectedCity = data.city || leadData.city;
  const [dbLocalities, setDbLocalities] = useState([]);
  const [localityLoading, setLocalityLoading] = useState(false);

  // Fetch localities from DB via the shared fetchMasterData util
  useEffect(() => {
    if (!selectedCity) return;
    let cancelled = false;
    setLocalityLoading(true);

    fetchMasterData()
      .then(json => {
        if (cancelled) return;
        // fetchMasterData may return { success, data } or the data directly
        const payload = json?.data ?? json;
        const cityKey = selectedCity.toLowerCase().replace(/\s+/g, '_');
        let locs = [];

        if (Array.isArray(payload)) {
          // Raw array: [{ category: 'locality_pune', value: 'Baner' }, ...]
          locs = payload
            .filter(r => r.category === `locality_${cityKey}`)
            .map(r => (typeof r === 'object' ? r.value || r.name || r : r))
            .filter(Boolean);
        } else if (payload && typeof payload === 'object') {
          // Grouped object: { locality_pune: [...], locality_pcmc: [...] }
          const byCity = payload[`locality_${cityKey}`]
            || payload[`locality_${selectedCity}`]
            || payload[selectedCity.toLowerCase()]
            || payload['locality']
            || [];
          locs = byCity.map(l => (typeof l === 'object' ? l.value || l.name || l : l)).filter(Boolean);
        }

        setDbLocalities(locs.length > 0 ? locs : (LOCALITIES_BY_CITY[selectedCity] || []));
      })
      .catch(() => {
        if (!cancelled) setDbLocalities(LOCALITIES_BY_CITY[selectedCity] || []);
      })
      .finally(() => { if (!cancelled) setLocalityLoading(false); });

    return () => { cancelled = true; };
  }, [selectedCity]);

  const localityOptions = dbLocalities.length > 0 ? dbLocalities : (LOCALITIES_BY_CITY[selectedCity] || []);

  return (
    <div className="space-y-5">
      <Field label="City" required error={errors.city}>
        <Dropdown value={selectedCity} onChange={v => { onChange('city', v); onChange('locality', ''); }}
          options={CITIES} placeholder="Select City" error={errors.city} />
      </Field>
      <Field label="Locality / Area" required error={errors.locality}>
        <Dropdown
          value={data.locality}
          onChange={v => onChange('locality', v)}
          options={localityOptions}
          placeholder={localityLoading ? 'Loading localities…' : selectedCity ? 'Select Locality' : 'Select City first'}
          error={errors.locality}
          disabled={!selectedCity || (localityOptions.length === 0 && !localityLoading)}
        />
      </Field>
      <Field label="Society / Building Name">
        <input value={data.society} onChange={e => onChange('society', e.target.value)}
          placeholder="e.g. Marvel Ritz" className="input-luxury" />
      </Field>
      <Field label="Flat / House Number">
        <input value={data.flatNo} onChange={e => onChange('flatNo', e.target.value)}
          placeholder="e.g. A-401" className="input-luxury" />
      </Field>
      <Field label="Landmark (Optional)">
        <input value={data.landmark} onChange={e => onChange('landmark', e.target.value)}
          placeholder="Near landmark" className="input-luxury" />
      </Field>
    </div>
  );
}

// ── 3a. Rental Details ────────────────────────────────────────────────────────
function StepRentalDetails({ data, onChange, errors }) {
  return (
<div className="space-y-5">
      <Field label="Monthly Rent" required error={errors.price}>
        <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${errors.price ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.price} onChange={v => onChange('price', v)} placeholder="e.g. 25000" />
        </div>
      </Field>
      <Field label="Security Deposit">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.deposit} onChange={v => onChange('deposit', v)} placeholder="e.g. 100000" />
        </div>
      </Field>
      <Field label="Available From">
        <Dropdown value={data.availableFrom} onChange={v => onChange('availableFrom', v)}
          options={AVAILABLE_FROM} placeholder="Select" />
      </Field>
      <Field label="Preferred Tenants">
        <ChipGroup options={PREFERRED_TENANTS} value={data.preferredTenant} onChange={v => onChange('preferredTenant', v)} />
      </Field>
      <Field label="Description (Optional)">
        <textarea value={data.description} onChange={e => onChange('description', e.target.value)}
          placeholder="Describe your property — highlights, nearby facilities, etc."
          rows={4} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── 3b. Resale Details ────────────────────────────────────────────────────────
function StepResaleDetails({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Expected Price" required error={errors.price}>
        <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${errors.price ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.price} onChange={v => onChange('price', v)} placeholder="e.g. 8500000" />
        </div>
      </Field>
      <Field label="Price per Sq.ft">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.pricePerSqft} onChange={v => onChange('pricePerSqft', v)} placeholder="e.g. 7000" />
        </div>
      </Field>
      <Field label="Maintenance Charges (Monthly)">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.maintenance} onChange={v => onChange('maintenance', v)} placeholder="e.g. 3000" />
        </div>
      </Field>
      <Field label="Furnishing Status">
        <ChipGroup options={FURNISHINGS} value={data.furnishing} onChange={v => onChange('furnishing', v)} />
      </Field>
      <Field label="Available From">
        <Dropdown value={data.availableFrom} onChange={v => onChange('availableFrom', v)}
          options={AVAILABLE_FROM} placeholder="Select" />
      </Field>
      <Field label="Description (Optional)">
        <textarea value={data.description} onChange={e => onChange('description', e.target.value)}
          placeholder="Describe your property — highlights, nearby facilities, etc."
          rows={4} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── 3c. PG Details ────────────────────────────────────────────────────────────
function StepPGDetails({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="PG Name" required error={errors.pgName}>
        <input value={data.pgName || ''} onChange={e => onChange('pgName', e.target.value)}
          placeholder="e.g. Sunrise PG for Girls" className="input-luxury" />
      </Field>
      <Field label="Monthly Rent (Starting from)" required error={errors.price}>
        <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${errors.price ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.price} onChange={v => onChange('price', v)} placeholder="e.g. 8000" />
        </div>
      </Field>
      <Field label="Security Deposit">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.deposit} onChange={v => onChange('deposit', v)} placeholder="e.g. 16000" />
        </div>
      </Field>
      <Field label="Food Included">
        <ChipGroup
          options={['Breakfast', 'Lunch', 'Dinner', 'All Meals']}
          value={
            Array.isArray(data.pgFood)
              ? data.pgFood
              : (data.pgFood ? String(data.pgFood).split(',').map(v => v.trim()).filter(Boolean) : [])
          }
          onChange={v => onChange('pgFood', Array.isArray(v) ? v.join(', ') : (v || ''))}
          multi
        />
      </Field>
      <Field label="Preferred Tenants">
        <ChipGroup options={['Male', 'Female', 'Any']} value={data.pgGender} onChange={v => onChange('pgGender', v)} />
      </Field>
      <Field label="Notice Period">
        <ChipGroup options={['15 Days', '1 Month', '2 Months']} value={data.pgNotice} onChange={v => onChange('pgNotice', v)} />
      </Field>
      <Field label="Available From">
        <Dropdown value={data.availableFrom} onChange={v => onChange('availableFrom', v)}
          options={AVAILABLE_FROM} placeholder="Select" />
      </Field>
      <Field label="Description (Optional)">
        <textarea value={data.description} onChange={e => onChange('description', e.target.value)}
          placeholder="Describe your PG — house rules, nearby transport, etc."
          rows={4} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── 3d. Commercial Rental Details ────────────────────────────────────────────
const LOCK_IN_PERIODS = ['None', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years'];
const LEASE_DURATIONS = ['11 Months', '1 Year', '2 Years', '3 Years', '5 Years', 'Long Term'];

function StepCommercialRentalDetails({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Monthly Rent" required error={errors.price}>
        <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${errors.price ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.price} onChange={v => onChange('price', v)} placeholder="e.g. 50000" />
        </div>
      </Field>
      <Field label="Security Deposit">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.deposit} onChange={v => onChange('deposit', v)} placeholder="e.g. 200000" />
        </div>
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Lease Duration">
          <Dropdown value={data.leaseDuration} onChange={v => onChange('leaseDuration', v)}
            options={LEASE_DURATIONS} placeholder="Select" />
        </Field>
        <Field label="Lock-in Period">
          <Dropdown value={data.lockInPeriod} onChange={v => onChange('lockInPeriod', v)}
            options={LOCK_IN_PERIODS} placeholder="Select" />
        </Field>
      </div>
      <Field label="Maintenance / CAM Charges (Monthly)">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.maintenance} onChange={v => onChange('maintenance', v)} placeholder="e.g. 5000" />
        </div>
      </Field>
      <Field label="Available From">
        <Dropdown value={data.availableFrom} onChange={v => onChange('availableFrom', v)}
          options={AVAILABLE_FROM} placeholder="Select" />
      </Field>
      <Field label="Description (Optional)">
        <textarea value={data.description} onChange={e => onChange('description', e.target.value)}
          placeholder="Describe the commercial space — highlights, access, nearby landmarks, etc."
          rows={4} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── 3e. Commercial Sale Details ───────────────────────────────────────────────
function StepCommercialSaleDetails({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Expected Price" required error={errors.price}>
        <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${errors.price ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.price} onChange={v => onChange('price', v)} placeholder="e.g. 15000000" />
        </div>
      </Field>
      <Field label="Price per Sq.ft">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.pricePerSqft} onChange={v => onChange('pricePerSqft', v)} placeholder="e.g. 8000" />
        </div>
      </Field>
      <Field label="Maintenance Charges (Monthly)">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.maintenance} onChange={v => onChange('maintenance', v)} placeholder="e.g. 5000" />
        </div>
      </Field>
      <Field label="Possession Status">
        <ChipGroup options={['Ready to Move', 'Under Construction']} value={data.possessionStatus}
          onChange={v => onChange('possessionStatus', v)} />
      </Field>
      <Field label="Transaction Type">
        <ChipGroup options={['New Booking', 'Resale']} value={data.transactionType}
          onChange={v => onChange('transactionType', v)} />
      </Field>
      <Field label="Loan Available">
        <ChipGroup options={['Yes', 'No', 'Not Sure']} value={data.loanAvailable}
          onChange={v => onChange('loanAvailable', v)} />
      </Field>
      <Field label="Available From">
        <Dropdown value={data.availableFrom} onChange={v => onChange('availableFrom', v)}
          options={AVAILABLE_FROM} placeholder="Select" />
      </Field>
      <Field label="Description (Optional)">
        <textarea value={data.description} onChange={e => onChange('description', e.target.value)}
          placeholder="Describe the commercial property — highlights, access, etc."
          rows={4} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── 3f. Plot Pricing Details ──────────────────────────────────────────────────
function StepPlotPricingDetails({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Expected Price" required error={errors.price}>
        <div className={`flex items-center rounded-xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${errors.price ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.price} onChange={v => onChange('price', v)} placeholder="e.g. 5000000" />
        </div>
      </Field>
      <Field label="Price per Sq.ft">
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold">
          <span className="px-4 py-3 text-sm font-semibold text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
          <MoneyInput value={data.pricePerSqft} onChange={v => onChange('pricePerSqft', v)} placeholder="e.g. 2000" />
        </div>
      </Field>
      <Field label="Loan Available">
        <ChipGroup options={['Yes', 'No', 'Not Sure']} value={data.loanAvailable}
          onChange={v => onChange('loanAvailable', v)} />
      </Field>
      <Field label="Transaction Type">
        <ChipGroup options={['New Booking', 'Resale']} value={data.transactionType}
          onChange={v => onChange('transactionType', v)} />
      </Field>
      <Field label="Available From">
        <Dropdown value={data.availableFrom} onChange={v => onChange('availableFrom', v)}
          options={AVAILABLE_FROM} placeholder="Select" />
      </Field>
      <Field label="Description (Optional)">
        <textarea value={data.description} onChange={e => onChange('description', e.target.value)}
          placeholder="Describe the plot — highlights, approved layout, nearby landmarks, etc."
          rows={4} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── Additional Info (Resale only) ─────────────────────────────────────────────
function StepAdditionalInfo({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Loan Availability">
        <ChipGroup options={['Yes', 'No', 'Not Sure']} value={data.loanAvailable} onChange={v => onChange('loanAvailable', v)} />
      </Field>
      <Field label="Transaction Type">
        <ChipGroup options={['New Booking', 'Resale']} value={data.transactionType} onChange={v => onChange('transactionType', v)} />
      </Field>
      <Field label="Currently Under Loan">
        <ChipGroup options={['Yes', 'No']} value={data.underLoan} onChange={v => onChange('underLoan', v)} />
      </Field>
      <Field label="Additional Notes (Optional)">
        <textarea value={data.additionalNotes || ''} onChange={e => onChange('additionalNotes', e.target.value)}
          placeholder="Any other details about the property..."
          rows={3} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ── Amenities ─────────────────────────────────────────────────────────────────
function StepAmenities({ data, onChange }) {
  const toggle = (a) => {
    const current = data.amenities || [];
    onChange('amenities', current.includes(a) ? current.filter(x => x !== a) : [...current, a]);
  };
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted dark:text-white/60">Select all amenities available in your property</p>
      <div className="flex flex-wrap gap-2">
        {AMENITIES_LIST.map(a => {
          const selected = (data.amenities || []).includes(a);
          return (
            <button key={a} type="button" onClick={() => toggle(a)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                selected
                  ? 'bg-gold/10 border-gold text-gold-dark dark:text-gold'
                  : 'border-gray-200 dark:border-white/10 text-ink-muted dark:text-white/60 hover:border-gold/40'
              }`}
            >
              {selected && <Check className="w-3 h-3" />}
              {a}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function StepGallery({ data, onChange, errors = {} }) {
  const inputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');
  // Keep a ref to always access latest images without stale closure issues
  const imagesRef = useRef(data.images || []);
  useEffect(() => { imagesRef.current = data.images || []; }, [data.images]);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadError('');

    // Validate: only static images allowed — no GIF, no video
    const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    const rejected = files.filter(f => !ALLOWED.includes(f.type));
    if (rejected.length) {
      const names = rejected.map(f => {
        if (f.type.startsWith('video/')) return 'Videos';
        if (f.type === 'image/gif') return 'GIFs';
        return 'Unsupported files';
      });
      const unique = [...new Set(names)].join(', ');
      setUploadError(`${unique} are not allowed. Please upload JPG, PNG, or WebP images only.`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // Give each file a unique id so we can find it later even if array shifts
    const previews = files.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      url: URL.createObjectURL(f),
      uploading: true,
      error: false,
    }));

    // Append previews immediately for instant UX feedback
    const withPreviews = [...imagesRef.current, ...previews];
    imagesRef.current = withPreviews;
    onChange('images', withPreviews);

    // Upload each file sequentially; update its slot when done
    let anyError = false;
    for (const preview of previews) {
      try {
        const result = await uploadFile(preview.file);
        const latest = [...imagesRef.current];
        const idx = latest.findIndex(img => img && typeof img === 'object' && img.id === preview.id);
        if (idx !== -1) {
          if (result && result.success) {
            // Revoke blob URL and store plain R2 URL string
            URL.revokeObjectURL(preview.url);
            latest[idx] = result.url;
          } else {
            anyError = true;
            latest[idx] = { ...latest[idx], uploading: false, error: true };
          }
          imagesRef.current = latest;
          onChange('images', latest);
        }
      } catch {
        anyError = true;
        const latest = [...imagesRef.current];
        const idx = latest.findIndex(img => img && typeof img === 'object' && img.id === preview.id);
        if (idx !== -1) {
          latest[idx] = { ...latest[idx], uploading: false, error: true };
          imagesRef.current = latest;
          onChange('images', latest);
        }
      }
    }

    if (anyError) setUploadError('Some photos could not be uploaded. Please remove them and try again.');
    // Reset input so same file can be re-selected after an error
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (idx) => {
    const updated = [...(data.images || [])];
    const img = updated[idx];
    if (img && typeof img === 'object' && img.url) URL.revokeObjectURL(img.url);
    updated.splice(idx, 1);
    imagesRef.current = updated;
    onChange('images', updated);
    setUploadError('');
  };
  const isUploading = (data.images || []).some(img => img && typeof img === 'object' && img.uploading);

  return (
    <div className="space-y-5">
      <p className="text-sm text-ink-muted dark:text-white/60">Add photos to attract more buyers. Listings with photos get 5× more responses.</p>
      <button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading}
        className="w-full border-2 border-dashed border-gray-200 dark:border-white/15 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-gold/50 hover:bg-gold/5 transition-all duration-200 group disabled:opacity-60 disabled:cursor-not-allowed">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors">
          {isUploading
            ? <Loader2 className="w-5 h-5 text-gold animate-spin" />
            : <Upload className="w-5 h-5 text-gold" />
          }
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-navy dark:text-white">
            {isUploading ? 'Uploading...' : 'Upload Photos'}
          </p>
          <p className="text-xs text-ink-muted dark:text-white/50 mt-0.5">JPG, PNG up to 10MB each</p>
        </div>
      </button>
      <input ref={inputRef} type="file" multiple accept="image/jpeg,image/jpg,image/png,image/webp,image/avif" className="hidden" onChange={handleFiles} />

      {(uploadError || errors.images) && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1.5">
          <X className="w-3.5 h-3.5 shrink-0" /> {uploadError || errors.images}
        </p>
      )}

      {(data.images || []).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(data.images || []).map((img, i) => {
            const src = typeof img === 'string' ? img : img?.url;
            const uploading = img && typeof img === 'object' && img.uploading;
            const hasError  = img && typeof img === 'object' && img.error;
            return (
              <div key={typeof img === 'string' ? img : img?.id || i}
                className={`relative group rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-white/5 ${hasError ? 'ring-2 ring-red-400' : ''}`}>
                {src && <img src={src} alt="" className={`w-full h-full object-cover ${(uploading || hasError) ? 'opacity-50' : ''}`} />}
                {/* Uploading overlay */}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                {/* Error overlay */}
                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/40">
                    <X className="w-5 h-5 text-red-300 mb-1" />
                    <span className="text-[9px] text-red-200 font-semibold">Failed</span>
                  </div>
                )}
                {/* Cover badge (only on successfully uploaded first image) */}
                {i === 0 && !uploading && !hasError && (
                  <span className="absolute top-1.5 left-1.5 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Cover</span>
                )}
                {/* Remove button */}
                <button type="button" onClick={() => remove(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
          <button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-white/15 flex items-center justify-center hover:border-gold/50 hover:bg-gold/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Schedule ──────────────────────────────────────────────────────────────────
function StepSchedule({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-ink-muted dark:text-white/60">Let buyers know when they can visit your property.</p>
      <Field label="Best time to visit" error={errors.visitTime}>
        <ChipGroup options={['Morning (9AM–12PM)', 'Afternoon (12PM–4PM)', 'Evening (4PM–8PM)', 'Anytime']}
          value={data.visitTime} onChange={v => onChange('visitTime', v)} />
      </Field>
      <Field label="Days available">
        <ChipGroup options={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          value={data.visitDays} onChange={v => onChange('visitDays', v)} multi />
      </Field>
      <Field label="Additional notes (Optional)">
        <textarea value={data.scheduleNotes} onChange={e => onChange('scheduleNotes', e.target.value)}
          placeholder="Any special instructions for visitors..."
          rows={3} className="input-luxury resize-none" />
      </Field>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHONE OTP MODAL  (NoBroker-style, phone pre-filled from lead form)
// ═══════════════════════════════════════════════════════════════════════════════
function PhoneOTPModal({ phone, name, email, onVerified, onClose }) {
  const [otp, setOtp]                 = useState(['', '', '', '', '', '']);
  const [timer, setTimer]             = useState(30);
  const [canResend, setCanResend]     = useState(false);
  const [loading, setLoading]          = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [error, setError]             = useState('');
  const [sent, setSent]               = useState(false);

  // login = existing account, signup = new account
  // We start with login and automatically fall back to signup
  // when the backend confirms that this phone number does not exist.
  const [authMode, setAuthMode]       = useState('login');

  const inputRefs                     = useRef([]);

  // Auto-send OTP on mount
  useEffect(() => { sendOtp(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown timer
  useEffect(() => {
    if (!sent) return;
    setTimer(30); setCanResend(false);
    const iv = setInterval(() => {
      setTimer(p => {
        if (p <= 1) { clearInterval(iv); setCanResend(true); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [sent]);

  const sendOtp = async () => {
    setSendLoading(true);
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');

    try {
      // First try login. If the number is not registered, backend returns 404.
      // Then automatically request OTP in signup mode.
      let mode = authMode;

      let res = await fetch(`${API_URL}/api/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: cleanPhone, mode: 'login' }),
      });

      let d = await res.json();

      if (res.status === 404 && authMode === 'login') {
        mode = 'signup';
        setAuthMode('signup');

        res = await fetch(`${API_URL}/api/auth/otp/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target: cleanPhone, mode: 'signup' }),
        });

        d = await res.json();
      }

      if (!res.ok || !d.success) {
        setError(d.message || 'Could not send OTP. Please try again.');
        return;
      }

      setSent(true);
    } catch {
      setError('Cannot reach server. Please check your connection.');
    } finally {
      setSendLoading(false);
    }
  };

  const handleChange = (val, idx) => {
    const v = val.replace(/\D/g, '');
    const next = [...otp];
    next[idx] = v.slice(-1);
    setOtp(next);
    if (v && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (!otp[idx] && idx > 0) {
        const next = [...otp]; next[idx - 1] = ''; setOtp(next);
        inputRefs.current[idx - 1]?.focus();
      } else {
        const next = [...otp]; next[idx] = ''; setOtp(next);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (digits.length === 6) {
      setOtp(digits.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter all 6 digits'); return; }

    setLoading(true);
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');

    try {
      const payload = {
        phone: cleanPhone,
        otp: code,
        mode: authMode,
        // Backend needs these only for signup; harmless for login.
        name: name?.trim() || '',
        email: email?.trim() || '',
      };

      const res = await fetch(`${API_URL}/api/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        onVerified(data.user, data.token, authMode);
        return;
      }

      setError(data.message || 'Invalid OTP. Please try again.');
    } catch {
      setError('Cannot reach server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (!canResend || sendLoading) return;
    sendOtp();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-navy/75 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="relative bg-white dark:bg-navy rounded-3xl shadow-luxury-deep overflow-hidden w-full max-w-sm"
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10">
          <X className="w-4 h-4" />
        </button>

        <div className="p-7">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-display font-bold text-xl text-navy dark:text-white mb-1">
              Verify Your Number
            </h2>
            <p className="text-sm text-ink-muted dark:text-white/50 leading-relaxed">
              OTP sent to <span className="font-semibold text-navy dark:text-white">+91 {phone}</span>
            </p>
            <p className="text-xs text-ink-muted dark:text-white/40 mt-0.5">
              Not your number?{' '}
              <button onClick={onClose} className="text-gold hover:underline font-medium">Change</button>
            </p>
          </div>

          {/* OTP boxes */}
          <div className="flex gap-2 justify-center mb-5" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 bg-gray-50 dark:bg-white/5 text-navy dark:text-white outline-none transition-all
                  ${digit ? 'border-gold shadow-[0_0_0_3px_rgba(184,134,11,0.15)]' : 'border-gray-200 dark:border-white/15 focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.1)]'}`}
              />
            ))}
          </div>

          {/* Timer / Resend */}
          <div className="flex justify-end mb-4">
            {canResend ? (
              <button onClick={handleResend} disabled={sendLoading}
                className="text-xs font-semibold text-gold hover:underline disabled:opacity-50">
                {sendLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            ) : (
              <span className="text-xs text-ink-muted dark:text-white/40 font-mono">
                {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
              </span>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs font-medium text-center mb-4">{error}</p>
          )}

          {/* Continue button */}
          <button
            onClick={handleVerify}
            disabled={loading || otp.join('').length < 6}
            className="w-full btn-primary text-white justify-center py-3.5 rounded-2xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" />Verifying...</>
            ) : 'Continue'}
          </button>

          <p className="text-center text-[10px] text-ink-soft dark:text-white/30 mt-4">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-gold hover:underline">Terms</Link>
            {' '}&{' '}
            <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLOSE WARNING MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function CloseWarningModal({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-navy/75 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="relative bg-white dark:bg-navy rounded-3xl shadow-luxury-deep overflow-hidden w-full max-w-sm p-7"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-700/30 flex items-center justify-center mb-4">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="font-display font-bold text-xl text-navy dark:text-white mb-2">Leave this page?</h2>
          <p className="text-sm text-ink-muted dark:text-white/50 leading-relaxed mb-6">
            Your progress will be lost if you go back now. Are you sure you want to exit?
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 dark:border-white/10 text-ink-muted dark:text-white/60 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
            >
              Stay
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-2xl text-sm font-bold bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Yes, Leave
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Draft Listing Card ───────────────────────────────────────────────────────
function DraftListingCard({ draft, onResume, onDelete, deleting }) {
  const typeLabel = draft.adType === 'Resale' ? 'For Sale'
    : draft.adType === 'Rent' ? 'For Rent'
    : draft.adType === 'PG/Hostel' ? 'PG'
    : draft.adType || 'For Rent';

  const typeColor = (draft.adType === 'Resale' || draft.adType === 'Sale')
    ? 'from-blue-500 to-blue-600'
    : draft.adType === 'PG/Hostel'
    ? 'from-purple-500 to-purple-600'
    : 'from-amber-500 to-orange-500';

  const totalSteps = getSteps(draft.propertyType, draft.adType).length;
  // currentStep = the step the user was ON when they left
  const currentOnStep = (draft.currentStep || 0) + 1; // 1-indexed for display
  const pct = Math.round(((draft.currentStep || 0) / totalSteps) * 100);

  const title = draft.society
    ? `${draft.propertyType}, ${draft.society}...`
    : draft.locality
    ? `${draft.propertyType}, ${draft.locality}...`
    : draft.propertyType || 'Property';

  const price = draft.price ? `₹${Number(draft.price).toLocaleString('en-IN')}` : '₹0';
  const priceLabel = (draft.adType === 'Resale' || draft.adType === 'Sale') ? 'Price' : 'Rent';
  const city   = draft.city || 'Pune';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden hover:shadow-md hover:border-gold/30 transition-all duration-200"
    >
      {/* Top ribbon */}
      <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden`}>
        <div className={`absolute top-2 -right-4 rotate-45 bg-gradient-to-r ${typeColor} text-white text-[9px] font-bold px-6 py-0.5 shadow`}>
          {typeLabel}
        </div>
      </div>

      {/* In Progress badge */}
      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-gray-700 dark:bg-white/10 text-white dark:text-white/80 px-2.5 py-1 rounded-md">
          <Clock className="w-2.5 h-2.5" /> In Progress
        </span>
      </div>

      <div className="p-4 pt-9">
        <div className="flex items-start gap-3">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-navy dark:text-white flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate">{title}</span>
            </h4>
            <p className="text-xs text-ink-muted dark:text-white/50 mt-1">
              {priceLabel}: <span className="font-semibold text-navy dark:text-white">{price}</span>
              <span className="mx-1.5 opacity-40">·</span>
              <MapPin className="w-2.5 h-2.5 inline -mt-0.5 mr-0.5" />{city}
            </p>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-ink-soft dark:text-white/40">
                  On Step {currentOnStep} of {totalSteps}
                </span>
                <span className="text-[10px] font-bold text-gold">{pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => onResume(draft)}
                className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 dark:border-white/10 text-navy dark:text-white hover:border-gold hover:text-gold dark:hover:text-gold px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <PenSquare className="w-3 h-3" /> Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(draft._id)}
                disabled={deleting === draft._id}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-600 dark:hover:text-red-400 border border-transparent hover:border-red-200 dark:hover:border-red-700/30 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {deleting === draft._id
                  ? <Loader2 className="w-3 h-3 animate-spin" />
                  : <Trash2 className="w-3 h-3" />
                }
                Delete
              </button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center shrink-0 text-gray-300 dark:text-white/20">
            <Image className="w-6 h-6 mb-1" />
            <span className="text-[9px] font-semibold">No Photo</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST SUCCESS FULL-SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function ConfettiField() {
  const pieces = Array.from({ length: 28 });
  const colors = ['#C9940A', '#B8860B', '#ffffff', '#fde68a', '#A67A08', '#f9a825', '#fff7d6'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => {
        const color  = colors[i % colors.length];
        const left   = `${4 + Math.random() * 92}%`;
        const delay  = Math.random() * 0.7;
        const size   = 5 + Math.random() * 8;
        const rotate = Math.random() * 360;
        const drift  = (Math.random() - 0.5) * 160;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '35%',
              left,
              width: size,
              height: size * (Math.random() > 0.5 ? 1 : 2.4),
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              rotate,
            }}
            initial={{ y: 0, opacity: 1, x: 0 }}
            animate={{
              y: [0, -120 - Math.random() * 80, 350],
              x: [0, drift],
              opacity: [1, 1, 0],
              rotate: rotate + Math.random() * 400,
            }}
            transition={{ duration: 1.4 + Math.random() * 0.8, delay, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

function PostSuccessScreen({ onPostMore }) {
  const navigate = useNavigate();
  const OR = '#C9940A';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-navy-dark overflow-hidden"
    >
      <ConfettiField />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">

        {/* Pulse rings + tick circle */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 120, height: 120, border: `2px solid ${OR}28` }}
            animate={{ scale: [1, 1.5, 1.7], opacity: [0.5, 0.15, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
          />
          {/* Inner pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 96, height: 96, border: `2px solid ${OR}45` }}
            animate={{ scale: [1, 1.32], opacity: [0.8, 0] }}
            transition={{ duration: 1.1, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
          {/* Icon circle */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 18, delay: 0.1 }}
            className="relative z-10 flex items-center justify-center rounded-full"
            style={{
              width: 76,
              height: 76,
              background: `linear-gradient(135deg, #B8860B, #C9940A)`,
              boxShadow: `0 0 40px rgba(201,148,10,0.45)`,
            }}
          >
            <svg width="34" height="27" viewBox="0 0 34 27" fill="none">
              <motion.path
                d="M2 13L12 23L32 2"
                stroke="#fff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.38, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-10"
        >
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy dark:text-white leading-tight">
            Listing Submitted! 🎉
          </h2>
          <p className="text-sm text-ink-muted dark:text-white/55 leading-relaxed max-w-[320px] mx-auto font-body">
            Your listing is under review. Once our team verifies it, it will go live for buyers to discover.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button
            onClick={onPostMore}
            className="flex-1 sm:flex-none px-7 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{ borderColor: OR, color: OR, background: 'transparent' }}
          >
            Post More Property
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 sm:flex-none px-7 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: `linear-gradient(135deg, #B8860B, #C9940A)`,
              boxShadow: '0 4px 20px rgba(201,148,10,0.35)',
            }}
          >
            Back to Home
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function PostProperty() {
  const { settings } = useSiteSettings();
  const brandName = getBrandName(settings);
  const { user, signIn, authLoading, triggerSuccess } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [phase, setPhase] = useState('lead'); // 'lead' | 'listing' | 'done'
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showCloseWarning, setShowCloseWarning] = useState(false);
  const [leadForm, setLeadForm] = useState(() => ({
    name: '', email: '', phone: '', city: '',
    propertyType: 'Residential',
    adType: 'Rent',
    userType: new URLSearchParams(window.location.search).get('role') === 'broker' ? 'Broker' : 'Owner',
  }));
  const [leadErrors, setLeadErrors] = useState({});
  const [leadLoading, setLeadLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // ── Draft listings state ──
  const [drafts, setDrafts] = useState([]);
  const [draftsLoading, setDraftsLoading] = useState(false);
  const [deletingDraft, setDeletingDraft] = useState(null);
  const [showNewAdSelector, setShowNewAdSelector] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // ── If user already logged in, skip lead form & go straight to draft view ──
  useEffect(() => {
    if (!authLoading && user && phase === 'lead') {
      // Pre-fill lead form with logged-in user data
      setLeadForm(f => ({
        ...f,
        name:  f.name  || user.name  || '',
        email: f.email || user.email || '',
        phone: f.phone || user.phone || '',
      }));
    }
  }, [user, authLoading, phase]);

  // ── Fetch all drafts when user is logged in ──
  useEffect(() => {
    if (!authLoading && user && phase === 'lead') {
      const phone = user.phone;
      if (!phone) return;
      setDraftsLoading(true);
      getUserDrafts(phone)
        .then(list => {
          setDrafts(list);
        })
        .catch(() => {
          setDrafts([]);
        })
        .finally(() => {
          setDraftsLoading(false);
        });
    }
  }, [user, authLoading, phase]);

  // ── Resume a draft listing ──
  const handleResumeDraft = (draft) => {
    setListingId(draft._id);
    localStorage.setItem('draft_listing_id', draft._id);
    setLeadForm(f => ({
      ...f,
      propertyType: draft.propertyType || 'Residential',
      adType:       draft.adType       || 'Rent',
      city:         draft.city         || f.city,
    }));
    // Strip MongoDB/meta fields before spreading into listing state
    const { _id, __v, ownerName, ownerPhone, ownerEmail, propertyType: _pt, adType: _at, status, adminNote, createdAt, updatedAt, currentStep: _cs, completedSteps: _done, ...listingData } = draft;
    // pgFood is stored as a String in UserListing but the UI uses ChipGroup(multi),
    // so always normalize it to an array while editing/resuming.
    listingData.pgFood = Array.isArray(listingData.pgFood)
      ? listingData.pgFood
      : (listingData.pgFood ? String(listingData.pgFood).split(',').map(v => v.trim()).filter(Boolean) : []);
    // Backend stores parking as `parkingType`; the form uses `parking`.
    listingData.parking = listingData.parking || listingData.parkingType || '';
    setListing(l => ({ ...l, ...listingData }));
    setCurrentStep(draft.currentStep || 0);
    setPhase('listing');
  };

  // ── Delete a draft listing ──
  const handleDeleteDraft = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setDeletingDraft(id);
    const ok = await deleteDraftListing(id, user.phone);
    if (ok) {
      setDrafts(prev => prev.filter(d => d._id !== id));
      if (listingId === id) {
        setListingId(null);
        localStorage.removeItem('draft_listing_id');
      }
    }
    setDeletingDraft(null);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [listing, setListing] = useState({
    // Property / Room Details
    apartmentType: '', bhkType: '', ownershipType: '', floorType: '',
    floor: '', totalFloor: '', propertyAge: '', facing: '',
    area: '', carpetArea: '', furnishing: '',
    pgRooms: [],
    // Flatmates
    roomType: '', tenantType: '',
    // Commercial
    commercialPropertyType: '', buildingType: '', otherFeatures: [],
    leaseDuration: '', lockInPeriod: '', possessionStatus: '',
    // Plot
    plotLength: '', plotWidth: '', boundaryWall: '', cornerPlot: '',
    floorsAllowed: '', gatedProject: '',
    // Villa
    villaType: '', plotArea: '',
    // Location
    city: '', locality: '', society: '', flatNo: '', landmark: '',
    // Pricing
    price: '', deposit: '', pricePerSqft: '', maintenance: '', availableFrom: '',
    preferredTenant: '', pgFood: [], pgGender: '', pgNotice: '', pgName: '',
    // Resale / Additional
    loanAvailable: '', transactionType: '', underLoan: '', balconies: '', bathrooms: '', parking: '',
    additionalNotes: '',
    // Common
    description: '', amenities: [], images: [],
    visitTime: '', visitDays: [], scheduleNotes: '',
  });
  const [stepErrors, setStepErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [listingId, setListingId] = useState(null);

  const STEPS = getSteps(leadForm.propertyType, leadForm.adType);

  const setLead = (k, v) => {
    setLeadForm(f => ({ ...f, [k]: v }));
    setLeadErrors(e => ({ ...e, [k]: '' }));
  };
  const handleTypeChange = (type) => {
    setLeadForm(f => ({ ...f, propertyType: type, adType: AD_TYPES[type][0] }));
  };
  const updateListing = (k, v) => {
    setListing(l => ({ ...l, [k]: v }));
    setStepErrors(e => ({ ...e, [k]: '' }));
  };

  const validateLead = () => {
    const e = {};
    if (!user) {
      if (!leadForm.name.trim())                               e.name  = 'Enter your name';
      if (!/^\d{10}$/.test(leadForm.phone.replace(/\D/g, ''))) e.phone = 'Enter valid 10-digit number';
      if (!leadForm.city)                                      e.city  = 'Please select a city';
    }
    setLeadErrors(e);
    return Object.keys(e).length === 0;
  };

  // Called after OTP is verified (or user was already logged in)
  const proceedToListing = async (verifiedUser, token, mode) => {
    // Log the user in to app context
    signIn(verifiedUser, token);

    // Show the correct success screen for login vs signup
    if (token) {
      triggerSuccess(verifiedUser?.name || leadForm.name, mode === 'signup');
    }

    // Clear any previously loaded draft so new listing always starts fresh
    setListingId(null);
    localStorage.removeItem('draft_listing_id');
    setListing({
      apartmentType: '', bhkType: '', ownershipType: '', floorType: '',
      floor: '', totalFloor: '', propertyAge: '', facing: '',
      area: '', carpetArea: '', furnishing: '',
      pgRooms: [],
      roomType: '', tenantType: '',
      commercialPropertyType: '', buildingType: '', otherFeatures: [],
      leaseDuration: '', lockInPeriod: '', possessionStatus: '',
      plotLength: '', plotWidth: '', boundaryWall: '', cornerPlot: '',
      floorsAllowed: '', gatedProject: '',
      villaType: '', plotArea: '',
      city: '', locality: '', society: '', flatNo: '', landmark: '',
      price: '', deposit: '', pricePerSqft: '', maintenance: '', availableFrom: '',
      preferredTenant: '', pgFood: [], pgGender: '', pgNotice: '', pgName: '',
      loanAvailable: '', transactionType: '', underLoan: '', balconies: '', bathrooms: '', parking: '',
      additionalNotes: '',
      description: '', amenities: [], images: [],
      visitTime: '', visitDays: [], scheduleNotes: '',
    });
    setCurrentStep(0);

    setLeadLoading(true);
    setServerError('');
    try {
      // Always use user.city as fallback — leadForm.city may be empty for logged-in users
      const resolvedCity = leadForm.city || verifiedUser?.city || 'Pune';

      // createNewListing — always force-creates a fresh draft, never resumes existing
      const data = await createNewListing({
        name:         verifiedUser.name  || leadForm.name,
        phone:        verifiedUser.phone || leadForm.phone,
        email:        verifiedUser.email || leadForm.email || '',
        city:         resolvedCity,
        propertyType: leadForm.propertyType,
        adType:       leadForm.adType,
        userType:     leadForm.userType || 'Owner',
      });

      if (!data.success || !data.listing?._id) {
        setServerError(data.message || 'Could not create listing. Please try again.');
        return;
      }

      setListingId(data.listing._id);
      localStorage.setItem('draft_listing_id', data.listing._id);

      // Sync leadForm with actual user data so "Posting as" stays consistent
      setLeadForm(f => ({
        ...f,
        name:  verifiedUser.name  || f.name,
        phone: verifiedUser.phone || f.phone,
        email: verifiedUser.email || f.email,
        city:  resolvedCity,
      }));

      setPhase('listing');
    } catch (err) {
      console.error('proceedToListing error:', err);
      setServerError('Network error. Please check your connection.');
    } finally {
      setLeadLoading(false);
    }
  };

  const handleLeadSubmit = async () => {
    if (!validateLead()) return;

    // Already logged in — skip OTP, go directly to listing
    if (user) {
      await proceedToListing(user, null);
      return;
    }

    // Not logged in — show phone OTP modal
    setShowOTPModal(true);
  };

  const validateStep = () => {
    const e = {};
    const stepId = STEPS[currentStep]?.id;

    // ── Property Details ──────────────────────────────────────────────────────
    if (stepId === 'property') {
      if (leadForm.propertyType === 'Villa') {
        if (!listing.villaType)   e.villaType   = 'Required';
        if (!listing.bhkType)     e.bhkType     = 'Required';
        if (!listing.area)        e.area        = 'Required';
        if (!listing.propertyAge) e.propertyAge = 'Required';
      } else if (leadForm.propertyType === 'Plot' || leadForm.propertyType === 'Plot/Villa') {
        if (!listing.area)       e.area       = 'Required';
        if (!listing.plotLength) e.plotLength = 'Required';
        if (!listing.plotWidth)  e.plotWidth  = 'Required';
      } else if (leadForm.propertyType === 'Commercial') {
        if (!listing.commercialPropertyType) e.commercialPropertyType = 'Required';
        if (!listing.buildingType)           e.buildingType           = 'Required';
        if (!listing.propertyAge)            e.propertyAge            = 'Required';
        if (!listing.floor)                  e.floor                  = 'Required';
        if (!listing.totalFloor)             e.totalFloor             = 'Required';
        if (!listing.area)                   e.area                   = 'Required';
      } else if (leadForm.adType === 'Resale') {
        if (!listing.apartmentType)  e.apartmentType  = 'Required';
        if (!listing.bhkType)        e.bhkType        = 'Required';
        if (!listing.ownershipType)  e.ownershipType  = 'Required';
        if (!listing.area)           e.area           = 'Required';
        if (!listing.floor)          e.floor          = 'Required';
        if (!listing.totalFloor)     e.totalFloor     = 'Required';
        if (!listing.propertyAge)    e.propertyAge    = 'Required';
      } else if (leadForm.adType === 'Flatmates') {
        if (!listing.apartmentType) e.apartmentType = 'Required';
        if (!listing.bhkType)       e.bhkType       = 'Required';
        if (!listing.roomType)      e.roomType      = 'Required';
        if (!listing.tenantType)    e.tenantType    = 'Required';
        if (!listing.floor)         e.floor         = 'Required';
        if (!listing.totalFloor)    e.totalFloor    = 'Required';
        if (!listing.propertyAge)   e.propertyAge   = 'Required';
        if (!listing.area)          e.area          = 'Required';
      } else {
        // Residential Rent
        if (!listing.apartmentType) e.apartmentType = 'Required';
        if (!listing.bhkType)       e.bhkType       = 'Required';
        if (!listing.floor)         e.floor         = 'Required';
        if (!listing.totalFloor)    e.totalFloor    = 'Required';
        if (!listing.propertyAge)   e.propertyAge   = 'Required';
        if (!listing.area)          e.area          = 'Required';
      }
    }

    // ── Room Details (PG) ─────────────────────────────────────────────────────
    if (stepId === 'room') {
      if (!listing.pgRooms || listing.pgRooms.length === 0)
        e.pgRooms = 'Please select at least one room type';
    }

    // ── Location ──────────────────────────────────────────────────────────────
    if (stepId === 'location') {
      if (!listing.locality) e.locality = 'Locality is required';
    }

    // ── Pricing steps ─────────────────────────────────────────────────────────
    if (stepId === 'rental' || stepId === 'resale' || stepId === 'pgdetails' ||
        stepId === 'commercialrental' || stepId === 'commercialsale' || stepId === 'plotpricing') {
      if (!listing.price) e.price = 'Price is required';
    }

    // ── PG Name ───────────────────────────────────────────────────────────────
    if (stepId === 'pgdetails') {
      if (!listing.pgName) e.pgName = 'PG name is required';
    }

    // ── Schedule ──────────────────────────────────────────────────────────────
    if (stepId === 'schedule') {
      if (!listing.visitTime) e.visitTime = 'Please select a preferred visit time';
    }

    // ── Gallery — block submit if any image is still uploading ────────────────
    if (stepId === 'gallery') {
      const hasUploading = (listing.images || []).some(
        img => img && typeof img === 'object' && img.uploading
      );
      if (hasUploading) e.images = 'Please wait for all photos to finish uploading';
    }

    setStepErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    const isLastStep = currentStep === STEPS.length - 1;

    // Save current step BEFORE advancing. Never move forward when the save failed.
    if (listingId) {
      try {
        const savePayload = {
          ...listing,
          // Backend/UserListing uses `parkingType`; UI uses `parking`.
          // Send both so commercial and residential parking are persisted correctly.
          parking: listing.parking || '',
          parkingType: listing.parking || '',
          // UserListing.pgFood is a String; ChipGroup(multi) keeps it as an array in UI.
          pgFood: Array.isArray(listing.pgFood)
            ? listing.pgFood.join(', ')
            : (listing.pgFood || ''),
          images: listing.images.map(img => typeof img === 'string' ? img : img.url),
        };

        const result = await saveListingStep(
          listingId,
          currentStep,
          savePayload,
          leadForm.phone
        );

        if (!result?.success) {
          throw new Error(result?.message || 'Could not save this step.');
        }
      } catch (err) {
        console.error('Step auto-save failed:', {
          listingId,
          currentStep,
          error: err?.message || err,
        });
        setServerError(err?.message || 'Could not save your details. Please try again.');
        return;
      }
    }

    if (!isLastStep) {
      setCurrentStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitLoading(true);
    try {
      if (listingId) {
        const result = await submitListing(listingId, leadForm.phone);
        if (!result.success) {
          setServerError(result.message || 'Submit failed. Please try again.');
          return;
        }
        // Remove from drafts list immediately so UI reflects submission
        setDrafts(prev => prev.filter(d => d._id !== listingId));
        localStorage.removeItem('draft_listing_id');
        setListingId(null);
      }
      setPhase('done');
    } catch {
      setServerError('Submit failed. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // ── DONE screen
  if (phase === 'done') {
    return (
      <PostSuccessScreen onPostMore={() => setPhase('lead')} />
    );
  }

  // ── PHASE 1: Lead Capture
  if (phase === 'lead') {

    // ── LOGGED IN: Show draft dashboard + property type selector ──
    if (user && !authLoading) {
      return (
        <div className="min-h-screen bg-surface dark:bg-navy-dark pt-20 pb-16 transition-colors duration-300">
          <AnimatePresence>
            {showOTPModal && (
              <PhoneOTPModal
                phone={leadForm.phone}
                name={leadForm.name}
                email={leadForm.email}
                onVerified={(verifiedUser, token, mode) => {
                  setShowOTPModal(false);
                  proceedToListing(verifiedUser, token, mode);
                }}
                onClose={() => setShowOTPModal(false)}
              />
            )}

            {confirmDeleteId && (
              <motion.div
                key="delete-confirm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setConfirmDeleteId(null)}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  className="bg-[#0D1527] border border-white/10 rounded-3xl p-7 w-full max-w-sm shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">Delete Draft?</h3>
                  <p className="text-white/50 text-sm mb-6">This listing draft will be permanently deleted. This action cannot be undone.</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="flex-1 py-3 rounded-2xl border border-white/10 text-sm font-semibold text-white/60 hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmDelete}
                      className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="container-luxury mb-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
                  <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase text-gold">Free Listing</span>
                </div>
                <h1 className="font-display font-black text-navy dark:text-white text-3xl md:text-4xl leading-tight">
                  Sell or Rent your Property <span style={{ color: '#B8860B' }}>For Free</span>
                </h1>
              </div>
              <Link to="/properties"
                className="flex items-center gap-2 text-sm font-semibold text-ink-muted dark:text-white/60 hover:text-gold transition-colors border border-gray-200 dark:border-white/10 rounded-full px-5 py-2.5">
                Looking for a property? <span className="text-gold underline underline-offset-2">Browse Listings</span>
              </Link>
            </div>
          </div>

          <div className="container-luxury max-w-2xl">
            {/* User badge */}
            <div className="flex items-center gap-3 bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 px-5 py-4 mb-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shrink-0">
                <span className="text-white font-black text-base">{user.name?.[0]?.toUpperCase()}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy dark:text-white">Hey, {user.name}!</p>
                <p className="text-xs text-ink-muted dark:text-white/50">+91 {user.phone}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-green-600 dark:text-green-400">Logged In</span>
              </div>
            </div>

            {/* ── Draft Listings Section ── */}
            {draftsLoading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-ink-muted dark:text-white/40">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading your drafts...</span>
              </div>
            ) : drafts.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-navy dark:text-white text-base">
                      Your Draft Listings
                    </h3>
                    <p className="text-xs text-ink-muted dark:text-white/50 mt-0.5">
                      {drafts.length} listing{drafts.length > 1 ? 's' : ''} in progress — click Edit to continue
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-gold/10 text-gold px-2.5 py-1 rounded-full border border-gold/20">
                    {drafts.length} Draft{drafts.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {drafts.map(draft => (
                    <DraftListingCard
                      key={draft._id}
                      draft={draft}
                      onResume={handleResumeDraft}
                      onDelete={handleDeleteDraft}
                      deleting={deletingDraft}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-gray-100 dark:bg-white/10" />
                  <span className="text-xs font-semibold text-ink-soft dark:text-white/30 uppercase tracking-widest">Or post new</span>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-white/10" />
                </div>
              </div>
            )}

            {/* Post new — simplified for logged-in users */}
            <div className="bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/10 p-7 shadow-sm mb-6">
              {(drafts.length > 0 && !showNewAdSelector) ? (
                <>
                  <p className="text-sm text-ink-muted dark:text-white/50 mb-5 text-center">
                    Want to list another property? Start a fresh listing below.
                  </p>
                  <button type="button" onClick={() => setShowNewAdSelector(true)}
                    className="w-full btn-primary text-white justify-center py-4 text-base rounded-2xl">
                    <Plus className="w-4 h-4 mr-2" /> Post New Ad
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-display font-bold text-navy dark:text-white text-lg mb-6">What do you want to post?</h3>

                  <div className="mb-6">
                    <p className="text-xs font-bold text-ink-soft dark:text-white/40 tracking-widest uppercase mb-3">Property Type</p>
                    <div className="flex items-stretch rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                      {Object.keys(AD_TYPES).map((type, i) => (
                        <button key={type} type="button" onClick={() => handleTypeChange(type)}
                          className={`flex-1 relative py-3 text-sm font-semibold transition-all duration-200 ${
                            leadForm.propertyType === type
                              ? 'text-navy dark:text-white bg-white dark:bg-navy-light'
                              : 'text-ink-muted dark:text-white/50 bg-gray-50 dark:bg-navy/40 hover:bg-white/70 dark:hover:bg-white/5'
                          } ${i !== 0 ? 'border-l border-gray-200 dark:border-white/10' : ''}`}
                        >
                          {type}
                          {leadForm.propertyType === type && (
                            <motion.div layoutId="type-indicator-new" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs font-bold text-ink-soft dark:text-white/40 tracking-widest uppercase mb-3">Ad Type</p>
                    <div className="flex flex-wrap gap-3">
                      {AD_TYPES[leadForm.propertyType].map(ad => (
                        <button key={ad} type="button" onClick={() => setLead('adType', ad)}
                          className={`px-7 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                            leadForm.adType === ad
                              ? 'bg-gradient-to-r from-gold to-gold-light text-white border-gold shadow-[0_4px_16px_rgba(184,134,11,0.3)]'
                              : 'bg-white dark:bg-navy-light text-ink-muted dark:text-cream/70 border-gray-200 dark:border-white/10 hover:border-gold/40 hover:text-navy dark:hover:text-white'
                          }`}
                        >{ad}</button>
                      ))}
                    </div>
                  </div>

                  {serverError && (
                    <p className="text-red-500 text-xs font-medium mb-4 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-xl px-4 py-3">
                      {serverError}
                    </p>
                  )}

                  <div className="flex gap-3">
                    {drafts.length > 0 && (
                      <button type="button" onClick={() => setShowNewAdSelector(false)}
                        className="px-6 py-4 rounded-2xl border border-gray-200 dark:border-white/10 text-sm font-semibold text-ink-muted dark:text-white/50 hover:border-gold/40 transition-all">
                        Cancel
                      </button>
                    )}
                    <button type="button" onClick={handleLeadSubmit} disabled={leadLoading}
                      className="flex-1 btn-primary text-white justify-center py-4 text-base rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed">
                      {leadLoading
                        ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Setting up...</>
                        : <><Plus className="w-4 h-4 mr-2" /> Post New Ad</>
                      }
                    </button>
                  </div>
                </>
              )}
            </div>

                        <p className="text-center text-[11px] text-ink-soft dark:text-white/30">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      );
    }

    // ── NOT LOGGED IN: Original lead capture form ──
    return (
      <div className="min-h-screen bg-surface dark:bg-navy-dark pt-20 pb-16 transition-colors duration-300">

        {/* Phone OTP Modal */}
        <AnimatePresence>
          {showOTPModal && (
            <PhoneOTPModal
              phone={leadForm.phone}
              name={leadForm.name}
              email={leadForm.email}
              onVerified={(verifiedUser, token, mode) => {
                setShowOTPModal(false);
                proceedToListing(verifiedUser, token, mode);
              }}
              onClose={() => setShowOTPModal(false)}
            />
          )}
        </AnimatePresence>
        <div className="container-luxury mb-10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
                <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase text-gold">Free Listing</span>
              </div>
              <h1 className="font-display font-black text-navy dark:text-white text-3xl md:text-4xl leading-tight">
                Sell or Rent your Property <span style={{ color: '#B8860B' }}>For Free</span>
              </h1>
            </div>
            <Link to="/properties"
              className="flex items-center gap-2 text-sm font-semibold text-ink-muted dark:text-white/60 hover:text-gold transition-colors border border-gray-200 dark:border-white/10 rounded-full px-5 py-2.5">
              Looking for a property? <span className="text-gold underline underline-offset-2">Browse Listings</span>
            </Link>
          </div>
        </div>

        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full lg:w-[340px] shrink-0">
              <div className="bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/10 p-7 shadow-sm">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg mb-6">Why Post through us?</h3>
                <ul className="space-y-5">
                  {TRUST_POINTS.map(({ icon: Icon, label, desc }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.2)' }}>
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy dark:text-white">{label}</p>
                        <p className="text-xs text-ink-muted dark:text-white/50 mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
              </div>
              <TestimonialCarousel />
            </div>

            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/10 p-7 md:p-9 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input value={leadForm.name} onChange={e => setLead('name', e.target.value)}
                      placeholder="Name"
                      className={`input-luxury ${leadErrors.name ? 'border-red-400 focus:ring-red-300' : ''}`} />
                    {leadErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{leadErrors.name}</p>}
                  </div>
                  <div>
                    <input value={leadForm.email} onChange={e => setLead('email', e.target.value)}
                      placeholder="Enter your email like name@gmail.com" type="email" className="input-luxury" />
                  </div>
                  <div>
                    <div className={`flex items-center rounded-2xl border bg-white dark:bg-navy overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold/25 focus-within:border-gold ${leadErrors.phone ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
                      <span className="flex items-center gap-1.5 px-4 py-4 text-sm text-ink-muted dark:text-white/50 border-r border-gray-100 dark:border-white/10 shrink-0 font-medium">
                        🇮🇳 <span>+91</span>
                        <ChevronDown className="w-3 h-3 opacity-50" />
                      </span>
                      <input value={leadForm.phone} onChange={e => setLead('phone', e.target.value)}
                        placeholder="Mobile Number"
                        className="flex-1 px-4 py-4 text-sm bg-transparent text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/35 outline-none" />
                    </div>
                    {leadErrors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{leadErrors.phone}</p>}
                  </div>
                  <div>
                    <Dropdown value={leadForm.city} onChange={v => setLead('city', v)}
                      options={CITIES} placeholder="Select City" error={leadErrors.city} />
                    {leadErrors.city && <p className="text-red-500 text-xs mt-1 font-medium">{leadErrors.city}</p>}
                  </div>
                </div>

                {/* Are you an Owner or Broker? */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-ink-soft dark:text-white/40 tracking-widest propercase mb-3">You are a?</p>
                  <div className="flex gap-3">
                    {['Owner', 'Broker'].map(type => {
                      const isSelected = leadForm.userType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setLead('userType', type)}
                          className={`flex items-center gap-3 flex-1 px-5 py-3.5 rounded-2xl border transition-all duration-200 ${
                            isSelected
                              ? 'bg-gold/10 border-gold'
                              : 'bg-white dark:bg-navy border-gray-200 dark:border-white/10 hover:border-gold/40'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? 'border-gold' : 'border-gray-300 dark:border-white/30'
                          }`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-gold" />}
                          </span>
                          <span className={`text-sm font-semibold ${
                            isSelected ? 'text-gold-dark dark:text-gold' : 'text-ink-muted dark:text-white/60'
                          }`}>{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-white/10 mb-7" />

                <div className="mb-6">
                  <p className="text-xs font-bold text-ink-soft dark:text-white/40 tracking-widest uppercase mb-4 text-center">Property type</p>
                  <div className="flex items-stretch rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                    {Object.keys(AD_TYPES).map((type, i) => (
                      <button key={type} type="button" onClick={() => handleTypeChange(type)}
                        className={`flex-1 relative py-3 text-sm font-semibold transition-all duration-200 ${
                          leadForm.propertyType === type
                            ? 'text-navy dark:text-white bg-white dark:bg-navy-light'
                            : 'text-ink-muted dark:text-white/50 bg-gray-50 dark:bg-navy/40 hover:bg-white/70 dark:hover:bg-white/5'
                        } ${i !== 0 ? 'border-l border-gray-200 dark:border-white/10' : ''}`}
                      >
                        {type}
                        {leadForm.propertyType === type && (
                          <motion.div layoutId="type-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-xs font-bold text-ink-soft dark:text-white/40 tracking-widest uppercase mb-4 text-center">Select Property Ad Type</p>
                  <div className="flex flex-wrap gap-3">
                    {AD_TYPES[leadForm.propertyType].map(ad => (
                      <button key={ad} type="button" onClick={() => setLead('adType', ad)}
                        className={`px-7 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                          leadForm.adType === ad
                            ? 'bg-gradient-to-r from-gold to-gold-light text-white border-gold shadow-[0_4px_16px_rgba(184,134,11,0.3)]'
                            : 'bg-white dark:bg-navy-light text-ink-muted dark:text-cream/70 border-gray-200 dark:border-white/10 hover:border-gold/40 hover:text-navy dark:hover:text-white'
                        }`}
                      >{ad}</button>
                    ))}
                  </div>
                </div>

                {serverError && <p className="text-red-500 text-xs font-medium mb-4">{serverError}</p>}

                <button type="button" onClick={handleLeadSubmit} disabled={leadLoading}
                  className="w-full btn-primary text-white justify-center py-4 text-base rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed">
                  {leadLoading
                    ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</>
                    : 'Start Posting Your Ad For FREE'
                  }
                </button>

                <p className="text-center text-[11px] text-ink-soft dark:text-white/30 mt-4">
                  By continuing, you agree to our{' '}
                  <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PHASE 2: Multi-step Listing Form
  const step = STEPS[currentStep];
  const adType = leadForm.adType;

  const handleCloseAttempt = () => {
    setShowCloseWarning(true);
  };
  const handleCloseConfirm = async () => {
    // Save current step before exiting so draft card shows correct step
    if (listingId) {
      try {
        await saveListingStep(
          listingId,
          currentStep,
          {
            ...listing,
            pgFood: Array.isArray(listing.pgFood)
              ? listing.pgFood.join(', ')
              : (listing.pgFood || ''),
            images: listing.images.map(img => typeof img === 'string' ? img : img.url),
          },
          leadForm.phone
        );
      } catch {
        // non-blocking
      }
    }
    localStorage.removeItem('draft_listing_id');
    setShowCloseWarning(false);
    setCurrentStep(0);
    // Refresh drafts list so UI shows updated step
    if (user?.phone) {
      setDraftsLoading(true);
      getUserDrafts(user.phone)
        .then(list => { setDrafts(list); })
        .catch(() => { setDrafts([]); })
        .finally(() => { setDraftsLoading(false); });
    }
    setPhase('lead');
  };

  const renderStep = () => {
    const id = step.id;
    if (id === 'property') {
      if (leadForm.propertyType === 'Villa') return <StepPropertyDetailsVilla data={listing} onChange={updateListing} errors={stepErrors} />;
      if (leadForm.propertyType === 'Plot' || leadForm.propertyType === 'Plot/Villa') return <StepPropertyDetailsPlot data={listing} onChange={updateListing} errors={stepErrors} />;
      if (leadForm.propertyType === 'Commercial' && adType === 'Sale') return <StepPropertyDetailsCommercial data={listing} onChange={updateListing} errors={stepErrors} showCarpetArea />;
      if (leadForm.propertyType === 'Commercial') return <StepPropertyDetailsCommercial data={listing} onChange={updateListing} errors={stepErrors} />;
      if (adType === 'Resale')    return <StepPropertyDetailsResale data={listing} onChange={updateListing} errors={stepErrors} />;
      if (adType === 'Flatmates') return <StepPropertyDetailsFlatmates data={listing} onChange={updateListing} errors={stepErrors} />;
      return <StepPropertyDetailsRent data={listing} onChange={updateListing} errors={stepErrors} />;
    }
    if (id === 'room')             return <StepRoomDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'location')         return <StepLocationDetails data={listing} onChange={updateListing} errors={stepErrors} leadData={leadForm} />;
    if (id === 'rental')           return <StepRentalDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'resale')           return <StepResaleDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'pgdetails')        return <StepPGDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'commercialrental') return <StepCommercialRentalDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'commercialsale')   return <StepCommercialSaleDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'plotpricing')      return <StepPlotPricingDetails data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'amenities')        return <StepAmenities data={listing} onChange={updateListing} />;
    if (id === 'gallery')          return <StepGallery data={listing} onChange={updateListing} errors={stepErrors} />;
    if (id === 'additionalinfo')   return <StepAdditionalInfo data={listing} onChange={updateListing} />;
    if (id === 'schedule')         return <StepSchedule data={listing} onChange={updateListing} errors={stepErrors} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-20 pb-16 transition-colors duration-300">

      {/* Close Warning Modal */}
      <AnimatePresence>
        {showCloseWarning && (
          <CloseWarningModal
            onConfirm={handleCloseConfirm}
            onCancel={() => setShowCloseWarning(false)}
          />
        )}
      </AnimatePresence>

      {/* Top progress bar */}
      <div className="container-luxury mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCloseAttempt}
            className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted dark:text-white/50 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5 shrink-0"
          >
            <X className="w-3 h-3" /> Exit
          </button>
          <div className="flex items-center gap-2">
            <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <span className="font-accent font-bold tracking-[0.22em] text-[10px] uppercase text-gold">Step {currentStep + 1} of {STEPS.length}</span>
          </div>
          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #B8860B, #C9940A)' }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT Sidebar ── */}
          <div className="w-full lg:w-[220px] shrink-0">
            <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)' }}>
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-navy dark:text-white leading-tight">Post Property</span>
              </div>
              <nav className="py-2">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const done   = i < currentStep;
                  const active = i === currentStep;
                  return (
                    <button key={s.id} type="button"
                      onClick={() => { if (i < currentStep) { setCurrentStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 relative ${
                        active ? 'bg-gold/10 dark:bg-gold/10'
                        : done  ? 'hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer'
                        : 'cursor-default opacity-50'
                      }`}
                    >
                      {active && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold rounded-r" />}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        done   ? 'bg-green-500'
                        : active ? 'bg-gradient-to-br from-gold to-gold-light'
                        : 'bg-gray-100 dark:bg-white/10'
                      }`}>
                        {done
                          ? <Check className="w-3.5 h-3.5 text-white" />
                          : <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-gray-400 dark:text-white/40'}`} />
                        }
                      </div>
                      <span className={`text-xs font-semibold leading-tight ${
                        active ? 'text-navy dark:text-white'
                        : done  ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-400 dark:text-white/40'
                      }`}>{s.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Owner info */}
            <div className="mt-4 bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-ink-soft dark:text-white/40 uppercase tracking-widest mb-2">Posting as</p>
              <p className="text-sm font-bold text-navy dark:text-white">{user?.name || leadForm.name}</p>
              <p className="text-xs text-ink-muted dark:text-white/50 mt-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3" /> +91 {user?.phone || leadForm.phone}
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/10 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {leadForm.propertyType} · {leadForm.adType}
                </span>
                {leadForm.userType && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-navy dark:text-white bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-full">
                    {leadForm.userType}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT Content ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">

              {/* Step header */}
              <div className="px-7 py-5 border-b border-gray-100 dark:border-white/10">
                <h2 className="font-display font-bold text-navy dark:text-white text-xl">{step.label}</h2>
                <p className="text-xs text-ink-muted dark:text-white/50 mt-0.5">Step {currentStep + 1} of {STEPS.length}</p>
              </div>

              {/* Step content */}
              <div className="px-7 py-6">
                <AnimatePresence mode="wait">
                  <motion.div key={`${adType}-${currentStep}`}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}>
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer nav */}
              <div className="px-7 pb-6 flex items-center justify-between gap-4">
                {currentStep > 0 ? (
                  <button type="button" onClick={() => { setCurrentStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex items-center gap-2 text-sm font-semibold text-ink-muted dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back
                  </button>
                ) : <div />}
                <button type="button" onClick={handleNext} disabled={submitLoading}
                  className="btn-primary text-white px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitLoading ? 'Submitting...' : currentStep === STEPS.length - 1 ? 'Submit Listing' : 'Save & Continue'}
                  {!submitLoading && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}