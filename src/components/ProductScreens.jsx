/* ============================================================
   CENTAUR — Product screens
   Workspace (editor + docked instrument + nudge) · Ledger · Meditation
   Ported from the design handoff (build/product-screens.jsx).
   ============================================================ */
import React, { useState } from "react";
import { Icon, Mark, Eyebrow, Btn, Gauge, Chip } from "./Shared.jsx";

/* ---------- Workspace ---------- */
function Nudge({ onChoose }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        display: "grid",
        placeItems: "center",
        background: "rgba(22,20,13,.46)",
        backdropFilter: "blur(3px)",
        animation: "cfade .18s ease",
      }}
    >
      <div
        style={{
          width: 440,
          background: "var(--paper)",
          border: "1px solid var(--stone-line)",
          borderTop: "3px solid var(--bronze)",
          boxShadow: "var(--sh-lift)",
          padding: "30px 32px 26px",
        }}
      >
        <Eyebrow color="var(--bronze-deep)" style={{ letterSpacing: ".22em" }}>
          Before you accept this
        </Eyebrow>
        <h3
          style={{
            fontFamily: "var(--f-serif)",
            fontWeight: 400,
            fontSize: 27,
            lineHeight: 1.2,
            margin: "12px 0 10px",
            color: "var(--fg-1)",
          }}
        >
          What would <em>you</em> have written?
        </h3>
        <p
          style={{
            fontFamily: "var(--f-serif)",
            fontSize: 15,
            color: "var(--fg-2)",
            margin: "0 0 22px",
            lineHeight: 1.5,
          }}
        >
          This is the part of the memo that carries your judgment. Take it back, or hand it over. Your call.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="bronze" onClick={() => onChoose("enhancing")}>
            <Icon name="pen-line" size={15} color="var(--paper)" />Let me try first
          </Btn>
          <Btn variant="ghost" onClick={() => onChoose("offloading")}>
            Accept anyway
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Dock({ value, events }) {
  const verdict = value >= 50 ? "enhancing" : "offloading";
  return (
    <aside
      style={{
        width: 312,
        flex: "none",
        background: "var(--ink)",
        color: "var(--on-ink-1)",
        borderLeft: "1px solid var(--ink-line)",
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "linear-gradient(var(--ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--ink-line) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--ink-line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(22,20,13,.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Mark size={22} tone="gilt" />
          <span
            style={{
              fontFamily: "var(--f-monument)",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: ".1em",
              color: "var(--on-ink-1)",
            }}
          >
            CENTAUR
          </span>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--f-mono)",
            fontSize: 10,
            letterSpacing: ".14em",
            color: "var(--patina-lit)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--patina-lit)",
              boxShadow: "0 0 8px var(--patina-lit)",
            }}
          />
          LIVE
        </span>
      </div>

      <div
        style={{
          padding: "26px 20px 20px",
          textAlign: "center",
          borderBottom: "1px solid var(--ink-line)",
        }}
      >
        <Eyebrow color="var(--on-ink-3)" style={{ marginBottom: 14, letterSpacing: ".22em" }}>
          This session
        </Eyebrow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Gauge value={value} w={236} tone="ink" />
        </div>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1,
            color: verdict === "enhancing" ? "var(--patina-lit)" : "var(--oxide-lit)",
            marginTop: 6,
          }}
        >
          {Math.round(value)}
          <span style={{ fontSize: 22 }}>%</span>
        </div>
        <div
          className="monument"
          style={{
            fontSize: 14,
            letterSpacing: ".12em",
            marginTop: 6,
            color: verdict === "enhancing" ? "var(--patina-lit)" : "var(--oxide-lit)",
          }}
        >
          {verdict}
        </div>
      </div>

      <div
        style={{
          padding: "16px 20px",
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <Eyebrow color="var(--on-ink-3)" style={{ letterSpacing: ".22em" }}>
            Session ledger
          </Eyebrow>
          <Eyebrow color="var(--on-ink-3)" style={{ letterSpacing: ".22em" }}>
            {events.length} events
          </Eyebrow>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" }}>
          {events.map((e, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr auto",
                gap: 10,
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid var(--ink-line)",
                fontFamily: "var(--f-mono)",
                fontSize: 11,
              }}
            >
              <span style={{ color: "var(--on-ink-3)" }}>{e.t}</span>
              <span style={{ color: "var(--on-ink-2)", lineHeight: 1.3 }}>{e.label}</span>
              <span
                style={{
                  color: e.kind === "enhancing" ? "var(--patina-lit)" : "var(--oxide-lit)",
                  fontSize: 10,
                }}
              >
                {e.kind === "enhancing" ? "+ enh" : "− off"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: "13px 20px",
          borderTop: "1px solid var(--ink-line)",
          display: "flex",
          gap: 18,
          fontFamily: "var(--f-mono)",
          fontSize: 11,
          color: "var(--on-ink-2)",
        }}
      >
        <span>
          04:12 <span style={{ color: "var(--on-ink-3)" }}>with</span>
        </span>
        <span>
          00:38 <span style={{ color: "var(--on-ink-3)" }}>over</span>
        </span>
      </div>
    </aside>
  );
}

