import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { updateDoc, doc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  })

  const { name, email, password, type, loading } = data
  const history = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({ ...data, loading: true })
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      })

      setData({
        name: "",
        email: "",
        password: "",
        loading: false,
        type: "",
      })
      history("/home")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="container m-auto px-10 py-20 w-6/12">
      <div className="">
        <h3 className="block text-gray-700 text-lg font-bold mb-2 text-center">
          Login to your account
        </h3>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none   focus:shadow-outline">
              {loading ? "Logging in ..." : "Login"}
            </button>
            <span className="md:float-right mt-2 align-middle ml-4 font-semibold ">
              Dont have an account yet?
              <Link to="/register">
                <span className="md:float-right align-middle ml-4 semibold cursor-pointer text-red-600">
                  Register
                </span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
