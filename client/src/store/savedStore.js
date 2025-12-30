import { create } from "zustand";

const KEY = "saved_events";

function readSaved() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export const useSavedStore = create((set, get) => ({
  savedIds: readSaved(),

  isSaved: (id) => get().savedIds.includes(id),

  toggleSave: (id) => {
    const cur = get().savedIds;
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    set({ savedIds: next });
  },
}));
