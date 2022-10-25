import React from 'react'
import { Navigate } from 'react-router-dom'
import { DASHBOARD } from '../routes/paths'

const RutasPublicas = ({children}) => {

    if(localStorage.getItem('Authorization')){
        return <Navigate to='/dashboard/inicio' />
    }

  return (
    <>
        {children}
    </>
  )
}

export default RutasPublicas