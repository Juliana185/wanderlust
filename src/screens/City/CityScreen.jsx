import { useState, useRef, useEffect } from "react";
import "./CityScreen.css";

/* ===================== DB CONFIG ===================== */

const DB_NAME = "PhotoGalleryDB";
const STORE_NAME = "photos";
const DB_VERSION = 2;

/* ===================== OPEN DB ===================== */

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id"
        });

        store.createIndex("cityId", "cityId", {
          unique: false
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/* ===================== DB OPERATIONS ===================== */

async function savePhoto(photo) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.put(photo);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
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

async function deletePhoto(id) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.delete(id);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ===================== COMPONENT ===================== */

export default function CityScreen({
  album,
  city,
  onBack
}) {
  if (!city) return null;

  const [photos, setPhotos] = useState([]);
  const [photoURLs, setPhotoURLs] = useState({});
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(null);

  const sliderRef = useRef(null);
  const startY = useRef(null);
  const currentY = useRef(0);

  /* ================= LOAD ================= */

      useEffect(() => {
      if (!city?.id) return;

      let localURLs = {};

      async function load() {
        const data = await getPhotosByCity(city.id);

        const urls = {};
        data.forEach(p => {
          urls[p.id] = URL.createObjectURL(p.blob);
        });

        localURLs = urls;

        setPhotos(data.sort((a, b) => b.createdAt - a.createdAt));
        setPhotoURLs(urls);
      }

      load();

      return () => {
        Object.values(localURLs).forEach(url =>
          URL.revokeObjectURL(url)
        );
      };
    }, [city?.id]);

  /* ================= ADD ================= */

  async function addPhotos(files) {
    const arr = Array.from(files);

    for (let file of arr) {
      const id = Date.now() + Math.random();

      await savePhoto({
        id,
        cityId: city.id,
        createdAt: Date.now(),
        blob: file
      });
    }

    const updated = await getPhotosByCity(city.id);

    const urls = {};
    updated.forEach(p => {
      urls[p.id] = URL.createObjectURL(p.blob);
    });

    setPhotos(updated.sort((a, b) => b.createdAt - a.createdAt));
    setPhotoURLs(urls);
  }

  /* ================= DELETE ================= */

  async function deleteSelected() {
    for (let id of selectedIds) {
      await deletePhoto(id);
    }

    const updated = await getPhotosByCity(city.id);

    const urls = {};
    updated.forEach(p => {
      urls[p.id] = URL.createObjectURL(p.blob);
    });

    setPhotos(updated.sort((a, b) => b.createdAt - a.createdAt));
    setPhotoURLs(urls);

    setSelectedIds([]);
    setSelectionMode(false);
  }

  function toggleSelect(id) {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  }

  /* ================= SWIPE DOWN CLOSE ================= */

  function handleTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    currentY.current = e.touches[0].clientY - startY.current;

    if (currentY.current > 0) {
      e.currentTarget.style.transform =
        `translateY(${currentY.current}px)`;
    }
  }

  function handleTouchEnd(e) {
    if (currentY.current > 150) {
      setViewerIndex(null);
    }

    e.currentTarget.style.transform = "";
    currentY.current = 0;
  }

  /* ================= AUTO SLIDE ================= */

  useEffect(() => {
    if (viewerIndex !== null && sliderRef.current) {
      sliderRef.current.scrollTo({
        left: viewerIndex * sliderRef.current.clientWidth,
        behavior: "instant"
      });
    }
  }, [viewerIndex]);

  return (
    <div className="city-screen">

      {/* HEADER */}
      <header className="city-header">
        <button className="city-back-btn" onClick={onBack}>
          <span className="city-back-arrow">‹</span>
          <span>Back</span>
        </button>

        <div className="city-title-wrapper">
          <span className="city-title">{city.title}</span>
        </div>

        <button
        className="city-delete-toggle"
        onClick={() => {
            if (selectionMode && selectedIds.length > 0) {
            deleteSelected();
            } else {
            setSelectionMode(!selectionMode);
            setSelectedIds([]);
            }
        }}
        >
        {selectionMode
            ? selectedIds.length > 0
            ? `Delete (${selectedIds.length})`
            : "Cancel"
            : "Select"}
        </button>
      </header>

      {/* ADD */}
      <label className="city-add-btn">
        + Add Photo
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files.length > 0) {
              addPhotos(e.target.files);
              e.target.value = null;   // важно
            }
          }}
        />
      </label>


      {/* GRID */}
      <div className="city-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`city-thumb ${
                selectedIds.includes(photo.id) ? "selected" : ""
            }`}
            onClick={() =>
                selectionMode
                ? toggleSelect(photo.id)
                : setViewerIndex(index)
            }
            >
            <img src={photoURLs[photo.id]} alt="" />
            {selectionMode && selectedIds.includes(photo.id) && (
                <div className="thumb-check">✔️</div>
            )}
            </div>
        ))}
      </div>

      {/* VIEWER */}
      {viewerIndex !== null && photos[viewerIndex] && (
  <div className="ios-viewer">

    {/* Counter */}
    <div className="ios-counter">
      {viewerIndex + 1} / {photos.length}
    </div>

    {/* Slider */}
    <div
      className="ios-slider"
      ref={sliderRef}
      onScroll={(e) => {
        const index = Math.round(
          e.target.scrollLeft / e.target.clientWidth
        );
        if (index >= 0 && index < photos.length) {
          setViewerIndex(index);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {photos.map(photo => (
        <div className="ios-slide" key={photo.id}>
          <img
            src={photoURLs[photo.id]}
            alt=""
            className="ios-image"
          />
        </div>
      ))}
    </div>

  </div>
)}
    </div>
  );
}
