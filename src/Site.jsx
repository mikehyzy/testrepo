/* ============================================================
   CENTAUR · the site — marketing / manifesto surface
   Ported from the design handoff (index.html + build/landing.jsx).
   ============================================================ */
import React, { useState } from "react";
import { Mark, Eyebrow, Btn, Reg, TopNav, SiteFooter } from "./components/Shared.jsx";
import { Hero, Thesis, Duality, HowItWorks, Proof, Pricing } from "./components/SiteSections.jsx";

function CtaModal({ onClose }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="cta-overlay" onClick={onClose}>
      <div className="cta-card" onClick={(e) => e.stopPropagation()}>
        <Reg />
        {!sent ? (
          <React.Fragment>
            <Eyebrow color="var(--bronze-deep)">Begin</Eyebrow>
            <h3
              style={{
                fontFamily: "var(--f-serif)",
                fontWeight: 400,
                fontSize: 28,
                lineHeight: 1.15,
                margin: "12px 0 4px",
                color: "var(--fg-1)",
              }}
            >
              See how you think.
            </h3>
            <p style={{ fontFamily: "var(--f-serif)", fontSize: 15, color: "var(--fg-2)", margin: "8px 0 0" }}>
              Centaur installs beside the tools you already use. We’ll send a link. Your content never leaves your machine.
            </p>
            <input className="cta-input" placeholder="you@work.com" autoFocus aria-label="Work email" />
            <Btn variant="bronze" style={{ width: "100%", justifyContent: "center" }} onClick={() => setSent(true)}>
              Keep your edge
            </Btn>
            <div className="seal" style={{ textAlign: "center", marginTop: 16 }}>
              Adiutor &middot; non &middot; dominus
            </div>
          </React.Fragment>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <Mark size={64} />
            <h3 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: 26, margin: "18px 0 8px", color: "var(--fg-1)" }}>
              The mind remains.
            </h3>
            <p style={{ fontFamily: "var(--f-serif)", fontSize: 15, color: "var(--fg-2)", margin: "0 0 22px" }}>
              Check your inbox. We’ve sent your link to begin.
            </p>
            <Btn variant="ghost" onClick={onClose}>
              Close
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Site() {
  const [cta, setCta] = useState(false);
  const open = () => setCta(true);
  return (
    <React.Fragment>
      <TopNav active="landing" onCta={open} />
      <Hero onCta={open} />
      <Thesis />
      <Duality />
      <HowItWorks />
      <Proof />
      <Pricing onCta={open} />
      <SiteFooter />
      {cta && <CtaModal onClose={() => setCta(false)} />}
    </React.Fragment>
  );
}
