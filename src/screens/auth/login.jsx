import { getAuthUrl } from "../../spotify";
import "./login.css";

export default function Login() {
  const handleLogin = async () => {
    const url = await getAuthUrl();
    window.location.href = url;
  };

  return (
    <div className="login-page">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
        alt="logo-spotify"
        className="logo"
      />
      <a href={handleLogin}>
        <div className="login-btn">LOG IN</div>
      </a>
    </div>
  );
}
