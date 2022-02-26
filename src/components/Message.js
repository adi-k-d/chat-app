import React, { useRef, useEffect } from "react"
import Moment from "react-moment"

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msg])
  return (
    <div
      className={` ${
        msg.from === user1
          ? "mt-4 px-3 flex items-center gap-3"
          : "mt-4 px-3 flex justify-end items-center gap-3"
      }`}
      ref={scrollRef}
    >
      <span
        className={` ${
          msg.from === user1
            ? " px-2 h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-br-xl	w-80 flex bg-white"
            : "px-2 h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-bl-xl w-96 flex bg-blue-600 text-white"
        }`}
      >
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
      </span>
      <p className="text-sm font-semibold text-gray-800">
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </p>
    </div>
  )
}

export default Message
