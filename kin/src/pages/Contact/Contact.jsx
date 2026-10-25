import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../animations/variants';
import { faqs as staticFaqs } from '../../data/index';
import SectionHeader from '../../components/common/SectionHeader';
import PremiumIcon from '../../components/common/PremiumIcon';
import { useAuth, useSiteSettings, getBrandName } from '../../contexts';

import { submitEnquiry, fetchFaqs } from '../../utils/api';
import SEO from '../../components/common/SEO';
import FormSuccessStep from '../../components/common/FormSuccessStep';

// Dynamic contacts will be generated inside the component based on site settings

function CustomSelect({ value, onChange, options, placeholder, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selectedOption = options.find(o => typeof o === 'object' ? o.value === value : o === value);
  const displayText = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) 
    : placeholder;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between input-luxury text-left ${className}`}
      >
        <span className={value ? "text-navy dark:text-white" : "text-zinc-400 dark:text-white/35"}>
          {displayText}
        </span>
        <ChevronDown className={`w-4 h-4 text-ink-soft dark:text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-white/95 dark:bg-navy/95 backdrop-blur-md border border-gray-150 dark:border-white/10 rounded-2xl shadow-luxury z-50 py-1.5 no-scrollbar"
          >
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const label = typeof opt === 'object' ? opt.label : opt;
              const active = value === val;

              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    onChange(val);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-gold/10 text-gold-dark dark:text-gold'
                      : 'text-ink-muted dark:text-cream/80 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-navy dark:hover:text-white'
                  }`}
                >
                  <span>{label}</span>
                  {active && <span className="text-gold text-[10px]">●</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const { user, openAuth } = useAuth();
  const location = useLocation();
  const { settings } = useSiteSettings();
  const contacts = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Visit Us', val: settings?.contactAddress || 'Level 12, Panchshil Tech Park\nYerwada, Pune 411006', href: '#' },
    { icon: <Phone className="w-5 h-5" />, label: 'Call Us', val: settings?.contactPhone2 ? `${settings.contactPhone1 || '70094619'}\n${settings.contactPhone2}` : (settings?.contactPhone1 || '70094619'), href: `tel:${settings?.contactPhone1 || '70094619'}` },
    { icon: <Mail className="w-5 h-5" />, label: 'Email Us', val: `${settings?.contactEmail1 || 'hello@hyperrelestix.in'}\n${settings?.contactEmail2 || 'careers@hyperrelestix.in'}`, href: `mailto:${settings?.contactEmail1 || 'hello@hyperrelestix.in'}` },
    { icon: <Clock className="w-5 h-5" />, label: 'Office Hours', val: `${settings?.contactOfficeHoursWeekdays || 'Mon–Sat: 9:00 AM – 7:00 PM'}\n${settings?.contactOfficeHoursSunday || 'Sunday: 10:00 AM – 4:00 PM'}`, href: null },
  ];

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    subject: location.state?.subject || '',
    message: location.state?.message || '',
    timezone: 'Dubai (GST)',
    preferredTime: ''
  });
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [serverError, setServerError] = useState('');
  const [openFaq, setOpenFaq]         = useState(null);
  const [faqsList, setFaqsList] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await fetchFaqs();
        if (active) setFaqsList(data || []);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const activeFaqs = faqsList.length > 0 ? faqsList : staticFaqs;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (location.state?.subject) {
      setForm(f => ({ ...f, subject: location.state.subject }));
    } else {
      const params = new URLSearchParams(location.search);
      const subjectParam = params.get('subject');
      if (subjectParam) {
        setForm(f => ({ ...f, subject: subjectParam }));
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-20 transition-colors duration-300">
      <SEO 
        title="Contact Us & Book a Consultation" 
        description="Get in touch with our senior real estate advisors. Schedule site visits, remote NRI meetings, FEMA consultations, or call our Pune headquarters." 
        url="/contact" 
      />

      {/* Header */}
      <div className="bg-surface dark:bg-navy-dark border-b border-gray-100 dark:border-white/10 pt-10 pb-6">
        <div className="container-luxury text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="font-display font-black text-navy dark:text-white text-3xl md:text-4xl leading-tight mb-2">
              Talk to a <span style={{ color: '#B8860B' }}>Luxury Advisor</span>
            </h1>
            <p className="text-ink-muted dark:text-white/55 max-w-lg mx-auto text-sm leading-relaxed">
              Whether you're searching for your dream home or looking to maximise your property's value — our senior advisors are here to help.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Main Grid */}
      <div className="container-luxury py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Info & Maps Panel (Column Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Info Stack */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col gap-4"
            >
              {contacts.map((c, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div
                    className="p-5 rounded-2xl bg-white dark:bg-navy-light border border-gray-100 dark:border-white/10 shadow-card flex items-start gap-4 transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gold/10 text-gold">
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-navy dark:text-white text-sm mb-1">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-ink-muted dark:text-cream/80 text-xs leading-relaxed whitespace-pre-line hover:text-gold transition-colors block">
                          {c.val}
                        </a>
                      ) : (
                        <p className="text-ink-muted dark:text-cream/80 text-xs leading-relaxed whitespace-pre-line">{c.val}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Location Map Container */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="rounded-3xl overflow-hidden border border-gray-150 dark:border-white/10 shadow-card bg-white dark:bg-navy-light p-3">
                <div className="rounded-2xl overflow-hidden h-64 relative">
                  <iframe 
                    title="Office Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.380482596956!2d73.89311311090332!3d18.5568571824707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c125df963c6d%3A0xe54ef9a584065261!2sPanchshil%20Tech%20Park%20One!5e0!3m2!1sen!2sin!4v1714200000000!5m2!1sen!2sin" 
                    className="w-full h-full border-0 grayscale dark:invert dark:hue-rotate-180" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Form Card (Column Span 7) */}
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="rounded-3xl p-8 bg-white dark:bg-navy-light border border-gray-100 dark:border-white/10 shadow-card"
              >
                <h2 className="font-display font-bold text-navy dark:text-white text-2xl mb-1.5">Send Us a Message</h2>
                <p className="text-ink-muted dark:text-white/60 text-sm mb-7">We typically respond within 2 hours during business hours.</p>
                {!submitted ? (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!user) { openAuth(); return; }
                    setLoading(true);
                    setServerError('');
                    try {
                      let finalMessage = form.message;
                      if (form.subject === 'Book a Site Visit' || form.subject === 'NRI Desk Consultation') {
                        finalMessage += `\n\n[Timezone: ${form.timezone} | Preferred Slot: ${form.preferredTime || 'Not Specified'}]`;
                      }
                      
                      await submitEnquiry({
                        type: 'contact',
                        name: form.name,
                        phone: form.phone,
                        email: form.email,
                        subject: form.subject,
                        message: finalMessage,
                        propertyId: location.state?.propertyId || undefined,
                        isNRI: form.phone.startsWith('+') && !form.phone.startsWith('+91'),
                      });
                      setSubmitted(true);
                    } catch (err) {
                      setServerError(err.message || 'Something went wrong. Please try again.');
                    } finally {
                      setLoading(false);
                    }
                  }} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Full Name *</label>
                        <input value={form.name} onChange={e => set('name', e.target.value)} required
                          placeholder="Enter full name" className="input-luxury" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Mobile Number *</label>
                        <input value={form.phone} onChange={e => set('phone', e.target.value)} required
                          placeholder="Enter mobile number" className="input-luxury" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Email Address</label>
                      <input value={form.email} onChange={e => set('email', e.target.value)} type="email"
                        placeholder="Enter email address" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Subject</label>
                      <CustomSelect
                        value={form.subject}
                        onChange={val => set('subject', val)}
                        placeholder="Select a subject"
                        options={[
                          'Buy Property in Pune',
                          'Sell My Property',
                          'Lease / Rental Enquiry',
                          'Property Management',
                          'Book a Site Visit',
                          'NRI Desk Consultation',
                          'Other'
                        ]}
                      />
                    </div>

                    {(form.subject === 'Book a Site Visit' || form.subject === 'NRI Desk Consultation') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid sm:grid-cols-2 gap-4 pt-1"
                      >
                        <div>
                          <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Preferred Timezone</label>
                          <CustomSelect
                            value={form.timezone}
                            onChange={val => set('timezone', val)}
                            placeholder="Select timezone"
                            options={[
                              'Dubai (GST - UTC+4)',
                              'London (BST - UTC+1)',
                              'Toronto (EST - UTC-5)',
                              'Singapore (SGT - UTC+8)',
                              'San Francisco (PST - UTC-8)',
                              'India (IST - UTC+5:30)'
                            ]}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Preferred Date & Time</label>
                          <input 
                            type="datetime-local" 
                            value={form.preferredTime} 
                            onChange={e => set('preferredTime', e.target.value)} 
                            className="input-luxury" 
                          />
                        </div>
                      </motion.div>
                    )}
                    <div>
                      <label className="block text-xs font-bold text-navy dark:text-white mb-1.5">Message</label>
                      <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={4}
                        placeholder="Describe your inquiry or request details..."
                        className="input-luxury resize-none" />
                    </div>
                    {serverError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl">
                        {serverError}
                      </div>
                    )}
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Sending...' : <> Send Message <ArrowRight className="w-4 h-4" /> </>}
                    </button>
                  </form>
                ) : (
                  <FormSuccessStep
                    accent="#C9940A"
                    title="Message Sent!"
                    subtitle="Our advisor will call you within 2 hours."
                    onReset={() => setSubmitted(false)}
                  />
                )}
              </div>
            </motion.div>
          </div>
 
         </div>
       </div>

      {/* FAQ */}
      <div className="bg-white dark:bg-navy py-24 transition-colors duration-300">
        <div className="container-luxury max-w-3xl">
          <SectionHeader label="FAQ" title={<>Frequently Asked <span style={{ color: '#B8860B' }}>Questions</span></>} align="center" className="mb-12" />
          <div className="space-y-3">
            {activeFaqs.map((faq, i) => (
              <motion.div key={faq._id || faq.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                    openFaq === i
                      ? 'bg-gold/5 dark:bg-gold/10 border-gold/40'
                      : 'bg-black/5 dark:bg-white/5 border-gray-100 dark:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display font-bold text-navy dark:text-white text-sm">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: '#B8860B' }} />
                      : <ChevronDown className="w-4 h-4 shrink-0 text-ink-soft" />
                    }
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-ink-muted dark:text-white/60 text-sm leading-[1.85] pt-3">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
