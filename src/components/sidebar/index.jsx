import SidebarButton from "./sidebarButton";
import "./sidebar.css";
import profile from "../../../public/images/profile.jpg";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../spotify"; // adjust path as per your structure

export default function Sidebar() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const data = await fetchUserProfile();
      setProfileData(data);
    }

    loadProfile();
  }, []);

  return (
    <>
      <div className="sidebar-container">
        {profileData?.images?.length > 0 ? (
          <img
            src={profileData.images[0].url}
            className="profile-img"
            alt={profileData.display_name}
            title={profileData.display_name}
          />
        ) : (
          <img src={profile} className="profile-img" alt="default profile" />
        )}

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
