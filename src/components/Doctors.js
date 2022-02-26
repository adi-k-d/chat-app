import React, { useEffect, useState } from "react"
import Img from "../image1.jpg"
import { db, auth, storage } from "../firebase"
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore"
import User from "./User"
import MessageForm from "./MessageForm"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import Message from "./Message"

const Questions = () => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState("")
  const [text, setText] = useState("")
  const [img, setImg] = useState("")
  const [msgs, setMsgs] = useState([])

  const user1 = auth.currentUser.uid

  useEffect(() => {
    const usersRef = collection(db, "users")
    // create query object

    const q =
      auth.currentUser.uid === "wMoULj1hlUYGs96k2K2QrqbyGIn2"
        ? query(usersRef, where("type", "==", "patient"))
        : query(usersRef, where("type", "==", "doctor"))

    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      })
      setUsers(users)
    })
    return () => unsub()
  }, [])

  const selectUser = async (user) => {
    setChat(user)

    const user2 = user.uid
    console.log(user.uid)
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    const msgsRef = collection(db, "messages", id, "chat")
    const q = query(msgsRef, orderBy("createdAt", "asc"))

    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id))
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user2 = chat.uid

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    let url
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      )
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    })

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    })

    setText("")
    setImg("")
  }
  return (
    <div className=" grid grid-cols-3 min-w-full border rounded  px-2 min-h-screen">
      <div className="col-span-1 bg-white border-r border-gray-300 ">
        <h2 className="ml-2 mb-2 text-gray-600 text-2xl my-2 border-b-2 text-center border-red-400 mb-4">
          {auth.currentUser.uid === "wMoULj1hlUYGs96k2K2QrqbyGIn2"
            ? "Patients"
            : "Doctors"}
        </h2>
        {
          (users.uid = users.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          )))
        }
      </div>
      <div className="col-span-2 bg-white">
        {chat ? (
          <>
            <div className="h-20 bg-white flex items-center gap-4">
              <div className="relative">
                <span className="ml-3 h-16 w-16 flex overflow-visible rounded-full">
                  <img
                    src={chat.avatar || Img}
                    alt="avatar"
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  />
                </span>
                <span
                  className={` ${
                    chat.isOnline
                      ? " absolute w-4 h-4 bg-green-600 rounded-full right-0 top-1  "
                      : " absolute w-3 h-3 bg-red-600 rounded-full "
                  }`}
                ></span>
              </div>

              <h3 className="text-center text-2xl font-semibold">
                {chat.name}
              </h3>
            </div>
            <div className="msg container bg-slate-100 py-2 ">
              <div>
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>
            </div>
            <div>
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                setImg={setImg}
              />
            </div>
          </>
        ) : (
          <h3>
            Click on Madhumita Mazumdar or Kishore Kumar Das to ask a question
          </h3>
        )}
      </div>
    </div>
  )
}

export default Questions
