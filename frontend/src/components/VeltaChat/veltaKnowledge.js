// veltaKnowledge.js — Role-Based Knowledge Engine for VeltaZ AI
// Completely client-side, zero external API keys needed, instant and 100% reliable.

export const VELTA_KNOWLEDGE = {
  company: {
    name: "VeltaZ",
    tagline: "Business Growth & Digital Systems Partner",
    headquarters: "Pune, Maharashtra, India",
    reach: "Remote-first with clients across India, the Middle East, UK, and globally.",
    email: "hello@veltalabs.net",
    whatsapp: "+91 9960240648",
    whatsappLink: "https://wa.me/919960240648?text=Hi%20VeltaZ%2C%20I%20have%20an%20inquiry.",
    website: "https://veltalabs.net",
    philosophy: "Understand First. Build with Purpose. We diagnose business bottlenecks first and build custom software and growth systems with zero template bloat."
  },
  founders: [
    {
      name: "Dhruv",
      role: "Co-Founder & CEO",
      focus: "Business Growth, Marketing & Client Strategy. Aligns custom software ecosystems with real-world scaling goals."
    },
    {
      name: "Arman",
      role: "Co-Founder & CTO",
      focus: "Ultra-secure backend infrastructures, custom APIs, high-performance databases, and system architecture."
    },
    {
      name: "Abhishek",
      role: "Co-Founder & CPO",
      focus: "Product Perfection, High-Fidelity UX/UI design, and bridging backend logic with world-class user experiences."
    }
  ],
  products: [
    {
      name: "WhatsFlow",
      tag: "WhatsApp Lead Automation",
      desc: "An intelligent lead-management engine that captures incoming WhatsApp leads 24/7, sends instant AI auto-replies, round-robin routes leads to agents, and eliminates drop-off.",
      pricing: {
        starter: "₹9,999 setup + ₹1,499/month",
        growth: "₹19,999 setup + ₹2,999/month (Most Popular ⭐)",
        enterprise: "₹29,999 setup + ₹5,999/month",
        custom: "Starts at ₹4,999 consultation"
      },
      link: "/products/whatsflow"
    },
    {
      name: "Docket14",
      tag: "Legal Practice Management",
      desc: "A modern practice management SaaS for law firms and advocates — manages case transition logs, hearings history, associate task matrices, and client notification vaults.",
      link: "/products/docket14"
    },
    {
      name: "KIN Property",
      tag: "Real Estate Listing Portal & CRM",
      desc: "A luxury property management and listing portal with virtual video tours, verified listings, and an integrated agency admin CRM.",
      link: "/products/kin-property"
    },
    {
      name: "Me & Mine",
      tag: "Compatibility Matchmaking App",
      desc: "An interactive matchmaking mobile application currently under active development, featuring verified profile checks and real-time secure chats.",
      status: "Under Development"
    }
  ],
  services: [
    {
      title: "Website Development",
      desc: "Custom React/Next.js platforms built for speed, conversion, and Lighthouse 98%+ Core Web Vitals.",
      link: "/services/website-development"
    },
    {
      title: "Mobile Applications",
      desc: "Cross-platform iOS & Android mobile apps engineered with 60fps animations, offline sync, and secure APIs.",
      link: "/services/mobile-app-development"
    },
    {
      title: "Automation Systems",
      desc: "Frictionless n8n pipelines, WhatsApp lead routing, webhook syncs, and zero manual data entry.",
      link: "/services/automation-systems"
    },
    {
      title: "SEO & Google Profile",
      desc: "Google 1st page keyword ranking, Google Business Profile (GBP) management, and high-intent editorial content.",
      link: "/services/seo-blogging-google-business-profile"
    },
    {
      title: "Performance Marketing",
      desc: "Data-driven ad campaigns connected directly with automated WhatsApp lead qualifiers.",
      link: "/services/performance-marketing"
    },
    {
      title: "Content Studio & Social Media",
      desc: "Reels, video creation, personal branding, and high-engagement social media campaigns.",
      link: "/content"
    },
    {
      title: "Custom Business Software & CRMs",
      desc: "Private agency portals, internal CRM dashboards, and docket systems engineered around your daily operational workflow.",
      link: "/contact"
    }
  ]
}

