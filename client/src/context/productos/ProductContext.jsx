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

  console.log("Preparaciones:", preparaciones);

  const handleCreate = () => {
    setAction("create");
    setProducto(initialProduct);
    setPreparaciones([]);
  };

  const handleUpdate = (producto) => {
    setAction("update");
    handleChangeProducto(producto);
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

  const handleChangeProducto = useCallback((producto) => {
    const { preparaciones, ...rest } = producto;

    setProducto(rest);
    setPreparaciones(preparaciones);
  }, []);

  const handleSubmit = async (valoresProducto) => {
    console.log("Valores producto:", valoresProducto);
    let costosFormateados = {}
    if (action === "update") {
      const costos = valoresProducto.selectedSizes.map((size) => {
        return {
          size,
          price: valoresProducto.costos[size],
        };
      });

      const costosFiltrados = costos.filter((costo) => {
        return selectedPreparations.some((preparation) => {
          return preparation.key === costo.size;
        });
      });

      // Formateamos el objeto de costosFiltrados (tamanio: precio)
      costosFormateados = costosFiltrados?.reduce((acc, curr) => {
        acc[curr.size] = curr.price;
        return acc;
      }, {});
    }
    try {
      setLoading(true);
      const data = {
        id: valoresProducto.id,
        nombre: valoresProducto.nombre,
        costos:
          action === "update" ? costosFormateados : valoresProducto.costos,
        preparaciones: preparaciones,
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
      setTimeout(() => {
        getProductos();
        navigate("/admin/productos");
      }, 1500);
      setLoading(false);
    } catch (err) {
      toast.error("No se pudo guardar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
