import LineChart from "../components/LineChart";
import Chart from "chart.js/auto";
// import { Data } from "../utils/Data";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ButtonIcon from "../components/ButtonIcon";

Chart.register(CategoryScale);

const Dashboard = () => {
	const navigate = useNavigate();

	const [compName, setCompName] = useState("");
	const [compLogo, setCompLogo] = useState("");
	const [compSlogan, setCompSlogan] = useState("");

	const [saleAmt, setSaleAmt] = useState(0);
	const [productAmt, setProductAmt] = useState(0);
	const [totalSale, setTotalSale] = useState(0);

	useEffect(() => {
		fetch("https://factucomperu.onrender.com/dashboard", {
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
				setCompName(data.comp.name);
				setCompLogo(data.comp.logo);
				setCompSlogan(data.comp.slogan);
				setProductAmt(data.misc.products_length);
				setSaleAmt(data.misc.sales_length);
				setTotalSale(data.misc.total_sell);
				setChartData({
					labels: data.chartData.map((data) => data.day),
					datasets: [
						{
							data: data.chartData.map((data) => data.net_sell),
							backgroundColor: [
								"rgba(75,192,192,1)",
								"#50AF95",
								"#f3ba2f",
								"#2a71d0",
							],
							borderColor: "#FCFCFC",
							borderWidth: 2,
						},
					],
				});
				// console.log(data.chartData)
				// console.log(data)
			});
	}, []);

	const [chartData, setChartData] = useState({
		labels: [].map((data) => data.day),
		datasets: [
			{
				data: [].map((data) => data.net_sell),
				backgroundColor: [
					"rgba(75,192,192,1)",
					"#50AF95",
					"#f3ba2f",
					"#2a71d0",
				],
				borderColor: "#FCFCFC",
				borderWidth: 2,
			},
		],
	});

	return (
		<>
			<Header name={compName} logo={compLogo} slogan={compSlogan} />
			<div className="dashboard">
				<div className="left-half">
					<LineChart className="line-chart" chartData={chartData} />
					<div className="monthly-data">
						<div className="data-card datacard-ventas">
							<img src="./src/assets/icons/cart.svg"></img>
							{saleAmt} venta{saleAmt == 1 ? "" : "s"}
						</div>
						<div className="data-card datacard-productos">
							<img src="./src/assets/icons/cube.svg"></img>
							{productAmt} producto{productAmt == 1 ? "" : "s"}
						</div>
						<div className="data-card datacard-ganancia">
							<img src="./src/assets/icons/dollar.svg"></img>S/ {totalSale} de
							venta
						</div>
					</div>
				</div>
				<div className="right-half">
					<div className="todo-list">
						<div className="todo-list-header">
							<p className="todo-list-title">To-Do List</p>
							<ButtonIcon
								className="todo-list-additem"
								icon="./src/assets/icons/plus.svg"
								onClick={() => {
									let list = document.getElementsByClassName("todo-list-list");
									//list[0].childElementCount

									let newItem = document.createElement("li");
									let inputText = document.createElement("input");
									let inputCheckBox = document.createElement("input");
									newItem.className = "todo-list-item";
									inputText.type = "text";
									inputCheckBox.type = "checkbox";
									inputText.className = "todo-list-new-item-text";
									inputCheckBox.className = "todo-list-new-item-checkbox";
									newItem.appendChild(inputText);
									newItem.appendChild(inputCheckBox);
									list[0].appendChild(newItem);
								}}></ButtonIcon>
							{/* <button>+</button> */}
						</div>
						<ul className="todo-list-list" id="todoList">
							<li className="todo-list-item">
								Terminar factura <input type="checkbox"></input>
							</li>
							<li className="todo-list-item">
								Escanear nuevos productos <input type="checkbox"></input>
							</li>
							<li className="todo-list-item">
								Hacer pedido al provedor <input type="checkbox"></input>
							</li>
						</ul>
					</div>
					<div className="online-employees">
						<div className="online-employees-header">
							<div className="online-employees-title">Online Employees</div>
						</div>
						<ul className="online-employees-list">
							<li className="employee-item">Tobias Abregu</li>
							<li className="employee-item">Mario Huamani</li>
							<li className="employee-item">Christopher Acosta</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
