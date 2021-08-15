/* eslint-disable prettier/prettier */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../constants/theme';
import Logo from '../../../assets/images/logo.png';

export const SplashScreen = () => {
    return (
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.container}>
            <Image source={Logo} style={styles.image} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
});
