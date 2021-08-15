/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../../../constants/theme';

interface PropsButton extends TouchableOpacityProps{
    title: string;
    type: boolean;
    icon?: string;
    colorText?: string;
    loading?: boolean;
}

export const Button = ({title, type, icon, colorText, loading, ...rest}: PropsButton) => {
    return (
        <TouchableOpacity disabled={loading} style={styles.container} {...rest}>
            {type ? (
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[COLORS.secondary, COLORS.primary]}
                    style={styles.content}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.white}/>
                    ) : (
                        <Text style={styles.text}>{title}</Text>
                    )}
                </LinearGradient>
            ) : (
                <View
                    style={[styles.content, {backgroundColor: COLORS.blue_transparent}]}
                >
                    {icon && <Icon name="facebook" size={20} color={COLORS.blue_1} />}
                    <Text
                        style={[styles.text, type ? {color: COLORS.white} : {color: colorText ? colorText : COLORS.blue_1, marginLeft: 10}]}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
    },
    content: {
        height: 45,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
    text: {
        color: COLORS.white,
        ...FONTS.h3,
    },
});
