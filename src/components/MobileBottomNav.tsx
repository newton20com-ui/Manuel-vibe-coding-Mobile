import React from 'react';
import { BookOpen, Cpu, Wrench, Layers, Home } from 'lucide-react';

interface MobileBottomNavProps {
  currentPageId: string;
  onNavigate: (pageId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPageId,
  onNavigate,
}) => {
  const navItems = [
    { id: 'overview', label: 'Index', icon: Home },
    { id: 'parcours', label: 'Guides', icon: BookOpen },
    { id: 'ai-architect', label: 'Blueprints', icon: Layers, highlight: true },
    { id: 'playground', label: 'Runtimes', icon: Cpu },
    { id: 'outils', label: 'Outils', icon: Wrench },
  ];

  return (
    <nav
      aria-label="Navigation mobile documentation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#15141a]/95 backdrop-blur-xl border-t border-[#2e2d38] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-15 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPageId === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center min-h-[48px] py-1 px-0.5 text-center transition-all group active:scale-95"
              >
                <div className={`w-10 h-7 rounded-lg flex items-center justify-center shadow-md mb-0.5 ${
                  isActive
                    ? 'bg-cyan-300 ring-2 ring-cyan-400'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-cyan-950/50'
                }`}>
                  <Icon className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-300 leading-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-0.5 text-center transition-all active:scale-95 ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative mb-0.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400 stroke-[2.2]' : 'text-slate-400'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] font-mono leading-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
