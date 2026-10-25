import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, ArrowRight, ShieldCheck, HelpCircle as HelpIcon, Landmark, UserCheck } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { useSiteSettings, getBrandName } from '../../contexts';
import { fadeUp } from '../../animations/variants';

const faqCategories = [
  { id: 'all', label: 'All Questions', icon: <HelpIcon className="w-4 h-4" /> },
  { id: 'buying', label: 'Buying & Selling', icon: <Landmark className="w-4 h-4" /> },
  { id: 'renting', label: 'Rent & Management', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'nri', label: 'NRI Services', icon: <UserCheck className="w-4 h-4" /> },
];

const faqsList = [
  {
    category: 'buying',
    q: 'Are all property listings on your platform verified?',
    a: 'Yes, every listing undergoes a strict verification process. We cross-verify property titles, builder clearances, possession timelines, and RERA registration details before publishing them on our portal.'
  },
  {
    category: 'buying',
    q: 'What is RERA and how does it protect property buyers?',
    a: 'RERA (Real Estate Regulatory Authority) is a government act that protects home buyers and boosts investments. It ensures builders deliver projects on time, follow the approved blueprints, and keep buyers updated on construction milestones.'
  },
  {
    category: 'buying',
    q: 'How do I list a property for sale on your portal?',
    a: 'Simply click the "Post Property Ad" button in the navigation bar, fill in the essential configurations (dimensions, photos, price, location), and submit. Our support team will review and set it live within 24 hours.'
  },
  {
    category: 'renting',
    q: 'What is included in your Property Management services?',
    a: 'Our end-to-end management includes: finding and vetting verified tenants, drafting rental agreements, regular property maintenance and inspections, rent collection, and direct NRI bank transfers.'
  },
  {
    category: 'renting',
    q: 'How are rental agreements executed?',
    a: 'We provide biometrically verified e-registration for rental agreements. You don\'t need to visit government offices; our representative manages the biometric verification right at your doorstep or office.'
  },
  {
    category: 'nri',
    q: 'Can NRIs buy residential and commercial property in India?',
    a: 'Yes. Under general permission granted by the Reserve Bank of India (RBI) and FEMA regulations, Non-Resident Indians (NRIs) can acquire residential and commercial properties without any prior permission.'
  },
  {
    category: 'nri',
    q: 'Do you assist NRI clients remotely?',
    a: 'Absolutely. Over 65% of our clients are NRIs. We provide remote consultations, legal power of attorney templates, digital property tours, biometrically registered rentals, and remote management reporting.'
  },
  {
    category: 'nri',
    q: 'What tax rules apply to NRIs selling property in India?',
    a: 'When an NRI sells property in India, the buyer is required to deduct Tax Deducted at Source (TDS) at 20% for long-term capital gains (property held > 2 years) or 30% for short-term gains.'
  }
];

export default function FAQPage() {
  const { settings } = useSiteSettings();
  const brandName = getBrandName(settings);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqsList.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-24 pb-16 transition-colors duration-300">
      <SEO 
        title="Frequently Asked Questions (FAQs)" 
        description={`Find answers to commonly asked questions about buying, renting, NRI property management, home loans, and legal verification on ${brandName}.`}
        url="/faq"
      />

      <div className="container-luxury max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[10px] font-accent tracking-[0.25em] uppercase text-gold font-bold">
            Help Center
          </p>
          <h1 className="font-display font-black text-navy dark:text-white text-3xl md:text-4xl mt-2 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-ink-muted dark:text-white/60 leading-relaxed">
            Have questions about buying, renting, NRI support, or home loans? Find answers to our most popular queries below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="w-4 h-4 text-ink-soft dark:text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. NRI, RERA, agreement)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full text-xs py-3.5 pl-11 pr-5 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy text-navy dark:text-white focus:outline-none focus:border-gold transition-colors shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-accent tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'border-gold bg-gold text-white shadow-sm'
                  : 'border-gray-200 dark:border-white/10 bg-white dark:bg-navy text-ink-muted dark:text-white/60 hover:border-gold hover:text-gold'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    key={faq.q}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left font-display font-bold text-sm md:text-base text-navy dark:text-white hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-ink-soft dark:text-white/40 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-ink-soft dark:text-white/40 shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-1 text-sm text-ink-muted dark:text-white/65 leading-relaxed font-body border-t border-gray-100 dark:border-white/5 bg-gray-50/20 dark:bg-white/[0.005]">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                layout
                className="text-center py-12 bg-white dark:bg-navy rounded-2xl border border-gray-200 dark:border-white/10"
              >
                <HelpCircle className="w-12 h-12 text-ink-soft dark:text-white/20 mx-auto mb-4" />
                <h3 className="font-display font-bold text-navy dark:text-white text-lg">No FAQs found</h3>
                <p className="text-xs text-ink-muted dark:text-white/50 mt-1">Try searching for other terms or choose a different category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <div className="mt-14 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gold/10 to-gold/5 dark:from-gold/25 dark:to-gold/10 border border-gold/25 text-center">
          <MessageSquare className="w-8 h-8 text-gold mx-auto mb-3" />
          <h2 className="font-display font-bold text-navy dark:text-white text-lg md:text-xl mb-2">
            Still have questions?
          </h2>
          <p className="text-xs text-ink-muted dark:text-white/60 max-w-md mx-auto mb-6 leading-relaxed">
            Our expert advisors are here to help. Reach out to us for any custom assistance regarding Pune real estate, NRIs legal services, or home loans.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-accent font-bold tracking-wider uppercase bg-gold text-white hover:opacity-90 transition-all shadow-sm"
          >
            Contact Advisor <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
