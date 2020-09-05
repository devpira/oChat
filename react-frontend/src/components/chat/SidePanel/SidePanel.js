import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton, Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PeopleIcon from '@material-ui/icons/People';

import { MemberContext } from '../../../common/socketio';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: "65px",
        backgroundColor: theme.palette.sidePanel,
        borderColor: theme.palette.sidePanel,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        boxShadow: "0px 0px 12px",
        zIndex: 2
    },
    topAlignSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avater: {
        marginBottom: theme.spacing(5),
    },
    icon: {
        fontSize: "35px"
    }

}));

const SidePanel = () => {
    const classes = useStyles();
    const { currentMember } = useContext(MemberContext);

    return (
        <Paper className={classes.root} elevation={3} square={true}>
            <div className={classes.topAlignSection}>
                <Avatar alt={currentMember.displayName} src={currentMember.imageUrl} className={classes.avater} />
                <IconButton aria-label="chat" color="primary" >
                    <QuestionAnswerIcon className={classes.icon} />
                </IconButton>
                <IconButton aria-label="contacts" color="primary" >
                    <PeopleIcon className={classes.icon} />
                </IconButton>
            </div>
            <div>
                <IconButton aria-label="logout" color="primary">
                    <ExitToAppIcon className={classes.icon} />
                </IconButton>
            </div>
        </Paper>

    );
}

export default SidePanel;