import { useState, useRef, useEffect } from "react";

// Load html2canvas and jsPDF from CDN
function useExportLibs() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const load = (src) => new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
      const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    Promise.all([
      load("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
      load("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
    ]).then(() => setReady(true)).catch(console.error);
  }, []);
  return ready;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const Icons = {
  twitter: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  copy: "M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  share: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8 M16 6l-4-4-4 4 M12 2v13",
  wand: "M15 4V2 M15 16v-2 M8 9h2 M20 9h2 M17.8 11.8L19 13 M15 9h0 M17.8 6.2L19 5 M3 21l9-9 M12.2 6.2L11 5",
  shuffle: "M16 3h5v5 M4 20L21 3 M21 16v5h-5 M15 15l6 6 M4 4l5 5",
  moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  sun: "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
  plus: "M12 5v14 M5 12h14",
  trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  check: "M20 6L9 17l-5-5",
  mappin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  tool: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
};

const TEMPLATES = [
  { id: "minimal", label: "Minimal", icon: "▤", desc: "Clean & text-focused" },
  { id: "professional", label: "Professional", icon: "◈", desc: "Corporate & polished" },
  { id: "creative", label: "Creative", icon: "◭", desc: "Bold with color" },
  { id: "playful", label: "Playful", icon: "◉", desc: "Fun & expressive" },
  { id: "terminal", label: "Terminal", icon: "⌨", desc: "Hacker / dev aesthetic" },
  { id: "magazine", label: "Magazine", icon: "◫", desc: "Editorial & typographic" },
  { id: "neon", label: "Neon", icon: "◐", desc: "Cyberpunk glow" },
  { id: "retro", label: "Retro", icon: "◑", desc: "80s card nostalgia" },
];

// Per-template color slots with labels and defaults
const TEMPLATE_COLOR_DEFS = {
  minimal:      [{ key: "accent", label: "Accent", default: "#8b6914" }, { key: "bg", label: "Background", default: "#fafafa" }, { key: "fg", label: "Text", default: "#111111" }],
  professional: [{ key: "accent", label: "Header & Links", default: "#2563eb" }, { key: "bg", label: "Background", default: "#ffffff" }, { key: "fg", label: "Text", default: "#1e293b" }],
  creative:     [{ key: "accent1", label: "Gradient Start", default: "#f97316" }, { key: "accent2", label: "Gradient End", default: "#8b5cf6" }, { key: "accent3", label: "Connect Color", default: "#06b6d4" }, { key: "bg", label: "Background", default: "#fef3c7" }],
  playful:      [{ key: "p1", label: "Color 1", default: "#f0abfc" }, { key: "p2", label: "Color 2", default: "#818cf8" }, { key: "p3", label: "Color 3", default: "#34d399" }, { key: "p4", label: "Color 4", default: "#fbbf24" }],
  terminal:     [{ key: "green", label: "Prompt Green", default: "#39d353" }, { key: "cyan", label: "Command Cyan", default: "#79c0ff" }, { key: "yellow", label: "Output Yellow", default: "#e3b341" }, { key: "pink", label: "Value Pink", default: "#f778ba" }],
  magazine:     [{ key: "accent", label: "Accent / Headings", default: "#c4520a" }, { key: "bg", label: "Background", default: "#f5f0eb" }, { key: "fg", label: "Text", default: "#1a1208" }],
  neon:         [{ key: "neonBlue", label: "Neon Blue", default: "#00f0ff" }, { key: "neonPink", label: "Neon Pink", default: "#ff2d78" }, { key: "neonGreen", label: "Neon Green", default: "#39ff82" }, { key: "neonYellow", label: "Neon Yellow", default: "#ffe135" }],
  retro:        [{ key: "stripe1", label: "Stripe 1", default: "#ff6b35" }, { key: "stripe2", label: "Stripe 2", default: "#7b2d8b" }, { key: "stripe3", label: "Stripe 3", default: "#0096c7" }],
};

function getDefaultColors(templateId) {
  return Object.fromEntries((TEMPLATE_COLOR_DEFS[templateId] || []).map(d => [d.key, d.default]));
}

const SAMPLE = {
  name: "Alex Rivera",
  handle: "@alexrivera",
  headline: "Product Designer & Creative Technologist",
  bio: "I craft digital experiences that live at the intersection of design and engineering. Passionate about building tools that empower people to do their best work.",
  skills: ["UI/UX Design", "React", "Figma", "Motion Design", "Prototyping"],
  location: "San Francisco, CA",
  twitter: "alexrivera",
  linkedin: "alexrivera",
  github: "alexrivera",
  website: "alexrivera.com",
  experience: [
    { role: "Senior Product Designer", company: "Vercel", period: "2022 – Present", desc: "Leading design for the dashboard and developer experience platform." },
    { role: "UX Engineer", company: "Linear", period: "2020 – 2022", desc: "Built component systems and interactive prototypes for core features." },
    { role: "Product Designer", company: "Framer", period: "2018 – 2020", desc: "Designed onboarding flows and the canvas interaction model." },
  ],
  projects: [{ title: "DesignOS", desc: "A design system for enterprise teams" }, { title: "Motionkit", desc: "Animation library for React" }],
  achievements: ["Speaker at Config 2024", "Open Source Contributor of the Year"],
  tools: ["Figma", "VS Code", "Linear", "Notion"],
  photo: null,
};

// ─── Template Renderers ───────────────────────────────────────────────────────

