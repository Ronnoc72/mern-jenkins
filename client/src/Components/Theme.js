import React, { useEffect } from "react";
import "../styles/theme.css";
import menu from "../text.json";
const menuItems = menu.menuItems;
const api = "http://localhost:9000/";

export default function Theme() {
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
	const setTheme = (background, page) => {
		fetch(`${api}settheme/${localStorage.username}/${background}/${page}`);
		window.location.href = `http://localhost:3000/home`;
	}
	const themeList = menuItems.themes.map(item => {
		return <div key={item.name} className="theme-doc" onClick={() => setTheme(item.styles.background, item.styles.page)}>
			<p>{item.name}</p></div>
	});
  return (
    <div>
			<button onClick={() => {
				window.location.href = `http://localhost:3000/home`;
			}}>HOME</button>
      <div className="theme-docs">
				{themeList}
			</div>
    </div>
  );
}