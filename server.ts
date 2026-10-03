import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DATA_FILE = path.join(process.cwd(), 'couple-data.json');

// Initial Default Data
const initialData = {
  profile: {
    partner1: {
      name: '남편',
      nickname: '서방님',
      avatar: '👨',
      mood: '설렘 💕',
      moodMessage: '오늘 퇴근길에 맛있는 디저트 사갈게!',
    },
    partner2: {
      name: '아내',
      nickname: '우리여보',
      avatar: '👩',
      mood: '행복함 🥰',
      moodMessage: '얼른 보고 싶다, 조심히 와요!',
    },
    weddingDate: '2024-11-17',
    firstMetDate: '2016-01-29',
    coupleMessage: '평생 서로의 편이 되어 함께 걸어가자 💍',
  },
  events: [
    {
      id: 'evt-1',
      title: '주말 제주도 여행 🌴',
      date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '18:00',
      category: 'couple', // 'couple' | 'husband' | 'wife' | 'family' | 'anniversary'
      location: '김포공항 -> 제주도',
      note: '렌터카 예약 확인 & 감성 카페 리스트 챙기기',
      author: 'husband',
    },
    {
      id: 'evt-2',
      title: '양가 부모님과 저녁 식사 🍱',
      date: new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0],
      startTime: '18:30',
      endTime: '21:00',
      category: 'family',
      location: '경복궁 한정식',
      note: '부모님 좋아하시는 과일 바구니 미리 주문하기',
      author: 'wife',
    },
    {
      id: 'evt-3',
      title: '남편 치과 검진 🦷',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      startTime: '15:00',
      endTime: '16:00',
      category: 'husband',
      location: '서울미소치과',
      note: '정기 스케일링 예약',
      author: 'husband',
    },
    {
      id: 'evt-4',
      title: '아내 필라테스 수업 🧘‍♀️',
      date: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0],
      startTime: '19:30',
      endTime: '20:30',
      category: 'wife',
      location: '바른자세 스튜디오',
      note: '퇴근 후 바로 가기',
      author: 'wife',
    }
  ],
  anniversaries: [
    {
      id: 'ann-1',
      title: '결혼기념일 💍',
      date: '2024-11-17',
      isRepeatYearly: true,
      category: 'wedding',
      memo: '서로에게 가장 특별한 날, 매년 감사하고 사랑해',
      icon: '💍'
    },
    {
      id: 'ann-2',
      title: '처음 만난 날 🌸',
      date: '2016-01-29',
      isRepeatYearly: true,
      category: 'firstMet',
      memo: '어느덧 3900일이 넘은 우리, 함께해 온 모든 날이 선물이야',
      icon: '🌸'
    },
    {
      id: 'ann-3',
      title: '남편 생일 🎂',
      date: '1993-08-15',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '세상에서 제일 사랑하는 내 반쪽 태어난 날',
      icon: '🎉'
    },
    {
      id: 'ann-4',
      title: '아내 생일 🎂',
      date: '1995-12-05',
      isRepeatYearly: true,
      category: 'birthday',
      memo: '꽃보다 예쁜 우리 아내 생일 축하해!',
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

// Helper: Read Data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data file, using defaults:', err);
  }
  saveData(initialData);
  return initialData;
}

// Helper: Save Data
function saveData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data file:', err);
  }
}

// Helper: Get Local IP
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Routes
app.get('/api/data', (req, res) => {
  const data = loadData();
  res.json({ success: true, data });
});

app.get('/api/network-info', (req, res) => {
  const ip = getLocalIp();
  res.json({
    success: true,
    ip,
    webPort: 5173,
    serverPort: PORT,
    accessUrl: `http://${ip}:5173`
  });
});

app.post('/api/profile', (req, res) => {
  const data = loadData();
  data.profile = { ...data.profile, ...req.body };
  saveData(data);
  res.json({ success: true, profile: data.profile });
});

// Events
app.post('/api/events', (req, res) => {
  const data = loadData();
  const newEvent = {
    id: 'evt-' + Date.now(),
    ...req.body
  };
  data.events.push(newEvent);
  saveData(data);
  res.json({ success: true, event: newEvent });
});

app.put('/api/events/:id', (req, res) => {
  const data = loadData();
  const index = data.events.findIndex((e: any) => e.id === req.params.id);
  if (index !== -1) {
    data.events[index] = { ...data.events[index], ...req.body };
    saveData(data);
    res.json({ success: true, event: data.events[index] });
  } else {
    res.status(404).json({ success: false, message: 'Event not found' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  const data = loadData();
  data.events = data.events.filter((e: any) => e.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Anniversaries
app.post('/api/anniversaries', (req, res) => {
  const data = loadData();
  const newAnniversary = {
    id: 'ann-' + Date.now(),
    ...req.body
  };
  data.anniversaries.push(newAnniversary);
  saveData(data);
  res.json({ success: true, anniversary: newAnniversary });
});

app.delete('/api/anniversaries/:id', (req, res) => {
  const data = loadData();
  data.anniversaries = data.anniversaries.filter((a: any) => a.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Todos
app.post('/api/todos', (req, res) => {
  const data = loadData();
  const newTodo = {
    id: 'td-' + Date.now(),
    isDone: false,
    ...req.body
  };
  data.todos.push(newTodo);
  saveData(data);
  res.json({ success: true, todo: newTodo });
});

app.patch('/api/todos/:id', (req, res) => {
  const data = loadData();
  const index = data.todos.findIndex((t: any) => t.id === req.params.id);
  if (index !== -1) {
    data.todos[index] = { ...data.todos[index], ...req.body };
    saveData(data);
    res.json({ success: true, todo: data.todos[index] });
  } else {
    res.status(404).json({ success: false, message: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const data = loadData();
  data.todos = data.todos.filter((t: any) => t.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Love Notes
app.post('/api/notes', (req, res) => {
  const data = loadData();
  const newNote = {
    id: 'note-' + Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  data.loveNotes.unshift(newNote); // latest on top
  saveData(data);
  res.json({ success: true, note: newNote });
});

app.delete('/api/notes/:id', (req, res) => {
  const data = loadData();
  data.loveNotes = data.loveNotes.filter((n: any) => n.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Memories
app.post('/api/memories', (req, res) => {
  const data = loadData();
  const newMemory = {
    id: 'mem-' + Date.now(),
    likes: 0,
    ...req.body
  };
  data.memories.unshift(newMemory);
  saveData(data);
  res.json({ success: true, memory: newMemory });
});

app.post('/api/memories/:id/like', (req, res) => {
  const data = loadData();
  const item = data.memories.find((m: any) => m.id === req.params.id);
  if (item) {
    item.likes = (item.likes || 0) + 1;
    saveData(data);
    res.json({ success: true, memory: item });
  } else {
    res.status(404).json({ success: false });
  }
});

app.delete('/api/memories/:id', (req, res) => {
  const data = loadData();
  data.memories = data.memories.filter((m: any) => m.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Couple Calendar Server running on http://localhost:${PORT}`);
  console.log(`External access available at http://${getLocalIp()}:${PORT}`);
});
