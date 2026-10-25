import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Target, Heart, Shield, TrendingUp, Star } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../animations/variants';
import SectionHeader from '../../components/common/SectionHeader';
import { useSiteSettings, getBrandName } from '../../contexts';

import PremiumIcon from '../../components/common/PremiumIcon';
import SEO from '../../components/common/SEO';
import { agents } from '../../data/index';
import missionFront from '../../assets/image/mission-front.webp';
import CoverflowCarousel from '../../components/common/CoverflowCarousel';
import { fetchAdvisors } from '../../utils/api';


const values = [
  { icon: <Shield className="w-5 h-5" />, title: 'Integrity', desc: 'Complete transparency at every step. No hidden costs, no surprises.' },
  { icon: <Heart className="w-5 h-5" />, title: 'Client First', desc: 'Your home is our mission. We measure success by your satisfaction.' },
  { icon: <Target className="w-5 h-5" />, title: 'Excellence', desc: 'We accept nothing less than the finest in every property we represent.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Innovation', desc: 'From 3D tours to AI market insights — we lead with technology.' },
  { icon: <Award className="w-5 h-5" />, title: 'Expertise', desc: '15+ years of deep Pune market knowledge, at your service.' },
  { icon: <Star className="w-5 h-5" />, title: 'Luxury Standard', desc: 'Every interaction is designed to match the calibre of our properties.' },
];

export default function About() {
  const { settings } = useSiteSettings();
  const brandName = getBrandName(settings);
  const [showArrows, setShowArrows] = useState(true);
  const [team, setTeam] = useState(agents);

  const [carouselSizing, setCarouselSizing] = useState({
    activeWidth: 380,
    activeHeight: 380,
    restWidth: 150,
    restHeight: 150,
    gap: 16
  });

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth >= 768);
      if (window.innerWidth < 640) {
        setCarouselSizing({
          activeWidth: 265,
          activeHeight: 265,
          restWidth: 80,
          restHeight: 80,
          gap: 10
        });
      } else if (window.innerWidth < 1024) {
        setCarouselSizing({
          activeWidth: 320,
          activeHeight: 320,
          restWidth: 120,
          restHeight: 120,
          gap: 14
        });
      } else {
        setCarouselSizing({
          activeWidth: 380,
          activeHeight: 380,
          restWidth: 150,
          restHeight: 150,
          gap: 16
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch active team members from the backend database
  useEffect(() => {
    fetchAdvisors()
      .then(data => {
        if (data && data.length > 0) {
          setTeam(data);
        }
      })
      .catch(err => {
        console.warn('Could not load dynamic advisors, using defaults:', err);
      });
  }, []);

  const carouselImages = team.map(a => ({
    srcUrl: a.image,
    alt: a.name,
    name: a.name,
    role: a.role,
    experience: a.experience,
    propertiesSold: a.propertiesSold,
    rating: a.rating,
  }));


  return (
    <div className="min-h-screen bg-surface dark:bg-navy-dark pt-24 transition-colors duration-300">
      <SEO
        title={`About Us - Pune's Premium NRI Real Estate Agency`}
        description={`Learn more about ${brandName}, Pune's premier luxury real estate agency. Our mission, values, and expert team of real estate advisors.`}
        url="/about"
      />





      {/* ── Mission + Vision ── */}
      <div className="section-pad bg-surface-alt dark:bg-navy transition-colors duration-300">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <SectionHeader
                label="Our Purpose"
                title={<>Mission & <span style={{ color: '#B8860B' }}>Vision</span></>}
                description={`At ${brandName}, we believe every client deserves not just a property — but a home that amplifies their aspirations.`}
              />
              <div className="mt-8 space-y-5">
                <div className="p-6 rounded-2xl bg-white dark:bg-navy-light border border-gray-100 dark:border-white/10 transition-colors duration-300">
                  <p className="font-display font-bold text-navy dark:text-white text-sm mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" style={{ color: '#B8860B' }} /> Our Mission
                  </p>
                  <p className="text-ink-muted dark:text-white/60 text-sm leading-relaxed">
                    To make luxury real estate accessible, transparent, and joyful — connecting India's finest properties with buyers who truly deserve them.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-navy-light border border-gray-100 dark:border-white/10 transition-colors duration-300">
                  <p className="font-display font-bold text-navy dark:text-white text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: '#B8860B' }} /> Our Vision
                  </p>
                  <p className="text-ink-muted dark:text-white/60 text-sm leading-relaxed">
                    To be India's most trusted luxury real estate platform — known for integrity, expertise, and delivering experiences that exceed every expectation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ height: '400px' }}>
                <img
                  src={missionFront}
                  alt="Pune's Most Trusted Luxury Realty"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7,26,47,0.92) 0%, rgba(7,26,47,0.3) 60%, transparent 100%)' }} />
                <div className="absolute bottom-0 inset-x-0 p-8">
                  <p className="text-white/60 text-[10px] font-accent tracking-[0.22em] uppercase mb-2">Est. 2010 · Pune</p>
                  <p className="text-white font-display font-black text-2xl leading-snug mb-1">
                    Pune's Most <span style={{ color: '#B8860B' }}>Trusted</span> Luxury Realty
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed">15+ years of excellence in premium real estate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="section-pad bg-white dark:bg-navy-dark transition-colors duration-300">
        <div className="container-luxury">
          <SectionHeader label="What We Stand For" title={<>Our Core <span style={{ color: '#B8860B' }}>Values</span></>} align="center" className="mb-16" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="p-7 rounded-2xl h-full transition-all duration-400 hover:-translate-y-2 hover:shadow-card-hover bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/10"
                >
                  <PremiumIcon icon={v.icon} className="mb-5" variant="gold" size="md" />
                  <h3 className="font-display font-bold text-navy dark:text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-ink-muted dark:text-white/60 text-sm leading-[1.85]">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Team ── */}
      <div id="team" className="section-pad bg-surface-alt dark:bg-navy transition-colors duration-300">
        <div className="container-luxury">
          <SectionHeader label="Meet the Team" title={<>Our <span style={{ color: '#B8860B' }}>Luxury Advisors</span></>}
            description="India's most accomplished luxury real estate specialists — with decades of combined experience."
            align="center" className="mb-16" />

          <div className="flex items-center justify-center relative select-none overflow-hidden w-full"
            style={{ height: carouselSizing.activeHeight + 50 }}>
            <CoverflowCarousel
              images={carouselImages}
              activeWidth={carouselSizing.activeWidth}
              activeHeight={carouselSizing.activeHeight}
              restWidth={carouselSizing.restWidth}
              restHeight={carouselSizing.restHeight}
              gap={carouselSizing.gap}
              radius={3}
              showArrows={showArrows}
              arrowColor="#000000"
              arrowBackground="#ffffff"
              arrowSize={46}
              arrowPosition={96}
            />
          </div>
        </div>
      </div>



    </div>
  );
}