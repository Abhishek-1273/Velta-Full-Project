import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Scale, FileText, Settings, Coins, Paintbrush } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/variants';

const services = [
  {
    id: 'legal',
    label: 'Legal Services',
    tagline: 'Paperwork Help',
    cta: 'Get Legal Help',
    path: '/services/legal',
    accent: '#A67A08',
    icon: Scale,
    desc: 'Property title verification, due diligence, and registered deeds.',
  },
  {
    id: 'rental',
    label: 'Rental Agreement',
    tagline: 'Airtight & Registered',
    cta: 'Draft Agreement',
    path: '/services/rental',
    accent: '#A67A08',
    icon: FileText,
    desc: 'Doorstep biometric, online police verify & official e-stamp.',
  },
  {
    id: 'management',
    label: 'Property Management',
    tagline: 'Hands-free Care',
    cta: 'Start Managing',
    path: '/services/management',
    accent: '#A67A08',
    icon: Settings,
    desc: 'Tenant sourcing, monthly rentals, maintenance & remote NRI desk.',
  },
  {
    id: 'loan',
    label: 'Loan Services',
    tagline: 'Best Interest Rate',
    cta: 'Check Eligibility',
    path: '/services/loan',
    accent: '#A67A08',
    icon: Coins,
    desc: 'Home loans compared across 15+ banks. Fast approval.',
  },
  {
    id: 'painting-cleaning',
    label: 'Painting & Cleaning',
    tagline: '48-Hour Turnaround',
    cta: 'Book a Visit',
    path: '/services/painting-cleaning',
    accent: '#A67A08',
    icon: Paintbrush,
    desc: 'Deep cleaning, sanitized wall painting & furniture protection.',
  },
];

export default function ServicesStrip() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="services"
      className="relative py-24 bg-surface dark:bg-navy-dark border-t border-b border-gray-100 dark:border-white/5 transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gold/5 dark:bg-gold/3 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-royal/5 dark:bg-royal/3 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="container-luxury relative z-10">
        
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="font-accent font-bold tracking-[0.28em] text-[10px] uppercase text-gold">
            What We Offer
          </span>
          <h2 className="font-display font-black text-navy dark:text-white text-3xl md:text-4xl leading-tight">
            Services We Provide
          </h2>
          <p className="text-sm font-body leading-relaxed text-ink-muted dark:text-white/60">
            From legal paperwork to home makeovers — everything you need to buy, sell, rent, or manage your property is available right here on our unified platform.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isHov = hovered === svc.id;

            return (
              <motion.div
                key={svc.id}
                variants={fadeUp}
                onMouseEnter={() => setHovered(svc.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(svc.path)}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-navy border border-gray-100 dark:border-white/5 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-card hover:shadow-luxury-deep"
                style={{
                  borderColor: isHov ? svc.accent : undefined,
                  boxShadow: isHov ? `0 12px 32px ${svc.accent}12` : undefined,
                }}
              >


                <div className="space-y-5">
                  {/* Icon Badge */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      backgroundColor: isHov ? `${svc.accent}15` : 'rgba(184,134,11,0.05)',
                      borderColor: isHov ? `${svc.accent}30` : 'rgba(184,134,11,0.15)',
                      color: isHov ? svc.accent : '#A67A08',
                    }}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Tagline & Title */}
                  <div className="space-y-2">
                    <span
                      className="inline-block text-[9px] font-accent font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                      style={{
                        color: svc.accent,
                        borderColor: `${svc.accent}30`,
                        backgroundColor: `${svc.accent}05`,
                      }}
                    >
                      {svc.tagline}
                    </span>
                    <h3 className="font-display font-black text-sm text-navy dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-200 leading-tight">
                      {svc.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ink-muted dark:text-white/50 leading-relaxed font-body">
                    {svc.desc}
                  </p>
                </div>

                {/* CTA Action */}
                <div className="pt-6 mt-auto">
                  <div
                    className="w-full py-2.5 rounded-xl border font-accent font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-200"
                    style={{
                      borderColor: isHov ? svc.accent : 'rgba(11,23,40,0.1)',
                      backgroundColor: isHov ? svc.accent : 'transparent',
                      color: isHov ? '#FFFFFF' : 'rgba(11,23,40,0.7)',
                    }}
                  >
                    {svc.cta}
                    <ArrowRight className={`w-3 h-3 transition-transform duration-200 ${isHov ? 'translate-x-1' : ''}`} />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
