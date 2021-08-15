/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/theme';

export const Loading = () => {

    const { loading } = useSelector((state: RootStateOrAny) => state.loadingReducer);

    console.log(loading);

    return (
        <View style={[styles.container, {
            display: loading ? 'flex' : 'none',
            position: loading ? 'absolute' : 'relative',
        }]}>
            <ActivityIndicator color={COLORS.secondary} size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
