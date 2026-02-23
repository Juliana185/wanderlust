import "./AllAlbums.css";

export default function AllAlbums({
  albums,
  albumPreviews,
  albumCounts,
  onBack,
  openAlbum,
  deleteAlbum
}) {
  return (
    <div className="all-albums-screen">
      <header className="all-albums-header">
        <button className="all-back-btn1" onClick={onBack}>
          <span className="all-back-arrow1">‹</span>
          <span>Back</span>
        </button>
      </header>

      <h2 className="all-screen-title">
        All your countries are stored here
      </h2>

      <div className="all-grid">
        {albums.map(album => {

          return (
            <div
              key={album.id}
              className="all-card"
              onClick={() => openAlbum(album)}
            >
              <div className="all-preview">
                {albumPreviews?.[album.id] ? (
                  <img src={albumPreviews[album.id]} alt="" />
                ) : (
                  <div className="all-placeholder">
                    No cities
                  </div>
                )}
              </div>


              <div className="all-info">
                <p className="all-title">
                  {album.title}
                </p>
                  <span className="all-count">
                    {albumCounts?.[album.id] || 0} photos
                  </span>
              </div>

              <button
                className="all-delete"
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
    </div>
  );
}
