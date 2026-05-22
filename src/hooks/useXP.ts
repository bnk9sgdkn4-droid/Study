import { useState, useCallback } from 'react';
import { loadStats, saveStats, xpProgressInLevel } from '../utils/storage';
import { Subject, UserStats } from '../types';

export function useXP() {
  const [stats, setStats] = useState<UserStats>(() => loadStats());

  const awardXP = useCallback((amount: number, subject: Subject) => {
    setStats(prev => {
      const next = { ...prev };
      next.xp += amount;
      next.subjectXP = { ...prev.subjectXP, [subject]: (prev.subjectXP[subject] ?? 0) + amount };
      next.level = Math.floor(next.xp / 150) + 1;
      next.lastStudied = new Date().toISOString();
      next.totalSessions = prev.totalSessions + 1;
      saveStats(next);
      return next;
    });
  }, []);

  const progress = xpProgressInLevel(stats.xp);

  return { stats, awardXP, progress };
}
