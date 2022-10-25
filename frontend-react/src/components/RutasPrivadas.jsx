import React from 'react'
import { Navigate } from 'react-router-dom'
import { LOGIN } from '../routes/paths'

const RutasPrivadas = ( { children }) => {
  return localStorage.getItem('token') ? children : <Navigate to={LOGIN} />;
}

export default RutasPrivadas