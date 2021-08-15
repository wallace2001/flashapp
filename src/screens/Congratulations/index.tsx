/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import MiniLogo from '../../../assets/images/minilogo.png';
import { COLORS, FONTS } from '../../../constants/theme';
import { Button } from '../../components/Button';
import { authentication } from '../../stores/action/authAction';

export const Congratulations = () => {

    const { credentials, loading } = useSelector((state: RootStateOrAny) => state.authReducer);
    const dispatch = useDispatch();

    const handleContinue = () => {
        dispatch(authentication({
            email: credentials?.email,
            password: credentials?.password,
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={MiniLogo} />
                <Text style={styles.title}>FlashApp</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.text}>Parabéns, sua conta foi verificada e você pode prosseguir...</Text>
                <View>
                    <Button
                        title="Proseguir"
                        type={true}
                        onPress={() => handleContinue()}
                        loading={loading}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...FONTS.h3,
        color: COLORS.blue_1,
    },
    bottom: {
    },
    text: {
        fontSize: 21,
        color: COLORS.blue_1,
        marginTop: 50,
        fontFamily: 'Ubuntu-Bold',
    },
});
