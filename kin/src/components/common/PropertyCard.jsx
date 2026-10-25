import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bed, Bath, Square, MapPin, ArrowRight, Car, ShieldCheck, Users, Calendar, Utensils, Fence, Maximize2, Compass, Home } from 'lucide-react';
import { useWishlist, useAuth } from '../../contexts';
import Tilt from './Tilt';

const badgeStyles = {
  gold: 'bg-gold text-white',
  green: 'bg-emerald-500 text-white',
  red: 'bg-red-500 text-white',
  blue: 'bg-sky-500 text-white',
};

function formatSmartPrice(price, priceLabel) {
  const num = parseFloat(String(price).replace(/[^0-9.]/g, ''));
  if (!num || isNaN(num)) return priceLabel || '—';
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 1)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
  return `₹${num.toLocaleString()}`;
}

/* ─── Map any property type → one of 4 canonical labels ─────────────────── */
const TYPE_MAP = {
  // Residential variants
  'apartment':           'Residential',
  'independent house':   'Residential',
  'gated community villa':'Residential',
  'standalone building': 'Residential',
  'penthouse':           'Residential',
  'residential':         'Residential',
  'pg/hostel':           'Residential',
  'flatmates':           'Residential',
  '1 rk':               'Residential',
  // Commercial
  'commercial':          'Commercial',
  'office':              'Commercial',
  'shop':                'Commercial',
  'showroom':            'Commercial',
  // Plot / Land
  'plot':                'Land/Plot',
  'land':                'Land/Plot',
  'land/plot':           'Land/Plot',
  'farm house':          'Land/Plot',
  'farmhouse':           'Land/Plot',
  // Villa
  'villa':               'Villa',
};

function canonicalType(raw) {
  if (!raw) return 'Residential';
  return TYPE_MAP[raw.toLowerCase()] || raw;
}

