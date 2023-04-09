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
  const methodsProducts = useForm();
  const [category, setCategory] = useState("Producto");
  const [products, setProducts] = useState([]);
  const [action, setAction] = useState("create");
  const [producto, setProducto] = useState(initialProduct);
  const [preparaciones, setPreparaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPreparations, setSelectedPreparations] = useState([]);
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

  const handleChangeProducto = useCallback((producto) => {
    const { preparaciones, ...rest } = producto;

    setProducto(rest);
    setPreparaciones(preparaciones);
  }, []);
  const handleSubmit = async (valoresProducto) => {
    console.log("Valores producto:", valoresProducto);
    setLoading(true);

    try {
      const data = {
        id: valoresProducto.id,
        nombre: valoresProducto.nombre,
        costos: valoresProducto.costos,
        preparaciones,
      };

      if (action === "create") {
        await productosServices.createProduct(data);
        console.log("Data ->", data);
      } else if (action === "update") {
        console.log("Tipo de accion update: ", action);
        console.log("DATA::", data);
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
    action,
    selectedPreparations,
    preparations,
    methodsProducts,
    category,
    setCategory,
  };

  return (
    <SelectedProductContext.Provider value={value}>
      {children}
    </SelectedProductContext.Provider>
  );
};
