import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
 
const Chat = () => {
    const [connection, setConnection] = useState<any>(null);//storing signalR connection
    const [message, setMessage] = useState<string>("");//storing the current message typed by user
    const [messages, setMessages] = useState<string[]>([]);//storing all the messages array history
    const [isConnected, setIsConnected] = useState<boolean>(false);  //checking continuisly whether the connectuin is there ort lost.
 
   
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5112/chatHub",{
        withCredentials: true,  
    })
    .build();
 
 
        newConnection.start()
            .then(() => {
                console.log("Connection established!");
                setIsConnected(true);  
            })
            .catch((err: Error) => {
                console.log("Error while establishing connection: ", err);
                setIsConnected(false);  
            });
 
        newConnection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages((prevMessages) => [...prevMessages, `${user}: ${message}`]);
        });
 
       
        setConnection(newConnection);
 
        return () => {  //cleaning
            newConnection.stop();
           
        };
    }, []);
 
    const sendMessage = () => {
        if (connection && message && isConnected) {  // Check if connected before sending
            connection.invoke("SendMessage", "User", message)
                .catch((err: Error) => console.error("Error sending message:", err));
            setMessage("");  // Clear the input field after sending the message
        } else {
            console.log("Not connected or no message to send");
        }
    };
 
    return (
        <div>
            <h3>Real-time Chat</h3>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage} >Send</button>
        </div>
    );
};
 
export default Chat;
 


