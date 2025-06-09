import SidebarButton from "./sidebarButton";
import "./sidebar.css";
import profile from "../../../public/images/profile.svg";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar-container">
        <img src={profile} className="profile-img" alt="profile" />
        <div>
          <SidebarButton title="Library" to="/home" icon={<IoLibrary />} />
          <SidebarButton
            title="Feed"
            to="/home/feed"
            icon={<MdSpaceDashboard />}
          />
          <SidebarButton
            title="Trending"
            to="/home/trending"
            icon={<FaGripfire />}
          />
          <SidebarButton title="Player" to="/home/player" icon={<FaPlay />} />
          <SidebarButton
            title="Favorites"
            to="/home/favorites"
            icon={<MdFavorite />}
          />
        </div>
        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
      </div>
    </>
  );
}
