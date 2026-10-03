import React, { useState } from 'react';
import { CoupleProfile, AppData } from '../types';
import {
  ShieldCheck,
  Lock,
  Key,
  X,
  User,
  Heart,
  Calendar,
  Save,
  Download,
  Upload,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoupleProfile;
  appData: AppData;
  onSaveProfile: (updated: Partial<CoupleProfile>) => void;
  onImportAllData: (data: AppData) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  profile,
  appData,
  onSaveProfile,
  onImportAllData,
}) => {
  const currentPin = profile.adminPin || '7777';

  const [enteredPin, setEnteredPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Editable fields in Admin Mode
  const [partner1Name, setPartner1Name] = useState(profile.partner1.name || '남편');
  const [partner1Nickname, setPartner1Nickname] = useState(profile.partner1.nickname || '서방님');
  const [partner1Avatar, setPartner1Avatar] = useState(profile.partner1.avatar || '👨');
  const [partner1Mood, setPartner1Mood] = useState(profile.partner1.mood || '설렘 💕');

  const [partner2Name, setPartner2Name] = useState(profile.partner2.name || '아내');
  const [partner2Nickname, setPartner2Nickname] = useState(profile.partner2.nickname || '우리여보');
  const [partner2Avatar, setPartner2Avatar] = useState(profile.partner2.avatar || '👩');
  const [partner2Mood, setPartner2Mood] = useState(profile.partner2.mood || '행복함 🥰');

  const [weddingDate, setWeddingDate] = useState(profile.weddingDate || '2024-11-17');
  const [firstMetDate, setFirstMetDate] = useState(profile.firstMetDate || '2016-01-29');
  const [coupleMessage, setCoupleMessage] = useState(profile.coupleMessage || '');

  const [allowUserNicknameChange, setAllowUserNicknameChange] = useState(
    profile.allowUserNicknameChange !== false
  );

  // New PIN fields
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);
  const [pinChangeError, setPinChangeError] = useState('');

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === currentPin) {
      setIsAuthenticated(true);
      setPinError(false);
      setEnteredPin('');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#eab308', '#a855f7', '#ec4899']
      });
    } else {
      setPinError(true);
    }
  };

  const handleSaveAdminChanges = (e: React.FormEvent) => {
    e.preventDefault();

    const updatePayload: Partial<CoupleProfile> = {
      partner1: {
        ...profile.partner1,
        name: partner1Name.trim() || '남편',
        nickname: partner1Nickname.trim() || '서방님',
        avatar: partner1Avatar,
        mood: partner1Mood,
      },
      partner2: {
        ...profile.partner2,
        name: partner2Name.trim() || '아내',
        nickname: partner2Nickname.trim() || '우리여보',
        avatar: partner2Avatar,
        mood: partner2Mood,
      },
      weddingDate,
      firstMetDate,
      coupleMessage,
      allowUserNicknameChange,
    };

    onSaveProfile(updatePayload);
    alert('👑 관리자 권한으로 사용자 이름 및 프로필 설정이 성공적으로 저장되었습니다!');
    onClose();
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeError('');
    setPinChangeSuccess(false);

    if (newPin.length < 4) {
      setPinChangeError('비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeError('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    onSaveProfile({ adminPin: newPin });
    setPinChangeSuccess(true);
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setPinChangeSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `우리사이_데이터백업_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.profile && json.events) {
          if (window.confirm('기존 데이터를 백업 파일의 데이터로 덮어쓰시겠습니까?')) {
            onImportAllData(json);
            alert('데이터 복원이 완료되었습니다!');
            onClose();
          }
        } else {
          alert('올바른 백업 파일 형식이 아닙니다.');
        }
      } catch (err) {
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-xl shadow-2xl border border-amber-300/80 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-2.5 mb-1" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-200 animate-pulse" />
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-1.5">
                <span>관리자 모드 (Admin Console)</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  최고 권한
                </span>
              </h3>
              <p className="text-[11px] text-amber-100">
                사용자 이름 임의 변경 및 시스템 마스터 제어
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner border border-amber-200">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-black text-stone-900">
                관리자 비밀번호를 입력해주세요
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                사용자 이름 변경 및 시스템 관리는 관리자 인증을 거친 후 사용하실 수 있습니다.
              </p>
              <div className="mt-2 inline-block bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-xl text-[11px] text-amber-800 font-semibold">
                💡 초기 관리자 비밀번호: <strong className="font-mono text-amber-900">7777</strong>
              </div>
            </div>

            <form onSubmit={handleVerifyPin} className="max-w-xs mx-auto space-y-3">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="비밀번호 4자리 입력"
                  className={`w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 px-4 rounded-xl border ${
                    pinError
                      ? 'border-rose-500 bg-rose-50 text-rose-800'
                      : 'border-stone-300 focus:border-amber-500 bg-stone-50'
                  } focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5 animate-bounce">
                    비밀번호가 일치하지 않습니다. 다시 확인해주세요.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                관리자 인증하기 🔓
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="p-4 sm:p-5 space-y-5 overflow-y-auto flex-1">
            {/* Top Status Banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-amber-900">
                  최고 관리자 모드 활성화됨
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 bg-white px-2.5 py-1 rounded-lg border border-stone-200 cursor-pointer shadow-2xs"
              >
                관리자 로그아웃
              </button>
            </div>

            {/* Main Admin Form */}
            <form onSubmit={handleSaveAdminChanges} className="space-y-4">
              {/* SECTION 1: 사용자 이름(실명) 임의 변경 */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                  <User className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-black text-stone-900">
                    사용자 이름(실명) 및 기본 정보 임의 변경
                  </h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-md">
                    관리자 전용
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Husband Name Settings */}
                  <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 space-y-2">
                    <span className="text-xs font-bold text-blue-800 flex items-center gap-1">
                      <span>💙 남편 사용자 정보</span>
                    </span>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        사용자 이름 (실명/호칭)
                      </label>
                      <input
                        type="text"
                        value={partner1Name}
                        onChange={(e) => setPartner1Name(e.target.value)}
                        placeholder="예: 이국신, 남편 등"
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                      />
                      <span className="text-[10px] text-stone-400">
                        관리자 권한으로 이름을 원하는 대로 지정할 수 있습니다.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        기본 애칭
                      </label>
                      <input
                        type="text"
                        value={partner1Nickname}
                        onChange={(e) => setPartner1Nickname(e.target.value)}
                        placeholder="예: 서방님"
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>

                  {/* Wife Name Settings */}
                  <div className="bg-pink-50/70 p-3.5 rounded-xl border border-pink-100 space-y-2">
                    <span className="text-xs font-bold text-pink-800 flex items-center gap-1">
                      <span>💖 아내 사용자 정보</span>
                    </span>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        사용자 이름 (실명/호칭)
                      </label>
                      <input
                        type="text"
                        value={partner2Name}
                        onChange={(e) => setPartner2Name(e.target.value)}
                        placeholder="예: 아내 실명 등"
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        required
                      />
                      <span className="text-[10px] text-stone-400">
                        관리자 권한으로 이름을 원하는 대로 지정할 수 있습니다.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        기본 애칭
                      </label>
                      <input
                        type="text"
                        value={partner2Nickname}
                        onChange={(e) => setPartner2Nickname(e.target.value)}
                        placeholder="예: 우리여보"
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Couple Greeting Message */}
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                    공통 부부 문구
                  </label>
                  <input
                    type="text"
                    value={coupleMessage}
                    onChange={(e) => setCoupleMessage(e.target.value)}
                    placeholder="평생 서로의 편이 되어 함께 걸어가자 💍"
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              {/* SECTION 2: D-Day 기준일 강제 제어 */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  <h4 className="text-xs font-black text-stone-900">
                    부부 D-Day 기준일 강제 설정
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                      결혼기념일 (현재: 2024-11-17)
                    </label>
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                      처음 만난 날 (현재: 2016-01-29 / 3900일)
                    </label>
                    <input
                      type="date"
                      value={firstMetDate}
                      onChange={(e) => setFirstMetDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: 일반 사용자 권한 제어 */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">
                      일반 사용자의 호칭 변경 허용
                    </div>
                    <div className="text-[11px] text-stone-500">
                      비활성화 시 일반 사용자는 호칭을 변경할 수 없고 관리자만 변경 가능합니다.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowUserNicknameChange}
                      onChange={(e) => setAllowUserNicknameChange(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>

              {/* Save Admin Changes Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>관리자 설정 및 이름 변경 즉시 저장</span>
              </button>
            </form>

            {/* SECTION 4: 관리자 비밀번호(PIN) 변경 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <Key className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-black text-stone-900">
                  관리자 비밀번호(PIN) 변경
                </h4>
              </div>

              <form onSubmit={handleChangePin} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">
                      새 관리자 비밀번호
                    </label>
                    <input
                      type="password"
                      maxLength={10}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="최소 4자리"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">
                      새 비밀번호 확인
                    </label>
                    <input
                      type="password"
                      maxLength={10}
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      placeholder="한 번 더 입력"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                {pinChangeError && (
                  <p className="text-[11px] text-rose-600 font-bold">{pinChangeError}</p>
                )}
                {pinChangeSuccess && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>관리자 비밀번호가 성공적으로 변경되었습니다!</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  비밀번호 변경
                </button>
              </form>
            </div>

            {/* SECTION 5: 전체 데이터 백업 및 복원 */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-stone-600" />
                <span>데이터 백업 및 복원</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-stone-100 text-stone-700 py-2 px-3 rounded-xl border border-stone-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON 파일 백업</span>
                </button>

                <label className="flex items-center justify-center gap-1.5 bg-white hover:bg-stone-100 text-stone-700 py-2 px-3 rounded-xl border border-stone-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>백업 파일 복원</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
