import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { IoIosArrowDown } from "react-icons/io";
import {
  Box,
  Tab,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import TableIngredientesTab from "./tables/productos/tab/TableIngredientesTab";
import { AiFillCloseCircle } from "react-icons/ai";
import {toast} from 'react-toastify'
import { instance } from "../api/api";
import {Loader} from '../components'
import "../styles/aditional-styles/checkbox.css";

const Tap = ({ setModalOpen, getProductos }) => {
  const [loading, setLoading] = useState(false)
  const [carritoPequeño, setCarritoPequeño] = useState([]);
  const [carritoMediano, setCarritoMediano] = useState([]);
  const [carritoGrande, setCarritoGrande] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [name, setName] = useState("");
  const [precio, setPrecio] = useState(0);
  const [pequeña, setPequeña] = useState(false);
  const [mediana, setMediana] = useState(false);
  const [grande, setGrande] = useState(false);
  const [unico, setUnico] = useState(undefined);
  const [value, setValue] = useState("1");

  // sendData
  const enviarDatos = async (e) => {
    e.preventDefault();
    let presentaciones = [];
    if (unico) {
      presentaciones = [
        {
          ingredientes: [...carrito],
          tamaño: "unico",
        },
      ];
    } else {
      presentaciones = [
        {
          ingredientes: [...carritoPequeño],
          tamaño: "pequeña",
        },
        {
          ingredientes: [...carritoMediano],
          tamaño: "mediana",
        },
        {
          ingredientes: [...carritoGrande],
          tamaño: "grande",
        },
      ];
    }
    try {
      setLoading(true)
      const response = await instance.post("/productos", {
        nombre: name,
        precio: precio,
        presentaciones: presentaciones,
      });
      toast.success('Producto agregado correctamente')
      setCarritoPequeño([]);
      setCarritoMediano([]);
      setCarritoGrande([]);
      setCarrito([]);
      setModalOpen(false)
      getProductos()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error('No se pudo agregar el producto')
      console.log(err);
    }
  };

  const checkPequeña = () => {
    setPequeña(!pequeña);
  };

  const checkMediana = () => {
    setMediana(!mediana);
  };

  const checkGrande = () => {
    setGrande(!grande);
  };

  const checkUnico = () => {
    setUnico(!unico);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Funcion para eliminar el producto agg al carrito
  const deleteProduct = (id) => {
    const newProducts = carrito.filter((item) => {
      return item.id !== id;
    });
    const newProductsPequeño = carritoPequeño.filter((item) => {
      return item.id !== id;
    });
    const newProductsMediano = carritoMediano.filter((item) => {
      return item.id !== id;
    });
    const newProductsGrande = carritoGrande.filter((item) => {
      return item.id !== id;
    });
    setCarrito(newProducts);
    setCarritoPequeño(newProductsPequeño);
    setCarritoMediano(newProductsMediano);
    setCarritoGrande(newProductsGrande);
  };

  const handleReset = () => {
    document.getElementById("form").reset();
    setModalOpen(false);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Producto" value="1" />
            <Tab label="Ingredientes" value="2" />
          </TabList>
        </Box>
        <form id="form" onSubmit={enviarDatos}>
          <TabPanel value="1">
            <div className="flex flex-col">
              <label className="block text-base font-medium">Nombre</label>
              <input
                required
                name="nombre"
                type="text"
                placeholder="Nombre"
                className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="block text-base font-medium">Precio</label>
              <input
                required
                name="costo"
                type="number"
                placeholder="Precio"
                className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="flex items-center gap-2 mb-2 overflow-x-auto">
              <div className="container">
                <ul className="ks-cboxtags">
                  <li>
                    <input
                      id="pequeña"
                      className="w-3 h-3"
                      value={pequeña}
                      defaultChecked={pequeña}
                      disabled={unico ? true : false}
                      type="checkbox"
                      onClick={() => checkPequeña()}
                    />
                    <label
                      htmlFor="pequeña"
                      className="text-xs movilL:text-base"
                    >
                      Pequeña
                    </label>
                  </li>
                </ul>
              </div>
              <div className="container">
                <ul className="ks-cboxtags">
                  <li>
                    <input
                      id="mediana"
                      className="w-3 h-3"
                      value={mediana}
                      defaultChecked={mediana}
                      type="checkbox"
                      disabled={unico ? true : false}
                      onClick={() => checkMediana()}
                    />
                    <label
                      htmlFor="mediana"
                      className="text-xs movilL:text-base"
                    >
                      Mediana
                    </label>
                  </li>
                </ul>
              </div>
              <div className="container">
                <ul className="ks-cboxtags">
                  <li>
                    <input
                      id="grande"
                      className="w-3 h-3"
                      value={grande}
                      defaultChecked={grande}
                      type="checkbox"
                      disabled={unico ? true : false}
                      onClick={() => checkGrande()}
                    />
                    <label
                      htmlFor="grande"
                      className="text-xs movilL:text-base"
                    >
                      Grande
                    </label>
                  </li>
                </ul>
              </div>
              <div className="container">
                <ul className="ks-cboxtags">
                  <li>
                      <input
                        id="unicos"
                        className="w-3 h-3"
                        type="checkbox"
                        onChange={() => {
                          setGrande(false);
                          setMediana(false);
                          setPequeña(false);
                        }}
                        onClick={() => checkUnico()}
                      />
                    <label htmlFor='unicos' className="text-xs movilL:text-base">
                      Unico
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <TableIngredientesTab
              carrito={carrito}
              setCarrito={setCarrito}
              ingredientes={ingredientes}
              setIngredientes={setIngredientes}
              carritoPequeño={carritoPequeño}
              setCarritoPequeño={setCarritoPequeño}
              carritoMediano={carritoMediano}
              setCarritoMediano={setCarritoMediano}
              carritoGrande={carritoGrande}
              setCarritoGrande={setCarritoGrande}
            />
            <div className="mt-3">
              {pequeña && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Pequeña</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carritoPequeño.map((item) => (
                      <div
                        className="flex items-center mb-2.5 gap-5 overflow-x-auto"
                        key={item.id}
                      >
                        <p>{item.nombre}</p>
                        <input
                          required
                          onChange={(e) => {
                            setCarritoPequeño((carritoPequeño) =>
                              carritoPequeño.map((elemento) =>
                                elemento.id === item.id
                                  ? { ...elemento, cantidad: e.target.value }
                                  : elemento
                              )
                            );
                          }}
                          defaultValue={item.cantidad}
                          name="cantidad"
                          type="text"
                          className="w-32 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
                        />
                        <div className="flex items-center">
                          <AiFillCloseCircle
                            onClick={() => deleteProduct(item.id)}
                            className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
              {mediana && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Mediana</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carritoMediano.map((item) => (
                      <div
                        className="flex items-center mb-1 gap-2 overflow-x-auto"
                        key={item.id}
                      >
                        <p>{item.nombre}</p>
                        <input
                          required
                          onChange={(e) => {
                            setCarritoMediano((carritoMediano) =>
                              carritoMediano.map((elemento) =>
                                elemento.id === item.id
                                  ? { ...elemento, cantidad: e.target.value }
                                  : elemento
                              )
                            );
                          }}
                          defaultValue={item.cantidad}
                          type="text"
                          className="w-32 px-1 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
                        />
                        <div className="">
                          <AiFillCloseCircle
                            onClick={() => deleteProduct(item.id)}
                            className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
              {grande && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Grande</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carritoGrande.map((item) => (
                      <div
                        className="flex items-center overflow-x-auto mb-1 gap-2"
                        key={item.id}
                      >
                        <p>{item.nombre}</p>
                        <input
                          required
                          onChange={(e) => {
                            setCarritoGrande((carritoGrande) =>
                              carritoGrande.map((elemento) =>
                                elemento.id === item.id
                                  ? { ...elemento, cantidad: e.target.value }
                                  : elemento
                              )
                            );
                          }}
                          defaultValue={item.cantidad}
                          type="text"
                          className="w-32 px-1 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
                        />
                        <div className="flex items-center">
                          <AiFillCloseCircle
                            onClick={() => deleteProduct(item.id)}
                            className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
              {unico && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Unicos</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carrito.map((item) => (
                      <div
                        className="flex items-center overflow-x-auto mb-1 gap-2"
                        key={item.id}
                      >
                        <p>{item.nombre}</p>
                        <input
                          onChange={(e) => {
                            setCarrito((carrito) =>
                              carrito.map((elemento) =>
                                elemento.id === item.id
                                  ? { ...elemento, cantidad: e.target.value }
                                  : elemento
                              )
                            );
                          }}
                          required
                          defaultValue={item.cantidad}
                          type="text"
                          className="w-32 px-1 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
                        />
                        <div className="flex items-center">
                          <AiFillCloseCircle
                            onClick={() => deleteProduct(item.id)}
                            className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
          </TabPanel>
          <div className="flex gap-3">
            <button type="submit" className="btn">
              {loading ? <Loader /> : "Agregar"}
            </button>
            <span className="btnCancel cursor-pointer" onClick={handleReset}>
              Cancelar
            </span>
          </div>
        </form>
      </TabContext>
    </Box>
  );
};

export default Tap;
