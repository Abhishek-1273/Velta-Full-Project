import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchProperties } from '../../../utils/api';
import { featuredProperties } from '../../../data/properties';
import SectionHeader from '../../../components/common/SectionHeader';
import PropertyCard from '../../../components/common/PropertyCard';
import { fadeUp, staggerContainer } from '../../../animations/variants';

export default function FeaturedProperties() {
  const [list, setList] = useState(featuredProperties.slice(0, 6));

  useEffect(() => {
    let active = true;
    fetchProperties({ featured: 'true', limit: 6 })
      .then((data) => { if (active && data?.properties?.length > 0) setList(data.properties); })
      .catch((err) => console.warn('Featured properties fallback:', err));
    return () => { active = false; };
  }, []);

  return (
    <section className="section-pad bg-surface-alt dark:bg-navy transition-colors duration-300">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeader
            label="Handpicked for You"
            title={<>Featured <span style={{ color: '#B8860B' }}>Properties</span></>}
            description="Every listing personally vetted by our senior advisors. These represent the finest available in India right now."
          />
          <Link to="/properties" className="btn-outline shrink-0 hidden md:inline-flex">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {list.map((p) => (
            <motion.div key={p._id || p.id} variants={fadeUp}>
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All at bottom */}
        <div className="flex justify-center mt-10 md:hidden">
          <Link to="/properties" className="btn-outline w-full text-center justify-center">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
