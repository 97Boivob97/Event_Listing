import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useEventStore } from "../store/eventStore";
import { normalizeEvent } from "../utils/normalizeEvent";
import { useSavedStore } from "../store/savedStore";

export default function EventDetails() {
  const { id } = useParams();
  const { event, fetchEvent, loading, error } = useEventStore();
  const { isSaved, toggleSave } = useSavedStore();

  useEffect(() => { fetchEvent(id); }, [fetchEvent, id]);

  const e = useMemo(() => normalizeEvent(event || {}), [event]);

  return (
    <div>
      <div className="btn--row" style={{ marginBottom: 10 }}>
        <Link className="btn--ghost" to="/events">← Back</Link>
        {e.id && (
          <button className="btn--ghost" onClick={() => toggleSave(e.id)}>
            {isSaved(e.id) ? "Saved ✓" : "Save"}
          </button>
        )}
      </div>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="err">{error}</p>}

      {!loading && !error && (
        <div className="card">
          <span className="badge">{e.category}</span>
          <h1 className="h2" style={{ marginTop: 10 }}>{e.title}</h1>
          <p className="muted" style={{ marginTop: 0 }}>
            {e.date || "Date TBA"} {e.time ? `• ${e.time}` : ""}<br />
            {e.location || "Location TBA"}
          </p>

          <h3 style={{ marginBottom: 6 }}>Description</h3>
          <p style={{ marginTop: 0 }}>{e.description || "No description."}</p>
        </div>
      )}
    </div>
  );
}
