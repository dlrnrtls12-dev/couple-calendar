import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, Share2, Globe, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { AppData } from '../types';
import { generateSyncUrl } from '../utils/syncUtils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData?: AppData | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, currentData }) => {
  const onlineUrl = 'https://dlrnrtls12-dev.github.io/couple-calendar/';
  const [activeTab, setActiveTab] = useState<'sync' | 'app'>('sync');

  const syncUrl = currentData ? generateSyncUrl(currentData) : onlineUrl;

  const [copiedSync, setCopiedSync] = useState(false);
  const [sharedSync, setSharedSync] = useState(false);
  const [copiedApp, setCopiedApp] = useState(false);
  const [sharedApp, setSharedApp] = useState(false);

  if (!isOpen) return null;

  const handleCopySync = () => {
    navigator.clipboard.writeText(syncUrl);
    setCopiedSync(true);
    setTimeout(() => setCopiedSync(false), 2000);
  };

  const handleNativeShareSync = async () => {
    const title = '우리사이 - 호칭 및 일정 동기화 초대 💌';
    const text = `여보! 내가 설정한 호칭("${currentData?.profile.partner1.nickname || '서방님'}" & "${currentData?.profile.partner2.nickname || '우리여보'}")과 최신 일정을 동기화 링크로 보냈어. 눌러서 승인해줘 💕`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: syncUrl,
        });
        setSharedSync(true);
        setTimeout(() => setSharedSync(false), 2000);
      } catch (err) {
        console.warn('Share cancelled or not supported', err);
      }
    } else {
      handleCopySync();
    }
  };

  const handleCopyApp = () => {
    navigator.clipboard.writeText(onlineUrl);
    setCopiedApp(true);
    setTimeout(() => setCopiedApp(false), 2000);
  };

  const handleNativeShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '우리사이 - 부부 일정 & 기념일',
          text: '여보! 우리 둘만의 일정과 기념일 공유 공간에 들어와 봐요 💕',
          url: onlineUrl,
        });
        setSharedApp(true);
        setTimeout(() => setSharedApp(false), 2000);
      } catch (err) {
        console.warn('Share cancelled', err);
      }
    } else {
      handleCopyApp();
    }
  };

  const activeTargetUrl = activeTab === 'sync' ? syncUrl : onlineUrl;
  const qrCodeImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    activeTargetUrl
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
            <h3 className="text-base font-bold text-stone-800">모바일 공유 및 동기화</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex p-2 bg-stone-100/70 border-b border-stone-200/60 gap-1.5">
          <button
            onClick={() => setActiveTab('sync')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'sync'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>호칭 & 일정 동기화 전송</span>
          </button>
          <button
            onClick={() => setActiveTab('app')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'app'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>기본 모바일 접속</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-center overflow-y-auto flex-1">
          {activeTab === 'sync' ? (
            <>
              {/* Sync Tab Details */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-3 rounded-2xl border border-rose-200 text-left text-xs space-y-1">
                <div className="font-bold text-rose-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>배우자에게 호칭 & 최신 데이터 보내기</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  내가 변경한 호칭(<strong>{currentData?.profile.partner1.nickname || '서방님'}</strong>, <strong>{currentData?.profile.partner2.nickname || '우리여보'}</strong>)과 일정이 상대방 휴대폰에 전달됩니다. 배우자가 링크를 열면 <strong>[승인]</strong> 팝업이 뜨며 즉시 적용됩니다!
                </p>
              </div>

              {/* QR Code Container */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 inline-block mx-auto shadow-inner">
                <img
                  src={qrCodeImgUrl}
                  alt="배우자 동기화 승인 QR 코드"
                  className="w-40 h-40 mx-auto rounded-xl shadow-xs bg-white p-2"
                />
                <p className="text-[11px] text-stone-500 mt-2 font-medium">
                  배우자가 카메라로 스캔하면 바로 승인 화면이 열려요! 📷
                </p>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleNativeShareSync}
                  className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 px-4 rounded-2xl text-xs font-bold shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{sharedSync ? '전송 완료!' : '카톡 / 문자로 동기화 전송'}</span>
                </button>

                <button
                  onClick={handleCopySync}
                  className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 px-4 rounded-2xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
                >
                  {copiedSync ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">링크 복사됨!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>동기화 링크 복사</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* App General Tab */}
              <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-200">
                <Globe className="w-3.5 h-3.5 text-rose-500" />
                <span>언제 어디서나 LTE/5G로 바로 접속하는 모바일 웹</span>
              </div>

              {/* QR Code Container */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 inline-block mx-auto shadow-inner">
                <img
                  src={qrCodeImgUrl}
                  alt="스마트폰 접속용 QR 코드"
                  className="w-40 h-40 mx-auto rounded-xl shadow-xs bg-white p-2"
                />
                <p className="text-[11px] text-stone-400 mt-2 font-medium">
                  스마트폰 기본 카메라로 비추면 바로 열려요! 📸
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleNativeShareApp}
                  className="flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-900 text-white py-3 px-4 rounded-2xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{sharedApp ? '공유됨!' : '접속 주소 전송'}</span>
                </button>

                <button
                  onClick={handleCopyApp}
                  className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 px-4 rounded-2xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
                >
                  {copiedApp ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>주소 복사</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile PWA Tip */}
              <div className="text-left bg-gradient-to-r from-amber-50 to-rose-50 p-3 rounded-2xl border border-rose-100 text-xs text-stone-700 leading-relaxed space-y-1">
                <div className="font-bold text-rose-800 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>홈 화면에 바로가기 아이콘 추가</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  사파리나 크롬 브라우저 하단의 <strong>[공유]</strong> &gt; <strong className="text-rose-600 underline">"홈 화면에 추가"</strong>를 누르면 실제 어플처럼 바탕화면에서 바로 실행됩니다!
                </p>
              </div>
            </>
          )}

          <div className="pt-1">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
