import ButtonIcon from "../components/ButtonIcon";
// import { useState } from 'react';

function Table(data) {
	let tableData = data.data;
	// console.log(tableData)
	data.type == "ventas";
	if (data.type == "ventas") {
		tableData = tableData.reverse();
		return (
			<table className="table">
				<thead className="table-head">
					<tr
						key="tablehead"
						className="table-row"
						style={{ "gridTemplateColumns": "1fr 1fr 1fr 1fr 1fr 1fr" }}>
						<th className="table-header">Serie</th>
						<th className="table-header">Cliente</th>
						<th className="table-header">Fecha</th>
						<th className="table-header">Monto</th>
						<th className="table-header">Nota</th>
						<th className="table-header">Opciones</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{tableData.map((item) => {
						// console.log(item)
						return (
							<tr
								key={item.serie}
								className="table-row"
								style={{ "gridTemplateColumns": "1fr 1fr 1fr 1fr 1fr 1fr" }}>
								<td className="table-data">{item.serie}</td>
								<td className="table-data">{item.client}</td>
								<td className="table-data">{item.date}</td>
								<td className="table-data">{item.totalSale}</td>
								<td className="table-data">{item.note}</td>
								<td className="table-data">
									<ButtonIcon icon="./src/assets/icons/print.svg" />
									{/* This will open a new window with the pdf thing */}
									<ButtonIcon icon="./src/assets/icons/trash.svg" />
									{/* This will delete the thing but first asking for confirmation*/}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	} else if (data.type == "vender") {
		return (
			<table className="table">
				<thead className="table-head">
					<tr className="table-row" style={{ 'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
						<th className="table-header">Nombre</th>
						<th className="table-header">Marca</th>
						<th className="table-header">Precio</th>
						<th className="table-header">Cantidad</th>
						<th className="table-header">Descuento</th>
						<th className="table-header">Total</th>
						<th className="table-header">Opciones</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{Object.keys(tableData).map((item) => {
						// console.log(tableData[item])
						return (
							<tr
								key={tableData[item].id}
								className="table-row"
								style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr" }}>
								<td className="table-data">{tableData[item].name}</td>
								<td className="table-data">{tableData[item].brand}</td>
								<td className="table-data">{tableData[item].price}</td>
								<td className="table-data">
									<input
										className="input-sell"
										type="number"
										name={`amount|${tableData[item].id}`}
										onChange={data.handleChange}
										min="1"
										max={tableData[item].stock}
										defaultValue={tableData[item].amount}></input>
								</td>
								<td className="table-data">
									<input
										className="input-sell"
										type="number"
										name={`discount|${tableData[item].id}`}
										onChange={data.handleChange}
										min="0"
										defaultValue={tableData[item].discount}></input>
								</td>
								<td className="table-data">{tableData[item].total}</td>
								<td className="table-data">
									<ButtonIcon name={`delete|${tableData[item].id}`} onClick={data.handleDelete} icon="./src/assets/icons/trash.svg" />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	} else if (data.type == "productos") {
		return (
			<table className="table">
				<thead className="table-head">
					<tr
						key="tablehead"
						className="table-row"
						style={{ "gridTemplateColumns": "1fr 1fr 1fr 1fr 1fr" }}>
						<th className="table-header">Nombre</th>
						<th className="table-header">Marca</th>
						<th className="table-header">Modelo</th>
						<th className="table-header">Precio</th>
						<th className="table-header">Opciones</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{tableData.map((item) => {
						// console.log(item)
						return (
							<tr key={item.id} className="table-row" style={{ "gridTemplateColumns": "1fr 1fr 1fr 1fr 1fr" }}>
								<td className="table-data">{item.name}</td>
								<td className="table-data">{item.brand}</td>
								<td className="table-data">{item.model}</td>
								<td className="table-data">{item.sell_price}</td>
								<td className="table-data">
									<ButtonIcon icon="./src/assets/icons/trash.svg" />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default Table;
