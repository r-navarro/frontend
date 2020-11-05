import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppMenu } from '../helpers/components/AppMenu'
import { getUser } from './actions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { createUser } from './actions'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const Profile = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);
    const [user] = React.useState({ roles: [] });
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkConfirm = (password) => {
        if (password === user.password) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }

    const sendCreateUser = () => {
        dispatch(createUser(user))
        setOpen(false)
    }

    const { profile, success, failedPayload } = useSelector(state => {
        return {
            profile: state.profile.user,
            success: state.profile.success,
            failedPayload: state.profile.failedPayload
        }
    });


    useEffect(() => {
        dispatch(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AppMenu>
            <div>profile :</div>
            {profile &&
                <>
                    <List>
                        <ListItem key="name">
                            <ListItemText primary="Name :" />
                            <ListItemText primary={profile.name} />
                        </ListItem>
                        <ListItem key="email">
                            <ListItemText primary="Email :" />
                            <ListItemText primary={profile.email} />
                        </ListItem>
                        <ListItem key="roles">
                            <ListItemText primary="Roles :" />
                            <ListItemText primary={profile.roles} />
                        </ListItem>
                    </List>
                    <div>
                        {<Button variant="contained" color="primary" onClick={handleOpen}>
                            Create user
                        </Button>}
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <form noValidate>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                            autoFocus
                                            onChange={(e) => user['name'] = e.target.value}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="emailCreate"
                                            label="Email Address"
                                            name="emailCreate"
                                            autoFocus
                                            onChange={(e) => user['email'] = e.target.value}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="passwordCreate"
                                            label="Password"
                                            type="password"
                                            id="passwordCreate"
                                            onChange={(e) => user['password'] = e.target.value}
                                        />
                                        <TextField
                                            error={!passwordsMatch}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="passwordConfirmation"
                                            label="Confirmed Password"
                                            type="passwordConfirmation"
                                            id="passwordConfirmation"
                                            onChange={(e) => checkConfirm(e.target.value)}
                                        />
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={() => sendCreateUser()}
                                        >
                                            Create
                                        </Button>
                                    </form>
                                </div>
                            </Fade>
                        </Modal>
                        {!success &&
                            <div>
                                lol failed ! {`${failedPayload}`}
                            </div>}
                    </div>
                </>
            }
        </AppMenu>
    )
}