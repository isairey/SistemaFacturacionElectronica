import { useEffect, useState } from "react"
import Header from "../Header"

const AppointmentsForm = (onSaveAppointment, appointment) => {
    const INITIAL_FORM_STATE = {
        name: '',
        brand:'',
        model:'',
        bought_price:'',
        sell_price:'',
        amt:''            
    }
    const [form, setForm] = useState(INITIAL_FORM_STATE)

    useEffect(() => {        
        if (Object.keys(appointment).length > 0) {
          setForm(appointment)
        }
    }, [appointment])

    const handleChange = (event) => {        
        const {name, value} = event.target
        setForm({...form,[name]: value})
    }

    const handleSaveAppointment = (e) => {
        e.preventDefault()
    
        const newAppointment = {
          ...form,
          id: crypto.randomUUID()
        }
    
        onSaveAppointment(newAppointment)
    
        setForm(INITIAL_FORM_STATE)
      }

    function filterProd(INITIAL_FORM_STATE,inputs) {
        let rArray= [];
        for (let piece of INITIAL_FORM_STATE) {
            let unjoinedStatements = [];
            for (let key in piece) unjoinedStatements.push(`piece.${key}.includes(inputs.${key})`);
            eval(`if (${unjoinedStatements.join(" && ")}) rArray.push(piece);`)
        }
        return rArray;
    }

    return (
        <>{/* <main><Header/></main>             */}
            <section className='BuscarProducto'>
                <form action="" onSubmit={handleSaveAppointment}>
                    <h3>Buscar Productos</h3>
                    
                    <p>Nombre: 
                        <input type="text" name='name' placeholder='Nombre de producto' value={form.name} onChange={handleChange} />
                    </p>
                    <p>Marca: 
                        <input type="text" name='brand' placeholder='Marca o nombre del producto' value={form.brand} onChange={handleChange} />
                    </p>                    
                    <p>Modelo: 
                        <input type="text" name='model' placeholder="Modelo del producto" value={form.model} onChange={handleChange} />
                    </p>
                    <p>Precio Compra: 
                        <input type="text" name='bought_price' placeholder="Precio de la compra" value={form.bought_price} onChange={handleChange} />
                    </p>
                    <p>Precio Venta: 
                        <input type="text" name='sell_price'  placeholder="Precio al público" value={form.sell_price} onChange={handleChange} />
                    </p>
                    <p>Stock: 
                        <input type="text" name='amt' placeholder='Stock' value={form.amt} onChange={handleChange} />
                    </p>
                    <input type="submit" value="Guardar" />
                    <input type="submit" value="+Nuevo" />
                    
                    
                    
                </form>
                <pre>{JSON.stringify(form,null,2)}</pre>
            </section>
        </>
    )
}

export default AppointmentsForm