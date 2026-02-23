import { useEffect, useState } from "react";
import "./CountriesVisited.css";
import bgImage from "./assets/bg.jpg";

/* ================================
   COMPONENT
================================ */

export default function CountriesVisited({ albums, onBack }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    function buildCountries() {
      const result = [];

      for (let album of albums || []) {
        if (!album.cities?.length) continue;

        result.push({
          name: album.title,
          flag: "🌍",
          trips: `${album.cities.length} ${
            album.cities.length === 1 ? "city" : "cities"
          }`,
          cities: album.cities.map(city => ({
            name: city.name,
            date: city.date || "—"
          }))
        });
      }

      result.sort((a, b) =>
        parseInt(b.trips) - parseInt(a.trips)
      );

      setCountries(result);
    }

    buildCountries();
  }, [albums]);

  return (
    <div className="countries-screen">
      <div
        className="stats-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="countries-header">
        <button className="countries-back" onClick={onBack}>
          <span className="back-arrow">‹</span>
          <span>Back</span>
        </button>
        <h1 className="countries-title">
          Countries visited
        </h1>
      </div>

      <div className="countries-list">
        {countries.map((country, index) => (
          <Card
            key={index}
            name={country.name}
            flag={country.flag}
            trips={country.trips}
            cities={country.cities}
          />
        ))}

        {!countries.length && (
          <div className="card">
            <div className="header">
              <div className="name">
                <span>No travel data yet</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================
   CARD
================================ */

function Card({ name, flag, trips, cities }) {
  return (
    <div className="card">
      <div className="header">
        <div className="name">
          <span className="flag">{flag}</span>
          <span>{name}</span>
        </div>
        <span className="trips">{trips}</span>
      </div>

      {cities.map((city, i) => (
        <div className="row" key={i}>
          <span>{city.name}</span>
          <span className="date">{city.date}</span>
        </div>
      ))}
    </div>
  );
}
