// Profile data - single source of truth for all content
export const profile = {
  name: "Rithika Annareddy",
  title: "Data Engineer & Analytics Specialist",
  tagline: "Building reliable data systems that power smart decisions",
  location: "Dallas, TX (Open to Relocation)",
  phone: "+1 (857) 324-4036",
  email: "annareddy.1@osu.edu",
  linkedin: "https://linkedin.com/in/rithika-annareddy",
  github: "https://github.com/annareddy1",
  
  hero: {
    headline: "Data Engineer who ships",
    subheadline: "Pipelines, analytics, and ML systems that actually work in production",
    credibilityChips: [
      "2nd Place SAE AutoDrive II",
      "Data Engineering + Analytics",
      "Market Data & NLP/ML",
      "Fisher Business Scholar"
    ],
    easterEggTooltip: "// currently debugging life.py"
  },

  specialties: [
    {
      id: "pipelines",
      title: "Financial Data Pipelines",
      icon: "Database",
      description: "End-to-end systems for market data ingestion, transformation, and serving",
      proof: "Built reproducible pipelines handling OHLCV, earnings, options, and fundamentals data"
    },
    {
      id: "analytics",
      title: "Analytics & Validation",
      icon: "BarChart3",
      description: "Statistical validation, EDA, and data quality systems that catch issues early",
      proof: "Designed validation checks across market regimes ensuring data integrity"
    },
    {
      id: "ml",
      title: "Applied ML & NLP",
      icon: "Brain",
      description: "Topic modeling, sentiment analysis, and ML systems for real-world signals",
      proof: "Built sentiment analysis platform tracking macro events across social media"
    },
    {
      id: "dashboards",
      title: "Dashboards & Experimentation",
      icon: "LineChart",
      description: "Analytics platforms that drive product decisions with clear metrics",
      proof: "Created experimentation platform that improved engagement by 16%"
    }
  ],

  skills: {
    categories: [
      { id: "data-engineering", name: "Data Engineering", color: "#0EA5E9" },
      { id: "ml-nlp", name: "ML/NLP", color: "#10B981" },
      { id: "backend", name: "Backend", color: "#8B5CF6" },
      { id: "analytics-bi", name: "Analytics/BI", color: "#F59E0B" },
      { id: "cloud-devops", name: "Cloud/DevOps", color: "#EF4444" }
    ],
    items: [
      { name: "Python", categories: ["data-engineering", "ml-nlp", "backend"], usage: "Primary language for pipelines, ML models, and APIs", related: ["FastAPI", "pandas", "NumPy"] },
      { name: "SQL", categories: ["data-engineering", "analytics-bi"], usage: "Complex queries, schema design, performance tuning", related: ["PostgreSQL", "Snowflake", "DuckDB"] },
      { name: "PostgreSQL", categories: ["data-engineering", "backend"], usage: "Primary database for production systems", related: ["Indexing", "Upserts", "Partitioning"] },
      { name: "FastAPI", categories: ["backend", "data-engineering"], usage: "REST APIs for data services and ML endpoints", related: ["Pydantic", "async/await"] },
      { name: "Airflow", categories: ["data-engineering"], usage: "Orchestrating ETL pipelines and scheduled jobs", related: ["DAGs", "Sensors", "Operators"] },
      { name: "Spark", categories: ["data-engineering"], usage: "Large-scale data processing", related: ["PySpark", "DataFrames"] },
      { name: "Kafka", categories: ["data-engineering"], usage: "Real-time data streaming", related: ["Producers", "Consumers"] },
      { name: "Scikit-learn", categories: ["ml-nlp"], usage: "Classical ML models and evaluation", related: ["Classification", "Regression", "Clustering"] },
      { name: "PyTorch", categories: ["ml-nlp"], usage: "Deep learning and neural networks", related: ["Transformers", "Fine-tuning"] },
      { name: "spaCy", categories: ["ml-nlp"], usage: "NLP pipelines and text processing", related: ["NER", "Tokenization"] },
      { name: "LangChain", categories: ["ml-nlp"], usage: "LLM applications and RAG systems", related: ["Embeddings", "Chains"] },
      { name: "React", categories: ["backend"], usage: "Frontend dashboards and analytics UIs", related: ["Hooks", "Context"] },
      { name: "Flask", categories: ["backend"], usage: "Lightweight APIs and prototypes", related: ["Blueprints", "SQLAlchemy"] },
      { name: "Power BI", categories: ["analytics-bi"], usage: "Executive dashboards and reports", related: ["DAX", "Power Query"] },
      { name: "Tableau", categories: ["analytics-bi"], usage: "Interactive data visualizations", related: ["Calculated Fields", "LOD"] },
      { name: "Plotly", categories: ["analytics-bi", "ml-nlp"], usage: "Custom interactive charts", related: ["Dash", "Express"] },
      { name: "AWS", categories: ["cloud-devops"], usage: "Production deployments (EC2, S3, SageMaker)", related: ["IAM", "Lambda"] },
      { name: "GCP", categories: ["cloud-devops"], usage: "BigQuery analytics, Vertex AI", related: ["Cloud Functions", "GCS"] },
      { name: "Docker", categories: ["cloud-devops"], usage: "Containerized deployments", related: ["Compose", "Multi-stage builds"] },
      { name: "Terraform", categories: ["cloud-devops"], usage: "Infrastructure as code", related: ["Modules", "State"] },
      { name: "CI/CD", categories: ["cloud-devops"], usage: "Automated testing and deployment", related: ["Jenkins", "GitHub Actions"] },
      { name: "MongoDB", categories: ["data-engineering", "backend"], usage: "Document storage for flexible schemas", related: ["Aggregations", "Indexes"] },
      { name: "Snowflake", categories: ["data-engineering", "analytics-bi"], usage: "Cloud data warehouse", related: ["Stages", "Streams"] },
      { name: "dbt", categories: ["data-engineering", "analytics-bi"], usage: "Data transformations and modeling", related: ["Models", "Tests", "Docs"] }
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
      title: "Data Engineering & Analytics Intern, Data Lead",
      location: "Lawrenceville, Georgia",
      dates: "Oct 2024 - Present",
      type: "current",
      impacts: [
        "Designed backend services in Python for financial market data (prices, earnings, options, fundamentals)",
        "Implemented REST APIs exposing analytics-ready datasets to frontend clients and downstream services",
        "Built shared PostgreSQL schemas and data access layers ensuring reliability and low-latency reads",
        "Improved performance using Apache Ignite caching, indexing, and batch writes",
        "Automated workflows refreshing datasets before market open and after earnings releases"
      ],
      tech: ["Python", "PostgreSQL", "FastAPI", "Apache Ignite", "Sling", "Syncope"],
      learned: "End-to-end ownership of production data systems in fast-paced fintech environment"
    },
    {
      id: "fisher",
      company: "Fisher College of Business",
      title: "NLP Research Engineer",
      location: "Columbus, Ohio",
      dates: "Jul 2024 - Dec 2024",
      type: "research",
      impacts: [
        "Built full-stack web app ingesting/visualizing social media data on macro events",
        "Implemented backend services exposing topic distributions, sentiment scores, and keyword trends",
        "Deployed platform on AWS (EC2, S3) with scheduled background jobs and monitoring"
      ],
      tech: ["Python", "React", "AWS", "LDA", "Sentiment Analysis", "PostgreSQL"],
      learned: "Bridging NLP research to production-ready applications with real user impact"
    },
    {
      id: "car",
      company: "Center for Automotive Research",
      title: "Autonomous Perception Engineer",
      location: "Columbus, Ohio",
      dates: "Aug 2021 - Apr 2024",
      type: "research",
      impacts: [
        "Secured 2nd place nationally in GM-sponsored SAE AutoDrive Challenge II",
        "Led data-driven evaluation of lane-detection models, selecting HybridNet",
        "Developed multi-sensor perception pipeline (camera, LiDAR, GPS/IMU) for 2D/3D localization"
      ],
      tech: ["Python", "PyTorch", "OpenCV", "ROS", "LiDAR", "Computer Vision"],
      learned: "Building safety-critical ML systems with rigorous testing and validation"
    },
    {
      id: "turnt",
      company: "Turnt",
      title: "Data Scientist Intern",
      location: "Columbus, Ohio",
      dates: "May 2023 - Aug 2023",
      type: "internship",
      impacts: [
        "Built backend services for real-time recommendations, improving relevance by 12%",
        "Developed React analytics dashboard visualizing recommendation accuracy",
        "Contributed to 16% increase in user participation through faster iteration"
      ],
      tech: ["Python", "React", "Scikit-learn", "A/B Testing", "PostgreSQL"],
      learned: "Data-driven product development and experimentation culture"
    },
    {
      id: "ta",
      company: "OSU College of Engineering",
      title: "Teaching Assistant, Python",
      location: "Columbus, Ohio",
      dates: "Aug 2022 - Dec 2022",
      type: "teaching",
      impacts: [
        "Supported 180+ students through labs, office hours, and grading",
        "Built assignments covering data structures and algorithms",
        "Facilitated understanding of programming concepts and problem-solving"
      ],
      tech: ["Python", "Data Structures", "Algorithms"],
      learned: "Breaking down complex concepts for diverse learning styles"
    }
  ],

  projects: [
    {
      id: "earnings-checker",
      title: "Earnings Call Fact-Checker & Signal Extraction",
      status: "completed",
      featured: true,
      category: "NLP/ML",
      problem: "Manual review of earnings call transcripts is time-consuming and error-prone",
      approach: "Built system to extract claims, align with SEC filings, and generate verification signals",
      impact: "Reduced manual review time, improved reliability of earnings analysis",
      stack: ["Python", "NLP", "SEC EDGAR", "PostgreSQL"],
      demoUrl: null,
      screenshots: []
    },
    {
      id: "market-lens",
      title: "MarketLens - Investment Analytics App",
      status: "completed",
      featured: false,
      category: "Full Stack",
      problem: "Analysts needed quick, reproducible market analytics without spreadsheet workflows",
      approach: "Built async REST pipelines with dual-database storage for instant dashboard loads",
      impact: "One-click analysis of 5 tickers with 5-10s processing, 252-day time-series",
      stack: ["Java", "Spring Boot", "React", "PostgreSQL", "MongoDB"],
      demoUrl: null,
      screenshots: []
    },
    {
      id: "placeholder-1",
      title: "Real-Time Data Quality Monitor",
      status: "draft",
      featured: false,
      category: "Data Engineering",
      problem: "Coming soon - placeholder for future project",
      approach: "Draft / In progress",
      impact: "Draft / In progress",
      stack: ["Python", "Airflow", "Great Expectations"],
      demoUrl: null,
      screenshots: []
    },
    {
      id: "placeholder-2",
      title: "ML Feature Store Implementation",
      status: "draft",
      featured: false,
      category: "ML Infrastructure",
      problem: "Coming soon - placeholder for future project",
      approach: "Draft / In progress",
      impact: "Draft / In progress",
      stack: ["Python", "Feast", "Redis"],
      demoUrl: null,
      screenshots: []
    }
  ],

  metrics: [
    { value: "2nd", label: "Place Nationally", context: "SAE AutoDrive Challenge II", suffix: "" },
    { value: "94", label: "Accuracy", context: "Recommendation system offline accuracy", suffix: "%" },
    { value: "12", label: "Relevance Boost", context: "Improvement in recommendation relevance", suffix: "%" },
    { value: "16", label: "Engagement Increase", context: "User participation improvement", suffix: "%" },
    { value: "180", label: "Students Supported", context: "As Python TA at OSU", suffix: "+" }
  ],

  blogPosts: [
    {
      slug: "market-data-pipeline",
      title: "Designing a Reproducible Market Data Pipeline",
      status: "draft",
      category: "Data Engineering",
      summary: "How to handle mixed frequencies (daily, intraday, event-driven) in a single coherent system",
      readTime: "8 min",
      content: "Draft content - Coming soon"
    },
    {
      slug: "text-to-signals",
      title: "From Text to Signals: NLP for Macro Events",
      status: "draft",
      category: "NLP/ML",
      summary: "Building topic modeling and sentiment time-series around economic events",
      readTime: "10 min",
      content: "Draft content - Coming soon"
    },
    {
      slug: "trustable-analytics",
      title: "Building Trustable Analytics Systems",
      status: "draft",
      category: "Analytics",
      summary: "Validation checks, versioning, and feature stability across market regimes",
      readTime: "7 min",
      content: "Draft content - Coming soon"
    }
  ],

  certifications: [
    "Oracle Cloud Infrastructure AI Foundations",
    "Bloomberg Market Concepts",
    "HackerRank SQL Advanced"
  ],

  workWithMe: {
    problems: [
      "Data reliability and pipeline stability",
      "Production-grade analytics systems",
      "ML features that actually work in prod",
      "Experimentation and A/B testing"
    ],
    approach: [
      "Take ownership from problem to production",
      "Document everything - future you will thank me",
      "Measure outcomes, not just outputs",
      "Build for maintainability, not just delivery"
    ],
    teamGets: [
      "Clean interfaces and clear abstractions",
      "Strong metrics culture and data hygiene",
      "Velocity without sacrificing quality",
      "Someone who debugs root causes, not symptoms"
    ],
    services: [
      "Data Pipelines",
      "Analytics Dashboards",
      "Experimentation Platforms",
      "ML Feature Engineering",
      "Data Quality Systems"
    ]
  }
};

export default profile;
