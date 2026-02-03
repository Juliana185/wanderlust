import { useEffect } from "react";
import "./Statistics.css";
import bgImage from "./assets/bg.jpg";

export default function Statistics({ onBack, goToCountries }) {
  return (
    <div className="stats-screen" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* HEADER */}
      <div className="stats-header">
        <button className="stats-back" onClick={onBack}>
            <span className="back-arrow">‹</span>
            <span>Back</span>
        </button>
        <h1 className="stats-title">Statistics</h1>
      </div>

      {/* CONTENT */}
      <div className="stats-content">

        {/* SUMMARY */}
        <div className="stats-summary">
          <StatItem value="8" label="countries" />
          <StatItem value="21" label="cities" />
          <StatItem value="422" label="days traveled" />
        </div>

        {/* COUNTRIES */}
        <div className="stats-card">
        <h2 className="stats-card-title">Countries visited</h2>

        <div className="countries-block">
            <DonutChart />

            <div className="countries-legend">
            <LegendItem color="#7CC7FF" label="France" value="5 trips" />
            <LegendItem color="#7FE2A0" label="Italy" value="4 trips" />
            <LegendItem color="#FFD45C" label="Japan" value="4 trips" />
            <LegendItem color="#FFAD9F" label="Germany" value="3 trips" />

            <button className="show-all" onClick={goToCountries}>
                Show all ›
            </button>
            </div>
        </div>
        </div>


        {/* CITIES */}
        <div className="stats-card">
        <h2 className="stats-card-title">Cities visited</h2>

        <div className="stats-card">

        {/* столбцы */}
        <div className="cities-chart">
            <Bar value={90} />
            <Bar value={70} />
            <Bar value={50} />
            <Bar value={35} />
        </div>

        {/* линия */}
        <div className="cities-axis" />

        {/* подписи */}
        <div className="cities-labels">
            <span>Paris</span>
            <span>Rome</span>
            <span>Berlin</span>
            <span>Kyoto</span>
        </div>
        </div>


        <div className="highlights">
            <div className="highlights-title">Highlights</div>

            <Highlight text="Most visited country: France" />
            <Highlight text="Most visited city: Paris" />
            <Highlight text="Longest trip: 92 days" />
        </div>
        </div>


      </div>
    </div>
  );
}


function StatItem({ value, label }) {
  return (
    <div className="stat-item">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}




{/* COUNTRIES */}
function DonutChart() {
  const radius = 45;
  const stroke = 30;
  const circumference = 2 * Math.PI * radius;

  const data = [
    { value: 3, color: "#7CC7FF" },
    { value: 2, color: "#7FE2A0" },
    { value: 2, color: "#FFD45C" },
    { value: 1, color: "#FFAD9F" },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  let offset = 0;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <g transform="rotate(-90 60 60)">
        {data.map((d, i) => {
          const dash = (d.value / total) * circumference;

          const circle = (
            <circle
              key={i}
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );

          offset += dash;
          return circle;
        })}
      </g>
    </svg>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div className="legend-item">
      <span className="legend-dot" style={{ background: color }} />
      <span className="legend-label">{label}</span>
      <span className="legend-value">{value}</span>
    </div>
  );
}


{/* CITIES */}
function Bar({ value }) {
  return (
    <div className="bar-wrapper">
      <div className="bar" style={{ height: `${value}%` }} />
    </div>
  );
}


function Highlight({ text }) {
  return (
    <div className="highlight-item">
      <span className="highlight-dot" />
      <span>{text}</span>
    </div>
  );
}
