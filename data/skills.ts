// Skills (the "Skills" section). Each card has a short line and its skills sorted into groups.
// Add or remove skills and groups freely. Only list things you'd be happy to be asked about in an interview.
export const skills = [
  {
    title: "AI & Machine Learning",
    icon: "ai",
    blurb: "From raw data to a trained, measured model: classic ML, deep learning and LLM agents.",
    groups: [
      { label: "LLMs & agents", items: ["LangChain", "LangGraph", "RAG", "Multi-agent systems", "Tool calling", "Structured outputs", "Chroma"] },
      { label: "Deep learning & NLP", items: ["PyTorch", "Hugging Face", "RNNs", "Word2Vec", "TF-IDF"] },
      { label: "Machine learning", items: ["scikit-learn", "XGBoost", "Pandas", "NumPy"] },
      { label: "Experiments", items: ["MLflow", "Optuna", "Cross-validation", "Jupyter"] },
    ],
  },
  {
    title: "Software Engineering",
    icon: "code",
    blurb: "Clean software that works, and the APIs that put models in front of people.",
    groups: [
      { label: "Languages", items: ["Python", "Java", "Kotlin", "C#", "JavaScript", "TypeScript"] },
      { label: "Backend & APIs", items: ["FastAPI", "Pydantic", "REST APIs"] },
      { label: "Tools", items: ["Git & GitHub", "uv"] },
    ],
  },
];
