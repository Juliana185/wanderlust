import "./About.css";

export default function About({ onBack }) {
  return (
    <div className="about-screen">
      {/* HEADER */}
      <div className="about-header">
        <button className="profile-back" onClick={onBack}>
        <span className="back-arrow">‹</span>
        <span>Back</span>
        </button>
      </div>

        <h1 className="about-title">About us</h1>
        
      {/* SCROLL AREA */}
      <div className="about-scroll">
        <div className="about-content">
          <p>It all started with two developers and a single idea.</p>

          <p>
            We traveled a lot, used different apps for notes, saved photos, lists,
            and thoughts — and every time, parts of the journey were getting lost.
            Some things stayed in notes, some in galleries, and some only in memory.
          </p>

          <p>
            We were missing one place.
            <br />
            A calm one. A personal one. Our own.
          </p>

          <p>
            That’s how the idea was born — to create an app that doesn’t distract,
            doesn’t rush, and doesn’t push you to share. An app that helps preserve
            a journey exactly as it was.
          </p>

          <p>
            The first version was built by the two of us, in the evenings, between
            work and trips. No investors. No loud launches. No big teams. Just
            because we genuinely needed it ourselves.
          </p>

          <p>
            Over time, people who shared the same approach joined the project.
          </p>

          <p>
            Today, the app is supported and developed by a small team of designers
            and developers who care deeply about details and release updates
            thoughtfully.
          </p>

          <p>
            We grow gradually, keeping what matters most — calmness, simplicity,
            and respect for personal space.
          </p>

          <h1 className="about-title">About the App</h1>

          <p>This app is a personal space for travelers.</p>

          <p>It allows you to:</p>

          <ul>
            <li>save trips and return to them anytime</li>
            <li>keep notes, lists, and travel journals</li>
            <li>collect moments and memories</li>
            <li>see your journey and how it evolves over time</li>
          </ul>

          <p>
            We consciously avoided social mechanics, ratings, and pressure.
            Instead, the focus is on the person and their experience.
          </p>

          <p>
            The app is designed to be minimal and intuitive. It doesn’t demand
            attention or learning — it simply fits into your rhythm.
          </p>

          <p>
            We update it regularly, adding new features only when they truly make
            the experience clearer, deeper, and more comfortable.
          </p>

          <div className="about-manifest">
            <p>WE BUILD THIS APP</p>
            <p>FOR THOSE WHO</p>
            <p>TRAVEL NOT FOR</p>
            <p>REPORTS, BUT FOR LIFE.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
