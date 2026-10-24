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
  heroLine: "The magic you are looking for is in the work you are avoiding.",
  university: "Marwadi University",
  degree: "B.Tech in Computer Science & Engineering",
  year: "3rd year",
  // Shown as the main link on the contact screens
  email: "arpankumarpandaar7@gmail.com",
  github: "https://github.com/Arpan-ar7",
  linkedin: "https://www.linkedin.com/in/arpankumarpanda",
};

// Where the live night sky on the home page is seen from (Rajkot, home of Marwadi University).
// Change these to any place on Earth: lat = north is +, lon = east is +.
export const sky = {
  place: "Rajkot, India",
  lat: 22.3,
  lon: 70.8,
};

// Paragraphs shown in the "About" section
export const about = [
  "I'm Arpan, a third-year Computer Science student at Marwadi University. My main focus is AI and Machine Learning — from classic ML models and NLP to deep learning with PyTorch and LLM-powered agents with LangChain and LangGraph.",
  "I like turning ideas into working things: training a model, wrapping it in an API, and putting a simple interface on top. I'm actively looking for AI/ML roles, and I'm just as open to software engineering positions.",
  "Outside of code I'm drawn to the big questions — space, cosmology, physics, maths, chemistry and human biology. Lately I've also been getting curious about cybersecurity.",
];

// The quote at the end of the About section
export const aboutQuote = {
  text: "Jack of all trades, master of none.",
  author: "English proverb",
};

// Small stat cards in the About section
export const stats = [
  { value: "3rd", label: "Year of B.Tech CSE" },
  { value: "20+", label: "Repos on GitHub" },
  { value: "AI/ML", label: "Main focus" },
];

// Skills (the "Skills" section). Each card has a short line and its skills sorted into groups.
// Add or remove skills and groups freely.
export const skills = [
  {
    title: "AI / Machine Learning",
    icon: "ai",
    blurb: "Building, training and shipping models, from classic ML to LLM-powered agents.",
    groups: [
      { label: "Core", items: ["Python", "Pandas", "NumPy", "scikit-learn"] },
      { label: "Deep learning & NLP", items: ["PyTorch", "NLP", "RNNs", "Word2Vec"] },
      { label: "LLMs & agents", items: ["LangChain", "LangGraph"] },
    ],
  },
  {
    title: "Software Engineering",
    icon: "code",
    blurb: "Writing clean software that works, and the APIs that put models in front of people.",
    groups: [
      { label: "Languages", items: ["Java", "Kotlin", "C#", "JavaScript", "TypeScript"] },
      { label: "Backend & tools", items: ["FastAPI", "Git & GitHub"] },
    ],
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

