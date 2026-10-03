import React, { useState, useEffect } from 'react';
import { X, Smartphone, Copy, Check, QrCode, Wifi, ExternalLink } from 'lucide-react';
import { api } from '../api';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [networkInfo, setNetworkInfo] = useState<{ ip: string; accessUrl: string }>({
    ip: 'localhost',
    accessUrl: window.location.origin,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getNetworkInfo().then((info) => {
        if (info && info.ip && info.ip !== 'localhost') {
          setNetworkInfo(info);
        } else {
          setNetworkInfo({
            ip: window.location.hostname,
            accessUrl: `${window.location.protocol}//${window.location.hostname}:${window.location.port || '5173'}`,
          });
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(networkInfo.accessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate QR code URL using standard public QR API for instant smartphone scanning
  const qrCodeImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    networkInfo.accessUrl
  )}&color=e11d48`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-stone-800">스마트폰으로 함께 쓰기</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-center">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-200">
            <Wifi className="w-3.5 h-3.5" />
            <span>같은 와이파이(Wi-Fi)에 연결되어 있을 때 실시간 공유</span>
          </div>

          {/* QR Code Container */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 inline-block mx-auto shadow-inner">
            <img
              src={qrCodeImgUrl}
              alt="스마트폰 접속용 QR 코드"
              className="w-44 h-44 mx-auto rounded-xl shadow-xs bg-white p-2"
            />
            <p className="text-[11px] text-stone-400 mt-2 font-medium">
              스마트폰 기본 카메라로 비추면 바로 열려요! 📸
            </p>
          </div>

          {/* URL Copy Box */}
          <div className="space-y-1.5 text-left">
            <span className="text-xs font-bold text-stone-600">접속 주소 (URL)</span>
            <div className="flex items-center gap-2 bg-stone-100 p-2 rounded-2xl border border-stone-200">
              <span className="text-xs font-mono text-stone-700 truncate flex-1 px-2">
                {networkInfo.accessUrl}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 bg-white hover:bg-stone-50 text-stone-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs border border-stone-200 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600">복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tip */}
          <div className="text-left bg-rose-50/70 p-3.5 rounded-2xl border border-rose-100 text-xs text-rose-800 leading-relaxed">
            <div className="font-bold mb-1 flex items-center gap-1">
              <span>💡 스마트폰에서 앱처럼 쓰는 꿀팁!</span>
            </div>
            스마트폰 브라우저(사파리/크롬) 하단 공유 버튼 클릭 후{' '}
            <strong className="font-semibold underline">"홈 화면에 추가"</strong>를 누르면,
            바탕화면에 예쁜 부부 앱 아이콘이 생겨 편리하게 접속할 수 있습니다.
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              확인 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
