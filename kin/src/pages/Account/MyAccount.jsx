import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, FileText, User, LogOut, ArrowRight, MapPin,
  Phone, Mail, Clock, CheckCircle2, AlertCircle, Trash2,
  Plus, ChevronRight, Building2, Home, Loader2
} from 'lucide-react';
import { useAuth, useWishlist } from '../../contexts';
import { removeListing } from '../../utils/api';
import { API_URL } from '../../config/api';
import PropertyCard from '../../components/common/PropertyCard';
import { fadeUp, staggerContainer } from '../../animations/variants';

const GOLD        = '#B8860B';
const GOLD_LIGHT  = '#C9940A';
const NAVY        = '#071A2F';

const TABS = [
  { id: 'listings', label: 'My Listings', icon: FileText },
  { id: 'wishlist', label: 'My Shortlist', icon: Heart },
  { id: 'profile',  label: 'Profile',           icon: User  },
];

const STATUS_CONFIG = {
  draft:     { label: 'Draft',     color: '#94A3B8', bg: 'rgba(148,163,184,0.1)',  icon: Clock        },
  submitted: { label: 'Submitted', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',   icon: AlertCircle  },
  active:    { label: 'Active',    color: '#10B981', bg: 'rgba(16,185,129,0.1)',    icon: CheckCircle2 },
  rejected:  { label: 'Rejected',  color: '#EF4444', bg: 'rgba(239,68,68,0.1)',    icon: AlertCircle  },
  sold:      { label: 'Sold',      color: GOLD,      bg: 'rgba(184,134,11,0.1)',    icon: CheckCircle2 },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function ListingCard({ listing, onDelete, deleting }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-[0_8px_32px_rgba(7,26,47,0.10)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:min-h-[180px]">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-[240px] md:w-[280px] h-48 sm:h-auto shrink-0 bg-gray-100 dark:bg-white/5 overflow-hidden">
          {listing.images?.[0] ? (
            <img
              src={listing.images[0]}
              alt={listing.title || 'Property'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-10 h-10 text-gray-300 dark:text-white/20" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <StatusBadge status={listing.status} />
          </div>
        </div>

        {/* Listing details */}
        <div className="flex-1 min-w-0 p-5 flex flex-col">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-navy dark:text-white text-base leading-tight mb-2 line-clamp-2">
              {listing.title || `${listing.propertyType || 'Property'} — ${listing.adType || ''}`}
            </h3>

            {(listing.locality || listing.city) && (
              <p className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {[listing.locality, listing.city].filter(Boolean).join(', ')}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {listing.price && (
                <p className="font-bold text-base" style={{ color: GOLD }}>
                  ₹{Number(listing.price).toLocaleString('en-IN')}
                </p>
              )}
              {listing.propertyType && (
                <span className="text-xs text-gray-400">
                  {listing.propertyType}{listing.adType ? ` • ${listing.adType}` : ''}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-white/8">
            {listing.status === 'draft' && (
              <Link
                to="/services/post-property"
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-navy dark:text-white border border-gray-200 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Continue Editing <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={() => onDelete(listing._id)}
              disabled={deleting === listing._id}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-400 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50"
            >
              {deleting === listing._id
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Trash2 className="w-3.5 h-3.5" />
              }
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MyAccount() {
  const { user, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings]   = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [deleting, setDeleting]   = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/', { replace: true });
  }, [user, navigate]);

  // Fetch user's listings
  useEffect(() => {
    if (!user?.phone) return;
    setListLoading(true);
    // The backend requires a confirm query matching the owner's phone.
    // Fetch directly here so the logged-in user's drafts/submitted/active listings
    // are returned correctly without changing the shared API helper contract.
    const cleanPhone = user.phone.replace(/\D/g, '').slice(-10);
    fetch(`${API_URL}/api/user-listings/my/${cleanPhone}?confirm=${cleanPhone}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setListings(data.success ? (data.listings || []) : []))
      .catch(() => setListings([]))
      .finally(() => setListLoading(false));
  }, [user]);

  const handleDelete = async (listingId) => {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;
    setDeleting(listingId);
    try {
      await removeListing(listingId, user.phone);
      setListings(prev => prev.filter(l => l._id !== listingId));
    } catch {
      alert('Could not delete. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  const firstName = user.name.split(' ')[0];
  const initials  = user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-20 transition-colors duration-300">

      <div className="sticky top-[74px] z-30 bg-white/95 dark:bg-navy-dark/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/8 shadow-sm">
        <div className="container-luxury">
          <div className="flex gap-0">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors duration-200 focus:outline-none"
                  style={{ color: active ? NAVY : '#94A3B8' }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.id === 'wishlist' && wishlist.length > 0 && (
                    <span
                      className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                      style={{ background: GOLD, color: NAVY }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                  {tab.id === 'listings' && listings.length > 0 && (
                    <span
                      className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                      style={{ background: '#E2E8F0', color: NAVY }}
                    >
                      {listings.length}
                    </span>
                  )}
                  {active && (
                    <motion.span
                      layoutId="account-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full"
                      style={{ background: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD})` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="container-luxury py-10">
        <AnimatePresence mode="wait">

          {/* ── My Listings ── */}
          {activeTab === 'listings' && (
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-navy dark:text-white text-xl">
                  My Listings
                </h2>
                <Link
                  to="/services/post-property"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-px"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                    color: NAVY,
                    boxShadow: '0 4px 16px rgba(184,134,11,0.35)',
                  }}
                >
                  <Plus className="w-4 h-4" /> Post New Ad
                </Link>
              </div>

              {listLoading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: GOLD }} />
                </div>
              ) : listings.length === 0 ? (
                <motion.div
                  variants={fadeUp} initial="hidden" animate="visible"
                  className="text-center py-24"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.15)' }}
                  >
                    <Home className="w-9 h-9" style={{ color: GOLD }} />
                  </div>
                  <h3 className="font-display font-bold text-navy dark:text-white text-xl mb-2">
                    No listings yet
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                    Post your first property ad for free — no brokerage, full control.
                  </p>
                  <Link
                    to="/services/post-property"
                    className="btn-primary"
                  >
                    Post Property Ad <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-4"
                >
                  {listings.map(listing => (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                      onDelete={handleDelete}
                      deleting={deleting}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Wishlist ── */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <h2 className="font-display font-bold text-navy dark:text-white text-xl mb-6">
                My Shortlist
              </h2>

              {wishlist.length === 0 ? (
                <motion.div
                  variants={fadeUp} initial="hidden" animate="visible"
                  className="text-center py-24"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="inline-flex mb-6"
                  >
                    <Heart className="w-16 h-16" style={{ color: GOLD, fill: 'rgba(184,134,11,0.12)' }} />
                  </motion.div>
                  <h3 className="font-display font-bold text-navy dark:text-white text-xl mb-2">
                    No shortlisted properties
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                    Tap the heart icon on any property to save it here.
                  </p>
                  <Link to="/properties" className="btn-primary">
                    Browse Properties <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
                >
                  {wishlist.map(p => (
                    <motion.div key={p._id || p.id} variants={fadeUp}>
                      <PropertyCard property={p} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Profile ── */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="max-w-lg"
            >
              <h2 className="font-display font-bold text-navy dark:text-white text-xl mb-6">
                Profile Details
              </h2>

              <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                {/* Avatar header */}
                <div
                  className="px-6 py-6 flex items-center gap-4"
                  style={{ background: 'linear-gradient(135deg, rgba(184,134,11,0.06), transparent)' }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-black shrink-0"
                    style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`, color: NAVY }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-navy dark:text-white text-lg leading-tight">
                      {user.name}
                    </p>
                    <p className="text-[11px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: GOLD }}>
                      {user.role === 'client' ? 'Member' : user.role}
                    </p>
                  </div>
                </div>

                {/* Fields */}
                <div className="divide-y divide-gray-100 dark:divide-white/8">
                  {[
                    { icon: User,  label: 'Full Name', value: user.name  },
                    { icon: Phone, label: 'Phone',     value: user.phone },
                    { icon: Mail,  label: 'Email',     value: user.email || '—' },
                  ].map(field => {
                    const Icon = field.icon;
                    return (
                      <div key={field.label} className="flex items-center gap-4 px-6 py-4">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(184,134,11,0.08)' }}
                        >
                          <Icon className="w-4 h-4" style={{ color: GOLD }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                            {field.label}
                          </p>
                          <p className="text-navy dark:text-white text-sm font-semibold mt-0.5 truncate">
                            {field.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sign out */}
                <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(7,26,47,0.06)' }}>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-400 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
