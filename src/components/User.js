import React, { useEffect, useState } from "react"
import Img from "../image1.jpg"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../firebase"
import Moment from "react-moment"

const User = ({ user, selectUser, user1, chat }) => {
  const user2 = user?.uid
  const [data, setData] = useState("")

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data())
    })
    return () => unsub()
  }, [])

  return (
    <>
      <div
        className={` border-b-2 ${
          chat.name === user.name &&
          "items-center border-b-2 border-l-4 border-blue-400"
        }`}
        onClick={() => selectUser(user)}
      >
        <div className="relative grid grid-cols-3 hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer  items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          <div className="flex flex-row">
            <img
              src={user.avatar || Img}
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className=" pb-2">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-xl text-gray-600 ">
                  {user.name}
                </span>
              </div>
              <span className="block ml-2 text-sm text-gray-600 ">
                {data && (
                  <p>
                    <strong className="mr-1">
                      {data.from === user1 ? "Me:" : `${chat.name}`}
                    </strong>
                    {data.text}
                  </p>
                )}
              </span>
            </div>
            <div>
              {data?.from !== user1 && data?.unread && (
                <small className="unread">New</small>
              )}

              {data ? (
                <p className="absolute right-0 top-1">
                  <Moment fromNow>{data.createdAt.toDate()}</Moment>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
