import React from "react"
import Attachment from "./svg/Attachment"

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex bottom-0">
          <label htmlFor="img" className="m-4">
            <Attachment />
          </label>
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="img"
            accept="image/*"
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="Enter message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" flex-grow m-2 py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700 "
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-7 h-7 text-gray-500 origin-center transform rotate-90 "
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
          <div></div>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
