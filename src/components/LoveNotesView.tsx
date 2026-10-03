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

  const stickers = ['💖', '💌', '☕', '🌸', '✨', '🍦', '🍱', '🧸', '🌈', '🍀', '🥂', '🍰'];

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
      return '방금 전';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-[28px] p-6 sm:p-7 border border-rose-200/80 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-rose-500/25">
            <MessageSquareHeart className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight shimmer-text">
                서로에게 남기는 달콤한 러브 노트 💌
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
              퇴근길 응원, 소소한 감사, 사랑의 한마디를 둘만의 특별한 핀보드에 남겨보세요.
            </p>
          </div>
        </div>
      </div>

      {/* New Note Form */}
      <div className="glass-panel-glow rounded-[28px] p-5 sm:p-7 shadow-xl border border-rose-200/80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Sender Selection */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-black text-stone-700">작성자:</span>
              <div className="flex items-center bg-stone-100/90 p-1 rounded-2xl text-xs gap-1 border border-stone-200/80 shadow-inner">
                <button
                  type="button"
                  onClick={() => setSender('husband')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
                    sender === 'husband'
                      ? 'bg-blue-600 text-white shadow-xs scale-105'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{profile.partner1.avatar || '👨'}</span>
                  <span>{profile.partner1.nickname || profile.partner1.name} (남편)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSender('wife')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
                    sender === 'wife'
                      ? 'bg-rose-500 text-white shadow-xs scale-105'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{profile.partner2.avatar || '👩'}</span>
                  <span>{profile.partner2.nickname || profile.partner2.name} (아내)</span>
                </button>
              </div>
            </div>

            {/* Sticker selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-black text-stone-500 mr-1">스티커:</span>
              {stickers.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedSticker(st)}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl text-lg transition-transform cursor-pointer ${
                    selectedSticker === st ? 'bg-rose-100 scale-125 border-2 border-rose-400 shadow-xs' : 'hover:scale-110'
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
              placeholder="여보에게 전하고 싶은 따뜻하고 달콤한 한마디를 적어보세요... 💕"
              rows={3}
              className="w-full bg-white/90 border border-rose-200 rounded-2xl p-4 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all resize-none shadow-inner"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-3.5 bottom-3.5 flex items-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md shadow-rose-500/20 disabled:opacity-40 transition-all cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>쪽지 보내기</span>
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
              className={`relative rounded-[26px] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border transform hover:-translate-y-1 ${
                isHusband
                  ? 'bg-gradient-to-br from-blue-50/95 via-sky-50/90 to-indigo-50/80 border-blue-200'
                  : 'bg-gradient-to-br from-pink-50/95 via-rose-50/90 to-purple-50/80 border-rose-200'
              }`}
            >
              {/* Wax Seal Pin decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 shadow-md flex items-center justify-center border-2 border-white">
                <Heart className="w-3 h-3 fill-white text-white" />
              </div>

              {/* Author & Sticker */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 bg-white/90 rounded-2xl shadow-xs border border-white">
                    {partner.avatar || (isHusband ? '👨' : '👩')}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-stone-800">
                      {partner.nickname || partner.name}
                    </h4>
                    <span className="text-[10px] font-bold text-stone-400">
                      {getRelativeTime(note.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-pulse drop-shadow-xs">{note.sticker || '💌'}</span>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1.5 text-stone-300 hover:text-rose-500 hover:bg-white/80 rounded-xl transition-colors cursor-pointer"
                    title="쪽지 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <p className="mt-4 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed whitespace-pre-wrap bg-white/80 p-3.5 rounded-2xl border border-white/90 shadow-2xs">
                {note.message}
              </p>
            </div>
          );
        })}
      </div>

      {notes.length === 0 && (
        <div className="glass-panel rounded-[28px] p-12 text-center border border-rose-200/80 text-stone-400">
          <MessageSquareHeart className="w-12 h-12 mx-auto mb-2 opacity-40 text-rose-400 animate-bounce" />
          <p className="text-sm font-black text-stone-700">아직 남겨진 쪽지가 없어요</p>
          <p className="text-xs mt-1 text-stone-500 font-medium">첫 쪽지를 남겨서 배우자에게 따뜻한 마음을 전해보세요! 💕</p>
        </div>
      )}
    </div>
  );
};
