/* ============================================================
   CENTAUR — Landing sections
   Hero (the seam) · Thesis · Duality · HowItWorks · Proof · Pricing
   Ported from the design handoff (build/landing.jsx).
   ============================================================ */
import React from "react";
import { Icon, Eyebrow, Btn, Gauge, Reg, useReveal } from "./Shared.jsx";

function Hero({ onCta }) {
  return (
    <section
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1.15fr 1px 0.85fr",
        minHeight: "calc(100vh - 66px)",
        alignItems: "stretch",
      }}
    >
      {/* stone — the human */}
      <div
        style={{
          position: "relative",
          padding: "70px 64px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
          backgroundImage: "radial-gradient(var(--stone-line-soft) 0.6px, transparent 0.6px)",
          backgroundSize: "22px 22px",
        }}
      >
        <Reg />
        <Eyebrow color="var(--bronze-deep)">Real-time cognition signal</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--f-serif)",
            fontWeight: 400,
            fontSize: "clamp(40px,5vw,68px)",
            lineHeight: 1.04,
            letterSpacing: "-.02em",
            margin: 0,
            color: "var(--fg-1)",
            textWrap: "balance",
          }}
        >
          You didn’t stop thinking.
          <br />
          <span style={{ fontStyle: "italic", color: "var(--fg-2)" }}>You stopped noticing</span> when you did.
        </h1>
        <p className="lede" style={{ maxWidth: "46ch", margin: 0 }}>
          Centaur sits in your workflow and tells you, in real time, whether you’re thinking <em>with</em> the
          machine, or handing your thinking over to it. Enhancement, not replacement.
        </p>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 6 }}>
          <Btn variant="bronze" size="lg" onClick={onCta}>
            See how you think
          </Btn>
          <Btn variant="text" href="#thesis">
            Read the thesis →
          </Btn>
        </div>
        <div className="seal" style={{ marginTop: 14 }}>
          Adiutor &middot; non &middot; dominus
        </div>
      </div>

      <div style={{ background: "var(--bronze)" }} />

      {/* ink — the instrument */}
      <div
        style={{
          position: "relative",
          background: "var(--ink)",
          color: "var(--on-ink-1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 22,
          padding: "40px 36px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            backgroundImage:
              "linear-gradient(var(--ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--ink-line) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(circle at 50% 45%, #000 30%, transparent 75%)",
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
          <Eyebrow color="var(--on-ink-3)" style={{ marginBottom: 18 }}>
            This session
          </Eyebrow>
          <Gauge value={73} w={260} tone="ink" />
          <div
            style={{
              fontFamily: "var(--f-mono)",
              fontWeight: 600,
              fontSize: 56,
              color: "var(--patina-lit)",
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            73<span style={{ fontSize: 26 }}>%</span>
          </div>
          <div className="monument" style={{ color: "var(--patina-lit)", fontSize: 16, letterSpacing: ".12em", marginTop: 6 }}>
            Enhancing
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            gap: 26,
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "var(--on-ink-2)",
            borderTop: "1px solid var(--ink-line)",
            paddingTop: 16,
          }}
        >
          <span>
            04:12 <span style={{ color: "var(--on-ink-3)" }}>with AI</span>
          </span>
          <span>
            00:38 <span style={{ color: "var(--on-ink-3)" }}>over to AI</span>
          </span>
          <span style={{ color: "var(--patina-lit)" }}>Δ +6 wk</span>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  const ref = useReveal();
  const debt = [
    ["Day 1", "You use it to draft. You still know what good looks like.", "enh"],
    ["Week 3", "You skim its output. You stop drafting your own first.", "mid"],
    ["Month 2", "You accept without reading. The skill quietly atrophies.", "off"],
  ];
  return (
    <section ref={ref} id="thesis" style={{ background: "var(--ink)", color: "var(--on-ink-1)", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Eyebrow color="var(--bronze-light)" data-reveal>
          The thesis &middot; cognitive debt
        </Eyebrow>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--f-serif)",
            fontWeight: 300,
            fontSize: "clamp(30px,4vw,52px)",
            lineHeight: 1.12,
            letterSpacing: "-.02em",
            margin: "22px 0 0",
            maxWidth: "20ch",
            color: "var(--on-ink-1)",
          }}
        >
          When you let it think for you, the brain stops doing the work, and then loses the ability to do it at all.
        </h2>
        <p data-reveal className="lede" style={{ color: "var(--on-ink-2)", maxWidth: "52ch", marginTop: 26 }}>
          The research is in, and it is not flattering. The cruel twist: the people most confident in the tool
          are the ones who have stopped thinking the hardest.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 0,
            marginTop: 72,
            borderTop: "1px solid var(--ink-line)",
          }}
        >
          {debt.map(([k, v, t], i) => (
            <div
              key={k}
              data-reveal
              style={{
                padding: "30px 26px 30px 0",
                borderRight: i < 2 ? "1px solid var(--ink-line)" : "none",
                paddingLeft: i ? 26 : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 12,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: t === "off" ? "var(--oxide-lit)" : t === "enh" ? "var(--patina-lit)" : "var(--on-ink-3)",
                }}
              >
                {k}
              </div>
              <div style={{ height: 4, background: "var(--ink-3)", margin: "16px 0", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: t === "enh" ? "85%" : t === "mid" ? "50%" : "18%",
                    background: t === "off" ? "var(--oxide-lit)" : t === "enh" ? "var(--patina-lit)" : "var(--bronze-light)",
                  }}
                />
              </div>
              <p style={{ fontFamily: "var(--f-serif)", fontSize: 16, lineHeight: 1.5, color: "var(--on-ink-2)", margin: 0 }}>
                {v}
              </p>
            </div>
          ))}
        </div>
        <p data-reveal className="meditation" style={{ color: "var(--bronze-light)", fontSize: 19, marginTop: 56, textAlign: "center" }}>
          “The fix was never to use less AI. It was to use it the way it was meant to be used.”
        </p>
      </div>
    </section>
  );
}

