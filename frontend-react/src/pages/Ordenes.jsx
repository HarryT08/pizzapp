import React from 'react'
import TableOrdenes from '../components/tables/TableOrdenes'

const Ordenes = () => {
  return (
    <div className='w-full '>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl'>
        <TableOrdenes/>
      </div>
    </div>
  )
}

export default Ordenes