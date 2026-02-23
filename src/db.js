const DB_NAME = "PhotoGalleryDB";
const DB_VERSION = 4;
const STORE = "trips";


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

export async function getTrips() {
  const db = await openDB();
  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);
  const request = store.getAll();

  return new Promise(resolve => {
    request.onsuccess = () => resolve(request.result || []);
  });
}

export async function addTrip(trip) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(trip);
}

export async function deleteTrip(id) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete(id);
}
