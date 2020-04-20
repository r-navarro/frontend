import React from 'react';
import { AppMenu } from '../helpers/components/AppMenu'
import { ReactComponent as BeanEater } from '../assets/BeanEater.svg'


export const Temperatures = () => {
    return (
        <AppMenu>
            <div>hello !</div>
            <div>
                <BeanEater />
                Loading
            </div>
        </AppMenu>
    )
}