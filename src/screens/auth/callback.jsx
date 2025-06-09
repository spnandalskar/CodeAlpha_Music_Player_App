/* eslint-disable react-hooks/exhaustive-deps */
// src/screens/auth/Callback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeCodeForToken } from "../../spotify";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("Code from URL:", code); // Is code present?

    if (code) {
      exchangeCodeForToken(code)
        .then((data) => {
          console.log("Token exchange response:", data); // Did the call succeed?

          if (data?.access_token) {
            console.log("Access token saved!");
            navigate("/home");
          } else {
            console.error("Failed to get token");
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Token exchange failed:", err); //  Catch unexpected issues
          navigate("/");
        });
    } else {
      console.warn("No code in URL");
      navigate("/");
    }
  }, []);

  return <div className="loading">Logging you in...</div>;
}
