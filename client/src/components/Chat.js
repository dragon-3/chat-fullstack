import React, { useEffect } from "react";
import { useState } from "react";
import "./Chat.css"
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket, userName, room}) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = () => {

        if(currentMessage != "") {
            const messageData = {
                author: userName,
                room: room,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes()
            }

            //send messae to data
            socket.emit("send_message", messageData)

            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }


    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className="chat-app">
            <div className="chat">
                <div className="chat-body">
                        <ScrollToBottom className="message-container">
                            {
                                messageList.map(
                                    messages => (
                                        <div className="messages" id={userName === messages.author ? "you" : "other"}>
                                            <tbody>
                                                <tr>
                                                    <td>{messages.message}</td>
                                                </tr>
                                                <tr>
                                                    <h6>{messages.author} - {messages.time}</h6>
                                                </tr>
                                            </tbody>
                                        </div>
                                        
                                        
                                    )
                                )
                            }
                        </ScrollToBottom>
                </div>
            </div>

            <div className="chat-send">
                <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>SEND</button>
            </div>
            
        </div>
    )
}

export default Chat