function Workspace({ value, events, onLog }) {
  const [nudge, setNudge] = useState(false);
  const [inserted, setInserted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const handleChoose = (kind) => {
    setNudge(false);
    if (kind === "enhancing") {
      onLog("enhancing", "Took back the positioning line");
      setDismissed(true);
    } else {
      onLog("offloading", "Accepted suggestion verbatim");
      setInserted(true);
    }
  };
  return (
    <div style={{ position: "relative", flex: 1, display: "flex", minWidth: 0 }}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "var(--marble)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "min(720px, 100%)", padding: "44px 56px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <Icon name="file-text" size={15} color="var(--fg-3)" />
            <span
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 12,
                color: "var(--fg-3)",
                letterSpacing: ".04em",
              }}
            >
              Q3 Strategy / positioning-memo.md
            </span>
            <span style={{ marginLeft: "auto" }}>
              <Chip kind={value >= 50 ? "enhancing" : "offloading"} />
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--f-serif)",
              fontWeight: 500,
              fontSize: 38,
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              color: "var(--fg-1)",
              margin: "0 0 22px",
            }}
          >
            Why we win the mid-market
          </h1>
          <p
            style={{
              fontFamily: "var(--f-serif)",
              fontSize: 17.5,
              lineHeight: 1.7,
              color: "var(--fg-1)",
              margin: "0 0 18px",
            }}
          >
            The incumbents sell speed. We are not going to beat them on speed, and we should stop
            pretending that is the fight. Our buyer has been burned by tools that made their teams
            faster and duller at the same time.
          </p>
          <p
            style={{
              fontFamily: "var(--f-serif)",
              fontSize: 17.5,
              lineHeight: 1.7,
              color: "var(--fg-1)",
              margin: "0 0 22px",
            }}
          >
            So the wedge is trust. We are the only vendor whose product makes the case that&nbsp;
            <span style={{ background: "var(--patina-wash)", padding: "1px 3px", borderRadius: 2 }}>
              using us makes you measurably sharper
            </span>
            , not just quicker.
          </p>

          {!inserted && !dismissed && (
            <div
              style={{
                position: "relative",
                border: "1px dashed var(--bronze)",
                background: "rgba(167,123,67,.06)",
                borderRadius: 4,
                padding: "16px 18px",
                margin: "8px 0 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Icon name="sparkles" size={14} color="var(--bronze-deep)" />
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10.5,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "var(--bronze-deep)",
                  }}
                >
                  Suggested continuation
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--f-serif)",
                  fontSize: 16.5,
                  lineHeight: 1.65,
                  color: "var(--fg-2)",
                  fontStyle: "italic",
                  margin: "0 0 14px",
                }}
              >
                “To operationalize this, we should anchor every sales conversation on the
                cognitive-debt narrative, position trust as the category, and reframe speed as table
                stakes rather than differentiation…”
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn size="sm" variant="primary" onClick={() => setNudge(true)}>
                  <Icon name="corner-down-left" size={13} color="var(--marble)" />Insert
                </Btn>
                <Btn
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    onLog("enhancing", "Dismissed, wrote it myself");
                    setDismissed(true);
                  }}
                >
                  Dismiss, I’ll write it
                </Btn>
              </div>
            </div>
          )}
          {inserted && (
            <p
              style={{
                fontFamily: "var(--f-serif)",
                fontSize: 17.5,
                lineHeight: 1.7,
                color: "var(--fg-1)",
                margin: "0",
                borderLeft: "3px solid var(--oxide)",
                paddingLeft: 16,
              }}
            >
              To operationalize this, we should anchor every sales conversation on the cognitive-debt
              narrative, position trust as the category, and reframe speed as table stakes rather than
              differentiation.
            </p>
          )}
          {dismissed && (
            <p
              style={{
                fontFamily: "var(--f-serif)",
                fontSize: 17.5,
                lineHeight: 1.7,
                color: "var(--fg-1)",
                margin: 0,
                borderLeft: "3px solid var(--patina)",
                paddingLeft: 16,
              }}
            >
              The line you’ll stake your name on goes here, in your words.{" "}
              <span style={{ color: "var(--fg-4)" }}>The cursor is yours.</span>
            </p>
          )}
        </div>
      </div>
      <Dock value={value} events={events} />
      {nudge && <Nudge onChoose={handleChoose} />}
    </div>
  );
}

