import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRouteProps {
  redirectTo?: string 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo = '/' }): JSX.Element => {
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token')
    return !!token
  }
  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} />
}

export default PrivateRoute