function MinimalTemplate({ data, dark, colors = {} }) {
  const bg = colors.bg || (dark ? "#0f0f0f" : "#fafafa");
  const fg = colors.fg || (dark ? "#e8e8e8" : "#111");
  const muted = dark ? "#666" : "#999";
  const accent = colors.accent || (dark ? "#c8b896" : "#8b6914");
  const border = dark ? "#222" : "#e5e5e5";

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'Georgia', serif", minHeight: "100%", padding: "48px 40px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 36, paddingBottom: 36, borderBottom: `1px solid ${border}` }}>
          {data.photo ? (
            <img src={data.photo} alt="profile" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: dark ? "#222" : "#e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 24, color: muted }}>{data.name?.[0] || "?"}</span>
            </div>
          )}
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em" }}>{data.name || "Your Name"}</h1>
            {data.handle && <p style={{ margin: "4px 0 0", color: accent, fontSize: 13, fontFamily: "monospace" }}>{data.handle}</p>}
          </div>
        </div>

        <p style={{ fontSize: 14, color: accent, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 8px", fontFamily: "monospace" }}>
          {data.headline || "Your Headline"}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: fg, margin: "0 0 36px" }}>{data.bio || "Your bio goes here."}</p>

        {data.skills?.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 12px", fontFamily: "monospace" }}>Skills</p>
            <p style={{ fontSize: 14, color: fg, margin: 0, lineHeight: 1.8 }}>{data.skills.join("  ·  ")}</p>
          </div>
        )}

        {data.projects?.filter(p => p.title).length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 12px", fontFamily: "monospace" }}>Projects</p>
            {data.projects.filter(p => p.title).map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</span>
                {p.desc && <span style={{ fontSize: 13, color: muted }}> — {p.desc}</span>}
              </div>
            ))}
          </div>
        )}

        {data.experience?.filter(e => e.role || e.company).length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 16px", fontFamily: "monospace" }}>Experience</p>
            {data.experience.filter(e => e.role || e.company).map((e, i) => (
              <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: i < data.experience.filter(x => x.role || x.company).length - 1 ? `1px solid ${border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{e.role}</span>
                  {e.period && <span style={{ fontSize: 11, color: muted, fontFamily: "monospace" }}>{e.period}</span>}
                </div>
                {e.company && <p style={{ margin: "0 0 4px", fontSize: 13, color: accent }}>{e.company}</p>}
                {e.desc && <p style={{ margin: 0, fontSize: 13, color: muted, lineHeight: 1.6 }}>{e.desc}</p>}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 32, borderTop: `1px solid ${border}`, fontSize: 13, color: muted }}>
          {data.location && <span>{data.location}</span>}
          {data.twitter && <a href={`https://twitter.com/${data.twitter}`} style={{ color: muted, textDecoration: "none" }}>twitter/{data.twitter}</a>}
          {data.github && <a href={`https://github.com/${data.github}`} style={{ color: muted, textDecoration: "none" }}>github/{data.github}</a>}
          {data.website && <a href={`https://${data.website}`} style={{ color: muted, textDecoration: "none" }}>{data.website}</a>}
        </div>
      </div>
    </div>
  );
}

function ProfessionalTemplate({ data, dark, colors = {} }) {
  const bg = colors.bg || (dark ? "#111827" : "#ffffff");
  const sidebar = dark ? "#1f2937" : "#f8fafc";
  const fg = colors.fg || (dark ? "#f1f5f9" : "#1e293b");
  const muted = dark ? "#94a3b8" : "#64748b";
  const accent = colors.accent || "#2563eb";
  const accentLight = dark ? accent + "33" : accent + "18";

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'Trebuchet MS', sans-serif", minHeight: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ background: accent, padding: "32px 36px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -60, left: "30%", width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative", zIndex: 1 }}>
          {data.photo ? (
            <img src={data.photo} alt="profile" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.5)" }} />
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 28, color: "#fff" }}>{data.name?.[0] || "?"}</span>
            </div>
          )}
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{data.name || "Your Name"}</h1>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{data.headline || "Your Headline"}</p>
            {data.handle && <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 12 }}>{data.handle}</p>}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 0 }}>
        {/* Main */}
        <div style={{ padding: "28px 28px 28px 36px" }}>
          {data.bio && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 10px", fontWeight: 600 }}>About</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: fg, margin: 0 }}>{data.bio}</p>
            </div>
          )}

          {data.experience?.filter(e => e.role || e.company).length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 14px", fontWeight: 600 }}>Work Experience</h3>
              {data.experience.filter(e => e.role || e.company).map((e, i) => (
                <div key={i} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: `3px solid ${accent}`, position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{e.role}</p>
                    {e.period && <span style={{ fontSize: 11, color: muted, flexShrink: 0, marginLeft: 8 }}>{e.period}</span>}
                  </div>
                  {e.company && <p style={{ margin: "0 0 4px", fontSize: 13, color: accent, fontWeight: 600 }}>{e.company}</p>}
                  {e.desc && <p style={{ margin: 0, fontSize: 13, color: muted, lineHeight: 1.6 }}>{e.desc}</p>}
                </div>
              ))}
            </div>
          )}

          {data.projects?.filter(p => p.title).length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 10px", fontWeight: 600 }}>Projects</h3>
              {data.projects.filter(p => p.title).map((p, i) => (
                <div key={i} style={{ marginBottom: 12, padding: "12px 14px", background: accentLight, borderRadius: 6, borderLeft: `3px solid ${accent}` }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{p.title}</p>
                  {p.desc && <p style={{ margin: "4px 0 0", fontSize: 13, color: muted }}>{p.desc}</p>}
                </div>
              ))}
            </div>
          )}

          {data.achievements?.filter(Boolean).length > 0 && (
            <div>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 10px", fontWeight: 600 }}>Achievements</h3>
              {data.achievements.filter(Boolean).map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: accent, fontSize: 16 }}>★</span>
                  <span style={{ fontSize: 13 }}>{a}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ background: sidebar, padding: "28px 24px", borderLeft: `1px solid ${dark ? "#2d3748" : "#e2e8f0"}` }}>
          {data.skills?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 10px", fontWeight: 600 }}>Skills</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {data.skills.map((s, i) => (
                  <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: accentLight, color: accent, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {data.location && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 8px", fontWeight: 600 }}>Location</h3>
              <p style={{ fontSize: 13, margin: 0, color: fg }}>📍 {data.location}</p>
            </div>
          )}

          <div>
            <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 10px", fontWeight: 600 }}>Connect</h3>
            {data.twitter && <p style={{ fontSize: 13, margin: "0 0 6px" }}>𝕏 @{data.twitter}</p>}
            {data.linkedin && <p style={{ fontSize: 13, margin: "0 0 6px" }}>in {data.linkedin}</p>}
            {data.github && <p style={{ fontSize: 13, margin: "0 0 6px" }}>⌥ {data.github}</p>}
            {data.website && <p style={{ fontSize: 13, margin: 0 }}>🌐 {data.website}</p>}
          </div>

          {data.tools?.filter(Boolean).length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: "0 0 10px", fontWeight: 600 }}>Favorite Tools</h3>
              {data.tools.filter(Boolean).map((t, i) => (
                <p key={i} style={{ fontSize: 13, margin: "0 0 4px", color: muted }}>⚙ {t}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreativeTemplate({ data, dark, colors = {} }) {
  const bg = colors.bg || (dark ? "#09090b" : "#fef3c7");
  const card = dark ? "#18181b" : "#ffffff";
  const fg = dark ? "#fafafa" : "#18181b";
  const muted = dark ? "#71717a" : "#78716c";
  const accent1 = colors.accent1 || "#f97316";
  const accent2 = colors.accent2 || "#8b5cf6";
  const accent3 = colors.accent3 || "#06b6d4";

  return (
    <div style={{ background: bg, minHeight: "100%", fontFamily: "'Verdana', sans-serif", padding: "32px 24px", boxSizing: "border-box" }}>
      {/* Hero block */}
      <div style={{ background: `linear-gradient(135deg, ${accent1}, ${accent2})`, borderRadius: 24, padding: "36px 32px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 150, height: 150, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -30, left: "20%", width: 100, height: 100, background: "rgba(0,0,0,0.1)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {data.photo ? (
            <img src={data.photo} alt="profile" style={{ width: 80, height: 80, borderRadius: 16, objectFit: "cover", marginBottom: 16, border: "3px solid rgba(255,255,255,0.4)" }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: 16, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 32, color: "#fff" }}>{data.name?.[0] || "?"}</span>
            </div>
          )}
          <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{data.name || "Your Name"}</h1>
          <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600 }}>{data.headline}</p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{[data.handle, data.location].filter(Boolean).join(" · ")}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Bio */}
        <div style={{ background: card, borderRadius: 16, padding: 20, gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent1 }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: accent1 }}>About Me</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: fg, margin: 0 }}>{data.bio || "Your bio goes here."}</p>
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div style={{ background: card, borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent2 }} />
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: accent2 }}>Skills</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.skills.map((s, i) => (
                <span key={i} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 8, background: `${accent2}22`, color: accent2, fontWeight: 600, border: `1px solid ${accent2}44` }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Connect */}
        <div style={{ background: card, borderRadius: 16, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent3 }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: accent3 }}>Connect</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.twitter && <span style={{ fontSize: 13, color: fg }}>𝕏 @{data.twitter}</span>}
            {data.linkedin && <span style={{ fontSize: 13, color: fg }}>in {data.linkedin}</span>}
            {data.github && <span style={{ fontSize: 13, color: fg }}>⌥ {data.github}</span>}
            {data.website && <span style={{ fontSize: 13, color: fg }}>🌐 {data.website}</span>}
          </div>
        </div>
      </div>

      {data.experience?.filter(e => e.role || e.company).length > 0 && (
        <div style={{ background: card, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent1 }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: accent1 }}>Work Experience</span>
          </div>
          {data.experience.filter(e => e.role || e.company).map((e, i) => (
            <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < data.experience.filter(x => x.role||x.company).length - 1 ? `1px solid ${accent1}22` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: fg }}>{e.role}</span>
                {e.period && <span style={{ fontSize: 10, color: muted, fontWeight: 600, background: `${accent1}18`, padding: "2px 7px", borderRadius: 6 }}>{e.period}</span>}
              </div>
              {e.company && <p style={{ margin: "0 0 4px", fontSize: 12, color: accent1, fontWeight: 700 }}>{e.company}</p>}
              {e.desc && <p style={{ margin: 0, fontSize: 12, color: muted, lineHeight: 1.6 }}>{e.desc}</p>}
            </div>
          ))}
        </div>
      )}

      {data.projects?.filter(p => p.title).length > 0 && (
        <div style={{ background: card, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#f59e0b" }}>Projects</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {data.projects.filter(p => p.title).map((p, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: "#f59e0b11", border: "1px solid #f59e0b33" }}>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 13, color: fg }}>{p.title}</p>
                {p.desc && <p style={{ margin: 0, fontSize: 12, color: muted }}>{p.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Playful Template ─────────────────────────────────────────────────────────
function PlayfulTemplate({ data, dark, colors = {} }) {
  const bg = dark ? "#1a0533" : "#fdf4ff";
  const fg = dark ? "#fce7f3" : "#2d1654";
  const muted = dark ? "#a78bfa" : "#9333ea88";
  const card = dark ? "#2d1065" : "#ffffff";
  const p1 = colors.p1 || "#f0abfc";
  const p2 = colors.p2 || "#818cf8";
  const p3 = colors.p3 || "#34d399";
  const p4 = colors.p4 || "#fbbf24";

  const emojis = ["✨", "🚀", "💡", "🎨", "⚡", "🌟", "🔥", "💎"];

  return (
    <div style={{ background: bg, minHeight: "100%", fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive", padding: "28px 22px", boxSizing: "border-box" }}>
      {/* Fun header */}
      <div style={{ textAlign: "center", marginBottom: 24, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px", pointerEvents: "none" }}>
          {["✨", "⭐", "💫", "✨"].map((e, i) => <span key={i} style={{ fontSize: 20, opacity: 0.6 }}>{e}</span>)}
        </div>
        {data.photo ? (
          <img src={data.photo} alt="profile" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: `4px solid ${p1}`, marginBottom: 12, display: "inline-block" }} />
        ) : (
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${p1}, ${p2})`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12, border: `4px solid ${p1}44` }}>
            <span style={{ fontSize: 36 }}>{emojis[Math.abs((data.name || "A").charCodeAt(0)) % emojis.length]}</span>
          </div>
        )}
        <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, background: `linear-gradient(90deg, ${p1}, ${p2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>{data.name || "Your Name"}</h1>
        {data.handle && <p style={{ margin: "0 0 4px", fontSize: 13, color: p2, fontWeight: 700 }}>{data.handle}</p>}
        <div style={{ display: "inline-block", background: `linear-gradient(90deg, ${p1}33, ${p2}33)`, border: `2px solid ${p1}66`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: fg, marginTop: 4 }}>
          {data.headline || "Your cool title ✨"}
        </div>
        {data.location && <p style={{ margin: "8px 0 0", fontSize: 12, color: muted }}>📍 {data.location}</p>}
      </div>

      {/* Bio bubble */}
      {data.bio && (
        <div style={{ background: card, borderRadius: 20, padding: "18px 20px", marginBottom: 14, border: `2px solid ${p1}44`, position: "relative" }}>
          <div style={{ position: "absolute", top: -12, left: 20, background: p1, color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 10, letterSpacing: "0.1em" }}>ABOUT ME 💬</div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: fg, margin: "6px 0 0" }}>{data.bio}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div style={{ background: card, borderRadius: 20, padding: "18px 20px", marginBottom: 14, border: `2px solid ${p3}44` }}>
          <div style={{ position: "relative" }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 800, color: p3, textTransform: "uppercase", letterSpacing: "0.1em" }}>MY SUPERPOWERS ⚡</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.skills.map((s, i) => {
                const skillColors = [p1, p2, p3, p4];
                const c = skillColors[i % skillColors.length];
                return (
                  <span key={i} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 12, background: `${c}22`, color: c, fontWeight: 700, border: `2px solid ${c}55`, transform: `rotate(${(i % 3 - 1) * 1.5}deg)`, display: "inline-block" }}>{s}</span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.filter(p => p.title).length > 0 && (
        <div style={{ background: card, borderRadius: 20, padding: "18px 20px", marginBottom: 14, border: `2px solid ${p4}44` }}>
          <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 800, color: p4, textTransform: "uppercase", letterSpacing: "0.1em" }}>COOL STUFF I BUILT 🚀</p>
          {data.projects.filter(p => p.title).map((p, i) => (
            <div key={i} style={{ marginBottom: 8, padding: "8px 12px", background: `${p4}11`, borderRadius: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: fg }}>🛠 {p.title}</span>
              {p.desc && <span style={{ fontSize: 12, color: muted }}> — {p.desc}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience?.filter(e => e.role || e.company).length > 0 && (
        <div style={{ background: card, borderRadius: 20, padding: "18px 20px", marginBottom: 14, border: `2px solid ${p2}44` }}>
          <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 800, color: p2, textTransform: "uppercase", letterSpacing: "0.1em" }}>WHERE I'VE WORKED 💼</p>
          {data.experience.filter(e => e.role || e.company).map((e, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "8px 12px", background: `${p2}11`, borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: fg }}>💼 {e.role}</span>
                {e.period && <span style={{ fontSize: 10, color: p2, fontWeight: 700, background: `${p2}22`, padding: "2px 7px", borderRadius: 8 }}>{e.period}</span>}
              </div>
              {e.company && <p style={{ margin: "2px 0 2px 20px", fontSize: 12, color: p2, fontWeight: 700 }}>@ {e.company}</p>}
              {e.desc && <p style={{ margin: "2px 0 0 20px", fontSize: 11, color: muted }}>{e.desc}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Playful Links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {data.twitter && <a href={`https://twitter.com/${data.twitter}`} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 12, background: `${p2}22`, color: p2, fontWeight: 700, textDecoration: "none", border: `2px solid ${p2}44` }}>𝕏 @{data.twitter}</a>}
        {data.github && <a href={`https://github.com/${data.github}`} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 12, background: `${p1}22`, color: p1, fontWeight: 700, textDecoration: "none", border: `2px solid ${p1}44` }}>⌥ {data.github}</a>}
        {data.website && <a href={`https://${data.website}`} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 12, background: `${p3}22`, color: p3, fontWeight: 700, textDecoration: "none", border: `2px solid ${p3}44` }}>🌐 {data.website}</a>}
      </div>
    </div>
  );
}

// ─── Terminal Template ────────────────────────────────────────────────────────
function TerminalTemplate({ data, dark, colors = {} }) {
  const bg = dark ? "#0d1117" : "#1e1e1e";
  const fg = "#c9d1d9";
  const green = colors.green || "#39d353";
  const cyan = colors.cyan || "#79c0ff";
  const yellow = colors.yellow || "#e3b341";
  const pink = colors.pink || "#f778ba";
  const comment = "#8b949e";

  const Line = ({ prompt = false, children, color = fg, indent = 0 }) => (
    <div style={{ fontFamily: "'Courier New', 'Fira Code', monospace", fontSize: 13, lineHeight: 1.8, color, paddingLeft: indent * 16 }}>
      {prompt && <span style={{ color: green, userSelect: "none" }}>$ </span>}
      {children}
    </div>
  );

  return (
    <div style={{ background: bg, color: fg, minHeight: "100%", padding: 0, boxSizing: "border-box" }}>
      {/* Title bar */}
      <div style={{ background: "#21262d", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #30363d" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 12, fontSize: 12, color: comment, fontFamily: "monospace" }}>
          {data.handle || "profile"}.sh — bash
        </span>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <Line color={comment}>{"# ─────────────────────────────────────"}</Line>
        <Line color={comment}>{`# ProfileForge — ${new Date().toISOString().split("T")[0]}`}</Line>
        <Line color={comment}>{"# ─────────────────────────────────────"}</Line>
        <br />
        <Line prompt color={cyan}>{"whoami"}</Line>
        <div style={{ paddingLeft: 16, marginBottom: 12 }}>
          <Line color={green} indent={0}>{data.name || "Your Name"}</Line>
          {(data.handle || data.location) && <Line color={comment} indent={0}>{[data.handle, data.location].filter(Boolean).join(" · ")}</Line>}
        </div>

        <Line prompt color={cyan}>{"cat headline.txt"}</Line>
        <Line indent={1} color={yellow}>{data.headline || "Your Headline"}</Line>
        <br />

        <Line prompt color={cyan}>{"cat bio.txt"}</Line>
        <div style={{ paddingLeft: 16, marginBottom: 12, borderLeft: "2px solid #30363d" }}>
          <Line color={fg}>{data.bio || "No bio found."}</Line>
        </div>

        {data.skills?.length > 0 && (<>
          <Line prompt color={cyan}>{"cat skills.json"}</Line>
          <div style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Line color={fg}>{"{"}</Line>
            <Line indent={1} color={fg}>
              <span style={{ color: cyan }}>"skills"</span>
              <span style={{ color: fg }}>: [</span>
              <span style={{ color: pink }}>{data.skills.map(s => `"${s}"`).join(", ")}</span>
              <span>]</span>
            </Line>
            <Line color={fg}>{"}"}</Line>
          </div>
        </>)}

        {data.projects?.filter(p => p.title).length > 0 && (<>
          <Line prompt color={cyan}>{"ls -la projects/"}</Line>
          <div style={{ paddingLeft: 16, marginBottom: 12 }}>
            {data.projects.filter(p => p.title).map((p, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <span style={{ color: green, fontFamily: "monospace", fontSize: 13 }}>drwxr-xr-x  </span>
                <span style={{ color: cyan, fontFamily: "monospace", fontSize: 13 }}>{p.title}/</span>
                {p.desc && <span style={{ color: comment, fontFamily: "monospace", fontSize: 12 }}>  # {p.desc}</span>}
              </div>
            ))}
          </div>
        </>)}

        {data.experience?.filter(e => e.role || e.company).length > 0 && (<>
          <Line prompt color={cyan}>{"cat experience.json"}</Line>
          <div style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Line color={fg}>{"["}</Line>
            {data.experience.filter(e => e.role || e.company).map((e, i, arr) => (
              <div key={i} style={{ paddingLeft: 16 }}>
                <Line color={fg}>{"{"}</Line>
                <Line indent={1} color={fg}><span style={{ color: cyan }}>"role"</span>: <span style={{ color: yellow }}>"{e.role}"</span></Line>
                {e.company && <Line indent={1} color={fg}><span style={{ color: cyan }}>"company"</span>: <span style={{ color: pink }}>"{e.company}"</span></Line>}
                {e.period && <Line indent={1} color={fg}><span style={{ color: cyan }}>"period"</span>: <span style={{ color: green }}>"{e.period}"</span></Line>}
                {e.desc && <Line indent={1} color={fg}><span style={{ color: cyan }}>"desc"</span>: <span style={{ color: fg + "99" }}>"{e.desc}"</span></Line>}
                <Line color={fg}>{i < arr.length - 1 ? "}," : "}"}</Line>
              </div>
            ))}
            <Line color={fg}>{"]"}</Line>
          </div>
        </>)}

        {data.achievements?.filter(Boolean).length > 0 && (<>
          <Line prompt color={cyan}>{"cat achievements.log"}</Line>
          <div style={{ paddingLeft: 16, marginBottom: 12 }}>
            {data.achievements.filter(Boolean).map((a, i) => (
              <Line key={i} color={yellow}>{`[SUCCESS] ${a}`}</Line>
            ))}
          </div>
        </>)}

        <Line prompt color={cyan}>{"cat links.env"}</Line>
        <div style={{ paddingLeft: 16, marginBottom: 20 }}>
          {data.twitter && <Line color={fg}><span style={{ color: pink }}>TWITTER</span>="{data.twitter}"</Line>}
          {data.github && <Line color={fg}><span style={{ color: pink }}>GITHUB</span>="{data.github}"</Line>}
          {data.linkedin && <Line color={fg}><span style={{ color: pink }}>LINKEDIN</span>="{data.linkedin}"</Line>}
          {data.website && <Line color={fg}><span style={{ color: pink }}>WEBSITE</span>="{data.website}"</Line>}
        </div>

        <Line color={green}>{"█"}</Line>
      </div>
    </div>
  );
}

// ─── Magazine Template ────────────────────────────────────────────────────────
function MagazineTemplate({ data, dark, colors = {} }) {
  const bg = colors.bg || (dark ? "#141010" : "#f5f0eb");
  const fg = colors.fg || (dark ? "#f0ebe5" : "#1a1208");
  const muted = dark ? "#8a7a6a" : "#9a8a7a";
  const accent = colors.accent || (dark ? "#e8c870" : "#c4520a");
  const rule = dark ? "#2a2420" : "#d5cdc5";

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", minHeight: "100%", boxSizing: "border-box" }}>
      {/* Masthead */}
      <div style={{ borderBottom: `3px solid ${fg}`, padding: "14px 36px 10px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: muted, fontFamily: "sans-serif" }}>PROFILE</span>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, fontFamily: "sans-serif" }}>{data.location || "The Internet"}</span>
      </div>

      {/* Hero */}
      <div style={{ padding: "36px 36px 0", display: "grid", gridTemplateColumns: "1fr 160px", gap: 28, alignItems: "start" }}>
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: accent, fontFamily: "sans-serif", fontWeight: 600 }}>{data.headline || "Headline"}</p>
          <h1 style={{ margin: "0 0 14px", fontSize: 48, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em", fontStyle: "italic" }}>{data.name || "Your Name"}</h1>
          {data.handle && <p style={{ margin: 0, fontSize: 13, color: muted, fontFamily: "sans-serif" }}>{data.handle}</p>}
        </div>
        {data.photo ? (
          <img src={data.photo} alt="profile" style={{ width: 140, height: 180, objectFit: "cover", filter: "grayscale(20%)" }} />
        ) : (
          <div style={{ width: 140, height: 180, background: dark ? "#2a2420" : "#e0d8d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 40, opacity: 0.4 }}>{data.name?.[0] || "?"}</span>
          </div>
        )}
      </div>

      {/* Double rule */}
      <div style={{ margin: "20px 36px 0", borderTop: `1px solid ${fg}`, paddingTop: 4, borderBottom: `3px solid ${fg}`, paddingBottom: 4 }} />

      {/* Body columns */}
      <div style={{ padding: "24px 36px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
        {/* Col 1 — Bio */}
        <div style={{ gridColumn: "1 / 3" }}>
          <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.8, color: fg, textAlign: "justify" }}>
            <span style={{ fontSize: 42, fontWeight: 900, float: "left", lineHeight: 0.85, marginRight: 6, color: accent, fontStyle: "italic" }}>{(data.bio || "Y")[0]}</span>
            {data.bio || "Your bio goes here."}
          </p>
          {data.experience?.filter(e => e.role || e.company).length > 0 && (
            <div style={{ marginTop: 20, borderTop: `1px solid ${rule}`, paddingTop: 16, marginBottom: 20 }}>
              <p style={{ margin: "0 0 14px", fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: accent }}>Work Experience</p>
              {data.experience.filter(e => e.role || e.company).map((e, i) => (
                <div key={i} style={{ marginBottom: 12, display: "grid", gridTemplateColumns: "1fr auto", gap: "0 12px", alignItems: "baseline" }}>
                  <div>
                    <p style={{ margin: "0 0 1px", fontSize: 13, fontWeight: 700 }}>{e.role}</p>
                    {e.company && <p style={{ margin: "0 0 2px", fontSize: 11, color: accent, fontFamily: "sans-serif", fontStyle: "italic" }}>{e.company}</p>}
                    {e.desc && <p style={{ margin: 0, fontSize: 11, color: muted, fontFamily: "sans-serif", lineHeight: 1.5 }}>{e.desc}</p>}
                  </div>
                  {e.period && <span style={{ fontSize: 10, color: muted, fontFamily: "sans-serif", whiteSpace: "nowrap" }}>{e.period}</span>}
                </div>
              ))}
            </div>
          )}
          {data.projects?.filter(p => p.title).length > 0 && (
            <div style={{ marginTop: 20, borderTop: `1px solid ${rule}`, paddingTop: 16 }}>
              <p style={{ margin: "0 0 12px", fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: accent }}>Selected Works</p>
              {data.projects.filter(p => p.title).map((p, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontStyle: "italic", fontWeight: 700 }}>{p.title}</p>
                  {p.desc && <p style={{ margin: 0, fontSize: 12, color: muted, fontFamily: "sans-serif", lineHeight: 1.5 }}>{p.desc}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Col 3 — Sidebar */}
        <div style={{ borderLeft: `1px solid ${rule}`, paddingLeft: 20 }}>
          {data.skills?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 10px", fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: accent }}>Expertise</p>
              {data.skills.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: accent, fontSize: 10 }}>◆</span>
                  <span style={{ fontSize: 13 }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {data.achievements?.filter(Boolean).length > 0 && (
            <div style={{ marginBottom: 20, borderTop: `1px solid ${rule}`, paddingTop: 16 }}>
              <p style={{ margin: "0 0 10px", fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: accent }}>Recognition</p>
              {data.achievements.filter(Boolean).map((a, i) => (
                <p key={i} style={{ margin: "0 0 8px", fontSize: 12, lineHeight: 1.5, fontStyle: "italic" }}>"{a}"</p>
              ))}
            </div>
          )}

          <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 16 }}>
            <p style={{ margin: "0 0 8px", fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: accent }}>Contact</p>
            {data.twitter && <p style={{ margin: "0 0 4px", fontSize: 12, fontFamily: "sans-serif" }}>𝕏 {data.twitter}</p>}
            {data.github && <p style={{ margin: "0 0 4px", fontSize: 12, fontFamily: "sans-serif" }}>⌥ {data.github}</p>}
            {data.website && <p style={{ margin: 0, fontSize: 12, fontFamily: "sans-serif" }}>⬡ {data.website}</p>}
          </div>
        </div>
      </div>

      {/* Footer rule */}
      <div style={{ margin: "0 36px", borderTop: `3px solid ${fg}`, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", color: muted, fontFamily: "sans-serif", textTransform: "uppercase" }}>ProfileForge</span>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", color: muted, fontFamily: "sans-serif", textTransform: "uppercase" }}>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

// ─── Neon / Cyberpunk Template ────────────────────────────────────────────────
function NeonTemplate({ data, dark, colors = {} }) {
  const bg = "#070b14";
  const fg = "#e0e8ff";
  const neonBlue = colors.neonBlue || "#00f0ff";
  const neonPink = colors.neonPink || "#ff2d78";
  const neonGreen = colors.neonGreen || "#39ff82";
  const neonYellow = colors.neonYellow || "#ffe135";
  const dimBlue = "#0a1628";
  const borderGlow = `1px solid ${neonBlue}66`;

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'Courier New', monospace", minHeight: "100%", padding: "28px 24px", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
      {/* Grid background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${neonBlue}08 1px, transparent 1px), linear-gradient(90deg, ${neonBlue}08 1px, transparent 1px)`, backgroundSize: "30px 30px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${neonBlue}44` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
            {data.photo ? (
              <img src={data.photo} alt="" style={{ width: 80, height: 80, objectFit: "cover", border: `2px solid ${neonBlue}`, boxShadow: `0 0 20px ${neonBlue}66`, flexShrink: 0 }} />
            ) : (
              <div style={{ width: 80, height: 80, border: `2px solid ${neonBlue}`, boxShadow: `0 0 20px ${neonBlue}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: dimBlue }}>
                <span style={{ fontSize: 30, color: neonBlue, textShadow: `0 0 10px ${neonBlue}` }}>{data.name?.[0] || "?"}</span>
              </div>
            )}
            <div>
              <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: neonBlue, textShadow: `0 0 15px ${neonBlue}88`, letterSpacing: "0.05em", textTransform: "uppercase" }}>{data.name || "YOUR NAME"}</h1>
              {data.handle && <p style={{ margin: "0 0 6px", color: neonPink, textShadow: `0 0 8px ${neonPink}66`, fontSize: 13 }}>{data.handle}</p>}
              <div style={{ display: "inline-block", border: `1px solid ${neonPink}77`, padding: "4px 12px", fontSize: 11, color: neonPink, textShadow: `0 0 6px ${neonPink}66`, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {data.headline || "YOUR ROLE"}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {data.bio && (
          <div style={{ marginBottom: 20, padding: "14px 16px", border: borderGlow, background: `${neonBlue}08`, boxShadow: `inset 0 0 20px ${neonBlue}08` }}>
            <p style={{ margin: "0 0 6px", fontSize: 10, color: neonGreen, textShadow: `0 0 6px ${neonGreen}`, letterSpacing: "0.2em", textTransform: "uppercase" }}>// ABOUT</p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: fg, margin: 0 }}>{data.bio}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 10px", fontSize: 10, color: neonGreen, textShadow: `0 0 6px ${neonGreen}`, letterSpacing: "0.2em", textTransform: "uppercase" }}>// SKILLS</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.skills.map((s, i) => {
                const neonColors = [neonBlue, neonPink, neonGreen, neonYellow];
                const c = neonColors[i % neonColors.length];
                return (
                  <span key={i} style={{ fontSize: 11, padding: "4px 12px", border: `1px solid ${c}66`, color: c, textShadow: `0 0 6px ${c}88`, letterSpacing: "0.05em", background: `${c}0a` }}>{s.toUpperCase()}</span>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects?.filter(p => p.title).length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 10px", fontSize: 10, color: neonGreen, textShadow: `0 0 6px ${neonGreen}`, letterSpacing: "0.2em", textTransform: "uppercase" }}>// PROJECTS</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {data.projects.filter(p => p.title).map((p, i) => (
                <div key={i} style={{ padding: "10px 12px", border: `1px solid ${neonPink}44`, background: `${neonPink}06` }}>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: neonPink, textShadow: `0 0 6px ${neonPink}66`, fontWeight: 700 }}>{p.title}</p>
                  {p.desc && <p style={{ margin: 0, fontSize: 11, color: `${fg}99` }}>{p.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience?.filter(e => e.role || e.company).length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 10px", fontSize: 10, color: neonYellow, textShadow: `0 0 6px ${neonYellow}`, letterSpacing: "0.2em", textTransform: "uppercase" }}>// EXPERIENCE</p>
            {data.experience.filter(e => e.role || e.company).map((e, i) => (
              <div key={i} style={{ marginBottom: 10, padding: "10px 12px", border: `1px solid ${neonYellow}33`, background: `${neonYellow}06`, display: "grid", gridTemplateColumns: "1fr auto", gap: "2px 12px" }}>
                <p style={{ margin: 0, fontSize: 13, color: neonYellow, textShadow: `0 0 6px ${neonYellow}55`, fontWeight: 700, gridColumn: "1" }}>{e.role}</p>
                {e.period && <span style={{ fontSize: 10, color: `${fg}66`, fontFamily: "monospace", gridColumn: "2", gridRow: "1", whiteSpace: "nowrap", textAlign: "right" }}>{e.period}</span>}
                {e.company && <p style={{ margin: "2px 0 2px", fontSize: 11, color: neonBlue, textShadow: `0 0 4px ${neonBlue}66`, gridColumn: "1 / -1" }}>{e.company}</p>}
                {e.desc && <p style={{ margin: 0, fontSize: 11, color: `${fg}77`, gridColumn: "1 / -1", lineHeight: 1.5 }}>{e.desc}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 16, borderTop: `1px solid ${neonBlue}33` }}>
          {data.location && <span style={{ fontSize: 12, color: neonYellow, textShadow: `0 0 6px ${neonYellow}66` }}>📡 {data.location}</span>}
          {data.twitter && <span style={{ fontSize: 12, color: `${fg}77` }}>𝕏 {data.twitter}</span>}
          {data.github && <span style={{ fontSize: 12, color: `${fg}77` }}>⌥ {data.github}</span>}
          {data.website && <span style={{ fontSize: 12, color: `${fg}77` }}>⬡ {data.website}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Retro / 80s Card Template ────────────────────────────────────────────────
function RetroTemplate({ data, dark, colors = {} }) {
  const bg = dark ? "#1a0a2e" : "#ffe8d6";
  const card = dark ? "#2d1b4e" : "#fff8f0";
  const fg = dark ? "#f5e6ff" : "#2d1b00";
  const stripe1 = colors.stripe1 || (dark ? "#ff6b9d" : "#ff6b35");
  const stripe2 = colors.stripe2 || (dark ? "#c77dff" : "#7b2d8b");
  const stripe3 = colors.stripe3 || (dark ? "#48cae4" : "#0096c7");
  const teal = colors.stripe3 || (dark ? "#48cae4" : "#0077b6");

  const stripes = [stripe1, stripe2, stripe3, stripe1, stripe2];

  return (
    <div style={{ background: bg, minHeight: "100%", fontFamily: "'Arial Black', 'Arial Bold', Gadget, sans-serif", padding: "24px 20px", boxSizing: "border-box" }}>
      {/* Stripe bar */}
      <div style={{ display: "flex", height: 8, marginBottom: 20, borderRadius: 2, overflow: "hidden" }}>
        {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Main card */}
      <div style={{ background: card, border: `3px solid ${stripe1}`, borderRadius: 0, padding: "24px 24px 20px", marginBottom: 16, position: "relative", boxShadow: `6px 6px 0 ${stripe2}` }}>
        <div style={{ position: "absolute", top: 0, right: 0, background: stripe1, padding: "4px 12px" }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: "#fff", letterSpacing: "0.2em" }}>PROFILE CARD™</span>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 10 }}>
          {data.photo ? (
            <img src={data.photo} alt="" style={{ width: 80, height: 80, objectFit: "cover", border: `3px solid ${stripe2}`, boxShadow: `4px 4px 0 ${stripe1}`, flexShrink: 0 }} />
          ) : (
            <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${stripe1}, ${stripe2})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `3px solid ${stripe2}`, boxShadow: `4px 4px 0 ${stripe1}` }}>
              <span style={{ fontSize: 28, color: "#fff" }}>{data.name?.[0] || "?"}</span>
            </div>
          )}
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 900, color: stripe2, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.1 }}>{data.name || "YOUR NAME"}</h1>
            {data.handle && <p style={{ margin: "0 0 6px", fontSize: 11, color: stripe1, fontWeight: 900, letterSpacing: "0.15em" }}>{data.handle}</p>}
            <div style={{ background: stripe2, display: "inline-block", padding: "2px 8px" }}>
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>{data.headline || "ROLE"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {data.bio && (
        <div style={{ background: card, border: `3px solid ${teal}`, padding: "14px 16px", marginBottom: 14, boxShadow: `4px 4px 0 ${stripe3}` }}>
          <p style={{ margin: "0 0 6px", fontSize: 9, fontWeight: 900, color: teal, letterSpacing: "0.25em", textTransform: "uppercase" }}>▶ BIO FILE</p>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: fg }}>{data.bio}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div style={{ background: card, border: `3px solid ${stripe2}`, padding: "14px 16px", marginBottom: 14, boxShadow: `4px 4px 0 ${stripe1}` }}>
          <p style={{ margin: "0 0 8px", fontSize: 9, fontWeight: 900, color: stripe2, letterSpacing: "0.25em", textTransform: "uppercase" }}>▶ SKILL MATRIX</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.skills.map((s, i) => {
              const cs = [stripe1, stripe2, stripe3];
              const c = cs[i % cs.length];
              return <span key={i} style={{ fontSize: 10, padding: "3px 9px", background: c, color: "#fff", fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s}</span>;
            })}
          </div>
        </div>
      )}

      {/* Projects + Achievements */}
      {data.projects?.filter(p => p.title).length > 0 && (
        <div style={{ background: card, border: `3px solid ${stripe1}`, padding: "14px 16px", marginBottom: 14, boxShadow: `4px 4px 0 ${teal}` }}>
          <p style={{ margin: "0 0 8px", fontSize: 9, fontWeight: 900, color: stripe1, letterSpacing: "0.25em", textTransform: "uppercase" }}>▶ PROJECTS</p>
          {data.projects.filter(p => p.title).map((p, i) => (
            <div key={i} style={{ marginBottom: 6, display: "flex", gap: 8 }}>
              <span style={{ color: stripe1, fontWeight: 900, fontSize: 12 }}>★</span>
              <div>
                <span style={{ fontSize: 12, fontWeight: 900, color: fg, textTransform: "uppercase" }}>{p.title}</span>
                {p.desc && <span style={{ fontSize: 11, color: fg + "99" }}> — {p.desc}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience?.filter(e => e.role || e.company).length > 0 && (
        <div style={{ background: card, border: `3px solid ${stripe2}`, padding: "14px 16px", marginBottom: 14, boxShadow: `4px 4px 0 ${stripe1}` }}>
          <p style={{ margin: "0 0 10px", fontSize: 9, fontWeight: 900, color: stripe2, letterSpacing: "0.25em", textTransform: "uppercase" }}>▶ WORK HISTORY</p>
          {data.experience.filter(e => e.role || e.company).map((e, i) => (
            <div key={i} style={{ marginBottom: 10, borderBottom: i < data.experience.filter(x => x.role||x.company).length - 1 ? `2px dashed ${stripe2}44` : "none", paddingBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: fg, textTransform: "uppercase" }}>▸ {e.role}</span>
                {e.period && <span style={{ fontSize: 9, background: stripe2, color: "#fff", fontWeight: 900, padding: "2px 6px", letterSpacing: "0.1em" }}>{e.period}</span>}
              </div>
              {e.company && <p style={{ margin: "2px 0 2px", fontSize: 10, color: stripe1, fontWeight: 900, letterSpacing: "0.05em" }}>@ {e.company.toUpperCase()}</p>}
              {e.desc && <p style={{ margin: 0, fontSize: 10, color: fg + "88", lineHeight: 1.5 }}>{e.desc}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Footer links */}
      <div style={{ display: "flex", height: 8, marginBottom: 10, borderRadius: 2, overflow: "hidden" }}>
        {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {data.location && <span style={{ fontSize: 10, color: fg + "99", fontWeight: 700 }}>📍 {data.location}</span>}
        {data.twitter && <span style={{ fontSize: 10, color: stripe1, fontWeight: 900 }}>𝕏 {data.twitter}</span>}
        {data.github && <span style={{ fontSize: 10, color: stripe2, fontWeight: 900 }}>⌥ {data.github}</span>}
        {data.website && <span style={{ fontSize: 10, color: teal, fontWeight: 900 }}>⬡ {data.website}</span>}
      </div>
    </div>
  );
}

const TemplateMap = { minimal: MinimalTemplate, professional: ProfessionalTemplate, creative: CreativeTemplate, playful: PlayfulTemplate, terminal: TerminalTemplate, magazine: MagazineTemplate, neon: NeonTemplate, retro: RetroTemplate };

// ─── Form Field Components ────────────────────────────────────────────────────
function Field({ label, icon, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
        {icon && <Icon d={Icons[icon]} size={13} />}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = (dark) => ({
  width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
  background: dark ? "#1e293b" : "#f8fafc", color: dark ? "#f1f5f9" : "#1e293b",
  fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  transition: "border-color 0.2s",
});

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function ProfileForge() {
  const [step, setStep] = useState(1);
  const [dark, setDark] = useState(false);
  const [template, setTemplate] = useState("minimal");
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [apiKey, setApiKey] = useState("");

  const previewRef = useRef(null);
  const exportReady = useExportLibs();

  // Per-template color overrides: { minimal: { accent: "#..." }, ... }
  const [colorOverrides, setColorOverrides] = useState({});

  const getColors = (tmplId) => ({
    ...getDefaultColors(tmplId),
    ...(colorOverrides[tmplId] || {}),
  });

  const setColor = (tmplId, key, val) => {
    setColorOverrides(prev => ({
      ...prev,
      [tmplId]: { ...(prev[tmplId] || {}), [key]: val },
    }));
  };

  const resetColors = (tmplId) => {
    setColorOverrides(prev => { const n = { ...prev }; delete n[tmplId]; return n; });
  };

  const [form, setForm] = useState({
    name: "", handle: "", headline: "", bio: "", skills: [], skillInput: "",
    location: "", photo: null,
    twitter: "", linkedin: "", github: "", website: "",
    experience: [{ role: "", company: "", period: "", desc: "" }],
    projects: [{ title: "", desc: "" }],
    achievements: [""],
    tools: [""],
  });

  const bg = dark ? "#0a0f1e" : "#f0f4ff";
  const panel = dark ? "#0f172a" : "#ffffff";
  const border = dark ? "#1e293b" : "#e2e8f0";
  const fg = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#64748b" : "#94a3b8";
  const accent = "#6366f1";

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addSkill = () => {
    const s = form.skillInput.trim();
    if (s && !form.skills.includes(s)) {
      set("skills", [...form.skills, s]);
      set("skillInput", "");
    }
  };

  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [skillSuggestLoading, setSkillSuggestLoading] = useState(false);
  const [skillSuggestError, setSkillSuggestError] = useState("");
  const [aiError, setAiError] = useState("");

  const suggestSkills = async () => {
    if (!form.headline.trim()) return;
    setSkillSuggestLoading(true);
    setSkillSuggestions([]);
    setSkillSuggestError("");
    try {
      const res = await fetch("/api/claude", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `Given the role/headline: "${form.headline}", suggest exactly 10 relevant skills and interests that would appear on a professional profile. Return ONLY a valid JSON array of strings, no explanation, no markdown, no extra text. Example format: ["Skill 1","Skill 2"]`,
          }],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSkillSuggestError(data?.error?.message || `API error ${res.status}`);
      } else {
        const text = data.content?.[0]?.text?.trim() || "[]";
        const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
        if (Array.isArray(parsed)) {
          setSkillSuggestions(parsed.filter(s => !form.skills.includes(s)));
        }
      }
    } catch (err) {
      setSkillSuggestError(err.message || "Network error — please try again.");
    }
    setSkillSuggestLoading(false);
  };

  const addSuggestedSkill = (s) => {
    if (!form.skills.includes(s)) set("skills", [...form.skills, s]);
    setSkillSuggestions(prev => prev.filter(x => x !== s));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => set("photo", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const improveWithAI = async () => {
    if (!form.bio.trim()) return;
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/claude", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Rewrite this personal bio to sound polished, engaging, and professional. Keep it concise (2-3 sentences max). Return ONLY the rewritten bio, no preamble:\n\n"${form.bio}"`
          }]
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data?.error?.message || `API error ${res.status}`);
      } else {
        const text = data.content?.[0]?.text?.trim();
        if (text) set("bio", text);
      }
    } catch (err) {
      setAiError(err.message || "Network error — please try again.");
    }
    setAiLoading(false);
  };

  const copyProfile = () => {
    const text = `${form.name || "Name"}\n${form.handle || ""}\n${form.headline || ""}\n\n${form.bio || ""}\n\nSkills: ${form.skills.join(", ")}\nLocation: ${form.location}\n${form.twitter ? `Twitter: @${form.twitter}` : ""}\n${form.github ? `GitHub: ${form.github}` : ""}\n${form.website ? `Website: ${form.website}` : ""}`.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveProfile = () => {
    const data = { ...form, template, colorOverrides };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${form.name ? form.name.replace(/\s+/g, "-").toLowerCase() : "profile"}-profileforge.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const downloadAs = async (format) => {
    if (!previewRef.current || !exportReady) return;
    setDownloading(format);
    try {
      const canvas = await window.html2canvas(previewRef.current, {
        scale: 2, useCORS: true, backgroundColor: null, logging: false,
      });
      const filename = (form.name || "profile").replace(/\s+/g, "-").toLowerCase();

      if (format === "png") {
        const dataUrl = canvas.toDataURL("image/png");
        const win = window.open();
        if (!win) { alert("Please allow popups for this site to download images."); setDownloading(null); return; }
        win.document.write(`<html><head><title>${filename}.png</title></head><body style="margin:0;background:#111;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:sans-serif">
          <p style="color:#aaa;margin:0 0 12px;font-size:13px">Right-click the image and choose <strong style="color:#fff">Save image as…</strong> to download as PNG</p>
          <img src="${dataUrl}" style="max-width:100%;border-radius:8px;box-shadow:0 4px 32px #0008" />
        </body></html>`);
      } else if (format === "jpeg") {
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        const win = window.open();
        if (!win) { alert("Please allow popups for this site to download images."); setDownloading(null); return; }
        win.document.write(`<html><head><title>${filename}.jpg</title></head><body style="margin:0;background:#111;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:sans-serif">
          <p style="color:#aaa;margin:0 0 12px;font-size:13px">Right-click the image and choose <strong style="color:#fff">Save image as…</strong> to download as JPEG</p>
          <img src="${dataUrl}" style="max-width:100%;border-radius:8px;box-shadow:0 4px 32px #0008" />
        </body></html>`);
      } else if (format === "pdf") {
        const { jsPDF } = window.jspdf;
        const imgW = canvas.width;
        const imgH = canvas.height;
        const pxPerMm = 2.8346;
        const pdfW = imgW / (2 * pxPerMm);
        const pdfH = imgH / (2 * pxPerMm);
        const pdf = new jsPDF({ orientation: pdfH > pdfW ? "portrait" : "landscape", unit: "mm", format: [pdfW, pdfH] });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pdfW, pdfH);
        const pdfUrl = pdf.output("bloburl");
        const win = window.open();
        if (!win) { alert("Please allow popups for this site to download the PDF."); setDownloading(null); return; }
        win.document.write(`<html><head><title>${filename}.pdf</title></head><body style="margin:0;background:#111;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:sans-serif">
          <p style="color:#aaa;margin:0 0 12px;font-size:13px">Use your browser's <strong style="color:#fff">Download</strong> button or <strong style="color:#fff">File → Save</strong> to save the PDF</p>
          <iframe src="${pdfUrl}" style="width:100%;height:90vh;border:none;border-radius:8px" />
        </body></html>`);
      }
    } catch (err) {
      console.error("Export failed:", err);
    }
    setDownloading(null);
  };

  const Tmpl = TemplateMap[template];
  const currentColors = getColors(template);
  const progress = step / 3 * 100;

  return (
    <div style={{ minHeight: "100vh", background: bg, color: fg, fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "background 0.3s" }}>
      {/* Top nav */}
      <div style={{ borderBottom: `1px solid ${border}`, background: panel, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14 }}>⬡</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.03em", background: `linear-gradient(90deg, ${accent}, #8b5cf6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ProfileForge</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Step pills */}
          {["Form", "Template", "Preview"].map((s, i) => (
            <button key={i} onClick={() => setStep(i + 1)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${step === i + 1 ? accent : border}`, background: step === i + 1 ? `${accent}22` : "transparent", color: step === i + 1 ? accent : muted, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ opacity: step > i + 1 ? 0.5 : 1 }}>{i + 1}.</span> {s}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: border, margin: "0 4px" }} />
          <button
            onClick={() => setDark(d => !d)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "5px 10px",
              borderRadius: 20, border: `1px solid ${border}`,
              background: dark ? "#1e293b" : "#f1f5f9",
              color: fg, cursor: "pointer", fontSize: 12, fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            <Icon d={dark ? Icons.moon : Icons.sun} size={13} />
            {dark ? "Dark" : "Light"}
            {/* Toggle pill */}
            <div style={{
              width: 32, height: 18, borderRadius: 9, background: dark ? accent : "#cbd5e1",
              position: "relative", transition: "background 0.2s", flexShrink: 0,
            }}>
              <div style={{
                position: "absolute", top: 2, left: dark ? 16 : 2,
                width: 14, height: 14, borderRadius: "50%", background: "#fff",
                transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }} />
            </div>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: border }}>
        <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${accent}, #8b5cf6)`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* STEP 1 — FORM */}
        {step === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Build your profile</h2>
              <p style={{ margin: "0 0 24px", color: muted, fontSize: 13 }}>Fill in your details — you can always come back and edit.</p>

              <div style={{ background: panel, borderRadius: 14, padding: 22, border: `1px solid ${border}` }}>
                <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Basic Info</p>

                <Field label="Full Name" icon="user">
                  <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Alex Rivera" style={inputStyle(dark)} />
                </Field>
                <Field label="Username / Handle">
                  <input value={form.handle} onChange={e => set("handle", e.target.value)} placeholder="@alexrivera" style={inputStyle(dark)} />
                </Field>
                <Field label="Headline / Role">
                  <input value={form.headline} onChange={e => { set("headline", e.target.value); setSkillSuggestions([]); }} placeholder="Product Designer & Creative Technologist" style={inputStyle(dark)} />
                </Field>
                <Field label="Location" icon="mappin">
                  <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="San Francisco, CA" style={inputStyle(dark)} />
                </Field>

                <Field label="Profile Photo">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {form.photo ? (
                      <img src={form.photo} alt="preview" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: `2px solid ${accent}44` }} />
                    ) : (
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: dark ? "#1e293b" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={Icons.user} size={18} className="" style={{ color: muted }} />
                      </div>
                    )}
                    <label style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${border}`, fontSize: 12, cursor: "pointer", color: fg, background: "transparent", fontWeight: 600 }}>
                      Upload photo
                      <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
                    </label>
                  </div>
                </Field>
              </div>

              <div style={{ background: panel, borderRadius: 14, padding: 22, border: `1px solid ${border}`, marginTop: 16 }}>
                <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Bio</p>
                <div style={{ position: "relative" }}>
                  <textarea value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="A short bio about you..." rows={4} style={{ ...inputStyle(dark), resize: "vertical", lineHeight: 1.6 }} />
                  <button onClick={improveWithAI} disabled={aiLoading || !form.bio.trim()} style={{ position: "absolute", bottom: 10, right: 10, padding: "5px 10px", borderRadius: 6, border: "none", background: aiLoading ? `${accent}44` : `${accent}22`, color: accent, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, opacity: !form.bio.trim() ? 0.4 : 1 }}>
                    <Icon d={Icons.wand} size={11} />
                    {aiLoading ? "Rewriting..." : "AI Polish"}
                  </button>
                </div>
                {aiError && <p style={{ margin: "8px 0 0", fontSize: 11, color: "#ef4444" }}>⚠ {aiError}</p>}
              </div>
            </div>

            <div>
              <div style={{ background: panel, borderRadius: 14, padding: 22, border: `1px solid ${border}`, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Skills & Interests</p>
                  <button
                    onClick={suggestSkills}
                    disabled={skillSuggestLoading || !form.headline.trim()}
                    title={!form.headline.trim() ? "Fill in your Headline/Role first" : "Suggest skills based on your role"}
                    style={{ padding: "5px 10px", borderRadius: 8, border: "none", background: skillSuggestLoading ? `${accent}44` : `${accent}22`, color: accent, fontSize: 11, fontWeight: 700, cursor: form.headline.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 5, opacity: !form.headline.trim() ? 0.45 : 1, transition: "all 0.2s", whiteSpace: "nowrap" }}>
                    <Icon d={Icons.wand} size={11} />
                    {skillSuggestLoading ? "Thinking…" : "AI Suggest"}
                  </button>
                </div>
                {skillSuggestError && <p style={{ margin: "0 0 8px", fontSize: 11, color: "#ef4444" }}>⚠ {skillSuggestError}</p>}
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <input value={form.skillInput} onChange={e => set("skillInput", e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()} placeholder="Add a skill, press Enter" style={{ ...inputStyle(dark), flex: 1 }} />
                  <button onClick={addSkill} style={{ padding: "9px 14px", borderRadius: 8, border: "none", background: accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {form.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: `${accent}22`, color: accent, display: "flex", alignItems: "center", gap: 5, border: `1px solid ${accent}44` }}>
                      {s}
                      <button onClick={() => set("skills", form.skills.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: accent, cursor: "pointer", padding: 0, fontSize: 14, lineHeight: 1, display: "flex" }}>×</button>
                    </span>
                  ))}
                </div>

                {skillSuggestions.length > 0 && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}` }}>
                    <p style={{ margin: "0 0 8px", fontSize: 11, color: muted, fontWeight: 600 }}>
                      ✨ Suggested for <em>{form.headline}</em> — click to add:
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {skillSuggestions.map((s) => (
                        <button key={s} onClick={() => addSuggestedSkill(s)} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: "transparent", color: muted, border: `1px dashed ${muted}66`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = `${muted}66`; }}>
                          + {s}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => {
                          const toAdd = skillSuggestions.filter(s => !form.skills.includes(s));
                          set("skills", [...form.skills, ...toAdd]);
                          setSkillSuggestions([]);
                        }} style={{ marginTop: 8, fontSize: 11, color: accent, background: "none", border: "none", cursor: "pointer", fontWeight: 700, padding: 0 }}>
                      + Add all suggestions
                    </button>
                  </div>
                )}
              </div>

              <div style={{ background: panel, borderRadius: 14, padding: 22, border: `1px solid ${border}`, marginBottom: 16 }}>
                <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Social Links</p>
                <Field label="Twitter / X"><input value={form.twitter} onChange={e => set("twitter", e.target.value)} placeholder="username (no @)" style={inputStyle(dark)} /></Field>
                <Field label="LinkedIn"><input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="linkedin.com/in/..." style={inputStyle(dark)} /></Field>
                <Field label="GitHub"><input value={form.github} onChange={e => set("github", e.target.value)} placeholder="username" style={inputStyle(dark)} /></Field>
                <Field label="Website" icon="globe"><input value={form.website} onChange={e => set("website", e.target.value)} placeholder="yoursite.com" style={inputStyle(dark)} /></Field>
              </div>

              <div style={{ background: panel, borderRadius: 14, padding: 22, border: `1px solid ${border}` }}>
                <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Optional Sections</p>

                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, color: muted }}>Work Experience</p>
                {form.experience.map((e, i) => (
                  <div key={i} style={{ marginBottom: 12, padding: "14px", borderRadius: 10, border: `1px solid ${border}`, background: dark ? "#0a0f1e" : "#f8fafc", position: "relative" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                      <input value={e.role} onChange={ev => { const ne = [...form.experience]; ne[i].role = ev.target.value; set("experience", ne); }} placeholder="Job title / Role" style={inputStyle(dark)} />
                      <input value={e.company} onChange={ev => { const ne = [...form.experience]; ne[i].company = ev.target.value; set("experience", ne); }} placeholder="Company / Organization" style={inputStyle(dark)} />
                    </div>
                    <input value={e.period} onChange={ev => { const ne = [...form.experience]; ne[i].period = ev.target.value; set("experience", ne); }} placeholder="Period (e.g. 2022 – Present)" style={{ ...inputStyle(dark), marginBottom: 8 }} />
                    <textarea value={e.desc} onChange={ev => { const ne = [...form.experience]; ne[i].desc = ev.target.value; set("experience", ne); }} placeholder="Brief description of your role and impact..." rows={2} style={{ ...inputStyle(dark), resize: "vertical", lineHeight: 1.5 }} />
                    {form.experience.length > 1 && (
                      <button onClick={() => set("experience", form.experience.filter((_, j) => j !== i))} style={{ position: "absolute", top: 10, right: 10, padding: "4px 6px", borderRadius: 5, border: `1px solid ${border}`, background: "transparent", color: "#ef4444", cursor: "pointer" }}>
                        <Icon d={Icons.trash} size={11} />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => set("experience", [...form.experience, { role: "", company: "", period: "", desc: "" }])} style={{ fontSize: 12, color: accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0, marginBottom: 20 }}>+ Add position</button>

                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, color: muted }}>Projects</p>
                {form.projects.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <input value={p.title} onChange={e => { const np = [...form.projects]; np[i].title = e.target.value; set("projects", np); }} placeholder="Project name" style={{ ...inputStyle(dark), marginBottom: 4 }} />
                      <input value={p.desc} onChange={e => { const np = [...form.projects]; np[i].desc = e.target.value; set("projects", np); }} placeholder="Short description" style={inputStyle(dark)} />
                    </div>
                    {form.projects.length > 1 && (
                      <button onClick={() => set("projects", form.projects.filter((_, j) => j !== i))} style={{ padding: "8px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: "#ef4444", cursor: "pointer", marginTop: 2 }}>
                        <Icon d={Icons.trash} size={13} />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => set("projects", [...form.projects, { title: "", desc: "" }])} style={{ fontSize: 12, color: accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0, marginBottom: 16 }}>+ Add project</button>

                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, color: muted }}>Achievements</p>
                {form.achievements.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <input value={a} onChange={e => { const na = [...form.achievements]; na[i] = e.target.value; set("achievements", na); }} placeholder="An achievement you're proud of" style={{ ...inputStyle(dark), flex: 1 }} />
                    {form.achievements.length > 1 && <button onClick={() => set("achievements", form.achievements.filter((_, j) => j !== i))} style={{ padding: "8px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: "#ef4444", cursor: "pointer" }}><Icon d={Icons.trash} size={13} /></button>}
                  </div>
                ))}
                <button onClick={() => set("achievements", [...form.achievements, ""])} style={{ fontSize: 12, color: accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0, marginBottom: 16 }}>+ Add achievement</button>

                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, color: muted }}>Favorite Tools</p>
                {form.tools.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <input value={t} onChange={e => { const nt = [...form.tools]; nt[i] = e.target.value; set("tools", nt); }} placeholder="e.g. Figma, VS Code" style={{ ...inputStyle(dark), flex: 1 }} />
                    {form.tools.length > 1 && <button onClick={() => set("tools", form.tools.filter((_, j) => j !== i))} style={{ padding: "8px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: "#ef4444", cursor: "pointer" }}><Icon d={Icons.trash} size={13} /></button>}
                  </div>
                ))}
                <button onClick={() => set("tools", [...form.tools, ""])} style={{ fontSize: 12, color: accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}>+ Add tool</button>
              </div>

              <button onClick={() => setStep(2)} style={{ width: "100%", marginTop: 20, padding: "13px", borderRadius: 10, border: "none", background: `linear-gradient(90deg, ${accent}, #8b5cf6)`, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em", transition: "opacity 0.2s" }}>
                Choose Template →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — TEMPLATE */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Pick a template</h2>
                <p style={{ margin: 0, color: muted, fontSize: 13 }}>All templates use your same data — just different vibes.</p>
              </div>
              <button onClick={() => setTemplate(TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)].id)} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon d={Icons.shuffle} size={13} />
                Random
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)} style={{ borderRadius: 14, border: `2px solid ${template === t.id ? accent : border}`, background: template === t.id ? `${accent}11` : panel, padding: 0, cursor: "pointer", overflow: "hidden", transition: "all 0.2s", position: "relative", textAlign: "left" }}>
                  {template === t.id && (
                    <div style={{ position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
                      <Icon d={Icons.check} size={12} className="" style={{ color: "#fff" }} />
                    </div>
                  )}
                  <div style={{ height: 140, overflow: "hidden", transform: "scale(0.7)", transformOrigin: "top left", width: "calc(100% / 0.7)", pointerEvents: "none" }}>
                    {(() => { const T = TemplateMap[t.id]; return <T data={SAMPLE} dark={dark} colors={getColors(t.id)} />; })()}
                  </div>
                  <div style={{ padding: "10px 14px", borderTop: `1px solid ${border}` }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: fg }}>{t.icon} {t.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: muted }}>{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Color customizer + Live preview side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, marginBottom: 20, alignItems: "start" }}>
              {/* Color Panel */}
              <div style={{ background: panel, borderRadius: 14, border: `1px solid ${border}`, padding: 18, position: "sticky", top: 72 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>🎨 Colors</p>
                  <button onClick={() => resetColors(template)} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: muted, cursor: "pointer", fontWeight: 600 }}>Reset</button>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 12, color: muted }}>
                  Customizing <strong style={{ color: fg }}>{TEMPLATES.find(t => t.id === template)?.label}</strong>
                </p>

                {(TEMPLATE_COLOR_DEFS[template] || []).map(({ key, label }) => {
                  const currentVal = getColors(template)[key] || "#000000";
                  return (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: fg }}>{label}</label>
                        <span style={{ fontSize: 10, fontFamily: "monospace", color: muted }}>{currentVal}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ position: "relative", width: 36, height: 28, borderRadius: 6, overflow: "hidden", border: `2px solid ${border}`, flexShrink: 0, cursor: "pointer" }}>
                          <div style={{ position: "absolute", inset: 0, background: currentVal }} />
                          <input type="color" value={currentVal} onChange={e => setColor(template, key, e.target.value)}
                            style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%", padding: 0, border: "none" }} />
                        </div>
                        <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {["#ef4444","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899","#000000","#ffffff","#6b7280","#f5f0eb"].map(preset => (
                            <button key={preset} onClick={() => setColor(template, key, preset)}
                              style={{ width: 16, height: 16, borderRadius: 3, background: preset, border: currentVal === preset ? `2px solid ${fg}` : `1px solid ${border}66`, cursor: "pointer", padding: 0, flexShrink: 0 }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
                  <p style={{ margin: "0 0 8px", fontSize: 11, color: muted, fontWeight: 600 }}>QUICK PALETTES</p>
                  {[
                    { name: "Ocean", colors: { accent: "#0ea5e9", accent1: "#0ea5e9", neonBlue: "#0ea5e9", stripe1: "#0ea5e9", p1: "#7dd3fc", green: "#34d399" } },
                    { name: "Rose", colors: { accent: "#e11d48", accent1: "#f43f5e", neonPink: "#ff2d78", stripe1: "#fb7185", p1: "#fda4af", p2: "#f43f5e" } },
                    { name: "Forest", colors: { accent: "#16a34a", accent1: "#22c55e", neonBlue: "#4ade80", stripe1: "#16a34a", p1: "#86efac", green: "#4ade80" } },
                    { name: "Gold", colors: { accent: "#d97706", accent1: "#f59e0b", neonBlue: "#fbbf24", stripe1: "#f59e0b", p1: "#fde68a", p4: "#f59e0b" } },
                    { name: "Violet", colors: { accent: "#7c3aed", accent1: "#8b5cf6", neonBlue: "#a78bfa", stripe1: "#7c3aed", p1: "#ddd6fe", p2: "#8b5cf6" } },
                    { name: "Slate", colors: { accent: "#475569", accent1: "#64748b", neonBlue: "#94a3b8", stripe1: "#475569", p1: "#cbd5e1", green: "#94a3b8" } },
                  ].map(palette => (
                    <button key={palette.name} onClick={() => {
                      const defs = TEMPLATE_COLOR_DEFS[template] || [];
                      defs.forEach(({ key }) => { if (palette.colors[key]) setColor(template, key, palette.colors[key]); });
                    }} style={{ display: "inline-block", marginRight: 6, marginBottom: 6, padding: "4px 10px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                      {palette.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live preview */}
              <div style={{ background: panel, borderRadius: 16, border: `1px solid ${border}`, overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: 8, fontSize: 12, color: muted, fontFamily: "monospace" }}>profileforge.app/preview</span>
                </div>
                <div style={{ maxHeight: 560, overflow: "auto" }}>
                  <Tmpl data={{ ...form }} dark={dark} colors={currentColors} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ padding: "12px 20px", borderRadius: 10, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: `linear-gradient(90deg, ${accent}, #8b5cf6)`, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Generate Profile →</button>
            </div>
          </div>
        )}

        {/* STEP 3 — PREVIEW & EXPORT */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Your profile is ready ✨</h2>
                <p style={{ margin: 0, color: muted, fontSize: 13 }}>Export, copy, or share your polished profile.</p>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTemplate(t.id)} style={{ padding: "5px 10px", borderRadius: 8, border: `1px solid ${template === t.id ? accent : border}`, background: template === t.id ? `${accent}22` : "transparent", color: template === t.id ? accent : fg, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "start" }}>
              {/* Profile display */}
              <div style={{ background: panel, borderRadius: 16, border: `1px solid ${border}`, overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: 8, fontSize: 12, color: muted, fontFamily: "monospace" }}>
                    profileforge.app/{form.handle?.replace("@", "") || "profile"}
                  </span>
                </div>
                <div ref={previewRef}>
                  <Tmpl data={{ ...form }} dark={dark} colors={currentColors} />
                </div>
              </div>

              {/* Actions sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: panel, borderRadius: 14, border: `1px solid ${border}`, padding: 16 }}>
                  <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Export</p>

                  <button onClick={copyProfile} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`, background: copied ? "#22c55e22" : "transparent", color: copied ? "#22c55e" : fg, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 8, transition: "all 0.2s" }}>
                    <Icon d={copied ? Icons.check : Icons.copy} size={14} />
                    {copied ? "Copied!" : "Copy Profile Text"}
                  </button>

                  <p style={{ margin: "10px 0 8px", fontSize: 11, fontWeight: 600, color: muted }}>Download Image</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                    {[
                      { fmt: "png",  label: "PNG",  icon: "🖼" },
                      { fmt: "jpeg", label: "JPEG", icon: "📷" },
                      { fmt: "pdf",  label: "PDF",  icon: "📄" },
                    ].map(({ fmt, label, icon }) => {
                      const isLoading = downloading === fmt;
                      return (
                        <button
                          key={fmt}
                          onClick={() => downloadAs(fmt)}
                          disabled={!exportReady || !!downloading}
                          style={{
                            padding: "9px 6px", borderRadius: 8,
                            border: `1px solid ${isLoading ? accent : border}`,
                            background: isLoading ? `${accent}22` : "transparent",
                            color: isLoading ? accent : fg,
                            fontSize: 12, fontWeight: 700, cursor: exportReady && !downloading ? "pointer" : "not-allowed",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                            opacity: !exportReady ? 0.5 : 1,
                            transition: "all 0.2s",
                          }}
                        >
                          <span style={{ fontSize: 16 }}>{isLoading ? "⏳" : icon}</span>
                          <span>{isLoading ? "..." : label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {!exportReady && (
                    <p style={{ margin: "4px 0 8px", fontSize: 11, color: muted, textAlign: "center" }}>Loading export tools…</p>
                  )}

                  <button onClick={() => { const el = previewRef.current; if (el) { const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${form.name || "Profile"}</title></head><body style="margin:0">${el.innerHTML}</body></html>`; const blob = new Blob([html], {type: "text/html"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${form.name || "profile"}.html`; a.click(); }}} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Icon d={Icons.download} size={14} />
                    Download HTML
                  </button>

                  <button onClick={saveProfile} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "none", background: saved ? "#22c55e" : `linear-gradient(90deg, ${accent}, #8b5cf6)`, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                    <Icon d={saved ? Icons.check : Icons.share} size={14} />
                    {saved ? "Saved!" : "Save Profile"}
                  </button>
                </div>

                <div style={{ background: panel, borderRadius: 14, border: `1px solid ${border}`, padding: 16 }}>
                  <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>Quick Edit</p>
                  <button onClick={() => setStep(1)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Icon d={Icons.edit} size={14} />
                    Edit Content
                  </button>
                  <button onClick={() => setStep(2)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Icon d={Icons.eye} size={14} />
                    Change Template
                  </button>
                  <button onClick={() => setStep(2)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`, background: `${accent}11`, color: accent, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14 }}>🎨</span>
                    Edit Colors
                  </button>
                </div>

                <div style={{ background: panel, borderRadius: 14, border: `1px solid ${border}`, padding: 16 }}>
                  <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em" }}>AI Tools</p>
                  <button onClick={improveWithAI} disabled={aiLoading || !form.bio.trim()} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "none", background: `${accent}22`, color: accent, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, opacity: !form.bio.trim() ? 0.4 : 1 }}>
                    <Icon d={Icons.wand} size={14} />
                    {aiLoading ? "Rewriting bio..." : "AI Polish Bio"}
                  </button>
                </div>

                <div style={{ background: panel, borderRadius: 14, border: `1px solid ${border}`, padding: 16 }}>
                  <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Summary</p>
                  <div style={{ fontSize: 12, color: muted, lineHeight: 1.8 }}>
                    <p style={{ margin: 0 }}>Template: <span style={{ color: fg, fontWeight: 600 }}>{TEMPLATES.find(t => t.id === template)?.label}</span></p>
                    <p style={{ margin: 0 }}>Skills: <span style={{ color: fg, fontWeight: 600 }}>{form.skills.length}</span></p>
                    <p style={{ margin: 0 }}>Projects: <span style={{ color: fg, fontWeight: 600 }}>{form.projects.filter(p => p.title).length}</span></p>
                    <p style={{ margin: 0 }}>Mode: <span style={{ color: fg, fontWeight: 600 }}>{dark ? "Dark" : "Light"}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* styles */}
      <style>{`
        * { box-sizing: border-box; }
        input:focus, textarea:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px #6366f122; }
        button:hover { opacity: 0.88; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
