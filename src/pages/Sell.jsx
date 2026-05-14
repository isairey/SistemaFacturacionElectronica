/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Table from "../components/Table";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sell = () => {
	const navigate = useNavigate();
	const [compName, setCompName] = useState("");
	const [compLogo, setCompLogo] = useState("");
	const [compSlogan, setCompSlogan] = useState("");

	const [client, setClient] = useState("00000000");
	const [saleID, setSaleID] = useState("");
	const [date, setDate] = useState("");
	const [cashier, setCashier] = useState("");
	const [products, setProducts] = useState([]);
	const [shownProducts, setShownProducts] = useState({});
	const [debugText, setDebugText] = useState("");
	const [note, setNote] = useState("");

	useEffect(() => {
		fetch("https://factucomperu.onrender.com/sell", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `${window.sessionStorage.getItem("token")}`,
				// 'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify({
				comp_id: window.sessionStorage.getItem("comp_id"),
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
					let date = new Date();

					setCompName(data.comp.name);
					setCompLogo(data.comp.logo);
					setCompSlogan(data.comp.slogan);

					setProducts(reorganizeProductObject(data.products));

					setSaleID(`V001-${data.sales.length + 1}`);
					setDate(
						`${date.getDate()}/${date.getMonth() + 1}/${date
							.getFullYear()
							.toString()
							.substring(2, 4)}`
					);
					setCashier(window.sessionStorage.getItem("username"));
				} else {
					console.log(data.message);
				}
			});
	}, []);

	const handleOnSelect = (item) => {
		if (shownProducts[item.id]) return;
		item.amount = 1;
		item.discount = 0;
		item.total = item.price * item.amount - item.discount;
		shownProducts[item.id] = item;
		setShownProducts(shownProducts);
		updateTable();
	};

	const formatResult = (item) => {
		return (
			<>
				<span style={{ fontSize: "1rem", display: "block", textAlign: "left" }}>
					{item.name} - {item.brand}
				</span>
				<span
					style={{
						fontSize: "0.8rem",
						display: "block",
						textAlign: "left",
					}}>
					{item.model} - {item.stock} - S/{item.price}
				</span>
			</>
		);
	};

	function reorganizeProductObject(products) {
		let returnArray = [];
		for (let product of products) {
			returnArray.push({
				id: product.id,
				name: product.name,
				brand: product.brand,
				model: product.model,
				price: product.sell_price,
				stock: product.stock,
			});
		}

		return returnArray;
	}

	return (
		<div className="sell-wrapper">
			<Header name={compName} logo={compLogo} slogan={compSlogan} />
			<div className="sell-wrapper-2">
				<div className="sell-left">
					<h2 className="sell-left-title">Informacion</h2>
					<input
						className="sell-left-info"
						type="text"
						placeholder="ID de venta"
						value={saleID}
						readOnly
					/>
					<input
						className="sell-left-info"
						type="text"
						placeholder="Fecha"
						value={date}
						readOnly
					/>
					<input
						className="sell-left-info"
						type="text"
						placeholder="DNI"
						value={client}
						readOnly
					/>
					<input
						className="sell-left-info"
						type="text"
						placeholder="Cajer@"
						value={cashier}
						readOnly
					/>
					<input
						onChange={(e) => setNote(e.target.value)}
						className="sell-left-info"
						type="text"
						placeholder="Nota adicional"
					/>
					<button className="sell-button" onClick={makeSale}>
						Vender
					</button>
				</div>
				<div className="sell-right">
					<div className="sell-search-wrapper">
						<ReactSearchAutocomplete
							placeholder="Buscar..."
							className="autocomplete-search"
							items={products}
							onSelect={handleOnSelect}
							autoFocus
							formatResult={formatResult}
						/>
					</div>
					<Table
						data={shownProducts}
						type="vender"
						handleChange={handleOnChange}
						handleDelete={handleOnDelete}
						className="sell-table"
					/>
				</div>
			</div>
		</div>
	);

	function makeSale() {
		// let saleContent = [];
		let outProducts = {};
		for (let product in shownProducts) {
			// shownProducts[product]
			outProducts[product] = {
				amt: parseInt(shownProducts[product].amount),
				unit_price: parseFloat(shownProducts[product].price),
				discount: parseFloat(shownProducts[product].discount),
			};
			// let a = { "1": { "amt": 2, "unit_price": 180, "discount": 10 } }
		}
		var pad = function (num) {
			return ("00" + num).slice(-2);
		};
		var date;
		date = new Date();
		date =
			date.getFullYear() +
			"-" +
			pad(date.getMonth() + 1) +
			"-" +
			pad(date.getDate()) +
			" " +
			pad(date.getHours()) +
			":" +
			pad(date.getMinutes()) +
			":" +
			pad(date.getSeconds());
		console.log(date);
		let saleContent = {
			id: `${saleID}|${window.sessionStorage.getItem("comp_id")}`,
			client: client,
			date: date,
			cashier: cashier,
			products: JSON.stringify(outProducts),
			note: note,
			comp_id: window.sessionStorage.getItem("comp_id"),
		};
		// console.log(saleContent)
		// return
		fetch("https://factucomperu.onrender.com/sales", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `${window.sessionStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				comp_id: window.sessionStorage.getItem("comp_id"),
				saleID: saleID,
				saleContent: saleContent,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					//Place the sale pdf ready for printing
					navigate("/comprobantes");
				} else {
					alert(data.message);
				}
			});
	}

	function handleOnChange(e) {
		let id = e.target.name.split("|")[1];
		shownProducts[id][e.target.name.split("|")[0]] = e.target.value;
		shownProducts[id].total = (
			shownProducts[id].price * shownProducts[id].amount -
			shownProducts[id].discount
		).toFixed(2);
		setShownProducts(shownProducts);
		updateTable();
	}

	function handleOnDelete(e) {
		let id = e.target.name.split("|")[1];
		delete shownProducts[id];
		setShownProducts(shownProducts);
		updateTable();
	}

	function updateTable() {
		setDebugText(JSON.stringify(shownProducts, null, 2));
	}
};

export default Sell;
