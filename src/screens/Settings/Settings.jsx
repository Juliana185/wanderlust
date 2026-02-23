import { useState } from "react";
import "./Settings.css";
import shieldIcon from "./assets/Union.svg";

export default function Settings({
  onBack,
  goToChangePassword,
  goToSignOut,
  goToDelete,
  goToLanguage
}) {
  const [notificationOn, setNotificationOn] = useState(true);

  return (
    <div className="settings-screen">
      {/* header */}
      <div className="settings-header">
        <button className="settings-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
        <h1 className="settings-title">Settings</h1>
      </div>

      {/* ACCOUNT */}
      <Section title="Account">
        <SettingsItem
          label="Change password"
          onClick={goToChangePassword}
        />
        <SettingsItem
          label="Sign out"
          onClick={goToSignOut}
        />
        <button
          className="settings-danger"
          onClick={goToDelete}
        >
          Delete account
        </button>
      </Section>

      {/* PREFERENCES */}
      <Section title="Preferences">
        <SettingsItem
          label="Language"
          onClick={goToLanguage}
        />

        {/* 🔔 Notification toggle */}
        <div className="settings-item settings-toggle-row">
          <span>Notification</span>

          <button
            className={`toggle ${notificationOn ? "on" : ""}`}
            onClick={() => setNotificationOn(!notificationOn)}
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      </Section>

      {/* DATA SAFETY */}
      <div className="settings-card">
        <div className="settings-safety">
          <div className="safety-icon">
            <img src={shieldIcon} alt="data safety" />
          </div>
          <div>
            <p className="safety-title">Data safety</p>
            <p className="safety-sub">
              Confirm before deleting
            </p>
            <p className="safety-desc">
              You will always be asked to confirm before deleting data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== helpers ===== */

function Section({ title, children }) {
  return (
    <div className="settings-section">
      <p className="settings-section-title">{title}</p>
      <div className="settings-card">{children}</div>
    </div>
  );
}

function SettingsItem({ label, onClick }) {
  return (
    <div className="settings-item" onClick={onClick}>
      <span>{label}</span>
      <span className="settings-arrow">›</span>
    </div>
  );
}
