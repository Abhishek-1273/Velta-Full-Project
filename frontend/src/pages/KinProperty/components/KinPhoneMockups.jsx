import { 
  BsSearch, 
  BsGeoAltFill, 
  BsBellFill, 
  BsCheckCircleFill, 
  BsHouseDoorFill, 
  BsBuilding, 
  BsGridFill, 
  BsWhatsapp, 
  BsTelephoneFill,
  BsPlusCircleFill,
  BsShieldCheck,
  BsStarFill,
  BsArrowRightShort,
  BsHeartFill,
  BsChatDotsFill,
  BsSendFill,
  BsEyeFill,
  BsPlayFill,
  BsMusicNoteBeamed,
  BsInstagram,
  BsFileEarmarkPdfFill,
  BsCheckAll,
  BsArrowLeft,
  BsCameraVideoFill,
  BsMicFill
} from 'react-icons/bs'
import styles from './KinPhoneMockups.module.css'

/* =========================================================================
   SCREEN 1: CLIENT PORTAL — PROPERTY LISTINGS & SEARCH
   ========================================================================= */
export function ScreenListingDiscovery() {
  return (
    <div className={styles.phoneScreen}>
      {/* Top App Bar */}
      <div className={styles.appHeader}>
        <div className={styles.brandGroup}>
          <div className={styles.brandMonogram}>K</div>
          <div>
            <span className={styles.brandName}>Kin Property</span>
            <div className={styles.locationPill}>
              <BsGeoAltFill size={8} />
              <span>Pune, Maharashtra</span>
            </div>
          </div>
        </div>
        <div className={styles.headerIconBtn}>
          <BsBellFill size={10} />
          <span className={styles.notifDot} />
        </div>
      </div>

      {/* Mini Search Bar */}
      <div className={styles.searchBar}>
        <BsSearch size={10} className={styles.searchIcon} />
        <span className={styles.searchPlaceholder}>Search luxury villas, 3 BHK...</span>
      </div>

      {/* Filter Category Chips */}
      <div className={styles.filterRow}>
        <span className={`${styles.filterChip} ${styles.filterChipActive}`}>All</span>
        <span className={styles.filterChip}>Villas</span>
        <span className={styles.filterChip}>3 BHK</span>
        <span className={styles.filterChip}>Penthouses</span>
      </div>

      {/* Featured Listing Card */}
      <div className={styles.featuredCard}>
        <div className={styles.cardImageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80" 
            alt="Villa Serenity" 
            className={styles.cardImage} 
          />
          <div className={styles.imageOverlayBadge}>
            <BsShieldCheck size={9} />
            <span>VERIFIED MLS</span>
          </div>
          <div className={styles.priceTagPill}>₹2.85 Cr</div>
        </div>

        <div className={styles.cardContent}>
          <h5 className={styles.propertyTitle}>Villa Serenity, Koregaon Park</h5>
          <p className={styles.propertySpecs}>4 Beds &bull; 4 Baths &bull; 3,800 Sq Ft</p>
          <div className={styles.cardFooter}>
            <div className={styles.agentMini}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
                alt="Agent" 
                className={styles.agentImg} 
              />
              <span className={styles.agentName}>Kin Verified Agent</span>
              <BsCheckCircleFill className={styles.verifiedCheck} size={8} />
            </div>
            <button className={styles.viewBtn}>View</button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Listing Preview */}
      <div className={styles.miniPropertyRow}>
        <div className={styles.miniThumbWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80" 
            alt="Emerald Heights" 
            className={styles.miniThumb} 
          />
        </div>
        <div className={styles.miniDetails}>
          <span className={styles.miniTitle}>Emerald Heights, Baner</span>
          <span className={styles.miniPrice}>₹85,000 / mo</span>
          <span className={styles.miniSpecs}>3 BHK &bull; Ready to Move</span>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SCREEN 2: AGENT CRM & INCOMING LEAD DISPATCH
   ========================================================================= */
export function ScreenAgentCrm() {
  return (
    <div className={styles.phoneScreen}>
      {/* Top Admin Header */}
      <div className={styles.adminHeader}>
        <div>
          <span className={styles.adminBadge}>AGENCY CRM</span>
          <h4 className={styles.adminTitle}>KIN Admin Hub</h4>
        </div>
        <div className={styles.adminLiveStatus}>
          <span className={styles.livePulse} />
          <span>LIVE</span>
        </div>
      </div>

      {/* 3 Metric Summary Boxes */}
      <div className={styles.crmStatsRow}>
        <div className={styles.crmStatBox}>
          <span className={styles.crmStatVal}>48</span>
          <span className={styles.crmStatLabel}>Active</span>
        </div>
        <div className={styles.crmStatBox}>
          <span className={styles.crmStatVal} style={{ color: '#10B981' }}>18</span>
          <span className={styles.crmStatLabel}>New Leads</span>
        </div>
        <div className={styles.crmStatBox}>
          <span className={styles.crmStatVal} style={{ color: '#3157E8' }}>₹62L</span>
          <span className={styles.crmStatLabel}>Pipeline</span>
        </div>
      </div>

      {/* Live Inquiries Feed Header */}
      <div className={styles.inquiriesHeaderRow}>
        <span className={styles.inquiriesTitle}>Live Buyer Inquiries</span>
        <span className={styles.inquiriesFilter}>All WhatsApp</span>
      </div>

      {/* Inquiry Item 1 */}
      <div className={styles.leadCard}>
        <div className={styles.leadTopRow}>
          <div className={styles.leadAvatarCircle}>VM</div>
          <div className={styles.leadInfo}>
            <span className={styles.leadName}>Vikram Mehta</span>
            <span className={styles.leadProperty}>Villa Serenity &bull; 4 BHK</span>
          </div>
          <span className={styles.leadTagHigh}>High Intent</span>
        </div>
        <div className={styles.leadMessageSnippet}>
          <BsWhatsapp size={9} color="#10B981" />
          <span>&ldquo;Is the weekend walkthrough available at 11 AM?&rdquo;</span>
        </div>
        <div className={styles.leadMetaRow}>
          <span className={styles.leadTime}>2 min ago</span>
          <span className={styles.leadActionText}>Assign to Agent &rarr;</span>
        </div>
      </div>

      {/* Inquiry Item 2 */}
      <div className={styles.leadCard}>
        <div className={styles.leadTopRow}>
          <div className={styles.leadAvatarCircle} style={{ background: '#7C3AED' }}>PR</div>
          <div className={styles.leadInfo}>
            <span className={styles.leadName}>Pooja Roy</span>
            <span className={styles.leadProperty}>Emerald Heights &bull; Baner</span>
          </div>
          <span className={styles.leadTagNew}>New</span>
        </div>
        <div className={styles.leadMessageSnippet}>
          <BsWhatsapp size={9} color="#10B981" />
          <span>Requested digital floorplan and title verification deed</span>
        </div>
        <div className={styles.leadMetaRow}>
          <span className={styles.leadTime}>14 min ago</span>
          <span className={styles.leadActionText}>Reply via WhatsApp &rarr;</span>
        </div>
      </div>

      {/* Quick Add Button */}
      <button className={styles.addPropertyBtn}>
        <BsPlusCircleFill size={10} />
        <span>+ Add New Listing</span>
      </button>
    </div>
  )
}

/* =========================================================================
   SCREEN 3: PROPERTY DETAILS & 1-CLICK WHATSAPP BOOKING
   ========================================================================= */
export function ScreenPropertyDetail() {
  return (
    <div className={styles.phoneScreen}>
      {/* Full-width Hero Photo */}
      <div className={styles.detailHeroWrapper}>
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" 
          alt="The Grand Orchid Penthouse" 
          className={styles.detailHeroImg} 
        />
        <div className={styles.detailTagRow}>
          <span className={styles.detailBadgeVerified}>
            <BsShieldCheck size={9} /> Verified Land Registry
          </span>
          <span className={styles.detailBadgeRating}>
            <BsStarFill size={8} color="#F59E0B" /> 4.9 (24)
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className={styles.detailBody}>
        <div className={styles.priceRow}>
          <div>
            <span className={styles.priceNumber}>₹1,25,000</span>
            <span className={styles.pricePeriod}> / month</span>
          </div>
          <span className={styles.statusPill}>Available Now</span>
        </div>

        <h4 className={styles.detailHeading}>The Grand Orchid Penthouse</h4>
        <p className={styles.detailLocation}>
          <BsGeoAltFill size={9} /> Baner Main Road, Pune
        </p>

        {/* 4 Feature Chips */}
        <div className={styles.specsGrid}>
          <div className={styles.specBox}>
            <span className={styles.specValue}>4 Beds</span>
            <span className={styles.specLabel}>Master Suites</span>
          </div>
          <div className={styles.specBox}>
            <span className={styles.specValue}>4 Baths</span>
            <span className={styles.specLabel}>Modern Fitted</span>
          </div>
          <div className={styles.specBox}>
            <span className={styles.specValue}>3,600</span>
            <span className={styles.specLabel}>Sq. Ft. Carpet</span>
          </div>
          <div className={styles.specBox}>
            <span className={styles.specValue}>2 Parking</span>
            <span className={styles.specLabel}>Covered Stalls</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionRow}>
          <a 
            href="https://kinpropertymanagement.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.whatsappActionBtn}
          >
            <BsWhatsapp size={12} />
            <span>Direct WhatsApp Inquiry</span>
          </a>
          <button className={styles.tourActionBtn}>
            <BsTelephoneFill size={10} />
            <span>Schedule Tour</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SCREEN 4: SOCIAL MEDIA & REELS WALKTHROUGH
   ========================================================================= */
export function ScreenSocialReel() {
  return (
    <div className={styles.phoneScreen}>
      {/* Top Reel Navigation Bar */}
      <div className={styles.reelTopBar}>
        <span className={styles.reelTopTitle}>Reels</span>
        <div className={styles.reelTopActions}>
          <BsInstagram size={11} className={styles.igIconTop} />
          <BsMusicNoteBeamed size={10} />
        </div>
      </div>

      {/* Main Reel Visual Frame */}
      <div className={styles.reelFrame}>
        {/* Background Property Image with Overlay */}
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" 
          alt="Baner Luxury Penthouse Reel" 
          className={styles.reelMediaImg} 
        />
        <div className={styles.reelGradientOverlay} />

        {/* Center Glassmorphic Play Button */}
        <div className={styles.reelCenterPlayBtn}>
          <BsPlayFill size={26} />
        </div>

        {/* Right Floating Interaction Rail */}
        <div className={styles.reelActionRail}>
          <div className={styles.reelActionItem}>
            <div className={styles.actionIconBox}><BsHeartFill size={15} color="#EF4444" /></div>
            <span>18.4K</span>
          </div>
          <div className={styles.reelActionItem}>
            <div className={styles.actionIconBox}><BsChatDotsFill size={14} /></div>
            <span>482</span>
          </div>
          <div className={styles.reelActionItem}>
            <div className={styles.actionIconBox}><BsSendFill size={13} /></div>
            <span>2.1K</span>
          </div>
          <div className={styles.reelActionItem}>
            <div className={styles.actionIconBox}><BsEyeFill size={14} /></div>
            <span>284K</span>
          </div>
        </div>

        {/* Bottom Profile & Caption Overlay */}
        <div className={styles.reelBottomMeta}>
          <div className={styles.reelAccountRow}>
            <div className={styles.reelAvatar}>K</div>
            <span className={styles.reelHandle}>kinpropertymanagement</span>
            <BsCheckCircleFill size={10} color="#38BDF8" />
            <span className={styles.followBadge}>Follow</span>
          </div>
          
          <p className={styles.reelCaption}>
            📍 Baner High Street | Luxury 3 BHK Penthouse with 42ft private deck. Verified carpet area. Direct WhatsApp viewings 📲
          </p>

          <div className={styles.reelAudioRow}>
            <BsMusicNoteBeamed size={9} />
            <span>KIN Property &bull; Original Audio</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SCREEN 5: WHATSFLOW CRM — DIRECT WHATSAPP LEAD INBOX & BOT DISPATCH
   ========================================================================= */
export function ScreenWhatsFlowChat() {
  return (
    <div className={styles.phoneScreen} style={{ background: '#EFEAE2' }}>
      {/* WhatsApp Chat Top Header */}
      <div className={styles.waHeader}>
        <div className={styles.waHeaderLeft}>
          <BsArrowLeft size={10} color="#FFFFFF" />
          <div className={styles.waAvatarBox}>
            <span>K</span>
            <span className={styles.waOnlineDot} />
          </div>
          <div className={styles.waContactMeta}>
            <div className={styles.waNameRow}>
              <span className={styles.waContactName}>KIN Property Lead Hub</span>
              <BsCheckCircleFill size={7} color="#25D366" />
            </div>
            <span className={styles.waOnlineStatus}>Online &bull; Automated Routing</span>
          </div>
        </div>
        <div className={styles.waHeaderRight}>
          <BsCameraVideoFill size={11} color="#FFFFFF" />
          <BsTelephoneFill size={10} color="#FFFFFF" />
        </div>
      </div>

      {/* WhatsApp Message Canvas */}
      <div className={styles.waChatArea}>
        {/* Date pill */}
        <div className={styles.waDatePill}>TODAY</div>

        {/* Security badge */}
        <div className={styles.waEncryptedNotice}>
          🔒 End-to-end encrypted &bull; Direct Broker Handoff
        </div>

        {/* 1. Inbound Buyer Inquiry */}
        <div className={styles.waMsgOutbound}>
          <div className={styles.waBubbleOut}>
            <p className={styles.waMsgText}>
              Hi KIN, I saw the <strong>Villa Serenity (Baner, 4 BHK)</strong> listing on kinpropertymanagement.com. Can I get the verified RERA floorplan &amp; schedule a walkthrough this weekend?
            </p>
            <div className={styles.waMsgMeta}>
              <span className={styles.waMsgTime}>10:42 AM</span>
              <BsCheckAll size={11} color="#53BDEB" />
            </div>
          </div>
        </div>

        {/* 2. WhatsFlow Bot Instant Response (0.8s) */}
        <div className={styles.waMsgInbound}>
          <div className={styles.waBubbleIn}>
            <div className={styles.waBotBadge}>
              <span className={styles.botBadgePulse} />
              <span>WhatsFlow Bot &bull; Instant Dossier</span>
            </div>
            <p className={styles.waMsgText}>
              Hello Vikram! 👋 Thanks for your inquiry. We&apos;ve assigned your lead to <strong>Dhruv (Senior Broker, Baner)</strong>. Here is your verified dossier:
            </p>

            {/* Document Attachment Card */}
            <div className={styles.waDocAttachment}>
              <div className={styles.waDocIconBox}>
                <BsFileEarmarkPdfFill size={14} color="#EF4444" />
              </div>
              <div className={styles.waDocMeta}>
                <span className={styles.waDocTitle}>Villa_Serenity_Baner_Dossier.pdf</span>
                <span className={styles.waDocSub}>3.8 MB &bull; Certified RERA</span>
              </div>
            </div>

            <div className={styles.waMsgMeta}>
              <span className={styles.waMsgTime}>10:42 AM</span>
            </div>
          </div>
        </div>

        {/* 3. Broker Personal Message (Dhruv) */}
        <div className={styles.waMsgInbound}>
          <div className={styles.waBubbleIn}>
            <div className={styles.waAgentBadge}>
              <span>Dhruv (Assigned Broker)</span>
            </div>
            <p className={styles.waMsgText}>
              Hi Vikram! Dhruv here. We have 2 VIP walkthrough slots this Saturday: <strong>11:30 AM</strong> or <strong>4:00 PM</strong>. Which suits you?
            </p>

            {/* Fast Action Chips */}
            <div className={styles.waActionChipsRow}>
              <span className={styles.waChipActive}>Saturday 11:30 AM</span>
              <span className={styles.waChip}>Saturday 4:00 PM</span>
            </div>

            <div className={styles.waMsgMeta}>
              <span className={styles.waMsgTime}>10:43 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Input Mock Bar */}
      <div className={styles.waInputBar}>
        <div className={styles.waFakeInput}>
          <span>Confirm Saturday 11:30 AM...</span>
        </div>
        <div className={styles.waMicCircle}>
          <BsMicFill size={10} color="#FFFFFF" />
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SCREEN 6: WHATSFLOW EMPLOYEE VIEW — TODAY'S LEADS & FAST DISPATCH
   ========================================================================= */
export function ScreenEmployeeApp() {
  return (
    <div className={styles.phoneScreen}>
      {/* Top Employee Header */}
      <div className={styles.adminHeader} style={{ background: '#0F172A', padding: '8px 10px' }}>
        <div>
          <span className={styles.adminBadge} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ADE80' }}>
            EMPLOYEE PORTAL
          </span>
          <h4 className={styles.adminTitle} style={{ color: '#FFFFFF', margin: '2px 0 0' }}>Today&apos;s Leads</h4>
        </div>
        <div className={styles.adminLiveStatus}>
          <span className={styles.livePulse} style={{ background: '#10B981' }} />
          <span style={{ color: '#E2E8F0', fontSize: '7.5px' }}>dhruv@kin</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterRow} style={{ padding: '6px 10px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <span className={`${styles.filterChip} ${styles.filterChipActive}`}>All (5)</span>
        <span className={styles.filterChip} style={{ color: '#D97706', background: '#FEF3C7' }}>Pending (3)</span>
        <span className={styles.filterChip} style={{ color: '#2563EB', background: '#EFF6FF' }}>Contacted</span>
      </div>

      {/* Inbound Lead 1 */}
      <div className={styles.leadCard} style={{ margin: '6px 10px', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px', background: '#FFFFFF' }}>
        <div className={styles.leadTopRow}>
          <div className={styles.leadAvatarCircle} style={{ background: '#3157E8' }}>VM</div>
          <div className={styles.leadInfo}>
            <span className={styles.leadName}>Vikram Mehta</span>
            <span className={styles.leadProperty}>Villa Serenity &bull; 4 BHK Baner</span>
          </div>
          <span className={styles.leadTagHigh} style={{ background: '#FEF3C7', color: '#D97706', padding: '1px 5px', borderRadius: '3px', fontSize: '6.5px', fontWeight: 800 }}>
            Pending
          </span>
        </div>
        <div className={styles.leadMessageSnippet} style={{ margin: '4px 0', fontSize: '7px', color: '#475569' }}>
          <span>Budget: ₹2.85 Cr &bull; Requested floorplan &amp; walkthrough</span>
        </div>
        <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px 0', fontSize: '7px', fontWeight: 700, cursor: 'pointer' }}>
            <BsWhatsapp size={8} /> WhatsApp
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', background: '#EFF6FF', color: '#2563EB', border: '0.5px solid #BFDBFE', borderRadius: '4px', padding: '3px 0', fontSize: '7px', fontWeight: 700, cursor: 'pointer' }}>
            <BsTelephoneFill size={7} /> Call Lead
          </button>
        </div>
      </div>

      {/* Inbound Lead 2 */}
      <div className={styles.leadCard} style={{ margin: '6px 10px', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px', background: '#FFFFFF' }}>
        <div className={styles.leadTopRow}>
          <div className={styles.leadAvatarCircle} style={{ background: '#7C3AED' }}>PR</div>
          <div className={styles.leadInfo}>
            <span className={styles.leadName}>Pooja Roy</span>
            <span className={styles.leadProperty}>Emerald Heights &bull; 3 BHK</span>
          </div>
          <span className={styles.leadTagNew} style={{ background: '#DCFCE7', color: '#16A34A', padding: '1px 5px', borderRadius: '3px', fontSize: '6.5px', fontWeight: 800 }}>
            Contacted
          </span>
        </div>
        <div className={styles.leadMessageSnippet} style={{ margin: '4px 0', fontSize: '7px', color: '#475569' }}>
          <span>Budget: ₹85K/mo &bull; Site visit scheduled for Saturday 4 PM</span>
        </div>
        <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px 0', fontSize: '7px', fontWeight: 700, cursor: 'pointer' }}>
            <BsWhatsapp size={8} /> WhatsApp
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', background: '#EFF6FF', color: '#2563EB', border: '0.5px solid #BFDBFE', borderRadius: '4px', padding: '3px 0', fontSize: '7px', fontWeight: 700, cursor: 'pointer' }}>
            <BsTelephoneFill size={7} /> Call Lead
          </button>
        </div>
      </div>

      {/* Quick Summary Bar */}
      <div style={{ marginTop: 'auto', padding: '6px 10px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: '#64748B', fontWeight: 700 }}>
        <span>5 Active Leads Today</span>
        <span style={{ color: '#16A34A' }}>Avg Reply: 2.1m</span>
      </div>
    </div>
  )
}
