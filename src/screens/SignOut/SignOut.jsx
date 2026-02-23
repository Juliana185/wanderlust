import { useState } from "react";
import "./SignOut.css";
import { useAvatar } from "../../hooks/useAvatar";
import { useUserName } from "../../hooks/useUserName";

export default function SignOut({ onBack, onConfirm }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const avatar = useAvatar();
  const userName = useUserName();

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
            className="home-avatar"
            src={avatar ||"https://i.pinimg.com/1200x/dc/08/0f/dc080fd21b57b382a1b0de17dac1dfe6.jpg"}
            alt="avatar"
          />
          <span className="signout-name">{userName}</span>
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
