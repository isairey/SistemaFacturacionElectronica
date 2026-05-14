import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");
	return (
		<>
			<div className="register-wrapper">
				<img src="../../fcp.svg" className="register-logo"></img>
				<h2>Acceso al sistema</h2>
				<form className="register-form" method="POST" onSubmit={handleSubmit}>
					<label className="register-label">Nombre de la empresa</label>
					<input
						name="compname"
						type="text"
						className="register-companyName register-input"
						placeholder="Nombre"></input>
					<label className="register-label">
						Correo del dueño de la empresa
					</label>
					<input
						name="email"
						type="email"
						className="register-ownerEmail register-input email"
						placeholder="Correo"></input>
					<label className="register-label">Contraseña para la cuenta</label>
					<input
						name="password"
						type="password"
						className="register-ownerPassword register-input password"
						placeholder="Contraseña"></input>
					{/* <label className="register-label">Confirmar contraseña</label> */}
					{/* <input type="password" className="register-ownerPasswordConfirm register-input password" placeholder="Confirmar contraseña"></input> */}
					<label className="register-label">
						Nombre de usuario del(a) duen@
					</label>
					<input
						name="username"
						type="text"
						className="register-ownerUsername register-input"
						placeholder="Nombre de usuario"></input>
					{/* <label className="register-label">Logo de la empresa</label> */}
					{/* <input type="file" className="register-companyLogo register-input" placeholder="Logo de la empresa"></input> */}
					<input
						type="submit"
						className="register-button register-input"
						value="Crear Empresa"></input>
					<p className="login-error-message">{errorMessage}</p>
				</form>
				<p>
					Buscando <Link to="/login">ingresar?</Link>
				</p>
			</div>
		</>
	);

	function handleSubmit(e) {
		e.preventDefault();
		let email = document.querySelector('[name="email"]').value;
		let password = document.querySelector('[name="password"]').value;
		let compname = document.querySelector('[name="compname"]').value;
		let username = document.querySelector('[name="username"]').value;
		// console.log(email, password);
		fetch("https://factucomperu.onrender.com/register", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, compname, username }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					navigate("/login");
				} else {
					setErrorMessage(data.message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
};

export default Register;

//Este seria para que se cree una empresa, iria un formulario de registro

//Nombre de empresa
//Correo para la cuenta del dueño
//Contraseña de la cuenta
//Nombre de usuario del dueño
//Logo de la empresa
//RUC (Opcional)
//Slogan (opcional)
//Direccion (Opcional)
//Numero de contacto (Opcional)
//Correo de contacto (Opcional)
//Horario de atencion (Opcional)
//Aniversario de la empresa (Opcional)
