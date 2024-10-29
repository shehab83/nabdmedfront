import React, { Children } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({auth, Children}) {
  if(!localStorage.getItem('email')){
    return (<Navigate to="/login" replace/>)
  }
    return (Children ? Children : <Outlet/>)
}

export default ProtectedRoute