import React from 'react';
import { Calendar, Heart, MessageSquareHeart, CheckSquare, Camera } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'calendar', label: '캘린더', icon: Calendar },
    { id: 'anniversary', label: '기념일', icon: Heart },
    { id: 'notes', label: '러브노트', icon: MessageSquareHeart },
    { id: 'todos', label: '할일', icon: CheckSquare },
    { id: 'memories', label: '추억', icon: Camera },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-2xl border-t border-rose-200/60 pb-[max(env(safe-area-inset-bottom),10px)] pt-2 shadow-[0_-8px_32px_rgba(244,63,94,0.12)]">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive ? 'text-rose-600 scale-105' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div
                className={`p-1.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30'
                    : 'bg-transparent text-stone-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-black text-rose-600' : 'font-semibold'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-rose-500 mt-0.5 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
