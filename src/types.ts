export interface PartnerProfile {
  name: string;
  nickname: string;
  avatar: string;
  mood: string;
  moodMessage: string;
}

export interface CoupleProfile {
  partner1: PartnerProfile; // Husband
  partner2: PartnerProfile; // Wife
  weddingDate: string;
  firstMetDate: string;
  coupleMessage: string;
}

export type EventCategory = 'couple' | 'husband' | 'wife' | 'family' | 'anniversary';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  category: EventCategory;
  location?: string;
  note?: string;
  author?: 'husband' | 'wife';
}

export interface Anniversary {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  isRepeatYearly: boolean;
  category: 'wedding' | 'firstMet' | 'birthday' | 'custom';
  memo?: string;
  icon?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  assignedTo: 'all' | 'husband' | 'wife';
  category: 'bucket' | 'groceries' | 'chore';
  isDone: boolean;
  dueDate?: string;
}

export interface LoveNote {
  id: string;
  sender: 'husband' | 'wife';
  message: string;
  createdAt: string;
  sticker?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  author: 'husband' | 'wife';
  likes: number;
}

export interface AppData {
  profile: CoupleProfile;
  events: CalendarEvent[];
  anniversaries: Anniversary[];
  todos: TodoItem[];
  loveNotes: LoveNote[];
  memories: MemoryItem[];
}
