import "./ChangePassword.css";

export default function ChangePassword({ onBack, onSuccess, onForgot }) {
  return (
    <div className="change-screen">
      {/* header */}
      <div className="change-header">
        <button className="change-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
        <h1 className="change-title">Change password</h1>
      </div>

      {/* form */}
      <div className="change-card">
        <Input label="Current password" />
        <Input label="New password" />
        <Input label="Confirm new password" />
      </div>

      {/* action */}
      <div className="change-card">
        <button className="change-button" onClick={onSuccess}> Update Password</button>
        <button className="forgot-button" onClick={onForgot}>Forgot your password?</button>
      </div>
    </div>
  );
}

function Input({ label }) {
  return (
    <div className="change-input">
      <input type="password" placeholder={label} />
    </div>
  );
}
