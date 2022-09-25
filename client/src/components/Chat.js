import React from "react";
import { useState } from "react";

function Chat({socket, userName, room}) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = () => {

        if(currentMessage != null) {
            const messageData = {
                author: userName,
                room: room,
                message: currentMessage
            }
            socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    return (
        <div>
            <div className="chat">
                <div className="chat-main">
                    messages here
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