import { useState } from 'react';

const OR       = '#A67A08';
const OR_LIGHT = '#C9940A';
const OR_DARK  = '#A07818';

function Toast({ visible }) {
  return (
    <div
      style={{
        position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, pointerEvents: 'none',
        background: '#0B1728', color: '#fff',
        padding: '12px 22px', borderRadius: 14,
        fontSize: 13, fontWeight: 600, letterSpacing: '0.01em',
        boxShadow: '0 8px 32px rgba(11,23,40,0.22)',
        border: `1px solid ${OR}40`,
        whiteSpace: 'nowrap',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    >
      🚀 App is in development — Coming Soon!
    </div>
  );
}

export default function AppDownload() {
  const [toast, setToast] = useState(false);

  const handleStoreClick = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <>
      <Toast visible={toast} />
      <section
        className="bg-[#FAFAF8] dark:bg-navy-dark border-t border-[#F0EDE6] dark:border-white/5 transition-colors duration-300 relative overflow-hidden"
        style={{ padding: '80px 0' }}
      >
        {/* Soft gold blobs */}
        <div style={{
          position: 'absolute', top: -60, left: -60, width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">

            {/* Left: Text */}
            <div
              style={{ flex: 1, minWidth: 260 }}
              className="w-full text-left"
            >
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: OR, marginBottom: 12 }}>
                Mobile App
              </p>
              <h2
                className="text-navy dark:text-white transition-colors"
                style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.15, marginBottom: 16 }}
              >
                Your Next Home is{' '}
                <span style={{
                  background: `linear-gradient(118deg, ${OR_LIGHT} 0%, ${OR} 50%, ${OR_DARK} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  One Tap Away
                </span>
              </h2>
              <p
                className="text-slate-500 dark:text-white/60 transition-colors"
                style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 400, marginBottom: 36 }}
              >
                Your complete property solution in one app. Search, connect, and close — with trusted experts by your side.
              </p>

              <div className="flex flex-wrap gap-3.5">
                {[
                  {
                    label: 'Google Play', sub: 'GET IT ON', icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 20.5v-17c0-.83 1-.98 1.45-.4l13.1 8.5c.4.26.4.84 0 1.1L4.45 20.9C4 21.48 3 21.33 3 20.5z" fill={OR} />
                      </svg>
                    )
                  },
                  {
                    label: 'App Store', sub: 'DOWNLOAD ON THE', icon: (
                      <svg width="22" height="24" viewBox="0 0 814 1000" fill={OR}>
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.8 135.4-317.9 269-317.9 70.8 0 129.9 41.1 173.3 41.1 41.1 0 111.9-44.8 194-44.8zm-90.4-186.4c32.4-38.8 56.1-92.6 56.1-146.4 0-7.7-.6-15.4-1.9-21.8-53.2 2-116 35.6-153.5 80.3-29.8 34.9-58.5 87.6-58.5 142.1 0 8.3 1.3 16.7 1.9 19.3 3.2.6 8.4 1.3 13.6 1.3 47.8 0 109.4-32.2 142.3-74.8z" />
                      </svg>
                    )
                  },
                ].map(btn => (
                  <a
                    key={btn.label}
                    href="#"
                    onClick={handleStoreClick}
                    className="bg-white dark:bg-navy border border-gray-150 dark:border-white/5 transition-colors duration-200"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 22px', borderRadius: 14,
                      textDecoration: 'none',
                      boxShadow: '0 2px 12px rgba(11,23,40,0.06)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${OR}50`;
                      e.currentTarget.style.boxShadow = `0 6px 28px rgba(201,162,39,0.15)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    {btn.icon}
                    <div>
                      <p style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.05em', marginBottom: 2 }}>{btn.sub}</p>
                      <p className="text-navy dark:text-white transition-colors" style={{ fontSize: 14, fontWeight: 800 }}>
                        {btn.label}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div
              className="flex justify-center w-full md:w-auto shrink-0"
            >
              <div
                className="bg-white dark:bg-navy border border-gray-150 dark:border-white/5 transition-colors duration-300"
                style={{
                  width: 220, height: 420, borderRadius: 36,
                  boxShadow: `0 24px 64px rgba(11,23,40,0.12), 0 0 0 1px ${OR}15`,
                  position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{ width: 80, height: 22, borderRadius: '0 0 14px 14px', background: `${OR}20`, margin: '0 auto', flexShrink: 0 }} />

                {/* Phone content + Coming Soon overlay wrapper */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                {/* Blurred screen content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', filter: 'blur(3px)', pointerEvents: 'none' }}>
                  <div
                    className="bg-[#F8F7F3] dark:bg-navy-dark border-b border-gray-150 dark:border-white/5 transition-colors"
                    style={{ padding: '10px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 800, color: OR }}>KIN Property</div>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${OR}20`, border: `1px solid ${OR}40` }} />
                  </div>

                  <div style={{ padding: '8px 10px' }}>
                    <div
                      className="bg-[#F1F0EB] dark:bg-navy border border-[#E8E4DB] dark:border-white/5 transition-colors"
                      style={{ height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5 }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      </svg>
                      <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#D1CEC6' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', padding: '0 10px', gap: 6, marginBottom: 8 }}>
                    {['Buy', 'Rent', 'Sell'].map((t, i) => (
                      <div key={t} style={{
                        fontSize: 8, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                        background: i === 0 ? OR : 'rgba(150,150,150,0.15)',
                        color: i === 0 ? '#fff' : '#94A3B8',
                      }}>{t}</div>
                    ))}
                  </div>

                  <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 6, padding: '0 10px' }}>
                    {[
                      { price: '₹1.2 Cr', label: '3 BHK • Baner',   tag: 'RERA ✓' },
                      { price: '₹85 L',   label: '2 BHK • Kharadi', tag: 'New' },
                      { price: '₹2.4 Cr', label: '4 BHK • KP',      tag: 'Premium' },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="bg-[#F8F7F3] dark:bg-navy border border-[#EDE8DF] dark:border-white/5 transition-colors"
                        style={{ borderRadius: 8, overflow: 'hidden', display: 'flex', height: 52, flexShrink: 0 }}
                      >
                        <div style={{ width: 52, flexShrink: 0, background: `${OR}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={OR} strokeWidth="1.5" opacity="0.8">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <div style={{ flex: 1, padding: '7px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="text-navy dark:text-white transition-colors" style={{ fontSize: 9, fontWeight: 800 }}>
                              {p.price}
                            </span>
                            <span style={{ fontSize: 7, fontWeight: 700, color: OR, background: `${OR}18`, padding: '1px 4px', borderRadius: 3 }}>{p.tag}</span>
                          </div>
                          <div style={{ fontSize: 8, color: '#94A3B8' }}>{p.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="bg-[#F8F7F3] dark:bg-navy-dark transition-colors"
                  style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <div style={{ width: 60, height: 4, borderRadius: 2, background: '#D1CEC6' }} />
                </div>

                </div> {/* end blurred content */}

                {/* Coming Soon Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(1px)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 8,
                }}>
                  <div style={{
                    fontSize: 22, marginBottom: 2,
                  }}>🚀</div>
                  <div style={{
                    fontSize: 13, fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: OR,
                    textShadow: '0 1px 8px rgba(255,255,255,0.8)',
                  }}>Coming Soon</div>
                  <div style={{
                    fontSize: 8, color: '#64748B', fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}>App in development</div>
                </div>

                </div> {/* end wrapper */}

              </div>
            </div>

          </div>
        
      </section>
    </>
  );
}