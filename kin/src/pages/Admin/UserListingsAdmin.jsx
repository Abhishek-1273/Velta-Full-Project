/**
 * UserListingsAdmin.jsx
 *
 * Admin/Management panel page — shows all property ads submitted by users
 * via the "Post Free Property Ad" wizard, with full data view + verify/reject.
 *
 * Route: /panel/user-listings
 * Access: admin + management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  CheckCircle, XCircle, Eye, Clock, Search, RefreshCw,
  MapPin, IndianRupee, BedDouble, Bath, Maximize2,
  Phone, Mail, User, Home, ChevronDown, Image as ImageIcon,
  CalendarDays, MessageSquare, Building2, X, ChevronLeft, ChevronRight, Loader2, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserListings, updateUserListingStatus, updateUserListing, updateProperty } from '../../utils/adminApi';
import { PropertyForm } from './PropertiesAdmin';

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  submitted: { label: 'Pending Review', color: '#B8860B',  bg: 'rgba(184,134,11,0.12)'  },
  active:    { label: 'Verified',       color: '#22c55e',  bg: 'rgba(34,197,94,0.12)'   },
  rejected:  { label: 'Rejected',       color: '#ef4444',  bg: 'rgba(239,68,68,0.12)'   },
  draft:     { label: 'Draft',          color: '#94a3b8',  bg: 'rgba(148,163,184,0.12)' },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
      style={{ color: cfg.color, background: cfg.bg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
};

const Field = ({ label, value }) => {
  if (!value || value === '') return null;
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-navy dark:text-white font-medium">{value}</p>
    </div>
  );
};

// Editable version of Field — renders an input when `editing` is true,
// otherwise falls back to the plain read-only Field above.
const EditableField = ({ label, value, onChange, editing, type = 'text' }) => {
  if (!editing) return <Field label={label} value={value} />;
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-1">{label}</p>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/50 transition-colors"
      />
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-5">
    <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3 pb-2 border-b border-gray-100 dark:border-white/5">
      {title}
    </h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {children}
    </div>
  </div>
);

// Nomination (OpenStreetMap Nominatim) search — same one used in PropertiesAdmin's
// "Pin on Map" step, reused here so admin can search + click instead of typing
// raw lat/lng by hand.
function LocationSearch({ onSelect, cityHint }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const search = async (q) => {
    if (!q || q.length < 3) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      // Pure free-text search — not locked to the listing's city. Admin can
      // search any city/area (Mumbai, Nagpur, wherever) regardless of what's
      // filled in the City field.
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ', India')}&format=json&limit=6&addressdetails=1&countrycodes=in`,
        { headers: { 'Accept-Language': 'en', 'User-Agent': 'RealEstateAdminPanel/1.0' } }
      );
      const data = await res.json();
      setSuggestions(data);
      setOpen(data.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 400);
  };

  const handleSelect = (item) => {
    const label = item.display_name.split(',').slice(0, 3).join(',').trim();
    setQuery(label);
    setOpen(false);
    setSuggestions([]);
    onSelect({ label, lat: parseFloat(item.lat), lng: parseFloat(item.lon) });
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none" />
        <input
          value={query}
          onChange={handleChange}
          placeholder="Search society, landmark, area… e.g. Kalyani Nagar Pune"
          className="w-full pl-9 pr-9 py-2 rounded-lg text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/50 transition-colors"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-yellow-500" />
        )}
        {!loading && query && (
          <button onClick={() => { setQuery(''); setSuggestions([]); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1.5 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden">
          {suggestions.map((item) => (
            <li key={item.place_id}
              onMouseDown={() => handleSelect(item)}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy dark:text-white truncate">
                  {item.display_name.split(',').slice(0, 2).join(',')}
                </p>
                <p className="text-xs text-gray-400 dark:text-white/40 truncate mt-0.5">
                  {item.display_name.split(',').slice(2, 5).join(',')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Image Lightbox ─────────────────────────────────────────────────────────────

function ImageLightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(images.length - 1, i + 1));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
        <X className="w-6 h-6" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-20"
        disabled={idx === 0}>
        <ChevronLeft className="w-8 h-8" />
      </button>
      <img src={images[idx]} alt={`Photo ${idx + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
        onClick={e => e.stopPropagation()} />
      <button onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-20"
        disabled={idx === images.length - 1}>
        <ChevronRight className="w-8 h-8" />
      </button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
        {idx + 1} / {images.length}
      </p>
    </div>
  );
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────

function ListingDrawer({ listing, onClose, onAction, onSaveEdits, actionLoading, onOpenEdit }) {
  const [lightbox, setLightbox] = useState(null); // index
  const [rejectNote, setRejectNote] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!listing) return null;

  const l = listing;
  const images = l.images || [];

  const handleVerify = () => onAction(l._id, 'active', '');
  const handleReject = () => {
    if (!showRejectInput) { setShowRejectInput(true); return; }
    if (!rejectNote.trim()) return;
    onAction(l._id, 'rejected', rejectNote.trim());
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed right-0 top-0 bottom-0 z-[110] w-full max-w-2xl bg-white dark:bg-[#071A2F] shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <div>
            <h2 className="text-base font-bold text-navy dark:text-white">Property Ad Details</h2>
            <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">
              Submitted {new Date(l.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={l.status} />
            <button onClick={() => { onClose(); onOpenEdit(listing); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-navy dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Edit
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <X className="w-5 h-5 text-gray-400 dark:text-white/40" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">

          {/* Owner info */}
          <Section title="Owner Info">
            <Field label="Name" value={l.ownerName} />
            <Field label="Phone" value={l.ownerPhone} />
            <Field label="Email" value={l.ownerEmail} />
          </Section>

          {/* Listing meta */}
          <Section title="Listing Type">
            <Field label="Property Type" value={l.propertyType} />
            <Field label="Ad Type" value={l.adType} />
            <Field label="Status" value={STATUS_CONFIG[l.status]?.label || l.status} />
          </Section>

          {/* Location */}
          <Section title="Location">
            <Field label="City" value={l.city} />
            <Field label="Locality" value={l.locality} />
            <Field label="Society / Project" value={l.society} />
            <Field label="Flat No." value={l.flatNo} />
            <Field label="Landmark" value={l.landmark} />
          </Section>

          {/* Map pin */}
          {l.coordinates?.lat && l.coordinates?.lng ? (
            <div className="mb-5 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> Map Pin
              </p>
              <div className="flex gap-4 text-xs font-mono text-emerald-700 dark:text-emerald-300">
                <span>Lat: {Number(l.coordinates.lat).toFixed(5)}</span>
                <span>Lng: {Number(l.coordinates.lng).toFixed(5)}</span>
              </div>
            </div>
          ) : (
            <p className="mb-5 text-xs text-gray-400 dark:text-white/30 italic">No map pin was set by the user for this listing.</p>
          )}

          {/* Property details */}
          <Section title="Property Details">
            <Field label="Apartment Type" value={l.apartmentType} />
            <Field label="BHK" value={l.bhkType} />
            <Field label="Area (sq ft)" value={l.area} />
            <Field label="Carpet Area" value={l.carpetArea} />
            <Field label="Floor" value={l.floor} />
            <Field label="Total Floors" value={l.totalFloor} />
            <Field label="Furnishing" value={l.furnishing} />
            <Field label="Floor Type" value={l.floorType} />
            <Field label="Facing" value={l.facing} />
            <Field label="Property Age" value={l.propertyAge} />
            <Field label="Ownership Type" value={l.ownershipType} />
            <Field label="Bathrooms" value={l.bathrooms} />
            <Field label="Balconies" value={l.balconies} />
            <Field label="Parking" value={l.parking} />
            <Field label="Boundary Wall" value={l.boundaryWall} />
            <Field label="Corner Plot" value={l.cornerPlot} />
            <Field label="Plot Length" value={l.plotLength} />
            <Field label="Plot Width" value={l.plotWidth} />
            <Field label="Floors Allowed" value={l.floorsAllowed} />
            <Field label="Gated Project" value={l.gatedProject} />
            <Field label="Commercial Type" value={l.commercialPropertyType} />
            <Field label="Building Type" value={l.buildingType} />
            <Field label="Lease Duration" value={l.leaseDuration} />
            <Field label="Lock-in Period" value={l.lockInPeriod} />
            <Field label="Possession Status" value={l.possessionStatus} />
            <Field label="Villa Type" value={l.villaType} />
            <Field label="Plot Area" value={l.plotArea} />
            <Field label="Room Type" value={l.roomType} />
            <Field label="Tenant Type" value={l.tenantType} />
          </Section>

          {/* PG specific */}
          {(l.adType === 'PG/Hostel' || l.pgName || l.pgGender || l.pgFood || l.pgNotice || l.pgRooms?.length > 0) && (
            <Section title="PG / Hostel Details">
              <Field label="PG Name" value={l.pgName} />
              <Field label="Gender" value={l.pgGender} />
              <Field label="Food" value={l.pgFood} />
              <Field label="Notice Period" value={l.pgNotice} />
              {l.pgRooms?.length > 0 && (
                <div className="col-span-2 sm:col-span-3">
                  <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-1">PG Rooms</p>
                  <div className="flex flex-wrap gap-1.5">
                    {l.pgRooms.map((r, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-xs text-navy dark:text-white">{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* Pricing */}
          <Section title="Pricing">
            <Field label="Price" value={l.price} />
            <Field label="Deposit" value={l.deposit} />
            <Field label="Price / sq ft" value={l.pricePerSqft} />
            <Field label="Maintenance" value={l.maintenance} />
            <Field label="Available From" value={l.availableFrom} />
            <Field label="Preferred Tenant" value={l.preferredTenant} />
            <Field label="Loan Available" value={l.loanAvailable} />
            <Field label="Under Loan" value={l.underLoan} />
            <Field label="Transaction Type" value={l.transactionType} />
          </Section>

          {/* Amenities */}
          {l.amenities?.length > 0 && (
            <div className="mb-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3 pb-2 border-b border-gray-100 dark:border-white/5">
                Amenities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {l.amenities.map((a, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-gold/10 text-gold-dark dark:text-gold text-xs font-semibold">{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Other features */}
          {l.otherFeatures?.length > 0 && (
            <div className="mb-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3 pb-2 border-b border-gray-100 dark:border-white/5">
                Other Features
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {l.otherFeatures.map((f, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-xs text-navy dark:text-white">{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {l.description && (
            <div className="mb-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2 pb-2 border-b border-gray-100 dark:border-white/5">
                Description
              </h4>
              <p className="text-sm text-navy dark:text-white/80 leading-relaxed whitespace-pre-wrap">{l.description}</p>
            </div>
          )}

          {/* Additional Notes */}
          {l.additionalNotes && (
            <div className="mb-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2 pb-2 border-b border-gray-100 dark:border-white/5">
                Additional Notes
              </h4>
              <p className="text-sm text-navy dark:text-white/80 leading-relaxed whitespace-pre-wrap">{l.additionalNotes}</p>
            </div>
          )}

          {/* Schedule */}
          {(l.visitTime || l.visitDays?.length > 0 || l.scheduleNotes) && (
            <Section title="Visit Schedule">
              <Field label="Preferred Time" value={l.visitTime} />
              <Field label="Schedule Notes" value={l.scheduleNotes} />
              {l.visitDays?.length > 0 && (
                <div className="col-span-2 sm:col-span-3">
                  <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-1">Visit Days</p>
                  <div className="flex flex-wrap gap-1.5">
                    {l.visitDays.map((d, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-xs text-navy dark:text-white">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* Media */}
          {images.length > 0 && (
            <div className="mb-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3 pb-2 border-b border-gray-100 dark:border-white/5">
                Photos ({images.length})
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {images.map((url, i) => (
                  <button key={i} onClick={() => setLightbox(i)}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 hover:opacity-90 transition-opacity">
                    <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Admin note (if rejected) */}
          {l.adminNote && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Admin Note (Rejection Reason)</p>
              <p className="text-sm text-red-600 dark:text-red-400">{l.adminNote}</p>
            </div>
          )}
        </div>

        {/* Action footer — only show for submitted listings */}
        {l.status === 'submitted' && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-white/10 shrink-0 space-y-3">
            {showRejectInput && (
              <div>
                <textarea
                  value={rejectNote}
                  onChange={e => setRejectNote(e.target.value)}
                  placeholder="Reason for rejection (required)..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-red-400 transition-colors resize-none"
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleVerify}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
              >
                {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Verify & List
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || (showRejectInput && !rejectNote.trim())}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                {showRejectInput ? 'Confirm Reject' : 'Reject'}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      {lightbox !== null && (
        <ImageLightbox images={images} startIdx={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'submitted', label: 'Pending Review' },
  { key: 'active',    label: 'Verified'       },
  { key: 'rejected',  label: 'Rejected'       },
  { key: 'draft',     label: 'Drafts'         },
];

export default function UserListingsAdmin() {
  // Respect the status passed in the URL (e.g. /panel/user-listings?status=active)
  // so Dashboard's "Verified Properties" links open the Verified tab.
  const [activeTab, setActiveTab]     = useState(() => {
    const status = new URLSearchParams(window.location.search).get('status');
    return TABS.some(tab => tab.key === status) ? status : 'submitted';
  });
  const [listings, setListings]       = useState([]);
  const [total, setTotal]             = useState(0);
  const [page, setPage]               = useState(1);
  const [loading, setLoading]         = useState(false);
  const [search, setSearch]           = useState('');
  const [selected, setSelected]       = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast]             = useState(null);
  const [editTarget, setEditTarget]   = useState(null); // listing opened in PropertyForm

  const limit = 20;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = { status: activeTab, page, limit };
      if (search.trim()) params.phone = search.trim();
      const data = await getUserListings(params);
      setListings(data.listings || []);
      setTotal(data.total || 0);
    } catch (err) {
      showToast(err.message || 'Failed to load', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, search]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, search]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleSaveEdits = async (id, updatedFields) => {
    try {
      await updateUserListing(id, updatedFields);
      showToast('Listing details updated.');
      setSelected(updatedFields);
      fetchListings();
    } catch (err) {
      showToast(err.message || 'Failed to save edits', 'error');
      throw err;
    }
  };

  const handlePropertyFormSave = async (updatedData) => {
    try {
      await updateUserListing(editTarget._id, updatedData);
      showToast('Listing updated successfully.');
      setEditTarget(null);
      fetchListings();
    } catch (err) {
      showToast(err.message || 'Failed to save', 'error');
      throw err;
    }
  };

  const handleAction = async (id, status, adminNote) => {
    setActionLoading(true);
    try {
      await updateUserListingStatus(id, status, adminNote);
      showToast(status === 'active' ? 'Property verified and listed!' : 'Listing rejected.');
      setSelected(null);
      fetchListings();
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-[300] flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl text-sm font-bold"
            style={{
              background: toast.type === 'success' ? '#22c55e' : '#ef4444',
              color: '#fff',
            }}>
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-black text-navy dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
          User Property Ads
        </h1>
        <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
          Review and verify property listings submitted by owners via the Post Ad flow.
        </p>
      </div>

      {/* Tabs + search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex gap-1 p-1 rounded-2xl bg-gray-100 dark:bg-white/5 w-full sm:w-auto">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-white/10 text-navy dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by phone..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/50 transition-colors"
            />
          </div>
          <button onClick={fetchListings}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <RefreshCw className={`w-4 h-4 text-gray-400 dark:text-white/40 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table / cards */}
      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-gold animate-spin" />
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Building2 className="w-10 h-10 text-gray-300 dark:text-white/10 mb-3" />
            <p className="text-sm font-semibold text-gray-400 dark:text-white/30">No listings found</p>
            <p className="text-xs text-gray-300 dark:text-white/20 mt-1">
              {activeTab === 'submitted' ? 'No pending ads to review right now.' : `No ${activeTab} listings yet.`}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5">
                    {['Owner', 'Type / Ad', 'Location', 'Price', 'Submitted', 'Status', ''].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l._id}
                      className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy dark:text-white">{l.ownerName}</p>
                        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{l.ownerPhone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-navy dark:text-white">{l.propertyType}</p>
                        <p className="text-xs text-gray-400 dark:text-white/40">{l.adType}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-navy dark:text-white">{l.locality || l.city || '—'}</p>
                        {l.city && l.locality && <p className="text-xs text-gray-400 dark:text-white/40">{l.city}</p>}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy dark:text-white">{l.price ? `₹${l.price}` : '—'}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400 dark:text-white/40 whitespace-nowrap">
                        {new Date(l.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={l.status} />
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => setSelected(l)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all"
                          style={{ background: 'linear-gradient(135deg, #B8860B, #A67A08)' }}>
                          <Eye className="w-3.5 h-3.5" />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50 dark:divide-white/5">
              {listings.map((l) => (
                <div key={l._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={l.status} />
                      </div>
                      <p className="font-bold text-navy dark:text-white text-sm">{l.ownerName}</p>
                      <p className="text-xs text-gray-400 dark:text-white/40">{l.ownerPhone}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-500 dark:text-white/50">
                        <span>{l.propertyType} · {l.adType}</span>
                        {(l.locality || l.city) && <span>📍 {l.locality || l.city}</span>}
                        {l.price && <span>₹{l.price}</span>}
                      </div>
                    </div>
                    <button onClick={() => setSelected(l)}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #B8860B, #A67A08)' }}>
                      <Eye className="w-3.5 h-3.5" />
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-white/10">
                <p className="text-xs text-gray-400 dark:text-white/40">
                  Showing {((page - 1) * limit) + 1}–{Math.min(page * limit, total)} of {total}
                </p>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-white/40" />
                  </button>
                  <span className="text-xs font-bold text-navy dark:text-white px-2">{page} / {totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-500 dark:text-white/40" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <ListingDrawer
            listing={selected}
            onClose={() => setSelected(null)}
            onAction={handleAction}
            onSaveEdits={handleSaveEdits}
            actionLoading={actionLoading}
            onOpenEdit={(listing) => setEditTarget(listing)}
          />
        )}
      </AnimatePresence>

      {/* PropertyForm — opens when Edit button clicked in drawer */}
      {editTarget && (
        <PropertyForm
          initial={editTarget}
          onSave={handlePropertyFormSave}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}
