import "./SearchResultScreen.css";

export default function SearchResultScreen({ data, onBack }) {
  if (!data) return null;

  const isCountry = data.type === "country";
  const title = isCountry ? data.name : data.title;
  const image = isCountry ? data.flag : data.image;

  // Разбиваем текст на нормальные абзацы
  const paragraphs =
    data.description
      ?.split("\n")
      .filter(p => p.trim().length > 120)
      .slice(0, 8) || [];

  return (
    <div className="result-screen">

      {/* HEADER */}
      <div className="result-header">
        <button className="result-back" onClick={onBack}>
          <span className="result-back-arrow">‹</span>
          <span>Back</span>
        </button>
      </div>

      {/* HERO */}
      <div className="result-hero">
        {image && (
          <img
            src={image}
            alt=""
            className="result-hero-image"
          />
        )}

        <div className="result-hero-overlay">
          <h1>{title}</h1>
          <span>{isCountry ? "Country" : "City"}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="result-body">

        {paragraphs.length > 0 && (
          <section className="result-section">
            <h2>About {title}</h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="result-text">
                {paragraph}
              </p>
            ))}
          </section>
        )}

      </div>
    </div>
  );
}