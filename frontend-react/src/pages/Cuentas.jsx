import React from 'react'
import TableCuentas from '../components/tables/TableCuentas'

const Cuentas = () => {
  return (
    <div className='w-full p-3'>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl'>
        <TableCuentas/>
      </div>
    </div>
  )
}

export default Cuentas