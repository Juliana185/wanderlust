import "./Profile.css";
import facebook from "./assets/facebook.svg";
import twitter from "./assets/twitter.svg";
import reddit from "./assets/reddit.svg";
import instagram from "./assets/instagram.svg";

import userIcon from "./assets/user.svg";
import settingsIcon from "./assets/settings.svg";
import statsIcon from "./assets/stats.svg";
import helpIcon from "./assets/help.svg";
import infoIcon from "./assets/info.svg";



export default function Profile({ goBack, goToHelp, goToAbout, goToStatistics, goToSettings, goToEdit}) {
  return (
    <div className="profile-screen">
      {/* HEADER */}
      <div className="profile-header">
        <button className="profile-back" onClick={goBack}>
        <span className="back-arrow">‹</span>
        <span>Back</span>
        </button>

      </div>

      {/* AVATAR */}
      <div className="profile-avatar-wrapper">
        <img
          className="profile-avatar"
          src="https://i.pinimg.com/736x/bf/21/94/bf2194c0faa4f94b44ed8e4cdc1389f4.jpg"
          alt="avatar"
        />
      </div>

      {/* INFO */}
      <h2 className="profile-name">Maria Danis</h2>
      <p className="profile-sub">
        account registration date: March 12 2025
      </p>

{/* MENU */}
<div className="profile-card">
  <ProfileItem icon={userIcon} label="Edit profile" variant="green" onClick={goToEdit} />
  <ProfileItem icon={settingsIcon} label="Settings" variant="green" onClick={goToSettings}/>
  <ProfileItem icon={statsIcon} label="My statistic" variant="green" onClick={goToStatistics} />

  <div className="profile-divider" />

  <ProfileItem icon={helpIcon} label="Help" variant="gray" onClick={goToHelp}/>
  <ProfileItem icon={infoIcon} label="About us" variant="gray" onClick={goToAbout} />

  <div className="profile-divider" />

  <div className="profile-social-block">
    <p className="profile-social-title">our social network</p>
    <div className="profile-socials">
      <img src={facebook} alt="facebook" />
      <img src={twitter} alt="twitter" />
      <img src={reddit} alt="reddit" />
      <img src={instagram} alt="instagram" />
    </div>
  </div>
</div>
</div>    
  );
}



function ProfileItem({ icon, label, variant = "green", onClick }) {
  return (
    <div className="profile-item" onClick={onClick}>
      <div className={`profile-item-icon ${variant}`}>
        <img src={icon} alt="" />
      </div>

      <span className="profile-item-label">{label}</span>
      <span className="profile-arrow">›</span>
    </div>
  );
}
