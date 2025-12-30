export function normalizeEvent(e) {
  return {
    id: e?._id || e?.id,
    title: e?.title || e?.name || e?.eventName || "Untitled",
    date: e?.date || e?.eventDate || "",
    time: e?.time || e?.eventTime || "",
    location: e?.location || e?.venue || "",
    category: e?.category || e?.type || "General",
    description: e?.description || e?.details || "",
    raw: e,
  };
}
