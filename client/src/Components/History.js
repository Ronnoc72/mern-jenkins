import React, {useState, useEffect} from 'react';
import "../styles/history.css";
const api = "http://localhost:9000/";

export default function History() {
	const [documents, setDocuments] = useState("");
	useEffect(() => {
      loadInfo();
   	}, []);
	const loadInfo = async () => {
		// applying the theme for the page.
		const data = await fetch(`${api}gettheme/${localStorage.username}`)
    .then(res => res.json());
    const theme = data.theme;
    const root = document.querySelector(':root');
    root.style.setProperty("--background-c", theme.background);
    root.style.setProperty("--paper-c", theme.page);
		// fetching for the info for the page.
		const info = await fetch(`${api}history/${localStorage.username}`)
		.then((res) => res.json()).then(res => res.history)
		.catch((err) => console.log(err));
		let docs = [];
		for (let obj in info) {
			docs.push(info[obj].title);
		}
		setDocuments(docs.map(item => {
			let realItem = item;
			if (item.length > 9) {
				realItem = "";
				for (let i = 0; i < 8; i++) {
					realItem += item[i]
				}
				realItem += "..."
			}
			return <div onClick={() => {
				window.location.href = `http://localhost:3000/newfile/${item}`;
				localStorage.fileID = docs.indexOf(item);
			}} className="document" key={item}><p>{realItem}</p></div>
		}));
	}
	return (
		<div>
			<button onClick={() => {
				window.location.href = `http://localhost:3000/home`;
			}}>HOME</button>
			<div className="documents">
				{documents}
			</div>
		</div>
	);
}