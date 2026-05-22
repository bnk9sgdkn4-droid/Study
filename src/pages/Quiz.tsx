import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Zap } from 'lucide-react';
import { getSubjectConfig } from '../utils/subjectConfig';
import { generateQuiz } from '../utils/aiMock';
import { QuizQuestion } from '../types';
import { useXP } from '../hooks/useXP';
import LoadingSpinner from '../components/LoadingSpinner';

type AnswerState = 'unanswered' | 'correct' | 'wrong';

export default function Quiz() {
  const { subject = 'math' } = useParams<{ subject: string }>();
  const cfg = getSubjectConfig(subject);
  const { awardXP } = useXP();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    setLoading(true);
    generateQuiz(cfg.id).then(q => {
      setQuestions(q);
      setLoading(false);
    });
  }, [cfg.id]);

  const handleAnswer = (idx: number) => {
    if (answerState !== 'unanswered') return;
    setSelected(idx);
    const q = questions[current];
    const correct = idx === q.correctIndex;
    setAnswerState(correct ? 'correct' : 'wrong');

    if (correct) {
      const newStreak = streak + 1;
      const newMax = Math.max(newStreak, maxStreak);
      setStreak(newStreak);
      setMaxStreak(newMax);
      const xp = newStreak >= 3 ? 20 : 10;
      setScore(s => s + 1);
      setXpEarned(x => x + xp);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      awardXP(xpEarned + (score === questions.length ? 50 : 0), cfg.id);
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswerState('unanswered');
    }
  };

  const restart = () => {
    setLoading(true);
    setCurrent(0);
    setSelected(null);
    setAnswerState('unanswered');
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setDone(false);
    setXpEarned(0);
    generateQuiz(cfg.id).then(q => {
      setQuestions(q);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <LoadingSpinner message="Generating Quiz" color={cfg.accentColor} />
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const totalXP = xpEarned + (score === questions.length ? 50 : 0);
    let grade = { emoji: '😅', label: 'Keep practicing!', color: '#EF4444' };
    if (pct >= 90) grade = { emoji: '🏆', label: 'Outstanding!', color: '#F59E0B' };
    else if (pct >= 75) grade = { emoji: '🎉', label: 'Great job!', color: '#10B981' };
    else if (pct >= 50) grade = { emoji: '👍', label: 'Good effort!', color: '#6366F1' };

    return (
      <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-sm w-full text-center animate-bounce-in">
          <div className="text-6xl mb-4">{grade.emoji}</div>
          <h2 className="text-2xl font-extrabold text-white mb-1">{grade.label}</h2>
          <p className="text-slate-400 mb-6">You scored {score}/{questions.length} ({pct}%)</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Score', value: `${score}/${questions.length}`, color: grade.color },
              { label: 'XP Earned', value: `+${totalXP}`, color: '#6366F1' },
              { label: 'Best Streak', value: `${maxStreak}🔥`, color: '#F59E0B' },
            ].map(stat => (
              <div key={stat.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-3">
                <div className="text-lg font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {score === questions.length && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-5 text-yellow-300 text-sm font-semibold">
              🎉 Perfect Score! Bonus +50 XP!
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold text-sm transition-colors">
              <RotateCcw className="w-4 h-4" /> Try Again
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

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 animate-slide-up">
          <Link to={`/subject/${subject}`} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400">
                Question {current + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2">
                {streak >= 2 && (
                  <span className="text-xs font-bold text-orange-400 flex items-center gap-0.5">
                    <Zap className="w-3 h-3" /> {streak}x streak!
                  </span>
                )}
                <span className="text-xs text-slate-400">Score: {score}</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: cfg.accentColor }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 mb-4 animate-slide-up" style={{ animationDelay: '0.04s' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: cfg.accentColor }}>
            {cfg.emoji} {cfg.name}
          </div>
          <p className="text-white font-bold text-lg leading-snug">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {q.options.map((opt, i) => {
            let style = 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:border-slate-500 hover:bg-slate-700/60';
            if (answerState !== 'unanswered') {
              if (i === q.correctIndex) style = 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200';
              else if (i === selected && selected !== q.correctIndex) style = 'bg-red-500/15 border-red-500/60 text-red-200';
              else style = 'bg-slate-800/40 border-slate-700/30 text-slate-500';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answerState !== 'unanswered'}
                className={`w-full flex items-center gap-3 border rounded-2xl p-4 text-left transition-all font-medium text-sm ${style} ${answerState === 'unanswered' ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'}`}
              >
                <span className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {answerState !== 'unanswered' && i === q.correctIndex && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {answerState !== 'unanswered' && i === selected && selected !== q.correctIndex && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answerState !== 'unanswered' && (
          <div
            className={`rounded-2xl p-4 mb-5 animate-fade-in text-sm ${
              answerState === 'correct'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                : 'bg-red-500/10 border border-red-500/30 text-red-200'
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-2">
              {answerState === 'correct' ? (
                <><CheckCircle className="w-4 h-4" /> Correct! +{streak >= 3 ? 20 : 10} XP</>
              ) : (
                <><XCircle className="w-4 h-4" /> Not quite</>
              )}
            </div>
            <p className="opacity-90">{q.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {answerState !== 'unanswered' && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white text-sm animate-fade-in"
            style={{ backgroundColor: cfg.accentColor }}
          >
            {current + 1 >= questions.length ? (
              <><Trophy className="w-4 h-4" /> See Results</>
            ) : (
              <>Next Question <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