function Duality() {
  const ref = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--marble)", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow color="var(--bronze-deep)" data-reveal>
          The centaur
        </Eyebrow>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--f-monument)",
            fontWeight: 700,
            fontSize: "clamp(34px,4.6vw,62px)",
            letterSpacing: ".02em",
            margin: "20px 0 0",
            color: "var(--fg-1)",
          }}
        >
          HALF HUMAN, HALF MACHINE
        </h2>
        <p data-reveal className="lede" style={{ maxWidth: "44ch", margin: "20px auto 0" }}>
          Keep the speed of the machine. Keep the mind that made you worth hiring. Still the one in charge.
        </p>
      </div>
      <div
        data-reveal
        style={{
          maxWidth: 1000,
          margin: "64px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr 2px 1fr",
          border: "1px solid var(--stone-line)",
          background: "var(--paper)",
        }}
      >
        <div style={{ padding: "44px 46px" }}>
          <div className="monument" style={{ fontSize: 15, color: "var(--bronze-deep)", marginBottom: 14 }}>
            The Human
          </div>
          <p style={{ fontFamily: "var(--f-serif)", fontSize: 19, lineHeight: 1.55, color: "var(--fg-1)", margin: 0 }}>
            Judgment. Taste. The argument you’d stake your name on. The part a reviewer can’t fake and a model can’t own.
          </p>
        </div>
        <div style={{ background: "var(--bronze)" }} />
        <div
          style={{
            padding: "44px 46px",
            background: "var(--ink)",
            color: "var(--on-ink-1)",
            backgroundImage: "linear-gradient(90deg, var(--ink-line) 1px, transparent 1px)",
            backgroundSize: "16px 100%",
          }}
        >
          <div className="monument" style={{ fontSize: 15, color: "var(--bronze-light)", marginBottom: 14 }}>
            The Machine
          </div>
          <p style={{ fontFamily: "var(--f-serif)", fontSize: 19, lineHeight: 1.55, color: "var(--on-ink-2)", margin: 0 }}>
            Speed. Recall. The tireless first draft and the eighth revision. Power that’s only an asset while
            you’re still the one steering it.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useReveal();
  const steps = [
    ["01", "It watches the verb, not the words", "Centaur reads how you work, whether you draft then refine, or accept then move on. It never stores your content."],
    ["02", "It reads the balance, live", "A single signal between enhancing and offloading, updated as you go. No dashboards to check. Just a glance."],
    ["03", "It nudges at the threshold", "The moment you start handing over the part that was yours to do, it asks one question, and lets you choose."],
  ];
  return (
    <section
      ref={ref}
      id="instrument"
      style={{ background: "var(--paper-2)", padding: "120px 40px", borderTop: "1px solid var(--stone-line)" }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <Eyebrow color="var(--bronze-deep)" data-reveal>
              The instrument
            </Eyebrow>
            <h2
              data-reveal
              style={{
                fontFamily: "var(--f-serif)",
                fontWeight: 400,
                fontSize: "clamp(30px,3.6vw,48px)",
                letterSpacing: "-.02em",
                margin: "18px 0 0",
                color: "var(--fg-1)",
              }}
            >
              A signal, not a scold.
            </h2>
          </div>
          <p data-reveal style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", color: "var(--fg-3)", maxWidth: "32ch", margin: 0 }}>
            It turns a habit you never noticed forming into something you can act on.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, marginTop: 64 }}>
          {steps.map(([n, t, b]) => (
            <div
              key={n}
              data-reveal
              style={{
                position: "relative",
                background: "var(--paper)",
                border: "1px solid var(--stone-line)",
                boxShadow: "var(--sh-relief)",
                padding: "32px 28px 34px",
              }}
            >
              <Reg />
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--bronze-deep)", letterSpacing: ".2em" }}>{n}</div>
              <h4 style={{ fontFamily: "var(--f-serif)", fontWeight: 500, fontSize: 22, lineHeight: 1.2, margin: "16px 0 12px", color: "var(--fg-1)" }}>
                {t}
              </h4>
              <p style={{ fontFamily: "var(--f-serif)", fontSize: 15.5, lineHeight: 1.55, color: "var(--fg-2)", margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
        <div data-reveal style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Btn variant="ghost" href="product.html">
            <Icon name="gauge" size={15} color="var(--fg-1)" />Open the instrument
          </Btn>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const ref = useReveal();
  const stats = [
    ["+23%", "self-reported recall of own work", "enh"],
    ["−41%", "verbatim accepts after 3 weeks", "enh"],
    ["8 min", "median time to first nudge", "neu"],
  ];
  return (
    <section ref={ref} id="evidence" style={{ background: "var(--ink)", color: "var(--on-ink-1)", padding: "118px 40px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow color="var(--bronze-light)" data-reveal>
          The evidence
        </Eyebrow>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--f-serif)",
            fontWeight: 300,
            fontSize: "clamp(28px,3.6vw,46px)",
            lineHeight: 1.15,
            margin: "20px auto 0",
            maxWidth: "22ch",
            color: "var(--on-ink-1)",
          }}
        >
          People who can see the signal keep more of their own mind.
        </h2>
        <div
          data-reveal
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, marginTop: 72, border: "1px solid var(--ink-line)" }}
        >
          {stats.map(([n, l, t], i) => (
            <div key={l} style={{ padding: "34px 24px", borderRight: i < 2 ? "1px solid var(--ink-line)" : "none" }}>
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontWeight: 600,
                  fontSize: 44,
                  lineHeight: 1,
                  color: t === "enh" ? "var(--patina-lit)" : "var(--bronze-light)",
                }}
              >
                {n}
              </div>
              <div style={{ fontFamily: "var(--f-serif)", fontSize: 14, color: "var(--on-ink-2)", marginTop: 12 }}>{l}</div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".1em", color: "var(--on-ink-3)", marginTop: 18 }}>
          ILLUSTRATIVE PILOT FIGURES &middot; NOT YET PEER-REVIEWED
        </div>
      </div>
    </section>
  );
}

