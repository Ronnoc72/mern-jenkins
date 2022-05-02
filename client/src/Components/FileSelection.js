import React from "react";

export default function FileSelection() {
	const items = ["newfile", "theme", "history"];
	const url = "http://localhost:3000/"
	const divs = items.map(text => {
			return <div onMouseEnter={(e) => {
				let p = document.createElement("p");
				p.innerHTML = text;
				p.id = "p-element";
				e.target.appendChild(p);
		}} onMouseLeave={(e) => {
			if (!document.getElementById("p-element")) return;
			e.target.removeChild(document.getElementById("p-element"));
		}} onClick={() => {
			window.location.href = `${url+text}`;
		}} className="selection" key={text}></div>
	});
    return (
        <div className="file-selection">
					{divs}
        </div>
    );
}