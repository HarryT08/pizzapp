import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider'
import { Inicio, Productos, Ingredientes, Ordenes, Cuentas, Mesas, Reservas, Facturar} from '../pages';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = () => {

  const { activeMenu } = useStateContext();

  return (
    <main className={activeMenu ? "space-toggle" : null}>
      <Navbar/>
      <aside className={`sidebar ${activeMenu ? "show" : null}`}>
        <Sidebar/>
      </aside>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/ingredientes" element={<Ingredientes/>}/>
        <Route path="/ordenes" element={<Ordenes/>}/>
        <Route path="/cuentas" element={<Cuentas/>}/>
        <Route path="/mesas" element={<Mesas/>}/>
        <Route path="/reservas" element={<Reservas/>}/>
        <Route path="/facturar" element={<Facturar/>}/>
      </Routes>
    </main>
  )
}

export default Dashboard