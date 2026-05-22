import { UserStats, Subject, StudyMaterial } from '../types';

const STATS_KEY = 'intellistudy_stats';
const MATERIALS_KEY = 'intellistudy_materials';

export const defaultStats: UserStats = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudied: null,
  totalSessions: 0,
  subjectXP: { math: 0, science: 0, history: 0, spanish: 0, english: 0 },
  achievements: [],
};

export function loadStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : defaultStats;
  } catch {
    return defaultStats;
  }
}

export function saveStats(stats: UserStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function addXP(amount: number, subject: Subject): UserStats {
  const stats = loadStats();
  stats.xp += amount;
  stats.subjectXP[subject] = (stats.subjectXP[subject] ?? 0) + amount;
  stats.level = Math.floor(stats.xp / 150) + 1;
  stats.lastStudied = new Date().toISOString();
  stats.totalSessions += 1;

  // Check streak
  if (stats.lastStudied) {
    const last = new Date(stats.lastStudied);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - last.getTime()) / 86400000);
    if (diffDays <= 1) stats.streak += 1;
    else stats.streak = 1;
  }

  saveStats(stats);
  return stats;
}

export function xpForLevel(level: number): number {
  return (level - 1) * 150;
}

export function xpProgressInLevel(xp: number): { current: number; needed: number; pct: number } {
  const level = Math.floor(xp / 150) + 1;
  const base = xpForLevel(level);
  const current = xp - base;
  const needed = 150;
  return { current, needed, pct: Math.min(100, (current / needed) * 100) };
}

// Materials
export function loadMaterials(subject?: Subject): StudyMaterial[] {
  try {
    const raw = localStorage.getItem(MATERIALS_KEY);
    const all: StudyMaterial[] = raw ? JSON.parse(raw) : [];
    return subject ? all.filter(m => m.subject === subject) : all;
  } catch {
    return [];
  }
}

export function saveMaterial(material: StudyMaterial): void {
  const all = loadMaterials();
  all.unshift(material);
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(all.slice(0, 50)));
}

export function deleteMaterial(id: string): void {
  const all = loadMaterials().filter(m => m.id !== id);
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(all));
}
