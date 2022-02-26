import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { auth, db } from "../firebase"
import { updateDoc, doc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/Auth"

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const history = useNavigate()
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    })
    await signOut(auth)
    history("/")
  }
  return (
    <div className=" mx-auto px-10 ">
      <div className="border-b w-full inline-block border-blue-400 py-4 ">
        <div className="float-left block">
          <Link to="/">
            <span className="cursor-pointer font-bold text-4xl ">Home</span>
          </Link>
        </div>
        <div className=" float-right block space-x-10">
          {user ? (
            <>
              <Link to="/profile">
                <span className="cursor-pointer font-bold text-4xl ">
                  Profile
                </span>
              </Link>

              <button
                className="cursor-pointer font-bold text-4xl"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <span className="cursor-pointer font-bold text-4xl ">
                  Login
                </span>
              </Link>
              <Link to="/register">
                <span className="cursor-pointer font-bold text-4xl ">
                  Register
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
