import React from 'react';
import { Calendar, Heart, MessageSquareHeart, CheckSquare, Camera } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'calendar', label: '달력', icon: Calendar },
    { id: 'anniversary', label: '기념일', icon: Heart },
    { id: 'notes', label: '러브노트', icon: MessageSquareHeart },
    { id: 'todos', label: '할일', icon: CheckSquare },
    { id: 'memories', label: '추억', icon: Camera },
  ];

  return (
    <div className="md:hidden fixed bottom-2.5 left-2.5 right-2.5 z-40 bg-white/92 backdrop-blur-2xl border border-rose-200/90 rounded-[28px] py-1.5 px-2 shadow-[0_12px_45px_rgba(244,63,94,0.22)] ring-1 ring-white/90">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive ? 'text-rose-600 scale-105' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div
                className={`p-1.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/35 scale-110'
                    : 'bg-transparent text-stone-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-black text-rose-600 drop-shadow-2xs' : 'font-bold'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5 shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
