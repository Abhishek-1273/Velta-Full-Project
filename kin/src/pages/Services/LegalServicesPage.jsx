import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Loader, Send, Check, Search, FileText, CheckCircle2, Scale, UserCheck } from 'lucide-react';
import FormSuccessStep from '../../components/common/FormSuccessStep';
import { fadeUp } from '../../animations/variants';
import { useAuth, useSiteSettings, getBrandName } from '../../contexts';
import { submitEnquiry } from '../../utils/api';

const icon = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <line x1="16" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="16" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="16" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="34" cy="36" r="6" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M31.5 36l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const service = {
  type: 'legal',
  label: 'Legal Services',
  accent: '#A67A08',
  icon,
  tagline: 'No paperwork nightmares',
  description:
    'Property transactions involve serious legal risk. Our expert legal team handles title verification, due diligence, sale deed drafting, and registration — so every deal you sign is airtight.',

  benefits: [
    {
      icon: <Search className="w-5 h-5" />,
      title: 'Title Verification',
      text: 'We trace the full ownership history of any property to ensure there are no disputes, liens, or encumbrances before you invest.',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Sale Deed Drafting',
      text: 'Our lawyers draft legally sound sale deeds that protect your rights and hold up in any court — no generic templates.',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: 'Registration Support',
      text: 'We guide you through the entire stamp duty and registration process so there are no surprises on the final day.',
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: 'Power of Attorney',
      text: 'We prepare and notarize Power of Attorney documents for NRIs and out-of-city buyers who need representation.',
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: 'Dispute Resolution',
      text: 'Facing a property dispute? Our legal experts assess your case and represent your interests with precision.',
    },
  ],

  process: [
    {
      title: 'Free Initial Consultation',
      text: 'Share your property details with us. Our legal team reviews your case and outlines exactly what needs to be done — at no cost.',
    },
    {
      title: 'Document Review & Due Diligence',
      text: 'We collect and verify all property documents, check title history, confirm approvals, and flag any issues before you proceed.',
    },
    {
      title: 'Deed Drafting & Registration',
      text: 'Once all checks are clear, we draft the final agreement, coordinate with the sub-registrar office, and ensure smooth registration.',
    },
  ],

  faqs: [
    {
      q: 'How long does title verification take?',
      a: 'Typically 3–5 working days depending on the age of the property and availability of records from the sub-registrar office.',
    },
    {
      q: 'Do you handle both residential and commercial properties?',
      a: 'Yes. Our legal team is experienced in residential plots, apartments, villas, commercial offices, and industrial properties.',
    },
    {
      q: 'What documents do I need to provide?',
      a: 'To start, we need the existing title deed, property tax receipts, encumbrance certificate, and any sale agreement already in place.',
    },
    {
      q: 'Is the consultation really free?',
      a: 'Yes — the initial consultation is completely free. We assess your situation and give you a clear picture of what services you need before any fees are discussed.',
    },
    {
      q: 'Can you help NRI buyers?',
      a: 'Absolutely. We regularly assist NRIs with Power of Attorney, remote document verification, and coordinating registration on their behalf.',
    },
  ],
};

