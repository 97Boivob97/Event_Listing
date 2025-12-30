import { create } from "zustand";
import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

export const useEventStore = create((set) => ({
  events: [],
  event: null,
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.EVENTS);
      set({ events: Array.isArray(data) ? data : (data?.events || []), loading: false });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },

  fetchEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.EVENT_BY_ID(id));
      set({ event: data?.event ?? data, loading: false }); // ✅ unwrap
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },


  fetchMyEvents: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.MY_EVENTS);
      return Array.isArray(data) ? data : (data?.events || []);
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
      // fallback: return all events if no "mine" route
      return [];
    } finally {
      set({ loading: false });
    }
  },

  createEvent: async (payload) => {
    const { data } = await api.post(ENDPOINTS.EVENTS, payload);
    return data;
  },

  updateEvent: async (id, payload) => {
    const { data } = await api.put(ENDPOINTS.EVENT_BY_ID(id), payload);
    return data;
  },

  deleteEvent: async (id) => {
    await api.delete(ENDPOINTS.EVENT_BY_ID(id));
  },
}));
