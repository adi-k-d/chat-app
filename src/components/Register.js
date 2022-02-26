import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"
import { Timestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    type: "",
  })

  const history = useNavigate()

  const { name, email, password, type, loading } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({ ...data, loading: true, type: "patient" })

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
        type: "patient",
      })

      setData({
        name: "",
        email: "",
        password: "",
        loading: false,
        type: "",
      })
    } catch (err) {
      console.log(err.message)
    }
    history("/")
  }

  return (
    <div className="container m-auto px-10 py-20 w-6/12">
      <div className="">
        <h3 className="block text-gray-700 text-lg font-bold mb-2 text-center">
          Create a new account
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
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none   focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Creating ..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
