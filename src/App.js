import React from 'react';
import './App.css';

function App() {


  async function authMe() {
    await fetch('/api/vk_auth');
  }

  return (
    <main>
      <h1>Реакт и сервер на ноде</h1>
      <button onClick={authMe}>Авторизуй меня</button>
    </main>
  );
}

export default App;
