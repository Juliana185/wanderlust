import "./ResetPassword.css";

export default function ResetPassword({ onBack }) {
  return (
    <div className="reset-screen">
      {/* header */}
      <div className="reset-header">
        <button className="reset-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
        <h1 className="reset-title">Reset password</h1>
      </div>

      {/* description */}
      <p className="reset-desc">
        Enter your email and we will send you instruction to reset your password
      </p>

      {/* card */}
      <div className="reset-card">
        <input
          className="reset-input"
          type="email"
          placeholder="Enter your email"
        />

        <button className="reset-button">
          Reset password
        </button>
      </div>
    </div>
  );
}
