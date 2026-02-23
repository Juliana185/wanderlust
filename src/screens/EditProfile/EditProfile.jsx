import { useState, useRef, useEffect } from "react";
import "./EditProfile.css";
import { useUserName } from "../../hooks/useUserName";


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
  const [color, setColor] = useState(localStorage.getItem("appBg") || COLORS[1]);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(localStorage.getItem("userName") || "Maria Danis");
  const savedBg = localStorage.getItem("appBg") || "#8faadc";

  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="edit-screen">
      {/* header */}
      <div className="edit-header">
        <button className="edit-back" onClick={() => {document.documentElement.style.setProperty("--app-bg", savedBg);onBack();}}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
      </div>

      {/* avatar */}
      <div className="edit-avatar-block">
        <img
          className="edit-avatar1"
          src={
            avatar ||
            "https://i.pinimg.com/1200x/dc/08/0f/dc080fd21b57b382a1b0de17dac1dfe6.jpg"
          }
          alt="avatar"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />

        <p className="edit-name">{name}</p>

        <button
          type="button"
          className="change-photo-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Change photo
        </button>
      </div>

      {/* card */}
      <div className="edit-card">
        <label className="edit-label">Name</label>

        <div className="edit-input-wrap">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {name && (
            <button className="clear-btn" onClick={() => setName("")}>
              ×
            </button>
          )}
        </div>

        <label className="edit-label">Primary color</label>

        <div className="color-row">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`color-dot ${color === c ? "active" : ""}`}
              style={{ background: c }}
              onClick={() => {
                setColor(c);
                document.documentElement.style.setProperty("--app-bg", c);
              }}
            >
              {color === c && "✓"}
            </button>
          ))}
        </div>

        <button
          className="save-btn"
          onClick={() => {
            localStorage.setItem("appBg", color);
            document.documentElement.style.setProperty("--app-bg", color);
            onBack();
            localStorage.setItem("userName", name);
            onBack();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
