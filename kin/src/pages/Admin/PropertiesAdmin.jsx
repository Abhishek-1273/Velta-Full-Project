import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, Pencil, Trash2, Loader2, X, Building2, ChevronDown, Search,
  Star, Check, ShieldCheck, Briefcase, Upload, Home, MapPin, IndianRupee,
  Sparkles, Image as ImageIcon, Info, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProperties, createProperty, updateProperty, deleteProperty, uploadImage, getUsers } from '../../utils/adminApi';
import { fetchMasterData } from '../../utils/api';
import { useAdmin } from './AdminContext';
import { SkeletonTable } from '../../components/common/Skeleton';

// ─── Agent Assign Modal ────────────────────────────────────────────────────────
function AgentAssignModal({ property, agents, onClose, onSave }) {
  const [selectedAgent, setSelectedAgent] = useState(property.agent?._id || property.agent?.id || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const agent = agents.find(a => a._id === selectedAgent || a.id === selectedAgent);
    await onSave(property._id, agent || null);
    setSaving(false);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-[#071A2F] border border-gray-150 dark:border-white/10 shadow-luxury">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-black text-navy dark:text-white text-base">Assign Agent</h3>
          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-gray-400 dark:text-white/40 mb-3 truncate">
          Property: <span className="font-bold text-navy dark:text-white">{property.title}</span>
        </p>
        <div className="space-y-1.5 max-h-64 overflow-y-auto no-scrollbar mb-4">
          {/* Unassign option */}
          <button type="button" onClick={() => setSelectedAgent('')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
              selectedAgent === '' ? 'bg-gold/10 border border-gold/30' : 'hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent'
            }`}>
            <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
              <X className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-white/50 italic">Unassigned</span>
            {selectedAgent === '' && <Check className="w-3.5 h-3.5 text-yellow-500 ml-auto" />}
          </button>
          {agents.map(agent => {
            const id = agent._id || agent.id;
            const isSelected = selectedAgent === id;
            return (
              <button key={id} type="button" onClick={() => setSelectedAgent(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                  isSelected ? 'bg-gold/10 border border-gold/30' : 'hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent'
                }`}>
                <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/15">
                  <span className="text-[10px] font-black text-gold">{agent.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-navy dark:text-white leading-none truncate">{agent.name}</p>
                  <p className="text-[9px] text-gray-400 dark:text-white/30 mt-0.5">{agent.phone || agent.email}</p>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-yellow-500 ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-navy dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-yellow-500 active:scale-95 text-xs font-extrabold text-navy transition-all cursor-pointer shadow-lg shadow-gold/30 disabled:opacity-60 flex items-center gap-1.5">
            {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : <><Check className="w-3.5 h-3.5" /> Save</>}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

// ─── Source Badge ──────────────────────────────────────────────────────────────
function SourceBadge({ addedBy }) {
  const role = addedBy?.role || 'admin';
  const name = addedBy?.name || '';
  if (role === 'management') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 whitespace-nowrap">
        <Briefcase className="w-2.5 h-2.5" />
        Manager{name ? `: ${name}` : ''}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 whitespace-nowrap">
      <ShieldCheck className="w-2.5 h-2.5" />
      Admin{name ? `: ${name}` : ''}
    </span>
  );
}

// ─── Constants (mirrored from PostProperty) ────────────────────────────────────
const PROPERTY_CATEGORIES = ['Residential', 'Commercial', 'Plot', 'Villa'];
const AD_TYPES_BY_CATEGORY = {
  Residential: ['Rent', 'Resale', 'PG/Hostel', 'Flatmates'],
  Commercial:  ['Rent', 'Sale'],
  Plot:        ['Resale'],
  Villa:       ['Resale'],
};
const CITIES_LIST      = ['Pune', 'PCMC'];
const LOCALITIES = {
  Pune: ['Koregaon Park','Kalyani Nagar','Viman Nagar','Kharadi','Hadapsar','Magarpatta','Wagholi','Undri','Kondhwa','Wanowrie','NIBM Road','Bibwewadi','Katraj','Dhayari','Ambegaon','Warje','Kothrud','Karve Nagar','Erandwane','Deccan','Shivajinagar','Model Colony','Aundh','Baner','Balewadi','Sus','Pashan','Bavdhan','Pimple Gurav','Dhanori','Lohegaon','Vishrantwadi'],
  PCMC: ['Wakad','Hinjewadi','Pimple Saudagar','Pimple Nilakh','Ravet','Punawale','Tathawade','Thergaon','Chinchwad','Pimpri','Akurdi','Nigdi','Pradhikaran','Bhosari','Moshi','Chakan','Dighi','Kalewadi','Kasarwadi','Dapodi','Sangvi','Alandi Road','Chikhali','Charholi'],
};
const RENT_APT_TYPES    = ['Apartment','Independent House','Gated Community Villa'];
const RESALE_APT_TYPES  = ['Apartment','Independent House','Gated Community Villa','Standalone Building'];
const BHK_TYPES         = ['1 RK','1 BHK','2 BHK','3 BHK','4 BHK','4+ BHK'];
const OWNERSHIP_TYPES   = ['Self Owned','On Lease'];
const FLOOR_TYPES       = ['Tiles','Marble','Wooden','Cement'];
const FLOORS            = ['Ground',...Array.from({length:30},(_,i)=>String(i+1))];
const TOTAL_FLOORS      = Array.from({length:30},(_,i)=>String(i+1));
const PROPERTY_AGES     = ['Under Construction','Less than 1 year','1–3 years','3–5 years','5–10 years','10+ years'];
const FACINGS           = ['East','West','North','South','North-East','North-West','South-East','South-West'];
const FURNISHINGS       = ['Unfurnished','Semi-Furnished','Fully Furnished'];
const AVAILABLE_FROM    = ['Immediately','Within 15 days','Within 1 month','After 2 months','After 3 months'];
const PREFERRED_TENANTS = ['Anyone','Family','Bachelors','Company'];
const STATUSES          = ['Ready to Move','Under Construction','Pre-Launch','Sold Out'];
const COMMERCIAL_TYPES  = ['Office Space','Showroom','Shop','Industrial Building','Co-working','Warehouse','Other'];
const COMMERCIAL_BLDG   = ['Independent House','Business Park','Mall','Independent Shop','Standalone Building'];
const COMMERCIAL_BLDG_WH= ['Standalone Building'];
const FLOORS_ALLOWED    = ['G','G+1','G+2','G+3','G+4','G+5','G+6','G+7','G+8','G+9','G+10+'];
const PLOT_FACINGS      = ['East','West','North','South','North-East','North-West','South-East','South-West'];
const VILLA_TYPES       = ['Independent Villa','Gated Community Villa','Duplex Villa','Row Villa'];
const VILLA_BHK_TYPES   = ['1 BHK','2 BHK','3 BHK','4 BHK','5+ BHK'];
const VILLA_AGES        = ['New','1–5 Years','5–10 Years','10+ Years'];
const AMENITIES_LIST    = ['Lift','Parking','Power Backup','Security','Gym','Swimming Pool','Clubhouse','Garden','CCTV','Intercom','Gas Pipeline','Water Supply 24x7','Rainwater Harvesting','Wheelchair Access'];

// ─── Reusable UI ──────────────────────────────────────────────────────────────
const inputCls   = "w-full px-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/50 transition-colors";
const labelCls   = "block text-[11px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-1";
const sectionCls = "pt-4 border-t border-gray-100 dark:border-white/10 first:border-t-0 first:pt-0";

function Lbl({ children }) {
  return (
    <label className={labelCls}>
      {children}
    </label>
  );
}

function AdminDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  const selected = options.find(o => (typeof o === 'object' ? o.value : o) === value);
  const display  = selected ? (typeof selected === 'object' ? (selected.label || selected.value) : selected) : placeholder;
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-left focus:outline-none focus:border-yellow-400 transition-colors">
        <span className={value ? 'text-navy dark:text-white' : 'text-gray-400 dark:text-white/25'}>{display}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div data-lenis-prevent
            initial={{ opacity: 0, y: -4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }} transition={{ duration: 0.12 }}
            className="absolute left-0 right-0 mt-1.5 max-h-52 overflow-y-auto bg-white dark:bg-[#071A2F] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1 no-scrollbar">
            {options.map(opt => {
              const val   = typeof opt === 'object' ? opt.value : opt;
              const label = typeof opt === 'object' ? opt.label : opt;
              return (
                <button key={val} type="button" onClick={() => { onChange(val); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                    value === val ? 'bg-gold/10 text-yellow-700 dark:text-yellow-400' : 'text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}>
                  <span>{label}</span>
                  {value === val && <Check className="w-3 h-3 text-yellow-500" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChipGroup({ options, value, onChange, multi = false }) {
  const isSelected = (opt) => multi ? (value || []).includes(opt) : value === opt;
  const toggle = (opt) => {
    if (multi) {
      const curr = value || [];
      onChange(curr.includes(opt) ? curr.filter(x => x !== opt) : [...curr, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => toggle(opt)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
            isSelected(opt)
              ? 'bg-gold/10 border-yellow-400 text-yellow-700 dark:text-yellow-400'
              : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:border-yellow-400/50'
          }`}>
          {multi && isSelected(opt) && <Check className="w-3 h-3" />}
          {opt}
        </button>
      ))}
    </div>
  );
}

function PriceInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden focus-within:border-yellow-400 transition-colors">
      <span className="px-3 py-2.5 text-sm font-semibold text-gray-400 dark:text-white/40 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">₹</span>
      <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'e.g. 8500000'} type="number"
        className="flex-1 px-3 py-2.5 text-sm bg-transparent text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none" />
    </div>
  );
}

function AreaInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden focus-within:border-yellow-400 transition-colors">
      <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'e.g. 1200'} type="number"
        className="flex-1 px-3 py-2.5 text-sm bg-transparent text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none" />
      <span className="px-3 py-2.5 text-xs font-semibold text-gray-400 dark:text-white/40 border-l border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">Sq.ft</span>
    </div>
  );
}

// ─── Wizard Steps ──────────────────────────────────────────────────────────────
const ADMIN_STEPS = [
  { id: 'type',      label: 'Property Type', icon: Building2 },
  { id: 'details',   label: 'Details',       icon: Home },
  { id: 'location',  label: 'Location',      icon: MapPin },
  { id: 'pricing',   label: 'Pricing',       icon: IndianRupee },
  { id: 'amenities', label: 'Amenities',     icon: Sparkles },
  { id: 'gallery',   label: 'Gallery',       icon: ImageIcon },
  { id: 'extra',     label: 'Extra Info',    icon: Info },
];

// ─── STEP 1: Category + Ad Type ───────────────────────────────────────────────
function StepType({ form, set, isEdit }) {
  const adOptions = AD_TYPES_BY_CATEGORY[form.category] || [];
  return (
    <div className="space-y-5">
      <div>
        <Lbl required>Property Category</Lbl>
        <div className="grid grid-cols-2 gap-2.5 mt-1">
          {PROPERTY_CATEGORIES.map(cat => {
            const selected = form.category === cat;
            return (
              <button key={cat} type="button" disabled={isEdit}
                onClick={() => {
                  if (isEdit) return;
                  set('category', cat);
                  set('adType', '');
                }}
                className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  selected
                    ? 'bg-gold/10 border-yellow-400 text-yellow-700 dark:text-yellow-400'
                    : isEdit
                      ? 'border-gray-200 dark:border-white/10 text-gray-300 dark:text-white/20 cursor-not-allowed'
                      : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:border-yellow-400/50'
                }`}>
                <span className="flex items-center justify-center gap-2">
                  {cat}
                  {isEdit && selected && <span className="text-[10px] opacity-70">🔒</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {adOptions.length > 0 && (
        <div>
          <Lbl required>Ad Type</Lbl>
          <div className="flex flex-wrap gap-2 mt-1">
            {adOptions.map(opt => {
              const selected = form.adType === opt;
              return (
                <button key={opt} type="button" disabled={isEdit}
                  onClick={() => { if (!isEdit) set('adType', opt); }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selected
                      ? 'bg-gold/10 border-yellow-400 text-yellow-700 dark:text-yellow-400'
                      : isEdit
                        ? 'border-gray-200 dark:border-white/10 text-gray-300 dark:text-white/20 cursor-not-allowed'
                        : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:border-yellow-400/50'
                  }`}>
                  {opt}
                  {isEdit && selected && <span className="text-[9px] opacity-70">🔒</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Lbl required>Property Title</Lbl>
          <input value={form.title || ''} onChange={e => set('title', e.target.value)}
            placeholder="e.g. Spacious 3BHK in Koregaon Park" className={inputCls} />
        </div>
        <div>
          <Lbl>Developer / Builder</Lbl>
          <input value={form.developer || ''} onChange={e => set('developer', e.target.value)}
            placeholder="e.g. Marvel Realtors" className={inputCls} />
        </div>
        <div>
          <Lbl>RERA Number</Lbl>
          <input value={form.rera || ''} onChange={e => set('rera', e.target.value)}
            placeholder="e.g. P52100012345" className={inputCls} />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2: Details (dynamic by category + adType) ───────────────────────────
function StepDetails({ form, set }) {
  const { category, adType } = form;
  const isResidentialRent     = category === 'Residential' && (adType === 'Rent' || adType === 'Flatmates');
  const isResidentialResale   = category === 'Residential' && adType === 'Resale';
  const isPG                  = category === 'Residential' && adType === 'PG/Hostel';
  const isCommercial          = category === 'Commercial';
  const isPlot                = category === 'Plot';
  const isVilla               = category === 'Villa';
  const isWarehouse           = form.commercialPropertyType === 'Warehouse' || form.commercialPropertyType === 'Industrial Building';

  if (isPG) return (
    <div className="space-y-4">
      <div>
        <Lbl required>PG Name</Lbl>
        <input value={form.pgName || ''} onChange={e => set('pgName', e.target.value)}
          placeholder="e.g. Sunrise PG for Girls" className={inputCls} />
      </div>
      <div>
        <Lbl>Food Included</Lbl>
        <ChipGroup options={['No Food','Veg Only','Veg & Non-Veg']} value={form.pgFood} onChange={v => set('pgFood', v)} />
      </div>
      <div>
        <Lbl>Preferred Tenants</Lbl>
        <ChipGroup options={['Male','Female','Any']} value={form.pgGender} onChange={v => set('pgGender', v)} />
      </div>
      <div>
        <Lbl>Notice Period</Lbl>
        <ChipGroup options={['15 Days','1 Month','2 Months']} value={form.pgNotice} onChange={v => set('pgNotice', v)} />
      </div>
      <div>
        <Lbl>Room Types Available</Lbl>
        <ChipGroup options={['Single','Double','Three','Four']} value={form.pgRooms || []} onChange={v => set('pgRooms', v)} multi />
      </div>
    </div>
  );

  if (isPlot) return (
    <div className="space-y-4">
      <div>
        <Lbl required>Plot Area</Lbl>
        <AreaInput value={form.area} onChange={v => set('area', v)} placeholder="e.g. 2400" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl>Length (ft)</Lbl>
          <input value={form.plotLength || ''} onChange={e => set('plotLength', e.target.value)}
            placeholder="e.g. 40" type="number" className={inputCls} />
        </div>
        <div>
          <Lbl>Width (ft)</Lbl>
          <input value={form.plotWidth || ''} onChange={e => set('plotWidth', e.target.value)}
            placeholder="e.g. 60" type="number" className={inputCls} />
        </div>
      </div>
      <div>
        <Lbl>Boundary Wall</Lbl>
        <ChipGroup options={['Yes','No']} value={form.boundaryWall} onChange={v => set('boundaryWall', v)} />
      </div>
      <div>
        <Lbl>Corner Plot</Lbl>
        <ChipGroup options={['Yes','No']} value={form.cornerPlot} onChange={v => set('cornerPlot', v)} />
      </div>
      <div>
        <Lbl>Floors Allowed for Construction</Lbl>
        <AdminDropdown value={form.floorsAllowed} onChange={v => set('floorsAllowed', v)}
          options={FLOORS_ALLOWED} placeholder="Select" />
      </div>
      <div>
        <Lbl>Facing</Lbl>
        <AdminDropdown value={form.facing} onChange={v => set('facing', v)}
          options={PLOT_FACINGS} placeholder="Select" />
      </div>
      <div>
        <Lbl>Inside a Gated Project?</Lbl>
        <ChipGroup options={['Yes','No']} value={form.gatedProject} onChange={v => set('gatedProject', v)} />
      </div>
    </div>
  );

  if (isVilla) return (
    <div className="space-y-4">
      <div>
        <Lbl required>Villa Type</Lbl>
        <ChipGroup options={VILLA_TYPES} value={form.villaType} onChange={v => set('villaType', v)} />
      </div>
      <div>
        <Lbl required>BHK</Lbl>
        <ChipGroup options={VILLA_BHK_TYPES} value={form.bhkType} onChange={v => set('bhkType', v)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Built-up Area</Lbl>
          <AreaInput value={form.area} onChange={v => set('area', v)} placeholder="e.g. 2400" />
        </div>
        <div>
          <Lbl>Plot Area</Lbl>
          <AreaInput value={form.plotArea} onChange={v => set('plotArea', v)} placeholder="e.g. 3000" />
        </div>
      </div>
      <div>
        <Lbl required>Property Age</Lbl>
        <ChipGroup options={VILLA_AGES} value={form.propertyAge} onChange={v => set('propertyAge', v)} />
      </div>
      <div>
        <Lbl>Facing</Lbl>
        <AdminDropdown value={form.facing} onChange={v => set('facing', v)} options={PLOT_FACINGS} placeholder="Select" />
      </div>
      <div>
        <Lbl>Inside a Gated Project?</Lbl>
        <ChipGroup options={['Yes','No']} value={form.gatedProject} onChange={v => set('gatedProject', v)} />
      </div>
    </div>
  );

  if (isCommercial) return (
    <div className="space-y-4">
      <div>
        <Lbl required>Commercial Property Type</Lbl>
        <AdminDropdown value={form.commercialPropertyType}
          onChange={v => { set('commercialPropertyType', v); if ((v === 'Warehouse' || v === 'Industrial Building') && form.buildingType !== 'Standalone Building') set('buildingType', ''); }}
          options={COMMERCIAL_TYPES} placeholder="Select" />
      </div>
      <div>
        <Lbl required>Building Type</Lbl>
        <AdminDropdown value={form.buildingType} onChange={v => set('buildingType', v)}
          options={isWarehouse ? COMMERCIAL_BLDG_WH : COMMERCIAL_BLDG} placeholder="Select" />
      </div>
      <div>
        <Lbl required>Age of Property</Lbl>
        <AdminDropdown value={form.propertyAge} onChange={v => set('propertyAge', v)} options={PROPERTY_AGES} placeholder="Select" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Floor</Lbl>
          <AdminDropdown value={form.floor} onChange={v => set('floor', v)} options={FLOORS} placeholder="Select" />
        </div>
        <div>
          <Lbl required>Total Floors</Lbl>
          <AdminDropdown value={form.totalFloor} onChange={v => set('totalFloor', v)} options={TOTAL_FLOORS} placeholder="Select" />
        </div>
      </div>
      <div>
        <Lbl required>Super Built Up Area</Lbl>
        <AreaInput value={form.area} onChange={v => set('area', v)} placeholder="e.g. 1500" />
      </div>
      <div>
        <Lbl>Carpet Area</Lbl>
        <AreaInput value={form.carpetArea} onChange={v => set('carpetArea', v)} placeholder="e.g. 1200" />
      </div>
      <div>
        <Lbl>Furnishing</Lbl>
        <ChipGroup options={FURNISHINGS} value={form.furnishing} onChange={v => set('furnishing', v)} />
      </div>
      <div>
        <Lbl>Other Features</Lbl>
        <ChipGroup options={['On Main Road','Corner Property']} value={form.otherFeatures || []} onChange={v => set('otherFeatures', v)} multi />
      </div>
    </div>
  );

  if (isResidentialResale) return (
    <div className="space-y-4">
      <div>
        <Lbl required>Apartment Type</Lbl>
        <AdminDropdown value={form.apartmentType} onChange={v => set('apartmentType', v)} options={RESALE_APT_TYPES} placeholder="Select" />
      </div>
      <div>
        <Lbl required>BHK</Lbl>
        <ChipGroup options={BHK_TYPES} value={form.bhkType} onChange={v => set('bhkType', v)} />
      </div>
      <div>
        <Lbl>Ownership Type</Lbl>
        <ChipGroup options={OWNERSHIP_TYPES} value={form.ownershipType} onChange={v => set('ownershipType', v)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Built Up Area</Lbl>
          <AreaInput value={form.area} onChange={v => set('area', v)} />
        </div>
        <div>
          <Lbl>Carpet Area</Lbl>
          <AreaInput value={form.carpetArea} onChange={v => set('carpetArea', v)} placeholder="e.g. 950" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Property Age</Lbl>
          <AdminDropdown value={form.propertyAge} onChange={v => set('propertyAge', v)} options={PROPERTY_AGES} placeholder="Select" />
        </div>
        <div>
          <Lbl>Facing</Lbl>
          <AdminDropdown value={form.facing} onChange={v => set('facing', v)} options={FACINGS} placeholder="Select" />
        </div>
      </div>
      <div>
        <Lbl>Floor Type</Lbl>
        <ChipGroup options={FLOOR_TYPES} value={form.floorType} onChange={v => set('floorType', v)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Floor</Lbl>
          <AdminDropdown value={form.floor} onChange={v => set('floor', v)} options={FLOORS} placeholder="Select" />
        </div>
        <div>
          <Lbl required>Total Floors</Lbl>
          <AdminDropdown value={form.totalFloor} onChange={v => set('totalFloor', v)} options={TOTAL_FLOORS} placeholder="Select" />
        </div>
      </div>
    </div>
  );

  // Default: Residential Rent / Flatmates
  return (
    <div className="space-y-4">
      <div>
        <Lbl required>Apartment Type</Lbl>
        <AdminDropdown value={form.apartmentType} onChange={v => set('apartmentType', v)} options={RENT_APT_TYPES} placeholder="Select" />
      </div>
      <div>
        <Lbl required>BHK</Lbl>
        <ChipGroup options={BHK_TYPES} value={form.bhkType} onChange={v => set('bhkType', v)} />
      </div>
      {adType === 'Flatmates' && (
        <>
          <div>
            <Lbl>Room Type</Lbl>
            <ChipGroup options={['Single Room','Shared Room']} value={form.roomType} onChange={v => set('roomType', v)} />
          </div>
          <div>
            <Lbl>Preferred Tenant</Lbl>
            <ChipGroup options={['Male','Female']} value={form.tenantType} onChange={v => set('tenantType', v)} />
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Floor</Lbl>
          <AdminDropdown value={form.floor} onChange={v => set('floor', v)} options={FLOORS} placeholder="Select" />
        </div>
        <div>
          <Lbl required>Total Floors</Lbl>
          <AdminDropdown value={form.totalFloor} onChange={v => set('totalFloor', v)} options={TOTAL_FLOORS} placeholder="Select" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Lbl required>Property Age</Lbl>
          <AdminDropdown value={form.propertyAge} onChange={v => set('propertyAge', v)} options={PROPERTY_AGES} placeholder="Select" />
        </div>
        <div>
          <Lbl>Facing</Lbl>
          <AdminDropdown value={form.facing} onChange={v => set('facing', v)} options={FACINGS} placeholder="Select" />
        </div>
      </div>
      <div>
        <Lbl required>Built Up Area</Lbl>
        <AreaInput value={form.area} onChange={v => set('area', v)} />
      </div>
    </div>
  );
}

// ─── STEP 3: Location ──────────────────────────────────────────────────────────
// ─── Location Search (OpenStreetMap Nominatim) ────────────────────────────────
function LocationSearch({ onSelect, initialValue = '', cityHint = '' }) {
  const [query, setQuery]           = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [open, setOpen]             = useState(false);
  const debounceRef                 = useRef(null);
  const wrapperRef                  = useRef(null);

  // Close dropdown on outside click
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
      // Pure free-text search — not locked to the form's city. Admin can
      // search any city/area regardless of what's filled in the City field.
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
    onSelect({
      label,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    });
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none" />
        <input
          value={query}
          onChange={handleChange}
          placeholder="Search society, landmark, area… e.g. Kalyani Nagar Pune"
          className={`${inputCls} pl-9 pr-9`}
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

function StepLocation({ form, set, masterData = {} }) {
  const safeMasterData = masterData || {};
  const masterCities = Array.isArray(safeMasterData.city) ? safeMasterData.city : [];
  const masterLocalities = Array.isArray(safeMasterData.locality) ? safeMasterData.locality : [];
  const localityOpts = Array.isArray(LOCALITIES[form.city]) && LOCALITIES[form.city].length
    ? LOCALITIES[form.city]
    : masterLocalities;
  const cityOptions = masterCities.map(c => {
    if (typeof c === 'string') return { value: c, label: c };
    return { value: c?.value || c?.name || c?.label || '', label: c?.label || c?.name || c?.value || '' };
  }).filter(o => o.value);
  const localityOptions = localityOpts.map(l => {
    if (typeof l === 'string') return { value: l, label: l };
    return { value: l?.value || l?.name || l?.label || '', label: l?.label || l?.name || l?.value || '' };
  }).filter(o => o.value);
  const hasCoords = !!(form.coordinates && form.coordinates.lat !== '' && form.coordinates.lng !== '');

  const handleLocationSelect = ({ label, lat, lng }) => {
    set('coordinates', { lat, lng });
    // Auto-fill society if empty
    if (!form.society) set('society', label);
  };

  return (
    <div className="space-y-4">
      <div>
        <Lbl required>City</Lbl>
        <AdminDropdown value={form.city} onChange={v => { set('city', v); set('location', ''); }}
          options={cityOptions.length ? cityOptions : CITIES_LIST.map(c => ({ value: c, label: c }))}
          placeholder="Select City" />
      </div>
      <div>
        <Lbl required>Locality / Area</Lbl>
        <AdminDropdown value={form.location}
          onChange={v => set('location', v)}
          options={localityOptions}
          placeholder={form.city ? 'Select Locality' : 'Select City first'} />
      </div>
      <div>
        <Lbl>Society / Building Name</Lbl>
        <input value={form.society || ''} onChange={e => set('society', e.target.value)}
          placeholder="e.g. Marvel Ritz" className={inputCls} />
      </div>
      <div>
        <Lbl>Flat / House Number</Lbl>
        <input value={form.flatNo || ''} onChange={e => set('flatNo', e.target.value)}
          placeholder="e.g. A-401" className={inputCls} />
      </div>
      <div>
        <Lbl>Landmark</Lbl>
        <input value={form.landmark || ''} onChange={e => set('landmark', e.target.value)}
          placeholder="Near landmark" className={inputCls} />
      </div>

      {/* ── Map Location Search ── */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <Lbl>Pin on Map</Lbl>
          {hasCoords && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              Location pinned
            </span>
          )}
        </div>
        <LocationSearch
          onSelect={handleLocationSelect}
          initialValue={form.society || form.location || ''}
          cityHint={form.city}
        />
        <p className="text-[11px] text-gray-400 dark:text-white/30 mt-2 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Society name, landmark, ya area search karo — exact pin set ho jaayega
        </p>

        {/* Manual fallback — search kaam na kare ya jagah OSM pe na ho to
            admin seedha lat/lng daal sakta hai (Google Maps se copy karke). */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Lbl>Latitude (manual)</Lbl>
            <input
              type="text"
              value={form.coordinates?.lat ?? ''}
              onChange={e => set('coordinates', { ...(form.coordinates || {}), lat: e.target.value })}
              placeholder="e.g. 18.5158"
              className={inputCls}
            />
          </div>
          <div>
            <Lbl>Longitude (manual)</Lbl>
            <input
              type="text"
              value={form.coordinates?.lng ?? ''}
              onChange={e => set('coordinates', { ...(form.coordinates || {}), lng: e.target.value })}
              placeholder="e.g. 73.9273"
              className={inputCls}
            />
          </div>
        </div>

        {hasCoords && (
          <div className="mt-3 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="flex gap-4 text-xs font-mono text-emerald-700 dark:text-emerald-300">
              <span>Lat: {Number(form.coordinates.lat).toFixed(5)}</span>
              <span>Lng: {Number(form.coordinates.lng).toFixed(5)}</span>
            </div>
            <button onClick={() => set('coordinates', { lat: '', lng: '' })}
              className="ml-auto text-emerald-600 dark:text-emerald-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STEP 4: Pricing ──────────────────────────────────────────────────────────
function StepPricing({ form, set }) {
  const { category, adType } = form;
  const isRent = category === 'Residential' && (adType === 'Rent' || adType === 'Flatmates' || adType === 'PG/Hostel');
  const isSale = !isRent;

  return (
    <div className="space-y-4">
      <div>
        <Lbl required>{isRent ? 'Monthly Rent' : 'Expected Price'}</Lbl>
        <PriceInput value={form.price} onChange={v => set('price', v)} placeholder={isRent ? 'e.g. 25000' : 'e.g. 8500000'} />
      </div>
      <div>
        <Lbl>Price Label (display text)</Lbl>
        <input value={form.priceLabel || ''} onChange={e => set('priceLabel', e.target.value)}
          placeholder="e.g. ₹2.9 Cr or ₹25,000/mo" className={inputCls} />
      </div>
      {isSale && (
        <>
          <div>
            <Lbl>Price per Sq.ft</Lbl>
            <PriceInput value={form.pricePerSqft} onChange={v => set('pricePerSqft', v)} placeholder="e.g. 7000" />
          </div>
          <div>
            <Lbl>Maintenance Charges (Monthly)</Lbl>
            <PriceInput value={form.maintenance} onChange={v => set('maintenance', v)} placeholder="e.g. 3000" />
          </div>
        </>
      )}
      {isRent && (
        <div>
          <Lbl>Security Deposit</Lbl>
          <PriceInput value={form.deposit} onChange={v => set('deposit', v)} placeholder="e.g. 100000" />
        </div>
      )}
      <div>
        <Lbl>Property Status</Lbl>
        <AdminDropdown value={form.status} onChange={v => set('status', v)} options={STATUSES} placeholder="Select Status" />
      </div>
      {(category === 'Residential' || category === 'Commercial') && (
        <div>
          <Lbl>Furnishing</Lbl>
          <ChipGroup options={FURNISHINGS} value={form.furnishing} onChange={v => set('furnishing', v)} />
        </div>
      )}
      <div>
        <Lbl>Available From</Lbl>
        <AdminDropdown value={form.availableFrom} onChange={v => set('availableFrom', v)} options={AVAILABLE_FROM} placeholder="Select" />
      </div>
      {isRent && (
        <div>
          <Lbl>Preferred Tenants</Lbl>
          <ChipGroup options={PREFERRED_TENANTS} value={form.preferredTenant} onChange={v => set('preferredTenant', v)} />
        </div>
      )}
      <div>
        <Lbl>Description</Lbl>
        <textarea value={form.description || ''} onChange={e => set('description', e.target.value)}
          rows={3} placeholder="Describe the property — highlights, nearby facilities, etc."
          className={`${inputCls} resize-none`} />
      </div>
    </div>
  );
}

// ─── STEP 5: Amenities ────────────────────────────────────────────────────────
function StepAmenities({ form, set, masterData = {} }) {
  const safeMasterData = masterData || {};
  const rawAmenities = Array.isArray(safeMasterData.amenity) && safeMasterData.amenity.length
    ? safeMasterData.amenity
    : AMENITIES_LIST;
  const amenitiesList = rawAmenities.map(a =>
    typeof a === 'string' ? a : (a?.name || a?.label || a?.value || '')
  ).filter(Boolean);
  const selectedAmenities = Array.isArray(form.amenities)
    ? form.amenities.map(a => typeof a === 'string' ? a : (a?.name || a?.label || a?.value || '')).filter(Boolean)
    : [];
  const toggle = (a) => {
    const curr = selectedAmenities;
    set('amenities', curr.includes(a) ? curr.filter(x => x !== a) : [...curr, a]);
  };
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 dark:text-white/40">Select all amenities available in this property</p>
      <div className="flex flex-wrap gap-2">
        {amenitiesList.map(a => {
          const selected = selectedAmenities.includes(a);
          return (
            <button key={a} type="button" onClick={() => toggle(a)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selected
                  ? 'bg-gold/10 border-yellow-400 text-yellow-700 dark:text-yellow-400'
                  : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:border-yellow-400/50'
              }`}>
              {selected && <Check className="w-3 h-3" />}
              {a}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── STEP 6: Gallery ──────────────────────────────────────────────────────────
function StepGallery({ form, set }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadImage(file);
        urls.push(url);
      }
      set('images', [...(form.images || []), ...urls]);
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx) => {
    const updated = [...(form.images || [])];
    updated.splice(idx, 1);
    set('images', updated);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 dark:text-white/40">Add photos — listings with photos get far more responses. First image becomes the cover.</p>
      <button type="button" onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-200 dark:border-white/15 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-yellow-400/50 hover:bg-gold/5 transition-all group">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors">
          {uploading ? <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" /> : <Upload className="w-5 h-5 text-yellow-500" />}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-navy dark:text-white">{uploading ? 'Uploading…' : 'Upload Photos'}</p>
          <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">JPG, PNG up to 10MB each</p>
        </div>
      </button>
      <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />
      {(form.images || []).length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {(form.images || []).map((img, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-white/5">
              <img src={img} alt="" className="w-full h-full object-cover" />
              {i === 0 && <span className="absolute top-1.5 left-1.5 bg-yellow-400 text-navy text-[9px] font-black px-2 py-0.5 rounded-full">★ Cover</span>}
              <button type="button" onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── STEP 7: Extra Info ───────────────────────────────────────────────────────
function StepExtra({ form, set, agents }) {
  const isResale = form.adType === 'Resale';
  return (
    <div className="space-y-4">
      {isResale && (
        <>
          <div>
            <Lbl>Loan Availability</Lbl>
            <ChipGroup options={['Yes','No','Not Sure']} value={form.loanAvailable} onChange={v => set('loanAvailable', v)} />
          </div>
          <div>
            <Lbl>Transaction Type</Lbl>
            <ChipGroup options={['New Booking','Resale']} value={form.transactionType} onChange={v => set('transactionType', v)} />
          </div>
          <div>
            <Lbl>Currently Under Loan</Lbl>
            <ChipGroup options={['Yes','No']} value={form.underLoan} onChange={v => set('underLoan', v)} />
          </div>
          <div>
            <Lbl>Number of Balconies</Lbl>
            <ChipGroup options={['0','1','2','3+']} value={form.balconies} onChange={v => set('balconies', v)} />
          </div>
          <div>
            <Lbl>Car Parking</Lbl>
            <ChipGroup options={['None','Covered','Open','Both']} value={form.parking} onChange={v => set('parking', v)} />
          </div>
        </>
      )}
      <div>
        <Lbl>Badge Text</Lbl>
        <input value={form.badge || ''} onChange={e => set('badge', e.target.value)}
          placeholder="e.g. New Launch, Hot Deal…" className={inputCls} />
      </div>
      <div>
        <Lbl>Assigned Agent</Lbl>
        <AdminDropdown
          value={form.agent?.id || ''}
          onChange={(val) => {
            const a = agents.find(a => a.id === val);
            set('agent', a ? { id: a.id, name: a.name, phone: a.phone } : {});
          }}
          options={[
            { value: '', label: 'Unassigned' },
            ...agents.filter(u => u.role === 'agent' && (u.isActive || u.id === form.agent?.id))
              .map(a => ({ value: a.id, label: `${a.name} (${a.email || a.phone || ''})` }))
          ]}
          placeholder="Select Agent"
        />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" id="featured-chk" checked={form.featured || false}
          onChange={e => set('featured', e.target.checked)}
          className="w-4 h-4 accent-yellow-500 cursor-pointer" />
        <label htmlFor="featured-chk" className="text-sm font-semibold text-gray-600 dark:text-white/60 cursor-pointer flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-yellow-500" /> Mark as Featured
        </label>
      </div>
      {form.additionalNotes !== undefined || true ? (
        <div>
          <Lbl>Additional Notes</Lbl>
          <textarea value={form.additionalNotes || ''} onChange={e => set('additionalNotes', e.target.value)}
            placeholder="Any other details…" rows={3} className={`${inputCls} resize-none`} />
        </div>
      ) : null}
    </div>
  );
}

// ─── PropertyForm (multi-step modal) ──────────────────────────────────────────
export function PropertyForm({ initial, onSave, onClose, masterData = {} }) {
  const isEdit = !!initial;
  const [agents, setAgents]     = useState([]);
  const [step, setStep]         = useState(0);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const [form, setForm] = useState(() => {
    if (!initial) return {
      title: '', category: 'Residential', adType: 'Resale',
      type: '', apartmentType: '', bhkType: '', ownershipType: '',
      area: '', carpetArea: '', floor: '', totalFloor: '', propertyAge: '',
      facing: '', floorType: '', furnishing: '', commercialPropertyType: '',
      buildingType: '', plotLength: '', plotWidth: '', boundaryWall: '',
      cornerPlot: '', floorsAllowed: '', gatedProject: '', villaType: '',
      plotArea: '', pgName: '', pgFood: '', pgGender: '', pgNotice: '',
      pgRooms: [], roomType: '', tenantType: '',
      city: 'Pune', location: '', society: '', flatNo: '', landmark: '',
      coordinates: { lat: '', lng: '' },
      price: '', priceLabel: '', pricePerSqft: '', maintenance: '',
      deposit: '', status: 'Ready to Move', availableFrom: '', preferredTenant: '',
      description: '', amenities: [], images: [],
      badge: '', featured: false, agent: {}, developer: '', rera: '',
      loanAvailable: '', transactionType: '', underLoan: '', balconies: '',
      parking: '', otherFeatures: [], additionalNotes: '',
    };
    const rawImages = Array.isArray(initial.images) ? initial.images : (initial.image ? [initial.image] : []);
    const images = rawImages.filter(Boolean);
    const rawAmenities = Array.isArray(initial.amenities) ? initial.amenities : [];
    const amenities = rawAmenities.map(a =>
      typeof a === 'string' ? a : (a?.name || a?.label || a?.value || '')
    ).filter(Boolean);
    const rawCoords = initial.coordinates && typeof initial.coordinates === 'object'
      ? initial.coordinates
      : {};
    return {
      ...initial,
      category: initial.category || initial.propertyType || 'Residential',
      adType: initial.adType || initial.listingType || 'Resale',
      images,
      coordinates: { lat: rawCoords.lat ?? '', lng: rawCoords.lng ?? '' },
      amenities,
      otherFeatures: Array.isArray(initial.otherFeatures) ? initial.otherFeatures : [],
      pgRooms: Array.isArray(initial.pgRooms) ? initial.pgRooms : [],
    };
  });

  useEffect(() => {
    getUsers().then(d => setAgents((d.users || []).filter(u => u.role !== 'client'))).catch(console.error);
  }, []);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const stepComponents = [
    <StepType form={form} set={set} isEdit={isEdit} />,
    <StepDetails form={form} set={set} />,
    <StepLocation form={form} set={set} masterData={masterData} />,
    <StepPricing form={form} set={set} />,
    <StepAmenities form={form} set={set} masterData={masterData} />,
    <StepGallery form={form} set={set} />,
    <StepExtra form={form} set={set} agents={agents} />,
  ];

  const handleSave = async () => {

    // Category and ad type are immutable while editing an existing user listing.
    // Resolve them from the original listing first so the save payload cannot change them.
    const lockedCategory = initial?.category || initial?.propertyType || form.category;
    const lockedAdType = initial?.adType || initial?.listingType || form.adType || 'Resale';
    const finalCategory = isEdit ? lockedCategory : form.category;
    const finalAdType = isEdit ? lockedAdType : (form.adType || 'Resale');

    // Resolve standard DB type based on category & subtype inputs to pass backend validations
    let resolvedType = form.type;
    if (!resolvedType) {
      if (finalCategory === 'Residential') {
        resolvedType = form.apartmentType || 'Apartment';
      } else if (finalCategory === 'Villa') {
        resolvedType = form.villaType || 'Villa';
      } else if (finalCategory === 'Commercial') {
        resolvedType = form.commercialPropertyType || 'Commercial';
      } else if (finalCategory === 'Plot') {
        resolvedType = 'Plot';
      } else {
        resolvedType = finalCategory;
      }
    }

    setError('');
    setLoading(true);
    try {
      const coverImage = form.images?.[0] || '';
      const cleanCoords = (form.coordinates?.lat !== '' && form.coordinates?.lng !== '')
        ? { lat: Number(form.coordinates.lat), lng: Number(form.coordinates.lng) }
        : undefined;
      // Admin/management property: directly verified, no approval needed
      await onSave({
        ...form,
        category: finalCategory,
        adType: finalAdType,
        type: resolvedType,
        listingType: finalAdType,           // map frontend adType to listingType
        propertyType: finalCategory,        // map frontend category to propertyType
        image: coverImage,
        price: Number(form.price) || 0,
        area: Number(form.area) || 0,
        amenities: (form.amenities || []).filter(Boolean),
        coordinates: cleanCoords,
        verified: true,
        status: form.status || 'Ready to Move',
        addedByAdmin: true,
      });
      onClose();
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const progressPct = ((step + 1) / ADMIN_STEPS.length) * 100;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="bg-white dark:bg-[#0E1A2B] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col border border-transparent dark:border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)' }}>
              <Building2 className="w-4 h-4 text-navy" />
            </div>
            <div>
              <h3 className="font-bold text-navy dark:text-white text-sm leading-none">
                {initial ? 'Edit Property' : 'Add New Property'}
              </h3>
              <p className="text-[10px] text-gray-400 dark:text-white/30 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-green-500" />
                Will be published immediately as verified
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
            <X className="w-4 h-4 text-gray-500 dark:text-white/50" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-white/10 shrink-0">
          <motion.div className="h-full rounded-r-full"
            style={{ background: 'linear-gradient(90deg, #B8860B, #C9940A)' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }} />
        </div>

        {/* Step tabs */}
        <div className="flex items-center gap-0 px-6 py-3 border-b border-gray-100 dark:border-white/10 overflow-x-auto no-scrollbar shrink-0">
          {ADMIN_STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            // When editing an existing property, every section is already
            // filled in — let admin jump straight to any tab instead of
            // forcing Next/Save-and-continue through each one in order.
            const jumpable = !!initial || done;
            return (
              <button key={s.id} type="button"
                onClick={() => jumpable && setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${
                  active  ? 'bg-gold/10 text-yellow-700 dark:text-yellow-400'
                  : jumpable ? 'text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer'
                  : 'text-gray-300 dark:text-white/20 cursor-default'
                }`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                  done   ? 'bg-green-500'
                  : active ? 'bg-gradient-to-br from-yellow-400 to-yellow-300'
                  : 'bg-gray-100 dark:bg-white/10'
                }`}>
                  {done
                    ? <Check className="w-2.5 h-2.5 text-white" />
                    : <Icon className={`w-2.5 h-2.5 ${active ? 'text-navy' : 'text-gray-300 dark:text-white/20'}`} />
                  }
                </div>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-bold text-navy dark:text-white text-base">{ADMIN_STEPS[step].label}</h4>
            <span className="text-[10px] font-bold text-gray-400 dark:text-white/30">Step {step + 1} of {ADMIN_STEPS.length}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}>
              {stepComponents[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-0 px-4 py-2 rounded-xl text-red-600 dark:text-red-400 text-xs shrink-0"
            style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
            {error}
          </div>
        )}

        {/* Footer nav */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-white/10 shrink-0">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 dark:text-white/50 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back
            </button>
          ) : (
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 dark:text-white/50 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              Cancel
            </button>
          )}
          {/* Editing an existing property: save is always one click away,
              no matter which tab admin is on — no need to step through
              every section again. */}
          {initial && step !== ADMIN_STEPS.length - 1 && (
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-navy disabled:opacity-50 border-2 transition-all"
              style={{ borderColor: '#B8860B', color: '#7A5C08' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Save Changes
            </button>
          )}
          <button
            type="button"
            onClick={step === ADMIN_STEPS.length - 1 ? handleSave : () => setStep(s => s + 1)}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-navy disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)' }}>
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
            ) : step === ADMIN_STEPS.length - 1 ? (
              <><ShieldCheck className="w-4 h-4" /> {initial ? 'Save Changes' : 'Publish Property'}</>
            ) : (
              <>{initial ? 'Next' : 'Save & Continue'} <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

// ─── Constants for table display ──────────────────────────────────────────────
const CITIES = ['Balewadi','Hadapsar','KP','NIBM Road','Viman Nagar','Kharadi','Punewadi','Kothrud','Karve Nagar','Shewalewadi Road','Baner','Pashan','Bawadhan','MG Road','JM Road','F.C. Road','Hinjewadi Phase I, II','Ravet','Ganga Dham Chownk','Swargate','Katraj','Prabhat Road','Bibwewadi','Bhekrai Nagar','Pimple Gurav','Pimple Saudagar','Dhayari','Kondhwa','Undri','Muhamad wadi','Handewadi','Wakad','Shivaji Nagar','Parvati Hill','Sukhsagar Nagar','Singhgad Road','Camp','Pimpri Gaon','Chinchwad Gaon','Bhosari','Nigdi','Bhugaon','Man','Sus','Malwadi','Warje','Fursungi','Wagholi','Manjari','Lohgaon','Vishrantwadi','Khadki','Nanded City'];
const PCMC_LOCALITIES = ['Pimpri Gaon','Chinchwad Gaon','Bhosari','Nigdi','Wakad','Ravet','Hinjewadi Phase I, II','Pimple Gurav','Pimple Saudagar','Bhugaon','Man','Sus','Malwadi'];
const getCityBucket = (location = '') => {
  const loc = location.toLowerCase();
  if (PCMC_LOCALITIES.some(p => loc.includes(p.toLowerCase()))) return 'PCMC';
  return 'Pune';
};

function FilterDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 h-11 rounded-2xl border border-gray-150 dark:border-white/10 bg-white dark:bg-[#0E1A2B] text-sm text-left focus:outline-none focus:border-gold/50 transition-colors">
        <span className={value && value !== 'all' ? 'text-navy dark:text-white' : 'text-gray-400 dark:text-white/25'}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div data-lenis-prevent
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-white/95 dark:bg-[#071A2F]/95 backdrop-blur-md border border-gray-150 dark:border-white/10 rounded-2xl shadow-xl z-50 py-1.5 no-scrollbar">
            {options.map(opt => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                  value === opt.value ? 'bg-gold/10 text-yellow-700 dark:text-yellow-400' : 'text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}>
                <span>{opt.label}</span>
                {value === opt.value && <span className="text-yellow-500 text-[10px]">●</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main PropertiesAdmin ──────────────────────────────────────────────────────
export default function PropertiesAdmin() {
  const { isMgmt, user } = useAdmin();
  const isAgent = user?.role === 'agent';
  const [properties, setProperties]           = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [showForm, setShowForm]               = useState(false);
  const [editing, setEditing]                 = useState(null);
  const [deleting, setDeleting]               = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deleteError, setDeleteError]         = useState('');
  const [masterData, setMasterData]           = useState({ locality: [], city: [], amenity: [], propertyType: [] });
  const [search, setSearch]                   = useState('');
  const [cityBucketFilter, setCityBucketFilter] = useState('all');
  const [localityFilter, setLocalityFilter]   = useState('all');
  const [statusFilter, setStatusFilter]       = useState('all');
  const [agentAssignTarget, setAgentAssignTarget] = useState(null); // property to assign agent
  const [agentsList, setAgentsList]           = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProperties({ limit: 100 });
      const sorted = (data.properties || []).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setProperties(sorted);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    load();
    fetchMasterData().then(d => { if (d) setMasterData(d); }).catch(console.error);
    getUsers({ role: 'agent' }).then(data => {
      setAgentsList(data?.users || data || []);
    }).catch(console.error);
  }, []);

  const handleCreate = async (body) => { await createProperty(body); await load(); };
  const handleUpdate = async (body) => { await updateProperty(editing._id, body); await load(); };
  const handleAgentAssign = async (propertyId, agent) => {
    const agentPayload = agent
      ? { id: agent.id || agent._id, name: agent.name, phone: agent.phone || '' }
      : {};
    await updateProperty(propertyId, { agent: agentPayload });
    await load();
  };
  const handleDelete = async () => {
    if (!propertyToDelete) return;
    const id = propertyToDelete._id;
    setDeleting(id); setDeleteError('');
    try {
      await deleteProperty(id);
      await load();
      setPropertyToDelete(null); setDeleteError('');
    } catch (e) {
      setDeleteError(e.message || 'Failed to delete property');
    } finally { setDeleting(null); }
  };

  const localitiesForBucket = cityBucketFilter === 'all'
    ? [...CITIES].sort()
    : [...CITIES].filter(loc => getCityBucket(loc) === cityBucketFilter).sort();

  const statuses = Array.from(new Set(properties.map(p => p.status).filter(Boolean)));

  const getPropertyLocality = (p) => {
    const found = CITIES.find(c => p.location?.toLowerCase().includes(c.toLowerCase()));
    return found || p.location || p.city || 'Pune';
  };

  const filtered = properties.filter(p => {
    const matchesSearch   = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.location?.toLowerCase().includes(search.toLowerCase());
    const matchesCity     = cityBucketFilter === 'all' || getCityBucket(p.location) === cityBucketFilter;
    const matchesLocality = localityFilter === 'all' || p.location?.toLowerCase().includes(localityFilter.toLowerCase());
    const matchesStatus   = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCity && matchesLocality && matchesStatus;
  });

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-navy dark:text-white mb-0.5" style={{ fontFamily: 'Plus Jakarta Sans,sans-serif' }}>Properties</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm">{properties.length} active listings</p>
        </div>
        {isMgmt && (
          <button onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-navy hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer shadow-md shadow-gold/15"
            style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)' }}>
            <Plus className="w-4 h-4" /> Add Property
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3.5 mb-6">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search properties by title or locality..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-2xl border border-gray-150 dark:border-white/10 bg-white dark:bg-[#0E1A2B] text-sm text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors shadow-sm" />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25">
            <Search className="w-4 h-4" />
          </span>
        </div>
        <div className="w-full sm:w-36">
          <FilterDropdown value={cityBucketFilter}
            onChange={v => { setCityBucketFilter(v); setLocalityFilter('all'); }}
            options={[{ value: 'all', label: 'All Cities' }, { value: 'Pune', label: 'Pune' }, { value: 'PCMC', label: 'PCMC' }]}
            placeholder="All Cities" />
        </div>
        <div className="w-full sm:w-48">
          <FilterDropdown value={localityFilter} onChange={setLocalityFilter}
            options={[{ value: 'all', label: 'All Localities' }, ...localitiesForBucket.map(l => ({ value: l, label: l }))]}
            placeholder="All Localities" />
        </div>
        <div className="w-full sm:w-48">
          <FilterDropdown value={statusFilter} onChange={setStatusFilter}
            options={[{ value: 'all', label: 'All Statuses' }, ...statuses.map(s => ({ value: s, label: s }))]}
            placeholder="All Statuses" />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-4"><SkeletonTable rows={5} cols={5} /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0E1A2B] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm">
          <Building2 className="w-12 h-12 text-gray-200 dark:text-white/15 mx-auto mb-3" />
          <p className="text-gray-400 dark:text-white/35 mb-4 text-sm">No properties match search query</p>
          {isMgmt && (
            <button onClick={() => setShowForm(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-navy"
              style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)' }}>
              Add Property
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0E1A2B] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
          {/* Mobile cards */}
          <div className="block lg:hidden space-y-4 p-4">
            {filtered.map(p => (
              <div key={p._id} className="p-4 rounded-2xl bg-white dark:bg-navy-light border border-gray-100 dark:border-white/5 flex flex-col gap-3 shadow-card">
                <div className="flex gap-3">
                  {(p.image || p.images?.[0]) ? (
                    <img src={p.image || p.images?.[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gold/15" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-gray-400 dark:text-white/30" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40">{p.type || p.category}</span>
                      {p.featured && <span className="flex items-center gap-0.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/10"><Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500 shrink-0" />Featured</span>}
                      <SourceBadge addedBy={p.addedBy} />
                    </div>
                    <h4 className="font-bold text-navy dark:text-white text-sm line-clamp-1">{p.title}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-white/30 truncate">{getPropertyLocality(p)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-b border-gray-100 dark:border-white/5">
                  <span className="font-black text-navy dark:text-white text-sm">{p.priceLabel || `₹${(p.price / 10000000).toFixed(1)}Cr`}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${p.status === 'Ready to Move' ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : p.status === 'Under Construction' ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/50'}`}>{p.status}</span>
                </div>
                {isMgmt && (
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setEditing(p); setShowForm(true); }} className="p-1.5 rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setPropertyToDelete(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/[0.01] border-b border-gray-100 dark:border-white/10 text-[10px] font-extrabold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Property</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Locality</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Featured</th>
                  <th className="px-6 py-3.5">Added By</th>
                  {!isAgent && <th className="px-6 py-3.5">Agent</th>}
                  {isMgmt && <th className="px-6 py-3.5">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {filtered.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(p.image || p.images?.[0]) ? (
                          <img src={p.image || p.images?.[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gold/15" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-gray-400 dark:text-white/30" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-navy dark:text-white text-sm truncate max-w-[200px] group-hover:text-gold transition-colors">{p.title}</p>
                          <p className="text-[10px] text-gray-400 dark:text-white/30 truncate max-w-[200px] mt-0.5">{p.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40">{p.type || p.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-655 dark:text-white/55 font-bold">{getPropertyLocality(p)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-black text-navy dark:text-white text-xs">{p.priceLabel || `₹${(p.price / 10000000).toFixed(1)}Cr`}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${p.status === 'Ready to Move' ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : p.status === 'Under Construction' ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/50'}`}>{p.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.featured ? (
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/10">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 shrink-0" />Featured
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-gray-400 dark:text-white/20 pl-2">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><SourceBadge addedBy={p.addedBy} /></td>
                    {!isAgent && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 group/agent">
                          {p.agent?.name ? (
                            <>
                              <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/15">
                                <span className="text-[10px] font-black text-gold">{p.agent.name.charAt(0).toUpperCase()}</span>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-navy dark:text-white leading-none">{p.agent.name}</p>
                                <p className="text-[9px] text-gray-400 dark:text-white/30 mt-0.5">{p.agent.phone}</p>
                              </div>
                            </>
                          ) : (
                            <span className="text-[10px] text-gray-400 dark:text-white/20 italic">Unassigned</span>
                          )}
                          {isMgmt && (
                            <button
                              onClick={() => setAgentAssignTarget(p)}
                              title="Assign Agent"
                              className="ml-1 p-1.5 rounded-lg text-gray-300 dark:text-white/20 hover:text-gold hover:bg-gold/10 opacity-0 group-hover/agent:opacity-100 active:scale-95 transition-all cursor-pointer shrink-0">
                              <Pencil className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                    {isMgmt && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditing(p); setShowForm(true); }}
                            className="p-2 rounded-xl text-gray-400 hover:text-gold hover:bg-gold/10 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setPropertyToDelete(p)}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <PropertyForm
          initial={editing}
          onSave={editing ? handleUpdate : handleCreate}
          onClose={() => { setShowForm(false); setEditing(null); }}
          masterData={masterData}
        />
      )}

      <AnimatePresence>
        {agentAssignTarget && (
          <AgentAssignModal
            property={agentAssignTarget}
            agents={agentsList}
            onClose={() => setAgentAssignTarget(null)}
            onSave={handleAgentAssign}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      {createPortal(
        <AnimatePresence>
          {propertyToDelete && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-[#071A2F] border border-gray-150 dark:border-white/10 shadow-luxury">
                <h3 className="font-display font-black text-navy dark:text-white text-base mb-2">Remove Property?</h3>
                <p className="text-xs text-ink-muted dark:text-white/60 leading-relaxed mb-4">
                  Are you sure you want to remove <span className="font-bold text-navy dark:text-white">{propertyToDelete.title}</span>? This will permanently delete the listing.
                </p>
                {deleteError && (
                  <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">{deleteError}</div>
                )}
                <div className="flex gap-3.5 justify-end">
                  <button type="button" onClick={() => { setPropertyToDelete(null); setDeleteError(''); }}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-navy dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button type="button" onClick={handleDelete} disabled={deleting === propertyToDelete._id}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-xs font-extrabold text-white transition-all cursor-pointer shadow-lg shadow-red-600/30 disabled:opacity-60 flex items-center gap-1.5">
                    {deleting === propertyToDelete._id ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Deleting…</> : <><Trash2 className="w-3.5 h-3.5" /> Delete Property</>}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
