// src/screens/auth/Callback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeCodeForToken } from "../../spotify";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      exchangeCodeForToken(code).then((data) => {
        if (data?.access_token) {
          console.log("✅ Access token saved!");
          navigate("/home");
        } else {
          console.error("❌ Failed to get token");
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, []);

  return <div className="loading">Logging you in...</div>;
}
