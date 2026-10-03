import React, { useState, useEffect } from 'react';
import { AppData, CalendarEvent, Anniversary, TodoItem, LoveNote, MemoryItem, CoupleProfile } from './types';
import { api } from './api';
import { Header } from './components/Header';
import { CalendarView } from './components/CalendarView';
import { AnniversaryView } from './components/AnniversaryView';
import { LoveNotesView } from './components/LoveNotesView';
import { TodoView } from './components/TodoView';
import { MemoriesView } from './components/MemoriesView';
import { EventModal } from './components/EventModal';
import { AnniversaryModal } from './components/AnniversaryModal';
import { ProfileModal } from './components/ProfileModal';
import { ShareModal } from './components/ShareModal';
import { BottomNav } from './components/BottomNav';
import { MobileFAB } from './components/MobileFAB';
import { Heart, Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('calendar');

  // Modals state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | undefined>(undefined);

  const [isAnniversaryModalOpen, setIsAnniversaryModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Load initial data and set up live polling (every 4 seconds) for real-time couple sync
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await api.getData();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load couple data', err);
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Event Handlers
  const handleOpenAddEvent = (dateStr?: string) => {
    setEditingEvent(null);
    setSelectedCalendarDate(dateStr);
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedCalendarDate(event.date);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (
    eventData: Omit<CalendarEvent, 'id'>,
    anniversaryData?: { isRepeatYearly: boolean; icon: string; memo?: string }
  ) => {
    if (!data) return;
    let updatedEvents = [...data.events];
    let updatedAnniversaries = [...data.anniversaries];

    if (editingEvent) {
      const updated = await api.updateEvent(editingEvent.id, eventData);
      updatedEvents = data.events.map((e) => (e.id === editingEvent.id ? updated : e));
    } else {
      const newEvt = await api.addEvent(eventData);
      updatedEvents = [...data.events, newEvt];
    }

    // Also register as anniversary if selected!
    if (anniversaryData) {
      const newAnn = await api.addAnniversary({
        title: eventData.title,
        date: eventData.date,
        isRepeatYearly: anniversaryData.isRepeatYearly,
        category: 'custom',
        memo: anniversaryData.memo,
        icon: anniversaryData.icon,
      });
      updatedAnniversaries = [...updatedAnniversaries, newAnn];
    }

    setData({
      ...data,
      events: updatedEvents,
      anniversaries: updatedAnniversaries,
    });
  };

  const handleDeleteEvent = async (id: string) => {
    if (!data) return;
    if (window.confirm('이 일정을 삭제할까요?')) {
      await api.deleteEvent(id);
      setData({
        ...data,
        events: data.events.filter((e) => e.id !== id),
      });
    }
  };

  // Anniversary Handlers
  const handleSaveAnniversary = async (annData: Omit<Anniversary, 'id'>) => {
    if (!data) return;
    const newAnn = await api.addAnniversary(annData);
    setData({
      ...data,
      anniversaries: [...data.anniversaries, newAnn],
    });
  };

  const handleDeleteAnniversary = async (id: string) => {
    if (!data) return;
    if (window.confirm('이 기념일을 삭제할까요?')) {
      await api.deleteAnniversary(id);
      setData({
        ...data,
        anniversaries: data.anniversaries.filter((a) => a.id !== id),
      });
    }
  };

  // Todo Handlers
  const handleAddTodo = async (todoData: Omit<TodoItem, 'id' | 'isDone'>) => {
    if (!data) return;
    const newTd = await api.addTodo(todoData);
    setData({
      ...data,
      todos: [...data.todos, newTd],
    });
  };

  const handleToggleTodo = async (id: string, isDone: boolean) => {
    if (!data) return;
    await api.toggleTodo(id, isDone);
    setData({
      ...data,
      todos: data.todos.map((t) => (t.id === id ? { ...t, isDone } : t)),
    });
  };

  const handleDeleteTodo = async (id: string) => {
    if (!data) return;
    await api.deleteTodo(id);
    setData({
      ...data,
      todos: data.todos.filter((t) => t.id !== id),
    });
  };

  // Love Note Handlers
  const handleAddNote = async (noteData: Omit<LoveNote, 'id' | 'createdAt'>) => {
    if (!data) return;
    const newNt = await api.addNote(noteData);
    setData({
      ...data,
      loveNotes: [newNt, ...data.loveNotes],
    });
  };

  const handleDeleteNote = async (id: string) => {
    if (!data) return;
    await api.deleteNote(id);
    setData({
      ...data,
      loveNotes: data.loveNotes.filter((n) => n.id !== id),
    });
  };

  // Memory Handlers
  const handleAddMemory = async (memData: Omit<MemoryItem, 'id' | 'likes'>) => {
    if (!data) return;
    const newMem = await api.addMemory(memData);
    setData({
      ...data,
      memories: [newMem, ...data.memories],
    });
  };

  const handleLikeMemory = async (id: string) => {
    if (!data) return;
    const updated = await api.likeMemory(id);
    if (updated) {
      setData({
        ...data,
        memories: data.memories.map((m) => (m.id === id ? updated : m)),
      });
    }
  };

  const handleDeleteMemory = async (id: string) => {
    if (!data) return;
    if (window.confirm('이 소중한 순간 기록을 삭제할까요?')) {
      await api.deleteMemory(id);
      setData({
        ...data,
        memories: data.memories.filter((m) => m.id !== id),
      });
    }
  };

  // Profile Handlers
  const handleSaveProfile = async (profileData: Partial<CoupleProfile>) => {
    if (!data) return;
    const updated = await api.updateProfile(profileData);
    setData({
      ...data,
      profile: updated,
    });
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#faf7f5] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 animate-pulse">
          <Heart className="w-8 h-8 fill-rose-500" />
        </div>
        <p className="text-sm font-semibold text-stone-600 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
          <span>둘만의 특별한 공간을 불러오는 중...</span>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#2e2929] flex flex-col selection:bg-rose-200">
      {/* Top Navigation & Profile Bar */}
      <Header
        profile={data.profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 pb-24 md:pb-8">
        {activeTab === 'calendar' && (
          <CalendarView
            events={data.events}
            anniversaries={data.anniversaries}
            onAddEvent={handleOpenAddEvent}
            onEditEvent={handleOpenEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}

        {activeTab === 'anniversary' && (
          <AnniversaryView
            profile={data.profile}
            anniversaries={data.anniversaries}
            onAddAnniversary={() => setIsAnniversaryModalOpen(true)}
            onDeleteAnniversary={handleDeleteAnniversary}
          />
        )}

        {activeTab === 'notes' && (
          <LoveNotesView
            profile={data.profile}
            notes={data.loveNotes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {activeTab === 'todos' && (
          <TodoView
            profile={data.profile}
            todos={data.todos}
            onAddTodo={handleAddTodo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

        {activeTab === 'memories' && (
          <MemoriesView
            profile={data.profile}
            memories={data.memories}
            onAddMemory={handleAddMemory}
            onLikeMemory={handleLikeMemory}
            onDeleteMemory={handleDeleteMemory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-rose-100/60 text-center text-xs text-stone-400">
        <p className="flex items-center justify-center gap-1">
          <span>Made with love for our special days</span>
          <span className="text-rose-400">♥</span>
        </p>
      </footer>

      {/* Mobile Floating Action Button */}
      <MobileFAB
        onAddEvent={() => handleOpenAddEvent()}
        onAddAnniversary={() => setIsAnniversaryModalOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
        initialDate={selectedCalendarDate}
      />

      <AnniversaryModal
        isOpen={isAnniversaryModalOpen}
        onClose={() => setIsAnniversaryModalOpen(false)}
        onSave={handleSaveAnniversary}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={data.profile}
        onSave={handleSaveProfile}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default App;
