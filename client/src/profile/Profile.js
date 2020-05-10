import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppMenu } from '../helpers/components/AppMenu'
import { getUser } from './actions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export const Profile = () => {

    const dispatch = useDispatch();

    const { profile } = useSelector(state => {
        return {
            profile: state.profile.data,
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
            }
        </AppMenu>
    )
}