/* ─── Image Cycler on hover ─────────────────────────────────────────────── */
function ImageCycler({ images, alt, fallback }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  const allImages = images?.length > 0 ? images : [fallback];

  const startCycle = useCallback(() => {
    if (allImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % allImages.length);
        setFade(true);
      }, 180);
    }, 1200);
  }, [allImages.length]);

  const stopCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    setIdx(0);
    setFade(true);
  }, []);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <img
        src={allImages[idx]}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.18s ease, transform 0.5s ease' }}
      />

      {/* Dot indicators — only show if multiple images */}
      {allImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {allImages.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 16 : 6,
                height: 6,
                background: i === idx ? 'linear-gradient(135deg, #B8860B, #C9940A)' : 'rgba(255,255,255,0.55)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── LIST VIEW ─────────────────────────────────────────────────────────── */
function ListCard({ property }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user, openAuth } = useAuth();
  const navigate = useNavigate();
  const wished = isWishlisted(property._id || property.id);
  const fallback = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80';
  const images = property.images?.length > 0 ? property.images : property.image ? [property.image] : [fallback];

  const isPlotCard = ['plot','land','land/plot'].includes(String(property.type || property.propertyType || '').toLowerCase());
  const isVillaCard = ['villa'].includes(String(property.type || property.propertyType || '').toLowerCase());
  const isFlatmateCard = String(property.listingType || property.type || '').toLowerCase().includes('flatmate') || Boolean(property.tenantType && !property.pgName);
  const isCommercialCard = !isFlatmateCard && (String(property.type || property.propertyType || '').toLowerCase().includes('commercial') || Boolean(property.commercialPropertyType || property.buildingType));
  const tags = isPlotCard ? [
    property.area > 0 ? `${property.area?.toLocaleString()} sqft` : null,
    property.gatedProject ? `Gated: ${property.gatedProject}` : null,
    property.cornerPlot ? `Corner: ${property.cornerPlot}` : null,
    property.facing ? property.facing : null,
  ].filter(Boolean) : isVillaCard ? [
    property.villaType ? property.villaType : null,
    property.bhkType ? property.bhkType : null,
    property.gatedProject ? `Gated: ${property.gatedProject}` : null,
    property.facing ? property.facing : null,
  ].filter(Boolean) : isCommercialCard ? [
    property.furnishing ? property.furnishing : null,
    property.status ? property.status : null,
    property.facing ? property.facing : null,
    ((property.parkingType || property.parking) && (property.parkingType || property.parking) !== 'None' && (property.parkingType || property.parking) !== 0) ? 'Parking' : null,
  ].filter(Boolean) : isFlatmateCard ? [
    property.furnishing ? property.furnishing : null,
    property.tenantType ? property.tenantType : null,
    property.facing ? property.facing : null,
    property.availableFrom ? property.availableFrom : null,
  ].filter(Boolean) : [
    property.furnishing,
    property.status,
    property.bhkType ? property.bhkType : null,
    property.preferredTenant ? `For ${property.preferredTenant}` : null,
    property.pgGender ? `${property.pgGender} Only` : null,
    property.facing ? property.facing : null,
    ((property.parkingType || property.parking) && (property.parkingType || property.parking) !== 'None' && (property.parkingType || property.parking) !== 0) ? 'Parking' : null,
  ].filter(Boolean);

  console.log('PropertyCard title:', property.title, 'facing:', property.facing, 'bhkType:', property.bhkType, 'preferredTenant:', property.preferredTenant);

  return (
    <div
      onClick={() => navigate(`/properties/${property._id || property.id}`)}
      className="bg-white dark:bg-navy-light rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10 flex flex-col sm:flex-row group cursor-pointer relative"
    >
      {/* ── Image ── */}
      <div className="relative shrink-0 w-full sm:w-[180px] md:w-[260px] h-48 sm:h-44 md:h-52">
        <ImageCycler images={images} alt={property.title} fallback={fallback} />
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(7,26,47,0.5) 0%, transparent 55%)' }} />
        {property.badge && (
          <span className="absolute top-3 left-3 text-[9px] font-black px-3 py-1.5 rounded-full z-[2] bg-gold text-white tracking-wider uppercase">
            {property.badge}
          </span>
        )}
        {/* Price on image bottom */}
        <div className="absolute bottom-3 left-3 z-[2]">
          <p className="font-display font-black text-white text-lg leading-none drop-shadow">
            {formatSmartPrice(property.price, property.priceLabel)}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 md:p-5 flex-1 flex flex-col md:flex-row justify-between gap-5 min-w-0">

        {/* Left Sub-Column */}
        <div className="flex-1 flex flex-col gap-2.5 min-w-0">
          {/* Row 1: Title + type badge + wishlist */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-navy dark:text-white text-base md:text-[17px] leading-snug line-clamp-1 group-hover:text-gold transition-colors">
                {property.title}
              </h3>
              {property.developer && (
                <p className="text-[10px] md:text-[11px] font-accent font-black tracking-wider text-gold uppercase mt-0.5">
                  By {property.developer}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-ink-muted dark:text-white/60">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#B8860B' }} />
                <span className="truncate">{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 md:hidden">
              <span className="badge-gold text-[10px]">{canonicalType(property.type)}</span>
              <button
                onClick={e => { e.stopPropagation(); if (!user) { openAuth(); return; } toggleWishlist(property); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${wished ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'}`}
              >
                <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Row 2: Key stats — Bed / Bath / Sqft — prominent */}
          <div className="flex flex-wrap items-center gap-x-4 md:gap-5 gap-y-2">
            {/* PG-specific stats */}
            {(() => {
              const isPG = String(property.listingType || property.type || '').toLowerCase().includes('pg') || Boolean(property.pgName || property.pgGender);
              if (!isPG) return null;
              return (
                <>
                  {property.pgGender && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Users className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.pgGender}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">For</p>
                      </div>
                    </div>
                  )}
                  {Array.isArray(property.pgRooms) && property.pgRooms.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Bed className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.pgRooms.join(', ')}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Rooms</p>
                      </div>
                    </div>
                  )}
                  {(() => {
                    const food = Array.isArray(property.pgFood)
                      ? property.pgFood
                      : (property.pgFood ? String(property.pgFood).split(',').map(v => v.trim()).filter(Boolean) : []);
                    if (!food.length) return null;
                    const allMeals = ['Breakfast', 'Lunch', 'Dinner'];
                    const isAll = allMeals.every(m => food.includes(m));
                    const label = isAll ? 'All Meals' : food.join(', ');
                    return (
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                          <Utensils className="w-4 h-4" style={{ color: '#B8860B' }} />
                        </div>
                        <div>
                          <p className="text-[14px] font-black text-navy dark:text-white leading-none">{label}</p>
                          <p className="text-[10px] text-gray-400 leading-none mt-0.5">Food</p>
                        </div>
                      </div>
                    );
                  })()}
                  {property.availableFrom && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Calendar className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.availableFrom}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Available</p>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
            {/* Plot-specific stats */}
            {(() => {
              const isPlot = ['plot','land','land/plot'].includes(String(property.type || property.propertyType || '').toLowerCase());
              if (!isPlot) return null;
              return (
                <>
                  {property.area > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Maximize2 className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.area?.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">sqft</p>
                      </div>
                    </div>
                  )}
                  {property.facing && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Compass className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.facing}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Facing</p>
                      </div>
                    </div>
                  )}
                  {property.cornerPlot && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Home className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.cornerPlot}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Corner Plot</p>
                      </div>
                    </div>
                  )}
                  {property.boundaryWall && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Fence className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.boundaryWall}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Boundary Wall</p>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
            {/* Flatmate-specific stats */}
            {(() => {
              if (!isFlatmateCard) return null;
              return (
                <>
                  {property.roomType && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Bed className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.roomType}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Room Type</p>
                      </div>
                    </div>
                  )}
                  {property.tenantType && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Users className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.tenantType}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Tenant Type</p>
                      </div>
                    </div>
                  )}
                  {property.area > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Maximize2 className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.area?.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">sqft</p>
                      </div>
                    </div>
                  )}
                  {property.availableFrom && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Calendar className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.availableFrom}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Available</p>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
            {/* Villa-specific stats */}
            {(() => {
              if (!isVillaCard) return null;
              return (
                <>
                  {property.villaType && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Home className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.villaType}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Type</p>
                      </div>
                    </div>
                  )}
                  {property.bhkType && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Bed className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.bhkType}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">BHK</p>
                      </div>
                    </div>
                  )}
                  {property.area > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Maximize2 className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.area?.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">sqft</p>
                      </div>
                    </div>
                  )}
                  {property.facing && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                        <Compass className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.facing}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-0.5">Facing</p>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
            {property.bedrooms != null && property.bedrooms > 0 && !isVillaCard && !isFlatmateCard && !isCommercialCard && (
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                  <Bed className="w-4 h-4" style={{ color: '#B8860B' }} />
                </div>
                <div>
                  <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.bedrooms}</p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">Bedroom{property.bedrooms !== 1 ? 's' : ''}</p>
                </div>
              </div>
            )}
            {property.bathrooms != null && property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                  <Bath className="w-4 h-4" style={{ color: '#B8860B' }} />
                </div>
                <div>
                  <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.bathrooms}</p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">Bathroom{property.bathrooms !== 1 ? 's' : ''}</p>
                </div>
              </div>
            )}
            {property.area > 0 && !isPlotCard && !isVillaCard && !isFlatmateCard && (
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                  <Square className="w-4 h-4" style={{ color: '#B8860B' }} />
                </div>
                <div>
                  <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.area?.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">sqft</p>
                </div>
              </div>
            )}
            {!isPlotCard && !isVillaCard && !isFlatmateCard && (property.parkingType || property.parking) && (property.parkingType || property.parking) !== 'None' && (property.parkingType || property.parking) !== 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#B8860B18' }}>
                  <Car className="w-4 h-4" style={{ color: '#B8860B' }} />
                </div>
                <div>
                  <p className="text-[14px] font-black text-navy dark:text-white leading-none">{property.parkingType || property.parking}</p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">Parking</p>
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/60">
                  {tag}
                </span>
              ))}
              {property.rera && (
                <span className="flex items-center gap-0.5 px-2.5 py-1 rounded-md text-[11px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-500/10">
                  <ShieldCheck className="w-3.5 h-3.5" /> RERA
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Sub-Column — Fill empty desktop space with detailed info & CTAs */}
        <div className="hidden md:flex w-[180px] lg:w-[220px] shrink-0 flex-col justify-between border-l border-gray-100 dark:border-white/10 pl-5 gap-3">
          {/* Top category & wishlist button */}
          <div className="flex items-center justify-between">
            <span className="badge-gold text-[10px]">{canonicalType(property.type)}</span>
            <button
              onClick={e => { e.stopPropagation(); if (!user) { openAuth(); return; } toggleWishlist(property); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${wished ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-400 hover:bg-red-50 hover:text-red-400'}`}
            >
              <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Detailed Info Grid */}
          {(() => {
            const isPG = String(property.listingType || property.type || '').toLowerCase().includes('pg') || Boolean(property.pgName || property.pgGender);
            return (
              <div className="flex flex-col gap-2 text-[11px]">
                {isPG ? (
                  <>
                    {property.pgGender && (
                      <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                        <span className="text-slate-400">For</span>
                        <span className="text-navy dark:text-white font-bold">{property.pgGender}</span>
                      </div>
                    )}
                    {property.availableFrom && (
                      <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                        <span className="text-slate-400">Available</span>
                        <span className="text-navy dark:text-white font-bold">{property.availableFrom}</span>
                      </div>
                    )}
                    {property.status && (
                      <div className="flex justify-between items-center pb-1">
                        <span className="text-slate-400">Possession</span>
                        <span className="text-navy dark:text-white font-bold">{property.status}</span>
                      </div>
                    )}
                  </>
                ) : isCommercialCard ? (
                    <>
                      {property.facing && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Facing</span>
                          <span className="text-navy dark:text-white font-bold">{property.facing}</span>
                        </div>
                      )}
                      {property.status && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Status</span>
                          <span className="text-navy dark:text-white font-bold">{property.status}</span>
                        </div>
                      )}
                      {property.availableFrom && (
                        <div className="flex justify-between items-center pb-1">
                          <span className="text-slate-400">Available</span>
                          <span className="text-navy dark:text-white font-bold">{property.availableFrom}</span>
                        </div>
                      )}
                    </>
                ) : isFlatmateCard ? (
                    <>
                      {property.tenantType && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Tenant Type</span>
                          <span className="text-navy dark:text-white font-bold">{property.tenantType}</span>
                        </div>
                      )}
                      {property.roomType && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Room Type</span>
                          <span className="text-navy dark:text-white font-bold">{property.roomType}</span>
                        </div>
                      )}
                      {property.availableFrom && (
                        <div className="flex justify-between items-center pb-1">
                          <span className="text-slate-400">Available</span>
                          <span className="text-navy dark:text-white font-bold">{property.availableFrom}</span>
                        </div>
                      )}
                    </>
                ) : isVillaCard ? (
                    <>
                      {property.villaType && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Villa Type</span>
                          <span className="text-navy dark:text-white font-bold">{property.villaType}</span>
                        </div>
                      )}
                      {property.gatedProject && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Gated</span>
                          <span className="text-navy dark:text-white font-bold">{property.gatedProject}</span>
                        </div>
                      )}
                      {property.facing && (
                        <div className="flex justify-between items-center pb-1">
                          <span className="text-slate-400">Facing</span>
                          <span className="text-navy dark:text-white font-bold">{property.facing}</span>
                        </div>
                      )}
                    </>
                  ) : isPlotCard ? (
                    <>
                      {property.cornerPlot && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Corner Plot</span>
                          <span className="text-navy dark:text-white font-bold">{property.cornerPlot}</span>
                        </div>
                      )}
                      {property.boundaryWall && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Boundary Wall</span>
                          <span className="text-navy dark:text-white font-bold">{property.boundaryWall}</span>
                        </div>
                      )}
                      {property.gatedProject && (
                        <div className="flex justify-between items-center pb-1">
                          <span className="text-slate-400">Gated Project</span>
                          <span className="text-navy dark:text-white font-bold">{property.gatedProject}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {property.preferredTenant && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Tenants</span>
                          <span className="text-navy dark:text-white font-bold">{property.preferredTenant}</span>
                        </div>
                      )}
                      {property.facing && (
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 dark:border-white/5 pb-1">
                          <span className="text-slate-400">Facing</span>
                          <span className="text-navy dark:text-white font-bold">{property.facing}</span>
                        </div>
                      )}
                      {property.status && (
                        <div className="flex justify-between items-center pb-1">
                          <span className="text-slate-400">Possession</span>
                          <span className="text-navy dark:text-white font-bold">{property.status}</span>
                        </div>
                      )}
                    </>
                  )}
              </div>
            );
          })()}

          {/* Action CTA Button */}
          <div className="mt-auto">
            <div className="w-full py-2.5 px-4 rounded-xl text-[11px] font-accent font-bold tracking-wider uppercase text-white bg-gold hover:bg-gold-light transition-all shadow-sm text-center transform hover:scale-[1.02] active:scale-[0.98]">
              View Details
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── GRID VIEW (compact, landscape image) ──────────────────────────────── */
export default function PropertyCard({ property, view = 'grid' }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user, openAuth } = useAuth();
  const navigate = useNavigate();
  const wished = isWishlisted(property._id || property.id);

  const fallback = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80';
  const images = property.images?.length > 0 ? property.images : property.image ? [property.image] : [fallback];

  if (view === 'list') return <ListCard property={property} />;

  return (
    <div
      onClick={() => navigate(`/properties/${property._id || property.id}`)}
      className="group cursor-pointer bg-white dark:bg-navy-light rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* ── Image — 16:10 landscape ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <ImageCycler images={images} alt={property.title} fallback={fallback} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(7,26,47,0.72) 0%, rgba(7,26,47,0.08) 55%, transparent 100%)' }}
        />

        {/* Badge */}
        {property.badge && (
          <span className={`absolute top-3 left-3 z-[2] text-[8px] font-black px-2.5 py-1 rounded-full tracking-wider ${badgeStyles[property.badgeColor] || badgeStyles.gold}`}>
            {property.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); if (!user) { openAuth(); return; } toggleWishlist(property); }}
          className={`absolute top-3 right-3 z-[2] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-250 backdrop-blur-sm ${wished ? 'bg-red-500 text-white' : 'bg-white/85 text-gray-400 hover:text-red-500 hover:bg-white'}`}
        >
          <motion.div animate={{ scale: wished ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`} />
          </motion.div>
        </button>

        {/* Price overlay on image */}
        <div className="absolute bottom-3 left-3 z-[2]">
          <p className="font-display font-black text-white text-lg leading-none drop-shadow-sm">{formatSmartPrice(property.price, property.priceLabel)}</p>
        </div>

        {/* View arrow — hover */}
        <div className="absolute bottom-3 right-3 z-[2] opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[10px] font-bold" style={{ background: 'linear-gradient(135deg,#B8860B,#C9940A)' }}>
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* ── Body — compact ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Title + type */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-navy dark:text-white text-sm leading-snug line-clamp-1 group-hover:text-gold transition-colors duration-200 flex-1">
            {property.title}
          </h3>
          <span className="badge-gold text-[9px] shrink-0">{canonicalType(property.type)}</span>
        </div>

        {/* Location + status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-ink-muted dark:text-white/60 min-w-0">
            <MapPin className="w-3 h-3 shrink-0" style={{ color: '#B8860B' }} />
            <span className="truncate">{property.location}</span>
          </div>
          {property.status && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 shrink-0">
              {property.status}
            </span>
          )}
        </div>

        {/* PG-specific info */}
        {(() => {
          const isPG = String(property.listingType || property.type || '').toLowerCase().includes('pg') || Boolean(property.pgName || property.pgGender);
          if (!isPG) return null;
          const _food = Array.isArray(property.pgFood)
            ? property.pgFood
            : (property.pgFood ? String(property.pgFood).split(',').map(v => v.trim()).filter(Boolean) : []);
          const _allMeals = ['Breakfast', 'Lunch', 'Dinner'];
          const _foodLabel = _food.length
            ? (_allMeals.every(m => _food.includes(m)) ? '🍽 All Meals' : '🍽 ' + _food.join(', '))
            : null;
          const tags = [
            property.pgGender ? `${property.pgGender} Only` : null,
            property.availableFrom ? property.availableFrom : null,
            _foodLabel,
            ((property.parkingType || property.parking) && (property.parkingType || property.parking) !== 'None' && (property.parkingType || property.parking) !== 'No') ? 'Parking' : null,
          ].filter(Boolean);
          if (!tags.length) return null;
          return (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          );
        })()}

      </div>
    </div>
  );
}