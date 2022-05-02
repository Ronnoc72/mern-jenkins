import React, { useState } from 'react';
import "../styles/login.css";
const api = "http://localhost:9000/";

function Login() {
	const [confirmed, setConfirmed] = useState("");
	// logs in the user by checking the database, them redirects the user.
	const confirmLogin = (e) => {
		e.preventDefault();
		let arr = [];
		const children = e.target.children[0].children[0].children;
		for (let i = 0; i < children.length; i++) {
			if (typeof(children[i].value) === "string") arr.push(children[i].value);
		}
		fetch(`${api}login/${arr[0]}/${arr[1]}`)
		.then(res => res.json()).then(res => {
			if (res.mes === "Logged In") {
				window.location.href = `http://localhost:3000/home`;
			} else {
				alert(res.mes);
			}
		});
		localStorage.username = arr[0];
	}
	// creates a new account for the user and redirects them.
	const registerAccount = (e) => {
		e.preventDefault();
		let arr = [];
		const children = e.target.children[0].children[0].children;
		for (let i = 0; i < children.length; i++) {
			if (typeof(children[i].value) === "string") arr.push(children[i].value);
		}
		if (arr[2] === arr[1]) {
			setConfirmed("");
			fetch(`${api}register/${arr[0]}/${arr[1]}`)
			.then(res => {
				if (res) {
					return res.json();
				}
			}).then(res => setConfirmed(`Username: ${res.user} is taken`));
		} else {
			setConfirmed("Passwords do not match.");
		}
	}
	const fetchPassword = async () => {
		const username = document.getElementById('forgot-pass-text').value;
		const password = await fetch(`${api}getpassword/${username}`)
		.then(res => res.json());
		document.getElementById("output").innerHTML = password.password;
	}
	return (
		<div className="main">
			<div className="section">
				<h1>Login</h1>
				<div className="center">
					<form onSubmit={confirmLogin}>
						<div>
							<div>
								<input name="username" type="text" placeholder="Username" required />
								<input name="password" type="password" placeholder="Password" required />
							</div>
							<button>Login</button>
						</div>
					</form>
				</div>
				<div className="center">
					<a onClick={() => {
						const passwordWindow = document.getElementById('forgot-pass');
						if (passwordWindow.style.display === 'block') {
							passwordWindow.style.display = 'none';
							return;
						}
						passwordWindow.style.display = 'block';
					}}>Forgot Password</a>
				</div>
			</div>
			<div className="section">
				<h1>Register</h1>
				<div className="center">
					<form onSubmit={registerAccount} method="get">
						<div>
							<div>
								<input name="username" type="text" placeholder="Username" required />
								<input name="password" type="password" placeholder="Password" required />
								<input name="confirm-password" type="password" placeholder="Comfirm Password" required />
							</div>
							<button>Register</button>
						</div>
					</form>
				</div>
				<div id="password">
					{<div className="center-absolute"><p>{confirmed}</p></div>}
				</div>
			</div>
			<div id="forgot-pass">
				<input id="forgot-pass-text" type="text"></input>
				<button onClick={fetchPassword}>Fetch Password</button>
				<p id="output"></p>
			</div>
		</div>
	);
}

export default Login;