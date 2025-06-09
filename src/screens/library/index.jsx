import { useEffect, useState } from "react";
import { fetchUserPlaylists } from "../../spotify";
import "./library.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      {playlists.length === 0 ? (
        <p>Loading playlists...</p>
      ) : (
        <div className="library-body">
          {playlists?.map((playlist) => (
            <div
              className="playlist-card"
              key={playlist.id}
              onClick={() => playPlaylist(playlist.id)}
            >
              <img
                src={playlist.images[0].url}
                className="playlist-image"
                alt="Playlist-Art"
              />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
                <IconContext.Provider
                  value={{ size: "80px", color: "#948979" }}
                ></IconContext.Provider>
                <AiFillPlayCircle />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
