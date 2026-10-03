import { AppData, CalendarEvent, Anniversary, TodoItem, LoveNote, MemoryItem, CoupleProfile } from './types';

const STORAGE_KEY = 'couple_calendar_app_data';

const defaultData: AppData = {
  profile: {
    partner1: {
      name: '국신',
      nickname: '서방님',
      avatar: '👨',
      mood: '설렘 💕',
      moodMessage: '오늘 퇴근길에 맛있는 디저트 사갈게!',
    },
    partner2: {
      name: '민지',
      nickname: '우리여보',
      avatar: '👩',
      mood: '행복함 🥰',
      moodMessage: '얼른 보고 싶다, 조심히 와요!',
    },
    weddingDate: '2024-11-17',
    firstMetDate: '2016-01-29',
    coupleMessage: '평생 서로의 편이 되어 함께 걸어가자 💍',
    adminPin: '7777',
    allowUserNicknameChange: true,
  },
  events: [],
  anniversaries: [
    {
      id: 'ann-wedding',
      title: '결혼기념일 💍',
      date: '2024-11-17',
      isRepeatYearly: true,
      category: 'wedding',
      memo: '서로에게 가장 특별한 날, 매년 감사하고 사랑해 💍',
      icon: '💍'
    },
    {
      id: 'ann-first-met',
      title: '처음 만난 날 🌸',
      date: '2016-01-29',
      isRepeatYearly: true,
      category: 'firstMet',
      memo: '어느덧 3900일이 넘은 우리, 함께해 온 모든 날이 선물이야 🌸',
      icon: '🌸'
    },
    {
      id: 'ann-kookshin-birthday',
      title: '국신 생일 🎂',
      date: '1990-01-04',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 1월 4일 / 사랑하는 국신의 생일 🎉',
      icon: '🎂'
    },
    {
      id: 'ann-father-in-law-birthday',
      title: '장인어른 생신 (아빠) 🎂',
      date: '1960-01-07',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 1월 7일 / 장인어른(아빠) 생신 축하드립니다! 늘 건강하세요 🥂',
      icon: '🎉'
    },
    {
      id: 'ann-minji-birthday',
      title: '민지 생일 🎂',
      date: '1995-01-21',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 1월 21일 / 꽃보다 예쁜 우리 아내 민지 생일 축하해 💖',
      icon: '🎁'
    },
    {
      id: 'ann-father-memorial',
      title: '아빠 제사 (시아버님) 🕯️',
      date: '2026-05-30',
      isRepeatYearly: true,
      isLunar: true,
      lunarMonth: 4,
      lunarDay: 14,
      category: 'custom',
      memo: '음력 4월 14일 / 아빠 제사(시아버님). 늘 마음에 기억하고 추모합니다 🕯️',
      icon: '🕯️'
    },
    {
      id: 'ann-sunui-birthday',
      title: '선의 생일 (큰형님) 🎂',
      date: '1988-07-11',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 7월 11일 / 큰형님 선의 생신 축하드립니다! ✨',
      icon: '🎉'
    },
    {
      id: 'ann-jiyu-birthday',
      title: '지유 생일 🎂',
      date: '2018-07-19',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 7월 19일 / 사랑스러운 지유 생일 축하해 🌸',
      icon: '🎂'
    },
    {
      id: 'ann-juwon-birthday',
      title: '주원 생일 🎂',
      date: '2020-07-21',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 7월 21일 / 귀염둥이 주원 생일 축하해 🎈',
      icon: '🎉'
    },
    {
      id: 'ann-mother-in-law-birthday',
      title: '장모님 생신 (엄마) 🎂',
      date: '2026-08-12',
      isRepeatYearly: true,
      isLunar: true,
      lunarMonth: 6,
      lunarDay: 30,
      category: 'birthday',
      memo: '음력 6월 30일 / 사랑하는 장모님(엄마) 생신 축하드립니다! 항상 건강하세요 💖',
      icon: '🌸'
    },
    {
      id: 'ann-sunmi-birthday',
      title: '선미 생일 (작은형님) 🎂',
      date: '1991-12-14',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '양력 12월 14일 / 작은형님 선미 생신 축하드립니다! 🎁',
      icon: '🎁'
    }
  ],
  todos: [
    {
      id: 'td-1',
      text: '주말 캠핑장 장보기 (고기, 숯, 마시멜로우)',
      assignedTo: 'all',
      category: 'groceries',
      isDone: false,
    },
    {
      id: 'td-2',
      text: '가을 침구류 세탁 및 교체하기',
      assignedTo: 'husband',
      category: 'chore',
      isDone: true,
    },
    {
      id: 'td-3',
      text: '스위스 인터라켄 별 보러 가기 🌌',
      assignedTo: 'all',
      category: 'bucket',
      isDone: false,
    },
    {
      id: 'td-4',
      text: '결혼앨범 정리 및 액자 주문하기',
      assignedTo: 'wife',
      category: 'chore',
      isDone: false,
    }
  ],
  loveNotes: [
    {
      id: 'note-1',
      sender: 'husband',
      message: '오늘 하루도 정말 고생 많았어 여보. 늘 내 곁에 있어줘서 고맙고 든든해 ❤️',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      sticker: '💖'
    },
    {
      id: 'note-2',
      sender: 'wife',
      message: '아침에 커피 내려줘서 고마워요! 오늘도 파이팅하고 저녁에 만나요 ☕✨',
      createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      sticker: '☕'
    }
  ],
  memories: [
    {
      id: 'mem-1',
      title: '첫 신혼여행 파리 에펠탑 앞에서 🗼',
      date: '2024-04-02',
      content: '야경을 바라보며 나눴던 다짐들. 손을 꼭 잡고 평생 행복하게 해주겠다고 약속했던 순간.',
      author: 'husband',
      likes: 12
    },
    {
      id: 'mem-2',
      title: '우리의 첫 보금자리 입주 첫날 🏡',
      date: '2024-03-20',
      content: '거실 바닥에 돗자리 펴고 먹었던 첫 짜장면과 탕수육. 소박했지만 그 어떤 만찬보다 달콤했던 날.',
      author: 'wife',
      likes: 9
    }
  ]
};

