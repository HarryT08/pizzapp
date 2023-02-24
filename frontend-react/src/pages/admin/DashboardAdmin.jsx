import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Inicio,
  Productos,
  Ingredientes,
  Bebidas,
  AgregarBebidas,
  Ordenes,
  ShowComanda,
  Cuentas,
  Mesas,
  Facturar,
  Factura,
} from ".";
import {
  INDEX_ADMIN,
  INICIO_ADMIN,
  PRODUCTOS_ADMIN,
  INGREDIENTES_ADMIN,
  BEBIDAS_ADMIN,
  AGREGAR_BEBIDAS_ADMIN,
  ORDENES_ADMIN,
  SHOW_COMANDA_ADMIN,
  CUENTAS_ADMIN,
  MESAS_ADMIN,
  FACTURAR_ADMIN,
  FACTURA_ADMIN,
} from "../../routes/paths";
import { dataSidebar } from "../../data/datos";
import { Navbar, Sidebar } from "../../components";

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeLink =
    "flex font-semibold items-center gap-7 pl-4 pt-3 pb-2.5 rounded-lg text-md text-dark bg-white m-2";
  const normalLink =
    "flex font-semibold items-center gap-7 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white hover:bg-white hover:text-black m-2";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {dataSidebar.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <div className="flex items-center">
                <i>{item.icon}</i>
                <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  {item.titulo}
                </span>
              </div>
            </NavLink>
          </li>
        ))}
      </Sidebar>

      {/* Contenido del dashboard */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Routes>
              <Route path={INDEX_ADMIN} element={<Inicio />} />
              <Route path={INICIO_ADMIN} element={<Inicio />} />
              <Route path={PRODUCTOS_ADMIN} element={<Productos />} />
              <Route path={INGREDIENTES_ADMIN} element={<Ingredientes />} />
              <Route path={BEBIDAS_ADMIN} element={<Bebidas />} />
              <Route
                path={AGREGAR_BEBIDAS_ADMIN}
                element={<AgregarBebidas />}
              />
              <Route path={ORDENES_ADMIN} element={<Ordenes />} />
              <Route path={`${SHOW_COMANDA_ADMIN}/:id`} element={<ShowComanda/>}/>
              <Route path={CUENTAS_ADMIN} element={<Cuentas />} />
              <Route path={MESAS_ADMIN} element={<Mesas />} />
              <Route path={FACTURAR_ADMIN} element={<Facturar />} />
              <Route path={`${FACTURA_ADMIN}/:id`} element={<Factura />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
