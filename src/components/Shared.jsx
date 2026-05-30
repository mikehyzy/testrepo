/* ============================================================
   CENTAUR — shared primitives
   Ported from the design handoff (build/shared.jsx).
   "Adiutor, non dominus." — a helper, not a master.
   ============================================================ */
import React, { useState, useEffect, useRef } from "react";
import {
  PenLine,
  Gauge as GaugeIcon,
  MoonStar,
  LogOut,
  FileText,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- Lucide icon (stroke-only, instrument-grade) ---
   Keeps the prototype's name-string API; maps kebab names to
   lucide-react components. `gauge` is aliased so the brand
   Gauge component below is untouched. --- */
const ICONS = {
  "pen-line": PenLine,
  gauge: GaugeIcon,
  "moon-star": MoonStar,
  "log-out": LogOut,
  "file-text": FileText,
  sparkles: Sparkles,
  "corner-down-left": CornerDownLeft,
};

function Icon({ name, size = 18, color = "currentColor", stroke = 1.75, style }) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  return (
    <Glyph
      size={size}
      color={color}
      strokeWidth={stroke}
      style={{ display: "inline-flex", ...style }}
    />
  );
}

/* --- The brand mark: the dial-seam gauge (SVG inline) --- */
function Mark({ size = 44, tone = "ink" }) {
  const stone = tone === "gilt" ? "#F2ECDD" : "#16140D";
  const machine = tone === "gilt" ? "#C9A86A" : "#16140D";
  const bezel = tone === "gilt" ? "#C9A86A" : "#A77B43";
  const needle = tone === "gilt" ? "#74B895" : "#4C8A6F";
  const uid = "mh" + tone + size;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-label="Centaur">
      <defs>
        <clipPath id={uid}>
          <path d="M60,8 A52,52 0 0,1 60,112 Z" />
        </clipPath>
      </defs>
      <path d="M60,10 A50,50 0 0,0 60,110 Z" fill={stone} />
      <g clipPath={`url(#${uid})`} stroke={machine} strokeWidth="1.4" opacity="0.85">
        {[68, 78, 88, 98, 108].map((x) => (
          <line key={x} x1={x} y1="6" x2={x} y2="114" />
        ))}
      </g>
      <circle cx="60" cy="60" r="52" fill="none" stroke={bezel} strokeWidth="2.6" />
      <line x1="60" y1="8" x2="60" y2="112" stroke={bezel} strokeWidth="1.6" />
      <line x1="60" y1="60" x2="44" y2="26" stroke={needle} strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5.5" fill={bezel} />
      <circle cx="60" cy="60" r="2" fill="#16140D" />
    </svg>
  );
}

function Wordmark({ size = 22, tone = "ink", sub }) {
  const col = tone === "gilt" ? "#F2ECDD" : "#16140D";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Mark size={size * 1.9} tone={tone} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--f-monument)",
            fontWeight: 800,
            fontSize: size,
            letterSpacing: ".07em",
            lineHeight: 1,
            color: col,
          }}
        >
          CENTAUR
        </span>
        {sub && (
          <span
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: size * 0.4,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: tone === "gilt" ? "#8B826C" : "#6E6857",
            }}
          >
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