function getLocalData(): AppData {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed: AppData = JSON.parse(cached);
      // Migrate dates if previous defaults were stored
      if (parsed.profile.weddingDate === '2024-03-24' || !parsed.profile.weddingDate) {
        parsed.profile.weddingDate = '2024-11-17';
      }
      if (parsed.profile.firstMetDate === '2021-11-12' || !parsed.profile.firstMetDate) {
        parsed.profile.firstMetDate = '2016-01-29';
      }
      // Update anniversary items matching old dates
      const weddingAnn = parsed.anniversaries.find((a) => a.category === 'wedding' || a.id === 'ann-1');
      if (weddingAnn && weddingAnn.date === '2024-03-24') {
        weddingAnn.date = '2024-11-17';
      }
      // Ensure partner1 name is 국신 if default
      if (parsed.profile && (parsed.profile.partner1.name === '남편' || !parsed.profile.partner1.name)) {
        parsed.profile.partner1.name = '국신';
      }
      // Ensure partner2 name is 민지 if default
      if (parsed.profile && (parsed.profile.partner2.name === '아내' || !parsed.profile.partner2.name)) {
        parsed.profile.partner2.name = '민지';
      }
      // Remove old dummy '아내 생일' (ann-4, 12월 5일)
      parsed.anniversaries = parsed.anniversaries.filter((a) => a.id !== 'ann-4');

      // Ensure all 11 recurring anniversaries exist
      for (const defaultAnn of defaultData.anniversaries) {
        const exists = parsed.anniversaries.some((a) => a.id === defaultAnn.id || a.title === defaultAnn.title);
        if (!exists) {
          parsed.anniversaries.push(defaultAnn);
        }
      }
      // Filter out initial dummy events
      if (parsed.events) {
        parsed.events = parsed.events.filter((e) => !['evt-1', 'evt-2', 'evt-3', 'evt-4'].includes(e.id));
      }
      saveLocalData(parsed);
      return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
}

function saveLocalData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}

