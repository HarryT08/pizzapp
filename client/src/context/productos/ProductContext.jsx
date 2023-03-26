import { createContext, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as productosServices from "@/services/productos/productos";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialProduct = {
  id: "",
  nombre: "",
  costo: [],
  selectedSizes: [],
};

export const SelectedProductContext = createContext({
  producto: initialProduct,
  setProducto: () => {},
  ingredientes: [],
  preparaciones: [],
  setPreparaciones: () => {},
});

const preparations = {
  pequeña: "Pequeña",
  mediana: "Mediana",
  grande: "Grande",
  unico: "Única",
};

export const ProductProvider = ({ children }) => {
  const methodsProducts=useForm()
  const [products, setProducts] = useState([]);
  const [action, setAction] = useState("create");
  const [producto, setProducto] = useState(initialProduct);
  const [preparaciones, setPreparaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPreparations, setSelectedPreparations] = useState(() =>
    producto.selectedSizes.map((item) => ({
      key: item,
      value: preparations[item],
    }))
  );
  const navigate = useNavigate();

  const handleCreate = () => {
    setAction("create");
    setProducto(initialProduct);
    setPreparaciones([]);
  };

  const handleUpdate = (producto) => {
    setAction("update");
    handleChangeProducto(producto);
  };

  const getProductos = async () => {
    try {
      const { data } = await productosServices.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeProducto = useCallback((producto) => {
    const { preparaciones, ...rest } = producto;

    setProducto(rest);
    setPreparaciones(preparaciones);
  }, []);


  const handleChangeValuesProducto=()=>{

  }
  const handleSubmit = async (valoresProducto) => {
/*     e.preventDefault(); */

  /*   if (producto.nombre.trim() === "") {
      return toast.error("El nombre del producto es obligatorio.");
    }

    if (!producto.costo) {
      return toast.error("El precio del producto es obligatorio.");
    }

    if (isNaN(producto.costo)) {
      return toast.error("El precio del producto no es válido.");
    }

    if (preparaciones.length === 0) {
      return toast.error("No se ha seleccionado ningún ingrediente.");
    }
 */
console.log("Valores producto:",valoresProducto)
    setLoading(true);

    try {
      const data = {
        id: producto.id,
        nombre: valoresProducto.nombre,
        costos: valoresProducto.costos,
        preparaciones,
      };
      
      if (action === "create") {
        await productosServices.createProduct(data);
        console.log("Data ->", data)
      } else if (action === "update") {
        await productosServices.updateProduct(data);
      }

      toast.success("Producto agregado correctamente");
      setPreparaciones([]);
      navigate("/admin/productos");
      getProductos();
    } catch (err) {
      toast.error("No se pudo guardar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const value = {
    products,
    producto,
    setProducto,
    preparaciones,
    setPreparaciones,
    handleCreate,
    onUpdate: handleUpdate,
    onSubmit: handleSubmit,
    loading,
    getProductos,
    setSelectedPreparations,
    selectedPreparations,
    preparations,
    methodsProducts

  };

  return (
    <SelectedProductContext.Provider value={value}>
      {children}
    </SelectedProductContext.Provider>
  );
};
