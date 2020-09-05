import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '.'

export const MemberContext = React.createContext();

export const MemberProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);

    const [currentMember, setCurrentMember] = useState(null);
   // const [pending, setPending] = useState(true);

    useEffect(() => {
        if (!socket.hasListeners("LOAD_CURRENT_MEMBER")) {
            socket.on("LOAD_CURRENT_MEMBER", (member) => {
                console.log("LOAD_CURRENT_MEMBER", member)
                setCurrentMember(member);
               // setPending(false)
            })
        }
    }, [socket])

    // if (pending) {
    //     return <>Loading...</>
    // }

    return (
        <MemberContext.Provider
            value={
                {
                    currentMember,
                }
            }
        >
            {children}
        </MemberContext.Provider>
    );
};

