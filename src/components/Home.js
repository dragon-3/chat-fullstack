import React from 'react';
import {useNavigate, useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Chat from './Chat';
import io from "socket.io-client" 
import { Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

const socket = io.connect('https://chat-backend-2.herokuapp.com/')

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
                    <Form>
                        <Form.Label htmlFor="" ></Form.Label>
                        <Form.Control type="text" placeholder='Name' onChange={(e) => setUserName(e.target.value)} />
                        <Form.Label htmlFor="" ></Form.Label>
                        <Form.Control type="text" placeholder='Room' onChange={(e) => setRoom(e.target.value)}/><br />
                    </Form>
                    <Button onClick={joinRoom}>Join</Button>
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