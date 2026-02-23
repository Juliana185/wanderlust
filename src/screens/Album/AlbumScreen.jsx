import { useState, useEffect } from "react";
import "./AlbumScreen.css";

/* ================= DB CONFIG ================= */

const DB_NAME = "PhotoGalleryDB";
const STORE_NAME = "photos";
const DB_VERSION = 2;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

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

/* ================= COMPONENT ================= */

export default function AlbumScreen({
  album,
  albums,
  setAlbums,
  openCity,
  onBack
}) {
  if (!album) return null;

  const currentAlbum = albums.find(a => a.id === album.id);
  const subAlbums = currentAlbum?.cities || [];

  const [cityCovers, setCityCovers] = useState({});

  /* ================= LOAD COVERS ================= */

  useEffect(() => {
    async function loadCovers() {
      const covers = {};

      for (let city of subAlbums) {
        const photos = await getPhotosByCity(city.id);

        if (photos.length > 0) {
          covers[city.id] = URL.createObjectURL(photos[0].blob);
        }
      }

      setCityCovers(covers);
    }

    if (subAlbums.length > 0) {
      loadCovers();
    }
  }, [subAlbums]);

  /* ================= ADD CITY ================= */

  function addSubAlbum() {
    setAlbums(prev =>
      prev.map(a =>
        a.id === album.id
          ? {
              ...a,
              cities: [
                {
                  id: Date.now(),
                  title: `City ${subAlbums.length + 1}`
                },
                ...subAlbums
              ]
            }
          : a
      )
    );
  }

  /* ================= DELETE CITY ================= */

  function deleteSubAlbum(id) {
    setAlbums(prev =>
      prev.map(a =>
        a.id === album.id
          ? {
              ...a,
              cities: subAlbums.filter(sa => sa.id !== id)
            }
          : a
      )
    );
  }

  /* ================= RENAME CITY ================= */

  function renameCity(id, title) {
    setAlbums(prev =>
      prev.map(a =>
        a.id === album.id
          ? {
              ...a,
              cities: a.cities.map(c =>
                c.id === id ? { ...c, title } : c
              )
            }
          : a
      )
    );
  }

  return (
    <div className="album-screen">

      <header className="album-header">
        <button className="all-back-btn" onClick={onBack}>
          <span className="all-back-arrow">‹</span>
          <span>Back</span>
        </button>

        <div className="album-header-right">
          <div className="album-title-badge">
            {currentAlbum?.title}
          </div>

          <button
            className="add-subalbum"
            onClick={addSubAlbum}
          >
            + city
          </button>
        </div>
      </header>

      <div className="subalbums-grid">
        {subAlbums.map(sa => (
          <div
            key={sa.id}
            className="subalbum-card"
            onClick={() => openCity(sa)}
          >

            <div className="subalbum-preview">
              {cityCovers[sa.id] ? (
                <img src={cityCovers[sa.id]} alt="" />
              ) : (
                <div className="subalbum-placeholder">
                  No photo
                </div>
              )}
            </div>

            <input
              className="subalbum-title"
              value={sa.title}
              onChange={(e) =>
                renameCity(sa.id, e.target.value)
              }
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="subalbum-delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteSubAlbum(sa.id);
              }}
            >
              ✕
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}