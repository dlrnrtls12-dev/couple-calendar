import React, { useState } from 'react';
import { TodoItem, CoupleProfile } from '../types';
import { CheckSquare, Plus, Trash2, ShoppingCart, Home, Sparkles, Check, User } from 'lucide-react';

interface TodoViewProps {
  profile: CoupleProfile;
  todos: TodoItem[];
  onAddTodo: (todo: Omit<TodoItem, 'id' | 'isDone'>) => void;
  onToggleTodo: (id: string, isDone: boolean) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoView: React.FC<TodoViewProps> = ({
  profile,
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'groceries' | 'chore' | 'bucket'>('all');
  const [newText, setNewText] = useState('');
  const [assignedTo, setAssignedTo] = useState<'all' | 'husband' | 'wife'>('all');
  const [category, setCategory] = useState<'groceries' | 'chore' | 'bucket'>('groceries');

  const filteredTodos = todos.filter((t) => {
    if (activeTab === 'all') return true;
    return t.category === activeTab;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    onAddTodo({
      text: newText.trim(),
      assignedTo,
      category,
    });

    setNewText('');
  };

  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case 'groceries':
        return { label: '장보기', icon: ShoppingCart, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'chore':
        return { label: '집안일', icon: Home, bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'bucket':
        return { label: '버킷리스트', icon: Sparkles, bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: '할일', icon: CheckSquare, bg: 'bg-stone-50 text-stone-700 border-stone-200' };
    }
  };

  const getAssigneeLabel = (assigned: 'all' | 'husband' | 'wife') => {
    if (assigned === 'husband') return { label: profile.partner1.nickname || '남편', color: 'bg-blue-100 text-blue-700' };
    if (assigned === 'wife') return { label: profile.partner2.nickname || '아내', color: 'bg-pink-100 text-pink-700' };
    return { label: '함께', color: 'bg-purple-100 text-purple-700' };
  };

  const completedCount = filteredTodos.filter((t) => t.isDone).length;

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="glass-panel rounded-3xl p-4 shadow-sm border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            전체 ({todos.length})
          </button>
          <button
            onClick={() => setActiveTab('groceries')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'groceries'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>장보기</span>
          </button>
          <button
            onClick={() => setActiveTab('chore')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chore'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>집안일</span>
          </button>
          <button
            onClick={() => setActiveTab('bucket')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'bucket'
                ? 'bg-purple-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-purple-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>버킷리스트</span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-semibold bg-white/70 px-3 py-1.5 rounded-xl border border-rose-100">
          완료 {completedCount} / {filteredTodos.length}개
        </div>
      </div>

      {/* Add New Item Form */}
      <div className="glass-panel rounded-3xl p-5 shadow-sm border border-white/80">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="새로운 할 일, 살 물건, 버킷리스트를 입력하세요..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!newText.trim()}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-xs hover:from-rose-600 hover:to-pink-600 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>추가</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            {/* Category select */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400">분류:</span>
              <button
                type="button"
                onClick={() => setCategory('groceries')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  category === 'groceries' ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300' : 'bg-stone-100 text-stone-600'
                }`}
              >
                🛒 장보기
              </button>
              <button
                type="button"
                onClick={() => setCategory('chore')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  category === 'chore' ? 'bg-amber-100 text-amber-800 font-bold border border-amber-300' : 'bg-stone-100 text-stone-600'
                }`}
              >
                🧹 집안일
              </button>
              <button
                type="button"
                onClick={() => setCategory('bucket')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  category === 'bucket' ? 'bg-purple-100 text-purple-800 font-bold border border-purple-300' : 'bg-stone-100 text-stone-600'
                }`}
              >
                🌟 버킷리스트
              </button>
            </div>

            {/* Assignee select */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400">담당:</span>
              <button
                type="button"
                onClick={() => setAssignedTo('all')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  assignedTo === 'all' ? 'bg-purple-100 text-purple-800 font-bold' : 'bg-stone-100 text-stone-600'
                }`}
              >
                함께
              </button>
              <button
                type="button"
                onClick={() => setAssignedTo('husband')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  assignedTo === 'husband' ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-stone-100 text-stone-600'
                }`}
              >
                남편
              </button>
              <button
                type="button"
                onClick={() => setAssignedTo('wife')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  assignedTo === 'wife' ? 'bg-pink-100 text-pink-800 font-bold' : 'bg-stone-100 text-stone-600'
                }`}
              >
                아내
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Todo List */}
      <div className="glass-panel rounded-3xl p-5 shadow-sm border border-white/80">
        <div className="space-y-2">
          {filteredTodos.map((todo) => {
            const catInfo = getCategoryInfo(todo.category);
            const assignee = getAssigneeLabel(todo.assignedTo);
            const Icon = catInfo.icon;

            return (
              <div
                key={todo.id}
                className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  todo.isDone
                    ? 'bg-stone-50/60 border-stone-200/50 opacity-60'
                    : 'bg-white hover:bg-stone-50/50 border-stone-200/80 hover:border-rose-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => onToggleTodo(todo.id, !todo.isDone)}
                    className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      todo.isDone
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'border-stone-300 hover:border-rose-400 bg-white'
                    }`}
                  >
                    {todo.isDone && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${catInfo.bg}`}>
                      {catInfo.label}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${assignee.color}`}>
                      {assignee.label}
                    </span>
                    <span
                      onClick={() => onToggleTodo(todo.id, !todo.isDone)}
                      className={`text-sm font-medium cursor-pointer truncate ${
                        todo.isDone ? 'line-through text-stone-400' : 'text-stone-800'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-stone-400 hover:text-rose-500 rounded-lg transition-all cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {filteredTodos.length === 0 && (
            <div className="text-center py-12 text-stone-400">
              <CheckSquare className="w-10 h-10 mx-auto mb-2 opacity-30 text-rose-400" />
              <p className="text-xs">등록된 항목이 없어요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
