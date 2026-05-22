import { Link, useParams, useLocation } from 'react-router-dom';
import { BookOpen, Home, ChevronRight } from 'lucide-react';
import { useXP } from '../hooks/useXP';
import { getSubjectConfig } from '../utils/subjectConfig';
import { xpProgressInLevel } from '../utils/storage';

export default function NavBar() {
  const { subject } = useParams<{ subject: string }>();
  const location = useLocation();
  const { stats } = useXP();
  const progress = xpProgressInLevel(stats.xp);

  const subjectCfg = subject ? getSubjectConfig(subject) : null;
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-slate-900/95 backdrop-blur border-b border-slate-700/60 flex items-center px-4 gap-3">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white text-sm hidden sm:block">IntelliStudy</span>
      </Link>

      {/* Breadcrumb */}
      {!isHome && (
        <div className="flex items-center gap-1 text-sm text-slate-400 min-w-0">
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
          </Link>
          {subjectCfg && (
            <>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link
                to={`/subject/${subjectCfg.id}`}
                className="hover:text-white transition-colors truncate font-medium"
                style={{ color: subjectCfg.accentColor }}
              >
                {subjectCfg.emoji} {subjectCfg.name}
              </Link>
            </>
          )}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* XP Display */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden sm:flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Lv.{stats.level}</span>
            <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-indigo-400 font-semibold">{stats.xp} XP</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
          {stats.level}
        </div>
      </div>
    </nav>
  );
}
