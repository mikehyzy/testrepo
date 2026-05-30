/* ============================================================
   CENTAUR · the instrument — app root
   Nav rail + the three views. Ported from product.html.
   ============================================================ */
import React, { useState } from "react";
import { Icon, Mark } from "./components/Shared.jsx";
import { Workspace, Ledger, Meditation } from "./components/ProductScreens.jsx";

const NAV = [
  ["work", "pen-line", "Workspace"],
  ["ledger", "gauge", "The Ledger"],
  ["meditation", "moon-star", "Meditation"],
];

function Rail({ view, setView }) {
  return (
    <nav
      style={{
        width: 64,
        flex: "none",
        background: "var(--ink-2)",
        borderRight: "1px solid var(--ink-line)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        gap: 6,
      }}
    >
      <a href="index.html" className="railbtn" title="Back to site" style={{ marginBottom: 14, display: "block" }}>
        <Mark size={34} tone="gilt" />
        <span className="railtip">Centaur · back to site</span>
      </a>
      {NAV.map(([id, icon, label]) => {
        const active = view === id;
        return (
          <button
            key={id}
            className="railbtn"
            onClick={() => setView(id)}
            style={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              border: 0,
              cursor: "pointer",
              borderRadius: 4,
              background: active ? "var(--ink-3)" : "transparent",
              boxShadow: active ? "inset 2px 0 0 var(--bronze-light)" : "none",
              transition: "all .15s var(--ease-stoic)",
            }}
          >
            <Icon name={icon} size={20} color={active ? "var(--bronze-light)" : "var(--on-ink-3)"} />
            <span className="railtip">{label}</span>
          </button>
        );
      })}
      <a
        href="index.html"
        className="railbtn"
        style={{
          marginTop: "auto",
          width: 42,
          height: 42,
          display: "grid",
          placeItems: "center",
          borderRadius: 4,
          textDecoration: "none",
        }}
      >
        <Icon name="log-out" size={19} color="var(--on-ink-3)" />
        <span className="railtip">Exit to site</span>
      </a>
      <div className="railbtn" style={{ marginTop: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid var(--ink-line)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--f-mono)",
            fontSize: 12,
            color: "var(--on-ink-2)",
          }}
        >
          M
        </div>
        <span className="railtip">Marcus · your account</span>
      </div>
    </nav>
  );
}

export default function App() {
  const [view, setView] = useState("work");
  const [value, setValue] = useState(73);
  const [events, setEvents] = useState([
    { t: "09:31", label: "Accepted suggestion verbatim", kind: "offloading" },
    { t: "09:14", label: "Outlined the brief unaided", kind: "enhancing" },
  ]);
  const onLog = (kind, label) => {
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setEvents((e) => [{ t, label, kind }, ...e]);
    setValue((v) => (kind === "enhancing" ? Math.min(92, v + 5) : Math.max(28, v - 9)));
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Rail view={view} setView={setView} />
      {view === "work" && <Workspace value={value} events={events} onLog={onLog} />}
      {view === "ledger" && <Ledger value={value} />}
      {view === "meditation" && <Meditation />}
    </div>
  );
}
