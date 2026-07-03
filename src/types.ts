export interface Service {
  id: string;
  title: string;
  category: "hardwood" | "vinyl" | "tile" | "laminate" | "repair" | "commercial" | "other";
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  idealApplications: string[];
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Hardwood" | "LVP" | "Laminate" | "Tile" | "Stairs" | "Commercial" | "Residential";
  description: string;
  beforeUrl: string;
  afterUrl: string;
  location: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  projectType: string;
  location: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "materials" | "pricing" | "process" | "warranty";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
