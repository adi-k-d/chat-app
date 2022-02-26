import React, { useContext } from "react"
import { AuthContext } from "../context/Auth"
import { Navigate, Route } from "react-router-dom"

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext)

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
