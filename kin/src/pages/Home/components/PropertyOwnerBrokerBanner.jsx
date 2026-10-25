import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NAVY = '#0B1728';
const OR   = '#A67A08';

const cards = [
  {
    id: 'owner',
    heading: 'Are you a Property Owner?',
    eyebrow: 'For Property Owners',
    description: 'List your property with us and get access to thousands of verified buyers & tenants. Professional handling, complete transparency, and end-to-end support from listing to closing.',
    btnLabel: 'Post Property Ad',
    btnPath: '/services/post-property',
    divider: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
        <path d="M24 6L6 20v26h36V20L24 6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <rect x="18" y="30" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M20 22h8M24 18v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'broker',
    heading: 'Are you a Broker?',
    eyebrow: 'For Brokers & Agents',
    description: 'Partner with us to co-list properties and access exclusive inventory. Grow your business with our trusted network of real estate professionals across Pune & PCMC.',
    btnLabel: 'Post Property Ad',
    btnPath: '/services/post-property?role=broker',
    divider: false,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
        <circle cx="17" cy="17" r="7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 42c0-7 5-11 11-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="35" cy="20" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M27 42c0-5.5 3.5-9 8-9s8 3.5 8 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 32c1.5-.7 3.2-1 4.5-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function PropertyOwnerBrokerBanner() {
  const navigate = useNavigate();

  return (
    <section
      className="bg-white dark:bg-navy-dark transition-colors duration-300 relative overflow-hidden"
      style={{
        padding: '0',
      }}
    >
      {/* Soft gold blob */}
      <div style={{
        position: 'absolute', top: '50%', right: -60, transform: 'translateY(-50%)',
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 py-9 ${
              card.divider ? 'border-b border-gray-150 dark:border-white/10' : ''
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 flex-1 w-full">
              <div style={{
                width: 76, height: 76, borderRadius: 20, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${OR}12`,
                border: `1.5px solid ${OR}28`,
                color: OR,
              }}>
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: OR, marginBottom: 6 }}>
                  {card.eyebrow}
                </p>
                <h2
                  className="text-navy dark:text-white transition-colors"
                  style={{ fontWeight: 900, fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', lineHeight: 1.2, marginBottom: 10 }}
                >
                  {card.heading}
                </h2>
                <p
                  className="text-slate-500 dark:text-white/60 transition-colors"
                  style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 480, margin: 0 }}
                >
                  {card.description}
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto shrink-0 mt-3 md:mt-0">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(card.btnPath)}
                className="w-full md:w-auto"
                style={{
                  height: 50, padding: '0 32px', borderRadius: 14, border: 'none',
                  cursor: 'pointer', fontWeight: 800, fontSize: '0.875rem',
                  color: '#fff',
                  background: `linear-gradient(135deg, #C9940A, ${OR})`,
                  boxShadow: `0 4px 20px rgba(201,162,39,0.35)`,
                  whiteSpace: 'nowrap',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,162,39,0.50)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,162,39,0.35)'; }}
              >
                {card.btnLabel}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
