/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../constants/theme';
import { Home } from '../screens/Home';
import { Setting } from '../screens/Settings';

const TabBar = createBottomTabNavigator();

export const CustomTabBar = () => {
    return (
        <View style={styles.container}>
            <TabBar.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.white,
                    tabBarInactiveTintColor: COLORS.blue_1,
                    tabBarStyle: {
                        height: 50,
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                    },
                    tabBarActiveBackgroundColor: COLORS.pink_1,
                    tabBarItemStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    tabBarLabelStyle: {
                        display: 'none',
                    },
                }}
                sceneContainerStyle={{
                    backgroundColor: 'transparent',
                }}
            >
                <TabBar.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <Icon
                                name="home"
                                size={size}
                                color={color}
                            />
                        )),
                    }}
                />
                <TabBar.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <Icon
                                name="user"
                                size={size}
                                color={color}
                            />
                        )),
                    }}
                />
            </TabBar.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
