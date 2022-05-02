import React from "react";
import "../styles/toolbar.css";
import menu from "../text.json";
const menuItems = menu.menuItems;

export default function ColorEvent() {
	const colorList = menuItems.colors.map(color => {
		return <div style={{color: color, WebkitTextStrokeWidth: "0.1px", WebkitTextStrokeColor: "black"}} 
		key={color} id="color-id" onClick={() => {
			const input = document.getElementById("main-doc");
			const span = document.getElementById("color-window");
			input.style.color = color;
			span.style.display = "none";
		}}>{color}</div>
	})
	return (
			<span id="color-window">
				<div id="color-id">
					{colorList}
        </div>
			</span>
		);
}