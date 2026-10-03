import React, { useState } from 'react';
import { LoveNote, CoupleProfile } from '../types';
import { MessageSquareHeart, Send, Trash2, Heart, Sparkles, Smile, Coffee, Sun } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

interface LoveNotesViewProps {
  profile: CoupleProfile;
  notes: LoveNote[];
  onAddNote: (note: Omit<LoveNote, 'id' | 'createdAt'>) => void;
  onDeleteNote: (id: string) => void;
}

export const LoveNotesView: React.FC<LoveNotesViewProps> = ({
  profile,
  notes,
  onAddNote,
  onDeleteNote,
}) => {
  const [sender, setSender] = useState<'husband' | 'wife'>('husband');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('💖');

  const stickers = ['💖', '💌', '☕', '🌸', '✨', '🍦', '🍱', '🧸', '🌈', '🍀'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onAddNote({
      sender,
      message: message.trim(),
      sticker: selectedSticker,
    });

    setMessage('');
  };

  const getRelativeTime = (isoString: string) => {
    try {
      return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: ko });
    } catch {
      return '최근';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 border border-rose-200/80 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-2xl shadow-md shadow-rose-500/25">
            <MessageSquareHeart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900 shimmer-text">서로에게 남기는 러브 노트</h2>
            <p className="text-xs text-stone-600 mt-0.5 font-medium">
              퇴근길 응원, 소소한 감사, 사랑의 한마디를 둘만의 특별한 핀보드에 남겨보세요.
            </p>
          </div>
        </div>
      </div>

      {/* New Note Form */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm border border-white/80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Sender Selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600">누가 남기나요?</span>
              <div className="flex items-center bg-stone-100 p-1 rounded-2xl text-xs">
                <button
                  type="button"
                  onClick={() => setSender('husband')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    sender === 'husband'
                      ? 'bg-blue-500 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{profile.partner1.avatar || '👨'}</span>
                  <span>{profile.partner1.nickname || profile.partner1.name} (남편)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSender('wife')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    sender === 'wife'
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{profile.partner2.avatar || '👩'}</span>
                  <span>{profile.partner2.nickname || profile.partner2.name} (아내)</span>
                </button>
              </div>
            </div>

            {/* Sticker selector */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs text-stone-400 mr-1">스티커:</span>
              {stickers.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedSticker(st)}
                  className={`w-7 h-7 flex items-center justify-center rounded-xl text-base transition-transform cursor-pointer ${
                    selectedSticker === st ? 'bg-rose-100 scale-125 border border-rose-300' : 'hover:scale-110'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="여보에게 전하고 싶은 따뜻한 한마디를 적어보세요... 💕"
              rows={3}
              className="w-full bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white transition-all resize-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-3 bottom-3 flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:from-rose-600 hover:to-pink-600 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>쪽지 남기기</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notes Grid (Post-it notes board) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map((note) => {
          const isHusband = note.sender === 'husband';
          const partner = isHusband ? profile.partner1 : profile.partner2;

          return (
            <div
              key={note.id}
              className={`relative rounded-3xl p-5 shadow-xs transition-all hover:shadow-md border transform hover:-translate-y-1 ${
                isHusband
                  ? 'bg-gradient-to-br from-blue-50/90 to-sky-100/70 border-blue-200/70'
                  : 'bg-gradient-to-br from-pink-50/90 to-rose-100/70 border-rose-200/70'
              }`}
            >
              {/* Pin decoration */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-rose-400/80 shadow-xs flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Author & Sticker */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl p-1 bg-white/80 rounded-xl shadow-2xs">
                    {partner.avatar || (isHusband ? '👨' : '👩')}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-stone-800">
                      {partner.nickname || partner.name}
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      {getRelativeTime(note.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-pulse-slow">{note.sticker || '💌'}</span>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1 text-stone-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                    title="쪽지 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <p className="mt-3.5 text-sm text-stone-700 font-medium leading-relaxed whitespace-pre-wrap bg-white/60 p-3 rounded-2xl border border-white/80">
                {note.message}
              </p>
            </div>
          );
        })}
      </div>

      {notes.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 text-stone-400">
          <MessageSquareHeart className="w-10 h-10 mx-auto mb-2 opacity-30 text-rose-400" />
          <p className="text-sm font-medium">아직 남겨진 쪽지가 없어요.</p>
          <p className="text-xs mt-1 text-stone-400">첫 쪽지를 남겨서 배우자에게 따뜻한 마음을 전해보세요!</p>
        </div>
      )}
    </div>
  );
};
