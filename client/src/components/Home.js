import React from 'react';
import {useNavigate, useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Chat from './Chat';
import io from "socket.io-client" 

const socket = io.connect('https://chat-fullstack-3.herokuapp.com/')

function Home() {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const [display, setDisplay] = useState(false);

    // useEffect((socket) => {
    //     socket.emit('join_room', room)
    //     console.log(`user joined room: ${room}` )
    // })

    const joinRoom = () => {
        socket.emit('join_room', room);
        setDisplay(true)
        console.log("user joined room:" + room)
    }


    return (

        <div className="">

        {/* display the login part */}
        {
            display ? null :
            <div className="login">
                <h2>Start Chatting!</h2>
                <div className='form'>
                    <label htmlFor="" >Name</label>
                    <input type="text" onChange={(e) => setUserName(e.target.value)} /><br />
                    <label htmlFor="" >Room</label>
                    <input type="text" onChange={(e) => setRoom(e.target.value)}/><br />
                    <button onClick={joinRoom}>Join</button>
                </div>
            </div>
        }

        {/* display the chat page */}
            {
                display ? 

                <Chat socket={socket} userName={userName} room={room} />
                : null
            }
        </div>
    )

}

export default Home