function Eyebrow({ children, color = "var(--fg-3)", style }) {
  return (
    <div
      style={{
        fontFamily: "var(--f-mono)",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: ".34em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, variant = "primary", size = "md", onClick, href, style }) {
  const base = {
    fontFamily: "var(--f-mono)",
    fontWeight: 600,
    letterSpacing: ".03em",
    border: "1.5px solid transparent",
    borderRadius: 3,
    cursor: "pointer",
    transition: "all .18s var(--ease-stoic)",
    whiteSpace: "nowrap",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: size === "lg" ? "15px 28px" : size === "sm" ? "8px 14px" : "12px 22px",
    fontSize: size === "lg" ? 15 : size === "sm" ? 12 : 13.5,
  };
  const variants = {
    primary: { background: "var(--ink)", color: "var(--marble)" },
    bronze: {
      background: "var(--bronze)",
      color: "var(--paper)",
      borderColor: "var(--bronze-deep)",
      boxShadow: "0 2px 0 var(--bronze-deep)",
    },
    ghost: { background: "transparent", color: "var(--fg-1)", borderColor: "var(--ink)" },
    ghostLight: { background: "transparent", color: "var(--on-ink-1)", borderColor: "var(--on-ink-3)" },
    ghostDark: { background: "transparent", color: "var(--on-ink-1)", borderColor: "var(--ink-line)" },
    text: {
      background: "transparent",
      color: "var(--bronze-deep)",
      border: 0,
      textDecoration: "underline",
      textUnderlineOffset: 4,
      padding: "4px 2px",
    },
  };
  const [h, setH] = useState(false);
  const hov = h
    ? { transform: variant === "text" ? "none" : "translateY(-1px)", filter: "brightness(0.94)" }
    : {};
  const props = {
    style: { ...base, ...variants[variant], ...hov, ...style },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onClick,
  };
  return href ? <a href={href} {...props}>{children}</a> : <button {...props}>{children}</button>;
}

/* --- The cognition gauge. value = % enhancing (0..100) --- */
function Gauge({ value = 73, w = 220, tone = "ink", showEnds = true }) {
  const display = useCountUp(value);
  const cx = 100,
    cy = 100;
  const ang = Math.PI * (1 - display / 100);
  const nx = cx + 64 * Math.cos(ang),
    ny = cy - 64 * Math.sin(ang);
  const ink = tone === "ink";
  const oxide = ink ? "#79271A" : "#A23E2C",
    patina = ink ? "#356552" : "#4C8A6F";
  const tickCol = ink ? "#6E6857" : "#908A77";
  const h = w * 0.6;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: w }}>
      <svg width={w} height={h} viewBox="0 0 200 118">
        <path d="M20,100 A80,80 0 0,1 100,20" fill="none" stroke={oxide} strokeWidth="13" strokeLinecap="round" />
        <path d="M100,20 A80,80 0 0,1 180,100" fill="none" stroke={patina} strokeWidth="13" strokeLinecap="round" />
        <g stroke={tickCol} strokeWidth="1.4">
          <line x1="20" y1="100" x2="29" y2="100" />
          <line x1="100" y1="20" x2="100" y2="11" />
          <line x1="180" y1="100" x2="171" y2="100" />
        </g>
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#C9A86A" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="7" fill="#C9A86A" />
        <circle cx={cx} cy={cy} r="2.6" fill="#16140D" />
      </svg>
      {showEnds && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: w * 0.85,
            margin: "0 auto",
            fontFamily: "var(--f-mono)",
            fontSize: 9,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: ink ? "#CC7058" : "#A23E2C" }}>Offload</span>
          <span style={{ color: ink ? "#74B895" : "#356552" }}>Enhance</span>
        </div>
      )}
    </div>
  );
}

/* --- Verdict chip --- */
function Chip({ kind }) {
  const map = {
    enhancing: ["var(--patina-wash)", "var(--patina-deep)", "var(--patina)", "Enhancing"],
    offloading: ["var(--oxide-wash)", "var(--oxide-deep)", "var(--oxide)", "Offloading"],
    idle: ["var(--marble-2)", "var(--fg-2)", "var(--stone-line)", "Idle"],
  };
  const [bg, fg, dot, label] = map[kind] || map.idle;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--f-mono)",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: ".05em",
        textTransform: "uppercase",
        padding: "5px 11px",
        borderRadius: 999,
        background: bg,
        color: fg,
        border: `1px solid ${dot}`,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot }} />
      {label}
    </span>
  );
}

