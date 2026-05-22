export type Subject = 'math' | 'science' | 'history' | 'spanish' | 'english';

export interface SubjectConfig {
  id: Subject;
  name: string;
  emoji: string;
  gradient: string;
  border: string;
  accentColor: string;
  bgCard: string;
  description: string;
  defaultTopics: string[];
}

export interface StudyMaterial {
  id: string;
  subject: Subject;
  title: string;
  content: string;
  type: 'pdf' | 'url' | 'text' | 'video' | 'podcast' | 'image' | 'googledoc';
  uploadedAt: string;
}

export interface StudySection {
  emoji: string;
  title: string;
  points: string[];
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface StudyGuide {
  title: string;
  overview: string;
  sections: StudySection[];
  keyTerms: KeyTerm[];
  studyTips: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MatchingPair {
  id: string;
  term: string;
  definition: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastStudied: string | null;
  totalSessions: number;
  subjectXP: Record<Subject, number>;
  achievements: Achievement[];
}
