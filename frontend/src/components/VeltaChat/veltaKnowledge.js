// veltaKnowledge.js — Role-Based Knowledge Engine for VeltaZ AI
// Completely client-side, zero external API keys needed, instant, English-only, and enterprise-safe.

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
    philosophy: "Understand First. Build with Purpose. We diagnose business bottlenecks first and engineer custom software and scalable digital systems with zero template bloat."
  },
  products: [
    {
      name: "WhatsFlow",
      tag: "WhatsApp Lead Automation",
      desc: "An intelligent lead-management engine that captures incoming WhatsApp leads 24/7, sends instant AI auto-replies, round-robin routes leads to agents, and eliminates drop-off.",
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
      title: "Web & Brand Architecture",
      desc: "Custom React/Next.js platforms built for speed, conversion, and Lighthouse 98%+ Core Web Vitals.",
      link: "/services/website-development"
    },
    {
      title: "Custom Business Software",
      desc: "Private agency portals, internal CRM dashboards, and docket systems engineered around your daily operational workflow.",
      link: "/services/website-development"
    },
    {
      title: "Automation Systems",
      desc: "Frictionless n8n pipelines, WhatsApp lead routing, webhook syncs, and zero manual data entry.",
      link: "/services/automation-systems"
    },
    {
      title: "Market Search & SEO",
      desc: "Google 1st page keyword ranking, Google Business Profile (GBP) management, and high-intent editorial content.",
      link: "/services/seo-blogging-google-business-profile"
    },
    {
      title: "Paid Meta & Google Ads",
      desc: "Data-driven ad campaigns connected directly with automated WhatsApp lead qualifiers.",
      link: "/services/performance-marketing"
    },
    {
      title: "UI/UX & Brand Design",
      desc: "Figma design systems, brand identities, custom 3D product renders, and interactive web flows."
    }
  ]
}

