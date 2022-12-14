import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import { TableCarritoProductos, TableProductosMesero } from "../../components";

const TomarOrden = () => {
  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const getProductsOrder = async () => {
    try {
      const response = await instance.get("/productos/productsAndPreparations");
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductsOrder();
  }, []);

  return (
    <div>
      <div className="mb-10">
        {console.log("Esta es la informacion del carrito ->", carrito)}
        <TableCarritoProductos carrito={carrito} setCarrito={setCarrito} />
      </div>
      <div>
        <TableProductosMesero
          products={products}
          setProducts={setProducts}
          carrito={carrito}
          setCarrito={setCarrito}
        />
      </div>
    </div>
  );
};

export default TomarOrden;
