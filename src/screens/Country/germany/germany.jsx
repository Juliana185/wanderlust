import "./germany.css";

import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";

export default function Germany({ onBack }) {
  return (
    <div className="country-screen">
      {/* HEADER */}
      <header className="country-header">
        <button className="country-back" onClick={onBack}>
            <span className="back-arrow">‹</span>
            <span>Back</span>
        </button>
      </header>
        <h1 className="country-title">Germany</h1>
      {/* CONTENT */}
      <div className="country-content">
        <div className="photo-card">
          <img src={img1} />
        </div>
        <div className="photo-card">
          <img src={img2} />
        </div>
        <div className="photo-card">
          <img src={img3} />
        </div>
        <div className="photo-card">
          <img src={img4} />
        </div>
        <div className="photo-card">
          <img src={img5} />
        </div>
      </div>
    </div>
  );
}
