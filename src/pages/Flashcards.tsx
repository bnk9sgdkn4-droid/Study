import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Trophy, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { getSubjectConfig } from '../utils/subjectConfig';
import { generateFlashcards } from '../utils/aiMock';
import { Flashcard } from '../types';
import { useXP } from '../hooks/useXP';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Flashcards() {
  const { subject = 'math' } = useParams<{ subject: string }>();
  const cfg = getSubjectConfig(subject);
  const { awardXP } = useXP();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [ratings, setRatings] = useState<Record<string, 'easy' | 'medium' | 'hard'>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLoading(true);
    generateFlashcards(cfg.id).then(c => {
      setCards(c);
      setLoading(false);
    });
  }, [cfg.id]);

  const handleFlip = () => setFlipped(f => !f);

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    const card = cards[current];
    setRatings(r => ({ ...r, [card.id]: rating }));
    setFlipped(false);
    if (current + 1 >= cards.length) {
      const easy = Object.values({ ...ratings, [card.id]: rating }).filter(r => r === 'easy').length;
      const total = cards.length;
      awardXP(easy * 5 + Math.round((total - easy) * 3), cfg.id);
      setDone(true);
    } else {
      setTimeout(() => setCurrent(c => c + 1), 200);
    }
  };

  const prev = () => {
    if (current > 0) { setFlipped(false); setTimeout(() => setCurrent(c => c - 1), 100); }
  };
  const next = () => {
    if (current < cards.length - 1) { setFlipped(false); setTimeout(() => setCurrent(c => c + 1), 100); }
  };

  const restart = () => {
    setLoading(true);
    setCurrent(0);
    setFlipped(false);
    setRatings({});
    setDone(false);
    generateFlashcards(cfg.id).then(c => {
      setCards(c);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <LoadingSpinner message="Loading Flashcards" color={cfg.accentColor} />
      </div>
    );
  }

  if (done) {
    const easy = Object.values(ratings).filter(r => r === 'easy').length;
    const medium = Object.values(ratings).filter(r => r === 'medium').length;
    const hard = Object.values(ratings).filter(r => r === 'hard').length;

    return (
      <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-sm w-full text-center animate-bounce-in">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-extrabold text-white mb-1">Deck Complete!</h2>
          <p className="text-slate-400 mb-6">You reviewed all {cards.length} cards</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Got It!', value: easy, color: '#10B981', emoji: '✅' },
              { label: 'Review', value: medium, color: '#F59E0B', emoji: '🔄' },
              { label: 'Again', value: hard, color: '#EF4444', emoji: '❌' },
            ].map(s => (
              <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-3">
                <div className="text-xl mb-1">{s.emoji}</div>
                <div className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>

          {hard > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-5 text-amber-300 text-sm">
              💡 Review the {hard} hard card{hard !== 1 ? 's' : ''} before your test!
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold text-sm transition-colors">
              <RotateCcw className="w-4 h-4" /> Again
            </button>
            <Link
              to={`/subject/${subject}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-2xl font-bold text-sm"
              style={{ backgroundColor: cfg.accentColor }}
            >
              <Trophy className="w-4 h-4" /> Done
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const card = cards[current];

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 animate-slide-up">
          <Link to={`/subject/${subject}`} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-white">Flashcards</span>
              <span className="text-xs text-slate-400">{current + 1} / {cards.length}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / cards.length) * 100}%`, backgroundColor: cfg.accentColor }}
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          className="flip-card w-full mb-5 animate-fade-in"
          style={{ height: '260px' }}
        >
          <div className={`flip-card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
            {/* Front */}
            <div
              className="flip-card-front w-full h-full bg-slate-800 border-2 border-slate-700/60 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-slate-500 transition-colors"
              onClick={handleFlip}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: cfg.accentColor }}
              >
                {cfg.emoji} Tap to flip
              </div>
              <p className="text-white font-bold text-lg text-center leading-relaxed">
                {card.front}
              </p>
              <div className="mt-4 text-slate-600 text-sm">
                Card {current + 1} of {cards.length}
              </div>
            </div>

            {/* Back */}
            <div
              className="flip-card-back w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${cfg.accentColor}18, ${cfg.accentColor}30)`, border: `2px solid ${cfg.accentColor}60` }}
              onClick={handleFlip}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: cfg.accentColor }}
              >
                Answer
              </div>
              <p className="text-white font-semibold text-base text-center leading-relaxed whitespace-pre-line">
                {card.back}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prev}
            disabled={current === 0}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {!flipped ? (
            <button
              onClick={handleFlip}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-80"
              style={{ backgroundColor: cfg.accentColor }}
            >
              Flip Card
            </button>
          ) : (
            <span className="text-xs text-slate-400">How well did you know this?</span>
          )}

          <button
            onClick={next}
            disabled={current === cards.length - 1}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Rating buttons (show after flip) */}
        {flipped && (
          <div className="flex gap-3 animate-fade-in">
            <button
              onClick={() => handleRate('hard')}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-red-500/10 border border-red-500/40 hover:bg-red-500/20 text-red-300 rounded-2xl transition-all"
            >
              <ThumbsDown className="w-5 h-5" />
              <span className="text-xs font-semibold">Missed It</span>
            </button>
            <button
              onClick={() => handleRate('medium')}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-amber-300 rounded-2xl transition-all"
            >
              <Minus className="w-5 h-5" />
              <span className="text-xs font-semibold">Almost</span>
            </button>
            <button
              onClick={() => handleRate('easy')}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-500/20 text-emerald-300 rounded-2xl transition-all"
            >
              <ThumbsUp className="w-5 h-5" />
              <span className="text-xs font-semibold">Got It!</span>
            </button>
          </div>
        )}

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5 flex-wrap">
          {cards.map((c, i) => {
            const rating = ratings[c.id];
            let color = i === current ? cfg.accentColor : '#334155';
            if (rating === 'easy') color = '#10B981';
            else if (rating === 'medium') color = '#F59E0B';
            else if (rating === 'hard') color = '#EF4444';
            return (
              <button
                key={c.id}
                onClick={() => { setFlipped(false); setCurrent(i); }}
                className="w-2.5 h-2.5 rounded-full transition-all hover:scale-125"
                style={{ backgroundColor: color, opacity: i === current ? 1 : 0.7 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
