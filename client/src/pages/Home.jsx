import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useEventStore } from "../store/eventStore";
import { normalizeEvent } from "../utils/normalizeEvent";
import EventCard from "../components/EventCard";

export default function Home() {
  const { events, fetchEvents, loading, error } = useEventStore();

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const latest = useMemo(() => {
    const list = events.map(normalizeEvent);
    return list.slice(0, 6);
  }, [events]);

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => normalizeEvent(e).category));
    return Array.from(set).slice(0, 8);
  }, [events]);

  return (
    <>
      <div className="banner">
        <div>
          <div className="badge">Find • Save • Manage</div>
          <h1 className="h1">Discover Local Events</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Browse upcoming events by category and location. Save your favorites.
          </p>
        </div>
        <div className="btn--row">
          <Link className="btn" to="/events">Browse Events</Link>
          <Link className="btn--ghost" to="/dashboard">Create Event</Link>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2 className="h2">Upcoming Events</h2>
        {loading && <p className="muted">Loading…</p>}
        {error && <p className="err">{error}</p>}
        <div className="grid">
          {latest.map((e) => <EventCard key={e.id} event={e.raw} />)}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2 className="h2">Categories</h2>
        <div className="btn--row">
          {categories.map((c) => (
            <Link key={c} className="btn--ghost" to={`/events?category=${encodeURIComponent(c)}`}>
              {c}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
