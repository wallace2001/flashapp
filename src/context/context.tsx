/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, ReactNode} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SplashScreen } from '../screens/SplashScreen';
import { authenticationRefreshToken } from '../stores/action/authAction';

interface PropsContext{

};

interface PropsProvider{
    children: ReactNode;
};

export const MobileContext = createContext({} as PropsContext);

export const MobileProivder = ({children}: PropsProvider) => {

    const [splashLoading, setSplashLoading] = useState(true);

    // const { account } = useSelector((state: RootStateOrAny) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const func = async() => {
            const token = await AsyncStorage.getItem('access_token');
            const refreshToken: any = await AsyncStorage.getItem('refresh_token');

            console.log('token', token);
            console.log('refresh_token: ', refreshToken);

            if (!token){
                return;
            }

            if (!refreshToken){
                return;
            }

            if (token){
                dispatch(authenticationRefreshToken(refreshToken));
            }
        };
        func();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setSplashLoading(false);
        }, 2 * 1000);
    }, []);

    if (splashLoading){
        return (
            <SplashScreen />
        );
    }
    return (
        <MobileContext.Provider value={{}}>
            {children}
        </MobileContext.Provider>
    );
};