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
  const [listaIngredientesSeleccionados, setListaIngredientesSeleccionados] =
    useState([]);
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

  // Si ya tengo ingredientes , cuando un tamaño , tengo que actualizar las preparaciones con los ingredientes actuales
  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    const nuevasPreparaciones = listaCostoTamanio.map((tamanio) => {
    

      const nuevasPreparacionesConIngredientes =
        listaIngredientesSeleccionados.map((ingrediente) => {
          const cantidad =
            preparaciones.find(
              (preparacion) =>
                preparacion.id_materia === ingrediente.id &&
                preparacion.tamanio === tamanio
            )?.cantidad || 1;

          return {
            id_materia: ingrediente.id || "",
            id_producto: producto.id || "",
            tamanio,
            cantidad,
            materiaPrima: ingrediente,
          };
        });
      return [...nuevasPreparacionesConIngredientes];
    });

    setPreparaciones(nuevasPreparaciones.flat(1));
  }, [listaCostoTamanio, listaIngredientesSeleccionados]);

  useEffect(() => {
    if (listaCostoTamanio.length === 0) {
      setListaIngredientesSeleccionados([]);
      setPreparaciones([]);
    }
    if (listaCostoTamanio.length === 1 && listaCostoTamanio[0] === "unico") {
      setPreparaciones([]);
      setListaIngredientesSeleccionados([]);
    }
  }, [listaCostoTamanio]);

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
        preparaciones: preparaciones,
      };

      if (action === "create") {
        await productosServices.createProduct(data);
        console.log("Data create ->", data);
      } else if (action === "update") {
        console.log("Data update ->", data);
         await productosServices.updateProduct(data);
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
    action,
    preparations,
    methodsProducts,
    category,
    setCategory,
    listaCostoTamanio,
    setListaCostoTamanio,
    setListaIngredientesSeleccionados,

    listaIngredientesSeleccionados,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
