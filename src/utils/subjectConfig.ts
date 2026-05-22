import { SubjectConfig } from '../types';

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '📐',
    gradient: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/40',
    accentColor: '#3B82F6',
    bgCard: 'bg-blue-500/10',
    description: 'Master numbers, equations & logical thinking',
    defaultTopics: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
  },
  {
    id: 'science',
    name: 'Science',
    emoji: '🔬',
    gradient: 'from-emerald-500 to-teal-400',
    border: 'border-emerald-500/40',
    accentColor: '#10B981',
    bgCard: 'bg-emerald-500/10',
    description: 'Explore biology, chemistry, physics & beyond',
    defaultTopics: ['Biology', 'Chemistry', 'Physics', 'Genetics', 'Earth Science'],
  },
  {
    id: 'history',
    name: 'History',
    emoji: '📜',
    gradient: 'from-amber-500 to-orange-400',
    border: 'border-amber-500/40',
    accentColor: '#F59E0B',
    bgCard: 'bg-amber-500/10',
    description: 'Journey through civilizations & human stories',
    defaultTopics: ['Ancient History', 'US History', 'World War II', 'Civil Rights', 'Cold War'],
  },
  {
    id: 'spanish',
    name: 'Spanish',
    emoji: '🌮',
    gradient: 'from-red-500 to-rose-400',
    border: 'border-red-500/40',
    accentColor: '#EF4444',
    bgCard: 'bg-red-500/10',
    description: 'Learn vocabulary, grammar & conversation',
    defaultTopics: ['Basic Vocabulary', 'Verb Conjugation', 'Past Tense', 'Future Tense', 'Conversation'],
  },
  {
    id: 'english',
    name: 'English',
    emoji: '📚',
    gradient: 'from-purple-500 to-violet-400',
    border: 'border-purple-500/40',
    accentColor: '#8B5CF6',
    bgCard: 'bg-purple-500/10',
    description: 'Reading, writing, grammar & literary analysis',
    defaultTopics: ['Literary Analysis', 'Essay Writing', 'Grammar', 'Poetry', 'Vocabulary'],
  },
];

export const getSubjectConfig = (id: string): SubjectConfig =>
  SUBJECTS.find(s => s.id === id) ?? SUBJECTS[0];
