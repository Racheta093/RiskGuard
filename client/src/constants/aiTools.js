import {
  Brain,
  BookOpen,
  CircleHelp,
  Layers3,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

export const aiTools = [
  {
    title: "Summary",
    icon: Brain,
    action: "chat",
    prompt:
      "Summarize this document in simple language using headings and bullet points.",
  },
  {
    title: "Explain",
    icon: BookOpen,
    action: "chat",
    prompt:
      "Explain the difficult concepts from this document with simple examples.",
  },
  {
    title: "Quiz",
    icon: CircleHelp,
    action: "quiz",
    count: 10,
  },
  {
    title: "Flashcards",
    icon: Layers3,
    action: "flashcards",
    count: 12,
  },
  {
    title: "Viva",
    icon: GraduationCap,
    action: "chat",
    prompt:
      "Generate important viva questions with detailed answers from this document.",
  },
  {
    title: "Key Concepts",
    icon: Lightbulb,
    action: "chat",
    prompt:
      "List the important concepts from this document with a one-line explanation.",
  },
];
