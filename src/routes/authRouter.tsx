/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Confirm } from '../screens/Confirm';
import { Congratulations } from '../screens/Congratulations';

const {Screen, Navigator} = createNativeStackNavigator();

export const AuthRouter = () => {
    return (
            <Navigator screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'transparent',
                },
            }}>
                <Screen
                    name="Login"
                    component={Login}
                />
                <Screen
                    name="Register"
                    component={Register}
                />
                <Screen
                    name="Confirm"
                    component={Confirm}
                />
                <Screen
                    name="Congratulations"
                    component={Congratulations}
                />
            </Navigator>
    );
}