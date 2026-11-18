// ============================================================
//  YOUR PROJECTS (the "Things I've built" section).
//  The order here is the order on the page. Keep it short: your best work first,
//  and the two non-AI projects at the end.
// ============================================================

// A photo of a project. Put the file in public/projects/ and write its path as "/projects/name.png".
// width and height are the image's real size in pixels (so the page can save space for it while it loads).
export type ProjectImage = {
  src: string;
  alt: string; // what the picture shows, for people who can't see it
  width: number;
  height: number;
  caption?: string; // a short line shown under the picture
};

// One project. Only title, category, description and tags are required.
export type Project = {
  title: string;
  category: string; // small label above the title, e.g. "RAG benchmark". Each one gets its own color.
  description: string; // what it does, in one or two sentences
  metric?: { value: string; label: string }; // the headline result, e.g. "0.95" + "ROC-AUC on test data"
  status?: string; // e.g. "In progress" (shown with a green dot)
  highlights?: string[]; // 2-3 short points: how it works, what you measured
  tags: string[]; // the tech stack
  link?: string; // the GitHub repo. Leave it out while the code isn't public yet.
  demo?: string; // a live demo (Hugging Face Space, Streamlit, Vercel...). Leave it out if there isn't one.
  images?: ProjectImage[]; // photos shown when someone opens the project. The first one is also shown on its screen.
};

