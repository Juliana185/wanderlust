import "./Home.css";

import bellIcon from "./assets/bell.svg";
import searchIcon from "./assets/search.svg";
import AllAlbums from "./AllAlbums";

import { useState, useRef, useEffect } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { useUserName } from "../../hooks/useUserName";

const DB_NAME = "PhotoGalleryDB";
const STORE_NAME = "photos";
const DB_VERSION = 4;


function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (db.objectStoreNames.contains(STORE_NAME)) {
        db.deleteObjectStore(STORE_NAME);
      }

      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id"
      });

      store.createIndex("cityId", "cityId", {
        unique: false
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getPhotosByCity(cityId) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("cityId");

  return new Promise((resolve) => {
    const request = index.getAll(cityId);
    request.onsuccess = () => resolve(request.result || []);
  });
}
export default function Home({
  albums,
  setAlbums,
  view,
  openSearchResult,
  setView,
  openAlbum,
  goToProfile,
  showHints = false,
  onHintsEnd = () => {}
}) {

  const avatar = useAvatar();
  const userName = useUserName();
  const [albumPreviews, setAlbumPreviews] = useState({});
  const [albumCounts, setAlbumCounts] = useState({});

  useEffect(() => {
  async function loadCountryPreviews() {
    const previews = {};
    const counts = {};

    for (let album of albums) {
      let allPhotos = [];

      for (let city of (album.cities || [])) {
        const photos = await getPhotosByCity(city.id);
        allPhotos = [...allPhotos, ...photos];
      }

      counts[album.id] = allPhotos.length;

      if (allPhotos.length > 0) {
        const latest = allPhotos.reduce((a, b) =>
          a.createdAt > b.createdAt ? a : b
        );

        previews[album.id] = URL.createObjectURL(latest.blob);
      }
    }

    setAlbumPreviews(previews);
    setAlbumCounts(counts);
  }

  loadCountryPreviews();
}, [albums]);

<AllAlbums
  albums={albums}
  albumPreviews={albumPreviews}
  albumCounts={albumCounts}
  onBack={() => setView("home")}
  openAlbum={handleOpenAlbum}
  deleteAlbum={deleteAlbum}
/>

  /* ===== SEARCH ===== */

  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("search_history");
    return saved ? JSON.parse(saved) : [];
  });