export const api = {
  async getData(): Promise<AppData> {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          saveLocalData(json.data);
          return json.data;
        }
      }
    } catch {
      // Offline or GitHub Pages static deployment fallback
    }
    return getLocalData();
  },

  async updateProfile(profile: Partial<CoupleProfile>): Promise<CoupleProfile> {
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        const json = await res.json();
        return json.profile;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.profile = { ...current.profile, ...profile };
    saveLocalData(current);
    return current.profile;
  },

  async applyFullData(newData: AppData): Promise<AppData> {
    saveLocalData(newData);
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
    } catch {
      // Local fallback
    }
    return newData;
  },

  async addEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    const newEvent: CalendarEvent = { ...event, id: 'evt-' + Date.now() };
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (res.ok) {
        const json = await res.json();
        return json.event;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.events.push(newEvent);
    saveLocalData(current);
    return newEvent;
  },

  async updateEvent(id: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (res.ok) {
        const json = await res.json();
        return json.event;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    const idx = current.events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      current.events[idx] = { ...current.events[idx], ...event };
      saveLocalData(current);
      return current.events[idx];
    }
    return { id, ...event } as CalendarEvent;
  },

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.events = current.events.filter((e) => e.id !== id);
    saveLocalData(current);
    return true;
  },

  async addAnniversary(ann: Omit<Anniversary, 'id'>): Promise<Anniversary> {
    const newAnn: Anniversary = { ...ann, id: 'ann-' + Date.now() };
    try {
      const res = await fetch('/api/anniversaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ann),
      });
      if (res.ok) {
        const json = await res.json();
        return json.anniversary;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.anniversaries.push(newAnn);
    saveLocalData(current);
    return newAnn;
  },

  async deleteAnniversary(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/anniversaries/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.anniversaries = current.anniversaries.filter((a) => a.id !== id);
    saveLocalData(current);
    return true;
  },

  async addTodo(todo: Omit<TodoItem, 'id' | 'isDone'>): Promise<TodoItem> {
    const newTodo: TodoItem = { ...todo, id: 'td-' + Date.now(), isDone: false };
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      if (res.ok) {
        const json = await res.json();
        return json.todo;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.todos.push(newTodo);
    saveLocalData(current);
    return newTodo;
  },

  async toggleTodo(id: string, isDone: boolean): Promise<void> {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone }),
      });
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    const target = current.todos.find((t) => t.id === id);
    if (target) {
      target.isDone = isDone;
      saveLocalData(current);
    }
  },

  async deleteTodo(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.todos = current.todos.filter((t) => t.id !== id);
    saveLocalData(current);
    return true;
  },

  async addNote(note: Omit<LoveNote, 'id' | 'createdAt'>): Promise<LoveNote> {
    const newNote: LoveNote = { ...note, id: 'note-' + Date.now(), createdAt: new Date().toISOString() };
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      if (res.ok) {
        const json = await res.json();
        return json.note;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.loveNotes.unshift(newNote);
    saveLocalData(current);
    return newNote;
  },

  async deleteNote(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.loveNotes = current.loveNotes.filter((n) => n.id !== id);
    saveLocalData(current);
    return true;
  },

  async addMemory(memory: Omit<MemoryItem, 'id' | 'likes'>): Promise<MemoryItem> {
    const newMem: MemoryItem = { ...memory, id: 'mem-' + Date.now(), likes: 0 };
    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memory),
      });
      if (res.ok) {
        const json = await res.json();
        return json.memory;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.memories.unshift(newMem);
    saveLocalData(current);
    return newMem;
  },

  async likeMemory(id: string): Promise<MemoryItem | null> {
    try {
      const res = await fetch(`/api/memories/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        return json.memory;
      }
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    const target = current.memories.find((m) => m.id === id);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      saveLocalData(current);
      return target;
    }
    return null;
  },

  async deleteMemory(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/memories/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // Local fallback
    }
    const current = getLocalData();
    current.memories = current.memories.filter((m) => m.id !== id);
    saveLocalData(current);
    return true;
  },

  async getNetworkInfo(): Promise<{ ip: string; accessUrl: string }> {
    try {
      const res = await fetch('/api/network-info');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return { ip: window.location.hostname, accessUrl: window.location.href };
  }
};
