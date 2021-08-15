/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS } from '../../../constants/theme';
import { Button } from '../../components/Button';
import { logout } from '../../stores/action/authAction';

export const Setting = () => {
    const containerOpacity = useSharedValue(0);

    const dispatch = useDispatch();
    const { account } = useSelector((state: RootStateOrAny) => state.authReducer);

    useEffect(() => {
        setTimeout(() => {
            containerOpacity.value = withTiming(1, {duration: 500});
        }, 0.5 * 1000);
    }, []);

    const containerStyles = useAnimatedStyle(() => {
        return {
            opacity: containerOpacity.value,
        };
    });
    return (
        <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.container, {...containerStyles}]}>
            <View style={styles.photo}>
                {/* <View style={styles.image}/> */}
                <Image source={{uri: account.image}} style={styles.image} />
                <Text style={styles.name}>{account.name}</Text>
            </View>
            <View style={styles.info}>
                <View style={styles.box}>
                    <Text style={styles.title}>E-mail</Text>
                    <Text style={styles.text}>{account.email}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Telefone</Text>
                    <Text style={styles.text}>{account.telphone}</Text>
                </View>
            </View>
            <View style={styles.buttonChange}>
                <Button
                    type={false}
                    title="Mudar senha"
                />
            </View>
            <View style={styles.buttonChange}>
                <Button
                    type={false}
                    title="Sair"
                    colorText={COLORS.red_1}
                    onPress={() => dispatch(logout())}
                />
            </View>
            <View style={styles.buttonDelete}>
                <Button
                    type={false}
                    title="Excluir conta"
                    colorText={COLORS.red_1}
                />
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
    },
    photo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 100,
    },
    name: {
        ...FONTS.h3,
        color: COLORS.blue_1,
        marginTop: 10,
    },
    info: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    box: {
        marginTop: 40,
    },
    title: {
        ...FONTS.h2,
        color: COLORS.blue_1,
    },
    text: {
        ...FONTS.h3,
        color: COLORS.blue_1,
    },
    buttonChange: {},
    buttonDelete: {
        marginTop: 30,
        marginBottom: 30,
    },
});
