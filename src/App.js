import React, { useEffect, useState } from "react";
import { vkAuth, apiUrl } from "./config";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("vk_token"));
  const [userId, setUserId] = useState(localStorage.getItem("vk_user_id"));

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
      fetch(`${apiUrl}/token?code=${code}`)
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

  return (
    <main>
      <h1>Сервис, где ты можешь авторизоваться, чтобы ничего...</h1>
      {token && <div>{`Твой вк_токен - ${token}`}</div>}
      {userId && <div>{`Твой юзер_айди - ${userId}`}</div>}
      <button onClick={authMe}>Авторизуй меня</button>
    </main>
  );
}

export default App;
