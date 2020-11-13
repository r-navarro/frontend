import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux"
import { AppMenu } from '../helpers/components/AppMenu'
import { getData, getAllData } from './actions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(5),
        },
    },
}));

const getDateArgument = (time) => {
    const date = new Date(time * 1000)
    return `${date.getMonth() + 1}/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}`

}

export const Temperatures = () => {
    const classes = useStyles();

    const { data, allData, isLoading, error } = useSelector(state => {
        return {
            data: state.rooms.data,
            allData: state.rooms.allData,
            isLoading: state.rooms.isLoading,
            error: state.rooms.error
        }
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData(1))
        dispatch(getAllData())
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
                {!isLoading && allData &&
                    <>
                        < Paper >
                            <Chart
                                data={allData.map(data => ({ argument: getDateArgument(data.timestamp), value: data.temperature }))}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <LineSeries valueField="value" argumentField="argument" />
                            </Chart>
                        </Paper>
                    </>
                }
                {error &&
                    <ListItem key="error">
                        <ListItemText primary={error} />
                    </ListItem>

                }
            </List>
        </AppMenu >
    )
}