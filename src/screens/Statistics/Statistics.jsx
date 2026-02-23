import { useEffect, useState, useRef } from "react";
import "./Statistics.css";
import bgImage from "./assets/bg.jpg";
import WorldMap from "../../assets/world.svg?react";

const TOTAL_COUNTRIES = 195;

/* COLORS */

const COLORS = [
  "#7CC7FF","#7FE2A0","#FFD45C",
  "#FFAD9F","#C8A2FF","#FF7F9F","#6FE7DD"
];

/* LEVEL */

function getTravelerLevel(count) {
  if (count >= 50) return { title: "👑 Legend", next: null };
  if (count >= 26) return { title: "🚀 Global", next: 50 };
  if (count >= 11) return { title: "🌍 Traveler", next: 26 };
  if (count >= 4) return { title: "🧭 Explorer", next: 11 };
  return { title: "🌱 Beginner", next: 4 };
}

/* COMPONENT */

export default function Statistics({ onBack }) {

  const [visitedCountries, setVisitedCountries] = useState(() => {
    const saved = localStorage.getItem("visitedCountries");
    return saved ? JSON.parse(saved) : {};
  });

  const [input, setInput] = useState("");
  const [levelUp, setLevelUp] = useState(false);
  const previousLevel = useRef(null);

  /* =========================
     SAVE TO LOCAL STORAGE
  ========================== */

  useEffect(() => {
    localStorage.setItem(
      "visitedCountries",
      JSON.stringify(visitedCountries)
    );
  }, [visitedCountries]);

  /* =========================
     PAINT MAP
  ========================== */

useEffect(() => {
  const allPaths = document.querySelectorAll(".world-map path");

  // очищаем всё
  allPaths.forEach(path => {
    path.style.fill = "";
  });

  // красим все совпадающие id
  Object.entries(visitedCountries).forEach(([name, data]) => {
    const matching = document.querySelectorAll(
      `.world-map path[id="${CSS.escape(name)}"]`
    );

    matching.forEach(el => {
      el.style.fill = data.color;
    });
  });
}, [visitedCountries]);



const ALIASES = {
  "usa": "United States",
  "united states of america": "United States"
};
  /* =========================
     ADD COUNTRY
  ========================== */

  const addCountry = () => {
  let name = input.trim();

  if (!name) return;

  const lower = name.toLowerCase();

  // проверяем алиасы
  if (ALIASES[lower]) {
    name = ALIASES[lower];
  }

  const svgElements = document.querySelectorAll(".world-map path");

  let found = false;

  svgElements.forEach(el => {
    if (el.id.toLowerCase() === name.toLowerCase()) {
      found = true;
    }
  });

  if (!found) {
    alert("Country not found");
    return;
  }

  const realName = name;

  setVisitedCountries(prev => {
    if (prev[realName]) return prev;

    const used = Object.values(prev).map(c => c.color);
    const available = COLORS.filter(c => !used.includes(c));
    const color = available.length
      ? available[Math.floor(Math.random() * available.length)]
      : COLORS[Math.floor(Math.random() * COLORS.length)];

    return {
      ...prev,
      [realName]: {
        name: realName,
        color
      }
    };
  });

  setInput("");
};

  /* =========================
     REMOVE COUNTRY
  ========================== */

const removeCountry = (name) => {
  setVisitedCountries(prev => {
    const copy = { ...prev };
    delete copy[name];
    return copy;
  });

  const matching = document.querySelectorAll(
    `.world-map path[id="${CSS.escape(name)}"]`
  );

  matching.forEach(el => {
    el.style.fill = "";
  });
};

  /* =========================
     DERIVED VALUES
  ========================== */

  const totalCountries = Object.keys(visitedCountries).length;
  const traveler = getTravelerLevel(totalCountries);

  const progress = traveler.next
    ? (totalCountries / traveler.next) * 100
    : 100;

  const percentWorld = Math.round(
    (totalCountries / TOTAL_COUNTRIES) * 100
  );

  /* =========================
     LEVEL ANIMATION
  ========================== */

  useEffect(() => {
    const current = traveler.title;
    if (previousLevel.current && previousLevel.current !== current) {
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 1500);
    }
    previousLevel.current = current;
  }, [traveler]);

  /* =========================
     RENDER
  ========================== */

  return (
    <div className="stats-screen" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="stats-header">
        <button className="stats-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
      </div>

      <h1 className="stats-title">Statistics</h1>

      <div className="stats-content">

        <div className="add-country">
          <input
            placeholder="Enter full country name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addCountry}>Add</button>
        </div>

        <div className="map-card">
          <WorldMap className="world-map" />
        </div>

        <div className="stats-summary">
          <StatItem value={totalCountries} label="countries" />
        </div>

        <div className={`level-card ${levelUp ? "level-up" : ""}`}>
          <div className="level-title">{traveler.title}</div>

          <div className="level-progress">
            <div
              className="level-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="world-percent">
            🌍 {percentWorld}% of the world visited
          </div>

          {traveler.next && (
            <div className="level-next">
              {traveler.next - totalCountries} countries to next level
            </div>
          )}
        </div>

        <div className="stats-card">
          <h2 className="stats-card-title">Visited Countries</h2>

          <div className="countries-list-simple">
            {Object.entries(visitedCountries).map(([name,data]) => (
              <div
                key={name}
                className="country-chip"
                style={{ background: data.color }}
              >
                {data.name}
                <button
                  className="delete-btn"
                  onClick={() => removeCountry(name)}
                >
                  ✕
                </button>
              </div>
            ))}

            {!totalCountries && (
              <div className="empty">
                No countries added yet
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* SMALL COMPONENT */

function StatItem({ value, label }) {
  return (
    <div className="stat-item">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}