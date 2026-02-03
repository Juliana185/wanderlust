import { useState } from "react";
import "./EditProfile.css";

const COLORS = [
  "#6b8f71",
  "#8faadc",
  "#d87fd9",
  "#f3e57c",
  "#f2a7c1",
  "#e2a355",
  "#f08a5d",
  "#8e7cc3",
];

export default function EditProfile({ onBack }) {
  const [name, setName] = useState("Maria Danis");
  const [color, setColor] = useState(COLORS[1]);

  return (
    <div className="edit-screen">
      {/* header */}
      <div className="edit-header">
        <button className="edit-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
      </div>

      {/* avatar */}
      <div className="edit-avatar-block">
        <img
          className="edit-avatar"
          src="https://i.pinimg.com/736x/bf/21/94/bf2194c0faa4f94b44ed8e4cdc1389f4.jpg"
          alt=""
        />
        <p className="edit-name">{name}</p>
        <button className="edit-photo-btn">Change photo</button>
      </div>

      {/* card */}
      <div className="edit-card">
        <label className="edit-label">Name</label>

        <div className="edit-input-wrap">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {name && (
            <button className="clear-btn" onClick={() => setName("")}>
              ×
            </button>
          )}
        </div>

        <label className="edit-label">Primary color</label>

        <div className="color-row">
          {COLORS.map(c => (
            <button
              key={c}
              className={`color-dot ${color === c ? "active" : ""}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
            >
              {color === c && "✓"}
            </button>
          ))}
        </div>

        <button className="save-btn">Save</button>
      </div>
    </div>
  );
}
