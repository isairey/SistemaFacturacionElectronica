import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table";

const Products = () => {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [globalData, setGlobalData] = useState([]);
	const [dialogErrorMessage, setDialogErrorMessage] = useState("");

	const [compName, setCompName] = useState("");
	const [compLogo, setCompLogo] = useState("");
	const [compSlogan, setCompSlogan] = useState("");

	useEffect(() => {
		fetch("https://factucomperu.onrender.com/products", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `${window.sessionStorage.getItem("token")}`,
				// 'Access-Control-Allow-Credentials': 'true',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (
					!data.success &&
					(data.error == "TokenExpiredError" ||
						data.error == "CompanyIDNotFound")
				) {
					navigate("/login");
				}
				if (data.success) {
					setData(convertData(data.products));
					setGlobalData(convertData(data.products));
					setCompName(data.comp.name);
					setCompLogo(data.comp.logo);
					setCompSlogan(data.comp.slogan);
				}
				// else console.log(data.message);
			});
	}, []);

	function searchProducts(event) {
		event.preventDefault();
		let name = event.target[0].value;
		let brand = event.target[1].value;
		let model = event.target[2].value;
		let sell_price = event.target[3].value;

		let inputs = {};
		let passedNothing = true;
		if (name != "") {
			inputs.name = name;
			passedNothing = false;
		}
		if (brand != "") {
			inputs.brand = brand;
			passedNothing = false;
		}
		if (model != "") {
			inputs.model = model;
			passedNothing = false;
		}
		if (sell_price != "") {
			inputs.sell_price = sell_price;
			passedNothing = false;
		}
		if (passedNothing) setData(globalData);
		let convertedGlobalData = [];
		for (let data of globalData) {
			data.sell_price = data.sell_price.toString();
			convertedGlobalData.push(data);
		}
		setData(matchFilter(convertedGlobalData, inputs));
	}

	function convertData(data) {
		let arrayedData = [];
		for (let obj of data) {
			arrayedData.push({
				name: obj.name,
				brand: obj.brand,
				model: obj.model,
				sell_price: obj.sell_price,
			});
		}
		return arrayedData;
	}

	function matchFilter(data, filters) {
		return data.filter((obj) => {
			const keys = Object.keys(filters);
			return keys.every((key) =>
				obj[key].toLowerCase().includes(filters[key].toLowerCase())
			);
		});
	}

	function createProduct(e) {
		e.preventDefault();
		console.log(e);
		let name = e.target[0].value;
		let brand = e.target[1].value;
		let model = e.target[2].value;
		let bought_price = parseFloat(e.target[3].value);
		let sell_price = parseFloat(e.target[4].value);
		let stock = parseInt(e.target[5].value);
		let id = `${model}|${brand}|${window.sessionStorage.getItem("comp_id")}`;

		if (isNaN(bought_price))
			return setDialogErrorMessage("El precio de compra es invalido");
		if (isNaN(sell_price))
			return setDialogErrorMessage("El precio de venta es invalido");
		if (isNaN(stock))
			return setDialogErrorMessage("La cantidad de stock es invalido");
		fetch(`https://factucomperu.onrender.com/products/${id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `${window.sessionStorage.getItem("token")}`,
				// 'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify({
				createProductContent: {
					name,
					brand,
					model,
					bought_price,
					sell_price,
					stock,
					comp_id: window.sessionStorage.getItem("comp_id"),
				},
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (
					!data.success &&
					(data.error == "TokenExpiredError" ||
						data.error == "CompanyIDNotFound")
				) {
					navigate("/login");
				}
				if (data.success) {
					document.getElementById("modal").close();
					window.location.reload(false);
					return true;
				} else if (data.error == "Product already exists")
					return setDialogErrorMessage(
						`Este producto con modelo ${model} y marca ${brand} ya existe`
					);
				// else console.log(data.message);
			});
	}

	return (
		<>
			<Header name={compName} logo={compLogo} slogan={compSlogan} />
			<div>
				<form className="search-form" onSubmit={searchProducts}>
					<input
						type="text"
						className="search-input"
						name="name"
						placeholder="Nombre"></input>
					<input
						type="text"
						className="search-input"
						name="brand"
						placeholder="Marca"></input>
					<input
						type="text"
						className="search-input"
						name="model"
						placeholder="Modelo"></input>
					<input
						type="text"
						className="search-input"
						name="sell_price"
						placeholder="Precio (Venta)"></input>
					<input type="submit" className="search-submit" value="Buscar"></input>
					<button
						onClick={() => {
							//get dialog id
							//open dialog as modal
							document.getElementById("modal").showModal();
						}}
						className="search-button">
						Nuevo +
					</button>
				</form>
			</div>
			<div className="separator"></div>
			<Table data={data} type="productos" className="sales-table" />
			<dialog id="modal">
				<h2>Crear un producto (falta arreglar diseño aca)</h2>
				<form
					id="create-product-form"
					className="create-form"
					onSubmit={createProduct}>
					<label className="create-form-label" htmlFor="name">
						Nombre
					</label>
					<label className="create-form-label" htmlFor="brand">
						Marca
					</label>
					<label className="create-form-label" htmlFor="model">
						Modelo
					</label>
					<input
						required
						className="create-form-input"
						name="name"
						placeholder="Nombre"></input>
					<input
						required
						className="create-form-input"
						name="brand"
						placeholder="Marca"></input>
					<input
						required
						className="create-form-input"
						name="model"
						placeholder="Modelo"></input>
					<label className="create-form-label" htmlFor="bought_price">
						Precio (Compra)
					</label>
					<label className="create-form-label" htmlFor="sell_price">
						Precio (Venta)
					</label>
					<label className="create-form-label" htmlFor="stock">
						Stock
					</label>
					<input
						type="text"
						required
						className="create-form-input"
						name="bought_price"
						placeholder="Precio de compra"></input>
					<input
						type="text"
						required
						className="create-form-input"
						name="sell_price"
						placeholder="Precio de venta"></input>
					<input
						type="number"
						required
						className="create-form-input"
						name="stock"
						placeholder="Cantidad del producto"></input>
				</form>
				<div className="create-product-buttons">
					<button
						onClick={() => {
							//close dialog
							document.getElementById("modal").close();
						}}>
						Cerrar
					</button>
					<button type="submit" form="create-product-form">
						Crear
					</button>
					<p className="create-product-dialog-error-message">
						{dialogErrorMessage}
					</p>
				</div>
			</dialog>
		</>
	);
};

export default Products;
