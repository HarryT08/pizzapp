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

export const ProductContext = createContext({
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
  const methodsProducts = useForm();
  const [category, setCategory] = useState("Producto");
  const [products, setProducts] = useState([]);
  const [action, setAction] = useState("create");
  const [producto, setProducto] = useState(initialProduct);
  const [preparaciones, setPreparaciones] = useState([]);
  const [listaCostoTamanio, setListaCostoTamanio] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    setAction("create");
    setProducto(initialProduct);
    setListaCostoTamanio([]);
  };

  const handleUpdate = (producto) => {
    setAction("update");
  };

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    setLoading(true);
    try {
      const { data } = await productosServices.getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async (valoresProducto) => {
    console.log("Valores producto:", valoresProducto);
    try {
      setLoading(true);
      const data = {
        id: valoresProducto.id,
        nombre: valoresProducto.nombre,
        costos: {
          ...valoresProducto.costos,
        },
        preparaciones: [],
      };

      if (action === "create") {
        // await productosServices.createProduct(data);
        console.log("Data create ->", data);
      } else if (action === "update") {
        console.log("Data update ->", data);
        // await productosServices.updateProduct(data);
      }

      toast.success("Producto agregado correctamente");
      setPreparaciones([]);
      // setTimeout(() => {
      //   getProductos();
      //   navigate("/admin/productos");
      // }, 1500);
      setLoading(false);
    } catch (err) {
      toast.error("No se pudo guardar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log("costoTamanio ->", listaCostoTamanio);

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
    action,
    preparations,
    methodsProducts,
    category,
    setCategory,
    listaCostoTamanio,
    setListaCostoTamanio,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
