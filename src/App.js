import React, { useEffect } from "react";
import { vkAuth, apiUrl } from "./config";
import "./App.css";

function App() {
  function authMe() {
    window.location = `${vkAuth.url}authorize?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`;
  }
  console.log("process.env.NODE_ENV", process.env);
  useEffect(() => {
    const redirectedFromAuth = window.location.href.includes("authme");
    if (redirectedFromAuth) {
      const code = window.location.href.split("code=")[1];
      fetch(`${apiUrl}/token?code=${code}`).then((data) =>
        console.log(data.text())
      );
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
