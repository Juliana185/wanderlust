import "./Home.css";

import bellIcon from "./assets/bell.svg";
import searchIcon from "./assets/search.svg";

import { useState, useRef, useEffect } from "react";


import parisImg from "./assets/paris.jpg";
import germanyImg from "./assets/germany.jpg";
import italyImg from "./assets/italy.jpg";
import japanImg from "./assets/japan.jpg";
import serbiaImg from "./assets/serbia.jpg";
import montenegroImg from "./assets/montenegro.jpg";
import usaImg from "./assets/usa.jpg";
import czechiaImg from "./assets/czechia.jpg";

export default function Home({ goToProfile, goToGermany, goToItaly, goToJapan, goToSerbia, goToMontenegro, goToUsa, goToCzechia, goToParis, props }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);
  // закрытие при клике вне окна
      useEffect(() => {
      function handleClickOutside(e) {
        if (notifRef.current && !notifRef.current.contains(e.target)) {
          setShowNotifications(false);
        }
      }

      if (showNotifications) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showNotifications]);

  return (
    <div className="home-screen">
      {/* HEADER */}
      <header className="home-header">
        <div className="home-user">
          <img
            className="home-avatar"
            src="https://i.pinimg.com/736x/bf/21/94/bf2194c0faa4f94b44ed8e4cdc1389f4.jpg"
            alt="avatar"
            onClick={goToProfile}
          />
          <div className="home-greeting">
            <p className="home-hi">Hi Maria</p>
            <p className="home-sub">Good time of day</p>
          </div>
        </div>

          <div className="bell-wrapper" ref={notifRef}>
            <button
              className="home-bell"
              onClick={() => setShowNotifications((v) => !v)}
            >
              <img src={bellIcon} alt="notifications" />
            </button>
          </div>
      </header>

      {showNotifications && (
        <div className="notifications-dropdown" ref={notifRef}>
          <p className="notif-title">Notifications</p>

          <div className="notif-item">
            ✈️ You added Paris to your list
          </div>

          <div className="notif-item">
            📸 New photos available in Japan
          </div>

          <div className="notif-item">
            🌍 3 countries left to explore
          </div>

          <div className="notif-empty">
            No new notifications
          </div>
        </div>
      )}


      {/* SEARCH */}
      <div className="home-search">
        <img src={searchIcon} className="search-icon" alt="search" />
        <span>choose a country and learn new things about it</span>
      </div>

      {/* CONTENT */}
      <div className="home-content">
        <div className="countries-grid">

          <div className="country-card" onClick={goToParis}>
            <img src={parisImg} className="country-image" />
            <div className="TITLE">Paris</div>
          </div>

          <div className="country-card" onClick={goToGermany}>
            <img src={germanyImg} className="country-image" />
            <div className="TITLE">Germany</div>
          </div>

          <div className="country-card" onClick={goToItaly}>
            <img src={italyImg} className="country-image" />
            <div className="TITLE">Italy</div>
          </div>

          <div className="country-card" onClick={goToJapan}>
            <img src={japanImg} className="country-image" />
            <div className="TITLE">Japan</div>
          </div>

          <div className="country-card" onClick={goToSerbia}>
            <img src={serbiaImg} className="country-image" />
            <div className="TITLE">Serbia</div>
          </div>

          <div className="country-card" onClick={goToMontenegro}>
            <img src={montenegroImg} className="country-image" />
            <div className="TITLE">Montenegro</div>
          </div>

          <div className="country-card" onClick={goToUsa}>
            <img src={usaImg} className="country-image" />
            <div className="TITLE">USA</div>
          </div>

          <div className="country-card" onClick={goToCzechia}>
            <img src={czechiaImg} className="country-image" />
            <div className="TITLE">Czechia</div>
          </div>

        </div>
      </div>
    </div>
  );
}
