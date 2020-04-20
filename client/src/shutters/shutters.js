import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { open, close, clearError } from './actions'
import { AppMenu } from '../helpers/components/AppMenu'
import { rooms } from '../helpers/config'
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Collapse } from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { blue, green } from '@material-ui/core/colors'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    wrap: {
        maxWidth: '160px'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    openButtonProgress: {
        color: blue[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    closeButtonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))

export const Shutters = () => {

    const classes = useStyles();

    const { data, isLoading, error } = useSelector(state => {
        return {
            data: state.shutters.data,
            isLoading: state.shutters.isLoading,
            error: state.shutters.error
        }
    });
    const dispatch = useDispatch();

    const upClick = (active, id) => {
        if (active) {
            dispatch(open(id));
        }
    }

    const downClick = (active, id) => {
        if (active) {
            dispatch(close(id));
        }
    }

    return (
        <AppMenu>
            <Collapse in={error}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch(clearError())
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <span className={classes.wrap}>{`${data.status} : ${data.message}`}</span>
                </Alert>
            </Collapse>
            <List>
                {rooms.map(({ key, label, active, id }) => (
                    <ListItem key={key}>
                        <ListItemIcon button onClick={() => upClick(active, id)}>
                            <div className={classes.wrapper}>
                                <ArrowUpward color={active ? 'primary' : 'disabled'} />
                                {isLoading && <CircularProgress size={24} className={classes.openButtonProgress} />}
                            </div>
                        </ListItemIcon>
                        <ListItemText primary={label} />
                        <ListItemIcon button onClick={() => downClick(active, id)}>
                            <div className={classes.wrapper}>
                                <ArrowDownward color={active ? 'secondary' : 'disabled'} />
                                {isLoading && <CircularProgress size={24} className={classes.closeButtonProgress} />}
                            </div>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        </AppMenu>
    )
}