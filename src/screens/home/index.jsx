import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Login from "../../screens/auth/login.jsx";
import Callback from "../../screens/auth/callback.jsx";
import Favorites from "../favorites/index.jsx";
import Feed from "../feed/index.jsx";
import Library from "../library/index.jsx";
import Player from "../player/index.jsx";
import Trending from "../trending/index.jsx";
import "./home.css";

export default function Home() {
  return (
    <Router>
      <Routes>
        {/* Standalone Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />

        {/* Main App Layout */}
        <Route
          path="/home/*"
          element={
            <div className="main-body">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Library />} />
                <Route path="feed" element={<Feed />} />
                <Route path="trending" element={<Trending />} />
                <Route path="player" element={<Player />} />
                <Route path="favorites" element={<Favorites />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
