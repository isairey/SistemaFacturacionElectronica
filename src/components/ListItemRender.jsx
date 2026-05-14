import { useState } from "react";

function ListItemRender(prop) {
	const [discount, setDiscount] = useState(0);
	const [cantidad, setCantidad] = useState(1);

	return (
		<tr className="table-row">
			<td className="table-data listitem">{prop.name}</td>
			<td className="table-data listitem">{prop.sell_price}</td>
			<td className="listitem">
				<textarea
					placeholder="Cantidad"
					defaultValue={cantidad}
					onChange={(e) => {
						let cant = parseInt(e.target.value);
						if (e.target.value == "" || isNaN(parseInt(e.target.value)))
							cant = 1;
						setCantidad(cant);
					}}
					max={parseInt(prop.amt)}
					className="table-data"></textarea>
			</td>

			<td className="listitem">
				<textarea
					type="number"
					placeholder="Descuento"
					defaultValue={discount}
					onChange={(e) => {
						let disc = parseInt(e.target.value);
						if (e.target.value == "" || isNaN(parseInt(e.target.value)))
							disc = 0;
						setDiscount(disc);
					}}
					className="table-data"></textarea>
			</td>

			<td className="table-data listitem">{cantidad * prop.sell_price - discount}</td>
		</tr>
	);
}

export default ListItemRender;
