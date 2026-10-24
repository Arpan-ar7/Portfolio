// ============================================================
//  ALL THE TEXT ON THE WEBSITE LIVES HERE.
//  Edit this file to change your info, skills, projects, etc.
//  You don't need to touch the components for content changes.
// ============================================================

export const profile = {
  name: "Arpan Kumar Panda",
  firstName: "Arpan",
  role: "AI/ML Engineer",
  tagline:
    "3rd-year B.Tech CSE student building intelligent systems — and endlessly curious about the universe.",
  // The short line under your big name on the first screen
  heroLine: "I build intelligent systems with AI & ML, write software that works, and never stop looking up at the stars.",
  university: "Marwadi University",
  degree: "B.Tech in Computer Science & Engineering",
  year: "3rd year",
  // TODO: add your email here to show an "Email" link on the contact section.
  email: "",
  github: "https://github.com/Arpan-ar7",
  linkedin: "https://www.linkedin.com/in/arpankumarpanda",
};

// Paragraphs shown in the "About" section
export const about = [
  "I'm Arpan, a third-year Computer Science student at Marwadi University. My main focus is AI and Machine Learning — from classic ML models and NLP to deep learning with PyTorch and LLM-powered agents with LangChain and LangGraph.",
  "I like turning ideas into working things: training a model, wrapping it in an API, and putting a simple interface on top. I'm actively looking for AI/ML roles, and I'm just as open to software engineering positions.",
  "Outside of code I'm drawn to the big questions — space, cosmology, physics, maths, chemistry and human biology. Lately I've also been getting curious about cybersecurity.",
];

// Small stat cards in the About section
export const stats = [
  { value: "3rd", label: "Year of B.Tech CSE" },
  { value: "20+", label: "Repos on GitHub" },
  { value: "AI/ML", label: "Main focus" },
];

// Skill groups (the "Skills" section). Add or remove freely.
export const skills = [
  {
    title: "AI / Machine Learning",
    items: ["Python", "PyTorch", "scikit-learn", "Pandas", "NumPy", "NLP", "RNNs", "Word2Vec", "LangChain", "LangGraph"],
  },
  {
    title: "Software Engineering",
    items: ["Java", "Kotlin", "C#", "JavaScript", "TypeScript", "FastAPI", "Git & GitHub"],
  },
  {
    title: "Currently Exploring",
    items: ["Multi-agent systems", "Cybersecurity", "Rust"],
  },
];

// Featured projects. Descriptions are a first draft — check and adjust them!
export const projects = [
  {
    title: "Multi-Agent Research System",
    description: "A group of AI agents that work together to research a topic and put the findings into one report.",
    tags: ["Python", "LLM Agents", "LangGraph"],
    link: "https://github.com/Arpan-ar7/Multi_Agent_Research_System",
  },
  {
    title: "Student Mental Health Predictor",
    description: "Predicts a student's mental health score (0–10) from habits like sleep, study time and social media use. ML model served with FastAPI and a web front end.",
    tags: ["scikit-learn", "FastAPI", "Web"],
    link: "https://github.com/Arpan-ar7/Students_Mental_Health_Predictor",
  },
  {
    title: "Question Answering System",
    description: "A question answering model built from scratch with a recurrent neural network in PyTorch.",
    tags: ["PyTorch", "RNN", "NLP"],
    link: "https://github.com/Arpan-ar7/QuestionAnswerSystem-using-RNN-PyTorch-",
  },
  {
    title: "Credit Risk Prediction",
    description: "Classifies loan applicants by credit risk using an end-to-end machine learning pipeline.",
    tags: ["ML", "Classification", "Pandas"],
    link: "https://github.com/Arpan-ar7/Credit_Risk_Prediction-MLPROJECT",
  },
  {
    title: "Quora Duplicate Questions",
    description: "Detects whether two Quora questions mean the same thing using NLP features and ML models.",
    tags: ["NLP", "Feature Engineering", "ML"],
    link: "https://github.com/Arpan-ar7/NLP-QuoraDuplicateQuestions",
  },
  {
    title: "Customer Churn Predictor",
    description: "Predicts which customers are likely to leave, from data cleaning and feature engineering to model evaluation.",
    tags: ["ML", "Jupyter", "scikit-learn"],
    link: "https://github.com/Arpan-ar7/ChurnPredictor-ML-",
  },
];

