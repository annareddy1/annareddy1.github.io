// Profile data - single source of truth for all content
export const profile = {
  name: "Rithika Annareddy",
  title: "Software Engineer",
  tagline: "Building real-time financial systems that hold up in production",
  location: "Salt Lake City, UT (Open to Relocation)",
  phone: "+1 (857) 324-4036",
  email: "annareddy.1@osu.edu",
  linkedin: "https://linkedin.com/in/rithika-annareddy",
  github: "https://github.com/annareddy1",

  hero: {
    headline: "Software engineer",
    subheadline:
      "Focused on backend engineering, real-time data pipelines, and fintech infrastructure — where latency, correctness, and reliability are non-negotiable.",
    credibilityChips: [
      "Real-Time Trading Systems",
      "Distributed Backend Engineering",
      "Fintech Infrastructure",
      "Applied ML in Production"
    ],
    easterEggTooltip: "// currently debugging production latency"
  },

  specialties: [
    {
      id: "backend-systems",
      title: "Backend & Distributed Systems",
      icon: "Database",
      description:
        "Design and build microservices, APIs, and service layers that operate under real production load — not synthetic benchmarks.",
      proof:
        "Reduced signal delivery latency from 2–3s to sub-500ms on a live trading platform serving 150+ traders"
    },
    {
      id: "realtime-data",
      title: "Real-Time Data Pipelines",
      icon: "Activity",
      description:
        "Build event-driven ingestion systems and feature stores that keep data consistent, fresh, and queryable under continuous load.",
      proof:
        "Kafka pipelines + Apache Ignite caching across 1,000+ symbols cut database load by ~60%"
    },
    {
      id: "financial-systems",
      title: "Financial Systems & Market Data",
      icon: "LineChart",
      description:
        "Engineer systems that process and deliver market signals where timing, confidence, and correctness directly affect user decisions.",
      proof:
        "Transitioned quant signal engine from rule-based to ML-calibrated, reducing false signals by ~15%"
    },
    {
      id: "reliability",
      title: "Reliability, Observability & Performance",
      icon: "Shield",
      description:
        "Own system reliability end-to-end — structured monitoring, alerting, and autoscaling across every critical path.",
      proof:
        "Maintained 99%+ uptime across ingestion, ML inference, and real-time delivery under live trading conditions"
    }
  ],

  skills: {
  categories: [
    { id: "languages", name: "Languages", color: "#0EA5E9" },
    { id: "frontend", name: "Frontend", color: "#14B8A6" },
    { id: "backend", name: "Backend & APIs", color: "#8B5CF6" },
    { id: "data-streaming", name: "Data & Streaming", color: "#10B981" },
    { id: "infra-cloud", name: "Infrastructure & Cloud", color: "#EF4444" }
  ],
  items: [
    {
      name: "Python",
      categories: ["languages", "backend", "data-streaming"],
      usage: "Production services, data pipelines, ML inference, and backend APIs",
      related: ["FastAPI", "asyncio", "pandas"]
    },
    {
      name: "Java",
      categories: ["languages", "backend"],
      usage: "Backend microservices and production-grade application development",
      related: ["Spring Boot", "JPA", "REST APIs"]
    },
    {
      name: "SQL",
      categories: ["languages", "data-streaming"],
      usage: "Schema design, query optimization, and analytics-ready data access",
      related: ["PostgreSQL", "MongoDB", "Snowflake"]
    },
    {
      name: "JavaScript",
      categories: ["languages", "frontend"],
      usage: "Frontend development and full-stack product work",
      related: ["React", "TypeScript", "Next.js"]
    },
    {
      name: "TypeScript",
      categories: ["languages", "frontend"],
      usage: "Type-safe frontend development and component architecture",
      related: ["React", "Next.js"]
    },
    {
      name: "React",
      categories: ["frontend"],
      usage: "Component-driven UIs including real-time trading dashboards with WebSocket/SSE feeds",
      related: ["Next.js", "TypeScript", "D3.js"]
    },
    {
      name: "Next.js",
      categories: ["frontend"],
      usage: "Frontend application structure and production-ready web experiences",
      related: ["React", "TypeScript"]
    },
    {
      name: "HTML & CSS",
      categories: ["frontend"],
      usage: "Semantic markup and responsive UI layout",
      related: ["React", "Tailwind", "Component Libraries"]
    },
    {
      name: "Tailwind CSS",
      categories: ["frontend"],
      usage: "Utility-first styling for responsive component systems",
      related: ["React", "Design Systems"]
    },
    {
      name: "FastAPI",
      categories: ["backend"],
      usage: "Low-latency APIs for market data delivery and ML-backed services",
      related: ["Pydantic", "async/await", "REST"]
    },
    {
      name: "Spring Boot",
      categories: ["backend"],
      usage: "Microservices, orchestration layers, and production service development",
      related: ["REST APIs", "Dependency Injection", "JPA"]
    },
    {
      name: "REST APIs",
      categories: ["backend"],
      usage: "Versioned service interfaces for frontend clients and downstream consumers",
      related: ["OpenAPI", "JSON", "Service Contracts"]
    },
    {
      name: "OAuth2 / JWT",
      categories: ["backend"],
      usage: "Service authentication and access control for production APIs",
      related: ["Auth Flows", "Token Management"]
    },
    {
      name: "Redis",
      categories: ["backend", "data-streaming"],
      usage: "Caching for low-latency reads and high-throughput lookup paths",
      related: ["Key Design", "TTL", "Performance"]
    },
    {
      name: "PostgreSQL",
      categories: ["backend", "data-streaming"],
      usage: "Core transactional and analytics-ready data storage",
      related: ["Indexing", "Upserts", "Schema Design"]
    },
    {
      name: "MongoDB",
      categories: ["backend", "data-streaming"],
      usage: "Document storage for flexible signal payloads and analytics workloads",
      related: ["Collections", "Indexes", "Aggregation"]
    },
    {
      name: "Kafka",
      categories: ["data-streaming"],
      usage: "Real-time market data ingestion and event-driven processing pipelines",
      related: ["Producers", "Consumers", "Streaming"]
    },
    {
      name: "Apache Ignite",
      categories: ["data-streaming", "infra-cloud"],
      usage: "In-memory caching for sub-500ms financial data delivery across 1,000+ symbols",
      related: ["Distributed Cache", "Memory Grid", "Performance"]
    },
    {
      name: "dbt",
      categories: ["data-streaming"],
      usage: "Structured transformations and analytics-layer modeling",
      related: ["Models", "Tests", "Lineage"]
    },
    {
      name: "Snowflake",
      categories: ["data-streaming"],
      usage: "Warehouse-style analytics and structured data access",
      related: ["Warehousing", "Analytics", "Data Modeling"]
    },
    {
      name: "PyTorch",
      categories: ["data-streaming"],
      usage: "ML model development and production inference pipelines",
      related: ["Transformers", "Training", "Inference"]
    },
    {
      name: "Hugging Face",
      categories: ["data-streaming"],
      usage: "NLP model workflows and large-scale embedding generation",
      related: ["FinBERT", "Tokenizers", "Transformers"]
    },
    {
      name: "Kubernetes",
      categories: ["infra-cloud"],
      usage: "Container orchestration and autoscaling in production environments",
      related: ["Pods", "HPA", "Namespaces"]
    },
    {
      name: "Docker",
      categories: ["infra-cloud"],
      usage: "Portable packaging and containerization for backend services",
      related: ["Images", "Compose", "Multi-stage Builds"]
    },
    {
      name: "AWS",
      categories: ["infra-cloud"],
      usage: "Cloud infrastructure for deployment, storage, and ML workflows",
      related: ["EC2", "S3", "Lambda"]
    },
    {
      name: "Terraform",
      categories: ["infra-cloud"],
      usage: "Infrastructure as code for reproducible, version-controlled cloud setup",
      related: ["IaC", "Modules", "State"]
    },
    {
      name: "NGINX",
      categories: ["infra-cloud"],
      usage: "API gateway and reverse proxy routing in production deployments",
      related: ["Load Balancing", "Routing", "TLS"]
    },
    {
      name: "Prometheus",
      categories: ["infra-cloud"],
      usage: "Metrics collection and alerting for production system observability",
      related: ["Time Series", "PromQL", "Alerts"]
    },
    {
      name: "Grafana",
      categories: ["infra-cloud"],
      usage: "Operational dashboards across ingestion, inference, and delivery layers",
      related: ["Dashboards", "Panels", "Alerts"]
    },
    {
      name: "Jenkins",
      categories: ["infra-cloud"],
      usage: "CI/CD pipelines for automated build, test, and deployment workflows",
      related: ["Pipelines", "Automation", "Deployments"]
    }
  ]
},

  education: {
    university: "The Ohio State University",
    degree: "Bachelor of Science in Statistics, Computer Information Science",
    location: "Columbus, Ohio",
    graduationDate: "May 2025",
    honors: ["Entrepreneurship and Innovation Scholar (Fisher College of Business)"]
  },

  experience: [
    {
      id: "ooftish",
      company: "Ooftish",
      title: "Software Engineer",
      location: "Salt Lake City, Utah / Remote",
      dates: "Oct 2025 - Present",
      type: "current",
      impacts: [
        "Designed a Python FastAPI model gateway with post-hoc probability calibration and regime-sensitive confidence scoring — cut signal delivery latency from ~2–3s to sub-500ms via Apache Ignite caching across 1,000+ symbols.",
        "Transitioned a quant signal platform serving 150+ traders from rule-based heuristics to calibrated ML probability engines, reducing false signals ~15% and improving Sharpe stability across volatile and mean-reversion regimes.",
        "Built event-driven Kafka pipelines into a versioned feature store (OHLCV, indicators, regime features) backed by PostgreSQL and MongoDB with Ignite for live ranked caching — cutting database load ~60%.",
        "Owned platform reliability end-to-end: Kubernetes autoscaling, NGINX API gateway, Prometheus + Grafana observability, 99%+ uptime across ingestion, ML inference, and real-time signal delivery.",
        "Delivered real-time trading dashboards in React/Next.js with WebSocket/SSE live feeds and D3.js probability visualizations, replacing static charts with ranked, confidence-scored signals."
      ],
      tech: ["Python", "Java", "FastAPI", "Spring Boot", "Kafka", "Apache Ignite", "PostgreSQL", "MongoDB", "Kubernetes", "React"],
      learned: "How to build and operate backend systems where correctness, latency, and reliability directly affect user decisions"
    },
    {
      id: "fisher",
      company: "Fisher College of Business, The Ohio State University",
      title: "NLP Research Engineer",
      location: "Columbus, Ohio",
      dates: "Jul 2024 - Dec 2024",
      type: "research",
      impacts: [
        "Built an economic narrative knowledge graph ingesting 1M+ news and social media posts, extracting 50K+ entities and 200K+ relationships using a FinBERT/BERT ensemble — transforming unstructured text into a queryable intelligence layer.",
        "Designed a forecasting pipeline fusing sentiment, narrative, and time-series signals, improving macro trend alignment 15–25% over baseline indicators around market-moving events.",
        "Engineered scalable inference infrastructure generating 100K+ embeddings/day with automated macro-signal updates and 99%+ uptime end-to-end."
      ],
      tech: ["Python", "FinBERT", "BERT", "LDA", "PostgreSQL", "AWS", "NLP"],
      learned: "How to turn noisy text data at scale into production-usable signals with reliable, automated pipelines"
    },
    {
      id: "car",
      company: "Center for Automotive Research, The Ohio State University",
      title: "Autonomous Perception Engineer",
      location: "Columbus, Ohio",
      dates: "Aug 2021 - Apr 2024",
      type: "research",
      impacts: [
        "Trained CNN-based lane segmentation and object detection models on 100K+ labeled frames; improved prediction stability ~35% via cross-entropy + Dice loss tuning and targeted augmentation for lighting and occlusion edge cases.",
        "Built post-inference stabilization pipelines using RANSAC lane filtering, temporal smoothing, and lane-shape constraints to reduce frame-to-frame prediction drift.",
        "Integrated camera, LiDAR, and GPS/IMU streams into a synchronized perception pipeline achieving <50ms end-to-end latency — contributed to a 2nd-place finish in the GM-sponsored SAE AutoDrive Challenge."
      ],
      tech: ["Python", "PyTorch", "OpenCV", "ROS", "LiDAR", "Sensor Fusion"],
      learned: "How to engineer real-time ML systems under strict latency and reliability constraints"
    },
    {
      id: "turnt",
      company: "Turnt",
      title: "Software Engineer, Intern",
      location: "Columbus, Ohio",
      dates: "May 2023 - Aug 2023",
      type: "internship",
      impacts: [
        "Built a hybrid recommendation engine combining collaborative filtering and content-based ranking — improved recommendation relevance 12% and platform engagement 16%.",
        "Designed and shipped an A/B testing framework for ranking models, enabling rapid evaluation of recommendation strategies without disrupting production traffic.",
        "Architected real-time backend services for recommendation delivery, handling feature extraction, model scoring, and analytics tracking at scale."
      ],
      tech: ["Python", "PostgreSQL", "React", "Scikit-learn", "A/B Testing"],
      learned: "How good backend systems accelerate product iteration and produce measurable user impact"
    },
    {
      id: "ta",
      company: "College of Engineering, The Ohio State University",
      title: "Teaching Assistant, Programming in Python",
      location: "Columbus, Ohio",
      dates: "Aug 2022 - Dec 2022",
      type: "teaching",
      impacts: [
        "Supported 180+ students across recitations and debugging workshops, reinforcing core CS fundamentals — data structures, algorithms, recursion, and complexity analysis."
      ],
      tech: ["Python", "Data Structures", "Algorithms"],
      learned: "How to explain complex technical systems clearly and systematically"
    }
  ],

  projects: [
    {
      id: "market-lens",
      title: "MarketLens – Investment Analytics Platform",
      status: "completed",
      featured: true,
      category: "Backend / Fintech",
      problem:
        "Portfolio analytics requires fast, reproducible risk computations — not spreadsheet-heavy workflows that lag behind market conditions.",
      approach:
        "Built async Java/Spring Boot backend pipelines computing Sharpe, Sortino, VaR, and drawdown metrics with LLM-generated risk narratives and confidence-gated sentiment scoring. Backed by PostgreSQL and MongoDB with a pairwise correlation engine and crash-scenario simulation module.",
      impact:
        "Sub-2s end-to-end latency for portfolio analytics. Automated >0.80 correlation risk flagging across 20+ holdings. Scenario P&L simulation against historical market crash events.",
      stack: ["Java", "Spring Boot", "PostgreSQL", "MongoDB", "LLM APIs"],
      demoUrl: null,
      screenshots: []
    },
    {
      id: "account-aggregation-api",
      title: "Financial Account Aggregation API",
      status: "completed",
      featured: true,
      category: "Backend / Infrastructure",
      problem:
        "Financial applications need normalized, low-latency access to account data across institutions — without building separate integrations every time.",
      approach:
        "Designed a backend aggregation service using Kafka for ingestion, PostgreSQL for a unified ledger model, Redis for sub-150ms cached reads, and OAuth2-secured REST APIs for downstream consumers.",
      impact:
        "Handles 20K+ transactions across 500+ accounts. Sub-150ms query latency on cached account and transaction endpoints. Secure, normalized data model ready for downstream financial applications.",
      stack: ["Python", "Kafka", "PostgreSQL", "Redis", "OAuth2"],
      demoUrl: null,
      screenshots: []
    },
    {
      id: "earnings-checker",
      title: "Earnings Call Fact-Checker & Signal Extraction",
      status: "completed",
      featured: false,
      category: "NLP / Finance",
      problem:
        "Manual verification of claims in earnings call transcripts is slow, inconsistent, and doesn't scale across filing volumes.",
      approach:
        "Built an NLP pipeline that extracts claims from earnings call transcripts, aligns them to SEC EDGAR filings, and generates structured verification signals with supporting evidence.",
      impact:
        "Automated claim extraction and cross-reference verification, reducing manual review effort and improving consistency of financial signal generation.",
      stack: ["Python", "NLP", "SEC EDGAR", "PostgreSQL"],
      demoUrl: null,
      screenshots: []
    }
  ],

  metrics: [
    {
      value: "sub-500ms",
      label: "signal delivery latency",
      context: "live trading platform, down from 2–3s",
      suffix: ""
    },
    {
      value: "60",
      label: "reduction in DB load",
      context: "via Apache Ignite in-memory caching",
      suffix: "%"
    },
    {
      value: "99",
      label: "platform uptime",
      context: "across ingestion, inference, and delivery",
      suffix: "%+"
    },
    {
      value: "150",
      label: "active traders served",
      context: "live production platform",
      suffix: "+"
    },
    {
      value: "1,000",
      label: "symbols in real-time cache",
      context: "live market data coverage",
      suffix: "+"
    },
    {
      value: "100K",
      label: "embeddings generated/day",
      context: "NLP inference pipeline at OSU",
      suffix: "+"
    }
  ],

  blogPosts: [],

  certifications: [
  {
    title: "Oracle Cloud Infrastructure AI Foundations",
    issuer: "Oracle",
    image: "/certifications/oracle_logo.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4D8683C582903461E61A78C8BFFFE5BCB814371CE42DA3DD66DE86C7E61ED80B"
  },
  {
    title: "Bloomberg Market Concepts",
    issuer: "Bloomberg",
    image: "/certifications/bloomberg_lp_logo.jpeg",
    link: "https://portal.bloombergforeducation.com/certificates/vASJSGLvRsaGMk1ZmqCyLWHF"
  }
],

  workWithMe: {
    headline: "Looking to join a team building systems where reliability and performance are requirements, not nice-to-haves.",
    problems: [
      "Backend systems where latency, throughput, and uptime directly affect users",
      "Financial data infrastructure that has to stay correct under continuous load",
      "Event-driven pipelines and real-time processing at production scale",
      "ML-backed services that need production-grade reliability, not just research accuracy"
    ],
    approach: [
      "Own systems end-to-end — design, build, deploy, and operate",
      "Move fast without skipping the parts that make systems debuggable and reliable",
      "Optimize for outcomes — latency, uptime, and user impact — not lines of code",
      "Build for the engineer who inherits it, not just for launch day"
    ],
    teamGets: [
      "An engineer who scopes and executes without constant handoff",
      "Clean service boundaries, practical abstractions, and production discipline",
      "Bias toward observability, debuggability, and structured reliability",
      "Systems thinking across APIs, data flows, infrastructure, and user impact"
    ],
    services: [
      "Backend Systems",
      "Real-Time Data Pipelines",
      "Fintech Infrastructure",
      "Distributed Services",
      "Production Reliability"
    ]
  },

  contact: {
    text:
      "Open to full-time roles in backend engineering, fintech infrastructure, and real-time systems. Based in Salt Lake City — open to relocation.",
    email: "annareddy.1@osu.edu"
  }
};

export default profile;