import React from "react";
import "../styles/toolbar.css";
import menu from "../text.json";
const menuItems = menu.menuItems;

function handleClick(e) {
  if (document.getElementById("dropdown")) {
    if (e.target.id === "dropitem") return;
    const toolbar = document.getElementById("toolbar");
    toolbar.removeChild(document.getElementById("dropdown"));
  }
  if (document.getElementById("font-window").style.display === "block") {
    if (e.target.id === "font-window" || e.target.id === "font-id") return;
    document.getElementById("font-window").style.display = "none";
  }
  if (document.getElementById("zoom-window").style.display === "block") {
    if (e.target.id === "zoom-window" || e.target.id === "zoom-id") return;
    document.getElementById("zoom-window").style.display = "none";
  }
  if (document.getElementById("color-window").style.display === "block") {
    if (e.target.id === "color-window" || e.target.id === "color-id") return;
    document.getElementById("color-window").style.display = "none";
  }
}

export default function ToolBar(props) {
  document.onclick = handleClick;
  const listItems = menuItems.header.map(item => {
		return <div id={item} key={item} className="list-item" onClick={() => {
      const toolbar = document.getElementById("toolbar");
      const doc = document.getElementById(item);
      const rect = doc.getBoundingClientRect();
      if (document.getElementById("dropdown")) {
        toolbar.removeChild(document.getElementById("dropdown"));
      }
      const spanElm = document.createElement("span");
      spanElm.classList.add("dropdown");
      spanElm.id = "dropdown";
      spanElm.style.top = `${(rect.bottom-rect.top)+(rect.height*4-15)}px`;
      spanElm.style.left = `${rect.x}px`;
      spanElm.style.width = `${rect.width}px`;
      let objIndex = 0;
      menuItems.dropdown.forEach(obj => {
        if (Object.getOwnPropertyNames(obj)[0] === item.toLowerCase()) {
          objIndex = menuItems.dropdown.indexOf(obj);
        }
      });
      const objId = Object.values(menuItems.dropdown[objIndex]);
      objId[0].forEach(drop => {
        let p = document.createElement('p');
        p.onclick = props.functionDataBase[drop];
        p.id = "dropitem";
        p.style.width = `${rect.width}px`;
        let br = document.createElement("br");
        p.innerHTML = drop;
        spanElm.appendChild(p);
        spanElm.appendChild(br);
      });
      toolbar.appendChild(spanElm);
    }}>{item}</div>;
  });
  return (
    <div className="toolbar" id="toolbar">
	  <span className="dropdown" id="dropdown"></span>
      <input type="text" id="title" placeholder="Title"></input>
      <div className="list-items">
        {listItems}
      </div>
    </div>
  );
}