function Pricing({ onCta }) {
  const ref = useReveal();
  const tiers = [
    {
      name: "Individual",
      price: "$12",
      per: "/ month",
      lead: "For the one mind you can’t afford to dull.",
      feats: ["Live cognition signal", "Real-time nudges", "Nightly meditation review", "Private, content never stored"],
      variant: "ghost",
    },
    {
      name: "Team",
      price: "$9",
      per: "/ seat · mo",
      lead: "Keep a whole team thinking, not just typing.",
      feats: ["Everything in Individual", "Team trend ledger", "Aggregate, never individual surveillance", "Admin & SSO"],
      variant: "bronze",
      featured: true,
    },
  ];
  return (
    <section ref={ref} id="pricing" style={{ background: "var(--marble)", padding: "120px 40px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow color="var(--bronze-deep)" data-reveal>
          Pricing
        </Eyebrow>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--f-monument)",
            fontWeight: 700,
            fontSize: "clamp(30px,4vw,52px)",
            letterSpacing: ".02em",
            margin: "18px 0 8px",
          }}
        >
          KEEP YOUR EDGE
        </h2>
      </div>
      <div data-reveal style={{ maxWidth: 820, margin: "52px auto 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {tiers.map((t) => (
          <div
            key={t.name}
            style={{
              position: "relative",
              padding: "38px 34px 34px",
              background: t.featured ? "var(--ink)" : "var(--paper)",
              color: t.featured ? "var(--on-ink-1)" : "var(--fg-1)",
              border: t.featured ? "1px solid var(--bronze)" : "1px solid var(--stone-line)",
              boxShadow: t.featured ? "var(--sh-ink)" : "var(--sh-relief)",
            }}
          >
            <div className="monument" style={{ fontSize: 14, letterSpacing: ".14em", color: t.featured ? "var(--bronze-light)" : "var(--bronze-deep)" }}>
              {t.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 18 }}>
              <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: 46, lineHeight: 1 }}>{t.price}</span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, opacity: 0.7 }}>{t.per}</span>
            </div>
            <p style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontSize: 15, color: t.featured ? "var(--on-ink-2)" : "var(--fg-2)", margin: "14px 0 22px" }}>
              {t.lead}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "flex", flexDirection: "column", gap: 11 }}>
              {t.feats.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    fontFamily: "var(--f-serif)",
                    fontSize: 15,
                    color: t.featured ? "var(--on-ink-2)" : "var(--fg-2)",
                  }}
                >
                  <span style={{ color: t.featured ? "var(--patina-lit)" : "var(--patina-deep)", marginTop: 1 }}>·</span>
                  {f}
                </li>
              ))}
            </ul>
            <Btn variant={t.featured ? "bronze" : "ghost"} style={{ width: "100%", justifyContent: "center" }} onClick={onCta}>
              Start with {t.name}
            </Btn>
          </div>
        ))}
      </div>
    </section>
  );
}

export { Hero, Thesis, Duality, HowItWorks, Proof, Pricing };
