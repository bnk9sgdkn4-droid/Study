import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerMode = 'focus' | 'break';

export function useTimer(focusMinutes = 25, breakMinutes = 5) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const totalSeconds = mode === 'focus' ? focusMinutes * 60 : breakMinutes * 60;
  const pct = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const tick = useCallback(() => {
    setSecondsLeft(s => {
      if (s <= 1) {
        setRunning(false);
        setMode(prev => {
          const next = prev === 'focus' ? 'break' : 'focus';
          setSecondsLeft(next === 'focus' ? focusMinutes * 60 : breakMinutes * 60);
          if (next === 'focus') setSessions(n => n + 1);
          return next;
        });
        return 0;
      }
      return s - 1;
    });
  }, [focusMinutes, breakMinutes]);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, tick]);

  const toggle = () => setRunning(r => !r);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(focusMinutes * 60);
    setMode('focus');
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { display, mode, running, pct, sessions, toggle, reset };
}
