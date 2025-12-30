import { create } from "zustand";
import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.LOGIN, { email, password });
      const token = data?.token || data?.accessToken;
      if (!token) throw new Error("Token not found in response");
      localStorage.setItem("token", token);
      set({ token, user: data?.user || null, loading: false });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
      throw e;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.REGISTER, payload);
      const token = data?.token || data?.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        set({ token, user: data?.user || null, loading: false });
      } else {
        set({ loading: false }); // some backends return only success message
      }
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
      throw e;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, error: null });
  },
}));
