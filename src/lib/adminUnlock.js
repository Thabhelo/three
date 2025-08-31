import { useEffect, useState } from 'react';

// Simple unlock via pressing 'h' key once
export const useAdminUnlock = () => {
  // Locked by default; does NOT persist across reloads
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      const ch = (e.key || '').toLowerCase();
      if (ch === 'h') setUnlocked(true);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const lock = () => setUnlocked(false);

  return { unlocked, lock };
};


