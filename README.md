# 🛍️ ShopIntel – AI Shopping Intelligence Agent

ShopIntel is an AI-powered shopping research platform that helps users **search, compare, verify, and analyze products** based on their requirements.

## 🚀 Features

* 🔎 Natural-language product search
* 🤖 AI requirement extraction
* 🛒 Product discovery using SerpApi
* ⚖️ Requirement-based product comparison
* 📊 Product specification analysis
* ⭐ Review and rating research
* 🔍 Evidence-based product insights
* 💰 Price comparison
* 🔄 Similar and cheaper product discovery
* 📈 Future support for price tracking

## 🏗️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** NextJS
* **Search:** SerpApi
* **AI:** Google Gemini
* **Database:** PostgreSQL 

## 🔄 How It Works

```text
User Query
    ↓
AI Requirement Extraction
    ↓
SerpApi Product Search
    ↓
Product Normalization
    ↓
Requirement Matching
    ↓
AI Analysis
    ↓
Comparison & Evidence
```

## ⚙️ Setup

```bash
npm install
npm start
```

Create `.env`:

```env
SERPAPI_KEY=your_serpapi_key
GEMINI_API_KEY=your_gemini_key
DEMO_MODE=false
```

Open:

```text
http://localhost:3000
```

## 💡 Example

> "Adidas Backpack under 2000"

ShopIntel analyzes the products and shows how well each product matches the user's requirements.

## 🎯 Goal

**ShopIntel aims to become a "Perplexity for Products" — an AI agent that researches products and provides evidence-based comparisons instead of simply displaying search results.**
