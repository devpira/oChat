import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { FirebaseAuth } from '../Authentication';
import {CONNECT, DISCONNECTED, CONNECT_ERROR, ERROR, AUTH_FAIL} from './Events'

const socketUrl = "http://localhost:5000/"
//const socketUrl = "http://192.168.0.18:5000/"

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    //const [authError, setAuthError] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        FirebaseAuth.auth().currentUser.getIdToken(true).then((idToken) => {

            const socket = io(socketUrl, { query: { token: idToken} });
            socket.on(CONNECT_ERROR, (error) => {
                console.log("Failed to connect")
                console.log(error)
               // setAuthError(error)
                FirebaseAuth.auth().signOut();
            });

            socket.on(ERROR, (error) => {
                console.log("connection failed....")
                console.log(error)
                FirebaseAuth.auth().signOut();
            });
            
            socket.on(CONNECT, () => {
                console.log("Successfully connected to socket.io server!")

                socket.on(AUTH_FAIL, () => {
                    console.log("Auth failed....")
                    FirebaseAuth.auth().signOut();
                });

                socket.on(DISCONNECTED, () => {
                    console.log("Discconnected your boy")
                });
            })
            
            setSocket(socket)
            setPending(false)
        }).catch((error) => {
            console.log("ERROR FROM getid token: " + error)
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <SocketContext.Provider
            value={
                {
                    socket,
                }
            }
        >
            {children}
        </SocketContext.Provider>
    );
};
