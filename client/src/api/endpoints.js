export const ENDPOINTS = {
  // AUTH
  LOGIN: "/api/login",
  REGISTER: "/api/registration",

  // EVENTS
  EVENTS: "/api/events",
  EVENT_BY_ID: (id) => `/api/events/${id}`,

  ME: null,
  MY_EVENTS: null,
};
