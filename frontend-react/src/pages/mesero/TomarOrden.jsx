import {useState, useEffect} from 'react'
import { instance } from '../../api/api';
import { TableCarritoProductos, TableProductosMesero } from "../../components";


const TomarOrden = () => {

    const [products, setProducts] = useState([])
    const [carrito, setCarrito] = useState([])

    // show products
    const getProducts = async () => {
        try{
            const response = await instance.get('/productos');
            setProducts(response.data);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

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
