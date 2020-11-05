import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux"
import { AppMenu } from '../helpers/components/AppMenu'
import { getData } from './actions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(5),
        },
    },
}));

export const Temperatures = () => {
    const classes = useStyles();

    const { data, isLoading, error } = useSelector(state => {
        return {
            data: state.rooms.data,
            isLoading: state.rooms.isLoading,
            error: state.rooms.error
        }
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AppMenu>
            <div>Room 1</div>
            <List>
                {isLoading &&
                    <div className={classes.root}>
                        <CircularProgress />
                    </div>
                }
                {!isLoading && data &&
                    <>
                        <ListItem key="temperature">
                            <ListItemText primary={`Temperature : ${data.temperature} ${data.temperatureUnit}`} />
                        </ListItem>
                        <ListItem key="humudity">
                            <ListItemText primary={`Humidity : ${data.humidity} ${data.humidityUnit}`} />
                        </ListItem>
                    </>
                }
                {error &&
                    <ListItem key="error">
                        <ListItemText primary={error} />
                    </ListItem>

                }
            </List>
        </AppMenu>
    )
}