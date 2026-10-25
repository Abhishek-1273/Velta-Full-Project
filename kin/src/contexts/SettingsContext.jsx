import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URL } from '../config/api';

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  logoIconText: 'Kin',
  logoIconImage: '',
  logoFaviconUrl: '',
  logoTextPrimary: 'Hyper',
  logoTextSecondary: 'Relestix',
  logoSubtitle: 'Luxury Real Estate · Pune',
  metaTitleSuffix: 'Luxury Real Estate Pune | Premium Villas & Penthouses',
  metaDescription: 'Premier luxury real estate platform specializing in premium villas, penthouses and apartments in Koregaon Park, Baner, Kharadi, Kalyani Nagar and Wakad.',

  // Hero Section
  heroEyebrow: "Pune & PCMC's Trusted Property Platform",
  heroHeadline: 'Find a Place Worth Calling',
  heroHeadlineGold: 'Yours',
  heroSubtitle: 'Buy, Rent or Manage Property with Complete Trust & Transparency',
  heroTagline: "Pune's Premier NRI Property Platform",
  heroTitleLine1: "Pune's Finest",
  heroTitleLine2Highlight: "Luxury Homes",
  heroTitleLine3: "For NRIs",
  heroDescription: "Pune's premier luxury real estate agency, specializing in helping NRI clients find elite properties and handle secure investments entirely remotely.",
  heroVideoUrl: 'https://res.cloudinary.com/dzb2hbq9e/video/upload/q_auto,f_webm/v1783787480/bg2_ijjnna.webm',
  heroMobileImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',

  // Contact
  contactPhone1: '+91 9527046577',
  contactPhone2: '+91 7498366577',
  contactEmail1: 'hello@hyperrelestix.in',
  contactEmail2: 'careers@hyperrelestix.in',
  contactAddress: 'Level 12, Panchshil Tech Park, Yerwada, Pune 411006',
  contactOfficeHoursWeekdays: 'Mon–Sat: 9:00 AM – 7:00 PM',
  contactOfficeHoursSunday: 'Sunday: 10:00 AM – 4:00 PM',
  contactWhatsApp: '+91 98765 43210',

  // Hero Stats Bar
  heroStats: [
    { value: 'Trusted by 10,000+', label: 'Happy Customers'   },
    { value: '5,000+',             label: 'Properties Listed' },
    { value: '4.8/5',              label: 'Customer Rating'   },
    { value: 'Pune & PCMC',        label: 'Wide Coverage'     },
  ],

  // Stats Strip
  stats: {
    experience: 12,
    propertiesSold: 1500,
    happyClients: 98,
    dealsClosed: 350
  },

  // Socials
  socials: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
    youtube: '#',
    whatsapp: '#'
  }
};

export function getLogoInitials(settings) {
  if (settings?.logoIconText?.trim()) return settings.logoIconText.trim();
  const p = (settings?.logoTextPrimary || 'HR').trim();
  const s = (settings?.logoTextSecondary || '').trim();
  const pChar = p ? p[0].toUpperCase() : '';
  const sChar = s ? s[0].toUpperCase() : '';
  return `${pChar}${sChar}` || 'HR';
}

export function getBrandName(settings) {
  if (!settings) return 'HyperRelestix';
  const p = settings.logoTextPrimary !== undefined ? settings.logoTextPrimary : 'Hyper';
  const s = settings.logoTextSecondary !== undefined ? settings.logoTextSecondary : 'Relestix';
  if (!p && !s) return 'HyperRelestix';
  if (!p) return s;
  if (!s) return p;
  const needsSpace = !p.endsWith(' ') && !s.startsWith(' ');
  return `${p}${needsSpace ? ' ' : ''}${s}`;
}

export function renderBrandLogo(settings, secondaryColor = '#D4AF37') {
  const p = settings?.logoTextPrimary !== undefined ? settings.logoTextPrimary : 'Hyper';
  const s = settings?.logoTextSecondary !== undefined ? settings.logoTextSecondary : 'Relestix';
  const needsSpace = p && s && !p.endsWith(' ') && !s.startsWith(' ');

  return (
    <>
      <span className="whitespace-pre">{p}</span>
      {s && (
        <span style={{ color: secondaryColor }} className="whitespace-pre">
          {needsSpace ? ' ' : ''}{s}
        </span>
      )}
    </>
  );
}

export const SettingsProvider = ({ children }) => {
  // Use the last known favicon immediately so the browser does not wait for
  // the settings API on repeat visits. Server settings still remain the source
  // of truth and overwrite the cached value as soon as they arrive.
  const [settings, setSettings] = useState(() => {
    try {
      const cachedFavicon = localStorage.getItem('site_favicon_url');
      return cachedFavicon
        ? { ...DEFAULT_SETTINGS, logoFaviconUrl: cachedFavicon }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });
  const [loading, setLoading] = useState(true);

  // Dynamic Head Updating — keep favicon URL stable so the browser can cache it.
  useEffect(() => {
    if (!settings) return;
    const brandName = getBrandName(settings);
    const suffix = settings.metaTitleSuffix || settings.logoSubtitle || 'Luxury Real Estate';

    document.title = `${brandName} — ${suffix}`;

    const faviconUrl = settings.logoFaviconUrl || settings.logoIconImage;
    if (faviconUrl) {
      let faviconLink = document.querySelector("link[rel~='icon']");
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(faviconLink);
      }
      faviconLink.href = faviconUrl;
      try { localStorage.setItem('site_favicon_url', faviconUrl); } catch {}
    }

    if (settings.metaDescription) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.getElementsByTagName('head')[0].appendChild(metaDesc);
      }
      metaDesc.content = settings.metaDescription;
    }

    let ogSiteName = document.querySelector("meta[property='og:site_name']");
    if (ogSiteName) ogSiteName.content = brandName;

    let ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.content = `${brandName} — ${suffix}`;
  }, [settings]);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings?_t=${Date.now()}`);
      const data = await res.json();
      if (res.ok && data.success && data.settings) {
        const merged = {
          ...DEFAULT_SETTINGS,
          ...data.settings,
          // Arrays need explicit override — spread won't deep-merge them
          heroStats: Array.isArray(data.settings.heroStats) && data.settings.heroStats.length === 4
            ? data.settings.heroStats
            : DEFAULT_SETTINGS.heroStats,
          // Nested objects need explicit merge so missing keys get defaults
          stats: {
            ...DEFAULT_SETTINGS.stats,
            ...(data.settings.stats || {}),
          },
          socials: {
            ...DEFAULT_SETTINGS.socials,
            ...(data.settings.socials || {}),
          },
        };
        setSettings(merged);
      }
    } catch (err) {
      console.error('Failed to fetch site settings, using defaults.', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const refreshSettings = useCallback(() => {
    return fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSiteSettings must be used within SettingsProvider');
  }
  return ctx;
};