// Every number here should come from the project's own notebook or app, measured on data the
// model has never seen. Double-check them whenever you rerun a project.
export const projects: Project[] = [
  {
    title: "Vectorless vs VectorDB RAG",
    category: "RAG benchmark",
    description:
      "A head-to-head test of three ways to do RAG on the same paper (\"Attention Is All You Need\"), with the same 10 questions and the same answering model: classic vector search with Chroma, an agentic version of it, and PageIndex, which uses no embeddings and lets the LLM reason over a table-of-contents tree.",
    metric: { value: "4.8 / 5", label: "answer score with PageIndex (vector RAG: 4.2)" },
    highlights: [
      "10 questions with the correct pages known in advance; answers judged 1-5, shuffled and unlabeled",
      "PageIndex gave the best answers and the best precision, because it reads whole pages instead of 120-word chunks",
      "Vector RAG was the fastest and cheapest; the agentic version doubled the cost and time for no better answers",
      "A Streamlit app to ask questions and compare all three systems side by side",
    ],
    tags: ["Python", "Chroma", "PageIndex", "LangGraph", "Streamlit"],
    link: "https://github.com/Arpan-ar7/pageindex-vectorless-vs-vectordb-rag",
    images: [
      {
        src: "/projects/rag-faceoff-app.png",
        alt: "The RAG face-off Streamlit app: recall, score and seconds per question for each system, with bar charts and a summary table",
        width: 1035,
        height: 682,
        caption: "The comparison app: same paper, same questions, three systems",
      },
      {
        src: "/projects/rag-benchmark-charts.png",
        alt: "Eight bar charts comparing Vector RAG, Agentic vector RAG and PageIndex on hit rate, recall, precision, answer score, pages read, characters read, seconds per question and LLM calls",
        width: 1042,
        height: 486,
        caption: "All eight measurements for the three systems",
      },
    ],
  },
  {
    title: "Splitter: AI Clip Auto-Uploader",
    category: "AI automation",
    description:
      "Turns a long YouTube video into vertical Shorts and Reels and posts them to YouTube and Instagram, all from one web page. Paste a link: it reads the transcript, an AI picks the most exciting moments, and each one is cut into a 1080×1920 clip for you to review before posting.",
    highlights: [
      "Pipeline: YouTube link → transcript (yt-dlp) → AI picks the highlights (LLM via OpenRouter) → vertical clips (FFmpeg) → upload",
      "Nothing is posted until you've watched the clips, edited their text and pressed Post; you can also upload your own video",
      "Uploads to YouTube Shorts (Google OAuth) and Instagram Reels (Graph API), and tracks each platform's daily limit",
      "Clips over the daily limit are queued and upload automatically later; runs in Docker with a password-protected web page",
    ],
    tags: ["Python", "yt-dlp", "FFmpeg", "OpenRouter (LLM)", "YouTube Data API", "Instagram Graph API", "Docker"],
    link: "https://github.com/Adarshmilan/autouploader",
    // (A demo video can be added here later)
    images: [
      {
        src: "/projects/splitter-dashboard.png",
        alt: "The Splitter dashboard: uploads left today for YouTube and Instagram, a box to paste a YouTube link, and the history of posted clips",
        width: 677,
        height: 320,
        caption: "The dashboard: paste a link, review the clips, then post",
      },
    ],
  },
  {
    title: "Student Mental Health Predictor",
    category: "ML + API",
    description:
      "Predicts a student's mental health score (0–10) from habits like sleep, screen time, study hours and stress, and serves it through an API with a web front end.",
    metric: { value: "0.89", label: "R² on test data" },
    highlights: [
      "Random Forest pipeline over 12 inputs, with its own preprocessing",
      "FastAPI /predict endpoint with Pydantic input checks",
      "Browser UI that shows the score on a gauge",
    ],
    tags: ["scikit-learn", "FastAPI", "Pydantic", "JavaScript"],
    link: "https://github.com/Arpan-ar7/Students_Mental_Health_Predictor",
  },
  {
    title: "Credit Risk Prediction",
    category: "Machine Learning",
    description:
      "Predicts the credit risk of loan applicants with an end-to-end pipeline, from raw data to a tuned and calibrated XGBoost model.",
    metric: { value: "0.95", label: "ROC-AUC on test data" },
    highlights: [
      "XGBoost tuned with Optuna, checked with 5-fold stratified cross-validation",
      "Calibrated probabilities: Brier score down from 0.065 to 0.054",
    ],
    tags: ["XGBoost", "Optuna", "scikit-learn", "Pandas"],
    link: "https://github.com/Arpan-ar7/Credit_Risk_Prediction-MLPROJECT",
  },
  {
    title: "Quora Duplicate Questions",
    category: "NLP",
    description:
      "Detects whether two Quora questions mean the same thing, using TF-IDF and word-overlap features. Random Forest beat logistic regression and XGBoost.",
    metric: { value: "81%", label: "accuracy on 80K test pairs" },
    tags: ["NLP", "TF-IDF", "scikit-learn"],
    link: "https://github.com/Arpan-ar7/NLP-QuoraDuplicateQuestions",
  },
  {
    title: "Understanding Machine Unlearning",
    category: "Learning notes",
    description:
      "Where my unlearning research started: can a trained model forget part of its training data without being retrained from scratch? Notes and experiments on the basics, with Vision Transformers in PyTorch.",
    tags: ["PyTorch", "Hugging Face", "Vision Transformers", "uv"],
    link: "https://github.com/Arpan-ar7/Understanding-Machine-Unlearning",
  },

  // ---- Not AI/ML: software projects (kept at the end) ----
  {
    title: "CampusSphere",
    category: "Web app",
    description:
      "A campus portal with its own dashboard for students, faculty and admins: sign-up and login, profiles, departments and campus activities, on a Flask and MySQL backend.",
    highlights: [
      "Three dashboards with different views and permissions: student, faculty and admin",
      "Flask REST API with hashed passwords (bcrypt) and login sessions",
    ],
    tags: ["JavaScript", "HTML & CSS", "Flask", "MySQL"],
    link: "https://github.com/Arpan-ar7/CampusSphere",
  },
  {
    title: "Cafe Ordering App",
    category: "Android app",
    description:
      "An Android app for ordering at a cafe: browse the menu by category, add, change or remove items in the cart, see the order summary and place the order.",
    tags: ["Kotlin", "Android"],
    link: "https://github.com/Arpan-ar7/CafeOrderingApp",
  },
];
