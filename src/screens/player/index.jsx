import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getApiClient } from "../../spotify";
import "./player.css";
import AudioPlayer from "../../components/audioPlayer";
import SongCard from "../../components/songCard/index";
import Queue from "../../components/queue/index";
import Widgets from "../../components/widgets";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state?.id) {
      const apiClient = getApiClient();
      apiClient
        .get(`playlists/${location.state.id}/tracks`)
        .then((res) => {
          console.log(res.data.items);
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        })
        .catch((err) => console.error("Error fetching tracks:", err));
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track || {});
  }, [currentIndex, tracks]);

  // console.log("Current Track:", currentTrack);

  if (!location.state?.id) {
    return <div className="screen-container">No playlist selected.</div>;
  }

  return (
    <div className="screen-container flex">
      {/* Left Section: Audio Player & Widgets */}
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>

      {/* Right Section: Track Info & Queue */}
      <div className="right-player-body">
        <SongCard album={currentTrack.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
