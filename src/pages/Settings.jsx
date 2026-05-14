import Header from "../components/Header";

const Settings = () => {
	return (
		<div>
			<Header />

			<div className="config-wrapper">
				<form className="config-form">
					<h1>Settings</h1>
					<label className="config-label">Nombre de la empresa</label>
					<input type="text" className="config-input" name=""></input>
					<label className="config-label">Slogan</label>
					<input type="text" className="config-input" name=""></input>
					<label className="config-label">Logo</label>
					<input type="file" className="config-input" name=""></input>
					<label className="config-label">Anniversario de la empresa</label>
					<input type="date" className="config-input" name=""></input>
					<label className="config-label">RUC</label>
					<input type="text" className="config-input" name=""></input>
					<label className="config-label">Direccion</label>
					<input type="text" className="config-input" name=""></input>
					<label className="config-label">Numero de contacto</label>
					<input type="text" className="config-input" name=""></input>
					<label className="config-label">Correo de contacto</label>
					<input type="email" className="config-input" name=""></input>
					<label className="config-label">Horario de atencion</label>
					<input type="text" className="config-input" name=""></input>
					<input
						type="submit"
						className="config-submit config-input"
						value="Guardar"></input>
				</form>
			</div>
		</div>
	);
};

export default Settings;
