import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEventStore } from "../store/eventStore";
import { normalizeEvent } from "../utils/normalizeEvent";
import EventCard from "../components/EventCard";

export default function Events() {
  const { events, fetchEvents, loading, error } = useEventStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [q, setQ] = useState(searchParams.get("q") || "");

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const all = useMemo(() => events.map(normalizeEvent), [events]);

  const categories = useMemo(() => {
    const set = new Set(all.map((e) => e.category));
    return ["", ...Array.from(set)];
  }, [all]);

  const filtered = useMemo(() => {
    return all.filter((e) => {
      const okCat = !category || e.category === category;
      const okLoc = !location || (e.location || "").toLowerCase().includes(location.toLowerCase());
      const okQ =
        !q ||
        e.title.toLowerCase().includes(q.toLowerCase()) ||
        (e.description || "").toLowerCase().includes(q.toLowerCase());
      return okCat && okLoc && okQ;
    });
  }, [all, category, location, q]);

  const apply = () => {
    const p = {};
    if (category) p.category = category;
    if (location) p.location = location;
    if (q) p.q = q;
    setSearchParams(p);
  };

  const reset = () => {
    setCategory(""); setLocation(""); setQ("");
    setSearchParams({});
  };

  return (
    <div>
      <h1 className="h2">Event Listings</h1>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="row">
          <div>
            <label className="label">Category</label>
            <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c} value={c}>{c || "All"}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Dhaka" />
          </div>
        </div>

        <label className="label">Search</label>
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title/description" />

        <div className="btn--row" style={{ marginTop: 12 }}>
          <button className="btn" onClick={apply}>Apply</button>
          <button className="btn--ghost" onClick={reset}>Reset</button>
        </div>
      </div>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="err">{error}</p>}

      <div className="grid">
        {filtered.map((e) => <EventCard key={e.id} event={e.raw} />)}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="muted">No events found.</p>
      )}
    </div>
  );
}
