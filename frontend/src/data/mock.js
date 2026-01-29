// Mock data for development - will be replaced with backend integration

export const mockContactSubmission = {
  success: true,
  message: "Thank you for reaching out! I'll get back to you within 24 hours."
};

export const mockBlogContent = {
  "market-data-pipeline": {
    title: "Designing a Reproducible Market Data Pipeline",
    status: "draft",
    category: "Data Engineering",
    readTime: "8 min",
    publishedAt: null,
    content: `
# Designing a Reproducible Market Data Pipeline

*Portfolio Writing Sample - Draft*

## Executive Summary

Building reliable market data pipelines requires handling multiple data frequencies (daily OHLCV, event-driven earnings, real-time quotes) while maintaining reproducibility and data integrity. This post covers the architecture decisions and implementation patterns I've used in production.

## The Challenge

Market data comes in many forms:
- **Daily data**: End-of-day prices, volumes, adjusted closes
- **Event-driven**: Earnings announcements, dividend declarations
- **Intraday**: Minute bars, tick data, order book snapshots

Each has different:
- Update frequencies
- Storage requirements
- Quality assurance needs
- Downstream consumers

## Architecture Overview

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Sources   │────▶│  Ingestion   │────▶│   Storage   │
│  (APIs/FTP) │     │   Layer      │     │ (Postgres)  │
└─────────────┘     └──────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  Validation  │     │   Serving   │
                    │    Checks    │     │    APIs     │
                    └──────────────┘     └─────────────┘
\`\`\`

## Key Patterns

### 1. Idempotent Ingestion

\`\`\`python
def ingest_daily_prices(date: str, symbols: list[str]):
    """Idempotent: re-running doesn't create duplicates"""
    for symbol in symbols:
        data = fetch_from_source(symbol, date)
        upsert_to_db(
            table="daily_prices",
            conflict_keys=["symbol", "date"],
            data=data
        )
\`\`\`

### 2. Schema Versioning

Track schema changes and data transformations to enable reproducibility.

### 3. Validation at Each Stage

- Source validation: Expected fields, data types
- Transform validation: No unexpected nulls, range checks
- Serving validation: API response schemas

## Key Takeaways

1. **Reproducibility > Speed**: You'll re-run pipelines more than you think
2. **Validate Early**: Catch data issues at ingestion, not in dashboards
3. **Schema Evolution**: Plan for it from day one
4. **Monitoring**: If you can't measure it, you can't fix it

---
*This is a draft writing sample demonstrating my approach to technical documentation.*
    `
  },
  "text-to-signals": {
    title: "From Text to Signals: NLP for Macro Events",
    status: "draft",
    category: "NLP/ML",
    readTime: "10 min",
    publishedAt: null,
    content: `
# From Text to Signals: NLP for Macro Events

*Portfolio Writing Sample - Draft*

## Executive Summary

Social media and news contain valuable signals about market sentiment, especially around macro events like Fed announcements, earnings seasons, and economic data releases. This post covers how to build topic modeling and sentiment pipelines that produce actionable time-series.

## The Approach

### Data Sources
- Twitter/X: High volume, real-time sentiment
- Reddit: Deeper discussions, sector-specific communities
- News APIs: Official announcements, analyst coverage

### Pipeline Architecture

\`\`\`
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Ingest  │────▶│  Clean   │────▶│  Model   │────▶│  Store   │
│  Text    │     │  Text    │     │  Topics  │     │  Signals │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
\`\`\`

### Topic Modeling with LDA

\`\`\`python
from sklearn.decomposition import LatentDirichletAllocation

def extract_topics(documents, n_topics=10):
    vectorizer = CountVectorizer(max_df=0.95, min_df=2)
    doc_term_matrix = vectorizer.fit_transform(documents)
    
    lda = LatentDirichletAllocation(
        n_components=n_topics,
        random_state=42
    )
    lda.fit(doc_term_matrix)
    
    return lda, vectorizer
\`\`\`

### Sentiment Time-Series

Aggregate sentiment scores into daily/hourly time-series aligned with market data.

## Key Takeaways

1. **Event Alignment**: Time-align text signals with market events
2. **Noise Filtering**: Most social media is noise; filter aggressively
3. **Regime Awareness**: Sentiment meaning changes across market regimes
4. **Validation**: Backtest signals before production use

---
*This is a draft writing sample demonstrating my NLP experience.*
    `
  },
  "trustable-analytics": {
    title: "Building Trustable Analytics Systems",
    status: "draft",
    category: "Analytics",
    readTime: "7 min",
    publishedAt: null,
    content: `
# Building Trustable Analytics Systems

*Portfolio Writing Sample - Draft*

## Executive Summary

Analytics systems are only as valuable as their trustworthiness. This post covers validation checks, versioning strategies, and stability testing across different market regimes.

## The Problem

Common failure modes:
- **Silent data issues**: Nulls, duplicates, stale data
- **Metric drift**: Definitions change without documentation
- **Regime blindness**: Models trained on bull markets fail in downturns

## Validation Framework

### 1. Schema Validation

\`\`\`python
from pydantic import BaseModel, validator

class DailyMetrics(BaseModel):
    date: str
    symbol: str
    return_1d: float
    volatility_20d: float
    
    @validator('return_1d')
    def reasonable_return(cls, v):
        if abs(v) > 0.5:  # 50% daily move is suspicious
            raise ValueError(f'Suspicious return: {v}')
        return v
\`\`\`

### 2. Statistical Tests

- Distribution checks: Are today's values within expected ranges?
- Completeness checks: Expected row counts, no missing symbols
- Freshness checks: Data updated within SLA

### 3. Regime-Aware Testing

Test features across different market conditions:
- High volatility periods (VIX > 30)
- Trend regimes (bull/bear/sideways)
- Correlation regimes

## Key Takeaways

1. **Trust is Earned**: Build validation into every pipeline stage
2. **Version Everything**: Data, schemas, and transformation logic
3. **Test Across Regimes**: What works in calm markets may fail in chaos
4. **Monitor Continuously**: Set up alerts before stakeholders complain

---
*This is a draft writing sample demonstrating my analytics approach.*
    `
  }
};

export const mockAchievements = [
  { id: "explorer", name: "Explorer", description: "Found a hidden interaction", unlocked: false },
  { id: "curious", name: "Curious Mind", description: "Discovered 3 easter eggs", unlocked: false },
  { id: "hacker", name: "Konami Master", description: "Unlocked terminal mode", unlocked: false }
];

export default {
  mockContactSubmission,
  mockBlogContent,
  mockAchievements
};
