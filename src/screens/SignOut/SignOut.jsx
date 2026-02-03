import { useState } from "react";
import "./SignOut.css";

export default function SignOut({ onBack, onConfirm }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="signout-screen">
      {/* header */}
      <div className="signout-header">
        <button className="signout-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
        <h1 className="signout-title">Sign out</h1>
      </div>

      {/* card */}
      <div className="signout-card">
        <div className="signout-user">
          <img
            className="signout-avatar"
            src="https://i.pinimg.com/736x/bf/21/94/bf2194c0faa4f94b44ed8e4cdc1389f4.jpg"
            alt=""
          />
          <span className="signout-name">Maria Danis</span>
        </div>

        <button
          className="signout-button"
          onClick={() => setShowConfirm(true)}
        >
          Sign out
        </button>
      </div>

      {/* overlay + modal */}
      {showConfirm && (
        <>
          <div className="signout-overlay" />

          <div className="signout-modal">
            <p className="signout-question">are you sure?</p>

            <div className="signout-actions">
              <button
                className="signout-yes"
                onClick={onConfirm}
              >
                yes
              </button>

              <button
                className="signout-no"
                onClick={() => setShowConfirm(false)}
              >
                no
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