export default function LegalServicesPage() {
  const { user } = useAuth();
  const { settings } = useSiteSettings();
  const brandName = getBrandName(settings);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    const cleanPhone = phone.replace(/\s/g, '');
    const indianPhone = /^[6-9]\d{9}$/.test(cleanPhone);
    const intlPhone = /^\+\d{7,15}$/.test(cleanPhone);
    if (!indianPhone && !intlPhone) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    const payload = {
      type: 'legal',
      name,
      phone,
      email,
      subject: 'Legal Services Enquiry',
      message: message || 'Interested in Legal Services.',
    };

    try {
      await submitEnquiry(payload);
      setSuccess(true);
      setMessage('');
    } catch (err) {
      setError(err?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-24 pb-16 transition-colors duration-300">
      <div className="container-luxury">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-accent tracking-wider uppercase text-ink-muted hover:text-gold mb-8 transition-colors duration-300">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-navy-light shadow-card border border-gray-100 dark:border-white/5" style={{ color: service.accent }}>
                  {service.icon}
                </div>
                <div>
                  <p className="text-[10px] font-accent tracking-[0.25em] uppercase" style={{ color: service.accent }}>
                    {service.tagline}
                  </p>
                  <h1 className="font-display font-black text-navy dark:text-white text-3xl md:text-4xl mt-1">
                    {service.label}
                  </h1>
                </div>
              </div>
              <p className="text-sm font-body leading-relaxed text-ink-muted dark:text-white/60">
                {service.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="font-display font-bold text-navy dark:text-white text-xl md:text-2xl border-l-4 pl-3" style={{ borderColor: service.accent }}>
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.benefits.map((b, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white dark:bg-navy-light border border-gray-100 dark:border-white/5 shadow-card transition-all duration-300 hover:shadow-md">
                    <div className="mb-3" style={{ color: service.accent }}>{b.icon}</div>
                    <h3 className="font-display font-bold text-sm text-navy dark:text-white mb-1.5">{b.title}</h3>
                    <p className="text-xs text-ink-muted dark:text-white/50 leading-relaxed font-body">{b.text}</p>
                  </div>
                ))}
                {/* All Legal Services CTA Card */}
                <div
                  className="p-5 rounded-2xl border shadow-card transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
                  
                >
                  <div>
                    <div className="mb-3" style={{ color: service.accent }}>
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-navy dark:text-white mb-1.5">All Legal Services</h3>
                    <p className="text-xs text-ink-muted dark:text-white/50 leading-relaxed font-body">
                      Explore our complete range of legal solutions — from title checks to dispute resolution — all under one roof.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Process */}
            <div className="space-y-6">
              <h2 className="font-display font-bold text-navy dark:text-white text-xl md:text-2xl border-l-4 pl-3" style={{ borderColor: service.accent }}>
                Our Process
              </h2>
              <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                {service.process.map((p, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-display font-black text-sm text-white shadow-sm z-10" style={{ backgroundColor: service.accent }}>
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-display font-bold text-sm text-navy dark:text-white mb-1">{p.title}</h3>
                      <p className="text-xs text-ink-muted dark:text-white/50 leading-relaxed font-body">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <h2 className="font-display font-bold text-navy dark:text-white text-xl md:text-2xl border-l-4 pl-3" style={{ borderColor: service.accent }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-navy-light overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full p-5 flex items-center justify-between gap-4 text-left font-display font-bold text-sm text-navy dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 opacity-70" /> : <ChevronDown className="w-4 h-4 shrink-0 opacity-70" />}
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 text-xs text-ink-muted dark:text-white/55 leading-relaxed font-body border-t border-gray-100/50 dark:border-white/5">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Consultation Form */}
          <div className="lg:col-span-5 lg:self-start lg:sticky lg:top-28 h-fit z-30">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-navy-light border border-gray-100 dark:border-white/5 shadow-card relative overflow-hidden">
              

              <h2 className="font-display font-black text-xl text-navy dark:text-white mb-2">
                Request Consultation
              </h2>
              <p className="text-xs text-ink-muted dark:text-white/50 font-body mb-6 leading-relaxed">
                Fill out the form below, and a senior {brandName} specialist will contact you within 24 hours.
              </p>

              {success ? (
                <FormSuccessStep
                  accent='#C9940A'
                  title="Request Received!"
                  subtitle="We've received your request. An advisor will get in touch with you shortly."
                  onReset={() => setSuccess(false)}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-accent tracking-wider uppercase text-ink-muted">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent text-navy dark:text-white focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-accent tracking-wider uppercase text-ink-muted">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210 or +91..."
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent text-navy dark:text-white focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-accent tracking-wider uppercase text-ink-muted">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@domain.com"
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent text-navy dark:text-white focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-accent tracking-wider uppercase text-ink-muted">Message (Optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us details about your request..."
                      rows="3"
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent text-navy dark:text-white focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-[11px] text-red-500 bg-red-500/5 p-3 rounded-xl border border-red-500/10 text-center font-body">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-xs font-accent tracking-wider uppercase text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
                    style={{ backgroundColor: service.accent }}
                  >
                    {loading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Request Details <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
