import { useEffect, useState } from "react";
import { fetchUserPlaylists } from "../../spotify";
import "./library.css";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function loadPlaylists() {
      const data = await fetchUserPlaylists();
      if (data) {
        setPlaylists(data);
      }
    }

    loadPlaylists();
  }, []);

  return (
    <div className="screen-container">
      {playlists.length === 0 ? (
        <p>Loading playlists...</p>
      ) : (
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <div className="playlist-card" key={playlist.id}>
              <img
                src={
                  playlist.images[0]?.url ||
                  "https://via.placeholder.com/150?text=No+Image"
                }
                alt={playlist.name}
              />
              <h4>{playlist.name}</h4>
              <p>{playlist.tracks.total} songs</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
