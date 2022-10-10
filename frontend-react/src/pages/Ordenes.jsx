import React from 'react'
import Prueba from '../components/tables/Prueba'
import TableOrdenes from '../components/tables/TableOrdenes'

const Ordenes = () => {
  return (
    <div className='w-full p-3 '>
      <div className='pt-3 bg-white rounded-lg drop-shadow-3xl'>
        <TableOrdenes/>
      </div>
    </div>
  )
}

export default Ordenes