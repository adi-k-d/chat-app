import React from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import GooglePayButton from "@google-pay/button-react"
const Home = () => {
  console.log(auth.currentUser.uid)
  const a =
    auth.currentUser.uid == "wMoULj1hlUYGs96k2K2QrqbyGIn2"
      ? "question"
      : "doctor"
  console.log(auth.currentUser.uid, a)

  return (
    <section className="container mx-auto bg-gray-800 w-5/6 rounded">
      <div className="px-8 py-20 lg:flex lg:justify-center">
        <div className="">
          <h3 className="text-3xl font-bold text-center text-gray-100">
            How It Works
          </h3>
          <p className="text-center text-gray-100 text-md">
            Click on ask question. If you dont have a account you will be
            directed to make one.Once your are logged in you will be redirected
            to your profile page where you will see your previuus questions if
            any and you will also be able to initiate new consultations.
          </p>
          <div className="items-center justify-center mt-10 lg:flex lg:gap-2">
            <Link to="/question">
              <span
                className="block
                px-8
                py-2
                mt-4
                text-lg
                font-medium
                text-center text-white
                bg-indigo-600
                rounded
                md:mt-0
                hover:bg-indigo-500 "
              >
                {auth.currentUser.uid == "wMoULj1hlUYGs96k2K2QrqbyGIn2"
                  ? "answer"
                  : "ask"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
