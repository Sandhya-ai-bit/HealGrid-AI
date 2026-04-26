HEALGRID AI ✨
Transforming Messy Medical Records into Trustworthy Healthcare Intelligence

HEALGRID AI is an agentic AI system designed to revolutionize healthcare data analysis in India. It processes over 10,000 medical facility records, extracting crucial capabilities, assessing trustworthiness, detecting inconsistencies, and identifying "healthcare deserts." This intelligence empowers NGOs, policymakers, and emergency responders to make data-driven decisions that improve healthcare access and quality across the nation.

Our mission is to bring clarity and actionable insights to complex, often messy, medical data, ensuring resources are allocated effectively where they are needed most.

🚀 Key Features
   🧠 AI Note Parser: Extracts capabilities from unstructured medical notes with high accuracy.
   🛡️ Trust Engine: Scores facility reliability from 0 to 100 across 6 weighted dimensions.
   🔍 Semantic Search: Enables natural language discovery of facilities with explainability.
   ⚡ Contradiction Detector: Flags inconsistencies between reported and extracted data.
   🗺️ Desert Mapper: Identifies critical gaps in healthcare coverage across India's geography.
   📊 NGO Analytics: Provides planning dashboards for strategic resource allocation.
   Explainability Panel: Offers step-by-step AI reasoning for every trust score and capability.
   Contradiction Highlighting: Visualizes detected contradictions directly on raw facility notes.
   Live Feed UI: Presents contradiction flags as a real-time intelligence stream.
   Data Transparency: Clearly differentiates between "AI-Verified" and "Self-Reported" data.

⚙️ Tech Stack

| Layer          | Technology                           |
| :------------- | :----------------------------------- |
| Frontend       | Next.js 14 (App Router) + TypeScript |
| Styling        | Tailwind CSS + shadcn/ui             |
| Animation      | Framer Motion                        |
| Charts         | Recharts                             |
| Maps           | Leaflet + react-leaflet              |
| Icons          | Lucide React                         |
| Backend        | FastAPI (Python)                     |
| Database       | Supabase (PostgreSQL)                |
| AI/NLP (MVP)   | Simulated AI pipeline (rule-based + keyword scoring) |
| File Parsing   | Papa Parse (CSV/XLSX frontend)       |
| Deployment     | Vercel (frontend) + Railway (backend)|

🎨 Design & Branding

HEALGRID AI features a distinct, modern, and tech-forward design language:

   Color System: A dark theme utilizing --bg-primary (#020817), --accent-cyan (#06b6d4), and --accent-emerald (#10b981) for a professional yet dynamic aesthetic.
   Typography: Inter for body text, Space Grotesk for prominent headings, and JetBrains Mono for data readouts, ensuring clarity and readability.
   Design Principles:
       Glassmorphism cards with backdrop-blur and subtle border glows.
       Floating particle backgrounds and animated gradient meshes for engaging visuals.
       Subtle pulse animations on critical data indicators.
       Comprehensive skeleton loading states for smooth user experience.
       Micro-interactions across all interactive elements for enhanced feedback.

🧠 AI Engine (Simulated for MVP)

Our core AI pipeline, currently based on rule-based logic and keyword scoring, will evolve to incorporate advanced LLMs for enhanced intelligence and accuracy.

Capability Extraction

Leverages CAPABILITYKEYWORDS to identify key services like ICU, MRI, Emergency, and more directly from raw notes.

Contradiction Detection

Utilizes CONTRADICTIONPATTERNS to flag discrepancies between structured data and unstructured text, such as conflicting bed counts or service availability claims.

Trust Score Calculation

A composite score derived from 6 weighted dimensions:

Data Completeness (20%): Percentage of required fields populated.
Source Consistency (25%): Match rate between structured data and AI-extracted insights.
Temporal Freshness (15%): Recency of the last data update.
Capability Verification (20%): Number of capabilities confirmed by multiple signals.
Infrastructure Match (12%): Plausibility of claimed capacity against district census data.
Note Quality (8%): Length, specificity, and absence of generic filler in notes.

Score Bands:
   80–100: 🟢 Highly Reliable — Suitable for emergency referrals.
   60–79: 🟡 Moderately Reliable — Verify before critical referrals.
   40–59: 🟠 Low Reliability — Requires independent verification.
   0–39: 🔴 Unreliable — Avoid for planning without field verification.

🗺️ Application Architecture

``
healgrid-ai/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page
│   ├── dashboard/page.tsx      # Main analytics dashboard
│   ├── search/page.tsx         # Hospital intelligence search
│   ├── upload/page.tsx         # Dataset upload flow
│   ├── analytics/page.tsx      # NGO planning & intervention analytics
│   ├── map/page.tsx            # India healthcare heatmap
│   └── layout.tsx              # Root layout & navigation
├── components/                 # Reusable UI components by page/type
├── lib/                        # Core logic (AI, scoring, mock data, Supabase)
├── api/ (FastAPI)              # Backend API routes and services
│   ├── main.py
│   ├── routes/
│   │   ├── facilities.py
│   │   ├── search.py
│   │   ├── upload.py
│   │   └── analytics.py
│   └── services/               # Backend logic (NLP, trust engine)
└── supabase/                   # Supabase schema and migrations
`

🚀 Getting Started

To set up HEALGRID AI locally, follow these steps:

Clone the repository:
    `bash
    git clone https://github.com/Rupali2507/HEALGRID-AI.git # (Example - replace with actual repo)
    cd HEALGRID-AI
    `

Install Frontend Dependencies:
    `bash
    cd frontend # Assuming frontend directory
    npm install
    `

Install Backend Dependencies:
    `bash
    cd backend # Assuming backend directory
    pip install -r requirements.txt
    `

Configure Environment Variables:
    Create a .env file in both frontend and backend directories based on the .env.example provided, filling in values for:
       NEXTPUBLICSUPABASEURL
       NEXTPUBLICSUPABASEANONKEY
       NEXTPUBLICMAPBOXTOKEN (or use Leaflet defaults)
       ANTHROPICAPIKEY (optional, for future AI integration)
    *   FASTAPI_URL (e.g., http://localhost:8000)

Run Backend (FastAPI):
    `bash
    cd backend
    uvicorn main:app --reload
    `
    This will start the FastAPI server, usually on http://localhost:8000.

Run Frontend (Next.js):
    `bash
    cd frontend
    npm run dev
    `
    Open your browser to http://localhost:3000 to access the application.

    Deployed link :
    https://vital-insight-grid.lovable.app

🤝 Contribution

We welcome contributions to HEALGRID AI! Please see our CONTRIBUTING.md` guidelines (to be created) for more details on how you can help improve this platform.

📞 Contact

For questions or feedback, please reach out to the project maintainers.
