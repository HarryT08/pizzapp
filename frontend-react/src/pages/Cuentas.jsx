import React from 'react'
import BotonModal from '../components/modals/BotonModal'
import ModalUsuarios from '../components/modals/ModalUsuarios'
import TableCuentas from '../components/tables/TableCuentas'

const Cuentas = () => {
  return (
    <div className='w-full p-3'>
      <div className='py-3'>
        <ModalUsuarios/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl'>
        <TableCuentas/>
      </div>
    </div>
  )
}

export default Cuentas