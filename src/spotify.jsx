const CLIENT_ID = "daf660008efc4d4fadcca763ba4640c5";
const REDIRECT_URI = "https://code-alpha-music-player-app.vercel.app/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const SCOPES = "user-library-read playlist-read-private";

export const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}&response_type=token&show_dialog=true`;
