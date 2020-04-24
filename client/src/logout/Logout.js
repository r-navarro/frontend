import React from 'react';
import { useDispatch } from "react-redux"
import { AppMenu } from '../helpers/components/AppMenu'
import { ReactComponent as BeanEater } from '../assets/BeanEater.svg'
import { logout } from '../login/actions'


export const Logout = () => {
    const dispatch = useDispatch();
    dispatch(logout());
    return (
        <AppMenu>
            <div>log out</div>
            <div>
                <BeanEater />
                Loading
            </div>
        </AppMenu>
    )
}