import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Users, Building2, Search, ChevronDown, Loader2,
  UserCircle2, Phone, Mail, Calendar,
  Home, RefreshCw, TrendingUp, MessageSquare, Eye, X,
  Scale, FileText, Banknote, Paintbrush,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEnquiries, getUsers } from '../../utils/adminApi';

const GOLD = '#B8860B';
const NAVY = '#0B1728';

const STATUS_COLOR = {
  new:       { bg: '#DBEAFE', text: '#1E40AF', darkBg: 'rgba(30,64,175,0.18)',  darkText: '#93B4F7' },
  contacted: { bg: '#FEF9C3', text: '#854D0E', darkBg: 'rgba(133,77,14,0.18)', darkText: '#FBD07A' },
  visited:   { bg: '#EDE9FE', text: '#5B21B6', darkBg: 'rgba(91,33,182,0.18)', darkText: '#C4B5FD' },
  qualified: { bg: '#D1FAE5', text: '#065F46', darkBg: 'rgba(6,95,70,0.18)',   darkText: '#6EE7B7' },
  converted: { bg: '#DCFCE7', text: '#14532D', darkBg: 'rgba(20,83,45,0.18)',  darkText: '#86EFAC' },
  lost:      { bg: '#FEE2E2', text: '#7F1D1D', darkBg: 'rgba(127,29,29,0.18)', darkText: '#FCA5A5' },
};

const STATUSES = ['all', 'new', 'contacted', 'visited', 'qualified', 'converted', 'lost'];

function Avatar({ name, size = 8 }) {
  const initials = (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className={`w-${size} h-${size} rounded-full flex items-center justify-center text-xs font-bold shrink-0`}
      style={{ background: '#EEF2FF', color: '#3730A3' }}>
      {initials}
    </div>
  );
}

