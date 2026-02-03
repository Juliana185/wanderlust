import { useState, useEffect, useRef } from "react";
import "./StartFlow.css";

export default function StartFlow({goToCat, goToHome, initialScreen = "signin",}) {

  const [visible, setVisible] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

const [screen, setScreen] = useState(initialScreen);
// "signin" | "signup" | "forgot"
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1000);     // welcome
    const t2 = setTimeout(() => setShowSignIn(true), 3200);  // panel
    const t3 = setTimeout(() => setMoveUp(true), 3000);      // welcome up

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);





  return (
  <div className="screen">

    {/* ================= START SCREEN ================= */}
    <div
      className={`welcome
        ${visible ? "welcome-visible" : ""}
        ${moveUp ? "welcome-up" : "welcome-center"}
      `}
    >
      <h1>Welcome to WANDERLUST</h1>
    </div>

    {/* ================= BOTTOM PANEL (RECTANGLE) ================= */}
    <div className={`panel ${showSignIn ? "panel-visible" : ""}`}>

      <div className="signin">


      {/* ================= SIGN IN ================= */}
    {screen === "signin" && (
      <>
        

        {/* ---------- PRIMARY BUTTON ---------- */}
        <button className="signin-primary">
          Sign in
        </button>

        {/* ---------- INPUTS ---------- */}
        <div className="signin-inputs">
          <input placeholder="Email" />

          <div className="password-row">
            <input placeholder="Password" type="password" />
            <span
              className="forgot"
              onClick={() => setScreen("forgot")}
            >
              Forgot?
            </span>

          </div>
        </div>

        {/* ---------- CONTINUE ---------- */}
        <button
          className="signin-continue"
          onClick={goToHome}
        >
          Continue
        </button>


        {/* ---------- DIVIDER ---------- */}
        <div
          className="signin-divider"
          style={{ opacity: screen === "signup" ? 0 : 1 }}
        >
          <span />
          <p>or</p>
          <span />
        </div>

        {/* ---------- APPLE ---------- */}
        <button
          className="signin-apple"
          onClick={goToCat}
        >
          <span className="apple-icon"></span>
          <span>Sign in with Apple</span>
        </button>

        {/* ---------- FOOTER ---------- */}
        <p className="signin-footer">
          Don’t have an account?{" "}
          <span onClick={() => setScreen("signup")}>
            Sign up
          </span>
        </p>

        
      </>
    )}
    {/* ================= /SIGN IN ================= */}









  {screen === "signup" && (
    <>
      {/* ================= SIGN UP ================= */}

      {/* ---------- PRIMARY BUTTON ---------- */}
      <button className="signup-primary">
        Sign up
      </button>

      {/* ---------- INPUTS ---------- */}
      <div className="signup-inputs">
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <input placeholder="Password" type="password" />
      </div>

      {/* ---------- CONTINUE ---------- */}
      <button
        className="signup-continue"
        onClick={goToHome}
      >
        Continue
      </button>


            {/* ---------- DIVIDER ---------- */}
      <div
        className="signup-divider"
        style={{ opacity: screen === "signup" ? 0 : 1 }}
      >

      </div>

      {/* ---------- FOOTER ---------- */}
      <p className="signup-footer">
        Already have an account?{" "}
        <span onClick={() => setScreen("signin")}>
          Sign in
        </span>
      </p>
    </>
  )}
      {/* ================= /SIGN UP ================= */}







    {/* ================= PASSWORD RECOVERY ================= */}

  {screen === "forgot" && (
    <div className="recovery">
      <button className="signin-primary">
        Password recovery
      </button>

      <div className="signin-inputs">
        <input placeholder="Email" />
        <input placeholder="New password" type="password" />
      </div>

      <button
        className="signin-continue"
        onClick={goToHome}
      >
        Continue
      </button>


      <p className="signin-footer">
        Remembered your password?{" "}
        <span onClick={() => setScreen("signin")}>
          Sign in
        </span>
      </p>
    </div>
  )}

    {/* ================= /PASSWORD RECOVERY ================= */}
 

</div>

    </div>
    {/* ================= /BOTTOM PANEL ================= */}

  </div>
  
);
}
