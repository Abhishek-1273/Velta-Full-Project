import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useSiteSettings, getLogoInitials, renderBrandLogo } from '../../contexts/SettingsContext';

import { updateSettingsAdmin, uploadImage } from '../../utils/adminApi';
import { Loader2, Save, Globe, Eye, Image, PhoneCall, Share2, TrendingUp, Upload, Trash2 } from 'lucide-react';

const inputCls = "w-full px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500/50 transition-colors";
const labelCls = "block text-[11px] font-bold text-gray-400 dark:text-white/35 uppercase tracking-wider mb-1.5";

export default function SettingsAdmin() {
  const { settings, refreshSettings } = useSiteSettings();
  const [form, setForm] = useState({ ...settings });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');
  const [deleteMediaConfirm, setDeleteMediaConfirm] = useState(null);

  // Cropper states
  const [cropSrc, setCropSrc] = useState(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cropImgRef = useRef(null);
  const [cropFileName, setCropFileName] = useState('');

  // Keep form in sync when context loads settings
  // Preserve local logoIconImage if it was just uploaded but not yet reflected in context
  useEffect(() => {
    if (settings) {
      setForm(prev => ({
        ...settings,
        logoIconImage: prev.logoIconImage || settings.logoIconImage,
      }));
    }
  }, [settings]);

  const handleChange = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const handleNestedChange = (parentKey, key, val) => {
    setForm(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [key]: val
      }
    }));
  };



  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCropFileName(file.name);
    setCropZoom(1);
    setCropPos({ x: 0, y: 0 });

    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset file input
  };

  const closeCropper = () => {
    setCropSrc(null);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropPos.x, y: e.clientY - cropPos.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setCropPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const executeCrop = async () => {
    const img = cropImgRef.current;
    if (!img) return;

    setUploading(true);
    setError('');

    try {
      const canvas = document.createElement('canvas');
      const size = 500;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context');

      // Clear with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Math for displaying image coordinates exactly as seen in 240x240 frame
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      const ratio = Math.min(240 / naturalW, 240 / naturalH);
      const fitW = naturalW * ratio;
      const fitH = naturalH * ratio;

      const initialX = (240 - fitW) / 2;
      const initialY = (240 - fitH) / 2;

      const displayLeft = initialX + cropPos.x - (fitW * (cropZoom - 1)) / 2;
      const displayTop = initialY + cropPos.y - (fitH * (cropZoom - 1)) / 2;
      const displayWidth = fitW * cropZoom;
      const displayHeight = fitH * cropZoom;

      const scale = size / 240;
      const canvasLeft = displayLeft * scale;
      const canvasTop = displayTop * scale;
      const canvasWidth = displayWidth * scale;
      const canvasHeight = displayHeight * scale;

      ctx.drawImage(img, canvasLeft, canvasTop, canvasWidth, canvasHeight);

      let fileType = 'image/jpeg';
      if (cropFileName.toLowerCase().endsWith('.png')) {
        fileType = 'image/png';
      }

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, fileType, 0.95));
      if (!blob) throw new Error('Canvas conversion failed');

      const croppedFile = new File([blob], cropFileName, { type: fileType });

      const url = await uploadImage(croppedFile);

      // Update local form state with new logo URL
      const updatedForm = { ...form, logoIconImage: url };
      handleChange('logoIconImage', url);
      setCropSrc(null);

      // Auto-save to server so logo persists immediately
      await updateSettingsAdmin(updatedForm);
      await refreshSettings();

      setSuccess('Logo icon cropped, uploaded and saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Crop/Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateSettingsAdmin(form);
      await refreshSettings();
      setSuccess('Website settings updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'branding', label: 'Branding & Logo', Icon: Globe },
    { id: 'hero', label: 'Hero Section', Icon: Image },
    { id: 'contact', label: 'Contact Details', Icon: PhoneCall },
    { id: 'heroStats', label: 'Hero Stats Bar', Icon: TrendingUp },
    { id: 'socials', label: 'Social Networks', Icon: Share2 },
  ];

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-black text-navy dark:text-white">Website Settings</h1>
        <p className="text-sm text-ink-muted dark:text-white/50">Control global website parameters including logo, titles, backgrounds, and contacts.</p>
      </div>

      {/* Message Banners */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Tabs Menu */}
      <div className="flex gap-1 sm:gap-2 border-b border-gray-200 dark:border-white/10 pb-px overflow-x-auto no-scrollbar whitespace-nowrap w-full">
        {tabs.map(t => {
          const ActiveIcon = t.Icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-px shrink-0 cursor-pointer ${
                isActive
                  ? 'border-gold text-gold dark:text-gold font-extrabold'
                  : 'border-transparent text-gray-400 dark:text-white/40 hover:text-navy dark:hover:text-white'
              }`}
            >
              <ActiveIcon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Preview Panel — placed at top on mobile, right column on desktop */}
        <div className="order-first lg:order-last lg:col-span-1 space-y-6">
          <div className="p-5 md:p-6 rounded-3xl bg-white dark:bg-[#071A2F] text-navy dark:text-white border border-gray-150 dark:border-white/10 shadow-card transition-colors duration-300 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gold uppercase">
                <Eye className="w-3.5 h-3.5" /> Brand Preview
              </div>
              <span className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider">
                Live Theme Mode
              </span>
            </div>
            
            {/* Logo Preview */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 flex items-center gap-3 transition-colors">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #C9A050 0%, #ECD7AA 50%, #C69D59 100%)' }}
              >
                {form.logoIconImage ? (
                  <img src={form.logoIconImage} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-navy font-display font-black text-sm">{getLogoInitials(form)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-sm tracking-tight leading-snug text-navy dark:text-white">
                  {renderBrandLogo(form, '#B8860B')}
                </p>

              </div>

            </div>

            {/* Hero Text Preview */}
            <div className="rounded-2xl border border-dashed border-gold/30 bg-amber-50/40 dark:bg-amber-500/5 p-5 space-y-2">
              <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-3">Hero Preview</p>
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-amber-400/40 rounded-full" />
                <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-amber-500 truncate">
                  {form.heroEyebrow || "Pune & PCMC's Trusted Property Platform"}
                </p>
                <span className="h-px w-5 bg-amber-400/40 rounded-full" />
              </div>
              <p className="font-black text-navy dark:text-white text-sm leading-snug">
                {form.heroHeadline || 'Find a Place Worth Calling'}{' '}
                <span className="text-amber-500">{form.heroHeadlineGold || 'Yours'}</span>
              </p>
              <p className="text-[10px] text-gray-400 dark:text-white/40 leading-relaxed">
                {form.heroSubtitle || 'Buy, Rent or Manage Property with Complete Trust & Transparency'}
              </p>
            </div>

            {/* Contact info Preview */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 space-y-2 text-xs transition-colors">
              <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-2">Footer Details</p>
              <p className="text-navy/70 dark:text-white/60 truncate"><strong>Phone:</strong> {form.contactPhone1}</p>
              <p className="text-navy/70 dark:text-white/60 truncate"><strong>Email:</strong> {form.contactEmail1}</p>
              <p className="text-navy/70 dark:text-white/60 text-wrap leading-relaxed"><strong>Address:</strong> {form.contactAddress}</p>
            </div>

            {/* Hero Stats Preview */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 space-y-2 transition-colors">
              <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-3">Stats Bar Preview</p>
              {(form.heroStats?.length === 4 ? form.heroStats : [
                { value: 'Trusted by 10,000+', label: 'Happy Customers'   },
                { value: '5,000+',             label: 'Properties Listed' },
                { value: '4.8/5',              label: 'Customer Rating'   },
                { value: 'Pune & PCMC',        label: 'Wide Coverage'     },
              ]).map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-1 border-b border-gray-100 dark:border-white/5 last:border-0">
                  <div
                    className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(201,162,39,0.12)' }}
                  >
                    <span className="text-[8px] font-black" style={{ color: '#A67A08' }}>{i + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-navy dark:text-white leading-tight truncate">
                      {s.value || '—'}
                    </p>
                    <p className="text-[9px] text-gray-400 dark:text-white/40 truncate">
                      {s.label || '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="order-last lg:order-first lg:col-span-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-navy border border-gray-100 dark:border-white/10 shadow-card space-y-6">

            
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg">Website Branding & Logo</h3>
                
                <div>
                  <label className={labelCls}>Logo Icon Image</label>
                  {form.logoIconImage ? (
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-navy border border-gray-200 dark:border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                          <img src={form.logoIconImage} alt="Uploaded logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-navy dark:text-white leading-tight">Custom Logo Active</p>
                          <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">Will display in header & footer</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-gray-200/60 dark:border-white/10">
                        <label className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gold/10 hover:bg-gold/20 text-gold text-xs font-bold transition-all cursor-pointer border border-gold/20">
                          <Upload className="w-3.5 h-3.5" /> Change Image
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploading} />
                        </label>
                        <button
                          type="button"
                          onClick={() => setDeleteMediaConfirm({ key: 'logoIconImage', title: 'Logo Icon Image' })}
                          className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Remove logo image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border-2 border-dashed border-gray-200 dark:border-white/15 hover:border-gold dark:hover:border-gold transition-all cursor-pointer text-center">
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploading} />
                      {uploading ? (
                        <div className="flex items-center gap-2 text-gold font-bold text-xs">
                          <Loader2 className="w-5 h-5 animate-spin" /> Uploading Logo Image...
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-bold text-navy dark:text-white">Click to Upload Logo Image</p>
                          <p className="text-[10px] text-gray-400 dark:text-white/40 mt-0.5">PNG, JPG, SVG, WebP up to 5MB</p>
                        </>
                      )}
                    </label>
                  )}
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Primary Logo Brand Name</label>
                    <input
                      type="text"
                      value={form.logoTextPrimary || ''}
                      onChange={(e) => handleChange('logoTextPrimary', e.target.value)}
                      placeholder="e.g. Hyper"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Secondary Logo Brand Name (Colored)</label>
                    <input
                      type="text"
                      value={form.logoTextSecondary || ''}
                      onChange={(e) => handleChange('logoTextSecondary', e.target.value)}
                      placeholder="e.g. Relestix"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className={labelCls}>Custom Favicon Image URL</label>
                    <input
                      type="text"
                      value={form.logoFaviconUrl || ''}
                      onChange={(e) => handleChange('logoFaviconUrl', e.target.value)}
                      placeholder="https://.../favicon.ico"
                      className={inputCls}
                    />
                    <p className="text-gray-400 text-[10px] mt-1">If blank, defaults to cropped logo icon.</p>
                  </div>
                  <div>
                    <label className={labelCls}>Meta Title Suffix (Browser Tab Title)</label>
                    <input
                      type="text"
                      value={form.metaTitleSuffix || ''}
                      onChange={(e) => handleChange('metaTitleSuffix', e.target.value)}
                      placeholder="Luxury Real Estate Pune | Premium Villas & Penthouses"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Global Meta Description</label>
                  <textarea
                    rows={3}
                    value={form.metaDescription || ''}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    placeholder="Describe your agency for SEO and Google search result snippets..."
                    className={inputCls}
                  />
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg">Hero Section Text</h3>

                <div>
                  <label className={labelCls}>Eyebrow Text (top small line)</label>
                  <input
                    type="text"
                    value={form.heroEyebrow || ''}
                    onChange={(e) => handleChange('heroEyebrow', e.target.value)}
                    placeholder="Pune & PCMC's Trusted Property Platform"
                    className={inputCls}
                  />
                  <p className="text-[10px] text-gray-400 dark:text-white/30 mt-1">Small uppercase text above the main headline.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Headline (normal text)</label>
                    <input
                      type="text"
                      value={form.heroHeadline || ''}
                      onChange={(e) => handleChange('heroHeadline', e.target.value)}
                      placeholder="Find a Place Worth Calling"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Headline Gold Word</label>
                    <input
                      type="text"
                      value={form.heroHeadlineGold || ''}
                      onChange={(e) => handleChange('heroHeadlineGold', e.target.value)}
                      placeholder="Yours"
                      className={inputCls}
                    />
                    <p className="text-[10px] text-gray-400 dark:text-white/30 mt-1">This word appears in gold gradient after the headline.</p>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={form.heroSubtitle || ''}
                    onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                    placeholder="Buy, Rent or Manage Property with Complete Trust & Transparency"
                    className={inputCls}
                  />
                  <p className="text-[10px] text-gray-400 dark:text-white/30 mt-1">One-line description shown below the headline.</p>
                </div>

                {/* Live mini preview */}
                <div className="p-5 rounded-2xl border border-dashed border-gold/30 bg-amber-50/40 dark:bg-amber-500/5 space-y-2">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-3">Live Preview</p>
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-amber-400/40 rounded-full" />
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-amber-500">
                      {form.heroEyebrow || "Pune & PCMC's Trusted Property Platform"}
                    </p>
                    <span className="h-px w-8 bg-amber-400/40 rounded-full" />
                  </div>
                  <p className="font-black text-navy dark:text-white text-base leading-snug">
                    {form.heroHeadline || 'Find a Place Worth Calling'}{' '}
                    <span className="text-amber-500">{form.heroHeadlineGold || 'Yours'}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-white/40">
                    {form.heroSubtitle || 'Buy, Rent or Manage Property with Complete Trust & Transparency'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg">Contact Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Phone Line 1</label>
                    <input
                      type="text"
                      value={form.contactPhone1 || ''}
                      onChange={(e) => handleChange('contactPhone1', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={form.contactPhone2 || ''}
                      onChange={(e) => handleChange('contactPhone2', e.target.value)}
                      placeholder="+91 98765 43211"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-1">
                    <label className={labelCls}>Main Contact Email</label>
                    <input
                      type="email"
                      value={form.contactEmail1 || ''}
                      onChange={(e) => handleChange('contactEmail1', e.target.value)}
                      placeholder="hello@company.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className={labelCls}>Secondary Email</label>
                    <input
                      type="email"
                      value={form.contactEmail2 || ''}
                      onChange={(e) => handleChange('contactEmail2', e.target.value)}
                      placeholder="careers@company.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className={labelCls}>WhatsApp Mobile Number</label>
                    <input
                      type="text"
                      value={form.contactWhatsApp || ''}
                      onChange={(e) => handleChange('contactWhatsApp', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Office Address</label>
                  <input
                    type="text"
                    value={form.contactAddress || ''}
                    onChange={(e) => handleChange('contactAddress', e.target.value)}
                    placeholder="Full headquarters address"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Office Hours (Weekdays)</label>
                    <input
                      type="text"
                      value={form.contactOfficeHoursWeekdays || ''}
                      onChange={(e) => handleChange('contactOfficeHoursWeekdays', e.target.value)}
                      placeholder="e.g. Mon-Sat: 9:00 AM - 7:00 PM"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Office Hours (Sunday)</label>
                    <input
                      type="text"
                      value={form.contactOfficeHoursSunday || ''}
                      onChange={(e) => handleChange('contactOfficeHoursSunday', e.target.value)}
                      placeholder="e.g. Sunday: 10:00 AM - 4:00 PM"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'heroStats' && (
              <div className="space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg">Hero Stats Bar</h3>
                <p className="text-xs text-gray-400 dark:text-white/40">4 stats shown below the hero section. Edit the value and label for each.</p>

                {[
                  { key: 0, defaultVal: 'Trusted by 10,000+', defaultLabel: 'Happy Customers' },
                  { key: 1, defaultVal: '5,000+',              defaultLabel: 'Properties Listed' },
                  { key: 2, defaultVal: '4.8/5',               defaultLabel: 'Customer Rating' },
                  { key: 3, defaultVal: 'Pune & PCMC',         defaultLabel: 'Wide Coverage' },
                ].map(({ key, defaultVal, defaultLabel }) => {
                  const stat = form.heroStats?.[key] || {};
                  const updateStat = (field, val) => {
                    const arr = form.heroStats ? [...form.heroStats] : [
                      { value: 'Trusted by 10,000+', label: 'Happy Customers' },
                      { value: '5,000+',              label: 'Properties Listed' },
                      { value: '4.8/5',               label: 'Customer Rating' },
                      { value: 'Pune & PCMC',         label: 'Wide Coverage' },
                    ];
                    arr[key] = { ...arr[key], [field]: val };
                    handleChange('heroStats', arr);
                  };
                  return (
                    <div key={key} className="p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] space-y-3">
                      <p className="text-[10px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Stat {key + 1}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Value</label>
                          <input
                            type="text"
                            value={stat.value || ''}
                            onChange={(e) => updateStat('value', e.target.value)}
                            placeholder={defaultVal}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => updateStat('label', e.target.value)}
                            placeholder={defaultLabel}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}


            {activeTab === 'socials' && (
              <div className="space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg">Social Media Links</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Instagram Profile URL</label>
                    <input
                      type="text"
                      value={form.socials?.instagram || ''}
                      onChange={(e) => handleNestedChange('socials', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>LinkedIn Page URL</label>
                    <input
                      type="text"
                      value={form.socials?.linkedin || ''}
                      onChange={(e) => handleNestedChange('socials', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/..."
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Facebook Page URL</label>
                    <input
                      type="text"
                      value={form.socials?.facebook || ''}
                      onChange={(e) => handleNestedChange('socials', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Twitter / X URL</label>
                    <input
                      type="text"
                      value={form.socials?.twitter || ''}
                      onChange={(e) => handleNestedChange('socials', 'twitter', e.target.value)}
                      placeholder="https://x.com/..."
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>YouTube Channel URL</label>
                    <input
                      type="text"
                      value={form.socials?.youtube || ''}
                      onChange={(e) => handleNestedChange('socials', 'youtube', e.target.value)}
                      placeholder="https://youtube.com/@..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>WhatsApp Channel / Direct Link</label>
                    <input
                      type="text"
                      value={form.socials?.whatsapp || ''}
                      onChange={(e) => handleNestedChange('socials', 'whatsapp', e.target.value)}
                      placeholder="https://wa.me/919876543210"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            )}


            <div className="flex justify-end pt-4 border-t border-gray-150 dark:border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy font-extrabold text-xs py-3.5 px-6 rounded-xl transition-all duration-200 hover:brightness-105 active:scale-95 disabled:opacity-60 cursor-pointer shadow-luxury"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Website Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Adjust Logo Crop Modal */}
      {cropSrc && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
          <div className="bg-[#0D1527] border border-white/10 rounded-[2rem] w-full max-w-sm p-6 text-white space-y-6 shadow-luxury">
            <div className="text-center">
              <h3 className="font-display font-bold text-base text-white">Adjust Logo Crop</h3>
              <p className="text-[11px] text-white/50 mt-1">Drag the logo inside the gold box, and use the slider to zoom.</p>
            </div>

            {/* Viewport Box */}
            <div className="flex justify-center">
              <div 
                className="w-60 h-60 relative overflow-hidden rounded-3xl border-2 border-gold bg-black/40 flex items-center justify-center select-none cursor-move touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <img
                  ref={cropImgRef}
                  src={cropSrc}
                  alt="Crop preview"
                  style={{
                    transform: `translate(${cropPos.x}px, ${cropPos.y}px) scale(${cropZoom})`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            {/* Zoom Control */}
            <div className="space-y-2 px-1">
              <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase tracking-wider">
                <span>Zoom Scale</span>
                <span>{Math.round(cropZoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={cropZoom}
                onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                className="w-full accent-gold bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeCropper}
                className="flex-1 py-3 text-xs font-bold rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeCrop}
                disabled={uploading}
                className="flex-1 py-3 text-xs font-bold rounded-xl bg-gradient-to-r from-gold to-gold-light text-navy font-extrabold hover:brightness-105 transition-all shadow-luxury flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                  </>
                ) : (
                  'Apply Crop'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Media Confirmation Modal */}
      {createPortal(
        <AnimatePresence>
          {deleteMediaConfirm && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeleteMediaConfirm(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="relative w-full max-w-md bg-white dark:bg-[#0E1A2B] rounded-3xl shadow-luxury p-6 border border-gray-100 dark:border-white/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-navy dark:text-white text-lg mb-2">
                  Remove {deleteMediaConfirm.title}?
                </h3>
                <p className="text-sm text-ink-muted dark:text-white/60 leading-relaxed">
                  Are you sure you want to remove the <strong>{deleteMediaConfirm.title}</strong>? Once saved, the site will revert to default text/fallback branding.
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setDeleteMediaConfirm(null)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleChange(deleteMediaConfirm.key, '');
                      setDeleteMediaConfirm(null);
                      setSuccess(`${deleteMediaConfirm.title} removed.`);
                      setTimeout(() => setSuccess(''), 3000);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-extrabold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Confirm Remove
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
