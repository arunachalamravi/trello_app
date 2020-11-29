import React,{useState,useEffect} from "react";
import io from 'socket.io-client'
import Navbar from '../navbar/navbar'
import BoardNav from './BoardNav'
import Dropdown from './Dropdown'
import Todo from './Todo'
let socket;
const PORT = 'http://localhost:3001/';

const Chat = (props) => {
  const [db,setDB]=useState("")
  const [room,setRoom]=useState("")
  const[roommessage,setRoommessage]=useState("")
  useEffect((socket)=>{
    socket=io(PORT)
    const chatroom =props.match.params.chatroom
    setRoom(chatroom)
    const id =props.match.params.id
    // console.log(id,chatroom)
    socket.emit("join",(chatroom))
    socket.on("oldmessage",(boardname)=>{
      const messages = boardname.map(e=>{
        const msg= e.message

        return(
          {msg}
        )
        // console.log(e.message)
      })
      // console.log(messages)

      setDB(boardname)
      setRoommessage(messages)
     
    })
  },[PORT])

  return (
        <div className="background__image">
      <Navbar
      //  id={id&&id}
       />
       <div className="nav__2">
      <BoardNav chatroom={room}/>
      <Todo room={room} message={roommessage}/>

       </div>
    </div>
  );
}

export default Chat;
