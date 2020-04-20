import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as BeanEater } from '../assets/BeanEater.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export const Loading = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BeanEater />
        </div>
    );
}