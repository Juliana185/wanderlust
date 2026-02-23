import { useState } from "react";
import "./DeleteAccount.css";
import { useAvatar } from "../../hooks/useAvatar";
import { useUserName } from "../../hooks/useUserName";

export default function DeleteAccount({ onBack, onConfirm }) {
  const [showConfirm, setShowConfirm] = useState(false);
    const avatar = useAvatar();
    const userName = useUserName();

  return (
    <div className="delete-screen">
      {/* header */}
      <div className="delete-header">
        <button className="delete-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
        <h1 className="delete-title">Delete account</h1>
      </div>

      {/* card */}
      <div className="delete-card">
        <div className="delete-user">
          <img
            className="home-avatar"
            src={avatar ||"https://i.pinimg.com/1200x/dc/08/0f/dc080fd21b57b382a1b0de17dac1dfe6.jpg"}
            alt="avatar"
          />
          <span className="delete-name">{userName}</span>
        </div>

        <button
          className="delete-button"
          onClick={() => setShowConfirm(true)}
        >
          Delete
        </button>
      </div>

      {/* overlay + modal */}
      {showConfirm && (
        <>
          <div
            className="delete-overlay"
            onClick={() => setShowConfirm(false)}
          />

          <div className="delete-modal">
            <p className="delete-question">are you sure?</p>

            <p className="delete-desc">
              Your account will be deleted with all data,
              and there will be no way to recover it
            </p>

            <div className="delete-actions">
              <button
                className="delete-yes"
                onClick={() => {
                  setShowConfirm(false);
                  onConfirm();
                }}
              >
                yes
              </button>

              <button
                className="delete-no"
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
