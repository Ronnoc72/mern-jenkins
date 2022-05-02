import React, {useState} from "react";
import "../styles/toolbar.css";

export default function ZoomEvent() {
	const [zoomAmount, setZoomAmount] = useState("55%");
	const handleInput = (e) => {
		const paper = document.querySelectorAll(".paper")[0];
  	paper.style.width = parseInt(e.target.value)*5+40+'%';
		setZoomAmount(parseInt(e.target.value)*5+40+'%');
	}
	return (
			<span id="zoom-window">
				<div id="zoom-id" className="center align">
					<label id="zoom-id" for="zoom" style={{fontSize: "24px"}}>Zoom: </label>
          <input type="range" name="zoom" min="1" max="5" step="1" id="zoom-id" onInput={handleInput} />
        </div>
				<div id="zoom-id" className="center">
					<p>{zoomAmount}</p>
				</div>
			</span>
		);
}