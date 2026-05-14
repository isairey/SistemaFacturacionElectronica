/* eslint-disable react/prop-types */
const AppointmentsList = ({ appointments, onRemove, onEdit }) => {
    if (appointments.length === 0) {
        return (
            <section>
                <h4>Lista de Productos</h4>
                <div>No hay productos</div>
            </section>
        )
    }
    return (
        <section>
            <h4>Lista de Productos</h4>
            <div>
                {appointments.map(appointment => {
                    return (
                        <div key={appointment.id}>
                            <div>
                                <div>
                                    <strong>Nombre:</strong>{appointment.name}
                                </div>
                                <div>
                                    <strong>Marca:</strong>{appointment.brand}
                                </div>
                                <div>
                                    <strong>Modelo:</strong>{appointment.model}
                                </div>
                                <div>
                                    <strong>Precio de Compra:</strong>{appointment.bought_price}
                                </div>
                                <div>
                                    <strong>Precio Venta:</strong>{appointment.sellprice}
                                </div>
                                <div>
                                    <strong>Stock:</strong>{appointment.amt}
                                </div>                                                             
                            </div>

                            <div>
                                <button onClick={()=> onEdit(appointment)}>Editar</button>
                                <button onClick={()=> onRemove(appointment)}>Eliminar</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>    
    )
}

export default AppointmentsList 