import React from 'react';
import { makeStyles } from '@material-ui/styles';

import SidePanel from './SidePanel/SidePanel'
import ChatListSection from './ChatListSection/ChatListSection'
import ChatSection from './ChatSection/ChatSection'
import { ChatProvider } from '../../common/socketio';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: "flex",
    },
    content: {
        height: '100%',
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    shiftContent: {
        paddingLeft: "65px"
    },
    body: {
        display: "flex",
        flex: 1,
        padding: theme.spacing(2)
    }
}));

const MainChat = () => {
    const classes = useStyles();
    // const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    //     defaultMatches: true
    // });

    return (
        <ChatProvider>
            <div className={classes.root}>
                <SidePanel />
                <ChatListSection />
                <ChatSection />
            </div>
        </ChatProvider>
    );
}

export default MainChat;
