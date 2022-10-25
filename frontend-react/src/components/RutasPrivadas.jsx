import React from 'react'
import { Navigate } from 'react-router-dom'
import { LOGIN } from '../routes/paths'

const RutasPrivadas = ( { children }) => {
  if(!localStorage.getItem('Authorization')){
    return <Navigate to={LOGIN} />
  }

  return (
    <>
      {children}
    </>
  )
  /* return localStorage.getItem('Authorization') ? children : <Navigate to={LOGIN} />; */
}

export default RutasPrivadas