function CustomSelect({ value, onChange, options, placeholder, className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const sel = options.find(o => (typeof o === 'object' ? o.value : o) === value);
  const display = sel ? (typeof sel === 'object' ? sel.label : sel) : placeholder;
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-left focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/50 transition-colors ${className}`}>
        <span className={value ? 'text-navy dark:text-white capitalize' : 'text-gray-400 dark:text-white/25'}>{display}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 dark:text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div data-lenis-prevent
            initial={{ opacity: 0, y: -4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }} transition={{ duration: 0.12 }}
            className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-white/95 dark:bg-[#071A2F]/95 backdrop-blur-md border border-gray-150 dark:border-white/10 rounded-2xl shadow-luxury z-50 py-1.5 no-scrollbar">
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const label = typeof opt === 'object' ? opt.label : opt;
              const active = value === val;
              return (
                <button key={val} type="button" onClick={() => { onChange(val); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between capitalize ${active ? 'bg-gold/10 text-gold-dark dark:text-gold' : 'text-ink-muted dark:text-cream/80 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-navy dark:hover:text-white'}`}>
                  <span>{label}</span>
                  {active && <span className="text-[10px]" style={{ color: GOLD }}>●</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   REUSABLE SERVICE LEADS SECTION
   Pass type='legal'|'rental'|'loan'|'painting'|'management'
══════════════════════════════════════════════════════════════════════ */
function ServiceLeadsSection({ type, emptyLabel }) {
  const [leads,   setLeads]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [total,   setTotal]   = useState(0);
  const [search,  setSearch]  = useState('');
  const [status,  setStatus]  = useState('all');
  const isDark = document.documentElement.classList.contains('dark');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEnquiries({ type, limit: 500 });
      const list = data.enquiries || [];
      setLeads(list);
      setTotal(list.length);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [type]);

  useEffect(() => { load(); }, [load]);

  const todayCount = leads.filter(l => {
    const d = new Date(l.createdAt), now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  }).length;

  const filtered = leads.filter(l => {
    const matchStatus = status === 'all' || l.status === status;
    if (!matchStatus) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (l.name || '').toLowerCase().includes(q) || (l.phone || '').includes(q) || (l.address || '').toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Today's Leads", value: todayCount, icon: TrendingUp, color: '#B8860B' },
          { label: 'Total Leads',   value: total,      icon: Home,       color: '#7C3AED' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 p-4 flex items-center gap-3 transition-colors duration-300">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
              <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <div>
              <p className="text-xl font-black text-navy dark:text-white" style={{ fontFamily: 'Manrope,sans-serif' }}>
                {loading ? '—' : value}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-white/35 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-4 mb-5 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, phone…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/60 transition-all" />
          </div>
          <div className="flex gap-2 shrink-0">
            <CustomSelect value={status} onChange={val => setStatus(val)} placeholder="All Status"
              options={STATUSES.map(s => ({ value: s, label: s === 'all' ? 'All Status' : s }))} className="w-36" />
            <button onClick={load} className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" title="Refresh">
              <RefreshCw className="w-3.5 h-3.5 text-gray-400 dark:text-white/30" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: GOLD }} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Home className="w-10 h-10 text-gray-200 dark:text-white/10 mx-auto mb-3" />
            <p className="text-gray-400 dark:text-white/30 text-sm">{emptyLabel || 'No leads yet'}</p>
            <p className="text-[11px] text-gray-300 dark:text-white/20 mt-1">Leads from the service detail page form appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  {['Lead', 'Contact', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 dark:text-white/35 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {filtered.map(l => {
                  const sc = STATUS_COLOR[l.status] || STATUS_COLOR.new;
                  return (
                    <tr key={l._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={l.name} size={8} />
                          <div className="min-w-0">
                            <p className="font-semibold text-navy dark:text-white text-sm truncate max-w-[160px]">{l.name}</p>
                            {l.address && <p className="text-[11px] text-gray-400 dark:text-white/35 truncate max-w-[160px]">{l.address}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="space-y-0.5">
                          {l.phone && <p className="text-[12px] text-gray-600 dark:text-white/60 flex items-center gap-1.5"><Phone className="w-3 h-3 shrink-0" />{l.phone}</p>}
                          {l.email && <p className="text-[11px] text-gray-400 dark:text-white/35 flex items-center gap-1.5 truncate max-w-[180px]"><Mail className="w-3 h-3 shrink-0" />{l.email}</p>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize"
                          style={{ background: isDark ? sc.darkBg : sc.bg, color: isDark ? sc.darkText : sc.text }}>
                          {l.status || 'new'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[11px] text-gray-400 dark:text-white/30 whitespace-nowrap">
                        {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && filtered.length > 0 && (
        <p className="text-[11px] text-gray-400 dark:text-white/25 mt-3 text-right">
          {filtered.length} {filtered.length === 1 ? 'lead' : 'leads'}{status !== 'all' && ` · filtered by "${status}"`}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB 1 — REGISTERED USERS
══════════════════════════════════════════════════════════════════════ */
function UsersSection() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [total,   setTotal]   = useState(0);
  const isDark = document.documentElement.classList.contains('dark');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers({ limit: 100 });
      const list = (data.users || []).filter(u => u.role === 'client');
      setUsers(list); setTotal(list.length);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.name || '').toLowerCase().includes(q) || (u.phone || '').includes(q) || (u.email || '').toLowerCase().includes(q);
  });

  const counts = { client: 0 };
  users.forEach(u => { if (counts[u.role] !== undefined) counts[u.role]++; });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Total Users', value: total,          icon: Users,       color: '#6366F1' },
          { label: 'Registered',  value: counts.client,  icon: UserCircle2, color: '#0891B2' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 p-4 flex items-center gap-3 transition-colors duration-300">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
              <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <div>
              <p className="text-xl font-black text-navy dark:text-white" style={{ fontFamily: 'Manrope,sans-serif' }}>{loading ? '—' : value}</p>
              <p className="text-[11px] text-gray-400 dark:text-white/35 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-4 mb-5 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, email…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/60 transition-all" />
          </div>
          <button onClick={load} className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shrink-0" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5 text-gray-400 dark:text-white/30" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: GOLD }} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-10 h-10 text-gray-200 dark:text-white/10 mx-auto mb-3" />
            <p className="text-gray-400 dark:text-white/30 text-sm">No users match your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  {['User', 'Contact', 'Joined', 'Auth'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 dark:text-white/35 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {filtered.map(u => (
                  <tr key={u.id || u._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size={8} />
                        <div className="min-w-0">
                          <p className="font-semibold text-navy dark:text-white text-sm truncate max-w-[160px]">{u.name || '—'}</p>
                          <p className="text-[11px] text-gray-400 dark:text-white/35 truncate max-w-[160px]">{u.email || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-0.5">
                        {u.phone && <p className="text-[12px] text-gray-600 dark:text-white/60 flex items-center gap-1.5"><Phone className="w-3 h-3 shrink-0" />{u.phone}</p>}
                        {u.email && <p className="text-[12px] text-gray-400 dark:text-white/35 flex items-center gap-1.5 truncate max-w-[180px]"><Mail className="w-3 h-3 shrink-0" />{u.email}</p>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-gray-400 dark:text-white/30 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' }) : '—'}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-gray-400 dark:text-white/30 capitalize">{u.provider || 'email'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && filtered.length > 0 && (
        <p className="text-[11px] text-gray-400 dark:text-white/25 mt-3 text-right">Showing {filtered.length} of {total} users</p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB 3 — CONTACT FORM ENQUIRIES (original, unchanged)
══════════════════════════════════════════════════════════════════════ */
const SUBJECT_COLOR = {
  'Buy Property in Pune':   { bg: '#DBEAFE', text: '#1E40AF', darkBg: 'rgba(30,64,175,0.18)',  darkText: '#93B4F7' },
  'Sell My Property':       { bg: '#D1FAE5', text: '#065F46', darkBg: 'rgba(6,95,70,0.18)',   darkText: '#6EE7B7' },
  'Lease / Rental Enquiry': { bg: '#FEF9C3', text: '#854D0E', darkBg: 'rgba(133,77,14,0.18)', darkText: '#FBD07A' },
  'Property Management':    { bg: '#EDE9FE', text: '#5B21B6', darkBg: 'rgba(91,33,182,0.18)', darkText: '#C4B5FD' },
  'Book a Site Visit':      { bg: '#DCFCE7', text: '#14532D', darkBg: 'rgba(20,83,45,0.18)',  darkText: '#86EFAC' },
  'NRI Desk Consultation':  { bg: '#FEE2E2', text: '#7F1D1D', darkBg: 'rgba(127,29,29,0.18)', darkText: '#FCA5A5' },
  'Other':                  { bg: '#F1F5F9', text: '#475569', darkBg: 'rgba(71,85,105,0.18)', darkText: '#94A3B8' },
};

function ContactEnquiriesSection() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [total,     setTotal]     = useState(0);
  const [search,    setSearch]    = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [selected,  setSelected]  = useState(null);
  const isDark = document.documentElement.classList.contains('dark');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEnquiries({ type: 'contact', limit: 500 });
      const list = data.enquiries || [];
      setEnquiries(list); setTotal(list.length);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const todayCount = enquiries.filter(e => {
    const d = new Date(e.createdAt), now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  }).length;

  const subjects = ['all', ...Array.from(new Set(enquiries.map(e => e.subject).filter(Boolean)))];

  const filtered = enquiries.filter(e => {
    const matchSub = filterSubject === 'all' || e.subject === filterSubject;
    if (!matchSub) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (e.name || '').toLowerCase().includes(q) || (e.phone || '').includes(q) || (e.email || '').toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Today's Enquiries", value: todayCount, icon: TrendingUp,    color: '#B8860B' },
          { label: 'Total Enquiries',   value: total,      icon: MessageSquare, color: '#0891B2' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 p-4 flex items-center gap-3 transition-colors duration-300">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
              <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <div>
              <p className="text-xl font-black text-navy dark:text-white" style={{ fontFamily: 'Manrope,sans-serif' }}>{loading ? '—' : value}</p>
              <p className="text-[11px] text-gray-400 dark:text-white/35 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-4 mb-5 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, email…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/60 transition-all" />
          </div>
          <div className="flex gap-2 shrink-0">
            <CustomSelect value={filterSubject} onChange={val => setFilterSubject(val)} placeholder="All Subjects"
              options={subjects.map(s => ({ value: s, label: s === 'all' ? 'All Subjects' : s }))} className="w-44" />
            <button onClick={load} className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" title="Refresh">
              <RefreshCw className="w-3.5 h-3.5 text-gray-400 dark:text-white/30" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0E1A2B] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: GOLD }} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-10 h-10 text-gray-200 dark:text-white/10 mx-auto mb-3" />
            <p className="text-gray-400 dark:text-white/30 text-sm">No contact enquiries yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  {['From', 'Subject', 'Contact', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 dark:text-white/35 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {filtered.map(e => {
                  const sc = SUBJECT_COLOR[e.subject] || SUBJECT_COLOR['Other'];
                  return (
                    <tr key={e._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={e.name} size={8} />
                          <div className="min-w-0">
                            <p className="font-semibold text-navy dark:text-white text-sm truncate max-w-[140px]">{e.name}</p>
                            {e.email && <p className="text-[11px] text-gray-400 dark:text-white/35 truncate max-w-[140px]">{e.email}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: isDark ? sc.darkBg : sc.bg, color: isDark ? sc.darkText : sc.text }}>
                          {e.subject || 'Other'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {e.phone && <p className="text-[12px] text-gray-600 dark:text-white/60 flex items-center gap-1.5"><Phone className="w-3 h-3 shrink-0" />{e.phone}</p>}
                      </td>
                      <td className="px-5 py-3.5 text-[11px] text-gray-400 dark:text-white/30 whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => setSelected(e)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-400 dark:text-white/30">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-[11px] text-gray-400 dark:text-white/25 mt-3 text-right">{filtered.length} enquiries</p>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }} transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0E1A2B] border border-gray-100 dark:border-white/10 shadow-2xl p-6"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Avatar name={selected.name} size={10} />
                  <div>
                    <p className="font-bold text-navy dark:text-white text-base">{selected.name}</p>
                    <p className="text-[11px] text-gray-400 dark:text-white/35">
                      {new Date(selected.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-gray-400 dark:text-white/40" />
                </button>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { label: 'Phone',   val: selected.phone,   icon: <Phone className="w-3.5 h-3.5" /> },
                  { label: 'Email',   val: selected.email,   icon: <Mail className="w-3.5 h-3.5" /> },
                  { label: 'Subject', val: selected.subject, icon: <MessageSquare className="w-3.5 h-3.5" /> },
                ].filter(r => r.val).map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5">
                    <span className="text-gray-400 dark:text-white/40 shrink-0">{r.icon}</span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/30">{r.label}</p>
                      <p className="text-sm font-semibold text-navy dark:text-white">{r.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              {selected.message && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/30 mb-2">Message</p>
                  <p className="text-sm text-gray-700 dark:text-white/70 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}
              <div className="flex gap-2 mt-5">
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border-2 border-navy dark:border-white text-navy dark:text-white hover:bg-navy dark:hover:bg-white hover:text-white dark:hover:text-navy transition-all">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                )}
                {selected.email && (
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your Enquiry'}`}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 text-white transition-all"
                    style={{ background: 'linear-gradient(135deg,#B8860B,#C9940A)', color: '#071A2F' }}>
                    <Mail className="w-3.5 h-3.5" /> Reply Email
                  </a>
                )}
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 text-white transition-all"
                    style={{ background: '#25D366' }}>
                    WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT COMPONENT — 7 tabs
══════════════════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'users',      label: 'Registered Users',    icon: Users,       desc: 'All registered users on the platform' },
  { id: 'management', label: 'Property Management', icon: Building2,   desc: 'Leads from Property Management service page' },
  { id: 'legal',      label: 'Legal Services',      icon: Scale,       desc: 'Leads from Legal Services page' },
  { id: 'rental',     label: 'Rental Agreement',    icon: FileText,    desc: 'Leads from Rental Agreement page' },
  { id: 'loan',       label: 'Loan Services',       icon: Banknote,    desc: 'Leads from Loan Services page' },
  { id: 'painting',   label: 'Painting & Cleaning', icon: Paintbrush,  desc: 'Leads from Painting & Cleaning page' },
  { id: 'contact',    label: 'Contact Enquiries',   icon: MessageSquare, desc: 'Messages from the Contact page form' },
];

export default function EnquiriesAdmin() {
  const [activeTab, setActiveTab] = useState('users');
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-navy dark:text-white mb-0.5" style={{ fontFamily: 'Manrope,sans-serif' }}>Enquiries</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm">{TABS.find(t => t.id === activeTab)?.desc}</p>
        </div>
      </div>

      {/* Tab switcher — scrollable on mobile */}
      <div className="overflow-x-auto no-scrollbar mb-6">
        <div className="flex gap-1 p-1 rounded-2xl w-fit"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#F1F5F9', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap"
                style={active ? { background: isDark ? '#0E1A2B' : '#fff', color: NAVY, boxShadow: '0 1px 4px rgba(11,23,40,0.10)' } : { color: isDark ? 'rgba(255,255,255,0.35)' : '#64748B' }}>
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
                {active && (
                  <motion.div layoutId="tab-indicator" className="absolute inset-0 rounded-xl"
                    style={{ background: isDark ? '#0E1A2B' : '#fff', zIndex: -1, boxShadow: '0 1px 4px rgba(11,23,40,0.10)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
          {activeTab === 'users'      && <UsersSection />}
          {activeTab === 'management' && <ServiceLeadsSection type="management" emptyLabel="No Property Management leads yet" />}
          {activeTab === 'legal'      && <ServiceLeadsSection type="legal"      emptyLabel="No Legal Services leads yet" />}
          {activeTab === 'rental'     && <ServiceLeadsSection type="rental"     emptyLabel="No Rental Agreement leads yet" />}
          {activeTab === 'loan'       && <ServiceLeadsSection type="loan"       emptyLabel="No Loan Services leads yet" />}
          {activeTab === 'painting'   && <ServiceLeadsSection type="painting"   emptyLabel="No Painting & Cleaning leads yet" />}
          {activeTab === 'contact'    && <ContactEnquiriesSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
