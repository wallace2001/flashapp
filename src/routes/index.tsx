/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppRouter} from './appRouter';
import { AuthRouter } from './authRouter';
import { RootStateOrAny, useSelector } from 'react-redux';

export const Router = () => {

    const { account } = useSelector((state: RootStateOrAny) => state.authReducer);

    return (
        <NavigationContainer>
            {account.id !== '' ? <AppRouter /> : <AuthRouter />}
        </NavigationContainer>
    );
}