const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "13d88118a418403390c2919c149ffd3a";
const redirectUri = "https://localhost:5173/callback";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
