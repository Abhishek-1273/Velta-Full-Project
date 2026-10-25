import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa6';
import { useAuth, useSiteSettings, getLogoInitials, getBrandName, renderBrandLogo } from '../../contexts';

import KineticGrid from '../common/KineticGrid';

// Gated paths that require auth
const gatedPaths = ['/services/buy', '/services/sell', '/services/rent', '/services/management'];

// ─── Column definitions ───────────────────────────────────────────────────────

const companyLinks = [
  { label: 'My Shortlist',  to: '/wishlist' },
  { label: 'Blog',          to: '/blog' },
  { label: 'About Us',      to: '/about' },
  { label: 'FAQs',          to: '/faq' },
  { label: 'Contact Us',    to: '/contact' },
];

// Services handled via custom click logic (not plain <Link>)
const serviceItems = [
  {
    label: 'Buy Property',
    action: 'hero-tab',
    tab: 'buy',          // hero slider tab
    navTab: 'Buy',       // navbar highlight (if your navbar reads from state/URL)
    path: '/',
  },
  {
    label: 'Sell Property',
    action: 'navigate',
    path: '/services/post-property',   // goes to post property ad page
  },
  {
    label: 'Rent Property',
    action: 'hero-tab',
    tab: 'rent',
    navTab: 'Rent',
    path: '/',
  },
  {
    label: 'Property Management',
    action: 'hero-tab',
    tab: 'management',
    navTab: 'Management',
    path: '/',
  },
];

// Properties — each item navigates to /properties with specific params
const propertyItems = [
  { label: 'Residential', params: { adType: 'buy', propertyType : 'residential' } },
  { label: 'Commercial',  params: { adType: 'buy', propertyType : 'commercial'  } },
  { label: 'Plot / Land', params: { adType: 'buy',  propertyType: 'land/plot'   } },
  { label: 'Villa',       params: { adType: 'buy',  propertyType: 'villa'       } },
];

// Locations — filter by ?locality= param on /properties
const locationItems = [
  { label: 'Balewadi',   locality: 'Balewadi'   },
  { label: 'Baner',      locality: 'Baner'      },
  { label: 'Kharadi',    locality: 'Kharadi'    },
  { label: 'Viman Nagar',locality: 'Viman Nagar'},
  { label: 'Hadapsar',   locality: 'Hadapsar'   },
];

// ─── Shared link pill style ───────────────────────────────────────────────────

function FooterLinkItem({ label, onClick, to }) {
  const inner = (
    <span className="text-white/50 hover:text-gold text-sm transition-all duration-300 flex items-center relative pl-0 hover:pl-5 group cursor-pointer">
      <ArrowRight className="w-3 h-3 absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-gold" />
      {label}
    </span>
  );

  if (to) {
    return <li><Link to={to} onClick={onClick}>{inner}</Link></li>;
  }
  return <li><span onClick={onClick}>{inner}</span></li>;
}

// ─── Footer component ─────────────────────────────────────────────────────────

