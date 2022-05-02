import React, { useEffect } from "react";
import FileSection from "./FileSelection";
import '../styles/index.css';
const api = "http://localhost:9000/";

export default function Home() {
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const data = await fetch(`${api}gettheme/${localStorage.username}`)
    .then(res => res.json());
    const theme = data.theme;
    const root = document.querySelector(':root');
    root.style.setProperty("--background-c", theme.background);
    root.style.setProperty("--paper-c", theme.page);
  }
  return (
    <div>
      <h1>Welcome Back <span id="username">{localStorage.username}</span>!</h1>
      <div className="home-page">
        <FileSection />
      </div>
      <button onClick={() => {
        localStorage.username = '';
        window.location.href = `http://localhost:3000/login`;
      }}>Log Out</button>
    </div>
  );
}
