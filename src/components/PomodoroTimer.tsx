import { useState } from 'react';
import { Play, Pause, RotateCcw, Timer, X, ChevronDown } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

export default function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const { display, mode, running, pct, sessions, toggle, reset } = useTimer(25, 5);

  const color = mode === 'focus' ? '#6366F1' : '#10B981';
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl w-52 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {mode === 'focus' ? '🎯 Focus' : '☕ Break'}
            </span>
            <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Circle timer */}
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="#1E293B" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                {display}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-80"
              style={{ backgroundColor: color }}
            >
              {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {running ? 'Pause' : 'Start'}
            </button>
            <button onClick={reset} className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="text-center text-xs text-slate-500">
            {sessions} session{sessions !== 1 ? 's' : ''} completed
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-indigo-500/20"
        >
          <Timer className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-mono font-bold text-white">{display}</span>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: running ? color : '#475569' }}
          />
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      )}
    </div>
  );
}
