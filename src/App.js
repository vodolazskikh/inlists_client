import React, { useEffect, useState } from "react";
import { vkAuth, apiUrl } from "./config";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("vk_token"));
  const [userId, setUserId] = useState(localStorage.getItem("vk_user_id"));
  const [user, setUser] = useState(undefined);

  function authMe() {
    window.location = `${vkAuth.url}authorize?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`;
  }

  useEffect(() => {
    const redirectedFromAuth = window.location.href.includes("authme");

    if (token && !redirectedFromAuth) {
      return;
    }

    if (redirectedFromAuth) {
      const code = window.location.href.split("code=")[1];
      fetch(`${apiUrl}token?code=${code}`)
        .then((data) => data.json())
        .then((tokenAndUserId) => {
          if (tokenAndUserId.access_token && tokenAndUserId.user_id) {
            setToken(tokenAndUserId.access_token);
            setUserId(tokenAndUserId.user_id);
            localStorage.setItem("vk_token", tokenAndUserId.access_token);
            localStorage.setItem("vk_user_id", tokenAndUserId.user_id);
          }
        });
    }
  }, [window.location.href]);

  useEffect(() => {
    if (!userId || !token) {
      return;
    }
    fetch(`${apiUrl}userInfo?userId=${userId}&token=${token}`)
      .then((data) => data.json())
      .then((data) => {
        setUser(data);
      });
  }, [userId]);

  return (
    <main>
      <h1>Сервис, где ты можешь авторизоваться, чтобы ничего...</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {user && (
          <>
            <div style={{ width: 64, height: 64 }}>
              <img
                src={user.photo_100}
                alt="аватар"
                height="64px"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
          </>
        )}
      </div>
      <button onClick={authMe}>Авторизуй меня</button>
    </main>
  );
}

export default App;
