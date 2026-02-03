import { useState } from "react";
import "./Help.css";

const QUESTIONS = [
  {
    title: "Do I need an internet connection to use the app?",
    text:
      "Most features of the app are available offline. An internet connection is required for data synchronization between devices, backups, and restoring information when signing in to your account.",
  },
  {
    title: "How does data synchronization work?",
    text: "Data is synchronized automatically when an internet connection is available. All changes made in the app are saved to your account and become available on other devices after signing in.",
  },
  {
    title: "What happens to my data if I change my device?",
    text: "After signing in to your account on a new device, all your trips, notes, and entries will be restored automatically during synchronization.",
  },
  {
    title: "Where is my data stored and who has access to it?",
    text: "All data is stored in a secure environment and is accessible only to the account owner. We do not share your data with third parties or use it for advertising purposes.",
  },
  {
    title: "Can deleted data be restored?",
    text: "Deleted content cannot be restored. We recommend using data export regularly if you want to keep a copy of your information.",
  },
  {
    title: "Can I use the app on multiple devices at the same time?",
    text: "Yes. You can use the app on multiple devices by signing in with the same account. All data will be synchronized automatically.",
  },
  {
    title: "How often is the app updated?",
    text: "The app is updated regularly. Updates focus on improving stability, security, and overall functionality.",
  },
  {
    title: "How can I contact support?",
    text: "If you have technical questions, encounter issues, or want to share feedback, you can contact us through the support section in the app. We review every request carefully.",
  },
];

export default function Help({ onBack }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="help-screen">
      {/* HEADER */}
      <div className="help-header">
        <button className="help-back" onClick={onBack}>
        <span className="back-arrow">‹</span>
        <span>Back</span>
        </button>
      </div>

      <div className="help-card">
        <h2 className="help-title">Possible questions</h2>

        {QUESTIONS.map((q, index) => (
          <HelpItem
            key={index}
            index={index}
            title={q.title}
            text={q.text}
            isOpen={openIndex === index}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

function HelpItem({ index, title, text, isOpen, onClick }) {
  return (
    <div
      className={`help-item ${isOpen ? "open" : ""}`}
      onClick={() => onClick(index)}
    >
      <div className="help-question">
        <span>{index + 1}. {title}</span>
      </div>

      {isOpen && (
        <div className="help-answer">
          {text}
        </div>
      )}
    </div>
  );
}

