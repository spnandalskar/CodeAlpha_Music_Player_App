import axios from "axios";

const REDIRECT_URI = `${window.location.origin}/callback`;

// Generate a random code verifier
export function generateCodeVerifier(length = 128) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate the code challenge (SHA256 hash of verifier)
export async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Build the full Spotify auth URL
export async function getAuthUrl() {
  const CLIENT_ID = "daf660008efc4d4fadcca763ba4640c5";

  const SCOPES = ["user-library-read", "playlist-read-private"];

  const codeVerifier = generateCodeVerifier();
  localStorage.setItem("code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPES.join(" "))}` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  return authUrl;
}

export async function exchangeCodeForToken(code) {
  const CLIENT_ID = "daf660008efc4d4fadcca763ba4640c5";

  const code_verifier = localStorage.getItem("code_verifier");

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    return data;
  } else {
    console.error("Token exchange failed:", data);
    return null;
  }
}

export async function fetchUserProfile() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("No access token found.");
    return null;
  }

  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch user profile");
    return null;
  }

  const data = await res.json();
  return data;
}

export async function fetchUserPlaylists() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("No access token found.");
    return null;
  }

  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch playlists");
    return null;
  }

  const data = await res.json();
  return data.items;
}

export const getApiClient = () => {
  const token = localStorage.getItem("access_token");
  return axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
