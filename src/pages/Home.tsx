import { Link } from 'react-router-dom';
import { Flame, Star, Zap, Trophy, BookOpen, ArrowRight } from 'lucide-react';
import { SUBJECTS } from '../utils/subjectConfig';
import { useXP } from '../hooks/useXP';
import { xpProgressInLevel } from '../utils/storage';

export default function Home() {
  const { stats } = useXP();
  const progress = xpProgressInLevel(stats.xp);

  const levelTitles: Record<number, string> = {
    1: 'Beginner', 2: 'Student', 3: 'Scholar', 4: 'Ace', 5: 'Expert',
    6: 'Master', 7: 'Genius', 8: 'Legend', 9: 'Professor', 10: 'Champion',
  };
  const title = levelTitles[Math.min(stats.level, 10)] ?? 'Champion';

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="text-5xl mb-3">🧠</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            IntelliStudy
          </h1>
          <p className="text-slate-400 text-base">
            Your AI-powered study companion — built for the way <em>you</em> learn
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 mb-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white">
                {stats.level}
              </div>
              <div>
                <div className="text-sm font-bold text-white">Level {stats.level} {title}</div>
                <div className="text-xs text-slate-400">{progress.current}/{progress.needed} XP to next level</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-orange-400">
                <Flame className="w-4 h-4" />
                <span className="font-bold">{stats.streak}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4" />
                <span className="font-bold">{stats.xp}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
        </div>

        {/* ADHD Tips Banner */}
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-3 mb-6 text-sm text-indigo-300 flex items-start gap-2">
          <Zap className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
          <span>
            <strong>Focus tip:</strong> Pick ONE subject, set the Pomodoro timer (bottom-right), and work for just 25 minutes. Small wins build momentum! 🚀
          </span>
        </div>

        {/* Subject Grid */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Choose a Subject</h2>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {SUBJECTS.map((s, i) => {
            const subjectXP = stats.subjectXP[s.id] ?? 0;
            return (
              <Link
                key={s.id}
                to={`/subject/${s.id}`}
                className="group flex items-center gap-4 bg-slate-800/80 border border-slate-700/60 hover:border-slate-500/80 rounded-2xl p-4 transition-all hover:scale-[1.01] hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${0.08 + i * 0.04}s`, boxShadow: undefined }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${s.gradient}`}
                >
                  {s.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-base">{s.name}</div>
                  <div className="text-slate-400 text-xs truncate">{s.description}</div>
                  {subjectXP > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-yellow-500 font-semibold">{subjectXP} XP earned</span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="w-5 h-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </Link>
            );
          })}
        </div>

        {/* How it works */}
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">How it works</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { emoji: '📤', label: 'Upload Materials', desc: 'PDFs, URLs, text, videos, podcasts' },
              { emoji: '🤖', label: 'AI Generates', desc: 'Study guides, quizzes & games' },
              { emoji: '🎮', label: 'Play & Learn', desc: 'Matching, flashcards, quizzes' },
              { emoji: '⭐', label: 'Earn XP', desc: 'Track progress, level up!' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2 bg-slate-700/40 rounded-xl p-3">
                <span className="text-lg">{item.emoji}</span>
                <div>
                  <div className="font-semibold text-white">{item.label}</div>
                  <div className="text-slate-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
