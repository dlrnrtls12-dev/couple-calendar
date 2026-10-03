import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, Share2, Globe, Heart } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const onlineUrl = 'https://dlrnrtls12-dev.github.io/couple-calendar/';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : onlineUrl;
  const targetUrl = currentUrl.includes('github.io') ? currentUrl : onlineUrl;

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '우리사이 - 부부 일정 & 기념일',
          text: '여보! 우리 둘만의 일정과 기념일 공유 공간에 들어와 봐요 💕',
          url: targetUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.warn('Share cancelled or not supported', err);
      }
    } else {
      handleCopy();
    }
  };

  const qrCodeImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    targetUrl
  )}&color=e11d48`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-2.5 mb-1" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-stone-800">모바일에서 함께 쓰기</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-center overflow-y-auto flex-1">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-200">
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>어디서나 LTE/5G로 바로 접속하는 모바일 웹</span>
          </div>

          {/* QR Code Container */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 inline-block mx-auto shadow-inner">
            <img
              src={qrCodeImgUrl}
              alt="스마트폰 접속용 QR 코드"
              className="w-44 h-44 mx-auto rounded-xl shadow-xs bg-white p-2"
            />
            <p className="text-[11px] text-stone-400 mt-2 font-medium">
              배우자의 스마트폰 카메라로 비추면 바로 열려요! 📸
            </p>
          </div>

          {/* Quick Share Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 px-4 rounded-2xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{shared ? '공유됨!' : '카톡 / 문자로 전송'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 px-4 rounded-2xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>주소 복사하기</span>
                </>
              )}
            </button>
          </div>

          {/* URL text display */}
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-left">
            <span className="text-[10px] font-bold text-stone-400 block mb-0.5">온라인 모바일 주소</span>
            <span className="text-xs font-mono text-stone-700 break-all select-all">
              {targetUrl}
            </span>
          </div>

          {/* Mobile PWA Installation Tip */}
          <div className="text-left bg-gradient-to-r from-amber-50 to-rose-50 p-3.5 rounded-2xl border border-rose-100 text-xs text-stone-700 leading-relaxed space-y-1">
            <div className="font-bold text-rose-800 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>스마트폰 바탕화면에 진짜 앱처럼 설치하는 법</span>
            </div>
            <p className="text-[11px] text-stone-600">
              스마트폰 사파리(아이폰) 또는 크롬(갤럭시) 하단의 <strong>[공유]</strong> 버튼을 누른 후{' '}
              <strong className="text-rose-600 underline">"홈 화면에 추가"</strong>를 누르면,
              진짜 어플처럼 바탕화면 아이콘이 생겨 언제든 1초 만에 실행할 수 있습니다! 📱
            </p>
          </div>

          <div className="pt-1">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
