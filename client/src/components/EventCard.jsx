import { Link } from "react-router-dom";
import { normalizeEvent } from "../utils/normalizeEvent";
import { useSavedStore } from "../store/savedStore";

export default function EventCard({ event }) {
  const e = normalizeEvent(event);
  const { isSaved, toggleSave } = useSavedStore();

  return (
    <div className="card">
      <div className="btn--row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <span className="badge">{e.category}</span>
        {e.id && (
          <button className="btn--ghost" onClick={() => toggleSave(e.id)}>
            {isSaved(e.id) ? "Saved ✓" : "Save"}
          </button>
        )}
      </div>

      <h3 style={{ margin: "10px 0 8px" }}>{e.title}</h3>
      <p className="muted" style={{ margin: 0 }}>
        {e.date ? `${e.date}` : "Date TBA"} {e.time ? ` • ${e.time}` : ""}<br />
        {e.location || "Location TBA"}
      </p>

      <div style={{ marginTop: 12 }}>
        <Link className="btn" to={`/events/${e.id}`}>View Details</Link>
      </div>
    </div>
  );
}
