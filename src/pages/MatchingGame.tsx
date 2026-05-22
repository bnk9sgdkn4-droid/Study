import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, RotateCcw, CheckCircle, Clock } from 'lucide-react';
import { getSubjectConfig } from '../utils/subjectConfig';
import { generateMatchingPairs } from '../utils/aiMock';
import { MatchingPair } from '../types';
import { useXP } from '../hooks/useXP';
import LoadingSpinner from '../components/LoadingSpinner';

interface Cell {
  id: string;
  text: string;
  type: 'term' | 'def';
  pairId: string;
  matched: boolean;
  selected: boolean;
  wrong: boolean;
}

export default function MatchingGame() {
  const { subject = 'math' } = useParams<{ subject: string }>();
  const cfg = getSubjectConfig(subject);
  const { awardXP } = useXP();
  const [pairs, setPairs] = useState<MatchingPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [cells, setCells] = useState<Cell[]>([]);
  const [selected, setSelected] = useState<Cell | null>(null);
  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setLoading(true);
    generateMatchingPairs(cfg.id).then(p => {
      setPairs(p);
      const all: Cell[] = [
        ...p.map(pair => ({ id: `t-${pair.id}`, text: pair.term, type: 'term' as const, pairId: pair.id, matched: false, selected: false, wrong: false })),
        ...p.map(pair => ({ id: `d-${pair.id}`, text: pair.definition, type: 'def' as const, pairId: pair.id, matched: false, selected: false, wrong: false })),
      ].sort(() => Math.random() - 0.5);
      setCells(all);
      setLoading(false);
      setRunning(true);
    });
  }, [cfg.id]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleCellClick = (cell: Cell) => {
    if (cell.matched || cell.wrong) return;

    if (!selected) {
      setSelected(cell);
      setCells(prev => prev.map(c => c.id === cell.id ? { ...c, selected: true } : c));
      return;
    }

    if (selected.id === cell.id) {
      setSelected(null);
      setCells(prev => prev.map(c => c.id === cell.id ? { ...c, selected: false } : c));
      return;
    }

    // Check match
    if (
      selected.pairId === cell.pairId &&
      selected.type !== cell.type
    ) {
      // Correct!
      const newMatches = matches + 1;
      setMatches(newMatches);
      setCells(prev => prev.map(c =>
        c.pairId === cell.pairId ? { ...c, matched: true, selected: false } : c
      ));
      setSelected(null);
      if (newMatches >= pairs.length) {
        setRunning(false);
        const xp = Math.max(30 - errors * 5, 10);
        awardXP(xp, cfg.id);
        setDone(true);
      }
    } else {
      // Wrong
      setErrors(e => e + 1);
      setCells(prev => prev.map(c =>
        c.id === selected.id || c.id === cell.id ? { ...c, wrong: true, selected: false } : c
      ));
      setTimeout(() => {
        setCells(prev => prev.map(c =>
          c.id === selected.id || c.id === cell.id ? { ...c, wrong: false } : c
        ));
      }, 800);
      setSelected(null);
    }
  };

  const restart = () => {
    setLoading(true);
    setSelected(null);
    setMatches(0);
    setErrors(0);
    setDone(false);
    setSeconds(0);
    generateMatchingPairs(cfg.id).then(p => {
      setPairs(p);
      const all: Cell[] = [
        ...p.map(pair => ({ id: `t-${pair.id}`, text: pair.term, type: 'term' as const, pairId: pair.id, matched: false, selected: false, wrong: false })),
        ...p.map(pair => ({ id: `d-${pair.id}`, text: pair.definition, type: 'def' as const, pairId: pair.id, matched: false, selected: false, wrong: false })),
      ].sort(() => Math.random() - 0.5);
      setCells(all);
      setLoading(false);
      setRunning(true);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <LoadingSpinner message="Building Matching Game" color={cfg.accentColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 animate-slide-up">
          <Link to={`/subject/${subject}`} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-white">Matching Game</h1>
            <p className="text-slate-400 text-xs">Connect each term to its definition</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(seconds)}</span>
            </div>
            <div className="text-slate-400">
              <span className="font-bold text-white">{matches}</span>/{pairs.length}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-5 animate-slide-up" style={{ animationDelay: '0.04s' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(matches / pairs.length) * 100}%`, backgroundColor: cfg.accentColor }}
          />
        </div>

        {/* Instructions */}
        {!done && (
          <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-2.5 mb-5 text-xs text-slate-400 animate-slide-up" style={{ animationDelay: '0.06s' }}>
            <span>👆</span>
            <span>Tap a term, then tap its matching definition. {selected ? <strong className="text-white">Now pick the match!</strong> : ''}</span>
          </div>
        )}

        {/* Game grid */}
        {!done && (
          <div className="grid grid-cols-2 gap-3">
            {cells.map(cell => {
              let border = 'border-slate-700/60';
              let bg = 'bg-slate-800/80';
              let textColor = 'text-slate-200';

              if (cell.matched) {
                bg = 'bg-emerald-500/10';
                border = 'border-emerald-500/40';
                textColor = 'text-emerald-300';
              } else if (cell.wrong) {
                bg = 'bg-red-500/10';
                border = 'border-red-500/50';
                textColor = 'text-red-300';
              } else if (cell.selected) {
                bg = `bg-indigo-500/10`;
                border = `border-indigo-400`;
                textColor = 'text-indigo-200';
              }

              return (
                <button
                  key={cell.id}
                  onClick={() => handleCellClick(cell)}
                  disabled={cell.matched}
                  className={`${bg} border ${border} ${textColor} rounded-2xl p-3.5 text-sm text-left transition-all hover:scale-[1.02] min-h-[80px] flex items-center justify-center text-center leading-snug font-medium ${
                    cell.matched ? 'cursor-default opacity-70' : 'cursor-pointer hover:opacity-90'
                  } ${cell.selected ? 'scale-[1.03] shadow-lg' : ''} ${cell.wrong ? 'animate-shake' : ''}`}
                >
                  {cell.matched && <CheckCircle className="w-3 h-3 text-emerald-400 absolute top-2 right-2" />}
                  {cell.text}
                </button>
              );
            })}
          </div>
        )}

        {/* Done screen */}
        {done && (
          <div className="text-center animate-bounce-in">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-extrabold text-white mb-2">All Matched!</h2>
            <p className="text-slate-400 mb-6">
              {pairs.length}/{pairs.length} pairs in {formatTime(seconds)} with {errors} mistake{errors !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs mx-auto">
              {[
                { label: 'Pairs', value: `${pairs.length}/${pairs.length}`, color: '#10B981' },
                { label: 'Time', value: formatTime(seconds), color: '#6366F1' },
                { label: 'Errors', value: errors.toString(), color: errors === 0 ? '#F59E0B' : '#EF4444' },
              ].map(s => (
                <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-lg" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>

            {errors === 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-5 text-yellow-300 text-sm font-semibold">
                ⭐ Perfect match! No mistakes!
              </div>
            )}

            <div className="flex gap-3 max-w-xs mx-auto">
              <button onClick={restart} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold text-sm transition-colors">
                <RotateCcw className="w-4 h-4" /> Play Again
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
        )}

        {/* Errors counter */}
        {!done && errors > 0 && (
          <div className="mt-4 text-center text-xs text-slate-500">
            {errors} mistake{errors !== 1 ? 's' : ''} — keep going!
          </div>
        )}
      </div>
    </div>
  );
}