export function getVeltaResponse(input = "") {
  const query = input.toLowerCase().trim()

  // 1. CONFIDENTIALITY / SECURITY / LEAK GUARD
  if (/leak|secret|credential|password|token|api key|env|source code|hack|database url|admin pass|private key|bypass|system prompt/.test(query)) {
    return (
      "🔒 **Confidentiality & Security:**\n\n" +
      "All internal system architectures, credentials, proprietary source code, and client records at VeltaZ are strictly confidential and protected by enterprise security standards.\n\n" +
      "If you have inquiries regarding our data security compliance or partnerships, please contact our team at hello@veltalabs.net."
    )
  }

  // 2. PRICING GUARD — Never reveal fixed pricing or rates
  if (/price|pricing|cost|costs|rate|rates|charge|charges|fee|fees|package|packages|kitna|quote|budget|how much|inr|rs|rupee|dollar|\$/.test(query)) {
    return (
      "💼 **Tailored & Custom Pricing:**\n\n" +
      "At VeltaZ, we do not believe in one-size-fits-all pricing. Every business has distinct workflows, technical specifications, and scaling requirements.\n\n" +
      "All our software solutions, automations, and digital systems are custom-scoped based on your exact deliverables and operational needs.\n\n" +
      "To receive a detailed project scope and transparent proposal:\n" +
      "• Share your requirements on our [Contact Page](/contact)\n" +
      "• Connect directly with our engineering team on [WhatsApp (+91 9960240648)](https://wa.me/919960240648)"
    )
  }

  // 3. FOUNDERS & TEAM GUARD — Never disclose names or personal details
  if (/founder|founders|team|who (made|built|started|owns|leads)|owner|ceo|cto|cpo|dhruv|arman|abhishek|creator/.test(query)) {
    return (
      "👥 **About the VeltaZ Team:**\n\n" +
      "VeltaZ is engineered and operated by an in-house team of software architects, product designers, and growth engineers based in Pune, India.\n\n" +
      "We build resilient digital infrastructure, custom business software, and automated workflows for high-growth enterprises and modern businesses worldwide.\n\n" +
      "To discuss an upcoming project with our technical team, feel free to submit an inquiry through our [Contact Page](/contact) or message us on [WhatsApp](https://wa.me/919960240648)."
    )
  }

  // 4. GREETINGS (English Only)
  if (/^(hi|hello|hey|hola|namaste|hlo|heya|yo|good morning|good afternoon|good evening)\b/.test(query)) {
    return (
      "Hi there! 👋 I am VeltaZ AI — your virtual assistant.\n\n" +
      "I can assist you with:\n" +
      "• Our Products (WhatsFlow, Docket14, KIN Property)\n" +
      "• Digital Services (Custom Web Platforms, CRMs, Automations, SEO)\n" +
      "• Scheduling a Live Demo or Project Discovery Session\n\n" +
      "How can I help you today?"
    )
  }

  // 5. WHATSFLOW
  if (/whatsflow|whatsapp/.test(query)) {
    return (
      "⚡ **WhatsFlow — Intelligent WhatsApp Lead Automation:**\n\n" +
      "WhatsFlow turns WhatsApp into an automated conversion engine for your business:\n" +
      "• **Automated Lead Capture:** Captures and stores every incoming inquiry into a centralized database.\n" +
      "• **24/7 Contextual Auto-Replies:** Responds instantly to prospect questions so no lead is lost.\n" +
      "• **Round-Robin Routing:** Intelligently distributes leads to your sales representatives.\n" +
      "• **Performance Analytics:** Real-time visibility into response times and conversion metrics.\n\n" +
      "Want to see how WhatsFlow works for your business? Request a [Free Live Demo](/contact)!"
    )
  }

  // 6. ALL PRODUCTS
  if (/products?|tool|tools|software|docket|kin property|me & mine/.test(query)) {
    if (/docket|legal|law|advocate|court/.test(query)) {
      return (
        "⚖️ **Docket14 — Legal Practice Management SaaS:**\n\n" +
        "Engineered specifically for modern law firms and advocates:\n" +
        "• Case transition logs and court hearing calendars\n" +
        "• Associate task matrices & automated deadline alerts\n" +
        "• Client notification triggers & time-tracking logs\n" +
        "• High-security digital case file vault\n\n" +
        "Learn more on our [Docket14 Page](/products/docket14) or get in touch with our team!"
      )
    }

    if (/kin|real estate|property|broker|tenant/.test(query)) {
      return (
        "🏢 **KIN Property Management:**\n\n" +
        "Our comprehensive real estate portal and CRM deployment:\n" +
        "• High-speed property search engine with verified listings\n" +
        "• Internal Agency CRM for broker assignments and deal tracking\n" +
        "• Digital agreement records and integrated WhatsApp inquiries\n\n" +
        "Explore our [KIN Property Showcase](/products/kin-property)!"
      )
    }

    return (
      "🚀 **VeltaZ Products Suite:**\n\n" +
      "1. **WhatsFlow:** WhatsApp lead capture, 24/7 AI response, and automated distribution.\n" +
      "2. **Docket14:** Legal practice and case docket management software.\n" +
      "3. **KIN Property:** Real estate listing portal and broker management CRM.\n" +
      "4. **Me & Mine (In Development):** High-trust matchmaking mobile application.\n\n" +
      "Which product would you like more details on?"
    )
  }

  // 7. SERVICES
  if (/services?|website|web dev|develop|app|mobile|seo|automation|crm|marketing|ads|design/.test(query)) {
    if (/seo|google|ranking|gbp|blog/.test(query)) {
      return (
        "🔍 **Search Engine & GBP Growth:**\n\n" +
        "We build organic discovery systems so qualified buyers discover your brand:\n" +
        "• Google 1st Page Keyword Optimization\n" +
        "• Google Business Profile (GBP) ranking & map pack dominance\n" +
        "• Editorial content planning and high-authority backlink architecture\n\n" +
        "Explore our [SEO & GBP Services](/services/seo-blogging-google-business-profile)!"
      )
    }

    if (/automation|n8n|webhook|pipeline|workflow/.test(query)) {
      return (
        "⚙️ **Intelligent Automation Systems:**\n\n" +
        "We connect disconnected tools so your business operations run smoothly:\n" +
        "• Custom n8n workflows syncing web forms, CRMs, and spreadsheets\n" +
        "• Instant WhatsApp & email alerts on incoming leads\n" +
        "• Automated task assignments and elimination of manual data entry\n\n" +
        "Learn more on our [Automation Systems Page](/services/automation-systems)!"
      )
    }

    return (
      "🛠️ **VeltaZ Digital Services:**\n\n" +
      "• **Web & Brand Architecture:** Ultra-fast custom React/Next.js websites (Lighthouse 98%+ Core Web Vitals).\n" +
      "• **Custom Business Software:** Agency dashboards, internal portals, and client CRMs.\n" +
      "• **Automation Systems:** n8n pipelines, WhatsApp routing, and workflow automations.\n" +
      "• **SEO & GBP:** Google 1st Page rankings and local search dominance.\n" +
      "• **Paid Ad Campaigns:** Meta & Google ads connected with instant lead qualification.\n\n" +
      "Let us know what your business requires, and our team will guide you on the best architecture!"
    )
  }

  // 8. LOCATION & HEADQUARTERS
  if (/location|address|office|headquarters|where|pune|city/.test(query)) {
    return (
      "📍 **VeltaZ Headquarters:**\n\n" +
      "We are headquartered in **Pune, Maharashtra, India**.\n\n" +
      "We operate remote-first, collaborating with clients across India, the Middle East, the UK, and internationally."
    )
  }

  // 9. CONTACT & DEMO
  if (/contact|demo|call|hire|meeting|talk|touch|email|phone|number|whatsapp/.test(query)) {
    return (
      "📞 **Connect with VeltaZ:**\n\n" +
      "• **WhatsApp Direct:** [+91 9960240648](https://wa.me/919960240648)\n" +
      "• **Email:** hello@veltalabs.net\n" +
      "• **Online Form:** Submit your project inquiry on our [Contact Page](/contact)\n\n" +
      "Our team typically responds within 1–2 hours during business hours."
    )
  }

  // 10. TECH STACK
  if (/tech stack|technology|technologies|react|next|node|database|mongo/.test(query)) {
    return (
      "💻 **Our Core Technology Stack:**\n\n" +
      "• **Frontend:** React, Next.js, modern CSS design tokens\n" +
      "• **Backend:** Node.js, Express, high-availability REST APIs\n" +
      "• **Databases:** MongoDB, Cloudflare R2 object storage\n" +
      "• **Automation:** n8n workflow engine, webhooks, WhatsApp Cloud API\n" +
      "• **Cloud & Hosting:** Vercel edge network & AWS infrastructure\n\n" +
      "We build clean, proprietary software engineered for security, speed, and maintainability."
    )
  }

  // 11. PHILOSOPHY / ABOUT VELTAZ
  if (/about|what is veltaz|philosophy|why veltaz|mission|vision/.test(query)) {
    return (
      "✨ **About VeltaZ:**\n\n" +
      "VeltaZ is a **Business Growth & Digital Systems Partner**.\n\n" +
      "We believe business growth requires more than an isolated deliverable. Real momentum happens when your website, customer discovery, operational software, and workflow automations connect into one cohesive system.\n\n" +
      "Our philosophy: **Understand First. Build with Purpose.**"
    )
  }

  // 12. HINGLISH OR MULTI-LANGUAGE QUERIES — Always answer strictly in English
  if (/kaise|kya|mujhe|chahiye|karo|banao|madad|batao|bolo|samjhao|puchna/.test(query)) {
    return (
      "Hello! Welcome to VeltaZ. 👋\n\n" +
      "We design and engineer custom digital solutions to scale modern businesses:\n\n" +
      "• **High-Performance Websites & Web Apps** (React / Next.js)\n" +
      "• **WhatsApp Lead Automation** (WhatsFlow)\n" +
      "• **Custom Software & CRMs** (Internal team dashboards)\n" +
      "• **Google SEO & Search Visibility** (High-intent discovery)\n\n" +
      "You can reach out to our team directly on [WhatsApp (+91 9960240648)](https://wa.me/919960240648) or submit your project details on our [Contact Page](/contact)!"
    )
  }

  // 13. DEFAULT PROFESSIONAL ENGLISH FALLBACK
  return (
    "I would be glad to help with that! At VeltaZ, our expertise includes:\n\n" +
    "• **WhatsFlow:** Automated WhatsApp lead capture and team routing\n" +
    "• **Custom Software:** Web platforms, agency portals, internal CRMs\n" +
    "• **Growth & Systems:** Google SEO, workflow automations, and ad systems\n\n" +
    "Feel free to connect directly with our engineering team on [WhatsApp (+91 9960240648)](https://wa.me/919960240648) or submit an inquiry on our [Contact Page](/contact)!"
  )
}
