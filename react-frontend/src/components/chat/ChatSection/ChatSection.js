import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Topbar from './Topbar';
import BottomBar from './BottomBar';
import FromChatBubble from './FromChatBubble';
import ToChatBubble from './ToChatBubble';

import { SocketContext, ChatContext, MemberContext } from '../../../common/socketio';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        //width: "65px",
        flex: 1,
        //borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
    },
    body: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        overflowY: "auto",
        scrollbarColor: theme.palette.primary.main,
        scrollbarWidth: "1px",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px solid slategrey'
        }
    }


}));

const ChatSection = () => {
    const classes = useStyles();
    const messagesEndRef = useRef(null)

    const { currentChatRoom, chatRooms } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);
    const { currentMember } = useContext(MemberContext);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ block: 'end', })
    }, [currentChatRoom]);


    const onMessageSend = (message) => {
        if (message) {
            const builtMessage = { uid: currentMember.uid, name: currentMember.displayName, message, roomId: currentChatRoom.roomId, time: "8:00 am" };
            socket.emit("CHAT_MESSAGE_SEND", builtMessage)
        }
    }
    console.log("currentChatRoom", currentChatRoom)
    console.log("chatRooms", chatRooms)
    console.log("currentMember", currentMember)
    return (
        <div className={classes.root}>
            {currentChatRoom && chatRooms.length > 0 ? <>
                <Topbar title={currentChatRoom.participants[0].name} />
                <div className={classes.body} >
                    <div ref={messagesEndRef}>
                        {
                            currentChatRoom.chatMessages.map((item, index) => {
                                return item.uid === currentMember.uid ? <ToChatBubble key={index} message={item} imageUrl={currentMember.imageUrl} displayName={currentMember.displayName} />
                                    : <FromChatBubble key={index} jid={item.name} message={item.message} />
                            })
                        }
                    </div>
                </div>
                <BottomBar onMessageSend={onMessageSend} />
            </> : <div ref={messagesEndRef}></div>}

        </div>

    );
}

export default ChatSection;