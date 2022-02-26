import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Questions from "./components/Questions"
import AuthProvider from "./context/Auth"
import PrivateRoute from "./components/PrivateRoute"
import Profile from "./components/Profile"
import Doctors from "./components/Doctors"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route
            path="/question"
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PrivateRoute>
                <Doctors />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
