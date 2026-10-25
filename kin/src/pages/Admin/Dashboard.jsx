import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Inbox, Building2, Users, ArrowRight, Calendar, FileText, Globe, ClipboardList, Clock, CheckCircle2, BadgeCheck } from 'lucide-react';
import { getProperties, getUsers, getPartnersAdmin, getEnquiries, getUserListings } from '../../utils/adminApi';
import { fetchBlogs } from '../../utils/api';
import { useAdmin } from './AdminContext';
import { useSiteSettings, getBrandName } from '../../contexts';
import { SkeletonDashboard } from '../../components/common/Skeleton';


function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl p-5 border border-gray-150 dark:border-white/10 shadow-sm hover:shadow-md hover:border-gold/30 dark:hover:border-gold/20 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: color }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && (
          <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border transition-all duration-300"
            style={{ backgroundColor: `${color}08`, color: color, borderColor: `${color}15` }}>
            {trend}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-3xl font-black text-navy dark:text-white mb-0.5 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {value ?? '—'}
        </p>
        <p className="text-[10px] font-extrabold text-gray-400 dark:text-white/30 uppercase tracking-wider">{label}</p>
        {sub && (
          <p className="text-[10px] text-gray-450 dark:text-white/25 mt-2.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Reusable Section Card wrapper ─────────────────────────────────────────────
function SectionCard({ title, subtitle, linkTo, linkLabel, footerTo, footerLabel, children, accentColor = '#B8860B' }) {
  return (
    <div className="bg-white dark:bg-[#0E1A2B] rounded-3xl border border-gray-150 dark:border-white/10 shadow-sm overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-5 border-b border-gray-100 dark:border-white/10 bg-gray-50/30 dark:bg-white/[0.01]">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{title}</h3>
            <p className="text-[10px] text-gray-400 dark:text-white/35">{subtitle}</p>
          </div>
          {linkTo && (
            <RouterLink to={linkTo} className="text-xs font-bold hover:opacity-70 flex items-center gap-1 group transition-colors shrink-0" style={{ color: accentColor }}>
              <span>{linkLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </RouterLink>
          )}
        </div>
        <div className="p-4 space-y-3.5">{children}</div>
      </div>
      {footerTo && (
        <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/20 dark:bg-white/[0.01] text-center">
          <RouterLink to={footerTo} className="text-xs font-semibold text-gray-500 dark:text-white/40 hover:text-navy dark:hover:text-white transition-colors">
            {footerLabel}
          </RouterLink>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user, isMgmt } = useAdmin();
  const { settings } = useSiteSettings();
  const isAgent = user?.role === 'agent';

  const [counts, setCounts]               = useState({ properties: 0, blogs: 0, partners: 0, users: 0, myLeads: 0 });
  const [recentBlogs, setRecentBlogs]     = useState([]);
  const [pendingAds, setPendingAds]       = useState([]);
  const [verifiedAds, setVerifiedAds]     = useState([]);
  const [pendingCount, setPendingCount]   = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // ── Pending user submissions ──────────────────────────────────────────
        const pendingData = await getUserListings({ status: 'submitted', limit: 5 })
          .catch(() => ({ listings: [], total: 0 }));
        setPendingAds(pendingData.listings || []);
        setPendingCount(pendingData.total || 0);

        // ── Verified / approved user listings ────────────────────────────────
        const verifiedData = await getUserListings({ status: 'active', limit: 5 })
          .catch(() => ({ listings: [], total: 0 }));
        setVerifiedAds(verifiedData.listings || []);
        setVerifiedCount(verifiedData.total || 0);

        // ── Blogs, partners, users (non-agent only) ───────────────────────────
        let bData        = { blogs: [] };
        let partnersData = { partners: [] };
        let userData     = { users: [] };
        let myLeadsData  = { enquiries: [] };

        // property count for stat cards
        const pData = await getProperties({ limit: 1 }).catch(() => ({ total: 0 }));

        if (!isAgent) {
          const [bRes, pRes, uRes] = await Promise.all([
            fetchBlogs({ limit: 3 }).catch(() => []),
            getPartnersAdmin().catch(() => ({ partners: [] })),
            isMgmt ? getUsers().catch(() => ({ users: [] })) : Promise.resolve({ users: [] }),
          ]);
          bData        = Array.isArray(bRes) ? { blogs: bRes } : (bRes || { blogs: [] });
          partnersData = pRes || { partners: [] };
          userData     = uRes || { users: [] };
          const blogsArray = bData.blogs || (Array.isArray(bData) ? bData : []);
          setRecentBlogs(blogsArray);
        } else {
          myLeadsData = await getEnquiries({ limit: 100 }).catch(() => ({ enquiries: [] }));
        }

        setCounts({
          properties: pData.total || 0,
          blogs:      (bData.blogs || []).length,
          partners:   (partnersData.partners || []).length,
          users:      (userData.users || []).filter(x => x.role !== 'client').length,
          myLeads:    (myLeadsData.enquiries || []).length,
        });
      } catch (e) {
        console.error('Dashboard metrics fetch failed:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isMgmt, isAgent]);

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="animate-fade-in pb-8">

      {/* ── Welcome Banner ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 mb-7 border border-transparent dark:border-white/5 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #071A2F 0%, #0c2543 50%, #051324 100%)' }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-md bg-gold/10 text-gold text-[9px] font-black uppercase tracking-widest border border-gold/15">
                Internal Portal
              </span>
              <span className="text-white/30 text-[10px] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Welcome back, <span style={{ color: '#B8860B' }}>
                {user?.name && user.name !== 'Admin'
                  ? user.name
                  : user?.role === 'management' ? 'Manager' : (user?.name || 'Administrator')}
              </span>
            </h1>
            <p className="text-white/60 text-xs md:text-sm max-w-xl leading-relaxed font-medium">
              Here is the live activity overview for the {getBrandName(settings)} luxury portfolio. Optimize listings, manage active customer leads, and oversee operations.
            </p>
          </div>

          {isAgent ? (
            <div className="flex items-center gap-4 shrink-0 bg-white/[0.03] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
              <div className="text-center border-r border-white/10 pr-4">
                <p className="text-gold text-lg font-black">{counts.properties}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Listings</p>
              </div>
              <div className="text-center">
                <p className="text-cyan-400 text-lg font-black">{counts.myLeads}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">My Leads</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 shrink-0 bg-white/[0.03] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
              <div className="text-center border-r border-white/10 pr-4">
                <p className="text-gold text-lg font-black">{counts.properties}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Listings</p>
              </div>
              <div className="text-center border-r border-white/10 pr-4">
                <p className="text-purple-400 text-lg font-black">{counts.blogs}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Blogs</p>
              </div>
              <div className="text-center border-r border-white/10 pr-4">
                <p className="text-emerald-400 text-lg font-black">{counts.partners}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Partners</p>
              </div>
              <div className="text-center">
                <p className="text-cyan-400 text-lg font-black">{counts.users}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Staff</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
      {isAgent ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          <StatCard icon={Building2} label="Luxury Listings" value={counts.properties} sub="Live on public site" color="#B8860B" trend="Active" />
          <StatCard icon={Inbox} label="My Assigned Leads" value={counts.myLeads} sub="Assigned enquiries" color="#7C3AED" trend="Active" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-7">
          <StatCard icon={Building2} label="Verified Properties" value={verifiedCount} sub="Live on public site" color="#B8860B" trend="+12% growth" />
          <StatCard icon={FileText} label="Editorial Blogs" value={counts.blogs} sub="Published articles" color="#7C3AED" trend="Weekly" />
          <StatCard icon={Globe} label="Developer Partners" value={counts.partners} sub="Featured builders" color="#059669" trend="Verified" />
          <StatCard icon={ClipboardList} label="Pending Property Ads" value={pendingCount} sub="Awaiting admin review" color="#F59E0B" trend="Review" />
          {isMgmt && (
            <StatCard icon={Users} label="Staff Directory" value={counts.users} sub="Active team accounts" color="#0891B2" trend="Active" />
          )}
        </div>
      )}

      {/* ── 3-column grid ───────────────────────────────────────────────────── */}
      {!isAgent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Column 1: Pending Property Ads ──────────────────────────────── */}
          <SectionCard
            title="Pending Property Ads"
            subtitle="User-submitted ads awaiting your review"
            linkTo="/panel/user-listings"
            linkLabel="Review all"
            footerTo="/panel/user-listings"
            footerLabel="Verify or reject user property ads"
            accentColor="#F59E0B"
          >
            {pendingAds.length === 0 ? (
              <p className="text-center py-10 text-xs text-gray-400 dark:text-white/20">No pending ads right now. 🎉</p>
            ) : (
              pendingAds.map(ad => (
                <div key={ad._id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-amber-50/40 dark:hover:bg-amber-500/5 transition-colors group">
                  {ad.images?.[0] ? (
                    <img src={ad.images[0]} alt={ad.propertyType} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-100 dark:bg-white/10" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                      <ClipboardList className="w-5 h-5 text-amber-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy dark:text-white truncate group-hover:text-amber-500 transition-colors">
                      {ad.ownerName}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-white/30 truncate mt-0.5">
                      {ad.propertyType} · {ad.adType}{ad.locality ? ` · ${ad.locality}` : ad.city ? ` · ${ad.city}` : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] font-black text-amber-500 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 uppercase flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> Pending
                      </span>
                      {ad.price && (
                        <span className="text-[9px] font-bold text-gray-400 dark:text-white/30">₹{ad.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </SectionCard>

          {/* ── Column 2: Verified Properties ───────────────────────────────── */}
          <SectionCard
            title="Verified Properties"
            subtitle="Admin-approved listings now live on site"
            linkTo="/panel/user-listings?status=active"
            linkLabel={`View all (${verifiedCount})`}
            footerTo="/panel/user-listings?status=active"
            footerLabel="Manage all verified user listings"
            accentColor="#059669"
          >
            {verifiedAds.length === 0 ? (
              <p className="text-center py-10 text-xs text-gray-400 dark:text-white/20">No verified listings yet.</p>
            ) : (
              verifiedAds.map(ad => (
                <div key={ad._id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-emerald-50/40 dark:hover:bg-emerald-500/5 transition-colors group">
                  {ad.images?.[0] ? (
                    <img src={ad.images[0]} alt={ad.propertyType} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-100 dark:bg-white/10" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <BadgeCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy dark:text-white truncate group-hover:text-emerald-500 transition-colors">
                      {ad.ownerName}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-white/30 truncate mt-0.5">
                      {ad.propertyType} · {ad.adType}{ad.locality ? ` · ${ad.locality}` : ad.city ? ` · ${ad.city}` : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] font-black text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                      </span>
                      {ad.price && (
                        <span className="text-[9px] font-bold text-gray-400 dark:text-white/30">₹{ad.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </SectionCard>

          {/* ── Column 3: Recent Blogs ───────────────────────────────────────── */}
          <SectionCard
            title="Recent Editorial Blogs"
            subtitle="Latest published guides and market studies"
            linkTo="/panel/blogs"
            linkLabel="Manage blogs"
            footerTo="/panel/blogs"
            footerLabel="Write editorial posts and publish articles"
            accentColor="#7C3AED"
          >
            {recentBlogs.length === 0 ? (
              <p className="text-center py-10 text-xs text-gray-400 dark:text-white/20">No articles available.</p>
            ) : (
              recentBlogs.map(b => (
                <div key={b._id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                  {b.image ? (
                    <img src={b.image} alt={b.title} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-100 dark:bg-white/10 animate-fade-in" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-gray-400 dark:text-white/30" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy dark:text-white truncate group-hover:text-gold transition-colors">
                      {b.title}
                    </p>
                    <p className="text-[10px] text-gray-450 dark:text-white/35 mt-0.5 truncate">
                      {b.subtitle || `${getBrandName(settings)} Editorial`}
                    </p>
                    <div className="flex items-center gap-2.5 mt-2">
                      <span className="text-[9px] text-gray-400 dark:text-white/20 font-bold whitespace-nowrap">
                        {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {b.readTime && (
                        <span className="text-[9px] text-gold font-extrabold uppercase whitespace-nowrap">{b.readTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </SectionCard>

        </div>
      )}
    </div>
  );
}
