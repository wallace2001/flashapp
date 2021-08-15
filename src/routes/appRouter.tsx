/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CustomTabBar } from './tab.router';
import { CreateFlashCard } from '../screens/CreateFile';
import { FolderContent } from '../screens/Folder';
import { SubFolderContent } from '../screens/SubFolder';
// import { COLORS } from '../../constants/theme';

const {Screen, Navigator} = createNativeStackNavigator();

export const AppRouter = () => {
    return (
            <Navigator screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'transparent',
                },
            }}>
                <Screen
                    name="Main"
                    component={CustomTabBar}
                />
                <Screen
                    name="Create"
                    component={CreateFlashCard}
                />
                <Screen
                    name="Folder"
                    component={FolderContent}
                />
                <Screen
                    name="SubFolder"
                    component={SubFolderContent}
                />
            </Navigator>
    );
}