export default function Footer() {
  const { user, openAuth } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dynamicSocials = [
    { icon: <FaInstagram />, href: settings?.socials?.instagram, label: 'Instagram' },
    { icon: <FaXTwitter />,  href: settings?.socials?.twitter,   label: 'X (Twitter)' },
    { icon: <FaLinkedinIn />,href: settings?.socials?.linkedin,  label: 'LinkedIn' },
    { icon: <FaFacebookF />, href: settings?.socials?.facebook,  label: 'Facebook' },
    { icon: <FaYoutube />,   href: settings?.socials?.youtube,   label: 'YouTube' },
    {
      icon: <FaWhatsapp />,
      href: settings?.socials?.whatsapp || (settings?.contactWhatsApp
        ? `https://wa.me/${settings.contactWhatsApp.replace(/[^0-9]/g, '')}`
        : ''),
      label: 'WhatsApp',
    },
  ].map(s => ({ ...s, href: (s.href && s.href.trim() !== '') ? s.href : '#' }));

  // ── Handlers ──────────────────────────────────────────────────────────────

  // Company links — gate wishlist behind auth
  const handleCompanyClick = (e, to) => {
    if (!user && gatedPaths.includes(to)) {
      e.preventDefault();
      openAuth(to);
    }
  };

  // Service links
  const handleServiceClick = (item) => {
    // Gate behind auth if needed
    if (!user && gatedPaths.includes(item.path)) {
      openAuth(item.path);
      return;
    }

    if (item.action === 'navigate') {
      // Sell → go directly to post-property page
      navigate(item.path);
      return;
    }

    if (item.action === 'hero-tab') {
      // Navigate to home with a state payload so Hero reads the active tab
      // AND set a URL search param so navbar can highlight the right tab
      navigate('/', {
        state: {
          heroTab: item.tab,    // Hero component reads this from location.state
          navTab: item.navTab,  // Navbar can also read this
        },
      });
      // Scroll to top so hero is visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Property type filter — sends type + category params
  const handlePropertyClick = (params) => {
    const q = new URLSearchParams(params);
    navigate(`/properties?${q.toString()}`);
  };

  // Location filter
  const handleLocationClick = (locality) => {
    navigate(`/properties?locality=${encodeURIComponent(locality)}`);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <footer className="relative bg-[#051324] border-t border-white/10 text-white overflow-hidden">
      {/* Background Kinetic Canvas — Desktop Only */}
      {!isMobile && (
        <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-20">
          <KineticGrid density="low" speed="slow" />
        </div>
      )}

      <div className="container-luxury pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">

          {/* ── Brand info column ── */}
          <div className="col-span-1 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-7 group">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #B8860B 0%, #C9940A 50%, #8B6B09 100%)' }}
              >
                {settings?.logoIconImage ? (
                  <img src={settings.logoIconImage} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-navy font-display font-black text-sm leading-none">
                    {getLogoInitials(settings)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-display font-bold text-xl text-white leading-tight">
                  {renderBrandLogo(settings, '#B8860B')}
                </p>
                <p className="text-white/40 text-[8px] font-accent tracking-[0.25em] uppercase mt-[1.5px]">
                  {settings?.logoSubtitle || 'Luxury Real Estate · Pune'}
                </p>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              {settings?.heroDescription ||
                'We help trusted buyers discover exceptional properties in Pune, offering trusted guidance, personalized assistance, and a seamless experience from property selection to successful investment..'}
            </p>

            <div className="space-y-3.5 text-xs text-white/70 mb-7">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                {settings?.contactAddress || 'Level 12, Panchshil Tech Park, Yerwada, Pune 411006'}
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${settings?.contactPhone1 || '70094619'}`} className="hover:text-gold transition-colors">
                  {settings?.contactPhone1 || '70094619'}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${settings?.contactEmail1}`} className="hover:text-gold transition-colors">
                  {settings?.contactEmail1 || 'hello@hyperrelestix.in'}
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {dynamicSocials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 text-sm transition-all duration-250 hover:text-navy"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #B8860B, #C9940A)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns ── */}
          <div className="col-span-1 lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Company */}
            <div>
              <h4 className="font-display font-bold text-white text-[10px] uppercase tracking-[0.22em] mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <FooterLinkItem
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    onClick={(e) => handleCompanyClick(e, link.to)}
                  />
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display font-bold text-white text-[10px] uppercase tracking-[0.22em] mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceItems.map((item) => (
                  <FooterLinkItem
                    key={item.label}
                    label={item.label}
                    onClick={() => handleServiceClick(item)}
                  />
                ))}
              </ul>
            </div>

            {/* Properties */}
            <div>
              <h4 className="font-display font-bold text-white text-[10px] uppercase tracking-[0.22em] mb-5">
                Properties
              </h4>
              <ul className="space-y-3">
                {propertyItems.map((item) => (
                  <FooterLinkItem
                    key={item.label}
                    label={item.label}
                    onClick={() => handlePropertyClick(item.params)}
                  />
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-display font-bold text-white text-[10px] uppercase tracking-[0.22em] mb-5">
                Locations
              </h4>
              <ul className="space-y-3">
                {locationItems.map((item) => (
                  <FooterLinkItem
                    key={item.label}
                    label={item.label}
                    onClick={() => handleLocationClick(item.locality)}
                  />
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Divider + Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} {getBrandName(settings)} . All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-white/35 hover:text-gold text-xs transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/35 hover:text-gold text-xs transition-colors duration-200">
              Terms of Service
            </Link>
            <span className="text-white/35 text-xs"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