/* ---------- Ledger ---------- */
function StatCell({ n, label, tone = "neu", border }) {
  const col = tone === "enh" ? "var(--patina-deep)" : tone === "off" ? "var(--oxide-deep)" : "var(--fg-1)";
  return (
    <div
      style={{
        padding: "20px 22px",
        borderRight: border ? "1px solid var(--stone-line)" : "none",
        flex: 1,
      }}
    >
      <div style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: 34, lineHeight: 1, color: col }}>
        {n}
      </div>
      <div style={{ fontFamily: "var(--f-serif)", fontSize: 13.5, color: "var(--fg-2)", marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

function Ledger({ value }) {
  const days = [
    ["Mon", 61],
    ["Tue", 68],
    ["Wed", 54],
    ["Thu", 73],
    ["Fri", 79],
    ["Sat", 66],
    ["Sun", 73],
  ];
  const log = [
    ["Today 09:47", "Rewrote the conclusion yourself", "enhancing"],
    ["Today 09:31", "Accepted suggestion verbatim", "offloading"],
    ["Today 09:14", "Outlined the brief unaided", "enhancing"],
    ["Yest. 16:02", "Asked for holes in your argument", "enhancing"],
    ["Yest. 15:48", "Let it draft the whole section", "offloading"],
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "var(--marble)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "44px 48px 80px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 32,
          }}
        >
          <div>
            <Eyebrow color="var(--bronze-deep)">The ledger</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--f-serif)",
                fontWeight: 500,
                fontSize: 40,
                letterSpacing: "-.02em",
                color: "var(--fg-1)",
                margin: "12px 0 0",
              }}
            >
              How you thought this week
            </h1>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--fg-3)" }}>
            May 23 to 29, 2040
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 22 }}>
          <div
            style={{
              background: "var(--ink)",
              color: "var(--on-ink-1)",
              padding: "26px 24px",
              textAlign: "center",
            }}
          >
            <Eyebrow color="var(--on-ink-3)" style={{ marginBottom: 12, letterSpacing: ".22em" }}>
              Week average
            </Eyebrow>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Gauge value={value} w={228} tone="ink" />
            </div>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontWeight: 600,
                fontSize: 46,
                lineHeight: 1,
                color: "var(--patina-lit)",
                marginTop: 6,
              }}
            >
              {Math.round(value)}
              <span style={{ fontSize: 20 }}>%</span>
            </div>
            <div
              className="monument"
              style={{ fontSize: 13, letterSpacing: ".12em", color: "var(--patina-lit)", marginTop: 5 }}
            >
              Enhancing
            </div>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                color: "var(--patina-lit)",
                marginTop: 14,
                borderTop: "1px solid var(--ink-line)",
                paddingTop: 12,
              }}
            >
              Δ +6 vs. last week
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                background: "var(--paper)",
                border: "1px solid var(--stone-line)",
                boxShadow: "var(--sh-relief)",
                padding: "22px 26px",
              }}
            >
              <Eyebrow color="var(--fg-3)" style={{ marginBottom: 20 }}>
                Daily reading
              </Eyebrow>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 120 }}>
                {days.map(([d, v]) => (
                  <div
                    key={d}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--fg-2)" }}>
                      {v}
                    </span>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 34,
                        height: v,
                        background:
                          v >= 70 ? "var(--patina)" : v >= 60 ? "var(--bronze)" : "var(--oxide)",
                        borderRadius: "2px 2px 0 0",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        color: "var(--fg-3)",
                        letterSpacing: ".06em",
                      }}
                    >
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                background: "var(--paper)",
                border: "1px solid var(--stone-line)",
                boxShadow: "var(--sh-relief)",
              }}
            >
              <StatCell n="73%" label="thinking with the machine" tone="enh" border />
              <StatCell n="14" label="offload events caught" tone="off" border />
              <StatCell n="4h 12m" label="focused, in control" />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            background: "var(--paper)",
            border: "1px solid var(--stone-line)",
            boxShadow: "var(--sh-relief)",
          }}
        >
          <div
            style={{
              padding: "16px 26px",
              borderBottom: "1px solid var(--stone-line)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Eyebrow color="var(--fg-3)">Recent events</Eyebrow>
            <Eyebrow color="var(--fg-3)">Verb, not content</Eyebrow>
          </div>
          {log.map(([t, label, kind], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr auto",
                gap: 16,
                alignItems: "center",
                padding: "14px 26px",
                borderBottom: i < log.length - 1 ? "1px solid var(--stone-line-soft)" : "none",
              }}
            >
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--fg-3)" }}>{t}</span>
              <span style={{ fontFamily: "var(--f-serif)", fontSize: 16, color: "var(--fg-1)" }}>
                {label}
              </span>
              <Chip kind={kind} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Meditation ---------- */
function Meditation() {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        background: "var(--ink)",
        color: "var(--on-ink-1)",
        position: "relative",
        backgroundImage: "radial-gradient(120% 130% at 50% 0%, #221E15 0%, #16140D 55%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(var(--ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--ink-line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(circle at 50% 30%, #000 20%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 640,
          margin: "0 auto",
          padding: "76px 40px 80px",
          textAlign: "center",
        }}
      >
        <Mark size={52} tone="gilt" />
        <Eyebrow color="var(--bronze-light)" style={{ marginTop: 26, letterSpacing: ".22em" }}>
          Nightly meditation &middot; 29 May
        </Eyebrow>
        <h1
          style={{
            fontFamily: "var(--f-serif)",
            fontWeight: 300,
            fontSize: 40,
            lineHeight: 1.22,
            color: "var(--on-ink-1)",
            margin: "22px 0 0",
            textWrap: "balance",
          }}
        >
          You kept the hard part.
        </h1>
        <p
          style={{
            fontFamily: "var(--f-serif)",
            fontSize: 19,
            lineHeight: 1.7,
            color: "var(--on-ink-2)",
            margin: "26px 0 0",
            textWrap: "pretty",
          }}
        >
          Today you thought <em>with</em> the machine four hours, and let it think for you thirty-eight
          minutes. The thirty-eight minutes are the ones to watch, and twice today, you took them back.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            margin: "44px auto 0",
            maxWidth: 420,
            border: "1px solid var(--ink-line)",
          }}
        >
          <div style={{ flex: 1, padding: "20px 0", borderRight: "1px solid var(--ink-line)" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: 30, color: "var(--patina-lit)" }}>
              4h 12m
            </div>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--on-ink-3)",
                marginTop: 8,
              }}
            >
              With
            </div>
          </div>
          <div style={{ flex: 1, padding: "20px 0" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: 30, color: "var(--oxide-lit)" }}>
              0h 38m
            </div>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--on-ink-3)",
                marginTop: 8,
              }}
            >
              Over
            </div>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--f-serif)",
            fontStyle: "italic",
            fontSize: 17,
            color: "var(--bronze-light)",
            margin: "44px 0 0",
          }}
        >
          “You have power over your mind, not outside events. Realize this, and you will find strength.”
        </p>
        <div className="seal" style={{ color: "var(--bronze-light)", marginTop: 26 }}>
          Marcus Aurelius &middot; Meditations
        </div>
      </div>
    </div>
  );
}

export { Nudge, Dock, Workspace, StatCell, Ledger, Meditation };
