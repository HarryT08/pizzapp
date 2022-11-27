import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import {
  Inicio,
  Productos,
  Ingredientes,
  Ordenes,
  Cuentas,
  Mesas,
  Reservas,
  Facturar,
} from ".";
import { Navbar, Sidebar } from "../components";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#191919]/95">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido del dashboard */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/ordenes" element={<Ordenes />} />
              <Route path="/cuentas" element={<Cuentas />} />
              <Route path="/mesas" element={<Mesas />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/facturar" element={<Facturar />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
    // <main className={activeMenu ? "space-toggle" : null}>
    //   <Navbar />
    //   <aside className={`sidebar ${activeMenu ? "show" : null}`}>
    //     <Sidebar />
    //   </aside>
    //   <Routes>
    //     <Route path="/" element={<Inicio />} />
    //     <Route path="/inicio" element={<Inicio />} />
    //     <Route path="/productos" element={<Productos />} />
    //     <Route path="/ingredientes" element={<Ingredientes />} />
    //     <Route path="/ordenes" element={<Ordenes />} />
    //     <Route path="/cuentas" element={<Cuentas />} />
    //     <Route path="/mesas" element={<Mesas />} />
    //     <Route path="/reservas" element={<Reservas />} />
    //     <Route path="/facturar" element={<Facturar />} />
    //   </Routes>
    // </main>
  );
};

export default Dashboard;
