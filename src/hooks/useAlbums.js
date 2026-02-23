import { useState, useEffect } from "react";

export function useAlbums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("albums");
    if (saved) setAlbums(JSON.parse(saved));
  }, []);

  function save(newAlbums) {
    setAlbums(newAlbums);
    localStorage.setItem("albums", JSON.stringify(newAlbums));
  }

  return { albums, save };
}
