import React, { useState } from 'react';
import { MemoryItem, CoupleProfile } from '../types';
import { Camera, Heart, Plus, Trash2, Calendar, Sparkles } from 'lucide-react';
import { formatKoreanDate } from '../utils/dateUtils';

interface MemoriesViewProps {
  profile: CoupleProfile;
  memories: MemoryItem[];
  onAddMemory: (memory: Omit<MemoryItem, 'id' | 'likes'>) => void;
  onLikeMemory: (id: string) => void;
  onDeleteMemory: (id: string) => void;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({
  profile,
  memories,
  onAddMemory,
  onLikeMemory,
  onDeleteMemory,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState<'husband' | 'wife'>('husband');

  // Romantic preset imagery fallback
  const sampleImages = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddMemory({
      title: title.trim(),
      date,
      content: content.trim(),
      imageUrl: imageUrl.trim() || sampleImages[Math.floor(Math.random() * sampleImages.length)],
      author,
    });

    setTitle('');
    setContent('');
    setImageUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 border border-emerald-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-2xl shadow-md shadow-emerald-500/25">
            <Camera className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900 shimmer-text">우리의 소중한 순간들</h2>
            <p className="text-xs text-stone-600 mt-0.5 font-medium">
              함께 떠난 여행, 특별한 데이트, 잊지 못할 순간들을 사진과 함께 기록하세요.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? '작성 닫기' : '새 순간 기록하기'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="glass-panel rounded-3xl p-6 shadow-sm border border-white/80 animate-in fade-in slide-in-from-top-3">
          <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>새로운 추억 한 페이지 기록</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 둘만의 제주도 노을 산책 🌅"
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">날짜</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  사진 이미지 URL (선택)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... (비워두면 감성 사진 자동 적용)"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">작성자</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthor('husband')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      author === 'husband' ? 'bg-blue-500 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {profile.partner1.nickname || '남편'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthor('wife')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      author === 'wife' ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {profile.partner2.nickname || '아내'}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">그날의 이야기</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="그때 느꼈던 감정과 소중한 기억을 솔직하게 담아보세요..."
                rows={3}
                required
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:bg-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-500 hover:bg-stone-100 cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                추억 저장
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Memories Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memories.map((mem) => {
          const authorPartner = mem.author === 'husband' ? profile.partner1 : profile.partner2;

          return (
            <div
              key={mem.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5"
            >
              {mem.imageUrl && (
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full font-medium">
                    {formatKoreanDate(mem.date)}
                  </div>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1 font-medium text-stone-600">
                      <span>{authorPartner.avatar || '✨'}</span>
                      <span>{authorPartner.nickname || authorPartner.name}가 쓴 추억</span>
                    </span>
                    <button
                      onClick={() => onDeleteMemory(mem.id)}
                      className="p-1 text-stone-300 hover:text-rose-500 transition-colors cursor-pointer"
                      title="추억 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-stone-800 group-hover:text-emerald-700 transition-colors">
                    {mem.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-stone-600 leading-relaxed whitespace-pre-wrap">
                    {mem.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onLikeMemory(mem.id)}
                    className="flex items-center gap-1.5 text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-90"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>좋아요 {mem.likes || 0}</span>
                  </button>

                  <span className="text-[11px] text-stone-400">우리의 기억 보관함</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
