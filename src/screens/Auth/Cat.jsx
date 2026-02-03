import cat from "./assets/cat.jpg";
import "./StartFlow.css"; // если общие шрифты/ресеты там

export default function Cat({ goBack }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${cat})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom) + 60px)",
          left: "20px",

          width: "175px",
          height: "64px",

          backgroundColor: "#80715B",
          borderRadius: "30px",
          border: "2px solid #746853",
          boxSizing: "border-box",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "50px",
            letterSpacing: "0.2em",
            color: "#FFFFFF",
            textAlign: "center",        
            whiteSpace: "nowrap",
          }}
        >
          Back
        </span>
      </button>
    </div>
  );
}
