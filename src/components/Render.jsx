import React, { useEffect } from 'react'
import { useState } from 'react'
import ListItemRender from '../components/ListItemRender'
export const Render = ({ selectProduct }) => {
    const [list, setList] = useState([])
    
    return (
			<>
				<div>
					<button
						onClick={() => {
							setList([...list, selectProduct]);
						}}>
						Agregar
					</button>
				</div>
				<table className="table listitem-table">
					<thead className="table-head">
						<tr className="table-row">
							<th className="table-header">Nombre/Modelo</th>
							<th className="table-header">Precio de venta</th>
							<th className="table-header">Cantidad</th>
							<th className="table-header">Descuento</th>
							<th className="table-header">Total</th>
						</tr>
					</thead>
					<tbody className="table-body">
						{list.map((producto) => {
							return (
								<ListItemRender
									name={producto.name}
									sell_price={producto.sell_price}
									amt={producto.amt}
								/>
							);
						})}
					</tbody>
				</table>
			</>
		);
}
export default Render