import React, {useEffect} from "react";
import ToolBar from "./ToolBar";
import FontEvent from "./FontEvent";
import ZoomEvent from "./ZoomEvent";
import ColorEvent from "./ColorEvent";
import "../styles/newfile.css";
import menu from "../text.json";
const menuItems = menu.menuItems;
const api = "http://localhost:9000/";

// all event functions for the functionDataBase variable.
function clearEvent() {
  const input = document.getElementById("main-doc");
  input.value = "";
}

async function saveEvent() {
	// saves all the information about the element.
  const input = document.getElementById("main-doc");
	let title = document.getElementById("title").value;
	if (!title) {
		title = "Untitled Doc";
	}
	let styles = {};
	const styleKeys = Object.values(input.style);
	for (let key in styleKeys) {
		styles[styleKeys[key]] = input.style[styleKeys[key]];
	}
	// getting the index for the array that the document is in.
	const index = await fetch(`${api}getindex/${localStorage.username}/${title}/${input.value}/${JSON.stringify(styles)}`)
	.then(res => res.json()).then(res => res.index);
	fetch(`${api}save/${title}/${input.value}/${JSON.stringify(styles)}/${localStorage.username}/${index}`);
}

function homeEvent() {
	// takes the user back home.
  window.location.href = `http://localhost:3000/home`;
}

function fontEvent() {
	// creates a window that the user can customize the font.
  const span = document.getElementById("font-window");
  span.style.display = "block";
}

function colorEvent() {
	// creates a window for the user to change the color of the text.
	const span = document.getElementById("color-window");
  span.style.display = "block";
}

function zoomEvent() {
	// creates a window that the user can customize their workspace.
  const span = document.getElementById("zoom-window");
  span.style.display = "block";
}

export default function NewFile({match}) {
	useEffect(() => {
		loadTheme();
		if (match.params.open) {
			loadInfo();
		}
	})
	const loadTheme = async () => {
		const data = await fetch(`${api}gettheme/${localStorage.username}`)
		.then(res => res.json());
		const theme = data.theme;
		const root = document.querySelector(":root");
		root.style.setProperty("--background-c", theme.background);
		root.style.setProperty("--paper-c", theme.page);
	}
	const loadInfo = async () => {
		// loads all the information the document exists.
		const info = await fetch(`${api}openfile/${localStorage.username}/${localStorage.fileID}`)
		.then(res => res.json())
		.catch(err => console.log(err));
		const mainDoc = document.getElementById('main-doc');
		mainDoc.value = info.doc.text;
		const parsedStyle = JSON.parse(info.doc.styles)
		const styleKeys = Object.keys(parsedStyle);
		for (let s in styleKeys) {
			const camelCased = styleKeys[s].replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
			mainDoc.style[camelCased] = parsedStyle[styleKeys[s]];
		}
		document.getElementById('title').value = info.doc.title;
	}
	// fills the function database with all the events that the user can call.
	const functionDataBase = {}
  	menuItems.dropdown.forEach(obj => {
			const arr = Object.values(obj);
			arr[0].forEach(element => {
				switch (element) {
				case "Clear":
					functionDataBase[element] = clearEvent;
					break;
				case "Save":
					functionDataBase[element] = saveEvent;
					break;
				case "Home":
					functionDataBase[element] = homeEvent;
					break;
				case "Font":
					functionDataBase[element] = fontEvent;
					break;
				case "Color":
					functionDataBase[element] = colorEvent;
					break;
				case "Zoom":
					functionDataBase[element] = zoomEvent;
					break;
				}
			});
  	});
    return (
        <div className="newfile" id="newfile">
            <ToolBar functionDataBase={functionDataBase} />
            <br />
            <div className="paper" id="paper">
              <textarea id="main-doc"></textarea>
            </div>
            <FontEvent />
						<ZoomEvent />
						<ColorEvent />
        </div>
    );
}
