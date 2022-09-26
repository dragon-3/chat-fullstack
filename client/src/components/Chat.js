import React, { useEffect } from "react";
import { useState } from "react";

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
        <div>
            <div className="chat">
                <div className="chat-main">
                    {
                        messageList.map(
                            messages => (
                                <div className="mesages" id={userName === messages.author ? "you" : "other"}>
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