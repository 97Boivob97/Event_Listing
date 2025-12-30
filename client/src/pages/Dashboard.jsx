import { useEffect, useMemo, useState } from "react";
import { useEventStore } from "../store/eventStore";
import { normalizeEvent } from "../utils/normalizeEvent";

const emptyForm = {
  title: "",
  date: "",
  time: "",
  location: "",
  category: "",
  description: "",
};

export default function Dashboard() {
  const { fetchEvents, events, createEvent, updateEvent, deleteEvent, loading, error } = useEventStore();

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const list = useMemo(() => events.map(normalizeEvent), [events]);

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const payload = {
        // backend might expect name instead of title, etc. adjust if needed
        title: form.title,
        name: form.title,
        date: form.date,
        time: form.time,
        location: form.location,
        category: form.category,
        description: form.description,
      };

      if (editId) {
        await updateEvent(editId, payload);
        setMsg("Event updated.");
      } else {
        await createEvent(payload);
        setMsg("Event created.");
      }

      setForm(emptyForm);
      setEditId(null);
      await fetchEvents();
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  const startEdit = (e) => {
    setEditId(e.id);
    setForm({
      title: e.title || "",
      date: e.date || "",
      time: e.time || "",
      location: e.location || "",
      category: e.category || "",
      description: e.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
    await fetchEvents();
  };

  return (
    <div>
      <h1 className="h2">User Dashboard</h1>
      <p className="muted">Create, update, and delete events (protected).</p>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>{editId ? "Update Event" : "Create Event"}</h3>

        <form onSubmit={onSubmit}>
          <label className="label">Event Name</label>
          <input className="input" value={form.title} onChange={onChange("title")} required />

          <div className="row">
            <div>
              <label className="label">Date</label>
              <input className="input" type="date" value={form.date} onChange={onChange("date")} required />
            </div>
            <div>
              <label className="label">Time</label>
              <input className="input" type="time" value={form.time} onChange={onChange("time")} required />
            </div>
          </div>

          <div className="row">
            <div>
              <label className="label">Location</label>
              <input className="input" value={form.location} onChange={onChange("location")} required />
            </div>
            <div>
              <label className="label">Category</label>
              <input className="input" value={form.category} onChange={onChange("category")} placeholder="e.g. Tech, Sports" />
            </div>
          </div>

          <label className="label">Description</label>
          <textarea className="textarea" value={form.description} onChange={onChange("description")} />

          {error && <p className="err">{error}</p>}
          {msg && <p className={msg.toLowerCase().includes("error") ? "err" : "ok"}>{msg}</p>}

          <div className="btn--row" style={{ marginTop: 12 }}>
            <button className="btn" disabled={loading}>
              {loading ? "Saving…" : editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn--ghost"
                onClick={() => { setEditId(null); setForm(emptyForm); setMsg(""); }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="h2">All Events</h2>
      {loading && <p className="muted">Loading…</p>}

      <div className="grid">
        {list.map((e) => (
          <div className="card" key={e.id}>
            <span className="badge">{e.category}</span>
            <h3 style={{ margin: "10px 0 6px" }}>{e.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {e.date} {e.time ? `• ${e.time}` : ""}<br />
              {e.location}
            </p>

            <div className="btn--row">
              <button className="btn--ghost" onClick={() => startEdit(e)}>Edit</button>
              <button className="btn btn--danger" onClick={() => onDelete(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
