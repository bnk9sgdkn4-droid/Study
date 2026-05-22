import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen, Lightbulb, Tag, HelpCircle } from 'lucide-react';
import { getSubjectConfig } from '../utils/subjectConfig';
import { generateStudyGuide } from '../utils/aiMock';
import { StudyGuide as StudyGuideType } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

export default function StudyGuide() {
  const { subject = 'math' } = useParams<{ subject: string }>();
  const cfg = getSubjectConfig(subject);
  const [guide, setGuide] = useState<StudyGuideType | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    setLoading(true);
    generateStudyGuide(cfg.id).then(g => {
      setGuide(g);
      setLoading(false);
    });
  }, [cfg.id]);

  const toggleSection = (i: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <LoadingSpinner message="Generating Study Guide" color={cfg.accentColor} />
      </div>
    );
  }

  if (!guide) return null;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 animate-slide-up">
          <Link to={`/subject/${subject}`} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: cfg.accentColor }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: cfg.accentColor }}>Study Guide</span>
            </div>
            <h1 className="text-xl font-extrabold text-white leading-tight">{guide.title}</h1>
          </div>
        </div>

        {/* Overview */}
        <div
          className="rounded-2xl p-4 mb-5 animate-slide-up"
          style={{ background: `${cfg.accentColor}15`, border: `1px solid ${cfg.accentColor}30`, animationDelay: '0.04s' } as React.CSSProperties}
        >
          <p className="text-slate-200 text-sm leading-relaxed">{guide.overview}</p>
        </div>

        {/* ADHD Tip */}
        <div className="flex items-start gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 mb-5 text-xs text-indigo-300 animate-slide-up" style={{ animationDelay: '0.06s' }}>
          <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>Read one section at a time. After each section, look away and try to recall 2 key points.</span>
        </div>

        {/* Sections */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Topics</h2>
        <div className="space-y-3 mb-6">
          {guide.sections.map((section, i) => {
            const expanded = expandedSections.has(i);
            return (
              <div
                key={i}
                className="bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden animate-slide-up"
                style={{ animationDelay: `${0.08 + i * 0.05}s` }}
              >
                <button
                  onClick={() => toggleSection(i)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-700/30 transition-colors"
                >
                  <span className="text-xl shrink-0">{section.emoji}</span>
                  <span className="font-bold text-white flex-1">{section.title}</span>
                  <span className="text-xs text-slate-500 mr-2">{section.points.length} points</span>
                  {expanded
                    ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  }
                </button>

                {expanded && (
                  <div className="px-4 pb-4 border-t border-slate-700/40">
                    <ul className="mt-3 space-y-2.5">
                      {section.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                            style={{ backgroundColor: cfg.accentColor }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key Terms */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="w-full flex items-center justify-between bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" style={{ color: cfg.accentColor }} />
              <span className="font-bold text-white">Key Terms ({guide.keyTerms.length})</span>
            </div>
            {showTerms
              ? <ChevronDown className="w-4 h-4 text-slate-400" />
              : <ChevronRight className="w-4 h-4 text-slate-400" />
            }
          </button>
          {showTerms && (
            <div className="mt-2 bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-hidden">
              {guide.keyTerms.map((kt, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 px-4 py-3 ${i < guide.keyTerms.length - 1 ? 'border-b border-slate-700/40' : ''}`}
                >
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${cfg.accentColor}20`, color: cfg.accentColor }}
                  >
                    {kt.term}
                  </span>
                  <span className="text-sm text-slate-300">{kt.definition}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study Tips */}
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4 mb-6 animate-slide-up" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-white text-sm">Study Tips</span>
          </div>
          <ul className="space-y-2">
            {guide.studyTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-yellow-400 shrink-0">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Link
            to={`/subject/${subject}/quiz`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white text-sm"
            style={{ backgroundColor: cfg.accentColor }}
          >
            <HelpCircle className="w-4 h-4" />
            Take the Quiz
          </Link>
          <Link
            to={`/subject/${subject}/flashcards`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm bg-slate-700 text-white hover:bg-slate-600 transition-colors"
          >
            Flashcards →
          </Link>
        </div>
      </div>
    </div>
  );
}
