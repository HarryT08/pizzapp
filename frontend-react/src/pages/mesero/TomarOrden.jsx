import {useState} from 'react'
import { TableCarritoProductos, TableProductosMesero } from "../../components";
import {productos} from '../../data/datos'

const TomarOrden = () => {

    const [products, setProducts] = useState(productos)
    const [carrito, setCarrito] = useState([])

    return (
        <div>
            <div className="mb-10">
                <TableCarritoProductos carrito={carrito} setCarrito={setCarrito}/>
            </div>
            <div>
                <TableProductosMesero products={products} setProducts={setProducts} carrito={carrito} setCarrito={setCarrito}/>
            </div>
        </div>
    );
};

export default TomarOrden;
