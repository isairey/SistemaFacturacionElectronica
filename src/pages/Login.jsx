import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");
	const [status, setStatus] = useState(200);
	// Show login form
	return (
		<div className="login-wrapper">
			<img src="../../fcp.svg" className="login-logo"></img>
			<h2>Acceso al sistema</h2>
			<form className="login-form" onSubmit={handleSubmit} method="POST">
				<input
					name="email"
					type="text"
					className="login-username login-input"
					placeholder="Correo"></input>
				<p className="login-error-message">
					{status == 404 ? errorMessage : ""}
				</p>
				<input
					name="password"
					type="password"
					className="login-password login-input"
					placeholder="Contraseña"></input>
				<p className="login-error-message">
					{status == 401 ? errorMessage : ""}
				</p>
				<input
					type="submit"
					className="login-button login-input"
					value="Acceder"></input>
			</form>
			<p>
				Buscando <Link to="/register">registrar una empresa?</Link>
			</p>
		</div>
	);

	function handleSubmit(e) {
		e.preventDefault();
		let email = document.querySelector('[name="email"]').value;
		let password = document.querySelector('[name="password"]').value;
		// console.log(email, password);
		fetch("https://factucomperu.onrender.com/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				// 'Access-Control-Allow-Origin': 'https://factucomperu.onrender.com/login',
				// 'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify({ email, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				if (data.success) {
					navigate("/dashboard");
					window.sessionStorage.setItem("token", data.token);
					window.sessionStorage.setItem("comp_id", data.comp_id);
					window.sessionStorage.setItem("username", data.username);
					// console.log(data.username)
				} else {
					setErrorMessage(data.message);
					setStatus(data.status);
					// console.log(data.status);document.getElementById("modal").close();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
};

export default Login;
