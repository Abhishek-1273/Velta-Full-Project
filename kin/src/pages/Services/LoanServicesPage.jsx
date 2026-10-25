import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormSuccessStep from '../../components/common/FormSuccessStep';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Loader, Send, Check, Percent, Coins, FolderOpen, ThumbsUp, RefreshCw, Globe } from 'lucide-react';
import { fadeUp } from '../../animations/variants';
import { API_URL } from '../../config/api';
import { useAuth, useSiteSettings, getBrandName } from '../../contexts';

const icon = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M24 13v3M24 32v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M18 19.5c0-2 1.5-3.5 6-3.5s6 1.5 6 3.5c0 4-12 3-12 7.5 0 2.5 2 4.5 6 4.5s6-2 6-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const service = {
  type: 'sell',
  label: 'Loan Services',
  accent: '#A67A08',
  icon,
  tagline: 'Best rate. Least paperwork.',
  description:
    'Get the highest loan eligibility with the lowest interest rates. We partner with India\'s top public and private banks to manage your entire documentation, approval, and disbursement process seamlessly.',

  benefits: [
    {
      icon: <Percent className="w-5 h-5" />,
      title: 'Lowest Interest Rates',
      text: 'We compare home loan rates across 15+ leading banks (SBI, HDFC, ICICI, LIC) to secure the absolute lowest rate for you.',
    },
    {
      icon: <Coins className="w-5 h-5" />,
      title: 'Fees Aligned to Your Needs',
      text: 'Our service fees vary depending on the nature, complexity, and specific requirements of each case, ensuring you pay for the services you actually need.',
    },
    {
      icon: <FolderOpen className="w-5 h-5" />,
      title: 'Hassle-Free Paperwork',
      text: 'Our dedicated executives collect documents from your doorstep and handle all bank communications on your behalf.',
    },
    {
      icon: <ThumbsUp className="w-5 h-5" />,
      title: 'Pre-Approved Loans',
      text: 'Get pre-approved home loan offers in principle within 48 hours to help you negotiate and seal property deals with confidence.',
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'Balance Transfer Support',
      text: 'Already paying a high interest rate? We help you transfer your existing home loan to another bank at a lower interest rate.',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'NRI Home Loans',
      text: 'Specialized NRI loan processing assistance with simplified documentation, remote verification, and legal power of attorney setup.',
    },
  ],

  process: [
    {
      title: 'Eligibility & Rate Check',
      text: 'We analyze your income, credit history, and property details to calculate loan eligibility and find the best bank offer.',
    },
    {
      title: 'Document Collection & Submission',
      text: 'Our representative collects required documents (income proof, KYC, property title files) and submits them to the bank.',
    },
    {
      title: 'Sanction & Disbursement',
      text: 'We coordinate the bank valuation, legal vetting of the property, draft the sanction letter, and complete final disbursement.',
    },
  ],

  faqs: [
    {
      q: 'What is the current average home loan interest rate?',
      a: "Home loan interest rates start from 7.25% per annum, subject to eligibility, credit profile, and lender terms."
    },
    {
      q: 'Do you charge any processing fees?',
      a: 'Processing fees and other charges may vary depending on the bank and the loan product selected.',
    },
    {
      q: 'What documents are required for salaried individuals?',
a: (
  <>
    <strong>Salaried Applicants:</strong> PAN, Aadhaar, 2 passport-size photographs, address proof, latest 3 months’ salary slips, 1 year bank statement in PDF format till date, latest 2 years’ Form 16, and company ID.
    <br /><br />
    <strong>For Business/Self-Employed:</strong> KYC documents, Shop Act License, shop address proof, latest 2 years’ ITR, 1 year bank statement in PDF format till date, and GST registration (optional).
  </>
),
    },
    {
      q: 'Can I get a loan for a property not listed on your portal?',
      a: 'Yes. We assist with home loans for any property in Pune, whether you buy it through us, another broker, or directly from an owner.',
    },
    {
      q: 'What is the maximum loan term I can choose?',
      a: 'Most banks offer home loan tenures up to 30 years, subject to your retirement age and credit criteria.',
    },
  ],
};

export default function LoanServicesPage() {
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

  // Home Loan Calculator states
  const [loan, setLoan] = useState(10000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const emi = Math.round((loan * (rate / 1200) * Math.pow(1 + rate / 1200, years * 12)) / (Math.pow(1 + rate / 1200, years * 12) - 1));

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
      type: 'loan',
      name,
      phone,
      email,
      subject: 'Loan Services Enquiry',
      message: message || 'Interested in Loan Services.',
    };

    try {
      const res = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setMessage('');
      } else {
        setError(data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
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

            {/* EMI Calculator */}
            <div className="space-y-6">
              <h2 className="font-display font-bold text-navy dark:text-white text-xl md:text-2xl border-l-4 pl-3" style={{ borderColor: service.accent }}>
                Home Loan Calculator
              </h2>
              <div className="bg-white dark:bg-navy-light rounded-2xl border border-gray-100 dark:border-white/5 p-6 md:p-8 shadow-card">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ink-muted dark:text-white/60 font-body">Loan Amount</span>
                      <span className="font-bold text-navy dark:text-white">
                        {loan >= 10000000
                          ? `₹${(loan / 10000000).toFixed(2)} Cr`
                          : `₹${(loan / 100000).toFixed(0)} Lakh`
                        }
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={100000000}
                      step={100000}
                      value={loan}
                      onChange={e => setLoan(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ink-muted dark:text-white/60 font-body">Interest Rate</span>
                      <span className="font-bold text-navy dark:text-white">{rate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={15}
                      step={0.1}
                      value={rate}
                      onChange={e => setRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ink-muted dark:text-white/60 font-body">Loan Tenure</span>
                      <span className="font-bold text-navy dark:text-white">{years} years</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={years}
                      onChange={e => setYears(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                  <div className="rounded-2xl p-5 text-center bg-gold/5 dark:bg-gold/10 border border-gold/20">
                    <p className="text-ink-muted dark:text-white/50 text-xs mb-1 font-body">Estimated Monthly EMI</p>
                    <p className="font-display font-black text-3xl text-gold">₹{emi.toLocaleString()}</p>
                    <p className="text-ink-soft dark:text-white/30 text-[10px] mt-1.5 font-body">Consult bank for final rates & processing charges</p>
                  </div>
                </div>
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
                      </ AnimatePresence>
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
