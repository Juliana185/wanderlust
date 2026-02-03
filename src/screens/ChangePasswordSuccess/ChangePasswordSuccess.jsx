import "./ChangePasswordSuccess.css";

export default function ChangePasswordSuccess({ goToMain }) {
  return (
    <div className="success-screen">
      <h1 className="success-title">Change password</h1>

      <div className="success-card">
        <p className="success-text">
          The password has been<br />
          successfully update
        </p>

        <button className="success-button" onClick={goToMain}>
          To main screen
        </button>
      </div>
    </div>
  );
}
