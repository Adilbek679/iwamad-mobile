import { useEffect, useState } from 'react';
import { loadSavedIds, storeSavedIds } from '../lib/savedStorage';

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // read once when the screen opens
  useEffect(() => {
    loadSavedIds().then(setSavedIds);
  }, []);

  // write only when the user changes something
  function toggleSaved(id: number) {
    const next = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];
    setSavedIds(next);
    storeSavedIds(next);
  }

  return { savedIds, toggleSaved };
}
