import { useParams, Link } from 'react-router-dom';
import { Upload, BookOpen, HelpCircle, Layers, Shuffle, Mic, Play, Presentation } from 'lucide-react';
import { getSubjectConfig } from '../utils/subjectConfig';
import { loadMaterials } from '../utils/storage';
import { useXP } from '../hooks/useXP';
import { xpProgressInLevel } from '../utils/storage';

export default function SubjectPage() {
  const { subject = 'math' } = useParams<{ subject: string }>();
  const cfg = getSubjectConfig(subject);
  const { stats } = useXP();
  const progress = xpProgressInLevel(stats.xp);
  const materials = loadMaterials(cfg.id);
  const subjectXP = stats.subjectXP[cfg.id] ?? 0;

  const activities = [
    { icon: BookOpen, label: 'Study Guide', desc: 'AI-generated notes & key terms', path: 'study-guide', color: '#6366F1', badge: 'AI' },
    { icon: HelpCircle, label: 'Practice Quiz', desc: 'Test yourself with 8 questions', path: 'quiz', color: '#F59E0B', badge: '+XP' },
    { icon: Shuffle, label: 'Matching Game', desc: 'Connect terms to definitions', path: 'matching', color: '#10B981', badge: '+XP' },
    { icon: Layers, label: 'Flashcards', desc: 'Spaced repetition flip cards', path: 'flashcards', color: '#EF4444', badge: '+XP' },
  ];

  const comingSoon = [
    { icon: Mic, label: 'Podcast', desc: 'Audio study guide' },
    { icon: Presentation, label: 'Slideshow', desc: 'Visual presentation' },
    { icon: Play, label: 'Study Video', desc: 'Animated explainer' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 animate-slide-up">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-3xl shadow-lg`}>
            {cfg.emoji}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white">{cfg.name}</h1>
            <p className="text-slate-400 text-sm">{cfg.description}</p>
            {subjectXP > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-bold" style={{ color: cfg.accentColor }}>{subjectXP} XP in this subject</span>
              </div>
            )}
          </div>
        </div>

        {/* XP Progress for this subject */}
        {subjectXP > 0 && (
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-3 mb-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">Subject Progress</span>
              <span className="font-bold" style={{ color: cfg.accentColor }}>{subjectXP} XP</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (subjectXP / 500) * 100)}%`, backgroundColor: cfg.accentColor }}
              />
            </div>
          </div>
        )}

        {/* Upload Materials */}
        <Link
          to={`/subject/${subject}/upload`}
          className={`flex items-center gap-3 w-full ${cfg.bgCard} border ${cfg.border} hover:opacity-90 rounded-2xl p-4 mb-5 transition-all hover:scale-[1.01] animate-slide-up group`}
          style={{ animationDelay: '0.08s' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${cfg.accentColor}20` }}
          >
            <Upload className="w-5 h-5" style={{ color: cfg.accentColor }} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-white">Upload Study Materials</div>
            <div className="text-xs text-slate-400">
              {materials.length > 0
                ? `${materials.length} material${materials.length !== 1 ? 's' : ''} uploaded`
                : 'PDFs, URLs, text, videos, podcasts & more'}
            </div>
          </div>
          <div
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${cfg.accentColor}20`, color: cfg.accentColor }}
          >
            {materials.length} files
          </div>
        </Link>

        {/* Topic Pills */}
        <div className="mb-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Popular Topics</div>
          <div className="flex flex-wrap gap-2">
            {cfg.defaultTopics.map(topic => (
              <span
                key={topic}
                className="text-xs px-3 py-1.5 rounded-full font-medium border cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: `${cfg.accentColor}15`,
                  borderColor: `${cfg.accentColor}40`,
                  color: cfg.accentColor,
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Activities */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Study Activities</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {activities.map((act, i) => (
            <Link
              key={act.path}
              to={`/subject/${subject}/${act.path}`}
              className="group flex flex-col bg-slate-800/80 border border-slate-700/60 hover:border-slate-500 rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${0.12 + i * 0.04}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${act.color}20` }}
                >
                  <act.icon className="w-5 h-5" style={{ color: act.color }} />
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${act.color}20`, color: act.color }}
                >
                  {act.badge}
                </span>
              </div>
              <div className="font-bold text-white text-sm">{act.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{act.desc}</div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Coming Soon</h2>
        <div className="grid grid-cols-3 gap-3">
          {comingSoon.map(item => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-slate-800/40 border border-slate-700/30 rounded-2xl p-4 opacity-50"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-700/50 flex items-center justify-center mb-2">
                <item.icon className="w-5 h-5 text-slate-500" />
              </div>
              <div className="font-semibold text-slate-400 text-xs text-center">{item.label}</div>
              <div className="text-xs text-slate-600 text-center mt-0.5">{item.desc}</div>
              <span className="mt-2 text-xs bg-slate-700/50 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
