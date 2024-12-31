import React, { useEffect, useState } from 'react';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

const Chat = () => {
    const [connection, setConnection] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);  // Track connection state

    // Initialize the SignalR connection
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44325/chatHub",{
        withCredentials: true,  // Make sure credentials are included
    })
    .build();


        // Start the connection
        newConnection.start()
            .then(() => {
                console.log("Connection established!");
                setIsConnected(true);  // Set to true when the connection is established
            })
            .catch(err => {
                console.log("Error while establishing connection: ", err);
                setIsConnected(false);  // Set to false if there is an error
            });

        // Listen for incoming messages
        newConnection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages((prevMessages) => [...prevMessages, `${user}: ${message}`]);
        });

        // Set the connection object in state
        setConnection(newConnection);

        // Cleanup the connection on component unmount
        return () => {
            newConnection.stop();
        };
    }, []);

    // Send a message to the SignalR Hub
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
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage} disabled={!isConnected}>Send</button> {/* Disable button if not connected */}
        </div>
    );
};

export default Chat;
