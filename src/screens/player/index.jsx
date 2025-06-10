import { useLocation } from "react-router-dom";
import "./player.css";

export default function Player() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="screen-container">
      <div className="left-player-body"></div>
      <div className="right-player-body"></div>
    </div>
  );
}
