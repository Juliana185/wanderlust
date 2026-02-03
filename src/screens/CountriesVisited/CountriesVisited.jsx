import "./CountriesVisited.css";
import bgImage from "./assets/bg.jpg";

export default function CountriesVisited({ onBack }) {
  return (
    <div className="countries-screen">
      <div className="stats-bg" style={{ backgroundImage: `url(${bgImage})` }}/>
      {/* header */}
      <div className="countries-header">
        <button className="countries-back" onClick={onBack}>
            <span className="back-arrow">‹</span>
            <span>Back</span>
        </button>
        <h1 className="countries-title">Countries visited</h1>
      </div>

      {/* list */}
      <div className="countries-list">
        <Card
          name="France"
          flag="🇫🇷"
          trips="5 trips"
          cities={[
            { name: "Paris", date: "June 2023" },
            { name: "Lyon", date: "September 2023" },
            { name: "Marseille", date: "September 2024" },
            { name: "Lyon", date: "November 2024" },
            { name: "Rennes", date: "March 2024" },
          ]}
        />

        <Card
          name="Italy"
          flag="🇮🇹"
          trips="4 trips"
          cities={[
            { name: "Rome", date: "June 2021" },
            { name: "Florence", date: "June 2022" },
            { name: "Milan", date: "June 2023" },
            { name: "Palermo", date: "June 2024" },
          ]}
        />

        <Card
          name="Japan"
          flag="🇯🇵"
          trips="4 trips"
          cities={[
            { name: "Tokyo", date: "October 2021" },
            { name: "Kyoto", date: "July 2022" },
            { name: "Kawasaki", date: "December 2022" },
            { name: "Hiroshima", date: "January 2023" },
          ]}
        />

        <Card
          name="Germany"
          flag="🇩🇪"
          trips="3 trip"
          cities={[
            { name: "Munich", date: "July 2022" },
            { name: "Hamburg", date: "August 2022" },
            { name: "Berlin", date: "September 2025" },
          ]}  
        />

        <Card
          name="Czechia"
          flag="🇨🇿"
          trips="2 trip"
          cities={[
            { name: "Prague", date: "March 2021" },
            { name: "Prague", date: "May 2024" },
          ]}  
        />

                <Card
          name="USA"
          flag="🇺🇸"
          trips="2 trip"
          cities={[
            { name: "Las Vegas", date: "February 2025" },
            { name: "Miami", date: "February 2025" },
          ]}  
        />

                <Card
          name="Serbia"
          flag="🇷🇸"
          trips="1 trip"
          cities={[
            { name: "Belgrade", date: "April 2025" },
          ]}  
        />

                <Card
          name="Montenegro"
          flag="🇲🇪"
          trips="1 trip"
          cities={[
            { name: "Bar", date: "November 2024" },
          ]}  
        />
      </div>
    </div>
  );
}

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