/* --- count-up easing for needle / number settle (animates from previous) --- */
function useCountUp(target, dur = 900) {
  const [v, setV] = useState(REDUCED ? target : 0);
  const prev = useRef(REDUCED ? target : 0);
  useEffect(() => {
    if (REDUCED) {
      setV(target);
      prev.current = target;
      return;
    }
    let raf, start;
    const from = prev.current;
    prev.current = target;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

/* --- registration corner ticks --- */
function Reg({ color = "var(--bronze)" }) {
  const b = (pos) => ({ position: "absolute", width: 10, height: 10, borderColor: color, ...pos });
  return (
    <React.Fragment>
      <span style={b({ top: 8, left: 8, borderLeft: "1.5px solid", borderTop: "1.5px solid" })} />
      <span style={b({ top: 8, right: 8, borderRight: "1.5px solid", borderTop: "1.5px solid" })} />
      <span style={b({ bottom: 8, left: 8, borderLeft: "1.5px solid", borderBottom: "1.5px solid" })} />
      <span style={b({ bottom: 8, right: 8, borderRight: "1.5px solid", borderBottom: "1.5px solid" })} />
    </React.Fragment>
  );
}

/* --- reveal-on-scroll with stagger --- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-reveal]") || [];
    if (REDUCED) {
      els.forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
      return;
    }
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            en.target.style.opacity = 1;
            en.target.style.transform = "none";
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity .7s var(--ease-stoic) ${i * 0.08}s, transform .7s var(--ease-stoic) ${i * 0.08}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ============================================================
   Cross-page top nav (marketing surface).
   ============================================================ */
function TopNav({ active = "landing", onCta }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "The thesis", href: active === "landing" ? "#thesis" : "index.html#thesis" },
    { label: "The instrument", href: "product.html" },
    { label: "The evidence", href: active === "landing" ? "#evidence" : "index.html#evidence" },
    { label: "Pricing", href: active === "landing" ? "#pricing" : "index.html#pricing" },
  ];
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(236,230,218,.86)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--stone-line)" : "1px solid transparent",
        transition: "all .3s var(--ease-stoic)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="index.html" style={{ textDecoration: "none" }}>
          <Wordmark size={19} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 12.5,
                letterSpacing: ".04em",
                color: "var(--fg-2)",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                paddingBottom: 2,
              }}
            >
              {l.label}
            </a>
          ))}
          {onCta ? (
            <Btn variant="bronze" size="sm" onClick={onCta}>
              Keep your edge
            </Btn>
          ) : (
            <Btn variant="bronze" size="sm" href="product.html">
              See the instrument
            </Btn>
          )}
        </nav>
      </div>
    </header>
  );
}

/* --- Marketing footer --- */
function SiteFooter() {
  const cols = [
    [
      "Product",
      [
        ["The instrument", "product.html"],
        ["The thesis", "#thesis"],
        ["The evidence", "#evidence"],
        ["Pricing", "#pricing"],
      ],
    ],
    [
      "Explore",
      [
        ["How it works", "#instrument"],
        ["The centaur", "#thesis"],
        ["Open the instrument", "product.html"],
      ],
    ],
  ];
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--on-ink-2)",
        padding: "72px 40px 40px",
        borderTop: "2px solid var(--bronze)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div style={{ maxWidth: 320 }}>
            <Wordmark size={20} tone="gilt" />
            <p
              style={{
                fontFamily: "var(--f-serif)",
                fontStyle: "italic",
                fontSize: 15,
                marginTop: 18,
                color: "var(--on-ink-3)",
              }}
            >
              A helper, not a master. Still the one in charge.
            </p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            {cols.map(([h, items]) => (
              <div key={h}>
                <Eyebrow color="var(--bronze-light)" style={{ fontSize: 10 }}>
                  {h}
                </Eyebrow>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "16px 0 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {items.map(([i, href]) => (
                    <li key={i}>
                      <a
                        href={href}
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: 12.5,
                          color: "var(--on-ink-2)",
                          textDecoration: "none",
                        }}
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            borderTop: "1px solid var(--ink-line)",
            marginTop: 56,
            paddingTop: 22,
            fontFamily: "var(--f-mono)",
            fontSize: 10.5,
            letterSpacing: ".06em",
            color: "var(--on-ink-3)",
          }}
        >
          <span>MENS MANET &middot; © 2040 CENTAUR</span>
          <span>PRIVACY &middot; TERMS &middot; YOUR CONTENT IS NEVER STORED</span>
        </div>
      </div>
    </footer>
  );
}

export {
  Icon,
  Mark,
  Wordmark,
  Eyebrow,
  Btn,
  Gauge,
  Chip,
  useCountUp,
  Reg,
  useReveal,
  TopNav,
  SiteFooter,
};