async function handleSearch(customQuery = null) {
  const value = customQuery ?? query;
  if (!value.trim()) return;

  const normalized = value.trim();

  setIsSearching(true);
  setSearchError(null);

  const updatedHistory = [
    value,
    ...searchHistory.filter(q => q !== value)
  ].slice(0, 10);

  setSearchHistory(updatedHistory);
  localStorage.setItem("search_history", JSON.stringify(updatedHistory));

  try {
    /* ===== TRY COUNTRY ===== */
    const countryRes = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(normalized)}`
    );

    if (countryRes.ok) {
      const countryData = await countryRes.json();

      if (Array.isArray(countryData) && countryData.length > 0) {
        const country = countryData[0];

        let wikiText = "";

        try {
          const wikiRes = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&format=json&origin=*&titles=${encodeURIComponent(country.name.common)}`
          );

          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            const pages = wikiData.query.pages;
            const page = Object.values(pages)[0];
            wikiText = page.extract || "";
          }
        } catch {}

        const result = {
          type: "country",
          name: country.name.common,
          flag: country.flags?.png,
          description: wikiText
        };

        openSearchResult(result);
        setView("search-result");
        setIsSearching(false);
        setQuery("");
        return;
      }
    }

    /* ===== TRY CITY ===== */
      const cityRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&explaintext=true&format=json&origin=*&piprop=thumbnail&pithumbsize=800&titles=${encodeURIComponent(normalized)}`
      );

    if (cityRes.ok) {
      const cityData = await cityRes.json();
      const pages = cityData.query.pages;
      const page = Object.values(pages)[0];

      if (page.extract) {
          const result = {
          type: "city",
          title: page.title,
          description: page.extract,
          image: page.thumbnail?.source || null
      };

        openSearchResult(result);
        setView("search-result");
        setIsSearching(false);
        setQuery("");
        return;
      }
    }

    throw new Error();

  } catch (err) {
    console.error(err);
    setSearchError("Nothing found");
    setIsSearching(false);
  }
}

  /* ===== NOTIFICATIONS ===== */

  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  /* ===== HINTS ===== */
const [hintStep, setHintStep] = useState(null);

useEffect(() => {
  if (showHints) setHintStep(1);
}, [showHints]);

  /* ===== ALBUM FUNCTIONS ===== */

  function addAlbum() {
    setAlbums(prev => [
      {
        id: Date.now(),
        title: `Album ${prev.length + 1}`,
        photos: []
      },
      ...prev
    ]);
  }

  function deleteAlbum(id) {
    setAlbums(prev => prev.filter(a => a.id !== id));
  }

  function handleOpenAlbum(album) {
    openAlbum(album, view);
  }

  function renameAlbum(id, title) {
    setAlbums(prev =>
      prev.map(a =>
        a.id === id ? { ...a, title } : a
      )
    );
  }

  /* ===== CURRENCY ===== */

  const [rates, setRates] = useState(null);

  const COUNTRIES_RATES = [
    { code: "USD", flag: "🇺🇸", name: "USA" },
    { code: "EUR", flag: "🇪🇺", name: "Eurozone" },
    { code: "JPY", flag: "🇯🇵", name: "Japan" },
    { code: "GBP", flag: "🇬🇧", name: "United Kingdom" },
    { code: "CHF", flag: "🇨🇭", name: "Switzerland" },
    { code: "CNY", flag: "🇨🇳", name: "China" }
  ];

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then(r => r.json())
      .then(d => d?.rates && setRates(d.rates))
      .catch(() => setRates(null));
  }, []);

if (view === "all-albums") {
  return (
    <AllAlbums
      albums={albums}
      albumPreviews={albumPreviews}
      albumCounts={albumCounts}
      onBack={() => setView("home")}
      openAlbum={handleOpenAlbum}
      deleteAlbum={deleteAlbum}
    />
  );
}
 
  if (view === "search") {
  return (
    <div className="search-screen">

      <div className="search-screen-header">
        <input
          autoFocus
          className="search-screen-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={() => setView("home")}>
          Cancel
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className="search-history-wrapper">

          <div className="search-history-header">
            <span>Recent searches</span>
            <button
              className="clear-history-btn"
              onClick={() => {
                setSearchHistory([]);
                localStorage.removeItem("search_history");
              }}
            >
              Clear
            </button>
          </div>

          <div className="search-history-box">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="search-history-item"
                onClick={() => handleSearch(item)}
              >
                {item}
              </div>
            ))}
          </div>

        </div>
      )}

      {isSearching && (
        <div className="search-result-card">
          Searching...
        </div>
      )}

      {searchError && (
        <div className="search-result-card">
          {searchError}
        </div>
      )}

    </div>
  );
}

  return (
    <div className="home-screen">

      <header className="home-header">
        <div className="home-user">
          <img
            className="home-avatar"
            src={avatar}
            alt="avatar"
            onClick={goToProfile}
          />
          <div className="home-greeting">
            <p className="home-hi">Hi {userName}</p>
            <p className="home-sub">Good time of day</p>
          </div>
        </div>

        <div className="bell-wrapper" ref={notifRef}>
          <button
            className="home-bell"
            onClick={() => setShowNotifications(v => !v)}
          >
            <img src={bellIcon} alt="notifications" />
          </button>
        </div>
      </header>

      {/* SEARCH */}
      <div className="home-search" onClick={() => setView("search")}>
        <img src={searchIcon} className="search-icon" alt="search" />

        <input
          className="home-search-input"
          value={query}
          readOnly
        />

        {!query && (
          <span className="home-search-placeholder">
            choose a country and learn new things about it
          </span>
        )}
      </div>

      {isSearching && (
        <div className="search-result-card">
          Searching...
        </div>
      )}

      {searchError && (
        <div className="search-result-card">
          {searchError}
        </div>
      )}

      {/* ALBUM CONTROLS */}
      <div className="albums-section">
        <button className="add-album" onClick={addAlbum}>
          ＋ Add country
        </button>

        <button className="show-all-btn" onClick={() => setView("all-albums")}>
          Show all ›
        </button>
      </div>

      {/* ALBUMS ROW */}
      <div className="albums-row">
        {albums.map(album => {
          return (
            <div
              key={album.id}
              className="album-card"
              onClick={() => handleOpenAlbum(album)}
            >
              <div className="album-preview">
                {albumPreviews?.[album.id] ? (
                  <img src={albumPreviews[album.id]} alt="" />
                ) : (
                  <div className="album-placeholder">No photo</div>
                )}
              </div>

              <div className="album-info">
                <input
                  className="album-title-input"
                  value={album.title}
                  onChange={(e) =>
                    renameAlbum(album.id, e.target.value)
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                  <span className="album-count">
                    {albumCounts?.[album.id] || 0} photos
                  </span>

              </div>

              <button
                className="album-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this album?")) {
                    deleteAlbum(album.id);
                  }
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* CURRENCY */}
      {rates && (
        <div className="rates-country-card">
          <div className="rates-header">💱 Exchange rates</div>
          {COUNTRIES_RATES.map(c => (
            <div className="rate-country-row" key={c.code}>
              <div className="rate-country-left">
                <span className="rate-flag">{c.flag}</span>
                <span className="rate-country-name">{c.name}</span>
              </div>
              <div className="rate-country-right">
                <span className="rate-currency">{c.code}</span>
                <span className="rate-value">
                  {rates[c.code]?.toFixed(2) ?? "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HINTS */}
      {hintStep === 1 && (
        <div className="hint hint-profile">
          <p>Here you can edit your profile and settings</p>
          <button onClick={() => setHintStep(2)}>Next</button>
        </div>
      )}

      {hintStep === 2 && (
        <div className="hint hint-bell">
          <p>Here you will receive notifications and updates</p>
          <button onClick={() => setHintStep(3)}>Next</button>
        </div>
      )}

      {hintStep === 3 && (
        <div className="hint hint-search">
          <p>Search countries and cities to learn more about them</p>
          <button
            onClick={() => {
              setHintStep(null);
              onHintsEnd();
            }}
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