export function getVeltaResponse(input = "") {
  const query = input.toLowerCase().trim()

  // 1. GREETINGS
  if (/^(hi|hello|hey|hola|namaste|hlo|heya|yo|good morning|good afternoon|good evening)\b/.test(query)) {
    return (
      "Hi there! I am VeltaZ AI — your virtual guide to VeltaZ.\n\n" +
      "I can help you with:\n" +
      "• Our Products (WhatsFlow, Docket14, KIN Property)\n" +
      "• Services (Websites, Custom CRMs, Automation, SEO)\n" +
      "• WhatsFlow Pricing & Plans\n" +
      "• Booking a Live Demo or Free Consultation\n\n" +
      "What would you like to explore today?"
    )
  }

  // 2. WHATSFLOW & PRICING
  if (/whatsflow|whatsapp|pricing|price|cost|charges|plan|fee|kitna/.test(query)) {
    if (/pricing|price|cost|charges|plan|fee|kitna/.test(query) && !/service|website|custom/.test(query)) {
      return (
        "💼 **WhatsFlow Pricing Plans:**\n\n" +
        "• **Starter Plan:** ₹9,999 setup + ₹1,499/mo\n" +
        "  (Automated replies, basic lead logging)\n\n" +
        "• **Growth Plan (Most Popular ⭐):** ₹19,999 setup + ₹2,999/mo\n" +
        "  (Round-robin team routing, full CRM, analytics)\n\n" +
        "• **Enterprise Plan:** ₹29,999 setup + ₹5,999/mo\n" +
        "  (Multi-branch setups, high volume broadcasts, custom webhook integrations)\n\n" +
        "Need a tailored custom software quote? Visit our [Contact Page](/contact) or chat directly with us on [WhatsApp](https://wa.me/919960240648)."
      )
    }

    return (
      "⚡ **WhatsFlow — WhatsApp Lead Automation:**\n\n" +
      "WhatsFlow turns WhatsApp into your highest-converting sales engine:\n" +
      "• **Lead Capture:** Automatically saves incoming chats into a clean database.\n" +
      "• **24/7 AI Auto-Replies:** Instant contextual responses so no buyer waits.\n" +
      "• **Round-Robin Assignment:** Equitably assigns leads to team members without overlap.\n" +
      "• **Analytics:** Real-time visibility into response times and conversion rates.\n\n" +
      "Want to see it in action? Request a [Free Live Demo](/contact)!"
    )
  }

  // 3. ALL PRODUCTS
  if (/products?|tool|tools|software|docket|kin property|me & mine/.test(query)) {
    if (/docket|legal|law|advocate|court/.test(query)) {
      return (
        "⚖️ **Docket14 — Legal Practice Management SaaS:**\n\n" +
        "Built specifically for modern law firms and independent advocates:\n" +
        "• Case transition logs and hearing schedules\n" +
        "• Associate task matrices & automated deadline alerts\n" +
        "• Client notification triggers & time tracking\n" +
        "• Secure digital document vault\n\n" +
        "Learn more on our [Docket14 Page](/products/docket14) or contact our team!"
      )
    }

    if (/kin|real estate|property|broker|tenant/.test(query)) {
      return (
        "🏢 **KIN Property Management:**\n\n" +
        "Our flagship real estate platform deployed in Pune, India:\n" +
        "• High-speed property search engine with verified listings\n" +
        "• Internal Agency CRM for broker assignments and deal pipelines\n" +
        "• Tenant agreement vaults and automated WhatsApp inquiries\n\n" +
        "Check out our [KIN Property Case Study](/about#case-study)!"
      )
    }

    return (
      "🚀 **VeltaZ Products Suite:**\n\n" +
      "1. **WhatsFlow:** WhatsApp lead-management & auto-routing platform.\n" +
      "2. **Docket14:** Legal practice and case docket management software.\n" +
      "3. **KIN Property:** Luxury real estate portal and broker CRM.\n" +
      "4. **Me & Mine (In Development):** Compatibility-driven matchmaking mobile app.\n\n" +
      "Which product would you like more details on?"
    )
  }

  // 4. SERVICES
  if (/services?|website|web dev|web development|develop|app\b|mobile|seo|automation|crm|custom software|marketing|ads|content|reels|studio|design/.test(query)) {
    if (/website|web dev|web development|frontend|next\.?js/.test(query)) {
      return (
        "💻 **Website & Web Platform Development:**\n\n" +
        "We build high-performance, conversion-engineered digital platforms:\n" +
        "• Modern React / Next.js architecture with instant load speeds (Lighthouse 98%+)\n" +
        "• Custom animations, smooth micro-interactions & bespoke design systems\n" +
        "• Custom client portals & scalable web application backends\n" +
        "• 100% mobile responsive across all devices\n\n" +
        "Explore our [Website Development Services](/services/website-development) or [Contact Us](/contact) to build your project!"
      )
    }

    if (/mobile|app\b|apps\b|ios|android/.test(query) && !/whatsflow|whatsapp/.test(query)) {
      return (
        "📱 **Mobile Application Development:**\n\n" +
        "We craft sleek, high-performing iOS and Android applications:\n" +
        "• Native-feel hybrid mobile apps running at a smooth 60fps\n" +
        "• Offline data synchronization & secure cloud backend APIs\n" +
        "• Push notifications, user auth & interactive app logic\n" +
        "• Full app submission and deployment support\n\n" +
        "Check out our [Mobile Applications Services](/services/mobile-app-development)!"
      )
    }

    if (/performance marketing|marketing|paid ads|ad campaigns?|meta ads?|google ads?|insta boost|ppc/.test(query)) {
      return (
        "📈 **Performance Marketing & Paid Ad Campaigns:**\n\n" +
        "We run data-driven ad campaigns focused strictly on ROI & customer acquisition:\n" +
        "• Meta Campaign Ads (Facebook & Instagram hyper-targeted setups)\n" +
        "• Google Search & Display Ads capturing active buyers\n" +
        "• Direct integration with WhatsApp automation so no leads slip away\n" +
        "• Continuous A/B testing on ad creatives & landing page funnels\n\n" +
        "Learn more on our [Performance Marketing Page](/services/performance-marketing)!"
      )
    }

    if (/content|social media|reels?|video|studio|insta branding|linkedin branding/.test(query)) {
      return (
        "🎬 **Content Studio & Social Media Branding:**\n\n" +
        "We craft viral, authority-building content that scales brand presence:\n" +
        "• High-retention short-form video & Reels editing\n" +
        "• Founder personal branding on LinkedIn & Instagram\n" +
        "• Thumb-stopping motion graphics, scripting & visual design\n" +
        "• Cohesive aesthetic positioning for your brand\n\n" +
        "Explore our [Content Studio & Social Media](/content)!"
      )
    }

    if (/crm|custom software|portal|dashboard|internal system/.test(query)) {
      return (
        "🏢 **Custom Business Software & CRMs:**\n\n" +
        "We eliminate repetitive manual work with proprietary business software:\n" +
        "• Private agency dashboards & lead tracking CRMs\n" +
        "• Tailored admin portals & role-based associate access\n" +
        "• Secure cloud databases with zero recurring template bloat\n" +
        "• Custom webhook pipelines & automated reports\n\n" +
        "Have a custom software requirement? Let's discuss on our [Contact Page](/contact)!"
      )
    }

    if (/seo|google|ranking|gbp|blog/.test(query)) {
      return (
        "🔍 **Search Engine & GBP Growth:**\n\n" +
        "We structure organic discovery so high-intent buyers find you first:\n" +
        "• Google 1st Page Keyword Optimization & technical on-page SEO\n" +
        "• Google Business Profile (GBP) ranking & local map pack dominance\n" +
        "• Editorial content and high-authority backlink architecture\n\n" +
        "Explore our [SEO & GBP Services](/services/seo-blogging-google-business-profile)!"
      )
    }

    if (/automation|n8n|webhook|pipeline|workflow/.test(query)) {
      return (
        "⚙️ **Intelligent Automation Systems:**\n\n" +
        "We connect disconnected tools so your business runs on autopilot:\n" +
        "• n8n workflows syncing websites, CRMs, and spreadsheets\n" +
        "• Instant WhatsApp & email notifications on lead capture\n" +
        "• Zero manual data entry and zero lost leads\n\n" +
        "Read more on our [Automation Systems Page](/services/automation-systems)!"
      )
    }

    return (
      "🛠️ **VeltaZ Core Services:**\n\n" +
      "• **[Website Development](/services/website-development):** Ultra-fast React/Next.js platforms (Lighthouse 98%+).\n" +
      "• **[Mobile Applications](/services/mobile-app-development):** 60fps hybrid iOS & Android apps.\n" +
      "• **[Performance Marketing](/services/performance-marketing):** High-ROI Meta & Google ad campaigns.\n" +
      "• **[Content Studio](/content):** Reels, video editing & social media branding.\n" +
      "• **[Custom Software & CRMs](/contact):** Agency portals, custom databases & dashboards.\n" +
      "• **[Automation Systems](/services/automation-systems):** n8n pipelines & WhatsApp routing.\n\n" +
      "Which service would you like to explore?"
    )
  }

  // 5. FOUNDERS & TEAM
  if (/founder|founders|team|who (made|built|started|owns)|ceo|cto|cpo|dhruv|arman|abhishek/.test(query)) {
    return (
      "👥 **The Founders Behind VeltaZ:**\n\n" +
      "• **Dhruv (Co-Founder & CEO):** Leads growth, client strategy, and marketing operations.\n" +
      "• **Arman (Co-Founder & CTO):** Architects rock-solid backend infrastructure, APIs, and databases.\n" +
      "• **Abhishek (Co-Founder & CPO):** Obsessed with product perfection, high-fidelity UI/UX, and design systems.\n\n" +
      "Together, they build custom technology that solves tangible business bottlenecks."
    )
  }

  // 6. LOCATION & OFFICE
  if (/location|address|office|headquarters|where|pune|city/.test(query)) {
    return (
      "📍 **VeltaZ Headquarters:**\n\n" +
      "We are headquartered in **Pune, Maharashtra, India**.\n\n" +
      "We operate remote-first with clients across India, the Middle East, UK, and globally. Wherever you are, our systems connect seamlessly."
    )
  }

  // 7. CONTACT & DEMO
  if (/contact|demo|call|hire|meeting|talk|touch|email|phone|number|whatsapp/.test(query)) {
    return (
      "📞 **Get in Touch with VeltaZ:**\n\n" +
      "• **WhatsApp Direct:** [+91 9960240648](https://wa.me/919960240648)\n" +
      "• **Email:** hello@veltalabs.net\n" +
      "• **Online Form:** Visit our [Contact Page](/contact)\n\n" +
      "We typically respond within 1–2 hours during business days. Feel free to reach out anytime!"
    )
  }

  // 8. TECH STACK
  if (/tech stack|technology|technologies|react|next|node|database|mongo/.test(query)) {
    return (
      "💻 **Our Core Technology Stack:**\n\n" +
      "• **Frontend:** React, Next.js, Vanilla CSS design tokens\n" +
      "• **Backend:** Node.js, Express, high-availability REST APIs\n" +
      "• **Databases:** MongoDB, Cloudflare R2 object storage\n" +
      "• **Automation:** n8n workflow engine, webhooks, WhatsApp Cloud API\n" +
      "• **Hosting:** Vercel edge network & AWS cloud\n\n" +
      "We write clean, proprietary code without heavy, bloated templates."
    )
  }

  // 9. PHILOSOPHY / ABOUT VELTAZ
  if (/about|what is veltaz|philosophy|why veltaz|mission|vision/.test(query)) {
    return (
      "✨ **About VeltaZ:**\n\n" +
      "VeltaZ is a **Business Growth & Digital Systems Partner**.\n\n" +
      "We believe business growth requires more than an isolated deliverable. Real momentum happens when your website, customer discovery, operational software, and workflow automations connect into one cohesive system.\n\n" +
      "Our golden rule: **Understand First. Build with Purpose.**"
    )
  }

  // 10. HINGLISH QUERIES
  if (/kaise|kya|mujhe|chahiye|karo|banao|madad|batao/.test(query)) {
    return (
      "Namaste! 🙏 VeltaZ aapke business ko scale karne ke liye custom digital systems banata hai:\n\n" +
      "1. **Fast Websites & Web Apps** (React/Next.js)\n" +
      "2. **WhatsApp Automation** (WhatsFlow)\n" +
      "3. **Custom Software & CRMs** (Internal dashboards)\n" +
      "4. **Google SEO & Ranking** (High-intent leads)\n\n" +
      "Aap humse directly [WhatsApp (+91 9960240648)](https://wa.me/919960240648) par baat kar sakte hain ya [Contact Page](/contact) par project discuss kar sakte hain!"
    )
  }

  // 11. DEFAULT HELPFUL FALLBACK
  return (
    "I'd be glad to help with that! At VeltaZ, we specialize in:\n\n" +
    "• **WhatsFlow:** WhatsApp automation & lead routing (starting ₹9,999)\n" +
    "• **Custom Software:** Web apps, portals, internal CRMs\n" +
    "• **Growth Systems:** Google SEO, paid ad campaigns & automations\n\n" +
    "You can also chat directly with our founders on [WhatsApp (+91 9960240648)](https://wa.me/919960240648) or submit an inquiry on our [Contact Page](/contact)!"
  )
}
