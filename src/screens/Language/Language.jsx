import "./Language.css";
import checkIcon from "./assets/checkmark.svg";
import downloadIcon from "./assets/download.svg";

const READY_LANGS = [
  { name: "English (United Kingdom)", active: false },
  { name: "English (United States)", active:  true},
  { name: "Russian (Russia)", active: false },
];

const DOWNLOAD_LANGS = [
  "Arabic (Saudi Arabia)",
  "German (Germany)",
  "English (Australia)",
  "English (Canada)",
  "English (India)",
  "Spanish (Spain)",
  "Spanish (Mexico)",
  "French (France)",
  "Italian (Italy)",
  "Japanese (Japan)",
  "Korean (South Korea)",
];

export default function Language({ onBack }) {
  return (
    <div className="language-screen">
      {/* header */}
      <div className="language-header">
        <button className="language-back" onClick={onBack}>
        <span className="back-arrow">‹</span>
        <span>Back</span>
        </button>
        <h1 className="title">Language</h1>
      </div>

      <Section title="Ready to use">
        {READY_LANGS.map((l, i) => (
          <LanguageItem
            key={i}
            label={l.name}
            active={l.active}
          />
        ))}
      </Section>

      <Section title="Available for download">
        {DOWNLOAD_LANGS.map((l, i) => (
          <LanguageItem
            key={i}
            label={l}
            downloadable
          />
        ))}
      </Section>
    </div>
  );
}

/* helpers */

function Section({ title, children }) {
  return (
    <>
      <p className="language-section-title">{title}</p>
      <div className="language-card">{children}</div>
    </>
  );
}

function LanguageItem({ label, active, downloadable }) {
  return (
    <div className="language-item">
      <span>{label}</span>

      {active && (<img src={checkIcon} alt="selected" className="language-icon"/>)}
      {downloadable && (<img src={downloadIcon} alt="download" className="language-icon"/>)}
    </div>
  );
}
