import { AppData } from '../types';

export function encodeSyncData(data: AppData): string {
  try {
    const compact = {
      p: data.profile,
      e: data.events,
      a: data.anniversaries,
      t: data.todos,
      n: data.loveNotes,
      m: data.memories,
      ts: Date.now(),
    };
    const jsonStr = JSON.stringify(compact);
    // Base64 encode UTF-8
    return btoa(encodeURIComponent(jsonStr));
  } catch (err) {
    console.error('Error encoding sync data', err);
    return '';
  }
}

export function decodeSyncData(encoded: string): AppData | null {
  try {
    const jsonStr = decodeURIComponent(atob(encoded));
    const compact = JSON.parse(jsonStr);
    if (!compact.p) return null;

    return {
      profile: compact.p,
      events: compact.e || [],
      anniversaries: compact.a || [],
      todos: compact.t || [],
      loveNotes: compact.n || [],
      memories: compact.m || [],
    };
  } catch (err) {
    console.error('Error decoding sync data', err);
    return null;
  }
}

export function generateSyncUrl(data: AppData): string {
  const base = typeof window !== 'undefined' && window.location.href.includes('github.io')
    ? 'https://dlrnrtls12-dev.github.io/couple-calendar/'
    : window.location.origin + window.location.pathname;

  const encoded = encodeSyncData(data);
  return `${base}?sync=${encodeURIComponent(encoded)}`;
}
