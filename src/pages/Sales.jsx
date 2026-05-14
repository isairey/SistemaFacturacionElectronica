import Header from "../components/Header";
// import ventaData from "../ventas.json";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sales = () => {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [globalData, setGlobalData] = useState([]);

	const [compName, setCompName] = useState("");
	const [compLogo, setCompLogo] = useState("");
	const [compSlogan, setCompSlogan] = useState("");

	useEffect(() => {
		fetch(
			`https://factucomperu.onrender.com/sales/${window.sessionStorage.getItem(
				"comp_id"
			)}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `${window.sessionStorage.getItem("token")}`,
					// 'Access-Control-Allow-Credentials': 'true',
				},
			}
		)
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
					setData(convertData(data.sales, "ventas"));
					setGlobalData(convertData(data.sales, "ventas"));
					setCompName(data.comp.name);
					setCompLogo(data.comp.logo);
					setCompSlogan(data.comp.slogan);
				}
				// else console.log(data.message);
			});
	}, []);

	function searchVentas(event) {
		event.preventDefault();
		let date =
			event.target[0].value == ""
				? event.target[0].value
				: `${event.target[0].value.split("-")[1]}/${
						event.target[0].value.split("-")[2]
				}/${event.target[0].value.split("-")[0]}`;

		let client = event.target[1].value;
		let totalSale = event.target[2].value;
		let note = event.target[3].value;
		let serie = event.target[4].value;

		let inputs = {};
		let passedNothing = true;
		if (date != "") {
			inputs.date = date;
			passedNothing = false;
		}
		if (client != "") {
			inputs.client = client;
			passedNothing = false;
		}
		if (totalSale != "") {
			inputs.totalSale = totalSale;
			passedNothing = false;
		}
		if (note != "") {
			inputs.note = note;
			passedNothing = false;
		}
		if (serie != "") {
			inputs.serie = serie;
			passedNothing = false;
		}
		if (passedNothing) setData(globalData);
		let convertedGlobalData = [];
		for (let data of globalData) {
			data.totalSale = data.totalSale.toString();
			convertedGlobalData.push(data);
		}
		setData(matchFilter(convertedGlobalData, inputs));
	}

	function convertData(data, type) {
		let arrayedData = [];
		for (let info in data) {
			if (type == "ventas") {
				let newObject = { serie: info };

				let date = new Date(data[info].date);

				newObject.date = `${date.getDate()}/${date.getMonth() < 10 ? "0" : ""}${
					date.getMonth() + 1
				}/${date.getFullYear()}`;
				newObject.client = data[info].client;
				newObject.note = data[info].note;
				let totalSale = 0;
				for (let product in data[info].products) {
					totalSale +=
						data[info].products[product].amt *
							data[info].products[product].unit_price -
						data[info].products[product].discount;
				}
				newObject.totalSale = totalSale;
				arrayedData.push(newObject);
			} else if (type == "itemList") {
				let newObject = { serie: info };

				let date = new Date(data[info].date);

				newObject.date = `${
					date.getMonth() < 10 ? "0" : ""
				}${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
				newObject.client = data[info].client;
				newObject.cashier = data[info].cashier;
				newObject.note = data[info].note;
				let totalSale = 0;
				for (let product in data[info].products) {
					totalSale +=
						data[info].products[product].amt *
							data[info].products[product].unit_price -
						data[info].products[product].discount;
				}
				newObject.totalSale = totalSale.toString();
				arrayedData.push(newObject);
			}
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

	return (
		<>
			<Header name={compName} logo={compLogo} slogan={compSlogan} />
			<div>
				<form className="search-form" onSubmit={searchVentas}>
					<input
						type="date"
						className="search-input"
						name="date"
						placeholder="dd/mm/yyyy"
						format="dd/mm/yyyy"></input>
					<input
						type="text"
						className="search-input"
						name="client"
						placeholder="Cliente"></input>
					<input
						type="text"
						className="search-input"
						name="totalSale"
						placeholder="Monto"></input>
					{/* <input type="text" name="products" placeholder="Productos"></input> */}
					<input
						type="text"
						className="search-input"
						name="note"
						placeholder="Nota"></input>
					<input
						type="text"
						className="search-input"
						name="id"
						placeholder="Serie"></input>
					<input type="submit" className="search-submit" value="Buscar"></input>
				</form>
			</div>
			<div className="separator"></div>
			<Table data={data} type="ventas" className="sales-table" />
		</>
	);
};

export default Sales;
