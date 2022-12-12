import { useState } from "react";
import {RealizarPedido, EditarPedido,TomarOrden} from '.'
import { INDEX_MESERO, REALIZAR_PEDIDO_MESERO, TOMAR_ORDEN_MESERO } from "../../routes/paths";
import { NavLink, Route, Routes } from "react-router-dom";
import {dataSidebarMesero} from '../../data/datos'
import { Navbar, Sidebar } from "../../components";

const DashboardMesero = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeLink =
    "flex font-semibold items-center gap-7 pl-4 pt-3 pb-2.5 rounded-lg text-md text-dark bg-white m-2";
  const normalLink =
    "flex font-semibold items-center gap-7 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white hover:bg-white hover:text-black m-2";
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      {dataSidebarMesero.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <div className="flex items-center">
                      <i>{item.icon}</i>
                      <span className="text-base font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
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
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <Routes>
            <Route path={INDEX_MESERO} element={<RealizarPedido/>}/>
            <Route path={REALIZAR_PEDIDO_MESERO} element={<RealizarPedido/>}/>
            <Route path={`${TOMAR_ORDEN_MESERO}/:id`} element={<TomarOrden/>}/>
            <Route path="/editar-pedido" element={<EditarPedido/>}/>
          </Routes>
        </div>
      </main>
      </div>
    </div>
  )
}

export default DashboardMesero