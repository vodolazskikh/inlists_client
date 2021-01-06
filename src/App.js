import React, { useEffect } from "react";
import { vkAuth } from "./config/vkAuth";
import "./App.css";

function App() {
  function authMe() {
    window.location = `${vkAuth.url}authorize?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`;
  }

  useEffect(() => {
    const redirectedFromToken = window.location.href.includes("user_id");
    const redirectedFromAuth = window.location.href.includes("authme");
    console.log("lol", window.location);

    if (redirectedFromToken) {
      console.log("редирект с токеном");
      window.location = "http://inlists.ru";
    }

    if (redirectedFromAuth) {
      const code = window.location.href.split("code=")[1];
      const tokenUrl = `${vkAuth.url}access_token?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}&code=${code}&client_secret=${process.env.REACT_APP_VK_SECRET}`;
      window.location = tokenUrl;
    }
  }, [window.location.href]);

  return (
    <main>
      <h1>Реакт и сервер на ноде</h1>
      <button onClick={authMe}>Авторизуй меня</button>
    </main>
  );
}

export default App;
